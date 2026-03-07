import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sonner";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

const GA_ID = "G-2MGGL7RQ3H";

export const metadata: Metadata = {
  title: {
    default: "AI Photo Tools - Transform Photos with AI | Pet Portraits, Restoration, Enhancement",
    template: "%s | AI Photo Tools"
  },
  description: "Professional AI photo tools: Pet portraits, photo restoration, image enhancement, background removal, style transfer, and AI headshots. Transform your photos with state-of-the-art AI.",
  keywords: [
    "AI photo tools",
    "pet portrait AI",
    "photo restoration",
    "image enhancement",
    "background remover",
    "style transfer",
    "AI headshots",
    "photo editing AI",
    "upscale image",
    "colorize photos"
  ],
  authors: [{ name: "AI Photo Tools" }],
  creator: "AI Photo Tools",
  publisher: "AI Photo Tools",
  metadataBase: new URL("https://aiphotos.icu"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiphotos.icu",
    siteName: "AI Photo Tools",
    title: "AI Photo Tools - Transform Your Photos with AI Magic",
    description: "Professional AI-powered photo tools. Pet portraits, restoration, enhancement, background removal, style transfer & headshots.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Photo Tools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Photo Tools - Transform Photos with AI",
    description: "Professional AI photo tools for everyone. Pet portraits, restoration, enhancement & more.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  verification: {
    google: "your-google-verification-code",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#7c3aed" />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
