export function cleanBaseUrl(value: string | undefined, fallback: string): string {
  return (value || fallback).replace(/\/$/, "");
}

export function tenantAppUrl(): string {
  return cleanBaseUrl(process.env.NEXT_PUBLIC_TENANT_APP_URL, "https://app.memoryo.dev");
}

export function apiBaseUrl(): string {
  return cleanBaseUrl(process.env.NEXT_PUBLIC_API_BASE, "");
}

export function tenantPath(path = "/"): string {
  const baseUrl = tenantAppUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

export function signUpUrl(redirect = "/"): string {
  return tenantPath(`/sign-up?redirect=${encodeURIComponent(redirect)}`);
}

export function mailtoUrl(email: string | undefined): string {
  return email ? `mailto:${email}` : "#";
}

export function salesMailUrl(): string {
  return mailtoUrl(process.env.NEXT_PUBLIC_SALES_EMAIL);
}

export function verifyMailUrl(): string {
  return mailtoUrl(process.env.NEXT_PUBLIC_VERIFY_EMAIL);
}
