"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const realExample = {
  before: "/examples/bg-remove-before.jpg",
  after: "/examples/bg-remove-after.png",
};

const bgOptions = [
  { id: "transparent", name: "Transparent", preview: "🔲" },
  { id: "white", name: "White", color: "#ffffff" },
  { id: "black", name: "Black", color: "#000000" },
  { id: "blue", name: "Blue", color: "#3b82f6" },
  { id: "gradient", name: "Gradient", color: "linear-gradient(135deg, #667eea, #764ba2)" },
];

export default function BackgroundRemovePage() {
  const [mode, setMode] = useState<"landing" | "create">("landing");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedBg, setSelectedBg] = useState("transparent");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const t = useTranslations("backgroundRemove");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const localizedHref = (path: string) => `/${locale}${path}`;

  const handleRemove = useCallback(async (file: File, bg: string = selectedBg) => {
    setProcessing(true);
    setProgress(0);
    setMode("create");

    const interval = setInterval(() => setProgress(p => Math.min(p + 15, 90)), 250);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("background", bg);

      const response = await fetch("/api/remove-bg", { method: "POST", body: formData });
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
  }, [selectedBg]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        handleRemove(file, selectedBg);
      };
      reader.readAsDataURL(file);
    }
  }, [handleRemove, selectedBg]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "image/*": [] }, maxFiles: 1 });

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
              <button onClick={() => setMode("create")} className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-sm font-medium">
                {t("removeNow")} →
              </button>
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm mb-6">
                ✂️ {t("badge")}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {t("heroTitle")}
                <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {t("heroTitleHighlight")}
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                {t("heroSubtitle")}
              </p>
              <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${isDragActive ? "border-green-500 bg-green-500/10" : "border-white/20 hover:border-green-500/50"}`}>
                <input {...getInputProps()} />
                <p className="text-lg">✂️ {t("dropTitle")}</p>
              </div>
              <div className="flex items-center gap-6 mt-6 text-sm text-gray-500">
                <span>✓ {t("features.instant")}</span>
                <span>✓ {t("features.transparent")}</span>
                <span>✓ {tCommon("free")}</span>
              </div>
            </div>
            
            {/* Real Before/After */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-sm text-green-400 mb-3 text-center">✨ {t("features.instant")}</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1 text-center">{tCommon("original")}</p>
                  <img src={realExample.before} alt="Before" className="w-full aspect-square object-cover rounded-xl" />
                </div>
                <div className="text-2xl">→</div>
                <div className="flex-1 rounded-xl overflow-hidden" style={{ background: "repeating-conic-gradient(#333 0% 25%, #111 0% 50%) 50%/15px 15px" }}>
                  <p className="text-xs text-gray-500 mb-1 text-center bg-black/50 py-1">{tCommon("after")}</p>
                  <img src={realExample.after} alt="After" className="w-full aspect-square object-contain" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t("title")}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "⚡", nameKey: "instant", descKey: "instantDesc" },
                { icon: "✂️", nameKey: "precise", descKey: "preciseDesc" },
                { icon: "🔲", nameKey: "transparent", descKey: "transparentDesc" },
              ].map((f, i) => (
                <div key={i} className="text-center bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="font-bold mb-2">{t(`features.${f.nameKey}`)}</h3>
                  <p className="text-sm text-gray-500">{t(`features.${f.descKey}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">{t("title")}</h2>
            <div {...getRootProps()} className="inline-block">
              <input {...getInputProps()} />
              <button className="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl font-semibold text-xl cursor-pointer">
                ✂️ {t("removeFree")}
              </button>
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
            <span className="text-green-400">✂️ {t("title")}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">{t("title")}</h1>

          {processing && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6 animate-pulse">✂️</div>
              <h2 className="text-2xl font-bold mb-4">{t("removing")}</h2>
              <div className="w-full max-w-md mx-auto bg-white/10 rounded-full h-3 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
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
                  <p className="text-sm text-gray-500 mb-2">{tCommon("after")}</p>
                  <div className="rounded-xl overflow-hidden" style={{ background: "repeating-conic-gradient(#333 0% 25%, #111 0% 50%) 50%/20px 20px" }}>
                    <img src={result} alt="After" className="w-full" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => { const a = document.createElement("a"); a.href = result; a.download = "no-bg.png"; a.click(); }} className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold">
                  ⬇️ {tCommon("download")} PNG
                </button>
                <button onClick={() => { setResult(null); setUploadedImage(null); setMode("landing"); }} className="flex-1 py-4 bg-white/10 rounded-xl font-medium">
                  {t("removeAnother")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
