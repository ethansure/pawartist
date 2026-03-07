"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const styles = [
  { id: "corporate", nameKey: "corporate", icon: "👔" },
  { id: "creative", nameKey: "creative", icon: "🎨" },
  { id: "casual", nameKey: "casual", icon: "👤" },
];

const realExample = {
  before: "/examples/headshot-before.jpg",
  after: "/examples/headshot-after.png",
};

export default function AIHeadshotsPage() {
  const [mode, setMode] = useState<"landing" | "create">("landing");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [gender, setGender] = useState("neutral");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<string[]>([]);

  const t = useTranslations("aiHeadshots");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const localizedHref = (path: string) => `/${locale}${path}`;

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

  const handleGenerate = async () => {
    if (!uploadedFile || !selectedStyle) return;
    setProcessing(true);
    setProgress(0);

    const interval = setInterval(() => setProgress(p => Math.min(p + 5, 90)), 400);

    try {
      const style = styles.find(s => s.id === selectedStyle);
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("style", selectedStyle);
      formData.append("stylePrompt", t(`styles.${style?.nameKey}`) || "");
      formData.append("gender", gender);

      const response = await fetch("/api/headshots", { method: "POST", body: formData });
      const data = await response.json();
      clearInterval(interval);
      setProgress(100);
      if (data.success) setResults(data.images);
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
              <button onClick={() => setMode("create")} className="px-5 py-2 bg-gradient-to-r from-slate-600 to-zinc-700 rounded-full text-sm font-medium">
                {t("generateNow")} →
              </button>
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-500/20 rounded-full text-slate-300 text-sm mb-6">
                👔 {t("badge")}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {t("heroTitle")}
                <span className="block bg-gradient-to-r from-slate-300 to-zinc-400 bg-clip-text text-transparent">
                  {t("heroTitleHighlight")}
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                {t("heroSubtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setMode("create")} className="px-8 py-4 bg-gradient-to-r from-slate-600 to-zinc-700 rounded-2xl font-semibold text-lg">
                  👔 {t("generateFree")}
                </button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
                <span>✓ {t("styles.corporate")}</span>
                <span>✓ {t("styles.creative")}</span>
                <span>✓ {t("styles.casual")}</span>
              </div>
            </div>
            
            {/* Real Before/After */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-sm text-slate-300 mb-3 text-center">✨ {t("styles.corporate")}</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1 text-center">{tCommon("before")}</p>
                  <img src={realExample.before} alt="Before" className="w-full aspect-square object-cover rounded-xl" />
                </div>
                <div className="text-2xl">→</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1 text-center">{tCommon("after")}</p>
                  <img src={realExample.after} alt="After" className="w-full aspect-square object-cover rounded-xl ring-2 ring-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t("chooseStyle")}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {styles.map((style, i) => (
                <div key={i} className="text-center bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-slate-500/30 transition">
                  <div className="text-4xl mb-3">{style.icon}</div>
                  <div className="font-medium">{t(`styles.${style.nameKey}`)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">{t("title")}</h2>
            <button onClick={() => setMode("create")} className="px-10 py-5 bg-gradient-to-r from-slate-600 to-zinc-700 rounded-2xl font-semibold text-xl">
              👔 {t("generateNow")}
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
            <span className="text-slate-300">👔 {t("title")}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">{t("title")}</h1>

          {!uploadedImage && (
            <div {...getRootProps()} className={`border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all ${isDragActive ? "border-slate-500 bg-slate-500/10" : "border-white/20 hover:border-slate-500/50"}`}>
              <input {...getInputProps()} />
              <div className="text-6xl mb-4">👔</div>
              <p className="text-xl mb-2">{t("dropTitle")}</p>
              <p className="text-gray-500">{t("dropHint")}</p>
            </div>
          )}

          {uploadedImage && !processing && results.length === 0 && (
            <div className="space-y-8">
              <div className="flex justify-center">
                <img src={uploadedImage} alt="Your photo" className="w-32 h-32 rounded-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">{t("chooseStyle")}</h2>
                <div className="grid grid-cols-3 gap-3">
                  {styles.map(style => (
                    <button key={style.id} onClick={() => setSelectedStyle(style.id)} className={`p-4 rounded-xl text-center transition-all ${selectedStyle === style.id ? "bg-slate-600 text-white" : "bg-white/5 hover:bg-white/10 border border-white/10"}`}>
                      <div className="text-2xl mb-1">{style.icon}</div>
                      <div className="font-medium">{t(`styles.${style.nameKey}`)}</div>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleGenerate} disabled={!selectedStyle} className="w-full py-4 bg-gradient-to-r from-slate-600 to-zinc-700 rounded-xl font-semibold text-lg disabled:opacity-50">
                👔 {t("generate")}
              </button>
            </div>
          )}

          {processing && (
            <div className="text-center py-16">
              <div className="text-6xl mb-6 animate-pulse">👔</div>
              <h2 className="text-2xl font-bold mb-4">{t("generating")}</h2>
              <div className="w-full max-w-md mx-auto bg-white/10 rounded-full h-3 mb-4">
                <div className="bg-gradient-to-r from-slate-600 to-zinc-700 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-center">{t("title")}</h2>
              <div className="grid grid-cols-2 gap-4">
                {results.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} alt={`Headshot ${i + 1}`} className="w-full rounded-xl" />
                    <button onClick={() => { const a = document.createElement("a"); a.href = img; a.download = `headshot-${i + 1}.png`; a.click(); }} className="absolute bottom-3 right-3 bg-black/70 px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition">
                      ⬇️ {tCommon("download")}
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => results.forEach((img, i) => { const a = document.createElement("a"); a.href = img; a.download = `headshot-${i + 1}.png`; a.click(); })} className="flex-1 py-4 bg-gradient-to-r from-slate-600 to-zinc-700 rounded-xl font-semibold">
                  ⬇️ {tCommon("download")}
                </button>
                <button onClick={() => { setResults([]); setUploadedImage(null); setSelectedStyle(null); }} className="flex-1 py-4 bg-white/10 rounded-xl font-medium">
                  {t("generateAnother")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
