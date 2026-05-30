import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MemoryOS Pricing",
  description:
    "Simple pricing for the MemoryOS memory layer for AI products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
