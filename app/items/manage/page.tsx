import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ManageEventsClient from "@/app/items/manage/_components/ManageEventsClient";

export const metadata: Metadata = {
  title: "Manage Events",
  description: "View, and delete your published events on Eventora.",
};

export default function ManageEventsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#fafaf8]">
        <ManageEventsClient />
      </main>
      <Footer />
    </>
  );
}
