import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Save a contact form enquiry
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("enquiries", {
      ...args,
      isRead: false,
      createdAt: Date.now(),
    });
  },
});

// Subscribe to newsletter
export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // Check if already subscribed
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existing) {
      // Reactivate if previously unsubscribed
      if (!existing.isActive) {
        await ctx.db.patch(existing._id, { isActive: true });
      }
      return { success: true, message: "Already subscribed!" };
    }

    await ctx.db.insert("subscribers", {
      email: args.email,
      isActive: true,
      createdAt: Date.now(),
    });

    return { success: true, message: "Subscribed successfully!" };
  },
});
