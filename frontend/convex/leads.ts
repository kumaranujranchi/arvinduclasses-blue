import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getLeads = query({
  handler: async (ctx) => {
    return await ctx.db.query("leads").order("desc").collect();
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

export const getDashboardStats = query({
  handler: async (ctx) => {
    const leads = await ctx.db.query("leads").collect();
    const courses = await ctx.db.query("courses").collect();
    const toppers = await ctx.db.query("toppers").collect();
    const posts = await ctx.db.query("posts").collect();

    return {
      totalLeads: leads.length,
      newLeads: leads.filter(l => l.status === "new").length,
      totalCourses: courses.length,
      totalToppers: toppers.length,
      totalPosts: posts.length,
      recentLeads: leads.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5)
    };
  },
});

