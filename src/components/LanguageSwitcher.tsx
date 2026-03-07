"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // Get the path without the locale prefix
    const segments = pathname.split('/');
    // Check if the first segment is a locale
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      // No locale in path, add it
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/') || '/';
    router.push(newPath);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm"
        aria-label="Switch language"
      >
        <span className="text-lg">🌐</span>
        <span className="hidden sm:inline">{localeNames[locale as Locale]}</span>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 top-full mt-2 py-2 bg-gray-900 border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[120px]">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors flex items-center gap-2 ${
              locale === loc ? "text-violet-400" : "text-gray-300"
            }`}
          >
            {locale === loc && (
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            )}
            <span className={locale !== loc ? "ml-3.5" : ""}>{localeNames[loc]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
