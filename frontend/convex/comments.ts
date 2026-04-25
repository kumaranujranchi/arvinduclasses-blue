import { query, mutation } from "./_generated/server";
import { v, ConvexError } from "convex/values";

// Add a comment to a post
export const addComment = mutation({
  args: {
    postId: v.id("posts"),
    userId: v.id("users"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    // Ensure post exists
    const post = await ctx.db.get(args.postId);
    if (!post) throw new ConvexError("Post not found");

    // Ensure user exists and is active
    const user = await ctx.db.get(args.userId);
    if (!user) throw new ConvexError("User not found");
    if (!user.isActive) throw new ConvexError("User is disabled");

    const commentId = await ctx.db.insert("comments", {
      postId: args.postId,
      userId: args.userId,
      content: args.content,
      createdAt: Date.now(),
    });

    return commentId;
  },
});

// Get comments for a post, including user details
export const getCommentsByPost = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .order("desc") // newest first
      .collect();

    // Map over comments to fetch user details
    const commentsWithUsers = await Promise.all(
      comments.map(async (comment) => {
        const user = await ctx.db.get(comment.userId);
        return {
          ...comment,
          user: user
            ? {
                name: user.name,
                profilePicUrl: user.profilePicUrl,
              }
            : { name: "Unknown User", profilePicUrl: undefined },
        };
      })
    );

    return commentsWithUsers;
  },
});
