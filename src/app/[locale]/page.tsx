"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const toolSections = [
  {
    id: "pet-portrait",
    nameKey: "petPortrait",
    taglineKey: "petPortraitTagline",
    descKey: "petPortraitDesc",
    emoji: "🐾",
    color: "from-amber-500 to-orange-600",
    bgColor: "from-amber-950/50 to-orange-950/30",
    before: "/examples/pet-original.jpg",
    after: "/examples/pet-royal-real.png",
    afterAlt: "/examples/pet-disney-real.png",
    afterAlt2: "/examples/pet-oil-real.png",
    featuresKeys: ["petFeature1", "petFeature2", "petFeature3"],
  },
  {
    id: "photo-restore",
    nameKey: "photoRestore",
    taglineKey: "photoRestoreTagline",
    descKey: "photoRestoreDesc",
    emoji: "📸",
    color: "from-blue-500 to-cyan-600",
    bgColor: "from-blue-950/50 to-cyan-950/30",
    before: "/examples/restore-before.jpg",
    after: "/examples/restore-after.png",
    featuresKeys: ["restoreFeature1", "restoreFeature2", "restoreFeature3"],
  },
  {
    id: "photo-enhance",
    nameKey: "photoEnhance",
    taglineKey: "photoEnhanceTagline",
    descKey: "photoEnhanceDesc",
    emoji: "✨",
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-950/50 to-pink-950/30",
    before: "/examples/enhance-before.jpg",
    after: "/examples/enhance-after.png",
    featuresKeys: ["enhanceFeature1", "enhanceFeature2", "enhanceFeature3"],
  },
  {
    id: "background-remove",
    nameKey: "backgroundRemove",
    taglineKey: "backgroundRemoveTagline",
    descKey: "backgroundRemoveDesc",
    emoji: "✂️",
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-950/50 to-emerald-950/30",
    before: "/examples/bg-remove-before.jpg",
    after: "/examples/bg-remove-after.png",
    featuresKeys: ["bgFeature1", "bgFeature2", "bgFeature3"],
  },
  {
    id: "style-transfer",
    nameKey: "styleTransfer",
    taglineKey: "styleTransferTagline",
    descKey: "styleTransferDesc",
    emoji: "🎨",
    color: "from-rose-500 to-red-600",
    bgColor: "from-rose-950/50 to-red-950/30",
    before: "/examples/style-before.jpg",
    after: "/examples/style-after.png",
    featuresKeys: ["styleFeature1", "styleFeature2", "styleFeature3"],
  },
  {
    id: "ai-headshots",
    nameKey: "aiHeadshots",
    taglineKey: "aiHeadshotsTagline",
    descKey: "aiHeadshotsDesc",
    emoji: "👔",
    color: "from-slate-400 to-zinc-600",
    bgColor: "from-slate-950/50 to-zinc-950/30",
    before: "/examples/headshot-before.jpg",
    after: "/examples/headshot-after.png",
    featuresKeys: ["headshotFeature1", "headshotFeature2", "headshotFeature3"],
  },
];

export default function Home() {
  const [activeShowcase, setActiveShowcase] = useState(0);
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveShowcase((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Helper to get localized link
  const localizedHref = (path: string) => `/${locale}${path}`;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href={localizedHref("")} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-lg">
              📸
            </div>
            <span className="text-xl font-bold">{tCommon("title")}</span>
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
              <a href="#pet-portrait" className="hover:text-white transition">{tNav("petPortrait")}</a>
              <a href="#photo-restore" className="hover:text-white transition">{tNav("photoRestore")}</a>
              <a href="#style-transfer" className="hover:text-white transition">{tNav("styleTransfer")}</a>
              <a href="#ai-headshots" className="hover:text-white transition">{tNav("aiHeadshots")}</a>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-black to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {t("toolCount")}
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1]">
            {t("hero.titleLine1")}
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">
              {t("hero.titleLine2")}
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            {t("hero.subtitle")}
          </p>

          {/* Quick showcase */}
          <div className="flex justify-center gap-4 mb-12">
            {[
              { b: "/examples/pet-original.jpg", a: "/examples/pet-royal-real.png" },
              { b: "/examples/style-before.jpg", a: "/examples/style-after.png" },
              { b: "/examples/restore-before.jpg", a: "/examples/restore-after.png" },
            ].map((item, i) => (
              <div 
                key={i} 
                className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  activeShowcase === i ? "border-violet-500 scale-105" : "border-white/10 opacity-60"
                }`}
                style={{ width: activeShowcase === i ? 200 : 80 }}
              >
                <div className="flex">
                  <img src={item.b} alt="" className="w-1/2 h-24 object-cover" />
                  <img src={item.a} alt="" className="w-1/2 h-24 object-cover" />
                </div>
              </div>
            ))}
          </div>

          <a
            href="#pet-portrait"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-violet-500/25 hover:scale-105 transition-all"
          >
            {t("hero.cta")} ↓
          </a>
        </div>
      </section>

      {/* Tool Sections */}
      {toolSections.map((tool, index) => (
        <section 
          key={tool.id} 
          id={tool.id}
          className={`relative py-24 lg:py-32 overflow-hidden ${index % 2 === 0 ? "" : "bg-white/[0.02]"}`}
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${tool.bgColor} opacity-50`} />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
              
              {/* Text Content */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${tool.color} text-sm font-medium mb-6`}>
                  {tool.emoji} {t(`tools.${tool.nameKey}`)}
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                  {t(`tools.${tool.taglineKey}`)}
                </h2>
                
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  {t(`tools.${tool.descKey}`)}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {tool.featuresKeys.map((fKey, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
                      {t(`tools.${fKey}`)}
                    </span>
                  ))}
                </div>

                <Link
                  href={localizedHref(`/${tool.id}`)}
                  className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${tool.color} rounded-2xl font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all`}
                >
                  {t("tryNow")} →
                </Link>
              </div>

              {/* Visual Showcase */}
              <div className={`relative ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="relative">
                  {/* Main before/after */}
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <div className="grid grid-cols-2">
                      <div className="relative">
                        <img 
                          src={tool.before} 
                          alt="Before" 
                          className="w-full aspect-square object-cover"
                        />
                        <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur rounded-full text-xs font-medium">
                          {tCommon("before")}
                        </div>
                      </div>
                      <div className="relative">
                        <img 
                          src={tool.after} 
                          alt="After" 
                          className="w-full aspect-square object-cover"
                        />
                        <div className={`absolute bottom-3 right-3 px-3 py-1 bg-gradient-to-r ${tool.color} rounded-full text-xs font-medium`}>
                          {tCommon("after")}
                        </div>
                      </div>
                    </div>
                    {/* Center arrow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold shadow-xl text-xl">
                      →
                    </div>
                  </div>

                  {/* Extra examples for pet portrait */}
                  {tool.afterAlt && (
                    <div className="absolute -right-4 top-1/4 flex flex-col gap-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/20 shadow-lg transform rotate-6 hover:rotate-0 transition-transform">
                        <img src={tool.afterAlt} alt="" className="w-full h-full object-cover" />
                      </div>
                      {tool.afterAlt2 && (
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 shadow-lg transform -rotate-6 hover:rotate-0 transition-transform">
                          <img src={tool.afterAlt2} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/30 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {toolSections.map((tool) => (
              <Link
                key={tool.id}
                href={localizedHref(`/${tool.id}`)}
                className={`px-6 py-3 bg-gradient-to-r ${tool.color} rounded-xl font-medium hover:scale-105 transition-transform shadow-lg`}
              >
                {tool.emoji} {t(`tools.${tool.nameKey}`).split(" ")[0]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📸</span>
            <span className="font-semibold">{tCommon("title")}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            {toolSections.map((tool) => (
              <Link key={tool.id} href={localizedHref(`/${tool.id}`)} className="hover:text-white transition">
                {t(`tools.${tool.nameKey}`).split(" ")[0]}
              </Link>
            ))}
          </div>
          <div className="text-sm text-gray-600">{t("footer.copyright")}</div>
        </div>
      </footer>
    </main>
  );
}
