"use client";

import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { salesMailUrl } from "@/lib/urls";

export type BillingInterval = "monthly" | "annual";
export type Currency = "inr" | "usd";
export type PlanName = "free" | "starter" | "growth" | "scale" | "enterprise";

export type BillingPlan = {
  name: PlanName;
  display_name: string;
  badge: string;
  monthly_price_inr: number | null;
  annual_price_inr: number | null;
  monthly_price_usd: number | null;
  annual_price_usd: number | null;
  is_popular: boolean;
  cta_text: string;
  cta_type: "signup" | "checkout" | "sales";
  limits: {
    monthly_call_limit: number | null;
    write_call_limit: number | null;
    read_limit: number | null;
    rate_limit_per_user_per_minute: number | null;
    overage_policy: string | null;
    overage_policy_label: string | null;
  };
  features: {
    quality_gate: boolean;
    domain_schemas: boolean;
    cross_agent: boolean;
    conflict_resolution: boolean;
    multi_service_writers: boolean;
    audit_log_days: number;
    support: string;
    reliability_note: string;
    data_residency: string;
  };
};

type PlanCardProps = {
  billing: BillingInterval;
  plan: BillingPlan;
  tenantAppUrl: string;
  currency?: Currency;
  className?: string;
};

const badgeStyles: Record<PlanName, string> = {
  free: "border-slate-700 bg-slate-800/60 text-slate-300",
  starter: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
  growth: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  scale: "border-blue-300/30 bg-blue-300/10 text-blue-200",
  enterprise: "border-slate-600 bg-slate-700/60 text-slate-300",
};

function formatMoney(value: number, currency: Currency) {
  return new Intl.NumberFormat(currency === "inr" ? "en-IN" : "en-US", {
    style: "currency",
    currency: currency === "inr" ? "INR" : "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatLimit(value: number | null) {
  if (value === null) return "Custom";
  if (value >= 1_000_000) return `${new Intl.NumberFormat("en", { maximumFractionDigits: 1 }).format(value / 1_000_000)}M`;
  if (value >= 1000) return `${new Intl.NumberFormat("en", { maximumFractionDigits: 0 }).format(value / 1000)}K`;
  return value.toString();
}

function signupHref(tenantAppUrl: string, plan: BillingPlan, billing: BillingInterval) {
  const query = new URLSearchParams({
    plan: plan.name,
    billing,
    redirect: "/pricing",
  });
  return `${tenantAppUrl.replace(/\/$/, "")}/sign-up?${query.toString()}`;
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="flex items-center gap-1.5 text-right font-medium text-slate-100">{value}</span>
    </div>
  );
}

function Available({ enabled }: { enabled: boolean }) {
  return enabled ? (
    <Check className="size-4 text-emerald-300" aria-label="Included" />
  ) : (
    <Minus className="size-4 text-slate-600" aria-label="Not included" />
  );
}

export function PlanCard({ billing, plan, tenantAppUrl, currency = "inr", className = "" }: PlanCardProps) {
  const monthly = currency === "inr" ? plan.monthly_price_inr : plan.monthly_price_usd;
  const annual = currency === "inr" ? plan.annual_price_inr : plan.annual_price_usd;
  const monthlyEquivalent = annual === null ? null : Math.round(annual / 12);
  const displayPrice = billing === "annual" ? monthlyEquivalent : monthly;
  const savings = monthly !== null && annual !== null ? monthly * 12 - annual : null;

  return (
    <article
      id={`plan-${plan.name}`}
      className={`relative flex h-full flex-col rounded-2xl border bg-[#101722] p-6 ${
        plan.is_popular ? "border-cyan-300/45 shadow-[0_18px_60px_rgba(34,211,238,0.08)]" : "border-white/10"
      } ${className}`}
    >
      {plan.is_popular ? (
        <div className="absolute -top-3 left-5 rounded-full bg-cyan-300 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
          Most popular
        </div>
      ) : null}

      <div>
        <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${badgeStyles[plan.name]}`}>
          {plan.badge}
        </span>
        <h3 className="mt-4 text-2xl font-bold text-white">{plan.display_name}</h3>
      </div>

      <div className="mt-5 min-h-[88px]">
        {displayPrice === null ? (
          <>
            <div className="text-3xl font-bold text-white">Custom</div>
            <p className="mt-2 text-xs text-slate-400">Contract pricing for your workload</p>
          </>
        ) : (
          <>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold tracking-tight text-white">{formatMoney(displayPrice, currency)}</span>
              <span className="pb-1 text-sm text-slate-400">/month</span>
            </div>
            {billing === "annual" && annual !== null ? (
              <p className="mt-2 text-xs text-slate-400">
                Billed {formatMoney(annual, currency)} annually{savings && savings > 0 ? ` - save ${formatMoney(savings, currency)}` : ""}
              </p>
            ) : (
              <p className="mt-2 text-xs text-slate-400">Billed monthly - cancel anytime</p>
            )}
          </>
        )}
      </div>

      {plan.cta_type === "sales" ? (
        <a href={salesMailUrl()} className="mt-5 flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] text-sm font-semibold text-slate-200 transition hover:bg-white/[0.10]">
          Talk to sales
        </a>
      ) : (
        <Link href={signupHref(tenantAppUrl, plan, billing)} className={`mt-5 flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition ${plan.is_popular ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200" : "bg-white text-slate-950 hover:bg-slate-200"}`}>
          {plan.name === "free" ? "Start free" : `Choose ${plan.display_name}`}
        </Link>
      )}

      <div className="my-6 h-px bg-white/10" />
      <div className="flex-1 space-y-3">
        <DetailRow label="API calls / month" value={formatLimit(plan.limits.monthly_call_limit)} />
        <DetailRow label="Memory writes" value={formatLimit(plan.limits.write_call_limit)} />
        <DetailRow label="Rate limit" value={plan.limits.rate_limit_per_user_per_minute === null ? "Custom" : `${plan.limits.rate_limit_per_user_per_minute}/user/min`} />
        <DetailRow label="Quality gate" value={<Available enabled={plan.features.quality_gate} />} />
        <DetailRow label="Memory Passport" value={<Available enabled={plan.features.cross_agent} />} />
        <DetailRow label="Conflict resolution" value={<Available enabled={plan.features.conflict_resolution} />} />
        <DetailRow label="Multi-service writers" value={<Available enabled={plan.features.multi_service_writers} />} />
        <DetailRow label="Domain schemas" value={<Available enabled={plan.features.domain_schemas} />} />
        <DetailRow label="Audit history" value={plan.features.audit_log_days > 0 ? `${plan.features.audit_log_days} days` : "None"} />
        <DetailRow label="Support" value={plan.features.support} />
        <DetailRow label="Reliability" value={plan.features.reliability_note} />
      </div>
      <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400">
        {plan.limits.overage_policy_label ?? "Custom capacity and overage policy"}
      </p>
    </article>
  );
}