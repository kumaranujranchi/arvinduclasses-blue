import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ===== COURSES =====
  courses: defineTable({
    title: v.string(),
    slug: v.string(),
    category: v.string(),           // e.g. "#Engineering"
    description: v.string(),
    duration: v.string(),           // e.g. "1 year"
    fee: v.number(),                // in INR
    rating: v.optional(v.number()), // 1-5
    imageUrl: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),          // timestamp
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_active", ["isActive"]),

  // ===== BLOG POSTS =====
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.string(),
    author: v.string(),
    imageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    isPublished: v.boolean(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["isPublished"]),

  // ===== EVENTS =====
  events: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    eventDate: v.number(),          // timestamp
    location: v.string(),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_date", ["eventDate"]),

  // ===== NOTICES =====
  notices: defineTable({
    title: v.string(),
    content: v.string(),
    isImportant: v.boolean(),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_active", ["isActive"]),

  // ===== CONTACT ENQUIRIES =====
  enquiries: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    isRead: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_read", ["isRead"]),

  // ===== LEADS / ADMISSIONS =====
  leads: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    course: v.string(),
    locality: v.string(),
    type: v.string(),                // 'demo' or 'enroll'
    status: v.string(),              // 'new', 'contacted', 'admitted'
    createdAt: v.number(),
  })
    .index("by_type", ["type"])
    .index("by_status", ["status"]),

  // ===== NEWSLETTER SUBSCRIBERS =====
  subscribers: defineTable({
    email: v.string(),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"]),
  // ===== TOPPERS / RESULTS =====
  toppers: defineTable({
    name: v.string(),
    rank: v.string(),
    score: v.string(),
    stream: v.string(),
    imageUrl: v.optional(v.string()),
    testMonth: v.string(),           // e.g. "April 2025"
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_active", ["isActive"])
    .index("by_month", ["testMonth"]),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
    // Roles: super_admin | admin | student | teacher | counsellor | accounts | sales | operations
    role: v.string(),
    isActive: v.boolean(),
    phone: v.optional(v.string()),
    createdBy: v.optional(v.string()), // userId of creator
    lastLogin: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  activityLog: defineTable({
    userId: v.string(),
    userName: v.string(),
    action: v.string(),             // e.g. "CREATE", "UPDATE", "DELETE", "LOGIN"
    module: v.string(),             // e.g. "LEADS", "USERS", "COURSES"
    description: v.string(),
    createdAt: v.number(),
  })
    .index("by_created", ["createdAt"])
    .index("by_user", ["userId"]),
});
