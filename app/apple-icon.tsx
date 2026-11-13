import { ImageResponse } from "next/og";
import { person } from "@/lib/content/profile";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#17191c",
          color: "#f5f3ee",
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        {person.initials}
        <div style={{ display: "flex", width: 72, height: 8, marginTop: 8, background: "#f08060" }} />
      </div>
    ),
    { ...size }
  );
}
