import { ImageResponse } from "next/og";

export const alt = "Harsh Patel — Full-Stack & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0F",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            color: "#06B6D4",
            textTransform: "uppercase",
          }}
        >
          Full-Stack &amp; AI Engineer
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              color: "#F5F5F0",
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            Harsh Patel
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 32,
              color: "#9C9CA8",
            }}
          >
            I build full-stack products and AI agents that actually ship.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 22,
            color: "#9C9CA8",
          }}
        >
          <span style={{ color: "#06B6D4" }}>20,000+ users</span>
          <span>·</span>
          <span>1st place hackathon</span>
          <span>·</span>
          <span>13-agent pipeline</span>
          <span>·</span>
          <span>UT Dallas</span>
        </div>
      </div>
    ),
    size,
  );
}
