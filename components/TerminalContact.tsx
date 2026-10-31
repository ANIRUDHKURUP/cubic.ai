'use client';

import React, { useState, useRef, useEffect } from 'react';

type Step = 'email' | 'name' | 'message' | 'confirm' | 'done';

interface Line {
  type: 'system' | 'prompt' | 'input' | 'divider' | 'success';
  text: string;
}

export default function TerminalContact() {
  const [step, setStep] = useState<Step>('email');
  const [inputValue, setInputValue] = useState('');
  const [lines, setLines] = useState<Line[]>([
    { type: 'system', text: "Hey there! We're excited to link 🔗" },
    { type: 'divider', text: '' },
    { type: 'system', text: 'To start, could you give us your email?' },
  ]);
  const [formData, setFormData] = useState({ email: '', name: '', message: '' });
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (step !== 'confirm' && step !== 'done') {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [step]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, step]);

  const promptLabel: Partial<Record<Step, string>> = {
    email: 'Enter email:',
    name: 'Your name:',
    message: 'Your message:',
  };

  const reset = () => {
    setStep('email');
    setInputValue('');
    setFormData({ email: '', name: '', message: '' });
    setSending(false);
    setLines([
      { type: 'system', text: "Hey there! We're excited to link 🔗" },
      { type: 'divider', text: '' },
      { type: 'system', text: 'To start, could you give us your email?' },
    ]);
  };

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setLines(prev => [
        ...prev,
        { type: 'divider', text: '' },
        { type: 'success', text: '✓ Sent! We\'ll be in touch within 4 hours.' },
        { type: 'system', text: `→ Confirmation queued to: ${formData.email}` },
      ]);
      setStep('done');
      setSending(false);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const value = inputValue.trim();

    if (step === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setLines(prev => [
          ...prev,
          { type: 'input', text: value },
          { type: 'system', text: '⚠ That doesn\'t look valid. Try again:' },
        ]);
        setInputValue('');
        return;
      }
      setFormData(prev => ({ ...prev, email: value }));
      setLines(prev => [
        ...prev,
        { type: 'input', text: value },
        { type: 'divider', text: '' },
        { type: 'system', text: "Nice! What's your name?" },
      ]);
      setStep('name');

    } else if (step === 'name') {
      setFormData(prev => ({ ...prev, name: value }));
      setLines(prev => [
        ...prev,
        { type: 'input', text: value },
        { type: 'divider', text: '' },
        { type: 'system', text: `Hey ${value}! What would you like to build?` },
      ]);
      setStep('message');

    } else if (step === 'message') {
      const updated = { ...formData, message: value };
      setFormData(updated);
      setLines(prev => [
        ...prev,
        { type: 'input', text: value },
        { type: 'divider', text: '' },
      ]);
      setStep('confirm');
    }

    setInputValue('');
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#EEF1FF] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="text-center mb-10">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-3">
            Get in Touch
          </p>
          <h2 className="font-kalice text-4xl sm:text-5xl tracking-tight text-[#0B1030]">
            Drop us a line.
          </h2>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-300/60">
          {/* macOS Title Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#2B2B2B]">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] inline-block border border-red-700/40" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] inline-block border border-yellow-700/40" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#27C840] inline-block border border-green-700/40" />
            <span className="flex-1 text-center text-xs font-mono text-slate-400 -ml-14 select-none">
              info.cubicteam@gmail.com
            </span>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalRef}
            className="bg-[#1C1C2E] min-h-[300px] max-h-[500px] overflow-y-auto p-6 font-mono text-sm leading-relaxed cursor-text"
            onClick={() => { if (step !== 'confirm' && step !== 'done') inputRef.current?.focus({ preventScroll: true }); }}
          >
            {/* Rendered History Lines */}
            {lines.map((line, i) => {
              if (line.type === 'divider') {
                return (
                  <div key={i} className="border-t border-[#2E2E45] my-3" />
                );
              }
              if (line.type === 'success') {
                return (
                  <div key={i} className="text-emerald-400 mb-1">{line.text}</div>
                );
              }
              if (line.type === 'input') {
                return (
                  <div key={i} className="text-white mb-1 flex items-start gap-2">
                    <span className="text-emerald-400 select-none">→</span>
                    <span className="text-slate-400 select-none">~</span>
                    <span>{line.text}</span>
                  </div>
                );
              }
              return (
                <div key={i} className="mb-1">
                  {line.text.includes('your email') ? (
                    <span className="text-slate-200">
                      To start, could you give us{' '}
                      <span className="text-[#7C5CFF]">your email?</span>
                    </span>
                  ) : line.text.startsWith('⚠') ? (
                    <span className="text-amber-400">{line.text}</span>
                  ) : line.text.startsWith('→ Confirmation') ? (
                    <span className="text-[#22C7F5] text-xs">{line.text}</span>
                  ) : (
                    <span className="text-slate-200">{line.text}</span>
                  )}
                </div>
              );
            })}

            {/* Confirmation Summary */}
            {step === 'confirm' && (
              <div className="mt-1">
                <div className="space-y-1 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[#22C7F5] w-20">email:</span>
                    <span className="text-white">{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#22C7F5] w-20">name:</span>
                    <span className="text-white">{formData.name}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#22C7F5] w-20 shrink-0">description:</span>
                    <span className="text-white">{formData.message}</span>
                  </div>
                </div>

                <div className="text-slate-200 mb-5">Look good?</div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={reset}
                    className="px-5 py-2 rounded-lg bg-[#2E2E45] hover:bg-[#3B3B55] text-white text-sm font-mono transition-colors cursor-pointer border border-white/10"
                  >
                    Restart
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={sending}
                    className="px-5 py-2 rounded-lg bg-[#7C5CFF] hover:bg-[#6a4de0] text-white text-sm font-mono transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(124,92,255,0.4)]"
                  >
                    {sending ? 'Sending…' : 'Send it!'}
                  </button>
                </div>
              </div>
            )}

            {/* Active Input Line */}
            {step !== 'confirm' && step !== 'done' && (
              <form onSubmit={handleSubmit} className="flex items-center mt-2">
                <span className="text-emerald-400 mr-2 select-none">→</span>
                <span className="text-slate-400 mr-2 select-none">~</span>
                <span className="text-slate-500 mr-2 whitespace-nowrap select-none">
                  {promptLabel[step]}
                </span>
                <input
                  ref={inputRef}
                  type={step === 'email' ? 'email' : 'text'}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  className="flex-1 bg-transparent text-white caret-emerald-400 outline-none border-none min-w-0"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
              </form>
            )}

            {/* Done — restart link */}
            {step === 'done' && (
              <div className="mt-4">
                <button
                  onClick={reset}
                  className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors cursor-pointer underline underline-offset-2"
                >
                  → Start a new conversation
                </button>
              </div>
            )}
          </div>

          {/* Status bar */}
          <div className="bg-[#14141F] px-4 py-2 flex items-center justify-between text-[10px] font-mono text-slate-600 border-t border-white/5 select-none">
            <span>
              CUBIC.ai Terminal <span className="text-emerald-600">●</span> Connected
            </span>
            <span>
              {step === 'done'
                ? 'Transmission complete'
                : step === 'confirm'
                ? 'Review your details'
                : `Step ${step === 'email' ? 1 : step === 'name' ? 2 : 3}/3 — Press ↵ to continue`}
            </span>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 font-mono mt-4">
          Or reach us at{' '}
          <a href="mailto:info.cubicteam@gmail.com" className="text-[#2B3BE0] hover:underline">
            info.cubicteam@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
