import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-photo-tool.vercel.app"),
  title: {
    default: "AI Photo Tools - Pet Portraits, Photo Restoration & Enhancement",
    template: "%s | AI Photo Tools",
  },
  description:
    "Professional AI photo tools suite. Create stunning pet portraits, restore old photos, enhance image quality, remove backgrounds. Free to try!",
  keywords: [
    "AI photo tools",
    "pet portrait AI",
    "photo restoration",
    "photo enhancer",
    "background remover",
    "AI image editor",
    "pet art generator",
    "old photo repair",
  ],
  authors: [{ name: "AI Photo Tools" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-photo-tool.vercel.app",
    siteName: "AI Photo Tools",
    title: "AI Photo Tools - Transform Your Photos with AI Magic",
    description:
      "Professional AI photo tools for everyone. Pet portraits, restoration, enhancement & more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Photo Tools - Transform Your Photos with AI",
    description:
      "Professional AI photo tools. Pet portraits, restoration, enhancement & more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
