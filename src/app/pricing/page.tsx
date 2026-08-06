"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, CircleHelp } from "lucide-react";
import { PlanCard, type BillingInterval, type BillingPlan, type Currency } from "@/components/plan-card";
import { SiteHeader } from "@/components/site-header";
import { docsUrl } from "@/lib/docs";
import { salesMailUrl, signUpUrl, tenantAppUrl } from "@/lib/urls";

const plans: BillingPlan[] = [
  {
    name: "free",
    display_name: "Free",
    badge: "Explore",
    monthly_price_inr: 0,
    annual_price_inr: 0,
    monthly_price_usd: 0,
    annual_price_usd: 0,
    is_popular: false,
    cta_text: "Start free",
    cta_type: "signup",
    limits: { monthly_call_limit: 5000, write_call_limit: 5000, read_limit: null, rate_limit_per_user_per_minute: 3, overage_policy: "block", overage_policy_label: "API pauses at the monthly limit" },
    features: { quality_gate: true, domain_schemas: true, cross_agent: true, conflict_resolution: true, multi_service_writers: true, audit_log_days: 0, support: "Community", reliability_note: "Best-effort access", data_residency: "IN1" },
  },
  {
    name: "starter",
    display_name: "Starter",
    badge: "For shipping",
    monthly_price_inr: 1800,
    annual_price_inr: 18000,
    monthly_price_usd: 22,
    annual_price_usd: 220,
    is_popular: true,
    cta_text: "Choose Starter",
    cta_type: "checkout",
    limits: { monthly_call_limit: 50000, write_call_limit: 50000, read_limit: null, rate_limit_per_user_per_minute: 10, overage_policy: "warn", overage_policy_label: "AI continues without memory context at the limit" },
    features: { quality_gate: true, domain_schemas: true, cross_agent: true, conflict_resolution: true, multi_service_writers: true, audit_log_days: 30, support: "Email - 48h", reliability_note: "Operational monitoring", data_residency: "IN1" },
  },
  {
    name: "growth",
    display_name: "Growth",
    badge: "For growing apps",
    monthly_price_inr: 6000,
    annual_price_inr: 60000,
    monthly_price_usd: 72,
    annual_price_usd: 720,
    is_popular: false,
    cta_text: "Choose Growth",
    cta_type: "checkout",
    limits: { monthly_call_limit: 500000, write_call_limit: 500000, read_limit: null, rate_limit_per_user_per_minute: 30, overage_policy: "warn", overage_policy_label: "AI continues without memory context at the limit" },
    features: { quality_gate: true, domain_schemas: true, cross_agent: true, conflict_resolution: true, multi_service_writers: true, audit_log_days: 90, support: "Email - 24h", reliability_note: "Priority incident review", data_residency: "IN1" },
  },
  {
    name: "scale",
    display_name: "Scale",
    badge: "Production scale",
    monthly_price_inr: 18000,
    annual_price_inr: 180000,
    monthly_price_usd: 216,
    annual_price_usd: 2160,
    is_popular: false,
    cta_text: "Choose Scale",
    cta_type: "checkout",
    limits: { monthly_call_limit: 1000000, write_call_limit: 1000000, read_limit: null, rate_limit_per_user_per_minute: 80, overage_policy: "warn", overage_policy_label: "AI continues without memory context at the limit" },
    features: { quality_gate: true, domain_schemas: true, cross_agent: true, conflict_resolution: true, multi_service_writers: true, audit_log_days: 180, support: "Priority email", reliability_note: "Capacity planning and launch review", data_residency: "IN1" },
  },
  {
    name: "enterprise",
    display_name: "Enterprise",
    badge: "Custom",
    monthly_price_inr: null,
    annual_price_inr: null,
    monthly_price_usd: null,
    annual_price_usd: null,
    is_popular: false,
    cta_text: "Talk to sales",
    cta_type: "sales",
    limits: { monthly_call_limit: null, write_call_limit: null, read_limit: null, rate_limit_per_user_per_minute: null, overage_policy: null, overage_policy_label: "Custom capacity and overage policy" },
    features: { quality_gate: true, domain_schemas: true, cross_agent: true, conflict_resolution: true, multi_service_writers: true, audit_log_days: 365, support: "Dedicated channel", reliability_note: "Custom reliability terms by agreement", data_residency: "Choose region" },
  },
];

const comparison = [
  ["API calls / month", "5K", "50K", "500K", "1M", "Custom"],
  ["Memory writes", "5K", "50K", "500K", "1M", "Custom"],
  ["Quality gate", true, true, true, true, true],
  ["Conflict resolution", true, true, true, true, true],
  ["Multi-service writers", true, true, true, true, true],
  ["Memory Passport", true, true, true, true, true],
  ["Domain schemas", true, true, true, true, true],
  ["Audit history", "None", "30 days", "90 days", "180 days", "365 days"],
  ["Rate limit", "3/min", "10/min", "30/min", "80/min", "Custom"],
  ["Data residency", "IN1", "IN1", "IN1", "IN1", "Choose region"],
  ["Support", "Community", "Email - 48h", "Email - 24h", "Priority email", "Dedicated channel"],
  ["Reliability", "Best effort", "Monitoring", "Incident review", "Launch review", "By agreement"],
] as const;

const faqs = [
  ["Do I need a credit card for Free?", "No. You can start on Free without a card and add billing only when you choose a paid plan."],
  ["Do Free users get the real product features?", "Yes. Free includes Memory Passport, domain schemas, conflict handling, multi-service writers, quality gates, and retrieval feedback with lower limits."],
  ["What counts as an API call?", "Each MemoryOS write, retrieval, tenant operation, or feedback request counts as one API call."],
  ["What happens at the monthly limit?", "Free pauses at the limit. Paid plans can keep the AI running without memory context until capacity is restored or upgraded."],
  ["Can I change billing intervals?", "Yes. You can move between monthly and annual billing. Annual billing includes two months free."],
  ["Which plan should I choose first?", "Start Free to test the full surface. Move to Starter when you ship, Growth when usage is consistent, and Scale before a larger launch."],
  ["What reliability commitment is included?", "Self-serve plans include operational monitoring and incident review according to plan level. Enterprise reliability terms can be defined in a written agreement."],
  ["Do you support enterprise contracts?", "Yes. Enterprise includes custom limits, procurement terms, regional options, and dedicated support."],
] as const;

function SegmentedControl<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: Array<{ value: T; label: string }>; onChange: (value: T) => void }) {
  return (
    <div>
      <span className="sr-only">{label}</span>
      <div role="group" aria-label={label} className="inline-flex rounded-xl border border-white/10 bg-white/[0.035] p-1">
        {options.map((option) => (
          <button key={option.value} type="button" aria-pressed={value === option.value} onClick={() => onChange(option.value)} className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${value === option.value ? "bg-white text-slate-950" : "text-slate-400 hover:text-white"}`}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ComparisonTable() {
  const names = ["Free", "Starter", "Growth", "Scale", "Enterprise"];
  return (
    <div>
      <p className="mb-3 text-xs text-slate-500 sm:hidden">Swipe horizontally to compare plans -&gt;</p>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <div className="min-w-[920px]">
          <div className="grid grid-cols-[1.35fr_repeat(5,1fr)] border-b border-white/10 bg-white/[0.035]">
            <div className="sticky left-0 bg-[#0d141f] px-4 py-4 text-xs font-semibold text-slate-400">Capability</div>
            {names.map((name) => <div key={name} className="px-3 py-4 text-center text-sm font-bold text-white">{name}</div>)}
          </div>
          {comparison.map((row, index) => (
            <div key={row[0]} className={`grid grid-cols-[1.35fr_repeat(5,1fr)] ${index % 2 === 0 ? "bg-white/[0.018]" : ""}`}>
              <div className="sticky left-0 bg-[#0a1019] px-4 py-3.5 text-sm font-medium text-slate-300">{row[0]}</div>
              {row.slice(1).map((value, cell) => (
                <div key={`${row[0]}-${cell}`} className="flex items-center justify-center px-3 py-3.5 text-center text-sm text-slate-400">
                  {typeof value === "boolean" ? value ? <Check className="size-4 text-emerald-300" aria-label="Included" /> : <span className="text-slate-700">-</span> : value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Questions, answered</p>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Pricing without surprises</h2>
      </div>
      <div className="mt-9 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.025]">
        {faqs.map(([question, answer], index) => {
          const expanded = open === index;
          const answerId = `pricing-answer-${index}`;
          return (
            <div key={question}>
              <button type="button" aria-expanded={expanded} aria-controls={answerId} onClick={() => setOpen(expanded ? null : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="text-sm font-semibold text-white">{question}</span>
                <ChevronDown className={`size-4 shrink-0 text-slate-500 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
              <div id={answerId} hidden={!expanded} className="px-5 pb-5 text-sm leading-6 text-slate-400">{answer}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingInterval>("monthly");
  const [currency, setCurrency] = useState<Currency>("inr");
  const quickstart = docsUrl("/quickstart");
  const docs = docsUrl("/");
  const privacy = docsUrl("/privacy");
  const terms = docsUrl("/terms");
  const refund = docsUrl("/refund-cancellation");
  const security = docsUrl("/security");
  const dpa = docsUrl("/dpa");
  const legalLinks = [
    { label: "Privacy", href: privacy },
    { label: "Terms", href: terms },
    { label: "Refunds", href: refund },
    { label: "Cookies", href: docsUrl("/cookie-policy") },
    { label: "Security", href: security },
    { label: "DPA", href: dpa },
    { label: "Support", href: docsUrl("/support-availability") },
    { label: "Contact", href: docsUrl("/contact") },
  ];

  return (
    <main className="min-h-screen bg-[#050506] text-white">
      <SiteHeader dark />
      <section className="relative overflow-hidden px-4 pb-14 pt-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_65%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-sm font-semibold text-cyan-200">
            <CircleHelp className="size-4" /> Simple pricing, full product access
          </div>
          <h1 className="mt-7 text-4xl font-bold text-white sm:text-5xl md:text-6xl">Try every MemoryOS feature. Pay when usage grows.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Memory Passport, conflict handling, provenance, domain schemas, and multi-service writers are available from Free. Plans scale by volume, retention, support, and operational review.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={signUpUrl("/")} className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">Start free <ArrowRight className="size-4" /></Link>
            <a href={salesMailUrl()} className="inline-flex h-12 items-center rounded-xl border border-white/15 px-6 text-sm font-semibold text-white transition hover:bg-white/[0.05]">Talk to sales</a>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[92rem]">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:flex-row">
            <div>
              <p className="text-sm font-semibold text-white">Compare capacity</p>
              <p className="mt-1 text-xs text-slate-400">Annual plans include two months free.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <SegmentedControl label="Billing interval" value={billing} onChange={setBilling} options={[{ value: "monthly", label: "Monthly" }, { value: "annual", label: "Annual" }]} />
              <SegmentedControl label="Currency" value={currency} onChange={setCurrency} options={[{ value: "inr", label: "INR" }, { value: "usd", label: "USD" }]} />
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {plans.map((plan) => <PlanCard key={plan.name} plan={plan} billing={billing} currency={currency} tenantAppUrl={tenantAppUrl()} />)}
          </div>
          <p className="mt-5 text-center text-xs leading-5 text-slate-400">API call limits include writes, retrievals, tenant operations, and feedback requests. Taxes may apply based on billing location.</p>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#09090b] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Side-by-side</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Same feature surface, more room as you grow</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">Free is for proof. Paid plans increase production capacity and operational visibility.</p>
          </div>
          <div className="mt-9"><ComparisonTable /></div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] bg-[#050506] px-4 py-20 sm:px-6 lg:px-8"><PricingFaq /></section>

      <section className="px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Build your first memory flow today</h2>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-7 text-slate-400">Start free, validate the product experience, and upgrade when real usage arrives.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={signUpUrl("/")} className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-slate-950">Start free <ArrowRight className="size-4" /></Link>
            <a href={quickstart} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 px-6 text-sm font-semibold text-white">Read the quickstart <ArrowRight className="size-4" /></a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
          <span className="text-sm font-semibold text-slate-400">MemoryOS</span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500"><Link href="/">Home</Link><Link href="/memory-passport">Passport</Link><a href={quickstart} target="_blank" rel="noreferrer">Docs</a>{legalLinks.map((link) => (<a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>))}</div>
          <span className="text-xs text-slate-600">Copyright {new Date().getFullYear()} MemoryOS</span>
        </div>
      </footer>
    </main>
  );
}
