'use client';

import React from 'react';
import { Mail, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

interface FinalCTAProps {
  onOpenContact: (service?: string) => void;
}

export default function FinalCTA({ onOpenContact }: FinalCTAProps) {
  return (
    <section className="relative py-28 md:py-36 bg-[#070B1F] text-white overflow-hidden bg-grid-pattern">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#2B3BE0]/30 via-[#7C5CFF]/30 to-[#D17BEA]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-cyan-400/25 text-cyan-300 mb-6 backdrop-blur-sm">
          <Sparkles size={14} className="text-cyan-400" />
          <span>Ready for Deployment</span>
        </div>

        {/* Big Headline */}
        <h2 className="font-kalice text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mb-6 leading-tight">
          Have an idea?{' '}
          <span className="text-brand-gradient">Let&apos;s build it.</span>
        </h2>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Whether you need a flagship web platform, an autonomous agentic workforce, or a custom mobile product, our senior engineering team is ready to deliver.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onOpenContact('Start a project')}
            className="btn-primary px-9 py-4 text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer w-full sm:w-auto"
          >
            <span>Start a project</span>
            <ArrowRight size={18} />
          </button>
          <a
            href="mailto:info.cubicteam@gmail.com"
            className="btn-secondary px-8 py-4 text-base font-bold flex items-center justify-center gap-2.5 cursor-pointer w-full sm:w-auto"
          >
            <Mail size={18} />
            <span>info.cubicteam@gmail.com</span>
          </a>
        </div>

        {/* Note */}
        <p className="text-xs text-slate-400 mt-6">
          Typical response time: under 4 hours. NDAs provided upon request.
        </p>
      </div>
    </section>
  );
}
