import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PawArtist - AI Pet Portrait Generator | Turn Your Pet Into Art",
  description: "Transform your beloved pet into stunning AI-generated artwork. 50+ art styles including royal portraits, Disney, oil paintings, and more. Fast, affordable, beautiful.",
  keywords: ["AI pet portrait", "pet portrait generator", "dog portrait AI", "cat portrait AI", "pet art", "custom pet portrait"],
  openGraph: {
    title: "PawArtist - AI Pet Portrait Generator",
    description: "Transform your pet into stunning artwork with AI. 50+ styles, instant delivery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
