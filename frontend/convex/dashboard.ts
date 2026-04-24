import { query } from "./_generated/server";

export const getStats = query({
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
