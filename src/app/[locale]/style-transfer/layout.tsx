import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Style Transfer - Transform Photos Into Art",
  description: "Transform your photos into stunning artwork with AI style transfer. Van Gogh, Monet, Picasso, anime, watercolor, and more artistic styles. Free online AI art generator.",
  keywords: [
    "AI style transfer",
    "photo to art",
    "AI art generator",
    "Van Gogh filter",
    "artistic photo filter",
    "neural style transfer",
    "photo to painting",
    "Monet style",
    "Picasso style",
    "anime filter",
    "watercolor effect",
    "oil painting effect"
  ],
  openGraph: {
    title: "AI Style Transfer - Turn Photos Into Masterpieces",
    description: "Transform photos into stunning artwork. Van Gogh, Monet, anime, watercolor & more artistic styles powered by AI.",
    images: ["/examples/style-after.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Style Transfer",
    description: "Transform your photos into stunning artwork with AI. Van Gogh, Monet, anime & more!",
    images: ["/examples/style-after.png"],
  },
  alternates: {
    canonical: "https://aiphotos.icu/style-transfer",
  },
};

export default function StyleTransferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
