"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";

type Mode = "upload" | "options" | "processing" | "results";

const scaleOptions = [
  { id: "2", label: "2x Upscale", description: "Good balance of speed and quality" },
  { id: "4", label: "4x Upscale", description: "Maximum quality, larger file size" },
];

const enhanceOptions = [
  { id: "denoise", name: "Noise Reduction", icon: "🔇", checked: true },
  { id: "sharpen", name: "Sharpening", icon: "🔍", checked: true },
  { id: "color", name: "Color Enhancement", icon: "🎨", checked: false },
];

export default function PhotoEnhancePage() {
  const [mode, setMode] = useState<Mode>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [scale, setScale] = useState("2");
  const [options, setOptions] = useState(enhanceOptions);
  const [progress, setProgress] = useState(0);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setMode("options");
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
  });

  const toggleOption = (id: string) => {
    setOptions(options.map(opt => 
      opt.id === id ? { ...opt, checked: !opt.checked } : opt
    ));
  };

  const handleEnhance = async () => {
    if (!uploadedFile) return;
    setMode("processing");
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 8, 90));
    }, 500);

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("scale", scale);
      formData.append("options", JSON.stringify(options.filter(o => o.checked).map(o => o.id)));

      const response = await fetch("/api/enhance", {
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
      setMode("options");
    }
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement("a");
      link.href = resultImage;
      link.download = `enhanced-${scale}x.png`;
      link.click();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
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
            <div className="text-6xl mb-4">✨</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Enhancer</h1>
            <p className="text-xl text-gray-600">Upscale and enhance image quality with AI</p>
          </div>

          {/* Upload Mode */}
          {mode === "upload" && (
            <div
              {...getRootProps()}
              className={`border-3 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all ${
                isDragActive ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="text-6xl mb-4">📤</div>
              <p className="text-xl text-gray-700 mb-2">Drop your photo here</p>
              <p className="text-gray-500">or click to browse</p>
            </div>
          )}

          {/* Options Mode */}
          {mode === "options" && uploadedImage && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <img src={uploadedImage} alt="Original" className="max-h-64 mx-auto rounded-xl" />
              </div>

              {/* Scale Selection */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Upscale Factor</h2>
                <div className="grid grid-cols-2 gap-4">
                  {scaleOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setScale(option.id)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        scale === option.id
                          ? "bg-purple-100 border-2 border-purple-500"
                          : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      <div className="font-bold text-xl">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhancement Options */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Enhancement Options</h2>
                <div className="space-y-3">
                  {options.map(option => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                        option.checked ? "bg-purple-50 border-2 border-purple-500" : "bg-gray-50 border-2 border-transparent"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={option.checked}
                        onChange={() => toggleOption(option.id)}
                        className="w-5 h-5"
                      />
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-semibold">{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleEnhance}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition"
              >
                ✨ Enhance Photo
              </button>
            </div>
          )}

          {/* Processing Mode */}
          {mode === "processing" && (
            <div className="bg-white rounded-3xl p-16 shadow-lg text-center">
              <div className="text-6xl mb-6 animate-pulse">✨</div>
              <h2 className="text-2xl font-bold mb-4">Enhancing your photo...</h2>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
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
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                  <h3 className="font-semibold mb-4 text-center">Enhanced ({scale}x)</h3>
                  <img src={resultImage} alt="Enhanced" className="rounded-xl w-full" />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition"
                >
                  ⬇️ Download
                </button>
                <button
                  onClick={() => { setMode("upload"); setUploadedImage(null); setResultImage(null); }}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-200 transition"
                >
                  🔄 Enhance Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
