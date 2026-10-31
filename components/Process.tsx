'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Palette, Code2, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Discover & Architect',
      subtitle: 'System Scoping & Roadmapping',
      icon: Compass,
      accent: '#2B3BE0',
      description:
        'We deconstruct your business goals into technical requirements. We define database schemas, LLM reasoning boundaries, security postures, and latency budgets before writing a single line of code.',
      deliverables: [
        'System Architecture Diagrams',
        'Data Schema & API Specifications',
        'Agentic AI Workflow Logic',
        'Milestone-Based Execution Roadmap',
      ],
    },
    {
      number: '02',
      title: 'Design & Prototype',
      subtitle: 'Award-Level UI/UX & Micro-interactions',
      icon: Palette,
      accent: '#7C5CFF',
      description:
        'We design bespoke interfaces built for conversion and ergonomic clarity. Interactive prototypes test real user flows, motion curves, and edge cases with zero boilerplate friction.',
      deliverables: [
        'High-Fidelity Design System in Figma',
        'Clickable Interactive Prototypes',
        'Motion & Micro-Interaction Specs',
        'WCAG AA Accessibility Audit',
      ],
    },
    {
      number: '03',
      title: 'Build & Swarm',
      subtitle: 'Full-Stack & Agentic Engineering',
      icon: Code2,
      accent: '#22C7F5',
      description:
        'Sprint-driven code delivery with typed contracts, CI/CD automated test suites, and autonomous agent integration. Every PR is peer-reviewed and tested in preview staging environments.',
      deliverables: [
        'Type-Safe Production Codebase',
        'Autonomous Agentic Swarms & LLM Logic',
        'Automated Unit & E2E Testing',
        'Real-Time Staging Previews',
      ],
    },
    {
      number: '04',
      title: 'Launch & Grow',
      subtitle: 'Zero-Downtime Release & Telemetry',
      icon: Rocket,
      accent: '#D17BEA',
      description:
        'Zero-downtime blue/green deployment to global edge infrastructure. We configure real-time telemetry, error tracking, and autonomous self-healing monitoring to guarantee 99.98% reliability.',
      deliverables: [
        'Global CDN Edge Deployment',
        'Automated Sentry & OpenTelemetry',
        'SEO & Performance Tuning (Lighthouse 90+)',
        'Dedicated SLA & Continuous Upgrades',
      ],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned horizontal scroll
    mm.add('(min-width: 1024px)', () => {
      if (!horizontalTrackRef.current || !sectionRef.current) return;

      const track = horizontalTrackRef.current;
      const totalScrollWidth = track.scrollWidth - window.innerWidth + 120;

      const horizontalTween = gsap.to(track, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        horizontalTween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-[#EEF1FF] text-[#0B1030] overflow-hidden py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-royal/10 text-royal mb-4">
          <Rocket size={14} className="text-royal" />
          <span>Proven Delivery Model</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-kalice text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#0B1030] leading-[1.06]">
              From concept to scalable production in four precise phases.
            </h2>
          </div>
          <p className="text-sm font-medium text-slate-500 max-w-xs">
            Scroll horizontally to inspect each milestone of our engineering lifecycle.
          </p>
        </div>
      </div>

      {/* Track: Horizontal on desktop, Vertical stacked on mobile */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={horizontalTrackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-10 px-4 sm:px-6 lg:px-12 w-full lg:w-max will-change-transform"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="w-full lg:w-[460px] rounded-3xl bg-white border border-[#2B3BE0]/15 p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between shrink-0"
              >
                <div>
                  {/* Step header */}
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="text-4xl font-extrabold font-mono"
                      style={{ color: step.accent }}
                    >
                      {step.number}
                    </span>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                      style={{ backgroundColor: `${step.accent}15`, color: step.accent }}
                    >
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3 className="font-kalice text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1030] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    {step.subtitle}
                  </p>

                  <p className="text-sm text-[#5A6285] leading-relaxed mb-8">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables checklist */}
                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {step.deliverables.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2.5 text-xs text-[#0B1030]/85 font-medium">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
