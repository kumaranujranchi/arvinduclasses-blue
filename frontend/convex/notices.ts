import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all notices
export const getAllAdmin = query({
  handler: async (ctx) => {
    return await ctx.db.query("notices").order("desc").collect();
  },
});

// Get all active notices
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("notices")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("desc")
      .collect();
  },
});

export const createNotice = mutation({
  args: {
    content: v.string(),
    link: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notices", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
    });
  },
});

export const deleteNotice = mutation({
  args: { id: v.id("notices") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const toggleNoticeStatus = mutation({
  args: { id: v.id("notices"), isActive: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isActive: args.isActive });
  },
});
