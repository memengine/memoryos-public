"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, CircleDot, Globe2, KeyRound, Pause, Play, ShieldCheck, Sparkles, UsersRound, Waypoints } from "lucide-react";

const chapters = [
  { title: "Workspace + key", short: "Setup", start: 0, icon: KeyRound },
  { title: "Select domain", short: "Domain", start: 3, icon: Globe2 },
  { title: "Multi-service", short: "Writers", start: 5, icon: UsersRound },
  { title: "Resolve conflict", short: "Conflicts", start: 9, icon: Waypoints },
  { title: "Memory Passport", short: "Consent", start: 11, icon: ShieldCheck },
] as const;

const frames = [
  { title: "Your workspace is ready", note: "One control surface for memory, users, quality, and usage.", image: "/product-tour/01-workspace.png" },
  { title: "Open API Keys", note: "Create backend access before connecting production services.", image: "/product-tour/02-api-keys.png" },
  { title: "Create a scoped production key", note: "Production backend · read and write only.", image: "/product-tour/02-api-keys.png", kind: "api-modal" },
  { title: "Choose the memory engine", note: "The domain switch lives at the top of Overview.", image: "/product-tour/01-workspace.png", kind: "domain-pointer" },
  { title: "Select the product domain", note: "General, EdTech, or Customer Support—change it later in Settings.", image: "/product-tour/domain-selection.png" },
  { title: "Open Memory provenance", note: "Every backend agent gets its own service-writer identity.", image: "/product-tour/service-writers.png" },
  { title: "Register the billing writer", note: "Billing Agent receives authority 90 and a dedicated API key.", image: "/product-tour/service-writers.png", kind: "writer-90" },
  { title: "Register the support writer", note: "Support Copilot receives authority 50 and a separate API key.", image: "/product-tour/service-writers.png", kind: "writer-50" },
  { title: "Two services, two trusted identities", note: "Every memory now carries writer, credential, and authority provenance.", image: "/product-tour/service-writers.png", kind: "writer-list" },
  { title: "The writers disagree", note: "Billing says the plan is Pro; Support says it is Starter.", kind: "conflict" },
  { title: "MemoryOS resolves the disagreement", note: "Authority, confidence, recency, and scope determine the trusted claim.", image: "/product-tour/conflict-intelligence-hd.png" },
  { title: "Create a Passport agent", note: "Use a recognizable identity and request only relevant memory categories.", image: "/product-tour/04-passport-agent.png", kind: "passport-create" },
  { title: "Choose the verified agent", note: "The consent experience previews exactly what the user will recognize.", image: "/product-tour/05-choose-agent.png" },
  { title: "Generate and open the consent link", note: "The link asks for categories; it never grants access by itself.", image: "/product-tour/05-choose-agent.png", kind: "consent-link" },
  { title: "The user confirms identity", note: "Passport authentication happens before memory is exposed.", image: "/product-tour/06-confirm-identity.png" },
  { title: "The user approves category access", note: "Preferences, Facts, and Goals are allowed; everything else remains private.", image: "/product-tour/07-review-access.png" },
] as const;

function cn(...values: Array<string | false | undefined>) { return values.filter(Boolean).join(" "); }

function WriterModal({ authority, name, service, apiKey }: { authority: number; name: string; service: string; apiKey: string }) {
  return <div className="absolute inset-0 flex items-center justify-center bg-slate-950/25 p-4"><div className="w-[70%] max-w-xl rounded-2xl border border-slate-200 bg-white p-4 text-slate-950 shadow-2xl sm:p-5"><div className="flex items-start justify-between"><div><p className="text-sm font-bold">Register service writer</p><p className="mt-1 text-[10px] text-slate-500">Bind one production service to one dedicated credential.</p></div><span className="text-slate-400">×</span></div><div className="mt-4 grid grid-cols-2 gap-3"><Field label="Service key" value={service} active /><Field label="Display name" value={name} /><Field label="Bound API key" value={apiKey} /><Field label="Default authority" value={String(authority)} active /></div><div className="mt-3 rounded-xl bg-slate-50 p-3"><p className="text-[9px] font-bold text-slate-600">Category authority</p><div className="mt-2 grid grid-cols-3 gap-2">{["Fact", "Preference", "Goal", "Procedure", "Relationship", "Expertise"].map((category) => <Field key={category} label={category} value={String(authority)} />)}</div></div><div className="mt-4 flex justify-end"><span className="rounded-lg bg-slate-950 px-4 py-2 text-[10px] font-bold text-white">Register writer</span></div></div><Cursor label="Click" className="bottom-[11%] right-[18%]" /></div>;
}

function Field({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return <label className="text-[8px] font-semibold text-slate-500">{label}<span className={cn("mt-1 block truncate rounded-lg border px-2.5 py-1.5 text-[9px] text-slate-800", active ? "border-cyan-400 bg-cyan-50 font-bold" : "border-slate-200 bg-white")}>{value}</span></label>;
}

function Cursor({ label, className }: { label: string; className: string }) {
  return <span className={cn("absolute z-20 flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[9px] font-bold text-white shadow-xl ring-4 ring-white/20", className)}><CircleDot className="size-3" />{label}</span>;
}

function WriterList() {
  const rows = [
    ["billing-service", "Billing Agent", "mos_live_bill…91A", "90", "Active"],
    ["support-copilot", "Support Copilot", "mos_live_supp…42K", "50", "Active"],
  ];
  return <div className="absolute inset-x-[8%] bottom-[8%] rounded-2xl border border-white/15 bg-[#0a1322]/95 p-4 text-white shadow-2xl backdrop-blur"><div className="flex items-center justify-between"><div><p className="text-[9px] uppercase tracking-wider text-cyan-300">Service writers</p><p className="text-sm font-bold">Production identities registered</p></div><span className="rounded-full bg-emerald-300/15 px-2.5 py-1 text-[9px] font-bold text-emerald-300">2 active</span></div><div className="mt-3 overflow-hidden rounded-xl border border-white/10">{rows.map((row) => <div key={row[0]} className="grid grid-cols-[1.2fr_1fr_1.2fr_0.5fr_0.6fr] gap-2 border-b border-white/10 bg-white/[0.05] px-3 py-2.5 text-[9px] last:border-0"><span className="font-bold">{row[0]}</span><span className="text-slate-300">{row[1]}</span><code className="text-cyan-200">{row[2]}</code><span>{row[3]}</span><span className="text-emerald-300">{row[4]}</span></div>)}</div></div>;
}

function ConflictMoment() {
  return <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_30%,#243a64,#09111f_65%)] p-6 text-white"><div className="w-full max-w-3xl"><p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">Conflict intelligence · live decision</p><h3 className="mt-2 text-center text-2xl font-bold">Two writers disagree about the same user</h3><div className="mt-6 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]"><Claim name="Billing Agent" authority="90" claim="Account plan is Pro" color="emerald" /><div className="flex size-10 items-center justify-center justify-self-center rounded-full border border-rose-300/30 bg-rose-300/10 text-xs font-black text-rose-200">VS</div><Claim name="Support Copilot" authority="50" claim="Account plan is Starter" color="violet" /></div><div className="mx-auto mt-5 flex max-w-lg items-center gap-3 rounded-xl border border-emerald-300/25 bg-emerald-300/10 p-3"><Check className="size-5 shrink-0 text-emerald-300" /><div><p className="text-xs font-bold text-emerald-200">Resolved automatically: Pro</p><p className="text-[9px] leading-4 text-slate-300">Billing Agent wins on category authority and direct billing evidence.</p></div></div></div></div>;
}

function Claim({ name, authority, claim, color }: { name: string; authority: string; claim: string; color: "emerald" | "violet" }) {
  return <div className={cn("rounded-2xl border bg-white/[0.06] p-4", color === "emerald" ? "border-emerald-300/40" : "border-violet-300/40")}><div className="flex items-center justify-between"><p className="text-xs font-bold">{name}</p><span className={cn("rounded-full px-2 py-1 text-[9px] font-bold", color === "emerald" ? "bg-emerald-300/15 text-emerald-200" : "bg-violet-300/15 text-violet-200")}>Authority {authority}</span></div><p className="mt-4 rounded-xl bg-black/25 p-3 text-sm font-semibold">“{claim}”</p><p className="mt-2 text-[9px] text-slate-400">user_1842 · Fact · account.plan</p></div>;
}

function ConsentLink() {
  return <div className="absolute inset-0 flex items-center justify-center bg-slate-950/35 p-5"><div className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#08111d] p-5 text-white shadow-2xl"><div className="flex justify-between"><p className="text-sm font-bold">Consent URL generated</p><span className="rounded-full bg-emerald-300/10 px-2.5 py-1 text-[9px] font-bold text-emerald-300">Ready</span></div><code className="mt-4 block overflow-hidden text-ellipsis whitespace-nowrap rounded-xl bg-black/35 p-4 text-[10px] text-cyan-200">https://app.memoryo.dev/consent?agent_id=nova-assistant&amp;categories=preferences,facts,goals</code><div className="mt-4 flex gap-2"><span className="rounded-lg bg-cyan-300 px-3 py-2 text-[10px] font-bold text-slate-950">Open consent page</span><span className="rounded-lg border border-white/10 px-3 py-2 text-[10px] text-slate-300">Copy link</span></div></div><Cursor label="Open" className="bottom-[22%] left-[34%]" /></div>;
}

function VideoScene({ frame }: { frame: number }) {
  const item = frames[frame];
  const kind = "kind" in item ? item.kind : undefined;
  return <div className="relative aspect-[1.95/1] overflow-hidden bg-[#eef3f8]">{"image" in item ? <img key={item.image} src={item.image} alt={item.title} className="absolute inset-0 size-full object-cover object-top" /> : null}{kind === "api-modal" ? <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 p-6"><img src="/product-tour/03-api-key-modal.png" alt="Create API key dialog" className="w-[42%] min-w-56 rounded-xl shadow-2xl ring-1 ring-slate-950/15" /><Cursor label="Create key" className="bottom-[18%] left-[48%]" /></div> : null}{kind === "domain-pointer" ? <><div className="absolute left-[42%] top-[5%] h-[12%] w-[25%] rounded-xl border-2 border-cyan-400 bg-cyan-300/10 shadow-[0_0_0_8px_rgba(34,211,238,0.12)]" /><Cursor label="Select domain" className="left-[49%] top-[13%]" /></> : null}{kind === "writer-90" ? <WriterModal authority={90} name="Billing Agent" service="billing-service" apiKey="billing-prod · mos_live_bill…91A" /> : null}{kind === "writer-50" ? <WriterModal authority={50} name="Support Copilot" service="support-copilot" apiKey="support-prod · mos_live_supp…42K" /> : null}{kind === "writer-list" ? <WriterList /> : null}{kind === "conflict" ? <ConflictMoment /> : null}{kind === "passport-create" ? <><div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyan-300/10" /><div className="absolute bottom-[12%] left-[24%] flex gap-1.5">{["Preferences", "Facts", "Goals"].map((label) => <span key={label} className="rounded-full bg-cyan-500 px-2 py-1 text-[8px] font-bold text-white shadow">✓ {label}</span>)}</div><Cursor label="Create agent" className="bottom-[7%] left-[17%]" /></> : null}{kind === "consent-link" ? <ConsentLink /> : null}<div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[#07101d] via-[#07101d]/90 to-transparent px-5 pb-4 pt-12 text-white"><p className="text-sm font-bold sm:text-base">{item.title}</p><p className="mt-0.5 text-[10px] text-slate-300 sm:text-[11px]">{item.note}</p></div></div>;
}

export function ProductFlowWalkthrough() {
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const chapter = useMemo(() => chapters.reduce((current, item, index) => frame >= item.start ? index : current, 0), [frame]);
  useEffect(() => { if (paused) return; const timer = window.setInterval(() => setFrame((current) => (current + 1) % frames.length), 3400); return () => window.clearInterval(timer); }, [paused]);
  const move = (amount: number) => { setFrame((current) => (current + amount + frames.length) % frames.length); setPaused(true); };
  const selectChapter = (start: number) => { setFrame(start); setPaused(true); };

  return <section id="product-flow" className="bg-[#070b14] bg-[radial-gradient(circle_at_90%_75%,rgba(34,211,238,0.08),transparent_30%)] px-4 py-8 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#08111d] shadow-[0_28px_90px_rgba(0,0,0,0.42)] ring-1 ring-cyan-300/10"><div className="flex items-center justify-between border-b border-white/10 px-4 py-2"><div className="flex items-center gap-2"><span className="size-2 rounded-full bg-rose-400" /><span className="size-2 rounded-full bg-amber-300" /><span className="size-2 rounded-full bg-emerald-300" /><span className="ml-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">MemoryOS product tour</span></div><div className="flex items-center gap-2"><span className="font-mono text-[9px] text-slate-500">{String(frame + 1).padStart(2, "0")} / {frames.length}</span><button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play walkthrough" : "Pause walkthrough"} className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-slate-300 hover:text-white">{paused ? <Play className="size-3 fill-current" /> : <Pause className="size-3" />}</button></div></div><VideoScene frame={frame} /><div className="h-1 bg-white/5"><div className="h-full bg-gradient-to-r from-slate-500 to-cyan-300 transition-all duration-500" style={{ width: `${((frame + 1) / frames.length) * 100}%` }} /></div></div><div className="mt-3 grid grid-cols-5 gap-2">{chapters.map((item, index) => { const Icon = item.icon; const active = chapter === index; return <button key={item.title} type="button" onClick={() => selectChapter(item.start)} className={cn("rounded-xl border px-2 py-2 text-left transition", active ? "border-cyan-300/40 bg-white/[0.08] text-white" : "border-white/10 bg-white/[0.035] text-slate-500 hover:text-slate-300")}><div className="flex items-center gap-1.5"><Icon className={cn("size-3.5", active && "text-cyan-300")} /><span className="hidden text-[8px] font-bold uppercase tracking-wider sm:inline">0{index + 1}</span></div><p className="mt-1 truncate text-[9px] font-bold sm:text-[10px]">{item.short}</p></button>; })}</div></div></section>;
}
