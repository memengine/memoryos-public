import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MemoryOS — Reliable memory infrastructure for AI products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#050506",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Subtle top-right glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(34,211,238,0.06)",
            filter: "blur(80px)",
          }}
        />

        {/* Logo mark + wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: "900",
              color: "#ffffff",
            }}
          >
            M
          </div>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "800",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            MemoryOS
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: "62px",
            fontWeight: "800",
            lineHeight: "1.06",
            letterSpacing: "-0.03em",
            color: "#ffffff",
            maxWidth: "900px",
            marginBottom: "28px",
          }}
        >
          Give your AI the context it should never forget.
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: "500",
            lineHeight: "1.5",
            color: "#94a3b8",
            maxWidth: "780px",
            marginBottom: "56px",
          }}
        >
          Governed, prompt-ready memory across sessions, agents, and services.
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Extraction", "Conflict resolution", "Memory Passport", "Provenance"].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                fontSize: "15px",
                fontWeight: "600",
                color: "#94a3b8",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: "44px",
            right: "90px",
            fontSize: "16px",
            fontWeight: "600",
            color: "rgba(103,232,249,0.7)",
            letterSpacing: "0.05em",
          }}
        >
          memoryo.dev
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
