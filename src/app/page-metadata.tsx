// Helper component to inject page-level JSON-LD into client pages.
// Usage: <PageJsonLd data={...} />
export function PageJsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
