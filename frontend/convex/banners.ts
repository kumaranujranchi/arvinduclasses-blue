import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getBanners = query({
  args: { onlyActive: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    let banners;
    if (args.onlyActive) {
      banners = await ctx.db
        .query("banners")
        .withIndex("by_active", (q) => q.eq("isActive", true))
        .collect();
    } else {
      banners = await ctx.db.query("banners").collect();
    }
    return banners.sort((a, b) => a.order - b.order);
  },
});

export const addBanner = mutation({
  args: {
    title: v.string(),
    subtitle: v.optional(v.string()),
    imageUrl: v.string(),
    buttonText: v.optional(v.string()),
    buttonLink: v.optional(v.string()),
    order: v.number(),
    adminId: v.optional(v.string()),
    adminName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { adminId, adminName, ...bannerData } = args;
    const bannerId = await ctx.db.insert("banners", {
      ...bannerData,
      isActive: true,
      createdAt: Date.now(),
    });

    await ctx.db.insert("activityLog", {
      userId: adminId ?? "system",
      userName: adminName ?? "System Admin",
      action: "CREATE",
      module: "BANNERS",
      description: `Added new banner: ${args.title}`,
      createdAt: Date.now(),
    });

    return bannerId;
  },
});

export const updateBanner = mutation({
  args: {
    id: v.id("banners"),
    title: v.string(),
    subtitle: v.optional(v.string()),
    imageUrl: v.string(),
    buttonText: v.optional(v.string()),
    buttonLink: v.optional(v.string()),
    order: v.number(),
    isActive: v.boolean(),
    adminId: v.optional(v.string()),
    adminName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, adminId, adminName, ...bannerData } = args;
    await ctx.db.patch(id, bannerData);

    await ctx.db.insert("activityLog", {
      userId: adminId ?? "system",
      userName: adminName ?? "System Admin",
      action: "UPDATE",
      module: "BANNERS",
      description: `Updated banner: ${args.title}`,
      createdAt: Date.now(),
    });
  },
});

export const deleteBanner = mutation({
  args: {
    id: v.id("banners"),
    adminId: v.optional(v.string()),
    adminName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const banner = await ctx.db.get(args.id);
    if (!banner) throw new Error("Banner not found");

    await ctx.db.delete(args.id);

    await ctx.db.insert("activityLog", {
      userId: args.adminId ?? "system",
      userName: args.adminName ?? "System Admin",
      action: "DELETE",
      module: "BANNERS",
      description: `Deleted banner: ${banner.title}`,
      createdAt: Date.now(),
    });
  },
});

export const toggleBannerStatus = mutation({
  args: {
    id: v.id("banners"),
    isActive: v.boolean(),
    adminId: v.optional(v.string()),
    adminName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const banner = await ctx.db.get(args.id);
    if (!banner) throw new Error("Banner not found");

    await ctx.db.patch(args.id, { isActive: args.isActive });

    await ctx.db.insert("activityLog", {
      userId: args.adminId ?? "system",
      userName: args.adminName ?? "System Admin",
      action: "UPDATE",
      module: "BANNERS",
      description: `${args.isActive ? "Enabled" : "Disabled"} banner: ${banner.title}`,
      createdAt: Date.now(),
    });
  },
});
