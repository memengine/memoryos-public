"use client";

import { AlertTriangle, Clock3, Headphones, MessageSquareText, ShieldCheck, TicketCheck } from "lucide-react";

import { MarketingDomainShell } from "@/components/marketing-domain-shell";

export default function CustomerSupportUseCasePage() {
  return (
    <MarketingDomainShell
      eyebrow="Customer Support Schema"
      title="Customer memory for support agents that cannot afford to guess."
      subtitle="Remember account context, open issues, support history, sentiment risk, and resolution preferences. Your backend still owns real actions like refunds, invoice fixes, and ticket updates."
      docsPath="/cookbooks/support-agent"
      cta="Build support memory"
      icon={Headphones}
      accent="amber"
      proofLabel="Support problem"
      memories={[
        "Open issue: invoice failed after Growth upgrade",
        "Prefers direct support replies and refund over replacement",
        "Uses Slack and webhook integrations",
        "High escalation risk when payment is involved",
      ]}
      problems={[
        "Customers repeat order, invoice, account, and complaint details in every chat.",
        "Ticket history alone does not tell the agent what context matters right now.",
        "Generic RAG retrieves policy docs but misses customer-specific support memory.",
        "Support agents must not claim a refund or invoice was processed until the real backend tool confirms it.",
      ]}
      features={[
        { icon: TicketCheck, title: "Open issue first", body: "Current unresolved issues are ranked before old history so agents start in the right place." },
        { icon: ShieldCheck, title: "Safe retrieval", body: "Support context is retrieved separately from live actions, reducing accidental promises." },
        { icon: AlertTriangle, title: "Escalation risk", body: "Payment failures, delays, fraud sensitivity, and repeated complaints can be surfaced as risk context." },
        { icon: Clock3, title: "Less repetition", body: "Prior contact, preferences, and account state carry forward across support sessions." },
        { icon: MessageSquareText, title: "Prompt-ready context", body: "The retriever returns compact bullets or JSON that your support agent can use immediately." },
        { icon: Headphones, title: "Multi-vertical", body: "SaaS, ecommerce, banking, travel, telecom, EdTech support, or general support routing." },
      ]}
      code={`from memoryos import Memory

mem = Memory(api_key="mem_live_xxx")

context = mem.get(
    external_user_id="cust_8a72",
    query="what matters for this support issue?",
    format="bullets",
)

order = tools.get_order("ORD-44821")

# MemoryOS gives context.
# Your backend tools still perform the real action.`}
      finalTitle="Make every support conversation start with the right customer context."
      finalBody="Start with support memory in a test workspace, connect your real support tools, and inspect what gets stored before production traffic."
    />
  );
}
