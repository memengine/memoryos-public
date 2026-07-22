"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Code2,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  Network,
  Plug,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { docsUrl } from "@/lib/docs";
import { salesMailUrl, signUpUrl, tenantAppUrl } from "@/lib/urls";

type MenuLink = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

function DropdownMenu({ label, columns = 1, links, dark = false }: {
  label: string;
  columns?: 1 | 2;
  links: MenuLink[];
  dark?: boolean;
}) {
  return (
    <div className="group relative flex h-20 items-center">
      <button
        type="button"
        aria-haspopup="menu"
        className={`flex items-center gap-1 text-sm font-semibold transition ${dark ? "text-slate-400 group-hover:text-white group-focus-within:text-white" : "text-slate-600 group-hover:text-slate-950 group-focus-within:text-slate-950"}`}
      >
        {label}
        <ChevronDown className="size-3.5 transition group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div
        role="menu"
        className={`invisible absolute left-1/2 top-[4.75rem] z-50 -translate-x-1/2 translate-y-2 rounded-2xl border p-3 text-left opacity-0 shadow-2xl transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${columns === 2 ? "w-[660px]" : "w-[400px]"} ${dark ? "border-white/10 bg-[#0d0d14] shadow-slate-950/50" : "border-slate-200 bg-white shadow-slate-950/10"}`}
      >
        <div className="px-3 pb-2 pt-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">{label}</div>
        <div className={`h-px ${dark ? "bg-white/10" : "bg-slate-100"}`} />
        <div className={`grid gap-1 pt-2 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
          {links.map((item) => {
            const Icon = item.icon ?? Sparkles;
            const content = (
              <span className={`flex gap-3 rounded-xl p-3 transition ${dark ? "hover:bg-white/5" : "hover:bg-slate-50"}`}>
                <span className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${dark ? "bg-white/10 text-violet-300" : "bg-slate-100 text-[#2E75B6]"}`}>
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className={`block text-sm font-black ${dark ? "text-white" : "text-slate-950"}`}>{item.title}</span>
                  <span className={`mt-1 block text-sm font-medium leading-5 ${dark ? "text-slate-400" : "text-slate-500"}`}>{item.description}</span>
                </span>
              </span>
            );
            return item.external ? (
              <a key={item.title} href={item.href} target="_blank" rel="noreferrer" role="menuitem">{content}</a>
            ) : (
              <Link key={item.title} href={item.href} role="menuitem">{content}</Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const docsHomeUrl = docsUrl("/");
  const dashboard = tenantAppUrl();

  const developerLinks: MenuLink[] = [
    { title: "SDK + API", description: "Use Python, TypeScript, or REST from your backend.", href: "/#developers", icon: Code2 },
    { title: "MCP Server", description: "Give MCP-compatible agents MemoryOS tools.", href: "/#developers", icon: Plug },
    { title: "Memory Passport", description: "User-approved sharing, grants, and conflict-aware memory.", href: "/memory-passport", icon: Network },
    { title: "Documentation", description: "Quickstarts, concepts, guides, and API usage.", href: docsHomeUrl, external: true, icon: BookOpen },
  ];

  const useCaseLinks: MenuLink[] = [
    { title: "Customer Support", description: "Remember accounts, open issues, and resolution preferences.", href: "/use-cases/customer-support", icon: Headphones },
    { title: "Education", description: "Personalized tutoring memory for each learner.", href: "/use-cases/edtech", icon: GraduationCap },
  ];

  const resourceLinks: MenuLink[] = [
    { title: "Docs", description: "Integrate MemoryOS into your product.", href: docsHomeUrl, external: true, icon: BookOpen },
    { title: "Security & governance", description: "Isolation, quality gates, provenance, and auditability.", href: "/#production", icon: ShieldCheck },
    { title: "Pricing", description: "Plans for prototypes through production teams.", href: "/pricing", icon: Sparkles },
    { title: "Support", description: "Talk with us about production onboarding.", href: salesMailUrl(), external: true, icon: LifeBuoy },
  ];

  const textClass = dark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-950";

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl ${dark ? "border-b border-white/[0.06] bg-[#030305]/85" : "border-b border-slate-200/70 bg-white/92"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <span className={`flex size-10 items-center justify-center rounded-xl text-sm font-bold shadow-sm ${dark ? "bg-white/10 text-white" : "bg-[#0D1117] text-white"}`}>M</span>
          <span className={`text-sm font-black uppercase tracking-[0.24em] ${dark ? "text-white" : "text-slate-950"}`}>MemoryOS</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          <Link href="/#engines" className={`text-sm font-semibold transition ${textClass}`}>Engines</Link>
          <DropdownMenu label="Developers" columns={2} links={developerLinks} dark={dark} />
          <DropdownMenu label="Use Cases" links={useCaseLinks} dark={dark} />
          <Link href="/memory-passport" className={`text-sm font-semibold transition ${textClass}`}>Memory Passport</Link>
          <Link href="/pricing" className={`text-sm font-semibold transition ${textClass}`}>Pricing</Link>
          <DropdownMenu label="Resources" columns={2} links={resourceLinks} dark={dark} />
        </nav>

        <div className="flex items-center gap-2">
          <a href={docsHomeUrl} target="_blank" rel="noreferrer" className={`hidden h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition sm:inline-flex ${dark ? "border-white/10 text-slate-300 hover:bg-white/5" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
            <BookOpen className="size-4" /> Docs
          </a>
          <a href={dashboard} className={`hidden h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition xl:inline-flex ${dark ? "border-white/10 text-slate-300 hover:bg-white/5" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}>
            <LayoutDashboard className="size-4" /> Dashboard
          </a>
          <a href={signUpUrl("/")} className={`hidden h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold shadow-sm sm:inline-flex ${dark ? "bg-white text-black hover:bg-slate-200" : "bg-[#0D1117] text-white hover:bg-[#1B2638]"}`}>Get started</a>
          <button
            type="button"
            className={`flex size-10 items-center justify-center rounded-xl border lg:hidden ${dark ? "border-white/10 text-white" : "border-slate-200 text-slate-950"}`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className={`border-t px-4 py-5 lg:hidden ${dark ? "border-white/10 bg-[#05060a]" : "border-slate-200 bg-white"}`}>
          <div className="mx-auto grid max-w-7xl gap-2">
            {[
              ["Engines", "/#engines"],
              ["Playground", "/#playground"],
              ["Customer Support", "/use-cases/customer-support"],
              ["Education", "/use-cases/edtech"],
              ["Memory Passport", "/memory-passport"],
              ["Pricing", "/pricing"],
            ].map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setMobileOpen(false)} className={`rounded-xl px-3 py-3 text-sm font-bold ${dark ? "text-slate-200 hover:bg-white/5" : "text-slate-800 hover:bg-slate-50"}`}>{label}</Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t pt-4 border-inherit">
              <a href={docsHomeUrl} target="_blank" rel="noreferrer" className={`flex h-11 items-center justify-center rounded-xl border text-sm font-bold ${dark ? "border-white/10 text-white" : "border-slate-200 text-slate-800"}`}>Docs</a>
              <a href={signUpUrl("/")} className={`flex h-11 items-center justify-center rounded-xl text-sm font-bold ${dark ? "bg-white text-black" : "bg-slate-950 text-white"}`}>Get started</a>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
