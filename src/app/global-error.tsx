"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalErrorBoundary]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#050506",
          color: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#94a3b8", marginBottom: "1.5rem", maxWidth: "28rem" }}>
            A critical error occurred. Please refresh the page.
          </p>
          {error.digest ? (
            <p style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#475569", marginBottom: "1rem" }}>
              Error ID: {error.digest}
            </p>
          ) : null}
          <button
            onClick={reset}
            style={{
              padding: "0.625rem 1.25rem",
              borderRadius: "0.75rem",
              background: "white",
              color: "#0f172a",
              fontWeight: 600,
              fontSize: "0.875rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
