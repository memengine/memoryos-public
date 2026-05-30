import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Code2,
  Database,
  GraduationCap,
  Headphones,
  Network,
  Plug,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { docsUrl } from "@/lib/docs";
import { signUpUrl } from "@/lib/urls";

const productPaths = [
  {
    title: "General Memory Engine",
    description:
      "Remember facts, goals, preferences, procedures, and expertise for any AI product.",
    href: "/#general-memory",
    icon: Brain,
    accent: "from-blue-500 to-cyan-400",
    preview: ["Prefers concise answers", "Building a SaaS product", "Uses Python and FastAPI"],
  },
  {
    title: "Customer Support Schema",
    description:
      "Give support agents account context, open issues, resolution preferences, and sentiment risk.",
    href: "/use-cases/customer-support",
    icon: Headphones,
    accent: "from-amber-500 to-orange-400",
    preview: ["Open invoice issue", "Refund preference", "High escalation risk"],
  },
  {
    title: "EdTech Schema",
    description:
      "Help tutoring agents remember weak topics, learning style, exam dates, and progress.",
    href: "/use-cases/edtech",
    icon: GraduationCap,
    accent: "from-violet-500 to-sky-400",
    preview: ["Weak in integration", "Learns by examples", "Exam in 34 days"],
  },
];

const integrationPaths = [
  {
    title: "SDK + REST API",
    description: "Drop MemoryOS into your backend with Python, TypeScript, or direct HTTP.",
    icon: Code2,
  },
  {
    title: "MCP Server",
    description: "Expose MemoryOS tools to MCP-compatible agents without rewriting your app.",
    icon: Plug,
  },
  {
    title: "Memory Passport",
    description: "Let users approve cross-agent memory access with clear consent and revocation.",
    icon: Network,
  },
];

export default function HomePage() {
  const quickstartDocsUrl = docsUrl("/quickstart");

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#F8FAFC] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-[size:76px_76px]" />
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-200/45 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-black text-[#2E75B6] shadow-sm">
              <Sparkles className="size-4" />
              Memory infrastructure for production AI
            </div>
            <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Give every AI agent memory that actually carries forward.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              MemoryOS stores useful user context, filters noise, retrieves what
              matters, and gives teams domain schemas for real products like
              support, education, and AI copilots.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={signUpUrl("/")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0D1117] px-6 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-[#1B2638]"
              >
                Start for free
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={quickstartDocsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400"
              >
                Read docs
                <Code2 className="size-4" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-sky-200 via-violet-200 to-emerald-200 opacity-75 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#0D1117] p-5 shadow-2xl shadow-slate-950/25">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex gap-2">
                  <span className="size-3 rounded-full bg-red-400" />
                  <span className="size-3 rounded-full bg-amber-400" />
                  <span className="size-3 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-slate-300">
                  memory loop
                </span>
              </div>

              <div className="grid gap-5 py-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <div className="text-xs font-black uppercase tracking-[0.22em] text-sky-200">
                    User message
                  </div>
                  <div className="mt-4 animate-slide-in rounded-2xl bg-black/20 p-4 text-sm font-semibold leading-6 text-white opacity-0">
                    I contacted support yesterday. My invoice is still broken
                    and I need it before finance review.
                  </div>
                  <div className="mt-5 animate-agent-reply rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold leading-6 text-slate-200 opacity-0">
                    I remember this is the Growth invoice issue. I&apos;ll
                    prioritize the open billing ticket.
                  </div>
                </div>

                <div className="relative min-h-[320px] rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs font-black uppercase tracking-[0.22em] text-emerald-200">
                    Retrieved context
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      ["Open issue", "Growth invoice failed"],
                      ["Urgency", "Finance review soon"],
                      ["Preference", "Direct answers"],
                    ].map(([label, value], index) => (
                      <div
                        key={label}
                        className="animate-store-memory rounded-2xl border border-white/10 bg-white/10 p-4 opacity-0"
                        style={{ animationDelay: `${900 + index * 520}ms` }}
                      >
                        <div className="text-sm font-black text-white">{value}</div>
                        <div className="mt-2 inline-flex rounded-md bg-[#2E75B6] px-2 py-1 text-xs font-black text-white">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 font-mono text-xs leading-6 text-slate-300">
                mem.get(query=&quot;what matters now?&quot;, external_user_id=&quot;cust_8a72&quot;)
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-black text-slate-500">
          <span>Quality-gated extraction</span>
          <span>Domain schemas</span>
          <span>Semantic retrieval</span>
          <span>User consent</span>
          <span>SDK + MCP</span>
        </div>
      </section>

      <section id="memory-engines" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.28em] text-[#2E75B6]">
              Choose your memory engine
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Start general. Go domain-specific when your product needs structure.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {productPaths.map((path) => {
              const Icon = path.icon;
              return (
                <Link
                  key={path.title}
                  href={path.href}
                  className="group rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-950/10"
                >
                  <span
                    className={`inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${path.accent} text-white shadow-lg`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 text-2xl font-black text-slate-950">
                    {path.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {path.description}
                  </p>
                  <div className="mt-6 space-y-2">
                    {path.preview.map((item) => (
                      <div key={item} className="flex gap-2 text-sm font-semibold text-slate-700">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#2E75B6]">
                    Explore
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="general-memory" className="bg-[#0D1117] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.28em] text-sky-300">
              How it works
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              MemoryOS sits between your agent and long-term context.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Your app sends conversations to MemoryOS. The engine filters,
              extracts, stores, and returns compact context when your agent asks.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6">
            <div className="grid gap-3">
              {[
                [Sparkles, "Quality gate", "skip noise before extraction"],
                [Database, "Memory store", "structured facts + semantic index"],
                [Network, "Retriever", "relevant context for the current query"],
                [ShieldCheck, "Controls", "tenant dashboard, consent, auditability"],
              ].map(([Icon, title, copy]) => {
                const CardIcon = Icon as typeof Sparkles;
                return (
                  <div key={title as string} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-[#0D1117] p-4">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-sky-300/15 text-sky-200">
                      <CardIcon className="size-5" />
                    </span>
                    <div>
                      <div className="font-black text-white">{title as string}</div>
                      <div className="mt-1 text-sm text-slate-400">{copy as string}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="developers" className="bg-[#F8FAFC] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.28em] text-violet-600">
              Integration options
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Pick the integration path that matches your product.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Use the SDK or REST API for your backend. Use the MCP server when
              your AI tool already supports MCP. Use Memory Passport when users
              should approve shared memory across agents.
            </p>
          </div>
          <div className="grid gap-4">
            {integrationPaths.map((path) => {
              const Icon = path.icon;
              return (
                <div key={path.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#2E75B6]">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-black">{path.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{path.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0D1117] px-4 py-24 text-center text-white sm:px-6 lg:px-8">
        <ShieldCheck className="mx-auto size-10 text-emerald-300" />
        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
          Build memory into your AI product without turning your app into a memory system.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Start with the free plan, test one workflow, then add domain schemas
          and Memory Passport when your product needs them.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/pricing"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-[#0D1117] transition hover:bg-slate-200"
          >
            View pricing
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={signUpUrl("/")}
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-black text-white transition hover:border-white/40"
          >
            Create workspace
          </Link>
        </div>
      </section>
    </main>
  );
}
