import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Basic login function for the platform.
 * In a production app, password hashing and secure token management (e.g. Clerk/NextAuth) 
 * are highly recommended. This provides a robust foundation for role-based access.
 */
export const login = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!user || user.password !== args.password || !user.isActive) {
      throw new Error("Invalid credentials or account disabled");
    }

    // Return essential user info for session management
    return {
      userId: user._id,
      name: user.name,
      role: user.role,
    };
  },
});

/**
 * Initializes the first administrator account if no users exist.
 * This is used for initial setup of the role-based system.
 */
export const createInitialAdmin = mutation({
  args: { 
    name: v.string(),
    email: v.string(),
    password: v.string() 
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("users").collect();
    if (existing.length > 0) return "Setup already complete: users exist in database.";

    return await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      password: args.password,
      role: "admin",
      isActive: true,
      createdAt: Date.now(),
    });
  },
});

/**
 * Fetches user profile based on ID.
 */
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
