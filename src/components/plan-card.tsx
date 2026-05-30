"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { salesMailUrl } from "@/lib/urls";

export type BillingInterval = "monthly" | "annual";
export type PlanName = "free" | "starter" | "growth" | "enterprise";

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
  stripe_price_monthly?: string | null;
  stripe_price_annual?: string | null;
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
    audit_log_days: number;
    support: string;
    sla: string;
    data_residency: string;
  };
};

type PlanCardProps = {
  billing: BillingInterval;
  plan: BillingPlan;
  tenantAppUrl: string;
  className?: string;
};

const badgeStyles: Record<PlanName, string> = {
  free: "border-slate-600 bg-slate-700/30 text-slate-200",
  starter: "border-[#2E75B6] bg-[#2E75B6]/20 text-sky-100",
  growth: "border-emerald-500/50 bg-emerald-500/15 text-emerald-100",
  enterprise: "border-purple-500/50 bg-purple-500/15 text-purple-100",
};

function formatInr(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

function formatLimit(value: number | null): string {
  return value === null ? "Unlimited" : value.toLocaleString("en-IN");
}

function annualMonthlyEquivalent(plan: BillingPlan): number | null {
  if (plan.annual_price_inr === null) {
    return null;
  }
  return Math.round(plan.annual_price_inr / 12);
}

function annualSavings(plan: BillingPlan): number | null {
  if (plan.monthly_price_inr === null || plan.annual_price_inr === null) {
    return null;
  }
  return plan.monthly_price_inr * 12 - plan.annual_price_inr;
}

function signupHref(tenantAppUrl: string, plan: BillingPlan): string {
  const redirect = plan.cta_type === "checkout" ? "/pricing" : "/";
  return `${tenantAppUrl.replace(/\/$/, "")}/sign-up?redirect=${encodeURIComponent(redirect)}`;
}

function FeatureValue({ enabled }: { enabled: boolean }) {
  if (!enabled) {
    return <span className="text-slate-500">-</span>;
  }
  return <Check className="size-4 text-emerald-400" aria-hidden="true" />;
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="flex items-center gap-1.5 text-right font-medium text-slate-100">
        {value}
      </span>
    </div>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {title}
      </h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

export function PlanCard({
  billing,
  plan,
  tenantAppUrl,
  className = "",
}: PlanCardProps) {
  const isAnnual = billing === "annual";
  const selectedPrice = isAnnual ? plan.annual_price_inr : plan.monthly_price_inr;
  const selectedSuffix = isAnnual ? "/year" : "/month";
  const equivalent = annualMonthlyEquivalent(plan);
  const savings = annualSavings(plan);

  const cta =
    plan.cta_type === "sales" ? (
      <a
        href={salesMailUrl()}
        className="flex h-11 w-full items-center justify-center rounded-xl border border-purple-400/40 bg-purple-500/15 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/25"
      >
        Talk to Sales
      </a>
    ) : (
      <Link
        href={signupHref(tenantAppUrl, plan)}
        className="flex h-11 w-full items-center justify-center rounded-xl bg-[#2E75B6] text-sm font-semibold text-white transition hover:bg-[#25639b]"
      >
        {plan.cta_type === "checkout" ? "Sign up to upgrade" : plan.cta_text}
      </Link>
    );

  return (
    <article
      id={`plan-${plan.name}`}
      className={`relative rounded-2xl bg-[#161B22] px-6 py-8 ${
        plan.is_popular ? "border-2 border-[#2E75B6]" : "border border-[#30363D]"
      } ${className}`}
    >
      {plan.is_popular ? (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2E75B6] px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-[#2E75B6]/25">
          Most Popular
        </div>
      ) : null}

      <div className="space-y-5">
        <div className="space-y-4">
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badgeStyles[plan.name]}`}
          >
            {plan.badge}
          </span>
          <div>
            <h2 className="text-2xl font-bold text-white">{plan.display_name}</h2>
            <div className="mt-4 min-h-[72px]">
              {selectedPrice === null ? (
                <div className="text-3xl font-bold tracking-tight text-white">
                  Custom pricing
                </div>
              ) : (
                <>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold tracking-tight text-white">
                      Rs. {formatInr(selectedPrice)}
                    </span>
                    <span className="pb-1 text-sm text-slate-400">{selectedSuffix}</span>
                  </div>
                  {isAnnual && equivalent !== null ? (
                    <div className="mt-1 text-xs text-slate-500">
                      Rs. {formatInr(equivalent)}/month equivalent
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
          {isAnnual && savings && savings > 0 ? (
            <span className="inline-flex rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-200">
              Save Rs. {formatInr(savings)}
            </span>
          ) : null}
        </div>

        {cta}

        <div className="h-px bg-[#30363D]" />

        <div className="space-y-6">
          <Group title="Core Limits">
            <DetailRow label="API Calls" value={formatLimit(plan.limits.monthly_call_limit)} />
            <DetailRow label="Read Calls" value="Unlimited" />
            <DetailRow
              label="Rate Limit"
              value={
                plan.limits.rate_limit_per_user_per_minute === null
                  ? "Custom"
                  : `${plan.limits.rate_limit_per_user_per_minute} calls/user/min`
              }
            />
            <DetailRow
              label="Overage Policy"
              value={plan.limits.overage_policy_label ?? "Custom"}
            />
          </Group>

          <Group title="Features">
            <DetailRow label="Quality Gate" value={<FeatureValue enabled={plan.features.quality_gate} />} />
            <DetailRow label="Domain Schemas" value={<FeatureValue enabled={plan.features.domain_schemas} />} />
            <DetailRow label="Memory Passport" value={<FeatureValue enabled={plan.features.cross_agent} />} />
          </Group>

          <Group title="Compliance">
            <DetailRow
              label="Audit Log"
              value={plan.features.audit_log_days > 0 ? `${plan.features.audit_log_days} days` : "-"}
            />
            <DetailRow label="Data Residency" value={plan.features.data_residency} />
          </Group>

          <Group title="Support">
            <DetailRow label="Support" value={plan.features.support} />
            <DetailRow label="Uptime SLA" value={plan.features.sla} />
          </Group>
        </div>
      </div>
    </article>
  );
}
