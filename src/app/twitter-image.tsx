import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MemoryOS — Reliable memory infrastructure for AI products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#050506",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "48px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              backgroundColor: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 900,
              color: "#ffffff",
              marginRight: "16px",
            }}
          >
            M
          </div>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            MemoryOS
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "58px",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.08,
            maxWidth: "880px",
            marginBottom: "28px",
          }}
        >
          Give your AI the context it should never forget.
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: 400,
            color: "#94a3b8",
            maxWidth: "720px",
            lineHeight: 1.5,
            marginBottom: "52px",
          }}
        >
          Governed, prompt-ready memory across sessions, agents, and services.
        </div>

        {/* Pills row */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Extraction", "Conflict resolution", "Memory Passport", "Provenance"].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                backgroundColor: "rgba(255,255,255,0.07)",
                fontSize: "15px",
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Domain bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "44px",
            right: "90px",
            fontSize: "16px",
            fontWeight: 600,
            color: "#67e8f9",
          }}
        >
          memoryo.dev
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
