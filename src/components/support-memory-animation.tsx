"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Database, MessageSquareText, Sparkles } from "lucide-react";

const scenarios = [
  {
    customerId: "customer_saas_001",
    schema: "SaaS",
    badge: "Resolve Billing Faster",
    userQuery: "Our Growth invoice failed again for workspace ws_acme_001.",
    agentReply:
      "I can see this is urgent before your finance review. I will check the billing system for the workspace.",
    phase: "Memory Generation",
    memories: [
      ["Open Issue", "Invoice failed after Growth upgrade"],
      ["Workspace", "ws_acme_001"],
      ["Urgency", "Needs fix before finance review"],
    ],
  },
  {
    customerId: "customer_ecommerce_001",
    schema: "E-commerce",
    badge: "Reduce Repeated Context",
    userQuery: "My order ORD-44821 is delayed again. I want a refund if it is not here in two days.",
    agentReply:
      "I understand. I will check the order status first and remember that you prefer refund over replacement.",
    phase: "Preference Stored",
    memories: [
      ["Order", "ORD-44821 delayed repeatedly"],
      ["Preference", "Refund over replacement"],
      ["Sentiment", "Frustrated but cooperative"],
    ],
  },
  {
    customerId: "customer_fintech_001",
    schema: "Banking/Fintech",
    badge: "Handle Risk Carefully",
    userQuery: "My UPI transfer failed but money was debited. I am worried this is fraud.",
    agentReply:
      "I will treat this as urgent and check dispute status. Please do not share OTP, PIN, or full account numbers.",
    phase: "Safe Context Stored",
    memories: [
      ["Transaction", "Failed UPI transfer with debit concern"],
      ["Risk", "Fraud sensitivity should surface first"],
      ["Safety", "Do not store OTP, PAN, or full account numbers"],
    ],
  },
];

export function SupportMemoryAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = scenarios[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % scenarios.length);
    }, 7800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="overflow-hidden bg-[#08090C] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="inline-flex rounded-xl bg-white px-6 py-3 text-lg font-black text-[#0D1117] shadow-xl shadow-black/20">
            {active.badge}
          </div>
          <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            Watch MemoryOS turn a support query into reusable customer memory.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
            The conversation stays on the left. The extracted support memories
            appear on the right and become available in the next session.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {scenarios.map((scenario, index) => (
            <button
              key={scenario.customerId}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-12 bg-sky-400" : "w-2 bg-white/25"
              }`}
              aria-label={`Show ${scenario.schema} support animation`}
            />
          ))}
        </div>

        <div
          key={active.customerId}
          className="relative mx-auto mt-12 max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#18191D] p-5 shadow-2xl shadow-black/40"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_100%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_70%_100%,rgba(245,158,11,0.16),transparent_28%)]" />
          <div className="relative grid min-h-[520px] gap-5 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-white/5 bg-[#111216] p-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-sky-300 text-[#0D1117]">
                    <MessageSquareText className="size-5" />
                  </span>
                  <div>
                    <div className="font-black">Customer conversation</div>
                    <div className="text-xs text-slate-500">{active.customerId}</div>
                  </div>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300">
                  {active.schema}
                </span>
              </div>

              <div className="mt-12 flex justify-end">
                <div className="animate-slide-in max-w-[78%] rounded-2xl bg-white/10 px-5 py-4 text-base font-semibold leading-7 text-white opacity-0">
                  {active.userQuery}
                </div>
              </div>

              <div className="mt-10 max-w-[78%] animate-agent-reply rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base font-semibold leading-7 text-slate-200 opacity-0">
                {active.agentReply}
              </div>

              <div className="mt-12 animate-query-pulse rounded-2xl border border-sky-300/30 bg-sky-300/10 p-4 font-mono text-xs leading-6 text-sky-100">
                support_retrieval_query = &quot;what matters for this customer now?&quot;
              </div>
            </div>

            <div className="relative rounded-[1.5rem] border border-white/5 bg-[#141519] p-7">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black">Memories</div>
                  <div className="mt-1 text-xs font-semibold text-slate-500">
                    generated by MemoryOS support schema
                  </div>
                </div>
                <Database className="size-6 text-sky-300" />
              </div>

              <div className="mt-7 space-y-4">
                <div className="animate-skeleton-fade space-y-4">
                  {[0, 1].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/5 bg-white/[0.04] p-4">
                      <div className="h-4 w-full rounded-full bg-white/8" />
                      <div className="mt-4 flex gap-3">
                        <div className="h-5 w-20 rounded-full bg-white/8" />
                        <div className="h-5 w-28 rounded-full bg-white/8" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-x-7 top-24 space-y-4">
                  {active.memories.map(([label, value], index) => (
                    <div
                      key={`${label}-${value}`}
                      className="animate-store-memory rounded-2xl border border-white/10 bg-[#22242A] p-4 opacity-0 shadow-lg shadow-black/20"
                      style={{ animationDelay: `${2500 + index * 620}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-300" />
                        <div>
                          <div className="font-black text-white">{value}</div>
                          <div className="mt-3 inline-flex rounded-md bg-[#2E75B6] px-2.5 py-1 text-xs font-black text-white">
                            {label}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-lg font-black text-white shadow-xl shadow-emerald-950/30">
            <Sparkles className="size-5" />
            {active.phase}
          </div>
        </div>
      </div>
    </section>
  );
}
