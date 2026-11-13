import { ImageResponse } from "next/og";
import { person } from "@/lib/content/profile";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Initials on ink with the signal-red accent bar: the site's palette at favicon size.
export default function Icon() {
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
          fontSize: 15,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        {person.initials}
        <div style={{ display: "flex", width: 14, height: 2, marginTop: 1, background: "#f08060" }} />
      </div>
    ),
    { ...size }
  );
}
