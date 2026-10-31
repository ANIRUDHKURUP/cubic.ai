'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  Bot, 
  Smartphone, 
  Cpu, 
  Check, 
  ArrowUpRight, 
  Sparkles, 
  Code, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

interface ServicesProps {
  onOpenContact: (service?: string) => void;
}

export default function Services({ onOpenContact }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: 'web-apps',
      title: 'Websites & Web Apps',
      tagline: 'High-converting, hyper-responsive digital flagships',
      icon: Globe,
      accent: '#2B3BE0',
      bullets: [
        'Marketing platforms & brand flagships engineered for speed',
        'Next.js & React full-stack SaaS with reactive state management',
        'Headless e-commerce with seamless Stripe & global checkout',
        'Sub-second Lighthouse scores and strict WCAG accessibility',
      ],
      techBadge: 'Next.js • TypeScript • Tailwind • Edge',
    },
    {
      id: 'agentic-ai',
      title: 'Agentic AI & Custom LLMs',
      tagline: 'Autonomous swarms that think, reason, and act',
      icon: Bot,
      accent: '#7C5CFF',
      bullets: [
        'Multi-agent workflow loops with automated error self-healing',
        'Custom enterprise RAG with secure local or private vector stores',
        'Autonomous API calling, data extraction, and scheduled background jobs',
        'Human-in-the-loop oversight dashboards and deterministic auditing',
      ],
      techBadge: 'Claude • OpenAI • LangGraph • Vector DBs',
    },
    {
      id: 'mobile-apps',
      title: 'Android & iOS Mobile Apps',
      tagline: 'Silky 120fps native & cross-platform applications',
      icon: Smartphone,
      accent: '#22C7F5',
      bullets: [
        'Fluid gestures, haptics, and zero-jank 120fps animations',
        'Offline-first sync architectures with encrypted local storage',
        'Push notifications, deep-linking, and Apple/Google in-app purchases',
        'Direct App Store & Google Play automated release pipelines',
      ],
      techBadge: 'React Native • Flutter • Swift • Kotlin',
    },
    {
      id: 'custom-software',
      title: 'Custom Software & APIs',
      tagline: 'Mission-critical enterprise tools and high-load backends',
      icon: Cpu,
      accent: '#D17BEA',
      bullets: [
        'High-throughput microservices and distributed event-driven systems',
        'Executive business intelligence dashboards and internal portals',
        'Legacy infrastructure modernization and secure database migrations',
        'Zero-downtime containerized deployments on AWS, GCP, and Kubernetes',
      ],
      techBadge: 'Go • Node.js • PostgreSQL • Docker • K8s',
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !cardsRef.current) return;

    const cards = cardsRef.current.children;

    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#EEF1FF] text-[#0B1030] overflow-hidden bg-grid-pattern-light"
    >
      {/* Subtle background ambient accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-royal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-royal/10 text-royal mb-4">
            <Sparkles size={14} className="text-royal" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="font-kalice text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06] text-[#0B1030] mb-5">
            Engineering precision for every layer of your digital product.
          </h2>
          <p className="text-lg text-[#5A6285] leading-relaxed">
            From modern web flagships to intelligent autonomous AI workflows, we design and build enterprise-grade software that scales effortlessly without technical compromise.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative rounded-3xl p-8 sm:p-10 bg-white border border-[#2B3BE0]/15 shadow-sm hover:shadow-2xl hover:border-royal/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Glow hint on hover */}
                <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-royal/10 via-cyan/10 to-orchid/10 -z-10 blur-sm" />

                <div>
                  {/* Top Icon and Action */}
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-md"
                      style={{ backgroundColor: `${service.accent}15`, color: service.accent }}
                    >
                      <Icon size={28} />
                    </div>
                    <button
                      onClick={() => onOpenContact(service.title)}
                      className="p-2.5 rounded-full bg-slate-100 hover:bg-royal hover:text-white text-slate-600 transition-colors duration-200 cursor-pointer"
                      aria-label={`Inquire about ${service.title}`}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-kalice text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1030] mb-2 group-hover:text-royal transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm font-medium text-[#5A6285] mb-6">
                    {service.tagline}
                  </p>

                  {/* Bullet list */}
                  <ul className="space-y-3 mb-8">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#0B1030]/85 leading-relaxed">
                        <div className="w-5 h-5 rounded-full bg-royal/10 text-royal flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer of Card: Tech Badge & CTA */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                    {service.techBadge}
                  </span>
                  <button
                    onClick={() => onOpenContact(service.title)}
                    className="text-xs font-bold text-royal hover:text-royal/80 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Discuss project</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
