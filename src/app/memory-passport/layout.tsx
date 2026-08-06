import type { Metadata } from "next";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Memory Passport — User-controlled cross-agent memory sharing",
  description:
    "Memory Passport lets users approve, inspect, and revoke what each AI agent can remember. Tenants register agent identities and generate consent links. Users stay in control.",
  path: "/memory-passport",
});

export default function MemoryPassportLayout({ children }: { children: React.ReactNode }) {
  const pageJsonLd = webPageJsonLd({
    name: "MemoryOS Memory Passport",
    description:
      "A user-owned permission layer for cross-agent memory sharing. Users approve categories, manage grants, answer pending conflicts, and revoke access.",
    url: "https://memoryo.dev/memory-passport",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      {children}
    </>
  );
}
