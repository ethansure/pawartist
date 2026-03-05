import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PetPortraitAI - Transform Your Pet Into Stunning Art",
    template: "%s | PetPortraitAI",
  },
  description:
    "Turn your beloved pet into a masterpiece! Create beautiful AI-generated pet portraits in 50+ artistic styles. Royal portraits, Disney-style, oil paintings, and more. Transform your furry friend in seconds.",
  keywords: [
    "pet portrait",
    "AI pet art",
    "dog portrait",
    "cat portrait",
    "pet painting",
    "custom pet art",
    "AI art generator",
    "pet memorial",
    "pet gift",
    "digital pet art",
  ],
  authors: [{ name: "PetPortraitAI" }],
  creator: "PetPortraitAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://petportraitai.com",
    siteName: "PetPortraitAI",
    title: "PetPortraitAI - Transform Your Pet Into Stunning Art",
    description:
      "Create beautiful AI-generated pet portraits in 50+ artistic styles. Royal portraits, Disney-style, oil paintings, and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PetPortraitAI - AI Pet Portrait Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PetPortraitAI - Transform Your Pet Into Stunning Art",
    description:
      "Create beautiful AI-generated pet portraits in 50+ artistic styles.",
    images: ["/og-image.jpg"],
    creator: "@petportraitai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
