import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { person } from "@/lib/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${person.name}, ${person.headline}`;

export default async function OpengraphImage() {
  const photo = await readFile(path.join(process.cwd(), "public/images/profile/aziz.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f5f3ee" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 720,
            padding: "64px 0 64px 72px",
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: "#5a5f66" }}>{person.headline}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 84, lineHeight: 1, color: "#17191c", fontWeight: 600 }}>
              Abdul Aziz
            </div>
            <div style={{ display: "flex", fontSize: 84, lineHeight: 1.05, color: "#17191c", fontWeight: 600 }}>
              Setiawan
            </div>
            <div style={{ display: "flex", width: 120, height: 8, background: "#b4381f", marginTop: 32 }} />
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#17191c" }}>
            Built the CS Tools Portal that cut manual case work by 50%
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
    { ...size }
  );
}
