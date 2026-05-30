export function docsUrl(path = ""): string {
  const base = (process.env.NEXT_PUBLIC_DOCS_URL || "").replace(/\/$/, "");
  if (!base) {
    return "#";
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
