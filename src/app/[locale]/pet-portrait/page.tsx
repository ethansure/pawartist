"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";
import { SoftwareApplicationJsonLd, FAQJsonLd } from "@/components/JsonLd";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Real AI-generated examples
const realExamples = [
  { styleKey: "royal", before: "/examples/pet-original.jpg", after: "/examples/pet-royal-real.png" },
  { styleKey: "disney", before: "/examples/pet-original.jpg", after: "/examples/pet-disney-real.png" },
  { styleKey: "oil", before: "/examples/pet-original.jpg", after: "/examples/pet-oil-real.png" },
];

const artStyles = [
  { id: "royal", nameKey: "royal", emoji: "👑", preview: "/examples/pet-royal-real.png" },
  { id: "disney", nameKey: "disney", emoji: "✨", preview: "/examples/pet-disney-real.png" },
  { id: "oil", nameKey: "oil", emoji: "🎨", preview: "/examples/pet-oil-real.png" },
  { id: "watercolor", nameKey: "watercolor", emoji: "💧", preview: "/examples/pet-royal.png" },
  { id: "anime", nameKey: "anime", emoji: "🌸", preview: "/examples/pet-disney.png" },
  { id: "popart", nameKey: "popart", emoji: "🔴", preview: "/examples/pet-oil.png" },
  { id: "renaissance", nameKey: "renaissance", emoji: "🏛️", preview: "/examples/pet-royal-real.png" },
  { id: "cartoon", nameKey: "cartoon", emoji: "🎬", preview: "/examples/pet-disney-real.png" },
  { id: "fantasy", nameKey: "fantasy", emoji: "⚔️", preview: "/examples/pet-royal.png" },
  { id: "space", nameKey: "space", emoji: "🚀", preview: "/examples/pet-disney.png" },
  { id: "vangogh", nameKey: "vangogh", emoji: "🌻", preview: "/examples/pet-oil-real.png" },
  { id: "sketch", nameKey: "sketch", emoji: "✏️", preview: "/examples/pet-oil.png" },
];

export default function PetPortraitPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<string[]>([]);
  
  const t = useTranslations("petPortrait");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const localizedHref = (path: string) => `/${locale}${path}`;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    console.log("[Pet Portrait] File selected:", file.name, file.size, file.type);
    
    // For large files, compress using canvas
    if (file.size > 2 * 1024 * 1024) {
      toast.info("Optimizing large image...");
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 1024;
        let { width, height } = img;
        
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = (height / width) * maxSize;
            width = maxSize;
          } else {
            width = (width / height) * maxSize;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], "pet-photo.jpg", { type: "image/jpeg" });
            console.log("[Pet Portrait] Compressed:", file.size, "->", compressedFile.size);
            setUploadedFile(compressedFile);
            setUploadedImage(canvas.toDataURL("image/jpeg", 0.9));
            toast.success(tCommon("success"));
          }
        }, "image/jpeg", 0.85);
        
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        console.error("[Pet Portrait] Failed to load image for compression");
        toast.error(tCommon("error"));
      };
      img.src = URL.createObjectURL(file);
    } else {
      // Small file, use directly
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result as string);
      reader.onerror = () => toast.error(tCommon("error"));
      reader.readAsDataURL(file);
    }
  }, [tCommon]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, 
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"] }, 
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    onDropRejected: (rejections) => {
      const error = rejections[0]?.errors[0];
      if (error?.code === "file-too-large") {
        toast.error(tCommon("maxSize"));
      } else {
        toast.error(error?.message || tCommon("error"));
      }
    },
  });

  const handleGenerate = async () => {
    if (!uploadedFile || !selectedStyle) return;
    setProcessing(true);
    setProgress(0);

    const interval = setInterval(() => setProgress(p => Math.min(p + 3, 90)), 500);

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("style", selectedStyle);

      console.log("[Pet Portrait] Sending request...", { 
        fileSize: uploadedFile.size, 
        fileType: uploadedFile.type,
        style: selectedStyle 
      });
      
      const res = await fetch("/api/pet-portrait", { method: "POST", body: formData });
      
      console.log("[Pet Portrait] Response status:", res.status, res.statusText);
      
      const contentType = res.headers.get("content-type");
      console.log("[Pet Portrait] Content-Type:", contentType);
      
      if (!contentType?.includes("application/json")) {
        const text = await res.text();
        console.error("[Pet Portrait] Non-JSON response:", text);
        throw new Error(text.includes("Too Large") ? tCommon("maxSize") : `Server error: ${text.substring(0, 100)}`);
      }
      
      const data = await res.json();
      console.log("[Pet Portrait] Response data:", { success: data.success, imageCount: data.images?.length });
      clearInterval(interval);
      
      if (!res.ok) {
        throw new Error(data.error || data.details || tCommon("error"));
      }
      
      if (data.success && data.images && data.images.length > 0) {
        const validImages = data.images.filter((img: string) => 
          typeof img === "string" && img.startsWith("http")
        );
        
        if (validImages.length > 0) {
          setProgress(100);
          setResults(validImages);
          toast.success(tCommon("success") + " 🎨");
        } else {
          throw new Error(tCommon("error"));
        }
      } else {
        throw new Error(data.error || data.details || tCommon("error"));
      }
    } catch (e) {
      console.error("[Pet Portrait] Generation error:", e);
      clearInterval(interval);
      const errorMsg = e instanceof Error ? e.message : tCommon("error");
      toast.error(errorMsg);
      setProgress(0);
    }
    setProcessing(false);
  };

  // Results view
  if (results.length > 0) {
    return (
      <main className="min-h-screen bg-black text-white">
        <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href={localizedHref("")} className="text-xl font-bold">📸 {tCommon("title")}</Link>
            <LanguageSwitcher />
          </div>
        </header>
        <div className="pt-28 pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-2">{t("resultTitle")} 🎨</h1>
            <p className="text-gray-400 text-center mb-12">{t("resultSubtitle")}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {results.map((img, i) => (
                <a key={i} href={img} download={`pet-portrait-${i+1}.png`} className="group relative rounded-2xl overflow-hidden hover:scale-105 transition-transform">
                  <img src={img} alt={`Result ${i+1}`} className="w-full aspect-square object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-lg font-medium">⬇️ {tCommon("download")}</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => { setResults([]); setUploadedImage(null); setSelectedStyle(null); }} className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition">
                {tCommon("createAnother")}
              </button>
              <Link href={localizedHref("")} className="px-8 py-4 border border-white/20 rounded-full font-medium hover:bg-white/10 transition">
                {tCommon("backToHome")}
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
          <h2 className="text-2xl font-bold mb-2">{t("creatingMagic")}</h2>
          <p className="text-gray-400 mb-6">{t("aiTransforming")}</p>
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
            <Link href={localizedHref("")} className="text-xl font-bold">📸 {tCommon("title")}</Link>
            <div className="flex items-center gap-4">
              <button onClick={() => setUploadedImage(null)} className="text-gray-400 hover:text-white transition">
                ← {tCommon("changePhoto")}
              </button>
              <LanguageSwitcher />
            </div>
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
                <p className="text-center text-gray-500 mt-4 text-sm">{t("yourPet")}</p>
              </div>

              {/* Style Grid */}
              <div>
                <h2 className="text-3xl font-bold mb-2">{t("chooseStyle")}</h2>
                <p className="text-gray-400 mb-8">{t("chooseStyleSubtitle")}</p>
                
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
                      <img src={style.preview} alt={t(`styles.${style.nameKey}`)} className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent ${selectedStyle === style.id ? "from-amber-900/90" : ""}`} />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="text-xl mb-1">{style.emoji}</div>
                        <div className="text-sm font-medium">{t(`styles.${style.nameKey}`)}</div>
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
                  {selectedStyle ? `✨ ${t("generate")}` : t("selectFirst")}
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
          <Link href={localizedHref("")} className="text-xl font-bold">📸 {tCommon("title")}</Link>
          <div className="flex items-center gap-4">
            <Link href={localizedHref("")} className="text-gray-400 hover:text-white transition text-sm">← {tCommon("allTools")}</Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 blur-[120px] rounded-full" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {t("badge")}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {t("heroTitle")}
              <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                {t("heroTitleHighlight")}
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              {t("heroSubtitle")}
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
              <p className="text-xl font-medium mb-2">{t("dropTitle")}</p>
              <p className="text-gray-500">{t("dropSubtitle")}</p>
              <p className="text-gray-600 text-sm mt-4">{t("dropHint")}</p>
            </div>
          </div>

          {/* Real Before/After Examples */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-4">{t("realResults")}</h2>
            <p className="text-gray-400 text-center mb-8">{t("realResultsSubtitle")}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {realExamples.map((ex, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">{tCommon("original")}</p>
                      <img src={ex.before} alt="Before" className="w-full aspect-square object-cover rounded-xl" />
                    </div>
                    <div className="text-xl">→</div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">{t(`styles.${ex.styleKey}`)}</p>
                      <img src={ex.after} alt="After" className="w-full aspect-square object-cover rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Style Preview */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-8">{t("allStyles")}</h2>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {artStyles.slice(0, 6).map(style => (
                <div key={style.id} className="text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-2 bg-white/5">
                    <img src={style.preview} alt={t(`styles.${style.nameKey}`)} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" />
                  </div>
                  <p className="text-sm text-gray-400">{style.emoji} {t(`styles.${style.nameKey}`)}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-6">{t("moreStyles")}</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">{t("threeSteps")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", icon: "📤", titleKey: "step1", descKey: "step1Desc" },
              { num: "02", icon: "🎨", titleKey: "step2", descKey: "step2Desc" },
              { num: "03", icon: "⬇️", titleKey: "step3", descKey: "step3Desc" },
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="text-7xl font-bold text-white/5 absolute -top-4 left-1/2 -translate-x-1/2">{step.num}</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-amber-500/25">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t(step.titleKey)}</h3>
                  <p className="text-gray-500">{t(step.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("faq")}</h2>
          <div className="space-y-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="font-semibold text-lg mb-2">{t(`faqItems.${i}.q`)}</h3>
                <p className="text-gray-400">{t(`faqItems.${i}.a`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-600">
          <Link href={localizedHref("")} className="hover:text-white transition">← {tFooter("backTo")} {tCommon("title")}</Link>
          <span>{tFooter("copyright")}</span>
        </div>
      </footer>

      {/* JSON-LD */}
      <SoftwareApplicationJsonLd
        name={t("title")}
        description={t("description")}
        url={`https://aiphotos.icu/${locale}/pet-portrait`}
        image="https://aiphotos.icu/examples/pet-royal-real.png"
      />
      <FAQJsonLd
        faqs={[
          { question: t("faqItems.0.q"), answer: t("faqItems.0.a") },
          { question: t("faqItems.1.q"), answer: t("faqItems.1.a") },
          { question: t("faqItems.2.q"), answer: t("faqItems.2.a") },
        ]}
      />
    </main>
  );
}
