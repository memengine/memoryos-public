"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentType } from "react";
import { ArrowRight, CheckCircle2, Code2, Database, Play, ShieldCheck } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { docsUrl } from "@/lib/docs";
import { signUpUrl } from "@/lib/urls";

type Icon = ComponentType<{ className?: string }>;

type DomainPageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  docsPath: string;
  cta: string;
  icon: Icon;
  accent: "violet" | "amber" | "sky";
  proofLabel: string;
  memories: string[];
  problems: string[];
  features: Array<{ icon: Icon; title: string; body: string }>;
  code: string;
  finalTitle: string;
  finalBody: string;
  simulate?: boolean;
};

const accents = {
  violet: {
    badge: "border-slate-400/25 bg-slate-500/10 text-slate-100",
    icon: "bg-slate-500/15 text-slate-100 ring-slate-400/20",
    button: "bg-white hover:bg-slate-100 shadow-black/40 text-slate-950",
    text: "text-slate-300",
    soft: "border-slate-400/20 bg-slate-500/10",
    glow: "rgba(100,116,139,0.18)",
  },
  amber: {
    badge: "border-amber-300/25 bg-amber-500/10 text-amber-100",
    icon: "bg-amber-500/15 text-amber-100 ring-amber-300/20",
    button: "bg-amber-500 hover:bg-amber-400 shadow-amber-950/40 text-black",
    text: "text-amber-300",
    soft: "border-amber-300/20 bg-amber-500/10",
    glow: "rgba(245,158,11,0.24)",
  },
  sky: {
    badge: "border-sky-300/25 bg-sky-500/10 text-sky-100",
    icon: "bg-sky-500/15 text-sky-100 ring-sky-300/20",
    button: "bg-sky-500 hover:bg-sky-400 shadow-sky-950/40 text-black",
    text: "text-sky-300",
    soft: "border-sky-300/20 bg-sky-500/10",
    glow: "rgba(14,165,233,0.24)",
  },
};

function SignalGraph({ memories, accent, simulate = false }: { memories: string[]; accent: DomainPageProps["accent"]; simulate?: boolean }) {
  const a = accents[accent];
  const pipeline = ["Input", "Schema", "Ledger", "Context"];
  const stageCopy = ["Signal received from a verified agent", "Requested categories matched to the Passport schema", "Consent, source, and grant state recorded", "Approved context ranked and ready for retrieval"];
  const stageStatus = ["received", "category matched", "grant recorded", "ranked and retrieval-ready"];
  const [activeStep, setActiveStep] = useState(simulate ? 0 : 3);

  useEffect(() => {
    if (!simulate) return;
    const timer = window.setInterval(() => setActiveStep((current) => (current + 1) % 4), 2400);
    return () => window.clearInterval(timer);
  }, [simulate]);

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div className="absolute left-1/2 top-10 size-72 -translate-x-1/2 rounded-full blur-3xl" style={{ background: a.glow }} />
      <div className="relative flex items-center justify-between gap-2">
        {pipeline.map((item, index) => {
          const active = activeStep === index;
          const complete = activeStep > index;
          return <div key={item} className="flex min-w-0 flex-1 items-center gap-2">
            <button type="button" onClick={() => setActiveStep(index)} aria-pressed={active} className={`flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-2 py-2 text-left transition duration-500 ${active ? `${a.soft} border-current shadow-lg` : complete ? "border-emerald-300/20 bg-emerald-300/[0.06]" : "border-transparent bg-white/[0.025]"}`}>
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ring-1 transition duration-500 ${active ? a.icon : complete ? "bg-emerald-300/15 text-emerald-300 ring-emerald-300/20" : "bg-white/[0.05] text-slate-500 ring-white/10"}`}>{complete ? <CheckCircle2 className="size-4" /> : index + 1}</span>
              <span className={`hidden truncate text-xs font-bold sm:block ${active ? "text-white" : complete ? "text-emerald-200" : "text-slate-500"}`}>{item}</span>
            </button>
            {index < pipeline.length - 1 && <ArrowRight className={`hidden size-3.5 shrink-0 transition sm:block ${complete ? "text-emerald-300/60" : "text-white/20"}`} />}
          </div>;
        })}
      </div>
      {simulate ? <div className="relative mt-4 flex items-center gap-2 rounded-xl border border-sky-300/15 bg-sky-300/[0.06] px-3 py-2 text-[11px] font-semibold text-sky-100"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-300 opacity-50" /><span className="relative inline-flex size-2 rounded-full bg-sky-300" /></span>{stageCopy[activeStep]}</div> : null}

      <div className="relative mt-8 grid gap-3">
        {memories.map((memory, index) => (
          <div key={memory} className={`rounded-2xl border bg-black/35 p-4 transition duration-500 ${!simulate || index <= activeStep ? "border-white/10 opacity-100" : "border-white/[0.05] opacity-35"}`}>
            <div className="flex items-start gap-3">
              <CheckCircle2 className={`mt-0.5 size-5 shrink-0 ${a.text}`} />
              <div>
                <p className="font-semibold text-white">{memory}</p>
                <p className="mt-1 text-xs text-slate-400">{simulate ? stageStatus[Math.min(activeStep, 3)] : "ranked, sourced, and retrieval-ready"}</p>
              </div>
              <span className="ml-auto rounded-full border border-white/10 px-2 py-1 font-mono text-[10px] text-slate-500">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={`relative mt-6 rounded-2xl border p-4 text-sm leading-6 transition duration-500 ${a.soft} ${!simulate || activeStep === 3 ? "text-slate-100 opacity-100 shadow-lg" : "text-slate-500 opacity-55"}`}>
        {!simulate || activeStep === 3 ? "MemoryOS returns compact context. Your product keeps control of actions, tools, and final responses." : "Building compact context from approved Passport categories…"}
      </div>
    </div>
  );
}

export function MarketingDomainShell({
  eyebrow,
  title,
  subtitle,
  docsPath,
  cta,
  icon: HeroIcon,
  accent,
  proofLabel,
  memories,
  problems,
  features,
  code,
  finalTitle,
  finalBody,
  simulate = false,
}: DomainPageProps) {
  const a = accents[accent];
  const docs = docsUrl(docsPath);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050506] text-white">
      <SiteHeader dark />

      <section className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#050506_0%,#09090b_100%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.22em] ${a.badge}`}>
              <HeroIcon className="size-4" />
              {eyebrow}
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">{subtitle}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={signUpUrl("/")} className={`inline-flex h-13 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-black shadow-2xl transition hover:-translate-y-0.5 ${a.button}`}>
                {cta}
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/#playground" className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/30">
                <Play className="size-4" />
                Try playground
              </Link>
            </div>
          </div>
          <SignalGraph memories={memories} accent={accent} simulate={simulate} />
        </div>
      </section>

      <section className="bg-[#080a10] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className={`text-xs font-black uppercase tracking-[0.28em] ${a.text}`}>{proofLabel}</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Why this needs memory infrastructure.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              The hard part is not remembering text. It is deciding what is durable, what is stale, who controls it, and what the next agent should trust.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {problems.map((problem) => (
              <div key={problem} className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
                <ShieldCheck className={`size-6 ${a.text}`} />
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050506] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className={`text-xs font-black uppercase tracking-[0.28em] ${a.text}`}>What you get</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Clear context for the next model call.</h2>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/20">
                  <span className={`flex size-12 items-center justify-center rounded-2xl ring-1 ${a.icon}`}>
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-black">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{feature.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#080a10] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className={`text-xs font-black uppercase tracking-[0.28em] ${a.text}`}>Integration</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Use the SDK first. Add governance when needed.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              The same API supports solo apps and production teams. Start with a stable user ID, then add source metadata, service writers, or Memory Passport when your product needs them.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={docs} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-black transition hover:bg-slate-200">
                Read docs <Code2 className="size-4" />
              </a>
              <Link href="/#playground" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 px-5 text-sm font-black text-white transition hover:border-white/30">
                Open demo <Database className="size-4" />
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#05060b] shadow-2xl shadow-black/40">
            <div className="border-b border-white/10 px-5 py-4 text-sm font-bold text-slate-300">Working pattern</div>
            <pre className="overflow-x-auto p-6 text-sm leading-7 text-slate-300"><code>{code}</code></pre>
          </div>
        </div>
      </section>

      <section className="bg-[#050506] px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className={`mx-auto flex size-16 items-center justify-center rounded-3xl border ${a.soft}`}>
          <HeroIcon className={`size-8 ${a.text}`} />
        </div>
        <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">{finalTitle}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">{finalBody}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="#playground" className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-black shadow-2xl transition hover:-translate-y-0.5 ${a.button}`}>
            Try this flow <ArrowRight className="size-4" />
          </Link>
          <Link href={signUpUrl("/")} className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/15 px-6 text-sm font-black text-white transition hover:border-white/30">
            Create workspace
          </Link>
        </div>
      </section>
    </main>
  );
}
