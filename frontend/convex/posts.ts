import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Helper to resolve image URL from storageId or full URL
async function resolveImageUrl(ctx: any, imageUrl: string | undefined) {
  if (!imageUrl) return undefined;
  
  // If it's already a full URL but from a different deployment, try to fix it
  // or if it's just a storageId, get the URL.
  // Convex storage IDs usually start with 'utf8:' or are just long strings.
  // A common pattern is to just try getting the URL if it looks like an ID.
  
  if (imageUrl.startsWith("http")) {
    // If it's a full URL, try to extract the storageId from the end
    const parts = imageUrl.split("/");
    const id = parts[parts.length - 1];
    if (id && (id.length > 20)) { // Convex IDs are long
       try {
         const newUrl = await ctx.storage.getUrl(id);
         return newUrl || imageUrl;
       } catch (e) {
         return imageUrl;
       }
    }
    return imageUrl;
  }

  // If it's not a URL, assume it's a storageId
  try {
    return await ctx.storage.getUrl(imageUrl) || imageUrl;
  } catch (e) {
    return imageUrl;
  }
}

// Get all published posts for site
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .order("desc")
      .collect();
    
    return await Promise.all(posts.map(async (post) => ({
      ...post,
      imageUrl: await resolveImageUrl(ctx, post.imageUrl),
    })));
  },
});

// Get published posts with limit
export const getPublishedPosts = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .order("desc")
      .take(args.limit ?? 100);
    
    return await Promise.all(posts.map(async (post) => ({
      ...post,
      imageUrl: await resolveImageUrl(ctx, post.imageUrl),
    })));
  },
});

export const getPublishedPostBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    
    if (!post || !post.isPublished) return null;
    
    return {
      ...post,
      imageUrl: await resolveImageUrl(ctx, post.imageUrl),
    };
  },
});

export const getAllAdmin = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    return await Promise.all(posts.map(async (post) => ({
      ...post,
      imageUrl: await resolveImageUrl(ctx, post.imageUrl),
    })));
  },
});

// Get a single post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!post) return null;
    return {
      ...post,
      imageUrl: await resolveImageUrl(ctx, post.imageUrl),
    };
  },
});

// Get a single post by ID
export const getById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) return null;
    return {
      ...post,
      imageUrl: await resolveImageUrl(ctx, post.imageUrl),
    };
  },
});

// Create a new post
export const createPost = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.string(),
    author: v.string(),
    category: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    isPublished: v.boolean(),
    adminId: v.string(),
    adminName: v.string(),
  },
  handler: async (ctx, args) => {
    const { adminId, adminName, ...postData } = args;
    const postId = await ctx.db.insert("posts", {
      ...postData,
      publishedAt: args.isPublished ? Date.now() : undefined,
      createdAt: Date.now(),
    });

    await ctx.db.insert("activityLog", {
      userId: adminId,
      userName: adminName,
      action: "CREATE",
      module: "BLOG",
      description: `Created blog post: ${args.title}`,
      createdAt: Date.now(),
    });

    return postId;
  },
});

// Update a post
export const updatePost = mutation({
  args: {
    id: v.id("posts"),
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.string(),
    author: v.string(),
    category: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    isPublished: v.boolean(),
    adminId: v.string(),
    adminName: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, adminId, adminName, ...postData } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Post not found");

    // If changing from unpublished to published, set publishedAt
    const publishedAt = (!existing.isPublished && args.isPublished) 
      ? Date.now() 
      : existing.publishedAt;

    await ctx.db.patch(id, {
      ...postData,
      publishedAt,
    });

    await ctx.db.insert("activityLog", {
      userId: adminId,
      userName: adminName,
      action: "UPDATE",
      module: "BLOG",
      description: `Updated blog post: ${args.title}`,
      createdAt: Date.now(),
    });
  },
});

// Delete a post
export const deletePost = mutation({
  args: {
    id: v.id("posts"),
    adminId: v.string(),
    adminName: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (!post) throw new Error("Post not found");

    await ctx.db.delete(args.id);

    await ctx.db.insert("activityLog", {
      userId: args.adminId,
      userName: args.adminName,
      action: "DELETE",
      module: "BLOG",
      description: `Deleted blog post: ${post.title}`,
      createdAt: Date.now(),
    });
  },
});
