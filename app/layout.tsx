import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BRACU Computer Club — Event Management",
  description: "BRAC University Computer Club · Event Management Portal — Members Only",
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
        className="min-h-full bg-[#f4f6f9] text-[#1e293b] font-[family-name:var(--font-inter)] antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
