import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aiphotos.icu";
  
  const routes = [
    "",
    "/pet-portrait",
    "/photo-restore",
    "/photo-enhance",
    "/background-remove",
    "/style-transfer",
    "/ai-headshots",
    "/blog",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
