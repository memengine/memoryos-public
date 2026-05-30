import Link from "next/link";
import { Check, IdCard, ShieldCheck, Tags } from "lucide-react";
import { salesMailUrl, verifyMailUrl } from "@/lib/urls";

const addons = [
  {
    icon: IdCard,
    title: "Global Agent Registration",
    price: "Rs. 999 / month",
    description:
      "Register your AI agent in the MemoryOS network. Users can grant it memory access from a consent screen.",
    features: [
      "Agent API key",
      "Public agent profile",
      "Consent URL generation",
      "Universal memory access",
    ],
    cta: "Add to Growth plan",
    href: "#plan-growth",
  },
  {
    icon: ShieldCheck,
    title: "Verified Agent Badge",
    price: "Rs. 4,999 one-time",
    description:
      "MemoryOS reviews your company and agent. The consent page can show verified status after approval.",
    features: [
      "Company verification",
      "Verified by MemoryOS badge",
      "Higher user trust and approval rate",
    ],
    cta: "Get verified",
    href: "verify",
  },
  {
    icon: Tags,
    title: "White-Label Consent",
    price: "Rs. 9,999 / month",
    description:
      "Host the consent flow at your own domain with your branding. Enterprise only.",
    features: ["Custom domain", "Full brand customisation", "Priority support"],
    cta: "Contact Enterprise",
    href: "sales",
  },
];

export function CrossAgentAddons() {
  return (
    <section className="border-t border-purple-500/40 bg-[#0D1117] px-4 py-20 text-white shadow-[inset_0_1px_28px_rgba(168,85,247,0.18)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Build on the Memory Network
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Register your AI agent. Let users decide which memory categories it
            can read. Available on Growth and Enterprise.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {addons.map((addon) => {
            const Icon = addon.icon;
            return (
              <article
                key={addon.title}
                className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6"
              >
                <Icon className="size-9 text-sky-200" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-bold text-white">{addon.title}</h3>
                <div className="mt-2 text-lg font-semibold text-sky-200">
                  {addon.price}
                </div>
                <p className="mt-4 min-h-[72px] text-sm leading-6 text-slate-400">
                  {addon.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {addon.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-slate-200">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                href={
                  addon.href === "verify"
                    ? verifyMailUrl()
                    : addon.href === "sales"
                      ? salesMailUrl()
                      : addon.href
                }
                  className="mt-7 flex h-10 items-center justify-center rounded-xl border border-[#2E75B6]/60 bg-[#2E75B6]/15 text-sm font-semibold text-sky-100 transition hover:bg-[#2E75B6]/25"
                >
                  {addon.cta}
                </Link>
              </article>
            );
          })}
        </div>

        <pre className="mt-10 overflow-x-auto rounded-2xl border border-[#30363D] bg-[#05080D] p-6 text-sm leading-7 text-slate-300">
          <code>{`// Give users a URL to grant your agent access
const url = UniversalMemory.consentUrl({
  agentId: "your-agent-id",
  redirectUri: "https://yourapp.com/memoryos/callback"
})
// That is the entire consent handoff`}</code>
        </pre>
      </div>
    </section>
  );
}
