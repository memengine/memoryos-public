import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Languages,
  MessageSquareText,
  Sparkles,
  Target,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { docsUrl } from "@/lib/docs";
import { signUpUrl } from "@/lib/urls";

const learnerMemories = [
  ["weak_topic", "Integration by parts is still difficult"],
  ["learning_style", "Learns better from worked examples before theory"],
  ["exam_context", "Preparing for Class 12 board and JEE-style questions"],
  ["language_profile", "Comfortable with Hinglish explanations"],
];

const outcomes = [
  "The tutor starts from the student's current level instead of repeating onboarding.",
  "Weak topics, exam goals, and language preference survive across sessions.",
  "The AI can slow down, change examples, or raise difficulty based on remembered progress.",
  "Teachers and operators can inspect what was stored from the tenant dashboard.",
];

const productFits = [
  ["AI tutoring apps", "Personalized explanations and practice for each student."],
  ["Exam prep platforms", "Remember exam dates, weak topics, and readiness signals."],
  ["Learning companions", "Carry a student's style, pace, and language across sessions."],
  ["EdTech support bots", "Separate course/access/payment support memory from learning memory."],
];

export default function EdTechUseCasePage() {
  const edtechDocsUrl = docsUrl("/cookbooks/edtech-tutor");

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#0D1117] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:78px_78px]" />
        <div className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-violet-300/10 px-4 py-2 text-sm font-bold text-violet-100">
              <GraduationCap className="size-4" />
              EdTech Schema
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Give every student a tutor that remembers how they learn.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              MemoryOS tracks learner profile, weak topics, exam context,
              language preference, and progress signals so tutoring agents can
              personalize every session without starting from zero.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={signUpUrl("/")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-violet-300 px-6 text-sm font-black text-[#0D1117] shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-200"
              >
                Build student memory
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={edtechDocsUrl}
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
                  <span className="flex size-10 items-center justify-center rounded-xl bg-violet-300 text-[#0D1117]">
                    <MessageSquareText className="size-5" />
                  </span>
                  <div>
                    <div className="font-black">Learner context generated</div>
                    <div className="text-xs text-slate-400">student_001</div>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
                  ready for next lesson
                </span>
              </div>

              <div className="grid gap-5 py-5 lg:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">
                    Student message
                  </div>
                  <div className="mt-5 animate-slide-in rounded-2xl bg-white/10 p-4 text-sm font-semibold leading-6 text-white opacity-0">
                    I understand substitution, but integration by parts still
                    confuses me. Can you explain in Hinglish?
                  </div>
                  <div className="mt-5 animate-agent-reply rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-semibold leading-6 text-slate-200 opacity-0">
                    Sure. I&apos;ll use a worked example first, then the formula.
                  </div>
                </div>

                <div className="relative min-h-[330px] rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs font-black uppercase tracking-[0.22em] text-emerald-200">
                    Learner memory
                  </div>
                  <div className="mt-5 space-y-3">
                    {learnerMemories.map(([label, value], index) => (
                      <div
                        key={label}
                        className="animate-store-memory rounded-2xl border border-white/10 bg-white/10 p-4 opacity-0"
                        style={{ animationDelay: `${900 + index * 520}ms` }}
                      >
                        <div className="text-sm font-black text-white">{value}</div>
                        <div className="mt-2 inline-flex rounded-md bg-violet-500 px-2 py-1 text-xs font-black text-white">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 font-mono text-xs leading-6 text-slate-300">
                mem.get(query=&quot;how should I teach this student now?&quot;, external_user_id=&quot;student_001&quot;)
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.28em] text-violet-600">
              The problem
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Tutoring agents forget the student between sessions.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              A student&apos;s weak topics, learning style, exam level, and
              language preference matter more than generic lesson content.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {outcomes.map((point) => (
              <div key={point} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <CheckCircle2 className="size-6 text-emerald-500" />
                <p className="mt-4 text-base font-semibold leading-7 text-slate-700">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.28em] text-[#2E75B6]">
              What MemoryOS stores
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Structured learning memory, not raw chat history.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {[
              [Target, "Weak topics", "Concepts the student struggles with and severity."],
              [Brain, "Learning style", "Examples-first, visual, step-by-step, or theory-first."],
              [Clock3, "Exam context", "Grade level, exam target, timeline, and readiness."],
              [Languages, "Language profile", "Hindi, Hinglish, English, or regional comfort."],
            ].map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof Target;
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
            <div className="text-sm font-black uppercase tracking-[0.28em] text-violet-300">
              Product fit
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              For tutoring, exam prep, and learning companions.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {productFits.map(([title, detail]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-6">
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-4 py-20 text-center sm:px-6 lg:px-8">
        <Sparkles className="mx-auto size-10 text-violet-500" />
        <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
          Build an AI tutor that remembers each student.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Start with a test workspace, enable EdTech Schema, and run your tutor
          through real student sessions.
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
