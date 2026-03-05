"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Download,
  Share2,
  RefreshCw,
  Twitter,
  Facebook,
  Link2,
  Check,
  Lock,
  Sparkles,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";

interface ResultsGalleryProps {
  images: string[];
  styleName: string;
  onStartOver: () => void;
}

// Demo images when API isn't configured
const demoImages = [
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800",
  "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800",
  "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800",
  "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=800",
];

export function ResultsGallery({ images, styleName, onStartOver }: ResultsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Use demo images if no images provided
  const displayImages = images.length > 0 ? images : demoImages;
  const isPaid = false; // This would be determined by user's subscription

  const handleDownload = async (imageUrl: string, index: number) => {
    if (!isPaid) {
      toast.info("Upgrade to Pro for HD downloads without watermarks!");
      // For demo, still allow download
    }

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pet-portrait-${styleName.toLowerCase().replace(/\s+/g, "-")}-${index + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Portrait downloaded!");
    } catch (error) {
      toast.error("Failed to download. Please try again.");
    }
  };

  const handleShare = async (platform: "twitter" | "facebook" | "copy") => {
    const shareUrl = window.location.href;
    const shareText = `Check out this amazing ${styleName} portrait of my pet! Created with PetPortraitAI 🎨🐾`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        break;
      case "copy":
        await navigator.clipboard.writeText(shareUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
        toast.success("Link copied to clipboard!");
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-6 py-2 mb-4">
          <Check className="h-5 w-5" />
          <span className="font-medium">4 portraits generated!</span>
        </div>
        <p className="text-muted-foreground">
          Click on any portrait to view it in full size
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4">
        {displayImages.map((image, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative aspect-square">
              <Image
                src={image}
                alt={`${styleName} portrait variation ${index + 1}`}
                fill
                className="object-cover"
              />
              
              {/* Watermark Overlay for free users */}
              {!isPaid && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,rgba(0,0,0,0.03)_35px,rgba(0,0,0,0.03)_70px)]" />
                  <span className="text-black/10 font-bold text-2xl rotate-[-30deg] select-none">
                    PetPortraitAI
                  </span>
                </div>
              )}

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(image, index);
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              {/* Variation Badge */}
              <Badge className="absolute top-2 left-2 bg-black/70 text-white">
                #{index + 1}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Upgrade CTA */}
      {!isPaid && (
        <Card className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Lock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold">Remove watermarks & get HD downloads</p>
                <p className="text-sm text-muted-foreground">Upgrade to Pro for just $9.99</p>
              </div>
            </div>
            <Button className="gradient-accent text-white">
              <Sparkles className="mr-2 h-4 w-4" />
              Upgrade to Pro
            </Button>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="outline" onClick={onStartOver}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Create Another
        </Button>
        <Button variant="outline" onClick={() => handleShare("twitter")}>
          <Twitter className="mr-2 h-4 w-4" />
          Tweet
        </Button>
        <Button variant="outline" onClick={() => handleShare("facebook")}>
          <Facebook className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" onClick={() => handleShare("copy")}>
          {copiedLink ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <Link2 className="mr-2 h-4 w-4" />
          )}
          {copiedLink ? "Copied!" : "Copy Link"}
        </Button>
      </div>

      {/* Print Shop CTA */}
      <Card className="p-6 text-center bg-muted/50">
        <ShoppingCart className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
        <h3 className="font-semibold mb-1">Want a physical print?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Turn your digital portrait into a beautiful canvas or framed print!
        </p>
        <Button variant="outline" disabled>
          Coming Soon
        </Button>
      </Card>

      {/* Full-size Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{styleName} Portrait</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative aspect-square w-full">
              <Image
                src={selectedImage}
                alt={`${styleName} portrait`}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="flex justify-center gap-3 mt-4">
            <Button
              onClick={() => {
                if (selectedImage) {
                  handleDownload(selectedImage, displayImages.indexOf(selectedImage));
                }
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" onClick={() => handleShare("copy")}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
