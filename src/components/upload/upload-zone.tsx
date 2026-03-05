"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon, Camera, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onImageUpload: (file: File, preview: string) => void;
  currentImage: string | null;
  onClear: () => void;
}

export function UploadZone({ onImageUpload, currentImage, onClear }: UploadZoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      const file = acceptedFiles[0];
      
      if (!file) return;

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File too large. Please upload an image under 10MB.");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file (JPEG, PNG, WebP).");
        return;
      }

      const preview = URL.createObjectURL(file);
      onImageUpload(file, preview);
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    multiple: false,
  });

  if (currentImage) {
    return (
      <div className="relative w-full aspect-square max-w-md mx-auto">
        <Image
          src={currentImage}
          alt="Uploaded pet photo"
          fill
          className="object-cover rounded-2xl shadow-lg"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-3 right-3 rounded-full shadow-lg"
          onClick={onClear}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
          <p className="text-white text-sm text-center">
            ✓ Photo uploaded successfully!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={cn(
          "upload-zone rounded-2xl p-8 text-center cursor-pointer transition-all",
          isDragActive && "dragging border-primary bg-primary/5"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center transition-colors",
            isDragActive ? "bg-primary text-white" : "bg-muted"
          )}>
            {isDragActive ? (
              <Upload className="h-10 w-10 animate-bounce" />
            ) : (
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">
              {isDragActive ? "Drop your photo here!" : "Upload your pet's photo"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to browse
            </p>
          </div>

          <Button variant="outline" className="mt-2">
            <Camera className="mr-2 h-4 w-4" />
            Choose Photo
          </Button>

          <p className="text-xs text-muted-foreground">
            JPEG, PNG or WebP • Max 10MB
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-destructive bg-destructive/10 rounded-lg p-3">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 bg-muted/50 rounded-xl p-4">
        <h4 className="font-medium text-sm mb-2">📸 Tips for best results:</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Use a clear, well-lit photo</li>
          <li>• Make sure your pet&apos;s face is clearly visible</li>
          <li>• Front-facing or 3/4 angle works best</li>
          <li>• Avoid blurry or dark images</li>
        </ul>
      </div>
    </div>
  );
}
