import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all courses (including inactive for admin)
export const getAllAdmin = query({
  handler: async (ctx) => {
    return await ctx.db.query("courses").order("desc").collect();
  },
});

// Get all active courses
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();
  },
});

// Get a single course by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const createCourse = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    category: v.string(),
    description: v.string(),
    duration: v.string(),
    fee: v.number(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("courses", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
    });
  },
});

export const deleteCourse = mutation({
  args: { id: v.id("courses") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const toggleCourseStatus = mutation({
  args: { id: v.id("courses"), isActive: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isActive: args.isActive });
  },
});
