import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventsClient from "@/app/items/_components/EventsClient";

export const metadata: Metadata = {
  title: "Explore Events",
  description:
    "Search and filter hundreds of events across technology, music, business, education, and more.",
};

export default function ItemsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#fafaf8]">
        <Suspense fallback={null}>
          <EventsClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}