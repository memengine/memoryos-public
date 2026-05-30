import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  Code2,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  LifeBuoy,
  Network,
  Plug,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { docsUrl } from "@/lib/docs";
import { salesMailUrl, signUpUrl, tenantAppUrl as getTenantAppUrl } from "@/lib/urls";

type MenuLink = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

function DropdownMenu({
  label,
  columns = 1,
  links,
}: {
  label: string;
  columns?: 1 | 2;
  links: MenuLink[];
}) {
  return (
    <div className="group relative flex h-20 items-center">
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-semibold text-slate-600 transition group-hover:text-slate-950"
      >
        {label}
        <ChevronDown className="size-3.5 transition group-hover:rotate-180" />
      </button>
      <div
        className={`invisible absolute left-1/2 top-[4.75rem] z-50 -translate-x-1/2 translate-y-2 rounded-2xl border border-slate-200 bg-white p-3 text-left opacity-0 shadow-2xl shadow-slate-950/10 transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
          columns === 2 ? "w-[660px]" : "w-[400px]"
        }`}
      >
        <div className="px-3 pb-2 pt-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
          {label}
        </div>
        <div className="h-px bg-slate-100" />
        <div className={`grid gap-1 pt-2 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
          {links.map((item) => {
            const Icon = item.icon ?? Sparkles;
            const content = (
              <span className="flex gap-3 rounded-xl p-3 transition hover:bg-slate-50">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#2E75B6]">
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-black text-slate-950">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm font-medium leading-5 text-slate-500">
                    {item.description}
                  </span>
                </span>
              </span>
            );

            if (item.external) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={item.title} href={item.href}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const tenantAppUrl = getTenantAppUrl();
  const docsHomeUrl = docsUrl("/");

  const developerLinks: MenuLink[] = [
    {
      title: "SDK + API",
      description: "Use Python, TypeScript, or REST from your backend.",
      href: "/#developers",
      icon: Code2,
    },
    {
      title: "MCP Server",
      description: "Give MCP-compatible agents MemoryOS tools.",
      href: "/#developers",
      icon: Plug,
    },
    {
      title: "Memory Passport",
      description: "Generate consent URLs and read shared context.",
      href: "/memory-passport",
      icon: Network,
    },
    {
      title: "Documentation",
      description: "Quickstarts, concepts, guides, and API usage.",
      href: docsHomeUrl,
      external: true,
      icon: BookOpen,
    },
  ];

  const useCaseLinks: MenuLink[] = [
    {
      title: "Customer Support",
      description: "Remember accounts, open issues, and resolution preferences.",
      href: "/use-cases/customer-support",
      icon: Headphones,
    },
    {
      title: "Education",
      description: "Personalized tutoring memory for each learner.",
      href: "/use-cases/edtech",
      icon: GraduationCap,
    },
  ];

  const resourceLinks: MenuLink[] = [
    {
      title: "Docs",
      description: "Integrate MemoryOS into your product.",
      href: docsHomeUrl,
      external: true,
      icon: BookOpen,
    },
    {
      title: "Security",
      description: "Tenant isolation, API keys, PII safety, and auditability.",
      href: "/#passport",
      icon: ShieldCheck,
    },
    {
      title: "Pricing",
      description: "Free, Starter, Growth, and Enterprise plans.",
      href: "/pricing",
      icon: Sparkles,
    },
    {
      title: "Support",
      description: "Reach us for sales, verification, or production onboarding.",
      href: salesMailUrl(),
      external: true,
      icon: LifeBuoy,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#0D1117] text-sm font-bold text-white shadow-sm">
            M
          </span>
          <span className="text-sm font-black uppercase tracking-[0.24em] text-slate-950">
            MemoryOS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
          <Link href="/#memory-engines" className="transition hover:text-slate-950">
            Engines
          </Link>
          <DropdownMenu label="Developers" columns={2} links={developerLinks} />
          <DropdownMenu label="Use Cases" links={useCaseLinks} />
          <Link href="/memory-passport" className="transition hover:text-slate-950">
            Memory Passport
          </Link>
          <Link href="/pricing" className="transition hover:text-slate-950">
            Pricing
          </Link>
          <DropdownMenu label="Resources" columns={2} links={resourceLinks} />
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={docsHomeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
          >
            <BookOpen className="size-4" />
            Docs
          </a>
          <Link
            href={tenantAppUrl}
            className="hidden h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
          <Link
            href={signUpUrl("/")}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#0D1117] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1B2638]"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
