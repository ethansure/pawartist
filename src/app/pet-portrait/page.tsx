"use client";

import { useState } from "react";
import Link from "next/link";

const artStyles = [
  { id: "royal", name: "Royal Portrait", emoji: "👑", desc: "Majestic renaissance" },
  { id: "disney", name: "Disney Style", emoji: "✨", desc: "Pixar-like 3D" },
  { id: "oil", name: "Oil Painting", emoji: "🎨", desc: "Classic fine art" },
  { id: "watercolor", name: "Watercolor", emoji: "💧", desc: "Soft, dreamy" },
  { id: "anime", name: "Anime", emoji: "🌸", desc: "Japanese animation" },
  { id: "popart", name: "Pop Art", emoji: "🔴", desc: "Warhol-inspired" },
  { id: "sketch", name: "Pencil Sketch", emoji: "✏️", desc: "Hand-drawn" },
  { id: "fantasy", name: "Fantasy Hero", emoji: "⚔️", desc: "Epic adventure" },
  { id: "space", name: "Space Explorer", emoji: "🚀", desc: "Cosmic journey" },
  { id: "vangogh", name: "Van Gogh", emoji: "🌻", desc: "Starry night" },
  { id: "minimalist", name: "Minimalist", emoji: "◻️", desc: "Clean lines" },
  { id: "stainedglass", name: "Stained Glass", emoji: "🪟", desc: "Cathedral art" },
  { id: "cartoon", name: "Cartoon", emoji: "🎬", desc: "Fun & playful" },
  { id: "renaissance", name: "Renaissance", emoji: "🏛️", desc: "Classical master" },
  { id: "cyberpunk", name: "Cyberpunk", emoji: "🤖", desc: "Neon future" },
  { id: "christmas", name: "Christmas", emoji: "🎄", desc: "Holiday spirit" },
];

const petTypes = [
  { id: "dog", emoji: "🐕", name: "Dog" },
  { id: "cat", emoji: "🐱", name: "Cat" },
  { id: "bird", emoji: "🐦", name: "Bird" },
  { id: "rabbit", emoji: "🐰", name: "Rabbit" },
  { id: "hamster", emoji: "🐹", name: "Hamster" },
  { id: "other", emoji: "🐾", name: "Other" },
];

export default function PetPortrait() {
  const [selectedStyle, setSelectedStyle] = useState("royal");
  const [selectedPet, setSelectedPet] = useState("dog");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage) return;
    setIsGenerating(true);
    
    // Simulate generation (replace with actual Replicate API call)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Demo results
    setGeneratedImages([
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400",
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    ]);
    setIsGenerating(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Pet Portrait AI
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-amber-600 transition text-sm">
              ← Back to Tools
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🐾 Pet Portrait AI Generator
            </h1>
            <p className="text-gray-600">Transform your pet into stunning artwork in seconds</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Upload & Settings */}
            <div className="space-y-6">
              {/* Upload Area */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="font-semibold text-lg mb-4">1. Upload Your Pet Photo</h2>
                <div
                  className="border-2 border-dashed border-amber-200 rounded-xl p-8 text-center hover:border-amber-400 transition cursor-pointer"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("petFileInput")?.click()}
                >
                  <input
                    id="petFileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => setUploadedImage(e.target?.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {uploadedImage ? (
                    <div className="relative">
                      <img src={uploadedImage} alt="Uploaded pet" className="w-full h-48 object-cover rounded-xl" />
                      <button 
                        className="absolute top-2 right-2 bg-white/80 p-2 rounded-full hover:bg-white transition"
                        onClick={(e) => { e.stopPropagation(); setUploadedImage(null); }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="text-5xl mb-3">📸</div>
                      <p className="font-medium text-gray-700">Drop your pet photo here</p>
                      <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                    </>
                  )}
                </div>
              </div>

              {/* Pet Type */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="font-semibold text-lg mb-4">2. Select Pet Type</h2>
                <div className="grid grid-cols-3 gap-3">
                  {petTypes.map((pet) => (
                    <button
                      key={pet.id}
                      onClick={() => setSelectedPet(pet.id)}
                      className={`p-3 rounded-xl border-2 transition text-center ${
                        selectedPet === pet.id
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-200 hover:border-amber-300"
                      }`}
                    >
                      <div className="text-2xl">{pet.emoji}</div>
                      <div className="text-sm font-medium">{pet.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!uploadedImage || isGenerating}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition ${
                  uploadedImage && !isGenerating
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:scale-[1.02]"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Generating Magic...
                  </span>
                ) : (
                  "✨ Generate Portraits — Free"
                )}
              </button>
            </div>

            {/* Right: Style Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="font-semibold text-lg mb-4">3. Choose Art Style</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto">
                {artStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-3 rounded-xl border-2 transition text-center hover:scale-105 ${
                      selectedStyle === style.id
                        ? "border-amber-500 bg-amber-50 shadow-md"
                        : "border-gray-200 hover:border-amber-300"
                    }`}
                  >
                    <div className="text-3xl mb-1">{style.emoji}</div>
                    <div className="text-sm font-medium">{style.name}</div>
                    <div className="text-xs text-gray-500">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          {generatedImages.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center mb-6">🎨 Your Pet Portraits</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {generatedImages.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={img}
                      alt={`Generated portrait ${i + 1}`}
                      className="w-full aspect-square object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center gap-2">
                      <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-500 mt-4 text-sm">
                💎 Upgrade to HD for print-quality downloads
              </p>
            </div>
          )}

          {/* Pricing Preview */}
          <div className="mt-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Want More Portraits?</h2>
              <p className="mb-6 opacity-90">Unlock HD quality, all 50+ styles, and unlimited generations</p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 rounded-xl px-6 py-3">
                  <div className="font-bold text-2xl">$9.99</div>
                  <div className="text-sm opacity-80">10 Portraits</div>
                </div>
                <div className="bg-white rounded-xl px-6 py-3 text-amber-600 scale-110 shadow-lg">
                  <div className="text-xs font-bold text-amber-500 mb-1">BEST VALUE</div>
                  <div className="font-bold text-2xl">$19.99</div>
                  <div className="text-sm">30 Portraits + HD</div>
                </div>
                <div className="bg-white/20 rounded-xl px-6 py-3">
                  <div className="font-bold text-2xl">$39.99</div>
                  <div className="text-sm opacity-80">Unlimited</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
