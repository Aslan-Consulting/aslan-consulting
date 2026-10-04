import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
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
    "Aslan Consulting",
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
    icon: "/aslan-logo.png",
    apple: "/aslan-logo.png",
  },
};

const themeInit = `(function(){try{var k='aslan-theme';var t=localStorage.getItem(k)||'dark';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} dark h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
