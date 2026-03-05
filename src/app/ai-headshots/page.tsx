"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";

type Mode = "upload" | "style" | "processing" | "results";

const headshotStyles = [
  { id: "corporate", name: "Corporate Professional", icon: "👔", desc: "Clean, formal business look" },
  { id: "linkedin", name: "LinkedIn Ready", icon: "💼", desc: "Perfect for your profile" },
  { id: "creative", name: "Creative Professional", icon: "🎨", desc: "Modern, approachable style" },
  { id: "executive", name: "Executive", icon: "👤", desc: "C-suite ready portrait" },
  { id: "casual", name: "Casual Business", icon: "😊", desc: "Friendly yet professional" },
  { id: "startup", name: "Startup Founder", icon: "🚀", desc: "Tech-forward, modern" },
];

const genderOptions = [
  { id: "male", label: "Male", icon: "👨" },
  { id: "female", label: "Female", icon: "👩" },
  { id: "neutral", label: "Neutral", icon: "🧑" },
];

export default function AIHeadshotsPage() {
  const [mode, setMode] = useState<Mode>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [gender, setGender] = useState("neutral");
  const [progress, setProgress] = useState(0);
  const [resultImages, setResultImages] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setMode("style");
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
  });

  const handleGenerate = async () => {
    if (!uploadedFile || !selectedStyle) return;
    setMode("processing");
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 5, 90));
    }, 500);

    try {
      const style = headshotStyles.find(s => s.id === selectedStyle);
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("style", selectedStyle);
      formData.append("stylePrompt", style?.desc || "");
      formData.append("gender", gender);

      const response = await fetch("/api/headshots", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      clearInterval(progressInterval);
      setProgress(100);

      if (data.success) {
        setResultImages(data.images);
        setMode("results");
      }
    } catch (error) {
      console.error(error);
      clearInterval(progressInterval);
      setMode("style");
    }
  };

  const handleDownload = (imageUrl: string, index: number) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `headshot-${selectedStyle}-${index + 1}.png`;
    link.click();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">📸</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              PhotoICU
            </span>
          </Link>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">👔</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Headshots</h1>
            <p className="text-xl text-gray-600">Professional headshots for LinkedIn & business</p>
          </div>

          {/* Upload Mode */}
          {mode === "upload" && (
            <div
              {...getRootProps()}
              className={`border-3 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all ${
                isDragActive ? "border-slate-500 bg-slate-50" : "border-gray-300 hover:border-slate-400 hover:bg-slate-50/50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-6xl mb-4">📤</div>
              <p className="text-xl text-gray-700 mb-2">Upload a clear photo of your face</p>
              <p className="text-gray-500">Front-facing, good lighting works best</p>
            </div>
          )}

          {/* Style Selection Mode */}
          {mode === "style" && uploadedImage && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg flex justify-center">
                <img src={uploadedImage} alt="Your photo" className="max-h-48 rounded-xl" />
              </div>

              {/* Gender Selection */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Select Style Preference</h2>
                <div className="flex gap-4 justify-center">
                  {genderOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setGender(opt.id)}
                      className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
                        gender === opt.id
                          ? "bg-slate-800 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Selection */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Choose Headshot Style</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {headshotStyles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        selectedStyle === style.id
                          ? "bg-slate-100 border-2 border-slate-800"
                          : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      <div className="text-3xl mb-2">{style.icon}</div>
                      <div className="font-semibold">{style.name}</div>
                      <div className="text-sm text-gray-500">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!selectedStyle}
                className="w-full py-4 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                👔 Generate Headshots
              </button>
            </div>
          )}

          {/* Processing Mode */}
          {mode === "processing" && (
            <div className="bg-white rounded-3xl p-16 shadow-lg text-center">
              <div className="text-6xl mb-6 animate-pulse">👔</div>
              <h2 className="text-2xl font-bold mb-4">Creating your headshots...</h2>
              <p className="text-gray-500 mb-6">Generating 4 professional variations</p>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-gradient-to-r from-slate-600 to-slate-800 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-gray-500">{progress}% complete</p>
            </div>
          )}

          {/* Results Mode */}
          {mode === "results" && resultImages.length > 0 && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Your Professional Headshots</h2>
                <div className="grid grid-cols-2 gap-4">
                  {resultImages.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={img} alt={`Headshot ${i + 1}`} className="rounded-xl w-full" />
                      <button
                        onClick={() => handleDownload(img, i)}
                        className="absolute bottom-2 right-2 bg-white/90 text-gray-800 px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition"
                      >
                        ⬇️ Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => resultImages.forEach((img, i) => handleDownload(img, i))}
                  className="flex-1 py-4 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition"
                >
                  ⬇️ Download All
                </button>
                <button
                  onClick={() => { setMode("upload"); setUploadedImage(null); setResultImages([]); setSelectedStyle(null); }}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-200 transition"
                >
                  🔄 Create New
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
