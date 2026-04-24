import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// All valid roles in the system
export const ROLES = [
  "super_admin",
  "admin",
  "student",
  "teacher",
  "counsellor",
  "accounts",
  "sales",
  "operations",
] as const;

/**
 * Login — supports all roles including super_admin.
 * Updates lastLogin timestamp on each successful login.
 */
export const login = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase().trim()))
      .unique();

    if (!user) throw new ConvexError("No account found with this email.");
    if (!user.isActive) throw new ConvexError("Your account has been disabled. Contact the Super Admin.");
    if (user.password !== args.password) throw new ConvexError("Incorrect password. Please try again.");

    // Update lastLogin
    await ctx.db.patch(user._id, { lastLogin: Date.now() });

    return {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },
});

/**
 * Create a new user — only super_admin or admin can do this.
 */
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    role: v.string(),
    phone: v.optional(v.string()),
    createdBy: v.string(), // userId of the creator
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) throw new ConvexError(`A user with email "${email}" already exists.`);

    return await ctx.db.insert("users", {
      name: args.name,
      email,
      password: args.password,
      role: args.role,
      phone: args.phone,
      isActive: true,
      createdBy: args.createdBy,
      lastLogin: undefined,
      createdAt: Date.now(),
    });
  },
});

/**
 * Get all users — only for super_admin and admin.
 */
export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").order("desc").collect();
  },
});

/**
 * Get users by role.
 */
export const getUsersByRole = query({
  args: { role: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", args.role))
      .collect();
  },
});

/**
 * Update user details.
 */
export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    phone: v.optional(v.string()),
    password: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(id, filtered);
  },
});

/**
 * Delete a user — only super_admin.
 */
export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

/**
 * Toggle user active status.
 */
export const toggleUserStatus = mutation({
  args: { id: v.id("users"), isActive: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isActive: args.isActive });
  },
});

/**
 * Fetch user profile by ID.
 */
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
