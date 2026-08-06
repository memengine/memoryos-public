import type { Metadata } from "next";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Customer Support Memory — AI agents that remember account context",
  description:
    "Give support agents structured memory for open issues, account context, escalation risk, and resolution preferences. MemoryOS Customer Support Schema keeps context safe and prompt-ready.",
  path: "/use-cases/customer-support",
});

export default function CustomerSupportLayout({ children }: { children: React.ReactNode }) {
  const pageJsonLd = webPageJsonLd({
    name: "MemoryOS for Customer Support",
    description:
      "Structured AI memory for support agents — open issues, account history, sentiment risk, and resolution preferences across sessions.",
    url: "https://memoryo.dev/use-cases/customer-support",
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
