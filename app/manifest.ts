import type { MetadataRoute } from "next";
import { person } from "@/lib/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name}, portfolio`,
    short_name: person.shortName,
    description: person.headline,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3ee",
    theme_color: "#17191c",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
