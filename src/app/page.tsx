import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Braces,
  CheckCircle2,
  Code2,
  Database,
  Fingerprint,
  GitBranch,
  GraduationCap,
  Headphones,
  Layers3,
  Network,
  Play,
  SearchCheck,
  Sparkles,
} from "lucide-react";

import { EngineTabs } from "@/components/engine-tabs";
import { HeroProductTour } from "@/components/hero-product-tour";
import { ProductFlowWalkthrough } from "@/components/product-flow-walkthrough";
import { ProductionFoundations } from "@/components/production-foundations";
import { PublicMemoryPlayground } from "@/components/public-memory-playground";
import { SiteHeader } from "@/components/site-header";
import { docsUrl } from "@/lib/docs";
import { salesMailUrl, signUpUrl } from "@/lib/urls";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "MemoryOS — Reliable memory infrastructure for AI products",
  description:
    "Turn conversations into governed, prompt-ready memory across sessions, agents, and services — with conflict resolution, provenance, consent, and domain schemas built in.",
  path: "/",
});

const pipeline = [
  { title: "Add", copy: "Conversations, tickets, lessons, tool events, and corrections.", icon: Database },
  { title: "Extract", copy: "Durable facts, preferences, goals, procedures, and domain signals.", icon: SearchCheck },
  { title: "Resolve", copy: "Authority, recency, conflicts, provenance, and version history.", icon: GitBranch },
  { title: "Retrieve", copy: "Compact, prompt-ready context for the next model call.", icon: Braces },
];

const useCases = [
  {
    eyebrow: "Customer Support",
    title: "Pick up where the last ticket ended.",
    body: "Remember open issues, account context, sentiment risk, communication preferences, and resolution history.",
    href: "/use-cases/customer-support",
    icon: Headphones,
    accent: "bg-amber-100 text-amber-800",
  },
  {
    eyebrow: "Education",
    title: "Teach the learner you already know.",
    body: "Carry weak topics, exam context, learning style, language comfort, and progress signals into every session.",
    href: "/use-cases/edtech",
    icon: GraduationCap,
    accent: "bg-violet-100 text-violet-800",
  },
  {
    eyebrow: "Memory Passport",
    title: "Share memory without hiding control.",
    body: "Let users approve categories, inspect grants, correct facts, resolve questions, and revoke agent access.",
    href: "/memory-passport",
    icon: Fingerprint,
    accent: "bg-sky-100 text-sky-800",
  },
];

function ArchitecturePreview() {
  return <HeroProductTour />;
}

export default function HomePage() {
  const quickstart = docsUrl("/quickstart");
  const docs = docsUrl("/");
  const legalLinks = [
    { label: "Privacy", href: docsUrl("/privacy") },
    { label: "Terms", href: docsUrl("/terms") },
    { label: "Cookies", href: docsUrl("/cookie-policy") },
    { label: "Refunds", href: docsUrl("/refund-cancellation") },
    { label: "Security", href: docsUrl("/security") },
    { label: "DPA", href: docsUrl("/dpa") },
    { label: "Support", href: docsUrl("/support-availability") },
    { label: "Contact", href: docsUrl("/contact") },
  ];

  return (
    <main className="marketing-dark min-h-screen bg-[#050506] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd({
              name: "MemoryOS — Reliable memory infrastructure for AI products",
              description:
                "Turn conversations into governed, prompt-ready memory across sessions, agents, and services — with conflict resolution, provenance, consent, and domain schemas built in.",
              url: "https://memoryo.dev",
            })
          ),
        }}
      />
      <SiteHeader dark />

      <section className="relative overflow-hidden border-b border-white/[0.08] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute -left-28 top-20 size-96 rounded-full bg-cyan-600/[0.07] blur-3xl" />
        <div className="absolute -right-28 bottom-10 size-96 rounded-full bg-sky-600/[0.06] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-sm font-bold text-slate-200 shadow-sm">
              <Sparkles className="size-4" /> Production memory for AI products
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-[4.75rem]">
              Give your AI the context it should never forget.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              MemoryOS turns conversations into governed, prompt-ready memory across sessions, agents, and services. Extraction, retrieval, conflict resolution, provenance, consent, and domain schemas — in one API.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#playground" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100">
                Try the live playground <Play className="size-4" />
              </Link>
              <a href={quickstart} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.10]">
                Read the quickstart <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold text-slate-400">
              {["Python SDK", "TypeScript SDK", "REST API", "MCP Server"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">{item}</span>
              ))}
            </div>
          </div>
          <ArchitecturePreview />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-400">The memory problem</p>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Storage is the easy part.</h2>
            </div>
            <p className="text-xl leading-9 text-slate-400">Production memory must decide what is durable, what changed, which source to trust, what the user approved, and what context the next agent actually needs.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [Bot, "Session amnesia", "A returning user has to repeat goals, preferences, issues, and history every time a new session starts."],
              [Network, "Multi-agent drift", "Support, onboarding, recommendations, and copilots each build a different picture of the same person."],
              [GitBranch, "Conflicting truth", "New facts contradict old facts, but raw vector retrieval returns both and leaves the model to guess."],
            ].map(([Icon, title, body]) => {
              const CardIcon = Icon as typeof Bot;
              return <article key={title as string} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-7"><CardIcon className="size-7 text-slate-600" /><h3 className="mt-10 text-2xl font-black">{title as string}</h3><p className="mt-4 text-base leading-7 text-slate-600">{body as string}</p></article>;
            })}
          </div>
        </div>
      </section>

      <EngineTabs />

      <section id="how-it-works" className="bg-[#0D1117] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-400">From messages to memory</p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">Four stages. One reliable context layer.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">Keep your model, tools, and agent framework. MemoryOS handles the memory lifecycle around them.</p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {pipeline.map((step, index) => {
              const Icon = step.icon;
              return <article key={step.title} className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"><div className="flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-xl bg-white/[0.08] text-slate-300"><Icon className="size-5" /></span><span className="font-mono text-xs text-slate-600">0{index + 1}</span></div><h3 className="mt-8 text-2xl font-black">{step.title}</h3><p className="mt-4 text-sm leading-7 text-slate-400">{step.copy}</p></article>;
            })}
          </div>
          <div id="developers" className="mt-8 grid gap-5 rounded-[1.75rem] border border-white/10 bg-black/30 p-6 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="p-3"><Code2 className="size-7 text-slate-300" /><h3 className="mt-6 text-3xl font-black">Two calls to start.</h3><p className="mt-4 max-w-md leading-8 text-slate-400">Write after a conversation. Retrieve before the next model call. Add source metadata, domain schemas, or Memory Passport when your product needs them.</p></div>
            <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#070709] p-6 text-sm leading-8 text-slate-300"><code>{`from memoryos import Memory

mem = Memory(api_key="mem_live_xxx")

mem.add(messages, external_user_id="user_123")
context = mem.get(query, external_user_id="user_123")`}</code></pre>
          </div>
        </div>
      </section>

      <ProductFlowWalkthrough />
      <PublicMemoryPlayground />

      <ProductionFoundations />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl"><p className="text-sm font-black uppercase tracking-[0.24em] text-slate-400">Built around real workflows</p><h2 className="mt-4 text-4xl font-black sm:text-5xl">Memory that understands the product it serves.</h2></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {useCases.map((item) => {
              const Icon = item.icon;
              return <Link key={item.eyebrow} href={item.href} className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><span className={`flex size-12 items-center justify-center rounded-xl ${item.accent}`}><Icon className="size-6" /></span><p className="mt-9 text-xs font-black uppercase tracking-[0.2em] text-slate-500">{item.eyebrow}</p><h3 className="mt-3 text-2xl font-black tracking-tight">{item.title}</h3><p className="mt-4 text-base leading-8 text-slate-600">{item.body}</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-black">Explore use case <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span></Link>;
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0f14] p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="text-sm font-black uppercase tracking-[0.22em] text-slate-500">Start with your real product</p><h2 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl text-white">Give your next AI interaction the context the last one earned.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">Try the simulated playground, follow the quickstart, or talk with us about production onboarding.</p></div>
          <div className="flex flex-col gap-3">
            <a href={signUpUrl("/")} className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:bg-slate-100">Start building <ArrowRight className="size-4" /></a>
            <a href={salesMailUrl()} className="inline-flex h-13 items-center justify-center rounded-xl border border-white/15 px-6 py-4 text-sm font-black text-slate-200 transition hover:bg-white/5">Talk to us</a>
          </div>
        </div>
      </section>

      <footer className="bg-[#0D1117] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08]">
                <img src="/brand/logo-mark-dark.svg" alt="" aria-hidden="true" className="size-6" />
              </span>
              <span className="font-black uppercase tracking-[0.2em]">MemoryOS</span>
            </div>
            <p className="mt-6 max-w-sm leading-7 text-slate-400">Reliable memory infrastructure for AI products, agents, and services.</p>
          </div>
          <div><p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Product</p><div className="mt-5 space-y-3 text-sm text-slate-300"><Link href="/#engines" className="block">Engines</Link><Link href="/#playground" className="block">Playground</Link><Link href="/pricing" className="block">Pricing</Link></div></div>
          <div><p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Use cases</p><div className="mt-5 space-y-3 text-sm text-slate-300"><Link href="/use-cases/customer-support" className="block">Customer Support</Link><Link href="/use-cases/edtech" className="block">Education</Link><Link href="/memory-passport" className="block">Memory Passport</Link></div></div>
          <div><p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Developers</p><div className="mt-5 space-y-3 text-sm text-slate-300"><a href={docs} target="_blank" rel="noreferrer" className="block">Documentation</a><a href={quickstart} target="_blank" rel="noreferrer" className="block">Quickstart</a><Link href="/#production" className="block">Production controls</Link></div></div><div><p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Legal</p><div className="mt-5 space-y-3 text-sm text-slate-300">{legalLinks.map((link) => (<a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="block">{link.label}</a>))}</div></div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Copyright {new Date().getFullYear()} MemoryOS</span><span>Context that persists. Control that scales.</span></div>
      </footer>
    </main>
  );
}
