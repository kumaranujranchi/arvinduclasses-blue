import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getLeads = query({
  handler: async (ctx) => {
    return await ctx.db.query("leads").order("desc").collect();
  },
});

export const getSubscribers = query({
  handler: async (ctx) => {
    return await ctx.db.query("subscribers").order("desc").collect();
  },
});

export const createLead = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    course: v.string(),
    locality: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const leadId = await ctx.db.insert("leads", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
    return leadId;
  },
});


export const updateLeadStatus = mutation({
  args: { id: v.id("leads"), status: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const subscribeNewsletter = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
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

