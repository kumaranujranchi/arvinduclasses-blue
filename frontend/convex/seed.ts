import { mutation } from "./_generated/server";

/**
 * Seed function to initialize the platform with the first Admin account.
 * Run this from the Convex dashboard or via an API call once to set up your access.
 */
export const seedAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("users").filter(q => q.eq(q.field("role"), "admin")).first();
    if (existing) return "Admin account already exists in the database.";

    await ctx.db.insert("users", {
      name: "Anuj Kumar",
      email: "admin@arvindu.com",
      password: "Arvindu@2025",
      role: "admin",
      isActive: true,
      createdAt: Date.now(),
    });
    return "Admin account 'admin@arvindu.com' created successfully with password 'Arvindu@2025'.";
  },
});
