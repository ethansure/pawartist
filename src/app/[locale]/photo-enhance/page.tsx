"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const realExample = {
  before: "/examples/enhance-before.jpg",
  after: "/examples/enhance-after.png",
};

export default function PhotoEnhancePage() {
  const [mode, setMode] = useState<"landing" | "create">("landing");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [scale, setScale] = useState("2");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const t = useTranslations("photoEnhance");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const localizedHref = (path: string) => `/${locale}${path}`;

  const capabilities = [
    { icon: "📐", nameKey: "upscale", descKey: "upscaleDesc" },
    { icon: "🔇", nameKey: "denoise", descKey: "denoiseDesc" },
    { icon: "🔍", nameKey: "detail", descKey: "detailDesc" },
  ];

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

  const handleEnhance = async () => {
    if (!uploadedFile) return;
    setProcessing(true);
    setProgress(0);

    const interval = setInterval(() => setProgress(p => Math.min(p + 8, 90)), 400);

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("scale", scale);

      const response = await fetch("/api/enhance", { method: "POST", body: formData });
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
            <Link href={localizedHref("")} className="flex items-center gap-2">
              <span className="text-2xl">📸</span>
              <span className="font-semibold">{tCommon("title")}</span>
            </Link>
            <div className="flex items-center gap-4">
              <button onClick={() => setMode("create")} className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-sm font-medium">
                {t("enhanceNow")} →
              </button>
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full text-purple-400 text-sm mb-6">
                ✨ {t("badge")}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {t("heroTitle")}
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t("heroTitleHighlight")}
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                {t("heroSubtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setMode("create")} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl font-semibold text-lg">
                  ✨ {t("enhanceFree")}
                </button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
                <span>✓ {t("options.2x")}</span>
                <span>✓ {t("options.4x")}</span>
                <span>✓ {t("options.denoise")}</span>
              </div>
            </div>
            
            {/* Real Before/After */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
              <p className="text-sm text-purple-400 mb-3 text-center">✨ {t("features.upscale")}</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1 text-center">{tCommon("before")}</p>
                  <img src={realExample.before} alt="Before" className="w-full aspect-square object-cover rounded-xl pixelated" style={{imageRendering: 'pixelated'}} />
                </div>
                <div className="text-2xl">→</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1 text-center">{tCommon("after")}</p>
                  <img src={realExample.after} alt="After" className="w-full aspect-square object-cover rounded-xl" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {capabilities.map((cap, i) => (
                <div key={i} className="text-center bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-2xl mb-2">{cap.icon}</div>
                  <div className="font-medium text-sm">{t(`features.${cap.nameKey}`)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t("title")}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {capabilities.map((f, i) => (
                <div key={i} className="text-center bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="font-bold mb-2">{t(`features.${f.nameKey}`)}</h3>
                  <p className="text-sm text-gray-500">{t(`features.${f.descKey}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-8 px-6 border-t border-white/5 text-center text-sm text-gray-600">
          <Link href={localizedHref("")} className="hover:text-white transition">← {tFooter("backTo")} {tCommon("title")}</Link>
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href={localizedHref("")} className="flex items-center gap-2">
            <span className="text-2xl">📸</span>
            <span className="font-semibold">{tCommon("title")}</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-purple-400">✨ {t("title")}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">{t("enhance")}</h1>

          {!uploadedImage && (
            <div {...getRootProps()} className={`border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all ${isDragActive ? "border-purple-500 bg-purple-500/10" : "border-white/20 hover:border-purple-500/50"}`}>
              <input {...getInputProps()} />
              <div className="text-6xl mb-4">✨</div>
              <p className="text-xl mb-2">{t("dropTitle")}</p>
              <p className="text-gray-500">{t("dropHint")}</p>
            </div>
          )}

          {uploadedImage && !processing && !result && (
            <div className="space-y-8">
              <div className="flex justify-center">
                <img src={uploadedImage} alt="Your photo" className="max-h-64 rounded-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">{t("options.scale")}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {["2", "4"].map(s => (
                    <button key={s} onClick={() => setScale(s)} className={`p-4 rounded-xl text-center transition-all ${scale === s ? "bg-purple-500 text-white" : "bg-white/5 border border-white/10"}`}>
                      <div className="text-2xl font-bold">{s}x</div>
                      <div className="text-sm text-gray-400">{t(`options.${s}x`)}</div>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleEnhance} className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold text-lg">
                ✨ {t("enhance")}
              </button>
            </div>
          )}

          {processing && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6 animate-pulse">✨</div>
              <h2 className="text-2xl font-bold mb-4">{t("enhancing")}</h2>
              <div className="w-full max-w-md mx-auto bg-white/10 rounded-full h-3 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">{tCommon("original")}</p>
                  <img src={uploadedImage!} alt="Before" className="w-full rounded-xl" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">{tCommon("after")} ({scale}x)</p>
                  <img src={result} alt="After" className="w-full rounded-xl" />
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => { const a = document.createElement("a"); a.href = result; a.download = `enhanced-${scale}x.png`; a.click(); }} className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold">
                  ⬇️ {tCommon("download")}
                </button>
                <button onClick={() => { setResult(null); setUploadedImage(null); }} className="flex-1 py-4 bg-white/10 rounded-xl font-medium">
                  {t("enhanceAnother")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
