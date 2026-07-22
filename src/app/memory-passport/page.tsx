"use client";

import { Eye, Fingerprint, KeyRound, LockKeyhole, Network, RotateCcw, ShieldCheck, UserCheck } from "lucide-react";

import { MarketingDomainShell } from "@/components/marketing-domain-shell";

export default function MemoryPassportPage() {
  return (
    <MarketingDomainShell
      eyebrow="Memory Passport"
      title="Cross-agent memory that users can actually control."
      subtitle="Users approve categories, manage grants, answer pending conflicts, correct stale memories, and revoke access without every AI app rebuilding the same permission center."
      docsPath="/guides/cross-agent-sharing"
      cta="Register an agent"
      icon={Fingerprint}
      accent="sky"
      proofLabel="Shared memory problem"
      memories={[
        "Study Buddy can read goals and learning preferences",
        "Career Coach can read skills and project history",
        "Personal conflicts wait for user confirmation",
        "Revoked grants stop future access without deleting history",
      ]}
      problems={[
        "Shared memory becomes risky if users cannot see what each agent knows.",
        "Agent-level consent is too broad unless categories are visible and revocable.",
        "Conflicting personal facts should not be silently resolved by an app developer.",
        "Users need one place to correct, remove, and inspect memories across trusted agents.",
      ]}
      features={[
        { icon: Eye, title: "Visible grants", body: "Users see which agents can read which categories before and after approval." },
        { icon: KeyRound, title: "Agent identity", body: "Tenants register public agent identities before asking for Passport access." },
        { icon: UserCheck, title: "Pending questions", body: "Personal conflicts route to the user instead of being guessed by the system." },
        { icon: RotateCcw, title: "Revocation", body: "Users can revoke access later while historical memories remain separately manageable." },
        { icon: ShieldCheck, title: "Source status", body: "The UI can show active, expired, revoked, disputed, or corrected source state." },
        { icon: Network, title: "Cross-agent context", body: "Approved memory can travel across trusted AI apps without losing user control." },
      ]}
      code={`from memoryos.universal import UniversalMemory

consent_url = UniversalMemory.consent_url(
    agent_id="your_global_agent_id",
    redirect_uri="https://yourapp.com/memoryos/callback",
    categories=["preference", "fact", "goal"],
    state="your_user_session_id",
)

# Redirect the user to consent_url.
# They decide what this agent can access.`}
      simulate
      finalTitle="Make shared memory useful without making it hidden."
      finalBody="Register an agent, generate a consent URL, and let users choose what your AI can remember across products."
    />
  );
}
