import Replicate from "replicate";
import fs from "fs";
import path from "path";
import https from "https";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Sample pet images to transform
const petImages = [
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=512", // Golden retriever
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=512", // Orange cat
];

const styles = [
  { id: "royal", prompt: "royal portrait painting of a pet, wearing crown and royal cape, renaissance style, detailed oil painting, dramatic lighting, regal pose" },
  { id: "disney", prompt: "disney pixar 3d animated character of a cute pet, big expressive eyes, colorful, friendly expression, high quality 3d render" },
  { id: "oil", prompt: "classical oil painting portrait of a pet, rembrandt style, dark background, dramatic chiaroscuro lighting, museum quality" },
];

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function generatePetPortrait(imageUrl: string, style: typeof styles[0]) {
  console.log(`Generating ${style.id} style...`);
  
  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: style.prompt,
          image: imageUrl,
          num_outputs: 1,
          guidance_scale: 7.5,
          prompt_strength: 0.8,
          num_inference_steps: 30,
        },
      }
    );
    
    console.log(`Generated:`, output);
    return output;
  } catch (error) {
    console.error(`Error generating ${style.id}:`, error);
    return null;
  }
}

async function main() {
  console.log("🎨 Generating real pet portrait examples...\n");
  
  // Generate one example
  const result = await generatePetPortrait(petImages[0], styles[0]);
  console.log("\nResult:", result);
}

main().catch(console.error);
