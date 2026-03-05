"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";

const artStyles = [
  { id: "royal", name: "Royal Portrait", emoji: "👑", preview: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300" },
  { id: "disney", name: "Disney Pixar", emoji: "✨", preview: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300" },
  { id: "oil", name: "Oil Painting", emoji: "🎨", preview: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?w=300" },
  { id: "watercolor", name: "Watercolor", emoji: "💧", preview: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300" },
  { id: "anime", name: "Anime", emoji: "🌸", preview: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300" },
  { id: "popart", name: "Pop Art", emoji: "🔴", preview: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=300" },
  { id: "renaissance", name: "Renaissance", emoji: "🏛️", preview: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300" },
  { id: "cartoon", name: "Cartoon", emoji: "🎬", preview: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300" },
  { id: "fantasy", name: "Fantasy", emoji: "⚔️", preview: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300" },
  { id: "space", name: "Space", emoji: "🚀", preview: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300" },
  { id: "vangogh", name: "Van Gogh", emoji: "🌻", preview: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=300" },
  { id: "sketch", name: "Sketch", emoji: "✏️", preview: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300" },
];

export default function PetPortraitPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { "image/*": [] }, maxFiles: 1,
  });

  const handleGenerate = async () => {
    if (!uploadedFile || !selectedStyle) return;
    setProcessing(true);
    setProgress(0);

    const interval = setInterval(() => setProgress(p => Math.min(p + 5, 90)), 300);

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("style", selectedStyle);

      const res = await fetch("/api/pet-portrait", { method: "POST", body: formData });
      const data = await res.json();
      clearInterval(interval);
      setProgress(100);
      if (data.success) setResults(data.images);
    } catch (e) {
      console.error(e);
      clearInterval(interval);
    }
    setProcessing(false);
  };

  // Results view
  if (results.length > 0) {
    return (
      <main className="min-h-screen bg-black text-white">
        <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">📸 PhotoICU</Link>
          </div>
        </header>
        <div className="pt-28 pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-2">Your Pet Portrait! 🎨</h1>
            <p className="text-gray-400 text-center mb-12">Click to download</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {results.map((img, i) => (
                <a key={i} href={img} download={`pet-portrait-${i+1}.png`} className="group relative rounded-2xl overflow-hidden hover:scale-105 transition-transform">
                  <img src={img} alt={`Result ${i+1}`} className="w-full aspect-square object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-lg font-medium">⬇️ Download</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => { setResults([]); setUploadedImage(null); setSelectedStyle(null); }} className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition">
                Create Another
              </button>
              <Link href="/" className="px-8 py-4 border border-white/20 rounded-full font-medium hover:bg-white/10 transition">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Processing view
  if (processing) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center px-6">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-amber-500/20" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 animate-spin" />
            <div className="absolute inset-4 rounded-full bg-amber-500/10 flex items-center justify-center text-4xl">
              🎨
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Creating Magic...</h2>
          <p className="text-gray-400 mb-6">AI is transforming your pet</p>
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-gray-500 mt-2">{progress}%</p>
        </div>
      </main>
    );
  }

  // Style selection view
  if (uploadedImage) {
    return (
      <main className="min-h-screen bg-black text-white">
        <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">📸 PhotoICU</Link>
            <button onClick={() => setUploadedImage(null)} className="text-gray-400 hover:text-white transition">
              ← Change Photo
            </button>
          </div>
        </header>
        <div className="pt-28 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[300px,1fr] gap-12">
              {/* Preview */}
              <div className="lg:sticky lg:top-28 lg:h-fit">
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-1 rounded-3xl">
                  <img src={uploadedImage} alt="Your pet" className="w-full aspect-square object-cover rounded-[22px]" />
                </div>
                <p className="text-center text-gray-500 mt-4 text-sm">Your adorable pet</p>
              </div>

              {/* Style Grid */}
              <div>
                <h2 className="text-3xl font-bold mb-2">Choose Art Style</h2>
                <p className="text-gray-400 mb-8">Select how you want your pet transformed</p>
                
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                  {artStyles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`relative rounded-2xl overflow-hidden aspect-square group transition-all ${
                        selectedStyle === style.id 
                          ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-black scale-105" 
                          : "hover:scale-105"
                      }`}
                    >
                      <img src={style.preview} alt={style.name} className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent ${selectedStyle === style.id ? "from-amber-900/90" : ""}`} />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="text-xl mb-1">{style.emoji}</div>
                        <div className="text-sm font-medium">{style.name}</div>
                      </div>
                      {selectedStyle === style.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!selectedStyle}
                  className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl font-semibold text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-amber-500/25 transition"
                >
                  {selectedStyle ? "✨ Generate Portrait" : "Select a style first"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Landing/Upload view
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">📸 PhotoICU</Link>
          <Link href="/" className="text-gray-400 hover:text-white transition text-sm">← All Tools</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 blur-[120px] rounded-full" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              70+ Stunning Art Styles
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Pet Portrait
              <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                AI Magic
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Transform your beloved pet into stunning artwork. Royal portraits, 
              Disney style, oil paintings, and more.
            </p>

            {/* Upload Area */}
            <div
              {...getRootProps()}
              className={`max-w-xl mx-auto border-2 border-dashed rounded-3xl p-12 cursor-pointer transition-all ${
                isDragActive 
                  ? "border-amber-500 bg-amber-500/10" 
                  : "border-white/20 hover:border-amber-500/50 hover:bg-white/5"
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-6xl mb-4">🐾</div>
              <p className="text-xl font-medium mb-2">Drop your pet photo here</p>
              <p className="text-gray-500">or click to browse</p>
              <p className="text-gray-600 text-sm mt-4">Dogs, cats, birds, hamsters — any pet!</p>
            </div>
          </div>

          {/* Style Preview */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-8">Available Art Styles</h2>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {artStyles.slice(0, 6).map(style => (
                <div key={style.id} className="text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-2 bg-white/5">
                    <img src={style.preview} alt={style.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" />
                  </div>
                  <p className="text-sm text-gray-400">{style.emoji} {style.name}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-6">+ 64 more styles</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Three Simple Steps</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", icon: "📤", title: "Upload", desc: "Drop any pet photo" },
              { num: "02", icon: "🎨", title: "Style", desc: "Pick your art style" },
              { num: "03", icon: "⬇️", title: "Download", desc: "Get HD artwork" },
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="text-7xl font-bold text-white/5 absolute -top-4 left-1/2 -translate-x-1/2">{step.num}</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-amber-500/25">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-white transition">← Back to PhotoICU</Link>
          <span>© 2026 PhotoICU</span>
        </div>
      </footer>
    </main>
  );
}
