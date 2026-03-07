import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Upscaler - Enhance & Upscale Photos 4x",
  description: "Upscale and enhance images up to 4x with AI. Remove noise, sharpen details, and improve photo quality. Free online AI image upscaler using Real-ESRGAN technology.",
  keywords: [
    "AI image upscaler",
    "photo enhancer",
    "upscale image",
    "4x upscale",
    "image quality enhancer",
    "AI photo enhancement",
    "increase image resolution",
    "HD image converter",
    "Real-ESRGAN",
    "image sharpener",
    "remove noise from photo",
    "enhance low quality photos"
  ],
  openGraph: {
    title: "AI Image Upscaler - Enhance Photos to 4K Quality",
    description: "Upscale images up to 4x resolution with AI. Remove noise, sharpen details, and transform low-quality photos into stunning high-res images.",
    images: ["/examples/enhance-after.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Upscaler & Enhancer",
    description: "Upscale images 4x with AI. Remove noise, enhance details, improve quality instantly.",
    images: ["/examples/enhance-after.png"],
  },
  alternates: {
    canonical: "https://aiphotos.icu/photo-enhance",
  },
};

export default function PhotoEnhanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
