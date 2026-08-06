import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050506] px-4 text-center text-white">
      <div className="space-y-6">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] mx-auto">
          <span className="text-2xl font-black text-slate-400">404</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Page not found
          </h1>
          <p className="mx-auto max-w-sm text-base leading-7 text-slate-400">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Back to home
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:bg-white/[0.05]"
          >
            View pricing
          </Link>
        </div>
      </div>
    </main>
  );
}
