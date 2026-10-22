import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/app/_components/SessionProviderWrapper";
import { AuthProvider }       from "@/components/auth/AuthProvider";
import { Toaster }            from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Eventora — Discover Extraordinary Events",
    template: "%s | Eventora",
  },
  description:
    "Eventora is a modern event discovery platform. Find tech summits, music festivals, business conferences, and more — or publish your own event.",
  keywords: ["events", "event discovery", "tech events", "music events", "Bangladesh events"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[#fafaf8] text-[#1e293b] font-[family-name:var(--font-inter)] antialiased"
        suppressHydrationWarning
      >
        {/* Firebase auth context for Eventora */}
        <AuthProvider>
          {/* NextAuth session context for BUCC dashboard */}
          <SessionProviderWrapper>
            {children}
          </SessionProviderWrapper>
          <Toaster position="top-right" richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
