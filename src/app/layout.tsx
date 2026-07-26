import type { Metadata } from "next";
import "./globals.css";
import "./site-dark.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://memoryo.dev"),
  title: {
    default: "MemoryOS — Reliable memory infrastructure for AI products",
    template: "%s | MemoryOS",
  },
  description:
    "Turn conversations into governed, prompt-ready memory across sessions, agents, and services—with conflict resolution, provenance, consent, and domain schemas built in.",
  keywords: ["AI memory", "agent memory", "LLM memory", "MemoryOS", "memory infrastructure", "AI agents"],
  openGraph: {
    type: "website",
    title: "MemoryOS — AI memory that stays reliable",
    description: "Production memory infrastructure for AI products, agents, and services.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MemoryOS — AI memory that stays reliable" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MemoryOS — AI memory that stays reliable",
    description: "Production memory infrastructure for AI products, agents, and services.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
