"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Code2, Database, Fingerprint, GitBranch, Play, RotateCcw, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { docsUrl } from "@/lib/docs";
import { signUpUrl } from "@/lib/urls";

type Flow = "single" | "conflict" | "passport";
type Tab = "output" | "prompt" | "code";

const flows = {
  single: { label: "Remember", note: "Extract durable context", icon: Database },
  conflict: { label: "Resolve", note: "Reconcile two sources", icon: GitBranch },
  passport: { label: "Consent", note: "Scope portable memory", icon: Fingerprint },
} as const;

const examples: Record<Flow, string> = {
  single: "I prefer short replies while debugging, but detailed steps when learning a new framework. I mostly code in Python.",
  conflict: "Billing says the customer is on Growth. A newer support note says Starter. Billing is authoritative for subscriptions.",
  passport: "Allow the Study Buddy agent to read preferences, facts, and goals. Keep relationships and procedures private.",
};

const outputs: Record<Flow, Array<[string, string, string]>> = {
  single: [["Preference", "Short replies for debugging", "8.2"], ["Preference", "Detailed learning steps", "7.6"], ["Fact", "Mostly codes in Python", "8.8"]],
  conflict: [["Active", "Growth plan", "authority 92"], ["Archived", "Starter support note", "preserved"], ["Rule", "Billing is source of truth", "applied"]],
  passport: [["Approved", "Preferences, facts, goals", "granted"], ["Restricted", "Relationships, procedures", "hidden"], ["Control", "Correct or revoke anytime", "user-owned"]],
};

function promptFor(flow: Flow) {
  if (flow === "conflict") return "Use the Growth plan as current truth. Preserve the Starter note as historical evidence. Cite Billing as the authoritative source.";
  if (flow === "passport") return "Share only approved categories with Study Buddy: preferences, facts, and goals. Relationships and procedures remain unavailable.";
  return "Adapt answer length to the task: concise for debugging, detailed for learning. Prefer Python examples.";
}

function codeFor(flow: Flow) {
  if (flow === "passport") return `const url = memory.passport.consentUrl({\n  agentId: \"study-buddy\",\n  categories: [\"preference\", \"fact\", \"goal\"]\n})`;
  if (flow === "conflict") return `await memory.add({ userId, message,\n  source: { service: \"billing\", authority: 92 }\n})\nconst context = await memory.get({ userId, query })`;
  return `await memory.add({ userId, messages })\n\nconst context = await memory.get({\n  userId, query: \"How should I respond?\"\n})`;
}

export function PublicMemoryPlayground() {
  const [flow, setFlow] = useState<Flow>("single");
  const [input, setInput] = useState(examples.single);
  const [tab, setTab] = useState<Tab>("output");
  const [ran, setRan] = useState(true);
  const [loading, setLoading] = useState(false);
  const result = useMemo(() => outputs[flow], [flow]);

  function choose(next: Flow) {
    setFlow(next); setInput(examples[next]); setTab("output"); setRan(false); setLoading(false);
  }

  function run() {
    setLoading(true); setRan(false);
    window.setTimeout(() => { setLoading(false); setRan(true); }, 850);
  }

  return (
    <section id="playground" className="relative overflow-hidden bg-[#05080d] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[70rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.13),transparent_62%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div><p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-300"><Sparkles className="size-4" /> Memory lab</p><h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.045em] sm:text-5xl">Test the memory decision, not a fake chatbot.</h2></div>
          <p className="max-w-lg text-sm leading-6 text-slate-400">Explore extraction, conflict handling, and consent in one compact console. It is simulated, so no account or API key is required.</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a1019] shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
          <div className="flex items-center border-b border-white/10 px-4 py-3 sm:px-5"><div className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-rose-400" /><span className="size-2.5 rounded-full bg-amber-300" /><span className="size-2.5 rounded-full bg-emerald-300" /><span className="ml-3 font-mono text-[11px] text-slate-500">memoryos://playground</span></div></div>

          <div className="grid lg:grid-cols-[220px_1fr]">
            <aside className="border-b border-white/10 p-3 lg:border-b-0 lg:border-r">
              <p className="px-2 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">Choose a decision</p>
              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {(Object.keys(flows) as Flow[]).map((key) => { const item = flows[key]; const Icon = item.icon; const active = flow === key; return <button key={key} type="button" onClick={() => choose(key)} className={`rounded-xl border p-3 text-left transition ${active ? "border-cyan-300/35 bg-cyan-300/10" : "border-transparent hover:bg-white/[0.04]"}`}><div className="flex items-center gap-3"><span className={`flex size-9 items-center justify-center rounded-lg ${active ? "bg-cyan-300 text-slate-950" : "bg-white/[0.06] text-slate-400"}`}><Icon className="size-4" /></span><span><span className="block text-sm font-black">{item.label}</span><span className="mt-0.5 block text-[10px] text-slate-500">{item.note}</span></span></div></button>; })}
              </div>
              <div className="mt-4 hidden rounded-xl border border-white/10 bg-black/20 p-3 text-[11px] leading-5 text-slate-500 lg:block"><ShieldCheck className="mb-2 size-4 text-emerald-300" />Tenant scoped<br />Provenance aware<br />Consent controlled</div>
            </aside>

            <div className="grid min-h-[470px] lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r sm:p-6">
                <div className="flex items-center justify-between"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">Input signal</p><h3 className="mt-2 text-xl font-black">{flows[flow].label} memory</h3></div><span className="font-mono text-[10px] text-slate-600">POST /v1/memory</span></div>
                <label className="mt-6 block text-xs font-bold text-slate-400">Describe the user context</label>
                <textarea value={input} onChange={(event) => { setInput(event.target.value); setRan(false); }} className="mt-3 h-36 w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-slate-200 outline-none transition focus:border-cyan-300/60" />
                <div className="mt-4 flex gap-2"><button type="button" onClick={run} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200"><Play className="size-4 fill-current" /> Run decision</button><button type="button" onClick={() => { setInput(examples[flow]); setRan(false); }} aria-label="Reset example" className="rounded-xl border border-white/10 px-4 text-slate-400 transition hover:text-white"><RotateCcw className="size-4" /></button></div>
                <p className="mt-4 text-[11px] leading-5 text-slate-600">This demo visualizes the decision path. Production requests use your workspace key and tenant boundary.</p>
              </div>

              <div className="flex min-w-0 flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">Memory response</p><p className="mt-2 text-sm font-bold text-slate-300">Relevant context, ready for the model</p></div><div className="flex rounded-lg border border-white/10 bg-black/25 p-1">{(["output", "prompt", "code"] as Tab[]).map((item) => <button key={item} type="button" onClick={() => setTab(item)} className={`rounded-md px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider transition ${tab === item ? "bg-white text-slate-950" : "text-slate-500 hover:text-white"}`}>{item}</button>)}</div></div>
                <div className="mt-5 flex flex-1 flex-col rounded-xl border border-white/10 bg-black/25 p-4">
                  {loading ? <div className="flex flex-1 flex-col items-center justify-center text-center"><span className="size-8 animate-spin rounded-full border-2 border-cyan-300/20 border-t-cyan-300" /><p className="mt-4 text-sm font-black">Evaluating sources and policy…</p></div> : !ran ? <div className="flex flex-1 flex-col items-center justify-center text-center text-slate-500"><Zap className="size-6" /><p className="mt-3 text-sm font-bold">Run the decision to generate context.</p></div> : tab === "output" ? <div className="space-y-2">{result.map(([label, value, score]) => <div key={`${flow}-${label}-${value}`} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.035] p-3"><span className="flex size-7 items-center justify-center rounded-md bg-emerald-300/10 text-emerald-300"><Check className="size-3.5" /></span><div><p className="text-[10px] font-black uppercase tracking-wider text-slate-500">{label}</p><p className="mt-1 text-xs font-bold text-slate-200">{value}</p></div><span className="font-mono text-[9px] text-cyan-300">{score}</span></div>)}</div> : <pre className="min-w-0 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-6 text-slate-300"><code>{tab === "prompt" ? promptFor(flow) : codeFor(flow)}</code></pre>}
                </div>
                <div className="mt-4 flex justify-end"><div className="flex gap-2"><a href={docsUrl("/quickstart")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white"><Code2 className="size-3.5" /> Docs</a><Link href={signUpUrl("/")} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-black text-slate-950">Start free <Zap className="size-3.5" /></Link></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
