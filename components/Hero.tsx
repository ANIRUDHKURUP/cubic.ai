'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenContact: (service?: string) => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Clean, subtle intro timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');

      if (headlineLines && headlineLines.length > 0) {
        tl.fromTo(
          headlineLines,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
        );
      }

      if (subtextRef.current) {
        tl.fromTo(
          subtextRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, duration: 0.6 },
          '-=0.4'
        );
      }

      if (ctaGroupRef.current) {
        tl.fromTo(
          ctaGroupRef.current.children,
          { opacity: 0, y: 15 },
          { opacity: 1, duration: 0.5, stagger: 0.08 },
          '-=0.3'
        );
      }

      if (logoWrapperRef.current) {
        tl.fromTo(
          logoWrapperRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.7 },
          '-=0.4'
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[88vh] pt-32 pb-16 md:pt-40 md:pb-24 bg-white text-black overflow-hidden flex items-center"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Minimal Headline, Copy & Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Minimal Brand Tag */}
            <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-6">
              Engineering &bull; Agentic AI &bull; Mobile
            </div>

            {/* Editorial Serif Headline */}
            <h1
              ref={headlineRef}
              className="font-kalice text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight leading-[0.95] text-black mb-8 select-none"
            >
              <span className="block headline-line overflow-hidden">Meet</span>
              <span className="block headline-line overflow-hidden">Cubic.ai</span>
            </h1>

            {/* Clean, Minimal Subtext */}
            <p
              ref={subtextRef}
              className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed mb-10"
            >
              We build high-performance web applications, autonomous agentic AI swarms, iOS &amp; Android apps, and scalable custom platforms designed for ambitious modern teams.
            </p>

            {/* Minimal Buttons from Photo 1 */}
            <div
              ref={ctaGroupRef}
              className="flex flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => onOpenContact('Start a project')}
                className="bg-black hover:bg-neutral-800 text-white px-7 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98]"
              >
                <span>Start a project</span>
                <span className="text-base leading-none">&rarr;</span>
              </button>
              <a
                href="#services"
                className="bg-transparent hover:bg-black/5 text-black border border-black/80 px-7 py-3 rounded-full text-sm font-medium flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <span>Explore Services</span>
              </a>
            </div>

            {/* Minimal Trust Indicator */}
            <div className="mt-12 pt-6 border-t border-slate-100 w-full flex items-center gap-6 text-xs text-slate-500 font-medium">
              <span>Zero Technical Debt</span>
              <span>&bull;</span>
              <span>Autonomous AI Agents</span>
              <span>&bull;</span>
              <span>Enterprise SLA</span>
            </div>
          </div>

          {/* Right Column: Clean, Static Emblem & Minimal Terminal */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div
              ref={logoWrapperRef}
              className="relative w-full max-w-md flex flex-col items-center justify-center"
            >
              {/* Emblem */}
              <div
                className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-92 md:h-92 select-none pointer-events-none drop-shadow-lg"
              >
                <Image
                  src="/assets/logo.png"
                  alt="CUBIC.ai Emblem"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Minimal Terminal Card */}
              <div
                ref={terminalRef}
                className="relative lg:-mt-14 w-full max-w-sm rounded-2xl bg-[#0B1030] p-4 text-white shadow-xl border border-slate-800"
              >
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-1 text-[11px] font-mono text-slate-400">
                      cubic-agent.sh
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-cyan-300">
                    ACTIVE
                  </span>
                </div>

                <div className="space-y-1 font-mono text-xs">
                  <div className="text-slate-300 flex items-center gap-2">
                    <span className="text-cyan-400">$</span>
                    <span>cubic deploy --target global</span>
                  </div>
                  <div className="text-slate-400 text-[11px] pl-3">
                    &bull; Multi-agent orchestrator: Ready
                  </div>
                  <div className="text-slate-400 text-[11px] pl-3">
                    &bull; Edge latency: &lt; 20ms
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400 border-t border-white/5">
                    <span className="text-slate-300">Status</span>
                    <span className="text-emerald-400 font-bold">99.98% uptime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
