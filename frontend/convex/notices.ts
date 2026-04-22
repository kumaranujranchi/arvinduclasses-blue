import { query } from "./_generated/server";

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
