import { NextRequest, NextResponse } from "next/server";
import { getReplicateClient, fileToDataUrl, demoImages, runModel, models } from "@/lib/replicate";
import { createLogger, withLogging } from "@/lib/logger";

export const maxDuration = 120;

const stylePrompts: Record<string, string> = {
  royal: "royal portrait painting, wearing ornate gold crown and red velvet royal cape, renaissance oil painting style, dramatic lighting",
  disney: "disney pixar 3d animated character, big cute eyes, colorful, friendly expression, high quality 3d render",
  oil: "classical oil painting portrait, rembrandt style, dark background, dramatic chiaroscuro lighting, museum quality",
  watercolor: "soft watercolor painting, delicate brushstrokes, pastel colors, dreamy atmosphere",
  anime: "anime style, japanese animation, vibrant colors, expressive eyes",
  popart: "pop art style, bold colors, andy warhol inspired, graphic design",
  renaissance: "renaissance master painting, classical composition, dramatic lighting, museum quality",
  cartoon: "cartoon style illustration, colorful, fun, animated movie quality",
  fantasy: "fantasy hero portrait, epic armor, magical lighting, dramatic pose",
  space: "space explorer portrait, astronaut suit, cosmic background, sci-fi",
  vangogh: "van gogh style, thick brushstrokes, swirling patterns, impressionist",
  sketch: "detailed pencil sketch, hand-drawn, artistic hatching",
};

export async function POST(request: NextRequest) {
  const logger = createLogger("pet-portrait");
  
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const style = formData.get("style") as string;
    const petType = formData.get("petType") as string || "pet";

    logger.start({
      style,
      petType,
      imageSize: image?.size,
      imageType: image?.type,
    });

    if (!image || !style) {
      logger.warn("validation_failed", { hasImage: !!image, hasStyle: !!style });
      return NextResponse.json({ error: "Missing image or style" }, { status: 400 });
    }

    const replicate = getReplicateClient();

    if (replicate) {
      logger.info("replicate_configured");
      
      // Convert image to data URL
      const dataUrl = await withLogging(logger, "file_to_dataurl", () => 
        fileToDataUrl(image)
      );
      
      const styleDesc = stylePrompts[style] || "artistic portrait";
      const prompt = `${styleDesc}, portrait of a ${petType}, highly detailed, professional quality, masterpiece`;
      
      logger.info("generating", { prompt: prompt.substring(0, 100), model: "sdxl" });

      // Call Replicate API
      const output = await withLogging(logger, "replicate_api", () =>
        runModel(replicate, models.sdxl, {
          prompt,
          image: dataUrl,
          num_outputs: 4,
          guidance_scale: 7.5,
          prompt_strength: 0.75,
          num_inference_steps: 35,
          scheduler: "K_EULER",
        })
      );

      const images = Array.isArray(output) ? output : [output];
      
      // Validate output
      const validImages = images.filter((img): img is string => 
        typeof img === "string" && img.startsWith("http")
      );
      
      logger.info("output_received", {
        totalImages: images.length,
        validImages: validImages.length,
        sampleUrl: validImages[0]?.substring(0, 80),
      });

      if (validImages.length === 0) {
        logger.error("no_valid_images", new Error("No valid image URLs in output"), {
          rawOutput: JSON.stringify(output).substring(0, 200),
        });
        return NextResponse.json({ error: "No valid images generated" }, { status: 500 });
      }

      logger.end(true, { imageCount: validImages.length });

      return NextResponse.json({
        success: true,
        images: validImages,
        style,
        petType,
      });
    } else {
      // Demo mode
      logger.info("demo_mode");
      await new Promise((resolve) => setTimeout(resolve, 3000));

      logger.end(true, { demo: true });
      
      return NextResponse.json({
        success: true,
        images: demoImages.petPortrait,
        style,
        demo: true,
        message: "Demo mode - Set REPLICATE_API_TOKEN for real pet portraits",
      });
    }
  } catch (error) {
    logger.error("request_failed", error as Error);
    
    return NextResponse.json({ 
      error: "Failed to generate portrait",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
