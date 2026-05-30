import Link from "next/link";
import { ArrowRight, Database, Network, ShieldCheck } from "lucide-react";

import { BillingToggle } from "@/components/billing-toggle";
import { ComparisonTable } from "@/components/comparison-table";
import { CrossAgentAddons } from "@/components/cross-agent-addons";
import { PricingFaq } from "@/components/pricing-faq";
import type { BillingPlan } from "@/components/plan-card";
import { docsUrl } from "@/lib/docs";
import { apiBaseUrl, salesMailUrl, signUpUrl, tenantAppUrl as getTenantAppUrl } from "@/lib/urls";

export const dynamic = "force-dynamic";

const FALLBACK_PLANS: BillingPlan[] = [
  {
    name: "free",
    display_name: "Free",
    badge: "Always Free",
    monthly_price_inr: 0,
    annual_price_inr: 0,
    monthly_price_usd: 0,
    annual_price_usd: 0,
    is_popular: false,
    cta_text: "Start for free",
    cta_type: "signup",
    limits: {
      monthly_call_limit: 5000,
      write_call_limit: 5000,
      read_limit: null,
      rate_limit_per_user_per_minute: 3,
      overage_policy: "block",
      overage_policy_label: "API pauses when limit reached",
    },
    features: {
      quality_gate: true,
      domain_schemas: false,
      cross_agent: false,
      audit_log_days: 0,
      support: "Community",
      sla: "Best effort",
      data_residency: "IN1 only",
    },
  },
  {
    name: "starter",
    display_name: "Starter",
    badge: "Most Popular",
    monthly_price_inr: 999,
    annual_price_inr: 9990,
    monthly_price_usd: 12,
    annual_price_usd: 120,
    is_popular: true,
    cta_text: "Upgrade to Starter",
    cta_type: "checkout",
    limits: {
      monthly_call_limit: 50000,
      write_call_limit: 50000,
      read_limit: null,
      rate_limit_per_user_per_minute: 10,
      overage_policy: "warn",
      overage_policy_label: "AI continues without memory context",
    },
    features: {
      quality_gate: true,
      domain_schemas: false,
      cross_agent: false,
      audit_log_days: 30,
      support: "Email (48h SLA)",
      sla: "99.5%",
      data_residency: "IN1 only",
    },
  },
  {
    name: "growth",
    display_name: "Growth",
    badge: "Scale Up",
    monthly_price_inr: 3999,
    annual_price_inr: 39990,
    monthly_price_usd: 48,
    annual_price_usd: 480,
    is_popular: false,
    cta_text: "Upgrade to Growth",
    cta_type: "checkout",
    limits: {
      monthly_call_limit: 500000,
      write_call_limit: 500000,
      read_limit: null,
      rate_limit_per_user_per_minute: 30,
      overage_policy: "warn",
      overage_policy_label: "AI continues without memory context",
    },
    features: {
      quality_gate: true,
      domain_schemas: true,
      cross_agent: true,
      audit_log_days: 90,
      support: "Email (24h SLA)",
      sla: "99.9%",
      data_residency: "IN1 only",
    },
  },
  {
    name: "enterprise",
    display_name: "Enterprise",
    badge: "Unlimited",
    monthly_price_inr: null,
    annual_price_inr: null,
    monthly_price_usd: null,
    annual_price_usd: null,
    is_popular: false,
    cta_text: "Talk to Sales",
    cta_type: "sales",
    limits: {
      monthly_call_limit: null,
      write_call_limit: null,
      read_limit: null,
      rate_limit_per_user_per_minute: null,
      overage_policy: null,
      overage_policy_label: null,
    },
    features: {
      quality_gate: true,
      domain_schemas: true,
      cross_agent: true,
      audit_log_days: 365,
      support: "Dedicated Slack",
      sla: "99.99%",
      data_residency: "Choose region",
    },
  },
];

async function getPlans(): Promise<BillingPlan[]> {
  const apiBase = apiBaseUrl();
  if (!apiBase) {
    return FALLBACK_PLANS;
  }

  try {
    const response = await fetch(`${apiBase}/v1/billing/plans`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return FALLBACK_PLANS;
    }
    const payload = (await response.json()) as unknown;
    return Array.isArray(payload) ? (payload as BillingPlan[]) : FALLBACK_PLANS;
  } catch {
    return FALLBACK_PLANS;
  }
}

export default async function PricingPage() {
  const plans = await getPlans();
  const tenantAppUrl = getTenantAppUrl();
  const quickstartDocsUrl = docsUrl("/quickstart");

  return (
    <main className="min-h-screen bg-[#0D1117]">
      <section className="relative overflow-hidden bg-[#0D1117] px-4 pb-16 pt-8 text-white sm:px-6 sm:pb-20 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/pricing" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#0D1117]">
              M
            </span>
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-slate-200">
              MemoryOS
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={quickstartDocsUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm font-semibold text-slate-300 transition hover:text-white sm:inline"
            >
              Docs
            </a>
            <Link
              href={signUpUrl("/")}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-[#0D1117] transition hover:bg-slate-200"
            >
              Start free
            </Link>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl items-center gap-10 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:pt-24">
          <div className="text-center lg:text-left">
            <div className="inline-flex rounded-full border border-[#2E75B6]/50 bg-[#0B1D32]/70 px-4 py-1.5 text-sm font-medium text-sky-100">
              Simple, transparent pricing
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="block text-white">The Memory Layer for AI</span>
              <span className="block text-slate-400">Pay only for what you use</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg lg:mx-0">
              Add persistent memory to your AI product in 5 minutes. Free tier
              included. No credit card required.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href={signUpUrl("/")}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#2E75B6] px-6 text-sm font-semibold text-white transition hover:bg-[#25639b]"
              >
                Start for free
              </Link>
              <a
                href={salesMailUrl()}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#30363D] bg-transparent px-6 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
              >
                Talk to Sales
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-5 shadow-2xl shadow-black/30">
            <div className="grid gap-3">
              {[
                {
                  icon: Database,
                  title: "Memory Write Path",
                  meta: "quality gate + async extraction",
                },
                {
                  icon: ShieldCheck,
                  title: "Domain Schemas",
                  meta: "General, EdTech, Support",
                },
                {
                  icon: Network,
                  title: "Memory Passport",
                  meta: "user-approved cross-agent context",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-[#30363D] bg-[#0D1117] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-sky-300" />
                      <div>
                        <div className="font-semibold text-white">{item.title}</div>
                        <div className="text-sm text-slate-400">{item.meta}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 rounded-xl border border-[#2E75B6]/40 bg-[#0B1D32] p-4 text-sm leading-6 text-slate-300">
              MemoryOS stores durable user context, retrieves only what is
              relevant, and keeps plan limits synced from the billing API.
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#30363D] bg-[#161B22] px-4 py-4 text-slate-400 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl snap-x gap-6 overflow-x-auto text-sm md:justify-center md:overflow-visible">
          {[
            "10M+ Memories Stored",
            "5 Domain Schemas",
            "99.9% Uptime",
            "Loved by developers",
          ].map((item, index) => (
            <div
              key={item}
              className={`shrink-0 snap-start pr-6 ${
                index === 3 ? "" : "border-r border-[#30363D]"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <BillingToggle plans={plans} tenantAppUrl={tenantAppUrl} />
      <CrossAgentAddons />
      <ComparisonTable />
      <PricingFaq />

      <section className="bg-[#0D1117] px-4 py-20 text-center text-white sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Start building in 5 minutes
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
          Join developers building smarter AI products with MemoryOS.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={signUpUrl("/")}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#2E75B6] px-6 text-sm font-semibold text-white transition hover:bg-[#25639b]"
          >
            Start for free
          </Link>
          <a
            href={quickstartDocsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#30363D] px-6 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
          >
            Read the docs
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
