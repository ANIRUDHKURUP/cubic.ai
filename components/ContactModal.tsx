'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function ContactModal({ isOpen, onClose, defaultService = 'Websites and web apps' }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: defaultService,
    budget: '$15k - $30k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate swift submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity">
      <div 
        className="relative w-full max-w-xl p-6 md:p-8 rounded-3xl bg-[#0B1030] border border-cyan-500/20 text-white shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#7C5CFF]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#22C7F5]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Message Received!</h3>
            <p className="text-slate-300 max-w-md">
              Thank you, {formData.name || 'there'}. An engineering partner from CUBIC.ai will respond within 4 business hours.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
                <Sparkles size={12} />
                <span>Start a Project</span>
              </div>
              <h2 id="contact-modal-title" className="font-kalice text-2xl md:text-3xl font-bold tracking-tight">
                Let&apos;s build something exceptional.
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Tell us about your product roadmap, agentic AI architecture, or mobile app goals.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Mercer"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B1F] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B1F] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B1F] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Area of Interest</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B1F] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm"
                  >
                    <option value="Websites and web apps">Websites & Web Apps</option>
                    <option value="Agentic AI">Agentic AI & Custom LLMs</option>
                    <option value="Android & iOS mobile apps">Android & iOS Mobile Apps</option>
                    <option value="Custom software">Custom Software & Cloud Systems</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Brief / Goals</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline what you want to build, target milestones, or existing challenges..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B1F] border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-sm resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Prefer direct email? Reach us at{' '}
                  <a href="mailto:info.cubicteam@gmail.com" className="text-cyan-400 underline hover:text-cyan-300">
                    info.cubicteam@gmail.com
                  </a>
                </span>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Send size={15} />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
