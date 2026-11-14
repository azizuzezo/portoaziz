import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { person } from "@/lib/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${person.name} (${person.chineseName}), ${person.headline}`;

// Same tokens as the light theme in app/globals.css.
const C = { paper: "#ffffff", ink: "#111214", muted: "#5b616b", line: "#e4e6ea", accent: "#1f5fd6" };

/**
 * Loads a Google Font subset holding only `text`, as TTF (the format the OG renderer reads).
 * Returns null when offline so the image still builds, just in the fallback font.
 */
async function loadFont(family: string, weight: number, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const photo = await readFile(path.join(process.cwd(), "public/images/profile/aziz.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  const latin = `${person.name}${person.headline}${person.focus}portoaziz.my.id`;
  const [poppins400, poppins600, notoSc] = await Promise.all([
    loadFont("Poppins", 400, latin),
    loadFont("Poppins", 600, latin),
    loadFont("Noto+Sans+SC", 500, person.chineseName),
  ]);
  const fonts = [
    poppins400 && { name: "Poppins", data: poppins400, weight: 400 as const, style: "normal" as const },
    poppins600 && { name: "Poppins", data: poppins600, weight: 600 as const, style: "normal" as const },
    notoSc && { name: "Noto Sans SC", data: notoSc, weight: 500 as const, style: "normal" as const },
  ].filter((f) => !!f);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.paper, fontFamily: "Poppins" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 720,
            padding: "64px 24px 64px 72px",
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: C.muted }}>{person.headline}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 84, lineHeight: 1, color: C.ink, fontWeight: 600, letterSpacing: -2 }}>
              Abdul Aziz
            </div>
            <div style={{ display: "flex", alignItems: "baseline", marginTop: 6 }}>
              <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05, color: C.accent, fontWeight: 600, letterSpacing: -2 }}>
                Setiawan
              </div>
              <div
                style={{
                  display: "flex",
                  marginLeft: 20,
                  fontSize: 38,
                  color: C.muted,
                  fontFamily: "Noto Sans SC",
                  fontWeight: 500,
                }}
              >
                {person.chineseName}
              </div>
            </div>
            <div style={{ display: "flex", width: 120, height: 8, borderRadius: 4, background: C.accent, marginTop: 32 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: C.ink }}>
            <span>{person.focus}</span>
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={photoSrc}
          width={480}
          height={630}
          style={{ objectFit: "cover", objectPosition: "51% 30%" }}
        />
      </div>
    ),
    { ...size, fonts }
  );
}
