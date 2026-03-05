"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { UploadZone } from "@/components/upload/upload-zone";
import { StyleSelector } from "@/components/upload/style-selector";
import { PetSelector } from "@/components/upload/pet-selector";
import { ResultsGallery } from "@/components/results/results-gallery";
import { artStyles, ArtStyle } from "@/lib/styles";
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Upload, 
  Palette, 
  Settings, 
  Wand2,
  CheckCircle 
} from "lucide-react";
import { toast } from "sonner";

type Step = "upload" | "style" | "options" | "generating" | "results";

const steps: { id: string; label: string; icon: typeof Upload }[] = [
  { id: "upload", label: "Upload", icon: Upload },
  { id: "style", label: "Style", icon: Palette },
  { id: "options", label: "Options", icon: Settings },
  { id: "generating", label: "Generate", icon: Wand2 },
];

export function CreatePageContent() {
  const searchParams = useSearchParams();

  // State
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [uploadedImage, setUploadedImage] = useState<{ file: File; preview: string } | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle | null>(null);
  const [petType, setPetType] = useState("dog");
  const [background, setBackground] = useState("style-default");
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle pre-selected style from URL
  useEffect(() => {
    const styleParam = searchParams.get("style");
    if (styleParam) {
      const style = artStyles.find((s) => s.id === styleParam);
      if (style) {
        setSelectedStyle(style);
      }
    }
  }, [searchParams]);

  const handleImageUpload = (file: File, preview: string) => {
    setUploadedImage({ file, preview });
  };

  const handleClearImage = () => {
    if (uploadedImage?.preview) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    setUploadedImage(null);
  };

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedStyle) {
      toast.error("Please upload an image and select a style");
      return;
    }

    setCurrentStep("generating");
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate generation progress
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("image", uploadedImage.file);
      formData.append("style", selectedStyle.id);
      formData.append("petType", petType);
      formData.append("background", background);
      formData.append("prompt", selectedStyle.prompt);

      // Call API
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = await response.json();
      
      clearInterval(progressInterval);
      setGenerationProgress(100);

      // Set generated images
      setGeneratedImages(data.images || []);
      
      setTimeout(() => {
        setCurrentStep("results");
        setIsGenerating(false);
      }, 500);

      toast.success("Portraits generated successfully!");
    } catch (error) {
      clearInterval(progressInterval);
      setIsGenerating(false);
      setCurrentStep("options");
      toast.error("Failed to generate portraits. Please try again.");
      console.error("Generation error:", error);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case "upload":
        return !!uploadedImage;
      case "style":
        return !!selectedStyle;
      case "options":
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;

    switch (currentStep) {
      case "upload":
        setCurrentStep("style");
        break;
      case "style":
        setCurrentStep("options");
        break;
      case "options":
        handleGenerate();
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case "style":
        setCurrentStep("upload");
        break;
      case "options":
        setCurrentStep("style");
        break;
      case "results":
        setCurrentStep("options");
        break;
    }
  };

  const handleStartOver = () => {
    handleClearImage();
    setSelectedStyle(null);
    setPetType("dog");
    setBackground("style-default");
    setGeneratedImages([]);
    setCurrentStep("upload");
  };

  const getCurrentStepIndex = () => {
    const stepIds = steps.map((s) => s.id);
    const stepToFind = currentStep === "results" ? "generating" : currentStep;
    return stepIds.indexOf(stepToFind);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-3 bg-orange-100 text-orange-700">
            <Sparkles className="mr-1 h-3 w-3" />
            AI Portrait Creator
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Create Your Pet&apos;s Portrait
          </h1>
          <p className="text-muted-foreground">
            Upload a photo, choose a style, and watch the magic happen!
          </p>
        </div>

        {/* Progress Steps */}
        {currentStep !== "results" && (
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 md:gap-4">
              {steps.map((step, index) => {
                const isCompleted = index < getCurrentStepIndex();
                const stepToCheck = String(currentStep) === "results" ? "generating" : currentStep;
                const isCurrent = step.id === stepToCheck;
                const Icon = step.icon;

                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isCompleted
                            ? "bg-primary text-white"
                            : isCurrent
                            ? "bg-primary/20 text-primary border-2 border-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <span className="text-xs mt-1 hidden sm:block">{step.label}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-8 md:w-16 h-0.5 mx-2 ${
                          isCompleted ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {currentStep === "upload" && "Upload Your Pet's Photo"}
              {currentStep === "style" && "Choose an Art Style"}
              {currentStep === "options" && "Customize Your Portrait"}
              {currentStep === "generating" && "Creating Your Masterpiece..."}
              {currentStep === "results" && "Your Portraits Are Ready!"}
            </CardTitle>
            <CardDescription>
              {currentStep === "upload" && "Upload a clear photo of your pet for the best results"}
              {currentStep === "style" && "Select from over 50 beautiful art styles"}
              {currentStep === "options" && "Fine-tune your portrait settings"}
              {currentStep === "generating" && "Our AI is working its magic"}
              {currentStep === "results" && "Download, share, or create more!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Upload Step */}
            {currentStep === "upload" && (
              <UploadZone
                onImageUpload={handleImageUpload}
                currentImage={uploadedImage?.preview || null}
                onClear={handleClearImage}
              />
            )}

            {/* Style Selection Step */}
            {currentStep === "style" && (
              <StyleSelector
                selectedStyle={selectedStyle}
                onSelectStyle={setSelectedStyle}
              />
            )}

            {/* Options Step */}
            {currentStep === "options" && (
              <div className="space-y-8">
                {/* Preview */}
                <div className="flex gap-6 flex-col md:flex-row">
                  <div className="flex-1">
                    <h4 className="font-medium mb-3">Your Photo</h4>
                    {uploadedImage && (
                      <div className="relative aspect-square max-w-[200px] rounded-xl overflow-hidden">
                        <img
                          src={uploadedImage.preview}
                          alt="Your pet"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-3">Selected Style</h4>
                    {selectedStyle && (
                      <div className="relative aspect-square max-w-[200px] rounded-xl overflow-hidden">
                        <img
                          src={selectedStyle.preview}
                          alt={selectedStyle.name}
                          className="object-cover w-full h-full"
                        />
                        <Badge className="absolute bottom-2 left-2 bg-black/70">
                          {selectedStyle.name}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Options */}
                <PetSelector
                  selectedPetType={petType}
                  onSelectPetType={setPetType}
                  selectedBackground={background}
                  onSelectBackground={setBackground}
                />
              </div>
            )}

            {/* Generating Step */}
            {currentStep === "generating" && (
              <div className="py-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-accent flex items-center justify-center animate-pulse-glow">
                  <Wand2 className="h-12 w-12 text-white animate-bounce" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Creating your {selectedStyle?.name} portrait...
                </h3>
                <p className="text-muted-foreground mb-6">
                  This usually takes about 30 seconds
                </p>
                <div className="max-w-md mx-auto">
                  <Progress value={generationProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {Math.round(generationProgress)}% complete
                  </p>
                </div>
              </div>
            )}

            {/* Results Step */}
            {currentStep === "results" && (
              <ResultsGallery
                images={generatedImages}
                styleName={selectedStyle?.name || ""}
                onStartOver={handleStartOver}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        {currentStep !== "generating" && currentStep !== "results" && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === "upload"}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gradient-accent text-white"
            >
              {currentStep === "options" ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Portrait
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
