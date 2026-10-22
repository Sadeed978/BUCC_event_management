import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AddEventClient from "@/app/items/add/_components/AddEventClient";

export const metadata: Metadata = {
  title: "Add Event",
  description: "Publish a new event on Eventora.",
};

export default function AddEventPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#fafaf8]">
        <AddEventClient />
      </main>
      <Footer />
    </>
  );
}
