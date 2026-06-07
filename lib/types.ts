/**
 * lib/types.ts — shared TypeScript types for all BUCC OS collections
 * These match the MongoDB document shapes exactly.
 */

import type { ObjectId } from "mongodb";

// ─── Semester ────────────────────────────────────────────────────────────────
export type SemesterStatus = "upcoming" | "active" | "completed";

export interface Semester {
  _id?: ObjectId;
  name: string;          // "Spring 2027"
  year: number;
  status: SemesterStatus;
  startDate: string;     // ISO date string
  endDate: string;
  president: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Event ───────────────────────────────────────────────────────────────────
export type EventStatus =
  | "Draft"
  | "Submitted"
  | "Approved"
  | "Running"
  | "Completed"
  | "Archived";

export type EventCategory =
  | "Workshop"
  | "Seminar"
  | "Competition"
  | "Bootcamp"
  | "Career Fair"
  | "Networking"
  | "Recruitment"
  | "Industrial Visit"
  | "Internal Meeting"
  | "Training Session"
  | "Social Event"
  | "National Event"
  | "International Event";

export interface Event {
  _id?: ObjectId;
  semesterId: string;
  semesterName: string;
  eventName: string;
  eventType: EventCategory;
  status: EventStatus;
  date: string;
  budget: number;
  expense: number;
  attendance: number;
  description?: string;
  venue?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Member ───────────────────────────────────────────────────────────────────
export type MemberRole =
  | "President"
  | "Vice President"
  | "General Secretary"
  | "Treasurer"
  | "Director"
  | "Senior Executive"
  | "Executive"
  | "Panel Member"
  | "Alumni Viewer";

export interface Member {
  _id?: ObjectId;
  name: string;
  studentId: string;
  email: string;
  department: string;
  batch: string;
  role: MemberRole;
  status: "Active" | "Inactive" | "Alumni";
  semesterId: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Committee ────────────────────────────────────────────────────────────────
export interface Committee {
  _id?: ObjectId;
  semesterId: string;
  semesterName: string;
  president: string;
  vicePresident: string;
  generalSecretary: string;
  treasurer: string;
  directors: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── Transaction ─────────────────────────────────────────────────────────────
export type TransactionType =
  | "Income"
  | "Expense"
  | "Reimbursement"
  | "Membership Fee"
  | "Sponsorship"
  | "Donation"
  | "Purchase"
  | "Refund";

export interface Transaction {
  _id?: ObjectId;
  semesterId: string;
  eventId?: string;
  eventName?: string;
  type: TransactionType;
  amount: number;          // always positive — sign determined by type
  description: string;
  date: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Sponsor ─────────────────────────────────────────────────────────────────
export type SponsorTier = "Platinum" | "Gold" | "Silver" | "Bronze";

export interface Sponsor {
  _id?: ObjectId;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  tier: SponsorTier;
  sponsoredEvents: string[];
  totalValue: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Vendor ───────────────────────────────────────────────────────────────────
export type VendorStatus = "Preferred" | "Active" | "Inactive";

export interface Vendor {
  _id?: ObjectId;
  vendorName: string;
  category: string;
  contactPerson: string;
  phone: string;
  rating: number;
  status: VendorStatus;
  lastUsed: string;
  timesHired: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Document ─────────────────────────────────────────────────────────────────
export type DocumentType =
  | "proposal"
  | "budget"
  | "bill"
  | "report"
  | "minutes"
  | "design"
  | "certificate"
  | "attendance"
  | "other";

export interface BuccDocument {
  _id?: ObjectId;
  name: string;
  type: DocumentType;
  semesterId: string;
  semesterName: string;
  eventId?: string;
  eventName?: string;
  size: string;
  url: string;            // Firebase Storage URL (placeholder for now)
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Handover Note ────────────────────────────────────────────────────────────
export interface HandoverNote {
  _id?: ObjectId;
  semesterId: string;
  semesterName: string;
  eventName: string;
  author: string;
  problems: string[];
  recommendations: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── Notification ─────────────────────────────────────────────────────────────
export type NotificationType = "event" | "budget" | "meeting" | "semester" | "approval";

export interface Notification {
  _id?: ObjectId;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  targetRole?: MemberRole | "all";
  createdAt: string;
}

// ─── Audit Log ────────────────────────────────────────────────────────────────
export type AuditRisk = "low" | "medium" | "high";

export interface AuditLog {
  _id?: ObjectId;
  action: string;
  detail: string;
  performedBy: string;
  risk: AuditRisk;
  collection?: string;
  documentId?: string;
  createdAt: string;
}

// ─── User (for NextAuth) ──────────────────────────────────────────────────────
export interface BuccUser {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: MemberRole | "Super Admin";
  studentId?: string;
  semesterId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── API response wrapper ─────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
}
