"use client";

import { Brain, Clock3, GraduationCap, Languages, MessageSquareText, Target } from "lucide-react";

import { MarketingDomainShell } from "@/components/marketing-domain-shell";

export default function EdTechUseCasePage() {
  return (
    <MarketingDomainShell
      eyebrow="EdTech Schema"
      title="Student memory for tutors that adapt instead of restarting."
      subtitle="Track learner profile, weak topics, exam context, learning style, language comfort, and progress signals so every session starts from the student's actual state."
      docsPath="/cookbooks/edtech-tutor"
      cta="Build student memory"
      icon={GraduationCap}
      accent="violet"
      proofLabel="Learning problem"
      memories={[
        "Weak topic: integration by parts is still difficult",
        "Learns better from worked examples before theory",
        "Preparing for Class 12 board and JEE-style questions",
        "Comfortable with Hinglish explanations",
      ]}
      problems={[
        "Tutoring agents forget the student's weak topics between sessions.",
        "A student's learning style matters more than generic lesson retrieval.",
        "Exam goals, grade level, and timeline need to survive across chats.",
        "Operators need to inspect what was stored without reading full private conversations.",
      ]}
      features={[
        { icon: Target, title: "Weak topics", body: "Store concepts the student struggles with and how severe the gap is." },
        { icon: Brain, title: "Learning style", body: "Examples-first, visual, step-by-step, theory-first, or language-specific preferences." },
        { icon: Clock3, title: "Exam context", body: "Remember grade, exam date, target, and readiness signals for future sessions." },
        { icon: Languages, title: "Language comfort", body: "Support English, Hindi, Hinglish, or other languages based on extracted preference." },
        { icon: MessageSquareText, title: "Tutor prompt", body: "Return a compact teaching profile the tutor can use before answering." },
        { icon: GraduationCap, title: "Structured schema", body: "Use a domain-specific overlay instead of dumping all memory into generic facts." },
      ]}
      code={`from memoryos import Memory

mem = Memory(api_key="mem_live_xxx")

mem.add(
    external_user_id="student_001",
    messages=lesson_messages,
    metadata={"course": "calculus"},
)

profile = mem.get_edtech_profile("student_001")
context = mem.get(
    external_user_id="student_001",
    query="how should I teach integration by parts now?",
)`}
      finalTitle="Build a tutor that remembers how each student learns."
      finalBody="Start with EdTech Schema in a test workspace, run real learner conversations, and verify extracted memory before launch."
    />
  );
}
