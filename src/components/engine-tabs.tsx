"use client";

import { useState } from "react";
import {
  Bot,
  Brain,
  CheckCircle2,
  Code2,
  GraduationCap,
  Headphones,
  Network,
  ShieldCheck,
} from "lucide-react";

type EngineKey = "general" | "edtech" | "support" | "passport" | "sdk" | "mcp";

const engines: Array<{
  key: EngineKey;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  points: string[];
  memories: string[];
}> = [
  {
    key: "general",
    label: "General Engine",
    eyebrow: "Works for any AI product",
    title: "Universal memory for facts, goals, preferences, and procedures.",
    description:
      "Use the general engine when you want durable user context without choosing an industry schema first.",
    icon: Brain,
    accent: "from-blue-500 to-cyan-400",
    points: ["semantic retrieval", "quality gate", "conflict handling", "importance decay"],
    memories: [
      "Prefers concise explanations",
      "Building a B2B SaaS for Indian SMBs",
      "Uses FastAPI, Postgres, and Docker",
    ],
  },
  {
    key: "edtech",
    label: "EdTech Schema",
    eyebrow: "Structured student memory",
    title: "Tutor agents remember how each student learns.",
    description:
      "Store weak topics, grade level, exam timelines, learning style, and progress signals across sessions.",
    icon: GraduationCap,
    accent: "from-sky-500 to-indigo-400",
    points: ["learner profile", "weak topics", "exam readiness", "forgetting curve signals"],
    memories: [
      "Class 12 student preparing for JEE",
      "Weak in integration by parts",
      "Learns better with worked examples",
    ],
  },
  {
    key: "support",
    label: "Support Schema",
    eyebrow: "Customer support memory",
    title: "Support bots resolve faster because customers stop repeating context.",
    description:
      "Tracks account context, open issues, sentiment risk, resolution preferences, and vertical-specific support signals.",
    icon: Headphones,
    accent: "from-amber-500 to-orange-400",
    points: ["SaaS", "e-commerce", "banking/fintech", "travel", "telecom"],
    memories: [
      "Open issue: invoice failed after Growth upgrade",
      "Prefers refund over replacement for delayed orders",
      "High escalation risk on payment failures",
    ],
  },
  {
    key: "passport",
    label: "Memory Passport",
    eyebrow: "Cross-agent memory",
    title: "Users decide which agents can read which memory categories.",
    description:
      "Consent pages, grants, pending questions, and revocation give shared memory a trust layer.",
    icon: Network,
    accent: "from-violet-500 to-fuchsia-400",
    points: ["consent URL", "category access", "verified agents", "user revocation"],
    memories: [
      "Skills and knowledge shared with coding agent",
      "Preferences shared with study buddy",
      "Goals kept private unless approved",
    ],
  },
  {
    key: "sdk",
    label: "SDK + API",
    eyebrow: "Backend integration",
    title: "A small SDK call adds memory to any existing agent flow.",
    description:
      "Use Python, TypeScript, or direct REST APIs. The dashboard shows what was stored and why.",
    icon: Code2,
    accent: "from-emerald-500 to-teal-400",
    points: ["Python SDK", "TypeScript SDK", "REST API", "tenant dashboard"],
    memories: [
      "mem.add(messages, external_user_id)",
      "mem.get(query, external_user_id)",
      "Async client for production workers",
    ],
  },
  {
    key: "mcp",
    label: "MCP Server",
    eyebrow: "Sidecar for AI tools",
    title: "Give MCP-compatible agents memory without custom SDK wiring.",
    description:
      "Run MemoryOS as an MCP sidecar so agent builders can call memory tools from their existing environment.",
    icon: Bot,
    accent: "from-rose-500 to-red-400",
    points: ["add memory", "retrieve context", "list memories", "domain-aware tools"],
    memories: [
      "Tool: memoryos_add_memory",
      "Tool: memoryos_get_context",
      "Tool: memoryos_list_user_memories",
    ],
  },
];

export function EngineTabs() {
  const [activeKey, setActiveKey] = useState<EngineKey>("support");
  const active = engines.find((engine) => engine.key === activeKey) ?? engines[0];
  const ActiveIcon = active.icon;

  return (
    <section id="engines" className="bg-white px-4 py-24 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-sm font-black uppercase tracking-[0.28em] text-[#2E75B6]">
            Domain schema registry
          </div>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            One memory platform, multiple production engines.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Start with universal memory. Switch on a domain schema when your AI
            needs industry-specific extraction, retrieval, and safety behavior.
          </p>
        </div>

        <div className="mt-10 flex gap-3 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-2">
          {engines.map((engine) => (
            <button
              key={engine.key}
              type="button"
              onClick={() => setActiveKey(engine.key)}
              className={`shrink-0 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                activeKey === engine.key
                  ? "bg-[#0D1117] text-white shadow-lg shadow-slate-950/10"
                  : "text-slate-600 hover:bg-white hover:text-slate-950"
              }`}
            >
              {engine.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <div
              className={`inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${active.accent} text-white shadow-lg`}
            >
              <ActiveIcon className="size-7" />
            </div>
            <div className="mt-6 text-sm font-black uppercase tracking-[0.22em] text-slate-500">
              {active.eyebrow}
            </div>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              {active.title}
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {active.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {active.points.map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700"
                >
                  {point}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#0D1117] p-6 text-white">
            <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,#2E75B6_0,transparent_25%),radial-gradient(circle_at_80%_0%,#8B5CF6_0,transparent_22%),radial-gradient(circle_at_65%_85%,#10B981_0,transparent_20%)]" />
            <div className="relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-sm font-bold text-slate-400">Live memory context</div>
                  <div className="mt-1 font-mono text-xs text-slate-500">
                    engine: {active.key}
                  </div>
                </div>
                <ShieldCheck className="size-6 text-emerald-300" />
              </div>
              <div className="mt-5 space-y-3">
                {active.memories.map((memory, index) => (
                  <div
                    key={memory}
                    className="animate-float rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur"
                    style={{ animationDelay: `${index * 140}ms` }}
                  >
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-300" />
                      <div>
                        <div className="font-semibold text-white">{memory}</div>
                        <div className="mt-1 text-xs text-slate-400">
                          ranked by relevance, importance, and freshness
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-[#2E75B6]/40 bg-[#0B1D32]/80 p-4 font-mono text-xs leading-6 text-sky-100">
                system_prompt_addition = retrieve(query, user_id, domain_schema)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
