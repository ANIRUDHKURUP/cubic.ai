'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Bot, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  GitBranch, 
  Database, 
  ShieldCheck, 
  Terminal, 
  Play, 
  RotateCcw,
  ArrowRight,
  Zap,
  Activity
} from 'lucide-react';

interface AgenticAIProps {
  onOpenContact: (service?: string) => void;
}

export default function AgenticAI({ onOpenContact }: AgenticAIProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const checklistItems = [
    {
      title: 'Autonomous Multi-Agent Swarms',
      desc: 'Hierarchical planner and specialist subagents collaborating simultaneously across code, data, and user workflows.',
    },
    {
      title: 'Deterministic Verification & Guardrails',
      desc: 'Zero hallucination risk with type-checked outputs, automated sandboxed unit testing, and human-in-the-loop approvals.',
    },
    {
      title: 'Private Enterprise RAG & Context Memory',
      desc: 'Seamless ingestion of your proprietary APIs, documentation, databases, and communication channels without data leakage.',
    },
    {
      title: 'Self-Healing Execution Loops',
      desc: 'When an API fails or rate-limits, agents dynamically diagnose exceptions, inspect alternatives, and auto-correct in real time.',
    },
    {
      title: 'Full Auditability & Telemetry',
      desc: 'Every reasoning step, token expenditure, and tool invocation is traced with OpenTelemetry and recorded for compliance.',
    },
  ];

  const workflowSteps = [
    {
      id: 'trigger',
      title: '1. Event Trigger & Ingestion',
      detail: 'Webhook: "Deploy localized checkout to APAC"',
      status: 'RESOLVED',
      agent: 'EventRouter',
      color: '#22C7F5',
    },
    {
      id: 'reasoning',
      title: '2. Reasoning & Task Decomposition',
      detail: 'Planner broken into 3 parallel execution branches',
      status: 'PLANNING',
      agent: 'Orchestrator-Prime',
      color: '#7C5CFF',
    },
    {
      id: 'tools',
      title: '3. Swarm Tool Execution',
      detail: 'Calling Stripe SDK, i18n vector index & GitHub PR',
      status: 'EXECUTING',
      agent: 'Specialist-Swarm',
      color: '#D17BEA',
    },
    {
      id: 'verify',
      title: '4. Deterministic Sandboxed Verification',
      detail: '34/34 tests passed • zero vulnerability scan',
      status: 'VERIFIED',
      agent: 'QualitySentinel',
      color: '#10B981',
    },
  ];

  // Auto-cycle through the workflow steps
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isRunning, workflowSteps.length]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !checklistRef.current) return;

    gsap.fromTo(
      checklistRef.current.children,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: checklistRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section
      id="agentic-ai"
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-[#070B1F] text-white overflow-hidden bg-grid-pattern"
    >
      {/* Background radial glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#2B3BE0]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-[#7C5CFF]/25 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-20 right-1/3 w-[400px] h-[400px] bg-[#22C7F5]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-4">
            <Bot size={14} className="text-cyan-400" />
            <span>Autonomous Intelligence</span>
          </div>
          <h2 className="font-kalice text-4xl sm:text-5xl md:text-6xl tracking-tight text-white mb-5 leading-tight">
            Beyond chatbots. True agentic systems that execute end-to-end.
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            We architect self-orchestrating AI agents capable of planning multi-step strategies, interacting with internal databases, writing code, executing APIs, and validating their own results safely.
          </p>
        </div>

        {/* 2-Column Split: Checklist on Left, Animated Workflow Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Checklist */}
          <div ref={checklistRef} className="lg:col-span-6 space-y-6">
            {checklistItems.map((item, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 p-5 rounded-2xl glass-panel-dark transition-all duration-300 hover:border-cyan-400/40 hover:bg-[#0F1646]/80"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="font-kalice text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <button
                onClick={() => onOpenContact('Agentic AI Strategy')}
                className="btn-primary px-7 py-3 text-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule an AI Architecture Session</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Right Column: Animated Agent Workflow Panel */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl glass-panel-dark p-6 sm:p-8 border border-cyan-500/30 shadow-2xl backdrop-blur-2xl">
              {/* Panel Header */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-pulse" />
                  <h4 className="text-base font-bold font-mono text-white tracking-wide">
                    CUBIC_SWARM_RUNTIME :: v3.4
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 hover:bg-white/10 text-slate-300 flex items-center gap-1.5 transition-colors"
                  >
                    {isRunning ? (
                      <>
                        <Activity size={12} className="text-cyan-400" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play size={12} className="text-emerald-400" />
                        <span>RUN</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveStep(0)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="Reset simulation"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>

              {/* Live Flow Steps */}
              <div className="space-y-4">
                {workflowSteps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isDone = activeStep > idx;

                  return (
                    <div
                      key={step.id}
                      onClick={() => setActiveStep(idx)}
                      className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border ${
                        isActive
                          ? 'bg-[#0F1646] border-cyan-400 shadow-[0_0_25px_rgba(34,199,245,0.2)] scale-[1.02]'
                          : isDone
                          ? 'bg-white/5 border-emerald-500/30 opacity-80'
                          : 'bg-white/[0.02] border-white/5 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {step.title}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${step.color}20`,
                            color: step.color,
                            border: `1px solid ${step.color}40`,
                          }}
                        >
                          {isActive ? 'PROCESSING' : isDone ? 'COMPLETE' : 'QUEUED'}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white mb-2 font-mono">
                        {step.detail}
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-1">
                          <Cpu size={12} className="text-cyan-400" />
                          <span>{step.agent}</span>
                        </span>
                        <span>Latency: {idx * 45 + 18}ms</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Live Terminal Output */}
              <div className="mt-6 p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                  <Terminal size={12} />
                  <span>Telemetry Stream</span>
                </div>
                <div className="text-[11px] text-slate-400 space-y-0.5">
                  <p>
                    <span className="text-emerald-400">[OK]</span> Verification checks: 0 vulnerabilities found
                  </p>
                  <p>
                    <span className="text-cyan-400">[LOG]</span> Deployed to production edge node cluster: us-east, eu-west, ap-south
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
