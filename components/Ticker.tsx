'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  Bot, 
  Smartphone, 
  Layers, 
  Cpu, 
  Workflow, 
  Database, 
  Zap, 
  Code2 
} from 'lucide-react';

export default function Ticker() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const items = [
    { label: 'Websites & Web Apps', icon: Globe },
    { label: 'Autonomous Agentic AI', icon: Bot },
    { label: 'iOS & Android Native Apps', icon: Smartphone },
    { label: 'Custom Enterprise Software', icon: Layers },
    { label: 'Multi-Agent Swarm Orchestration', icon: Cpu },
    { label: 'End-to-End Workflow Automation', icon: Workflow },
    { label: 'High-Throughput Distributed APIs', icon: Database },
    { label: 'Sub-Millisecond Edge Deployments', icon: Zap },
    { label: 'Full-Stack Architecture', icon: Code2 },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !trackRef.current) return;

    // Continuous marquee movement
    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 24,
      repeat: -1,
    });

    // Speed up with scroll velocity
    const observer = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity() / 350);
        const targetScale = Math.min(Math.max(1, 1 + velocity), 4.5);
        
        gsap.to(tween, {
          timeScale: targetScale,
          duration: 0.3,
          overwrite: 'auto',
          onComplete: () => {
            gsap.to(tween, { timeScale: 1, duration: 1.2, ease: 'power1.out' });
          },
        });
      },
    });

    return () => {
      observer.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={tickerRef}
      className="relative w-full py-4 bg-[#EEF1FF] border-y border-slate-200 overflow-hidden select-none"
      aria-label="Services Ticker"
    >
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#EEF1FF] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#EEF1FF] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div ref={trackRef} className="flex items-center gap-6 whitespace-nowrap will-change-transform w-max">
        {/* Render twice for continuous loop */}
        {[...items, ...items].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200/90 text-slate-800 text-sm font-semibold tracking-wide shadow-sm"
            >
              <Icon size={16} className="text-royal shrink-0" />
              <span>{item.label}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-royal/40 ml-2 inline-block" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
