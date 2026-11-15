import type { MetadataRoute } from "next";

const base = "https://portoaziz.my.id";
// One entry per page in app/; keep in sync with navLinks in components/chrome/navbar.tsx.
const routes = ["", "/work", "/about", "/creative", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
