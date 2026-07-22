export function docsUrl(path = ""): string {
  const base = (process.env.NEXT_PUBLIC_DOCS_URL || "https://docs.memoryo.dev").replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
