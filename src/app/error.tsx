"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to an error reporting service in production
    // e.g. Sentry.captureException(error)
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050506] px-4 text-center text-white">
      <div className="space-y-6">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 mx-auto">
          <span className="text-2xl">⚠</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Something went wrong
          </h1>
          <p className="mx-auto max-w-sm text-base leading-7 text-slate-400">
            An unexpected error occurred. Please try again or return home.
          </p>
          {error.digest ? (
            <p className="font-mono text-xs text-slate-600">
              Error ID: {error.digest}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-semibold text-white transition hover:bg-white/[0.05]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
