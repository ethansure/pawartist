import { NextRequest, NextResponse } from "next/server";
import { getReplicateClient, fileToDataUrl, demoImages, runModel, models } from "@/lib/replicate";
import { createLogger, withLogging } from "@/lib/logger";

export const maxDuration = 120;

const stylePrompts: Record<string, string> = {
  vangogh: "in the style of Van Gogh, thick brushstrokes, swirling patterns, post-impressionist",
  monet: "in the style of Monet, impressionist, soft colors, light and shadow",
  picasso: "in the style of Picasso, cubist, geometric shapes, abstract",
  anime: "anime style, japanese animation, vibrant colors",
  cartoon: "3D cartoon style, pixar-like, colorful, friendly",
  sketch: "pencil sketch, hand-drawn, black and white",
  watercolor: "watercolor painting, soft edges, flowing colors",
  oilpainting: "classical oil painting, rich textures, museum quality",
  popart: "pop art style, bold colors, comic book, warhol",
  cyberpunk: "cyberpunk style, neon lights, futuristic",
  renaissance: "renaissance painting, classical, dramatic lighting",
  abstract: "abstract art, bold shapes, modern art",
};

export async function POST(request: NextRequest) {
  const logger = createLogger("style-transfer");
  
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const style = formData.get("style") as string;
    const customPrompt = formData.get("stylePrompt") as string;
    const strength = parseFloat(formData.get("strength") as string) || 0.75;
    
    const stylePrompt = customPrompt || stylePrompts[style] || "artistic transformation";

    logger.start({
      imageSize: image?.size,
      imageType: image?.type,
      style,
      strength,
      hasCustomPrompt: !!customPrompt,
    });

    if (!image || !style) {
      logger.warn("validation_failed", { hasImage: !!image, hasStyle: !!style });
      return NextResponse.json({ error: "Missing image or style" }, { status: 400 });
    }

    const replicate = getReplicateClient();

    if (replicate) {
      logger.info("replicate_configured");
      
      const dataUrl = await withLogging(logger, "file_to_dataurl", () =>
        fileToDataUrl(image)
      );
      
      const enhancedPrompt = `Transform this image ${stylePrompt}, artistic masterpiece, highly detailed, professional quality`;
      
      logger.info("calling_sdxl", { 
        model: "sdxl", 
        prompt: enhancedPrompt.substring(0, 100),
        strength,
      });
      
      const output = await withLogging(logger, "replicate_api", () =>
        runModel(replicate, models.sdxl, {
          prompt: enhancedPrompt,
          image: dataUrl,
          num_outputs: 1,
          guidance_scale: 7.5,
          prompt_strength: strength,
          num_inference_steps: 40,
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

      logger.end(true);
      
      return NextResponse.json({
        success: true,
        image: validImages[0],
        style,
        strength,
      });
    } else {
      logger.info("demo_mode");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      logger.end(true, { demo: true });

      return NextResponse.json({
        success: true,
        image: demoImages.styleTransfer,
        style,
        demo: true,
        message: "Demo mode - Set REPLICATE_API_TOKEN for real style transfer",
      });
    }
  } catch (error) {
    logger.error("request_failed", error as Error);
    return NextResponse.json({ 
      error: "Failed to apply style",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
