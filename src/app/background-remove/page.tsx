"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";

type Mode = "upload" | "processing" | "results";

const backgroundOptions = [
  { id: "transparent", name: "Transparent", preview: "🔲", color: null },
  { id: "white", name: "White", preview: "⬜", color: "#ffffff" },
  { id: "black", name: "Black", preview: "⬛", color: "#000000" },
  { id: "blue", name: "Blue", preview: "🟦", color: "#3b82f6" },
  { id: "green", name: "Green", preview: "🟩", color: "#22c55e" },
  { id: "gradient", name: "Gradient", preview: "🌈", color: "gradient" },
];

export default function BackgroundRemovePage() {
  const [mode, setMode] = useState<Mode>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedBg, setSelectedBg] = useState("transparent");
  const [progress, setProgress] = useState(0);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        handleRemoveBackground(file);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
  });

  const handleRemoveBackground = async (file: File) => {
    setMode("processing");
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 15, 90));
    }, 300);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("background", selectedBg);

      const response = await fetch("/api/remove-bg", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      clearInterval(progressInterval);
      setProgress(100);

      if (data.success) {
        setResultImage(data.image);
        setMode("results");
      }
    } catch (error) {
      console.error(error);
      clearInterval(progressInterval);
      setMode("upload");
    }
  };

  const handleChangeBg = async (bgId: string) => {
    setSelectedBg(bgId);
    if (uploadedFile) {
      handleRemoveBackground(uploadedFile);
    }
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement("a");
      link.href = resultImage;
      link.download = "no-background.png";
      link.click();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
            <div className="text-6xl mb-4">🎭</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Background Remover</h1>
            <p className="text-xl text-gray-600">Remove or replace backgrounds instantly with AI</p>
          </div>

          {/* Upload Mode */}
          {mode === "upload" && (
            <div
              {...getRootProps()}
              className={`border-3 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all ${
                isDragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400 hover:bg-green-50/50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-6xl mb-4">📤</div>
              <p className="text-xl text-gray-700 mb-2">Drop your photo here</p>
              <p className="text-gray-500">Background will be removed automatically</p>
            </div>
          )}

          {/* Processing Mode */}
          {mode === "processing" && (
            <div className="bg-white rounded-3xl p-16 shadow-lg text-center">
              <div className="text-6xl mb-6 animate-pulse">🎭</div>
              <h2 className="text-2xl font-bold mb-4">Removing background...</h2>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-gray-500">{progress}% complete</p>
            </div>
          )}

          {/* Results Mode */}
          {mode === "results" && resultImage && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                  <h3 className="font-semibold mb-4 text-center">Original</h3>
                  <img src={uploadedImage!} alt="Original" className="rounded-xl w-full" />
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-lg" style={{ 
                  background: selectedBg === "transparent" 
                    ? "repeating-conic-gradient(#e5e7eb 0% 25%, transparent 0% 50%) 50%/20px 20px" 
                    : selectedBg === "gradient" 
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : backgroundOptions.find(b => b.id === selectedBg)?.color || "#fff"
                }}>
                  <h3 className="font-semibold mb-4 text-center">Result</h3>
                  <img src={resultImage} alt="No Background" className="rounded-xl w-full" />
                </div>
              </div>

              {/* Background Options */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="font-semibold mb-4">Change Background</h3>
                <div className="flex gap-3 flex-wrap">
                  {backgroundOptions.map(bg => (
                    <button
                      key={bg.id}
                      onClick={() => handleChangeBg(bg.id)}
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all ${
                        selectedBg === bg.id ? "ring-2 ring-green-500 ring-offset-2" : ""
                      }`}
                      style={{
                        background: bg.id === "transparent" 
                          ? "repeating-conic-gradient(#e5e7eb 0% 25%, transparent 0% 50%) 50%/10px 10px"
                          : bg.id === "gradient"
                            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                            : bg.color || "#fff"
                      }}
                      title={bg.name}
                    >
                      {bg.id === "transparent" && "🔲"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition"
                >
                  ⬇️ Download PNG
                </button>
                <button
                  onClick={() => { setMode("upload"); setUploadedImage(null); setResultImage(null); }}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-200 transition"
                >
                  🔄 Remove Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
