'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      id: 'uptime',
      target: 99.98,
      decimals: 2,
      suffix: '%',
      label: 'System Uptime & Reliability',
      sublabel: 'Guaranteed by self-healing agentic infrastructure',
      icon: ShieldCheck,
    },
    {
      id: 'velocity',
      target: 4.2,
      decimals: 1,
      suffix: 'x',
      label: 'Average Client Velocity',
      sublabel: 'Time-to-market acceleration vs traditional dev agencies',
      icon: TrendingUp,
    },
    {
      id: 'requests',
      target: 50,
      decimals: 0,
      suffix: 'M+',
      label: 'Daily API & Agent Inferences',
      sublabel: 'Handled with sub-millisecond edge latency',
      icon: Zap,
    },
    {
      id: 'shipped',
      target: 100,
      decimals: 0,
      suffix: '+',
      label: 'Production Systems Shipped',
      sublabel: 'Web applications, AI agents & native mobile apps',
      icon: Award,
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !countersRef.current) return;

    const counterElements = countersRef.current.querySelectorAll('.stat-number');

    counterElements.forEach((el, index) => {
      const targetVal = stats[index].target;
      const decimals = stats[index].decimals;
      const suffix = stats[index].suffix;
      const obj = { val: 0 };

      gsap.to(obj, {
        val: targetVal,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        onUpdate: () => {
          if (el) {
            el.textContent = `${obj.val.toFixed(decimals)}${suffix}`;
          }
        },
      });
    });
  }, []);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0F1646] text-white border-y border-cyan-500/15 overflow-hidden bg-grid-pattern"
    >
      {/* Background radial accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#2B3BE0]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-cyan-300 border border-cyan-400/20 mb-4">
            <Award size={14} className="text-cyan-400" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="font-kalice text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mb-4 leading-tight">
            Measured in impact, uptime, and velocity.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Our systems run mission-critical workflows for tech founders, fast-scaling startups, and enterprise teams globally.
          </p>
        </div>

        {/* Four Animated Counters Grid */}
        <div
          ref={countersRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="relative rounded-3xl p-8 glass-panel-dark border border-cyan-500/20 text-center flex flex-col items-center justify-between group hover:border-cyan-400/50 hover:bg-[#070B1F]/90 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>

                <div className="mb-2">
                  <span className="stat-number text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-glow-gradient inline-block">
                    {stat.target}
                    {stat.suffix}
                  </span>
                </div>

                <h3 className="font-kalice text-lg font-bold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {stat.sublabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
