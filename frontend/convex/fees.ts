import { query } from "./_generated/server";
import { v } from "convex/values";

// Get fee details for a specific student
export const getStudentFee = query({
  args: { studentId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.studentId) return null;
    
    const fee = await ctx.db
      .query("fees")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId!))
      .unique();
      
    if (!fee) return null;

    const payments = await ctx.db
      .query("payments")
      .withIndex("by_student", (q) => q.eq("studentId", args.studentId!))
      .order("desc")
      .collect();

    return {
      ...fee,
      paymentHistory: payments
    };
  },
});

// For public check (by phone/email)
export const checkBalancePublic = query({
  args: { identifier: v.string() }, // phone or email
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => 
        q.or(
          q.eq(q.field("email"), args.identifier),
          q.eq(q.field("phone"), args.identifier)
        )
      )
      .unique();

    if (!user) return { error: "Student not found" };

    const fee = await ctx.db
      .query("fees")
      .withIndex("by_student", (q) => q.eq("studentId", user._id))
      .unique();

    if (!fee) return { error: "Fee record not found for this student" };

    return {
      studentName: user.name,
      courseName: fee.courseName,
      totalFee: fee.totalFee,
      paidAmount: fee.paidAmount,
      balance: fee.totalFee - fee.paidAmount - (fee.discount || 0),
      dueDate: fee.dueDate,
      status: fee.status
    };
  },
});
