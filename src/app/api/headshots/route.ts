import { NextRequest, NextResponse } from "next/server";
import { getReplicateClient, fileToDataUrl, demoImages, runModel, models } from "@/lib/replicate";
import { createLogger, withLogging } from "@/lib/logger";

export const maxDuration = 180;

const styleDescriptions: Record<string, string> = {
  corporate: "formal business attire, dark suit, clean background",
  linkedin: "professional networking photo, smart casual, confident smile",
  creative: "modern approachable style, creative professional, warm lighting",
  executive: "c-suite executive portrait, powerful presence, premium quality",
  startup: "tech startup founder, casual but professional, innovative",
  actor: "entertainment industry headshot, dramatic lighting, expressive",
};

export async function POST(request: NextRequest) {
  const logger = createLogger("ai-headshots");
  
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const style = formData.get("style") as string || "corporate";
    const stylePrompt = formData.get("stylePrompt") as string;
    const gender = formData.get("gender") as string || "neutral";

    logger.start({
      imageSize: image?.size,
      imageType: image?.type,
      style,
      gender,
      hasCustomPrompt: !!stylePrompt,
    });

    if (!image) {
      logger.warn("validation_failed", { hasImage: false });
      return NextResponse.json({ error: "Missing image" }, { status: 400 });
    }

    const replicate = getReplicateClient();

    if (replicate) {
      logger.info("replicate_configured");
      
      const dataUrl = await withLogging(logger, "file_to_dataurl", () =>
        fileToDataUrl(image)
      );
      
      const genderPrefix = gender === "male" ? "man" : gender === "female" ? "woman" : "person";
      const styleDesc = stylePrompt || styleDescriptions[style] || "professional attire";
      const prompt = `professional corporate headshot portrait of a ${genderPrefix}, ${styleDesc}, clean studio background, professional lighting, linkedin profile photo, sharp focus, high quality, 8k`;
      
      logger.info("calling_sdxl", { 
        model: "sdxl", 
        prompt: prompt.substring(0, 100),
        gender,
        style,
      });
      
      const output = await withLogging(logger, "replicate_api", () =>
        runModel(replicate, models.sdxl, {
          prompt,
          image: dataUrl,
          num_outputs: 4,
          guidance_scale: 7.5,
          prompt_strength: 0.4,
          num_inference_steps: 35,
          scheduler: "K_EULER",
        })
      );

      const images = Array.isArray(output) ? output : [output];
      const validImages = images.filter((img): img is string => 
        typeof img === "string" && img.startsWith("http")
      );

      logger.info("output_received", {
        totalImages: images.length,
        validImages: validImages.length,
        sampleUrl: validImages[0]?.substring(0, 80),
      });

      if (validImages.length === 0) {
        logger.error("no_valid_images", new Error("No valid image URLs"), {
          rawOutput: JSON.stringify(output).substring(0, 200),
        });
        return NextResponse.json({ error: "No valid images generated" }, { status: 500 });
      }

      logger.end(true, { imageCount: validImages.length });

      return NextResponse.json({
        success: true,
        images: validImages,
        style,
        gender,
      });
    } else {
      logger.info("demo_mode");
      await new Promise((resolve) => setTimeout(resolve, 3000));

      logger.end(true, { demo: true });

      return NextResponse.json({
        success: true,
        images: demoImages.headshot,
        style,
        demo: true,
        message: "Demo mode - Set REPLICATE_API_TOKEN for real headshot generation",
      });
    }
  } catch (error) {
    logger.error("request_failed", error as Error);
    return NextResponse.json({ 
      error: "Failed to generate headshots",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
