import type { Metadata } from "next";

const BASE_URL = "https://memoryo.dev";
const SITE_NAME = "MemoryOS";

/**
 * Builds page-specific Metadata with canonical URL, OG, and Twitter.
 * The OG image is served by the root opengraph-image.tsx file automatically.
 * metadataBase in layout.tsx ensures Next.js resolves it correctly.
 */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD helpers — returned as plain objects, rendered via <script> tags.
// No fake data: no ratings, reviews, prices, social profiles, or addresses.
// ---------------------------------------------------------------------------

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/brand/logo-mark.svg`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@memoryo.dev",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: BASE_URL,
    description:
      "Memory infrastructure for AI products. Extraction, conflict resolution, multi-agent memory sharing, provenance, and user-owned Memory Passport — in one API.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier available. Paid plans start from $22/month.",
    },
  };
}

export function webPageJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: { "@type": "WebSite", url: BASE_URL, name: SITE_NAME },
  };
}

export function faqJsonLd(faqs: ReadonlyArray<readonly [string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
