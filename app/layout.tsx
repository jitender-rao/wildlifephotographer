import type { Metadata, Viewport } from "next";
import { geistSans, geistMono } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { CartDrawer } from "@/components/shop/CartDrawer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Wild Wanderings by Sudiip | Wildlife Photography India",
    template: "%s | Wild Wanderings by Sudiip",
  },
  description:
    "Award-winning wildlife photography from the forests and wetlands of India. Fine art prints, photography tours to Ranthambore & Sattal, and field workshops by Sudiip.",
  keywords: [
    "wildlife photography",
    "India",
    "Ranthambore",
    "tiger photography",
    "fine art prints",
    "wildlife tours",
  ],
  authors: [{ name: "Sudiip" }],
  creator: "Sudiip",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Wild Wanderings by Sudiip",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wild Wanderings by Sudiip",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8F5F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          {children}
          <CartDrawer />
          <Toaster richColors theme="system" position="bottom-right" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
