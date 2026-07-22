"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, CircleHelp, Fingerprint, ShieldCheck, Tags } from "lucide-react";
import { PlanCard, type BillingInterval, type BillingPlan, type Currency } from "@/components/plan-card";
import { SiteHeader } from "@/components/site-header";
import { docsUrl } from "@/lib/docs";
import { salesMailUrl, signUpUrl, tenantAppUrl } from "@/lib/urls";

const plans: BillingPlan[] = [
  {
    name: "free", display_name: "Free", badge: "For experiments", monthly_price_inr: 0, annual_price_inr: 0, monthly_price_usd: 0, annual_price_usd: 0, is_popular: false, cta_text: "Start free", cta_type: "signup",
    limits: { monthly_call_limit: 5000, write_call_limit: 5000, read_limit: null, rate_limit_per_user_per_minute: 3, overage_policy: "block", overage_policy_label: "API pauses at the monthly limit" },
    features: { quality_gate: true, domain_schemas: false, cross_agent: false, audit_log_days: 0, support: "Community", sla: "Best effort", data_residency: "IN1" },
  },
  {
    name: "starter", display_name: "Starter", badge: "For shipping", monthly_price_inr: 999, annual_price_inr: 9990, monthly_price_usd: 12, annual_price_usd: 120, is_popular: true, cta_text: "Choose Starter", cta_type: "checkout",
    limits: { monthly_call_limit: 50000, write_call_limit: 50000, read_limit: null, rate_limit_per_user_per_minute: 10, overage_policy: "warn", overage_policy_label: "AI continues without memory at the limit" },
    features: { quality_gate: true, domain_schemas: false, cross_agent: false, audit_log_days: 30, support: "Email · 48h", sla: "99.5%", data_residency: "IN1" },
  },
  {
    name: "growth", display_name: "Growth", badge: "For scaling", monthly_price_inr: 3999, annual_price_inr: 39990, monthly_price_usd: 48, annual_price_usd: 480, is_popular: false, cta_text: "Choose Growth", cta_type: "checkout",
    limits: { monthly_call_limit: 500000, write_call_limit: 500000, read_limit: null, rate_limit_per_user_per_minute: 30, overage_policy: "warn", overage_policy_label: "AI continues without memory at the limit" },
    features: { quality_gate: true, domain_schemas: true, cross_agent: true, audit_log_days: 90, support: "Email · 24h", sla: "99.9%", data_residency: "IN1" },
  },
  {
    name: "enterprise", display_name: "Enterprise", badge: "For custom needs", monthly_price_inr: null, annual_price_inr: null, monthly_price_usd: null, annual_price_usd: null, is_popular: false, cta_text: "Talk to sales", cta_type: "sales",
    limits: { monthly_call_limit: null, write_call_limit: null, read_limit: null, rate_limit_per_user_per_minute: null, overage_policy: null, overage_policy_label: "Custom capacity and overage policy" },
    features: { quality_gate: true, domain_schemas: true, cross_agent: true, audit_log_days: 365, support: "Dedicated Slack", sla: "99.99%", data_residency: "Choose region" },
  },
];

const comparison = [
  ["API calls / month", "5K", "50K", "500K", "Unlimited"],
  ["Quality gate", true, true, true, true],
  ["Conflict resolution", true, true, true, true],
  ["Version history", true, true, true, true],
  ["Domain schemas", false, false, true, true],
  ["Memory Passport", false, false, true, true],
  ["Audit history", "—", "30 days", "90 days", "365 days"],
  ["Rate limit", "3/min", "10/min", "30/min", "Custom"],
  ["Data residency", "IN1", "IN1", "IN1", "Choose region"],
  ["Support", "Community", "Email · 48h", "Email · 24h", "Dedicated Slack"],
  ["Uptime SLA", "Best effort", "99.5%", "99.9%", "99.99%"],
] as const;

const addons = [
  { icon: Fingerprint, title: "Global agent registration", price: "₹999 / month", description: "Register your agent and let users grant category-scoped memory access.", features: ["Agent API key", "Public agent profile", "Consent URL generation"] },
  { icon: ShieldCheck, title: "Verified agent badge", price: "₹4,999 once", description: "Add verified company status to your public consent experience.", features: ["Company review", "Verified badge", "Higher user trust"] },
  { icon: Tags, title: "White-label consent", price: "₹9,999 / month", description: "Host the consent journey on your own domain and brand.", features: ["Custom domain", "Brand controls", "Priority support"] },
];

const faqs = [
  ["Do I need a credit card for Free?", "No. You can start on Free without a card and add billing only when you choose a paid plan."],
  ["What counts as an API call?", "Each MemoryOS write, retrieval, tenant operation, or feedback request counts as one API call."],
  ["What happens at the monthly limit?", "Free pauses at the limit. Paid plans can keep the AI running without memory context until capacity is restored or upgraded."],
  ["Can I change billing intervals?", "Yes. You can move between monthly and annual billing. Annual billing includes two months free."],
  ["Which plans include Memory Passport?", "Growth and Enterprise include cross-agent, category-scoped memory access through Memory Passport."],
  ["What are domain schemas?", "Domain schemas add structured extraction for products such as EdTech and customer support on top of general memory."],
  ["Can I cancel anytime?", "Yes. Your paid plan remains active until the end of its current billing period."],
  ["Do you support enterprise contracts?", "Yes. Enterprise includes custom limits, procurement terms, regional options, and dedicated support."],
] as const;

function SegmentedControl<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: Array<{ value: T; label: string }>; onChange: (value: T) => void }) {
  return <div><span className="sr-only">{label}</span><div role="group" aria-label={label} className="inline-flex rounded-xl border border-white/10 bg-white/[0.035] p-1">{options.map((option) => <button key={option.value} type="button" aria-pressed={value === option.value} onClick={() => onChange(option.value)} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${value === option.value ? "bg-white text-slate-950" : "text-slate-400 hover:text-white"}`}>{option.label}</button>)}</div></div>;
}

function ComparisonTable() {
  const names = ["Free", "Starter", "Growth", "Enterprise"];
  return <div><p className="mb-3 text-xs text-slate-500 sm:hidden">Swipe horizontally to compare plans →</p><div className="overflow-x-auto rounded-2xl border border-white/10"><div className="min-w-[760px]"><div className="grid grid-cols-[1.35fr_repeat(4,1fr)] border-b border-white/10 bg-white/[0.035]"><div className="sticky left-0 bg-[#0d141f] px-4 py-4 text-xs font-semibold text-slate-400">Capability</div>{names.map((name) => <div key={name} className="px-3 py-4 text-center text-sm font-bold text-white">{name}</div>)}</div>{comparison.map((row, index) => <div key={row[0]} className={`grid grid-cols-[1.35fr_repeat(4,1fr)] ${index % 2 === 0 ? "bg-white/[0.018]" : ""}`}><div className="sticky left-0 bg-[#0a1019] px-4 py-3.5 text-sm font-medium text-slate-300">{row[0]}</div>{row.slice(1).map((value, cell) => <div key={`${row[0]}-${cell}`} className="flex items-center justify-center px-3 py-3.5 text-center text-sm text-slate-400">{typeof value === "boolean" ? value ? <Check className="size-4 text-emerald-300" aria-label="Included" /> : <span className="text-slate-700">—</span> : value}</div>)}</div>)}</div></div></div>;
}

function PricingFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="mx-auto max-w-3xl"><div className="text-center"><p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Questions, answered</p><h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Pricing without surprises</h2></div><div className="mt-9 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.025]">{faqs.map(([question, answer], index) => { const expanded = open === index; const answerId = `pricing-answer-${index}`; return <div key={question}><button type="button" aria-expanded={expanded} aria-controls={answerId} onClick={() => setOpen(expanded ? null : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"><span className="text-sm font-semibold text-white">{question}</span><ChevronDown className={`size-4 shrink-0 text-slate-500 transition-transform ${expanded ? "rotate-180" : ""}`} /></button><div id={answerId} hidden={!expanded} className="px-5 pb-5 text-sm leading-6 text-slate-400">{answer}</div></div>; })}</div></div>;
}

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingInterval>("monthly");
  const [currency, setCurrency] = useState<Currency>("inr");
  const quickstart = docsUrl("/quickstart");

  return <main className="min-h-screen bg-[#05080d] text-white"><SiteHeader dark />
    <section className="relative overflow-hidden px-4 pb-14 pt-16 sm:px-6 lg:px-8"><div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_65%)]" /><div className="relative mx-auto max-w-4xl text-center"><div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-sm font-semibold text-cyan-200"><CircleHelp className="size-4" /> Simple, transparent pricing</div><h1 className="mt-7 text-4xl font-bold text-white sm:text-5xl md:text-6xl">Start small. Scale memory when your product does.</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">Every plan includes reliable memory extraction and retrieval. Upgrade when you need more volume, domain intelligence, or user-controlled memory sharing.</p><div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><Link href={signUpUrl("/")} className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">Start free <ArrowRight className="size-4" /></Link><a href={salesMailUrl()} className="inline-flex h-12 items-center rounded-xl border border-white/15 px-6 text-sm font-semibold text-white transition hover:bg-white/[0.05]">Talk to sales</a></div></div></section>

    <section className="px-4 pb-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:flex-row"><div><p className="text-sm font-semibold text-white">Choose how you want to compare</p><p className="mt-1 text-xs text-slate-400">Annual plans include two months free.</p></div><div className="flex flex-wrap justify-center gap-3"><SegmentedControl label="Billing interval" value={billing} onChange={setBilling} options={[{ value: "monthly", label: "Monthly" }, { value: "annual", label: "Annual" }]} /><SegmentedControl label="Currency" value={currency} onChange={setCurrency} options={[{ value: "inr", label: "INR" }, { value: "usd", label: "USD" }]} /></div></div><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{plans.map((plan) => <PlanCard key={plan.name} plan={plan} billing={billing} currency={currency} tenantAppUrl={tenantAppUrl()} />)}</div><p className="mt-5 text-center text-xs leading-5 text-slate-400">API call limits include writes, retrievals, tenant operations, and feedback requests. Taxes may apply based on billing location.</p></div></section>

    <section className="border-y border-white/[0.07] bg-[#080d14] px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Side-by-side</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Compare the details</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">The same memory foundation at every level, with more capacity and governance as you grow.</p></div><div className="mt-9"><ComparisonTable /></div></div></section>

    <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-wider text-violet-300">Optional network services</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Add user-controlled memory sharing</h2><p className="mt-3 leading-7 text-slate-400">Register an agent, earn user trust, and create a consent experience that matches your product.</p></div><div className="mt-9 grid gap-5 md:grid-cols-3">{addons.map((addon) => <article key={addon.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"><span className="flex size-10 items-center justify-center rounded-xl bg-violet-300/10 text-violet-200"><addon.icon className="size-5" /></span><h3 className="mt-5 text-lg font-bold">{addon.title}</h3><p className="mt-1 text-lg font-semibold text-violet-200">{addon.price}</p><p className="mt-3 text-sm leading-6 text-slate-400">{addon.description}</p><ul className="mt-5 space-y-2">{addon.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm text-slate-300"><Check className="size-4 text-emerald-300" />{feature}</li>)}</ul></article>)}</div></div></section>

    <section className="border-y border-white/[0.07] bg-[#080d14] px-4 py-20 sm:px-6 lg:px-8"><PricingFaq /></section>

    <section className="px-4 py-20 text-center sm:px-6 lg:px-8"><div className="mx-auto max-w-2xl"><h2 className="text-3xl font-bold sm:text-4xl">Build your first memory flow today</h2><p className="mx-auto mt-4 max-w-lg text-lg leading-7 text-slate-400">Start free, validate the product experience, and upgrade when real usage arrives.</p><div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><Link href={signUpUrl("/")} className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-950">Start free <ArrowRight className="size-4" /></Link><a href={quickstart} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 px-6 text-sm font-semibold text-white">Read the quickstart <ArrowRight className="size-4" /></a></div></div></section>

    <footer className="border-t border-white/[0.07] px-4 py-10 sm:px-6"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row"><span className="text-sm font-semibold text-slate-400">MemoryOS</span><div className="flex items-center gap-6 text-sm text-slate-500"><Link href="/">Home</Link><Link href="/memory-passport">Passport</Link><a href={quickstart} target="_blank" rel="noreferrer">Docs</a></div><span className="text-xs text-slate-600">© {new Date().getFullYear()} MemoryOS</span></div></footer>
  </main>;
}
