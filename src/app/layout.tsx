import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getMetadataBase, ogCopy } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: ogCopy.title,
  description: ogCopy.description,
  applicationName: site.name,
  keywords: [
    "Playwright",
    "SDET",
    "test architecture",
    "QA consulting",
    "CI/CD",
    "test flakiness",
    "Testing Explained",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: ogCopy.title,
    description: ogCopy.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: ogCopy.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogCopy.title,
    description: ogCopy.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "128x128" }],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#f7f6f2] text-zinc-900">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
