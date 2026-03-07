import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Professional Headshots - LinkedIn & Corporate Photos",
  description: "Generate professional headshots with AI. Perfect for LinkedIn, corporate profiles, and business use. Transform selfies into polished professional portraits instantly.",
  keywords: [
    "AI headshots",
    "professional headshot generator",
    "LinkedIn headshot",
    "corporate headshot AI",
    "business portrait",
    "professional photo AI",
    "headshot generator",
    "selfie to headshot",
    "AI portrait",
    "executive headshot",
    "profile photo generator",
    "professional profile picture"
  ],
  openGraph: {
    title: "AI Professional Headshot Generator",
    description: "Transform selfies into professional headshots with AI. Perfect for LinkedIn, corporate profiles, and business use.",
    images: ["/examples/headshot-after.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Professional Headshots",
    description: "Generate stunning professional headshots with AI. LinkedIn, corporate & business ready!",
    images: ["/examples/headshot-after.png"],
  },
  alternates: {
    canonical: "https://aiphotos.icu/ai-headshots",
  },
};

export default function AIHeadshotsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
