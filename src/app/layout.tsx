import type { Metadata } from "next";
import "./globals.css";
import "./site-dark.css";
import { organizationJsonLd, websiteJsonLd, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL("https://memoryo.dev"),
  title: {
    default: "MemoryOS — Reliable memory infrastructure for AI products",
    template: "%s | MemoryOS",
  },
  description:
    "Turn conversations into governed, prompt-ready memory across sessions, agents, and services — with conflict resolution, provenance, consent, and domain schemas built in.",
  keywords: ["AI memory", "agent memory", "LLM memory", "MemoryOS", "memory infrastructure", "AI agents"],
  alternates: {
    canonical: "https://memoryo.dev",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "MemoryOS",
    title: "MemoryOS — AI memory that stays reliable",
    description: "Production memory infrastructure for AI products, agents, and services.",
    url: "https://memoryo.dev",
    images: [{ url: "https://memoryo.dev/og.png", width: 1200, height: 630, alt: "MemoryOS — AI memory that stays reliable" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MemoryOS — AI memory that stays reliable",
    description: "Production memory infrastructure for AI products, agents, and services.",
    images: ["https://memoryo.dev/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark antialiased" data-scroll-behavior="smooth">
      <head>
        {/* Global JSON-LD: Organization + WebSite + SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd()) }}
        />
      </head>
      <body className="marketing-dark-root">{children}</body>
    </html>
  );
}
