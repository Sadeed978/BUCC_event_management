/**
 * lib/schemas.ts — Zod validation schemas for all API inputs
 */

import { z } from "zod";

export const SemesterSchema = z.object({
  name: z.string().min(3),
  year: z.number().int().min(2020).max(2050),
  status: z.enum(["upcoming", "active", "completed"]),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  president: z.string().min(2),
});

export const EventSchema = z.object({
  semesterId: z.string().min(1),
  semesterName: z.string().min(1),
  eventName: z.string().min(2),
  eventType: z.enum([
    "Workshop", "Seminar", "Competition", "Bootcamp", "Career Fair",
    "Networking", "Recruitment", "Industrial Visit", "Internal Meeting",
    "Training Session", "Social Event", "National Event", "International Event",
  ]),
  status: z.enum(["Draft", "Submitted", "Approved", "Running", "Completed", "Archived"]),
  date: z.string().min(1),
  budget: z.number().min(0),
  expense: z.number().min(0).default(0),
  attendance: z.number().int().min(0).default(0),
  description: z.string().optional(),
  venue: z.string().optional(),
  createdBy: z.string().min(1),
});

export const MemberSchema = z.object({
  name: z.string().min(2),
  studentId: z.string().min(5),
  email: z.string().email(),
  department: z.string().min(2),
  batch: z.string().min(4),
  role: z.enum([
    "President", "Vice President", "General Secretary", "Treasurer",
    "Director", "Senior Executive", "Executive", "Panel Member", "Alumni Viewer",
  ]),
  status: z.enum(["Active", "Inactive", "Alumni"]).default("Active"),
  semesterId: z.string().min(1),
  phone: z.string().optional(),
});

export const CommitteeSchema = z.object({
  semesterId: z.string().min(1),
  semesterName: z.string().min(1),
  president: z.string().min(2),
  vicePresident: z.string().min(2),
  generalSecretary: z.string().min(2),
  treasurer: z.string().min(2),
  directors: z.array(z.string()).min(1),
});

export const TransactionSchema = z.object({
  semesterId: z.string().min(1),
  eventId: z.string().optional(),
  eventName: z.string().optional(),
  type: z.enum([
    "Income", "Expense", "Reimbursement", "Membership Fee",
    "Sponsorship", "Donation", "Purchase", "Refund",
  ]),
  amount: z.number().positive(),
  description: z.string().min(2),
  date: z.string().min(1),
  createdBy: z.string().min(1),
});

export const SponsorSchema = z.object({
  companyName: z.string().min(2),
  contactPerson: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  tier: z.enum(["Platinum", "Gold", "Silver", "Bronze"]),
  sponsoredEvents: z.array(z.string()).default([]),
  totalValue: z.number().min(0).default(0),
});

export const VendorSchema = z.object({
  vendorName: z.string().min(2),
  category: z.string().min(2),
  contactPerson: z.string().min(2),
  phone: z.string().min(10),
  rating: z.number().min(0).max(5),
  status: z.enum(["Preferred", "Active", "Inactive"]).default("Active"),
  lastUsed: z.string().min(1),
  timesHired: z.number().int().min(0).default(0),
  notes: z.string().optional(),
});

export const HandoverSchema = z.object({
  semesterId: z.string().min(1),
  semesterName: z.string().min(1),
  eventName: z.string().min(2),
  author: z.string().min(2),
  problems: z.array(z.string().min(1)).min(1),
  recommendations: z.array(z.string().min(1)).min(1),
});

export const NotificationSchema = z.object({
  type: z.enum(["event", "budget", "meeting", "semester", "approval"]),
  title: z.string().min(2),
  body: z.string().min(2),
  read: z.boolean().default(false),
  targetRole: z.string().optional(),
});

export const UserRegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum([
    "Super Admin", "President", "Vice President", "General Secretary",
    "Treasurer", "Director", "Senior Executive", "Executive", "Panel Member", "Alumni Viewer",
  ]),
  studentId: z.string().optional(),
});
