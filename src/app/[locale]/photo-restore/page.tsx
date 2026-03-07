"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const realExample = {
  before: "/examples/restore-before.jpg",
  after: "/examples/restore-after.png",
};

export default function PhotoRestorePage() {
  const [mode, setMode] = useState<"landing" | "create">("landing");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedOptions, setSelectedOptions] = useState([
    { id: "face", checked: true },
    { id: "scratch", checked: true },
    { id: "colorize", checked: false },
  ]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const t = useTranslations("photoRestore");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const localizedHref = (path: string) => `/${locale}${path}`;

  const capabilities = [
    { icon: "👤", nameKey: "face", descKey: "faceDesc" },
    { icon: "🔧", nameKey: "scratch", descKey: "scratchDesc" },
    { icon: "🎨", nameKey: "colorize", descKey: "colorizeDesc" },
  ];

  const features = [
    { icon: "👤", nameKey: "face", descKey: "faceDesc" },
    { icon: "🔧", nameKey: "scratch", descKey: "scratchDesc" },
    { icon: "🎨", nameKey: "color", descKey: "colorDesc" },
    { icon: "✨", nameKey: "noise", descKey: "noiseDesc" },
  ];

  const options = [
    { id: "face", icon: "👤" },
    { id: "scratch", icon: "🔧" },
    { id: "colorize", icon: "🎨" },
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

  const toggleOption = (id: string) => {
    setSelectedOptions(selectedOptions.map(o => o.id === id ? { ...o, checked: !o.checked } : o));
  };

  const handleRestore = async () => {
    if (!uploadedFile) return;
    setProcessing(true);
    setProgress(0);

    const interval = setInterval(() => setProgress(p => Math.min(p + 10, 90)), 400);

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("options", JSON.stringify(selectedOptions.filter(o => o.checked).map(o => o.id)));

      const response = await fetch("/api/restore", { method: "POST", body: formData });
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
              <button onClick={() => setMode("create")} className="px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full text-sm font-medium">
                {t("restoreNow")} →
              </button>
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
                📸 {t("badge")}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {t("heroTitle")}
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {t("heroTitleHighlight")}
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                {t("heroSubtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setMode("create")} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl font-semibold text-lg">
                  📸 {t("restoreFree")}
                </button>
              </div>
            </div>
            
            {/* Real Before/After */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
              <p className="text-sm text-blue-400 mb-3 text-center">✨ {t("realResult")}</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1 text-center">{tCommon("before")}</p>
                  <img src={realExample.before} alt="Before" className="w-full aspect-square object-cover rounded-xl" />
                </div>
                <div className="text-2xl">→</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1 text-center">{tCommon("after")}</p>
                  <img src={realExample.after} alt="After" className="w-full aspect-square object-cover rounded-xl" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl">{cap.icon}</div>
                  <div>
                    <div className="font-medium text-sm">{t(`features.${cap.nameKey}`)}</div>
                    <div className="text-xs text-gray-500">{t(`features.${cap.descKey}`)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t("features.title")}</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {features.map((f, i) => (
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
            <h2 className="text-4xl font-bold mb-6">{t("restoreMemories")}</h2>
            <button onClick={() => setMode("create")} className="px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl font-semibold text-xl">
              📸 {t("startRestoration")}
            </button>
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
            <span className="text-blue-400">📸 {t("title")}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">{t("restorePhoto")}</h1>

          {!uploadedImage && (
            <div {...getRootProps()} className={`border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all ${isDragActive ? "border-blue-500 bg-blue-500/10" : "border-white/20 hover:border-blue-500/50"}`}>
              <input {...getInputProps()} />
              <div className="text-6xl mb-4">📸</div>
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
                <h2 className="text-xl font-bold mb-4">{t("restorationOptions")}</h2>
                <div className="space-y-3">
                  {options.map(opt => {
                    const isChecked = selectedOptions.find(o => o.id === opt.id)?.checked;
                    return (
                      <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${isChecked ? "bg-blue-500/20 border border-blue-500" : "bg-white/5 border border-white/10"}`}>
                        <input type="checkbox" checked={isChecked} onChange={() => toggleOption(opt.id)} className="w-5 h-5" />
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="font-medium">{t(`options.${opt.id}`)}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <button onClick={handleRestore} className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl font-semibold text-lg">
                ✨ {t("restore")}
              </button>
            </div>
          )}

          {processing && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6 animate-pulse">🔄</div>
              <h2 className="text-2xl font-bold mb-4">{t("restoring")}</h2>
              <div className="w-full max-w-md mx-auto bg-white/10 rounded-full h-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">{tCommon("before")}</p>
                  <img src={uploadedImage!} alt="Before" className="w-full rounded-xl" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">{tCommon("after")}</p>
                  <img src={result} alt="After" className="w-full rounded-xl" />
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => { const a = document.createElement("a"); a.href = result; a.download = "restored.png"; a.click(); }} className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl font-semibold">
                  ⬇️ {tCommon("download")}
                </button>
                <button onClick={() => { setResult(null); setUploadedImage(null); }} className="flex-1 py-4 bg-white/10 rounded-xl font-medium">
                  {t("restoreAnother")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
