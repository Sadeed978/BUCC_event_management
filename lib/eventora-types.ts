/**
 * lib/eventora-types.ts — TypeScript types for the Eventora event platform.
 */

export type EventCategory =
  | "Technology"
  | "Music"
  | "Business"
  | "Education"
  | "Lifestyle"
  | "Sports"
  | "Art"
  | "Food";

export interface EventItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: EventCategory;
  date: string;           // ISO date string
  location: string;
  price: number;          // 0 = free
  isFree: boolean;
  imageUrl?: string;
  organizerId?: string;   // Firebase UID of creator (null for seed data)
  organizer?: string;     // Display name
  venue?: string;
  eventType?: string;     // "In-Person" | "Online" | "Hybrid"
  createdAt?: string;
  featured?: boolean;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
