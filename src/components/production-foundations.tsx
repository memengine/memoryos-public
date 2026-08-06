"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  ArrowRight,
  Clock3,
  Gauge,
  GitBranch,
  SearchCheck,
  ShieldCheck,
  Waypoints,
} from "lucide-react";

import { signUpUrl } from "@/lib/urls";

const productionControls = [
  { icon: SearchCheck, title: "Quality gates", body: "Block duplicate, low-signal, over-budget, or rate-limited writes before they pollute memory." },
  { icon: GitBranch, title: "Conflict resolution", body: "Use authority, source truth, recency, and explicit review paths instead of storing contradictions forever." },
  { icon: Waypoints, title: "Provenance", body: "Track which service wrote a memory, what evidence produced it, and why retrieval trusts it." },
  { icon: Clock3, title: "Lifecycle controls", body: "Reinforce useful memory, archive stale facts, preserve versions, and handle corrections without losing history." },
  { icon: Gauge, title: "Graceful degradation", body: "Keep your product responsive when quotas or dependencies force a partial memory experience." },
  { icon: ShieldCheck, title: "Tenant isolation", body: "Keep customer memory scoped to the right tenant, user, agent, and permission boundary." },
];

export function ProductionFoundations() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef({ top: 0, travel: 0, scrollSpan: 1 });
  const frameRef = useRef<number | null>(null);

  const updatePosition = useCallback(() => {
    frameRef.current = null;
    const track = trackRef.current;
    if (!track) return;

    const { top, travel, scrollSpan } = metricsRef.current;
    const progress = Math.min(1, Math.max(0, (window.scrollY - top) / scrollSpan));
    track.style.transform = `translate3d(${-travel * progress}px, 0, 0)`;
  }, []);

  const requestUpdate = useCallback(() => {
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(updatePosition);
  }, [updatePosition]);

  const measure = useCallback(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const desktop = window.matchMedia("(min-width: 1025px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const horizontal = desktop && !reducedMotion;
    section.classList.toggle("is-horizontal", horizontal);

    if (!horizontal) {
      section.style.height = "auto";
      track.style.transform = "none";
      metricsRef.current = { top: 0, travel: 0, scrollSpan: 1 };
      return;
    }

    const travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
    const travelScroll = Math.max(travel * 1.05, travel + 80);
    const endHold = 64;
    section.style.height = `${window.innerHeight + travelScroll + endHold}px`;

    const top = section.getBoundingClientRect().top + window.scrollY;
    metricsRef.current = { top, travel, scrollSpan: Math.max(1, travelScroll) };
    requestUpdate();
  }, [requestUpdate]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", requestUpdate);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [measure, requestUpdate]);

  return (
    <section ref={sectionRef} id="production" className="production-foundations bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="production-foundations__sticky mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div><p className="text-sm font-black uppercase tracking-[0.24em] text-violet-700">Production foundations</p><h2 className="mt-4 text-4xl font-black sm:text-5xl">Reliable after the demo.</h2></div>
          <p className="text-xl leading-9 text-slate-600">MemoryOS provides the controls teams usually discover only after their first memory prototype reaches real users.</p>
        </div>

        <div ref={viewportRef} className="production-foundations__viewport relative mt-10 overflow-hidden">
          <div ref={trackRef} className="production-foundations__track flex flex-col gap-5 will-change-transform">
            {productionControls.map((item) => {
              const Icon = item.icon;
              return <article key={item.title} className="production-foundations__card shrink-0 rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-xl"><span className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700"><Icon className="size-5" /></span><h3 className="mt-8 text-xl font-black">{item.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p></article>;
            })}
          </div>
          <div aria-hidden="true" className="production-foundations__fade production-foundations__fade--left pointer-events-none absolute inset-y-0 left-0 w-16" />
          <div aria-hidden="true" className="production-foundations__fade production-foundations__fade--right pointer-events-none absolute inset-y-0 right-0 w-20" />
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-[1.5rem] bg-violet-100 p-7 sm:flex-row sm:items-center">
          <div><p className="font-black text-violet-950">Inspect what MemoryOS stores and why.</p><p className="mt-2 text-sm text-violet-900/70">Use the dashboard for API keys, users, usage, schemas, quality logs, and domain-specific views.</p></div>
          <a href={signUpUrl("/")} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 text-sm font-black text-white">Create a workspace <ArrowRight className="size-4" /></a>
        </div>
      </div>
    </section>
  );
}
