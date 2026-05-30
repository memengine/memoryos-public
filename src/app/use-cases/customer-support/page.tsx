import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Headphones,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TicketCheck,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SupportMemoryAnimation } from "@/components/support-memory-animation";
import { docsUrl } from "@/lib/docs";
import { signUpUrl } from "@/lib/urls";

const painPoints = [
  "Customers repeat order, invoice, account, and complaint details in every chat.",
  "Support agents miss old issues, tone preferences, and escalation risk.",
  "Generic RAG retrieves documents, but not the customer-specific context needed now.",
  "Bots sometimes promise refunds or actions without checking live backend tools.",
];

const memoryCards = [
  "Open issue: invoice failed after Growth upgrade",
  "Prefers direct, short support replies",
  "High escalation risk when payment is involved",
  "Uses Slack and webhook integrations",
  "Refund preferred over replacement for delayed orders",
];

const verticals = [
  ["SaaS helpdesk", "workspace, plan, billing, integrations, invoice urgency"],
  ["E-commerce", "order status, returns, refunds, seller issues, delivery preferences"],
  ["Banking/Fintech", "complaints, failed transactions, KYC, fraud sensitivity with PII redaction"],
  ["Travel", "PNR, booking changes, cancellations, loyalty context, disruption history"],
  ["Telecom", "plan, network issues, porting risk, device context"],
  ["General info", "pricing questions, objections, product interest, sales stage"],
];

export default function CustomerSupportUseCasePage() {
  const supportDocsUrl = docsUrl("/cookbooks/support-agent");

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#0D1117] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:78px_78px]" />
        <div className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-bold text-amber-100">
              <Headphones className="size-4" />
              Customer Support Schema
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Give support agents customer memory, not just ticket history.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              MemoryOS remembers customer identity, open issues, support history,
              sentiment risk, language, resolution preferences, and vertical
              context so every support conversation starts with the right facts.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={signUpUrl("/")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-300 px-6 text-sm font-black text-[#0D1117] shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-200"
              >
                Build support memory
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={supportDocsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-white/35"
              >
                Read integration docs
              </a>
            </div>
          </div>

          <div className="relative min-h-[560px]">
            <div className="absolute inset-x-8 top-0 h-56 rounded-[2rem] border border-white/10 bg-white/5" />
            <div className="absolute inset-x-16 top-14 h-56 rounded-[2rem] border border-white/10 bg-white/5" />
            <div className="absolute inset-x-0 top-28 overflow-hidden rounded-[2rem] border border-white/10 bg-[#151922] p-5 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-amber-300 text-[#0D1117]">
                    <MessageSquareText className="size-5" />
                  </span>
                  <div>
                    <div className="font-black">Support context generated</div>
                    <div className="text-xs text-slate-400">customer_id: cust_8a72</div>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
                  safe to use
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                {memoryCards.map((memory, index) => (
                  <div
                    key={memory}
                    className="animate-float rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"
                    style={{ animationDelay: `${index * 130}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      {index === 0 || index === 2 ? (
                        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-300" />
                      ) : (
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-300" />
                      )}
                      <div>
                        <div className="font-semibold text-white">{memory}</div>
                        <div className="mt-1 text-xs text-slate-400">
                          ranked by urgency, relevance, freshness, and support type
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-sky-300/20 bg-sky-300/10 p-4 font-mono text-xs leading-6 text-sky-100">
                retrieve_support_context(query=&quot;billing issue&quot;) {"->"} open issue first, then identity, then resolution preference
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.28em] text-amber-600">
              The problem
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Support bots fail when they know the policy but not the customer.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Help centers already have docs and backend tools. What they lack is
              reliable customer memory between conversations.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {painPoints.map((point) => (
              <div key={point} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <AlertTriangle className="size-6 text-amber-500" />
                <p className="mt-4 text-base font-semibold leading-7 text-slate-700">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SupportMemoryAnimation />

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.28em] text-[#2E75B6]">
              How MemoryOS helps
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Memory for support, separated from live backend actions.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              MemoryOS retrieves context. Your support stack still owns live
              actions like refunds, ticket updates, invoice creation, and account
              verification.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              [TicketCheck, "Open issue first", "Current unresolved issues are surfaced before old history."],
              [ShieldCheck, "PII-aware extraction", "Sensitive banking and identity values are redacted before storage."],
              [RefreshCw, "Vertical routing", "Use one fixed support type, multiple allowed types, or auto-detection."],
              [Clock3, "Faster handoff", "Agents see prior issue history and preferred resolution immediately."],
              [Sparkles, "Better personalization", "Tone, language, and customer tier influence the next response."],
              [MessageSquareText, "Cleaner prompts", "Retriever compresses memory into a support-safe prompt addition."],
            ].map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof TicketCheck;
              return (
                <article key={title as string} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <CardIcon className="size-7 text-[#2E75B6]" />
                  <h3 className="mt-5 text-xl font-black">{title as string}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{copy as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0D1117] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.28em] text-amber-300">
              Multi-vertical support
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Built for Intercom-style platforms and vertical support teams.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              A helpdesk can allow multiple support types. A bank, airline, or
              ecommerce company can lock one support type for safer extraction.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {verticals.map(([title, detail]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-6">
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.28em] text-[#2E75B6]">
              Integration pattern
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              MemoryOS does not replace your support tools.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Your backend calls tools like `get_order`, `get_invoice`,
              `create_refund`, or `update_ticket`. MemoryOS gives the agent the
              remembered context needed to ask fewer repeated questions.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#05080D] shadow-xl shadow-slate-950/10">
            <div className="border-b border-white/10 px-5 py-4 text-sm font-bold text-slate-300">
              Support agent flow
            </div>
            <pre className="overflow-x-auto p-6 text-sm leading-7 text-slate-300">
              <code>{`context = mem.get(
    external_user_id="cust_8a72",
    query="what matters for this support issue?",
    format="bullets"
)

order = tools.get_order("ORD-44821")

# The agent may say:
# "This order is eligible for a refund."
#
# It must call create_refund() before saying:
# "Your refund has been processed."`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
          Make your support AI remember the customer.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Start with support schema in a test workspace, connect your real tools,
          and inspect stored memories from the tenant dashboard.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={signUpUrl("/")}
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
