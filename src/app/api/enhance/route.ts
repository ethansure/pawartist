import { NextRequest, NextResponse } from "next/server";
import { getReplicateClient, fileToDataUrl, demoImages, runModel, models } from "@/lib/replicate";
import { createLogger, withLogging } from "@/lib/logger";

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const logger = createLogger("photo-enhance");
  
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const scale = parseInt(formData.get("scale") as string) || 2;

    logger.start({
      imageSize: image?.size,
      imageType: image?.type,
      scale,
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
      
      const actualScale = Math.min(scale, 4);
      logger.info("calling_realesrgan", { model: "real-esrgan", scale: actualScale });
      
      const output = await withLogging(logger, "replicate_api", () =>
        runModel(replicate, models.realEsrgan, {
          image: dataUrl,
          scale: actualScale,
          face_enhance: false,
        })
      );

      logger.info("output_received", {
        outputType: typeof output,
        outputUrl: typeof output === "string" ? output.substring(0, 80) : "not a string",
      });

      if (typeof output !== "string" || !output.startsWith("http")) {
        logger.error("invalid_output", new Error("Output is not a valid URL"), {
          rawOutput: JSON.stringify(output).substring(0, 200),
        });
        return NextResponse.json({ error: "Invalid output from API" }, { status: 500 });
      }

      logger.end(true, { scale: actualScale });

      return NextResponse.json({
        success: true,
        image: output,
        scale: actualScale,
      });
    } else {
      logger.info("demo_mode");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      logger.end(true, { demo: true });

      return NextResponse.json({
        success: true,
        image: demoImages.enhanced,
        scale,
        demo: true,
        message: "Demo mode - Set REPLICATE_API_TOKEN for real enhancement",
      });
    }
  } catch (error) {
    logger.error("request_failed", error as Error);
    return NextResponse.json({ 
      error: "Failed to enhance photo",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
