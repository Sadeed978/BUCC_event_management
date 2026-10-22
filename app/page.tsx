import type { Metadata } from "next";
import Navbar     from "@/components/layout/Navbar";
import Footer     from "@/components/layout/Footer";
import HeroSection from "@/app/_eventora/HeroSection";
import FeaturedEventsSection from "@/app/_eventora/FeaturedEventsSection";
import CategorySection from "@/app/_eventora/CategorySection";
import WhyEventoraSection from "@/app/_eventora/WhyEventoraSection";
import UpcomingEventsSection from "@/app/_eventora/UpcomingEventsSection";
import CtaSection  from "@/app/_eventora/CtaSection";
import StatsSection from "@/app/_eventora/StatsSection";

export const metadata: Metadata = {
  title: "Eventora — Discover Extraordinary Events",
  description:
    "Find and publish events in your city — from tech summits and music festivals to workshops and street food fairs.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedEventsSection />
        <CategorySection />
        <WhyEventoraSection />
        <UpcomingEventsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
