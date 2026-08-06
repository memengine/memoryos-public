import type { Metadata } from "next";
import { buildMetadata, webPageJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — Try every feature free, pay when you grow",
  description:
    "MemoryOS pricing starts free. Memory Passport, conflict resolution, domain schemas, and multi-service writers are available on every plan. Upgrade when volume grows.",
  path: "/pricing",
});

const pricingFaqs = [
  ["Do I need a credit card for Free?", "No. You can start on Free without a card and add billing only when you choose a paid plan."],
  ["Do Free users get the real product features?", "Yes. Free includes Memory Passport, domain schemas, conflict handling, multi-service writers, quality gates, and retrieval feedback with lower limits."],
  ["What counts as an API call?", "Each MemoryOS write, retrieval, tenant operation, or feedback request counts as one API call."],
  ["What happens at the monthly limit?", "Free pauses at the limit. Paid plans can keep the AI running without memory context until capacity is restored or upgraded."],
  ["Can I change billing intervals?", "Yes. You can move between monthly and annual billing. Annual billing includes two months free."],
  ["Which plan should I choose first?", "Start Free to test the full surface. Move to Starter when you ship, Growth when usage is consistent, and Scale before a larger launch."],
] as const;

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const pageJsonLd = webPageJsonLd({
    name: "MemoryOS Pricing",
    description:
      "MemoryOS pricing starts free with full feature access. Plans scale by volume, audit retention, support level, and operational review.",
    url: "https://memoryo.dev/pricing",
  });

  const faqJson = faqJsonLd(pricingFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }}
      />
      {children}
    </>
  );
}
