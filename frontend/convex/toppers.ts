import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getToppers = query({
  handler: async (ctx) => {
    return await ctx.db.query("toppers").order("desc").collect();
  },
});

export const getActiveToppers = query({
  handler: async (ctx) => {
    return await ctx.db.query("toppers").filter(q => q.eq(q.field("isActive"), true)).order("desc").collect();
  },
});

export const createTopper = mutation({
  args: {
    name: v.string(),
    rank: v.string(),
    score: v.string(),
    stream: v.string(),
    testMonth: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("toppers", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
    });
  },
});

export const deleteTopper = mutation({
  args: { id: v.id("toppers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const toggleTopperStatus = mutation({
  args: { id: v.id("toppers"), isActive: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isActive: args.isActive });
  },
});
