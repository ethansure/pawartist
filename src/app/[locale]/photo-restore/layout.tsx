import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Photo Restoration - Restore Old & Damaged Photos",
  description: "Restore old, damaged, and faded photos with AI. Fix scratches, enhance faces, colorize black & white photos, and bring memories back to life. Free online photo restoration tool.",
  keywords: [
    "AI photo restoration",
    "restore old photos",
    "fix damaged photos",
    "photo repair online",
    "colorize old photos",
    "enhance old photos",
    "scratch removal",
    "face enhancement AI",
    "photo restoration free",
    "repair vintage photos",
    "restore family photos",
    "GFPGAN"
  ],
  openGraph: {
    title: "AI Photo Restoration - Bring Old Photos Back to Life",
    description: "Restore old, damaged, and faded photos instantly with AI. Fix scratches, enhance faces, and colorize black & white photos.",
    images: ["/examples/restore-after.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Photo Restoration Tool",
    description: "Restore damaged and old photos with AI. Fix scratches, enhance faces, colorize B&W photos.",
    images: ["/examples/restore-after.png"],
  },
  alternates: {
    canonical: "https://aiphotos.icu/photo-restore",
  },
};

export default function PhotoRestoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
