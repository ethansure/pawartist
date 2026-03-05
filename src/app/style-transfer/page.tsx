"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";

const styles = [
  { id: "vangogh", name: "Van Gogh", emoji: "🌻", desc: "Starry Night swirls" },
  { id: "monet", name: "Monet", emoji: "🌸", desc: "Impressionist gardens" },
  { id: "picasso", name: "Picasso", emoji: "🎭", desc: "Cubist abstraction" },
  { id: "anime", name: "Anime", emoji: "🌸", desc: "Japanese animation" },
  { id: "cartoon", name: "3D Cartoon", emoji: "🎬", desc: "Pixar-like 3D" },
  { id: "sketch", name: "Pencil Sketch", emoji: "✏️", desc: "Hand-drawn look" },
  { id: "watercolor", name: "Watercolor", emoji: "💧", desc: "Soft painted" },
  { id: "oilpainting", name: "Oil Painting", emoji: "🖼️", desc: "Classic fine art" },
  { id: "popart", name: "Pop Art", emoji: "🔴", desc: "Warhol colors" },
  { id: "cyberpunk", name: "Cyberpunk", emoji: "🌆", desc: "Neon futuristic" },
  { id: "renaissance", name: "Renaissance", emoji: "🏛️", desc: "Classical master" },
  { id: "abstract", name: "Abstract", emoji: "🎨", desc: "Modern abstract" },
];

// Real AI-generated example
const realExample = {
  before: "/examples/style-before.jpg",
  after: "/examples/style-after.png",
  style: "Van Gogh",
};

export default function StyleTransferPage() {
  const [mode, setMode] = useState<"landing" | "create">("landing");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [strength, setStrength] = useState(70);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "image/*": [] }, maxFiles: 1 });

  const handleTransfer = async () => {
    if (!uploadedFile || !selectedStyle) return;
    setProcessing(true);
    setProgress(0);

    const interval = setInterval(() => setProgress(p => Math.min(p + 6, 90)), 400);

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("style", selectedStyle);
      formData.append("strength", String(strength));

      const response = await fetch("/api/style-transfer", { method: "POST", body: formData });
      const data = await response.json();
      clearInterval(interval);
      setProgress(100);
      if (data.success) setResult(data.image);
    } catch (e) {
      console.error(e);
    } finally {
      clearInterval(interval);
      setProcessing(false);
    }
  };

  if (mode === "landing" && !uploadedImage) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">📸</span>
              <span className="font-semibold">PhotoICU</span>
            </Link>
            <button onClick={() => setMode("create")} className="px-5 py-2 bg-gradient-to-r from-rose-500 to-red-600 rounded-full text-sm font-medium">
              Transform →
            </button>
          </div>
        </header>

        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 rounded-full text-rose-400 text-sm mb-6">
                🎨 AI Style Transfer
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Your Photo
                <span className="block bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent">
                  Famous Style
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Transform photos into Van Gogh, Monet, Picasso, Anime & more. 12 artistic styles.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setMode("create")} className="px-8 py-4 bg-gradient-to-r from-rose-500 to-red-600 rounded-2xl font-semibold text-lg">
                  🎨 Transform Photo — Free
                </button>
              </div>
            </div>
            
            {/* Real Before/After */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-sm text-rose-400 mb-3 text-center">✨ Real {realExample.style} Transformation</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1 text-center">Original Photo</p>
                  <img src={realExample.before} alt="Before" className="w-full aspect-square object-cover rounded-xl" />
                </div>
                <div className="text-2xl">→</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1 text-center">{realExample.style} Style</p>
                  <img src={realExample.after} alt="After" className="w-full aspect-square object-cover rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">12 Art Styles</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {styles.map((style, i) => (
                <div key={i} className="text-center bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-rose-500/30 transition">
                  <div className="text-3xl mb-2">{style.emoji}</div>
                  <div className="font-medium text-sm">{style.name}</div>
                  <div className="text-xs text-gray-500">{style.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Transform Your Photos</h2>
            <button onClick={() => setMode("create")} className="px-10 py-5 bg-gradient-to-r from-rose-500 to-red-600 rounded-2xl font-semibold text-xl">
              🎨 Start Transforming
            </button>
          </div>
        </section>

        <footer className="py-8 px-6 border-t border-white/5 text-center text-sm text-gray-600">
          <Link href="/" className="hover:text-white transition">← Back to PhotoICU</Link>
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📸</span>
            <span className="font-semibold">PhotoICU</span>
          </Link>
          <span className="text-rose-400">🎨 Style Transfer</span>
        </div>
      </header>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Style Transfer</h1>

          {!uploadedImage && (
            <div {...getRootProps()} className={`border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all ${isDragActive ? "border-rose-500 bg-rose-500/10" : "border-white/20 hover:border-rose-500/50"}`}>
              <input {...getInputProps()} />
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-xl mb-2">Drop your photo here</p>
              <p className="text-gray-500">Landscapes, portraits, anything!</p>
            </div>
          )}

          {uploadedImage && !processing && !result && (
            <div className="space-y-8">
              <div className="flex justify-center">
                <img src={uploadedImage} alt="Your photo" className="max-h-48 rounded-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Choose Style</h2>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {styles.map(style => (
                    <button key={style.id} onClick={() => setSelectedStyle(style.id)} className={`p-3 rounded-xl text-center transition-all ${selectedStyle === style.id ? "bg-rose-500 text-white" : "bg-white/5 hover:bg-white/10 border border-white/10"}`}>
                      <div className="text-2xl mb-1">{style.emoji}</div>
                      <div className="text-xs">{style.name}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium mb-3">Strength: {strength}%</h2>
                <input type="range" min="30" max="100" value={strength} onChange={(e) => setStrength(Number(e.target.value))} className="w-full accent-rose-500" />
              </div>
              <button onClick={handleTransfer} disabled={!selectedStyle} className="w-full py-4 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl font-semibold text-lg disabled:opacity-50">
                🎨 Apply Style
              </button>
            </div>
          )}

          {processing && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6 animate-pulse">🎨</div>
              <h2 className="text-2xl font-bold mb-4">Applying artistic style...</h2>
              <div className="w-full max-w-md mx-auto bg-white/10 rounded-full h-3 mb-4">
                <div className="bg-gradient-to-r from-rose-500 to-red-600 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Original</p>
                  <img src={uploadedImage!} alt="Before" className="w-full rounded-xl" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Transformed</p>
                  <img src={result} alt="After" className="w-full rounded-xl" />
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => { const a = document.createElement("a"); a.href = result; a.download = `style-${selectedStyle}.png`; a.click(); }} className="flex-1 py-4 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl font-semibold">
                  ⬇️ Download
                </button>
                <button onClick={() => { setResult(null); setUploadedImage(null); setSelectedStyle(null); }} className="flex-1 py-4 bg-white/10 rounded-xl font-medium">
                  Try Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
