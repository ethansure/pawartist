import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Pet Portrait Generator - Transform Your Pet Into Art",
  description: "Turn your pet photos into stunning artwork with AI. Royal portraits, Disney Pixar style, oil paintings, anime, and 70+ art styles. Upload your dog, cat, or any pet photo and create beautiful art instantly.",
  keywords: [
    "AI pet portrait",
    "pet portrait generator",
    "dog portrait AI",
    "cat portrait AI",
    "pet art generator",
    "pet to painting",
    "royal pet portrait",
    "disney pet portrait",
    "pet caricature",
    "custom pet art",
    "AI art generator",
    "pet photo to art"
  ],
  openGraph: {
    title: "AI Pet Portrait Generator - Transform Your Pet Into Stunning Art",
    description: "Turn your beloved pet into beautiful artwork. 70+ art styles including Royal, Disney, Oil Painting, Anime & more. Free to try!",
    images: ["/examples/pet-royal-real.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Pet Portrait Generator",
    description: "Transform your pet photos into stunning artwork with AI. 70+ art styles!",
    images: ["/examples/pet-royal-real.png"],
  },
  alternates: {
    canonical: "https://aiphotos.icu/pet-portrait",
  },
};

export default function PetPortraitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
