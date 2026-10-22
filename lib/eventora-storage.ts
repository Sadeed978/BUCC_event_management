/**
 * lib/eventora-storage.ts — localStorage CRUD utilities for user-created events.
 *
 * IMPORTANT LIMITATIONS:
 * - Data is stored in the browser's localStorage. It is NOT shared across
 *   users, devices, or browsers. Clearing browser data will erase all events.
 * - Ownership checks (organizerId === user.uid) are client-side only and
 *   provide NO security. Any user who can run JS can bypass them.
 * - In a production application, replace localStorage with a database and
 *   enforce ownership server-side with proper authorization rules.
 *
 * Never call these functions during server rendering — they use the `window`
 * object which is not available on the server.
 */

import type { EventItem } from "@/lib/eventora-types";
import { SEED_EVENTS } from "@/lib/eventora-seed";

const STORAGE_KEY = "eventora_user_events";

/** Return all user-created events from localStorage */
export function getUserEvents(): EventItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as EventItem[];
  } catch {
    return [];
  }
}

/** Return all events: seed data + user-created events */
export function getAllEvents(): EventItem[] {
  const userEvents = getUserEvents();
  // User events take precedence (in case of same id, unlikely but safe)
  return [...SEED_EVENTS, ...userEvents];
}

/** Find a single event by id across seed + user events */
export function getEventById(id: string): EventItem | undefined {
  return getAllEvents().find((e) => e.id === id);
}

/** Save a new user-created event to localStorage */
export function saveUserEvent(event: EventItem): void {
  if (typeof window === "undefined") return;
  const existing = getUserEvents();
  existing.push(event);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

/** Delete a user-created event by id (only affects user-created events) */
export function deleteUserEvent(id: string): void {
  if (typeof window === "undefined") return;
  const existing = getUserEvents().filter((e) => e.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

/** Return all events created by a specific user */
export function getEventsByOrganizer(uid: string): EventItem[] {
  return getUserEvents().filter((e) => e.organizerId === uid);
}

/** Generate a URL-safe slug from a title + random suffix */
export function generateEventId(title: string): string {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${slug}-${suffix}`;
}
