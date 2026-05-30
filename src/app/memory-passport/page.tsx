import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  Network,
  RotateCcw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { docsUrl } from "@/lib/docs";
import { signUpUrl } from "@/lib/urls";

const consentSteps = [
  ["1", "Agent requests access", "Your app generates a consent URL for its registered agent."],
  ["2", "User chooses categories", "The user approves only the memory types they want to share."],
  ["3", "Agent retrieves context", "MemoryOS returns read-only shared context for that agent."],
  ["4", "User can revoke", "Access can be reviewed, narrowed, or revoked from the permission center."],
];

const categories = [
  "Skills and knowledge",
  "Preferences and settings",
  "Goals",
  "Facts about the user",
  "How the user does things",
  "People in the user's life",
];

const controls = [
  ["Verified agents", "MemoryOS can mark reviewed agents as verified so users know who is asking."],
  ["Category-level grants", "Users decide exactly which memory categories each agent can read."],
  ["Pending questions", "When memories conflict, users can resolve them instead of receiving bad context."],
  ["Revocation", "Users can remove access at any time from the permission center."],
];

export default function MemoryPassportPage() {
  const passportDocsUrl = docsUrl("/guides/cross-agent-sharing");

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#0D1117] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:78px_78px]" />
        <div className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-300/10 px-4 py-2 text-sm font-bold text-sky-100">
              <Network className="size-4" />
              Memory Passport
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Cross-agent memory with user consent at the center.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Memory Passport lets users share approved memory categories across
              AI products. Agents get better context. Users keep visibility,
              control, and revocation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={signUpUrl("/memory-passport")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-sky-300 px-6 text-sm font-black text-[#0D1117] shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-sky-200"
              >
                Register an agent
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={passportDocsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-white/35"
              >
                Read integration docs
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#151922] p-6 shadow-2xl shadow-black/40">
            <div className="rounded-2xl bg-white p-6 text-slate-950">
              <div className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#1D4ED8]">
                Permission center
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight">
                Review this app&apos;s request
              </h2>
              <p className="mt-3 text-slate-600">
                Study Buddy wants read-only access to selected memories.
              </p>
              <div className="mt-6 grid gap-3">
                {categories.slice(0, 4).map((category, index) => (
                  <div
                    key={category}
                    className="animate-store-memory flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 opacity-0"
                    style={{ animationDelay: `${index * 420}ms` }}
                  >
                    <span className="font-bold text-slate-800">{category}</span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                      Allowed
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-6 h-11 w-full rounded-xl bg-[#0D1117] text-sm font-black text-white">
                Grant access
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.28em] text-[#2E75B6]">
              Consent flow
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              A simple flow for shared memory that users can understand.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {consentSteps.map(([number, title, copy]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#0D1117] text-sm font-black text-white">
                  {number}
                </div>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.28em] text-[#2E75B6]">
              User controls
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Better context without hidden data sharing.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              The tenant creates an agent once. The user decides which categories
              that agent can read. This keeps integration simple without taking
              control away from the user.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {controls.map(([title, copy], index) => {
              const icons = [ShieldCheck, KeyRound, UserCheck, RotateCcw];
              const Icon = icons[index] ?? CheckCircle2;
              return (
                <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <Icon className="size-7 text-[#2E75B6]" />
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0D1117] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.28em] text-sky-300">
              Developer handoff
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              One consent URL connects your app to shared memory.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Your app sends users to MemoryOS consent. After approval, your
              agent can retrieve only the categories the user granted.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#05080D] shadow-xl shadow-black/30">
            <div className="border-b border-white/10 px-5 py-4 text-sm font-bold text-slate-300">
              Consent URL generation
            </div>
            <pre className="overflow-x-auto p-6 text-sm leading-7 text-slate-300">
              <code>{`from memoryos.universal import UniversalMemory

consent_url = UniversalMemory.consent_url(
    agent_id="your_global_agent_id",
    redirect_uri="https://yourapp.com/memoryos/callback",
    categories=["preferences", "goals", "skills"],
    state="your_user_session_id",
)`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-20 text-center sm:px-6 lg:px-8">
        <LockKeyhole className="mx-auto size-10 text-[#2E75B6]" />
        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
          Make shared memory feel safe, visible, and useful.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Register an agent from your workspace, generate a consent URL, and let
          users decide what your agent can remember.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={signUpUrl("/memory-passport")}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0D1117] px-6 text-sm font-black text-white transition hover:bg-[#1B2638]"
          >
            Create workspace
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-black text-slate-800 transition hover:border-slate-400"
          >
            View pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
