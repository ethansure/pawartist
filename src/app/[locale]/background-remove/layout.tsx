import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Background Remover - Remove Image Background Free",
  description: "Remove image backgrounds instantly with AI. Perfect for product photos, portraits, and design work. Free online background remover with transparent PNG output.",
  keywords: [
    "background remover",
    "remove background",
    "AI background removal",
    "transparent background",
    "remove bg free",
    "product photo background",
    "portrait background remover",
    "image background eraser",
    "cut out image",
    "remove background online",
    "rembg",
    "photo cutout"
  ],
  openGraph: {
    title: "AI Background Remover - Remove Backgrounds Instantly",
    description: "Remove image backgrounds in seconds with AI. Perfect for product photos, portraits, and designs. Free transparent PNG output.",
    images: ["/examples/bg-remove-after.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Background Remover",
    description: "Remove image backgrounds instantly with AI. Free transparent PNG output.",
    images: ["/examples/bg-remove-after.png"],
  },
  alternates: {
    canonical: "https://aiphotos.icu/background-remove",
  },
};

export default function BackgroundRemoveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
