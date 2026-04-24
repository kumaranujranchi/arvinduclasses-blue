import { mutation } from "./_generated/server";
import { v } from "convex/values";

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
