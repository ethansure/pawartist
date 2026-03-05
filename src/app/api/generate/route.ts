import { NextRequest, NextResponse } from "next/server";

// This is a mock implementation. In production, you would use Replicate API.
// To enable real AI generation:
// 1. Sign up at https://replicate.com
// 2. Get your API token
// 3. Set REPLICATE_API_TOKEN in .env.local
// 4. Uncomment the Replicate code below

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const style = formData.get("style") as string;
    const petType = formData.get("petType") as string;
    const background = formData.get("background") as string;
    const prompt = formData.get("prompt") as string;

    if (!image || !style) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if Replicate is configured
    const replicateToken = process.env.REPLICATE_API_TOKEN;
    
    if (replicateToken) {
      // Real implementation with Replicate
      const Replicate = (await import("replicate")).default;
      const replicate = new Replicate({
        auth: replicateToken,
      });

      // Convert image to base64
      const imageBuffer = await image.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      const dataUrl = `data:${image.type};base64,${base64Image}`;

      // Build enhanced prompt
      const enhancedPrompt = `${prompt}, featuring a ${petType}, high quality, detailed, professional art`;

      // Use a suitable model for image-to-image transformation
      // You can use models like:
      // - stability-ai/sdxl for general image generation
      // - tencentarc/photomaker for photo stylization
      
      const output = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            prompt: enhancedPrompt,
            image: dataUrl,
            num_outputs: 4,
            guidance_scale: 7.5,
            num_inference_steps: 50,
          },
        }
      );

      return NextResponse.json({
        success: true,
        images: output as string[],
        style,
        petType,
      });
    } else {
      // Demo mode - return placeholder images
      // In production, this would call the actual AI service
      console.log("Demo mode: Replicate API not configured");
      console.log("Received:", { style, petType, background, prompt: prompt?.slice(0, 50) + "..." });

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Return demo images based on style
      const demoImages = [
        "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800",
        "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800",
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800",
        "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=800",
      ];

      return NextResponse.json({
        success: true,
        images: demoImages,
        style,
        petType,
        demo: true,
        message: "Demo mode - Set REPLICATE_API_TOKEN for real AI generation",
      });
    }
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate portraits" },
      { status: 500 }
    );
  }
}
