import { mutation } from "./_generated/server";

/**
 * Seeds the Super Admin account.
 * Run once from the Convex Dashboard → Functions → seed.seedSuperAdmin
 * 
 * Credentials:
 *   Email:    admin@arvinduclasses.in
 *   Password: Admin@1234
 *   Role:     super_admin
 */
export const seedSuperAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const email = "admin@arvinduclasses.in";

    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) {
      // Update to super_admin if it already exists with a different role
      if (existing.role !== "super_admin") {
        await ctx.db.patch(existing._id, {
          role: "super_admin",
          password: "Admin@1234",
          isActive: true,
        });
        return `Updated existing user to Super Admin: ${email}`;
      }
      return `Super Admin already exists: ${email}`;
    }

    await ctx.db.insert("users", {
      name: "Super Admin",
      email,
      password: "Admin@1234",
      role: "super_admin",
      isActive: true,
      createdAt: Date.now(),
    });

    return `✅ Super Admin created successfully!\nEmail: ${email}\nPassword: Admin@1234`;
  },
});

/**
 * Legacy seed — kept for backward compatibility.
 */
export const seedAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const email = "admin@arvinduclasses.in";
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) return "Super Admin already exists.";

    await ctx.db.insert("users", {
      name: "Super Admin",
      email,
      password: "Admin@1234",
      role: "super_admin",
      isActive: true,
      createdAt: Date.now(),
    });
    return `Super Admin created: ${email}`;
  },
});
