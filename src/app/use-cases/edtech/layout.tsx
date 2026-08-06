import type { Metadata } from "next";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "EdTech Memory — AI tutors that adapt to each student",
  description:
    "MemoryOS EdTech Schema stores learner profiles, weak topics, exam context, learning style, and language comfort. Build tutors that start every session from the student's actual state.",
  path: "/use-cases/edtech",
});

export default function EdTechLayout({ children }: { children: React.ReactNode }) {
  const pageJsonLd = webPageJsonLd({
    name: "MemoryOS for EdTech",
    description:
      "Structured student memory for AI tutors — weak topics, exam context, learning style, and language preferences that persist across sessions.",
    url: "https://memoryo.dev/use-cases/edtech",
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
