import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getLogs = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("activityLog")
      .order("desc")
      .take(100);
  },
});

export const logAction = mutation({
  args: {
    userId: v.string(),
    userName: v.string(),
    action: v.string(),
    module: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("activityLog", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
