import { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { getAllBlogPosts } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aiphotos.icu";
  
  // Tool pages with their priorities
  const toolRoutes = [
    { path: "/pet-portrait", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/photo-restore", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/photo-enhance", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/background-remove", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/style-transfer", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/ai-headshots", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/pet-portrait/create", priority: 0.8, changeFreq: "weekly" as const },
  ];

  // Static pages
  const staticRoutes = [
    { path: "", priority: 1.0, changeFreq: "daily" as const },
    { path: "/blog", priority: 0.7, changeFreq: "daily" as const },
  ];

  // Blog posts
  const blogPosts = getAllBlogPosts();
  const blogRoutes = blogPosts.map(post => ({
    path: `/blog/${post.slug}`,
    priority: 0.7,
    changeFreq: "monthly" as const,
  }));

  const allRoutes = [...staticRoutes, ...toolRoutes, ...blogRoutes];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale
  for (const locale of locales) {
    for (const route of allRoutes) {
      const localePath = locale === 'en' ? route.path : `/${locale}${route.path}`;
      
      // Add alternates for hreflang
      const alternates: Record<string, string> = {};
      for (const altLocale of locales) {
        const altPath = altLocale === 'en' ? route.path : `/${altLocale}${route.path}`;
        alternates[altLocale] = `${baseUrl}${altPath}`;
      }
      alternates['x-default'] = `${baseUrl}${route.path}`;

      sitemapEntries.push({
        url: `${baseUrl}${localePath}`,
        lastModified: new Date(),
        changeFrequency: route.changeFreq,
        priority: route.priority,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return sitemapEntries;
}
