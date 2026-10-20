import React, { useState } from 'react';
import { BellRing, Check, Copy, Flame, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LocoFomoSectionProps {
  onOpenBooking: () => void;
}

export function LocoFomoSection({ onOpenBooking }: LocoFomoSectionProps) {
  const [contactInput, setContactInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#feb000', '#ff3366', '#00f0ff', '#ffffff']
    });

    setIsSubscribed(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('VELOCITY200');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#07090e] via-[#0d121d] to-[#07090e] border-y border-white/5 relative overflow-hidden">
      {/* Background Neon Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 bg-[#feb000]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff3366]/10 border border-[#ff3366]/30 text-[#ff3366] text-xs font-black uppercase tracking-wider mb-4">
          <BellRing className="w-3.5 h-3.5" />
          <span>Don't Miss Out</span>
        </div>

        <h2 className="font-bison text-5xl sm:text-7xl md:text-8xl text-white font-black uppercase tracking-tight mb-4">
          Feeling <span className="text-[#feb000]">FOMO?</span>
        </h2>

        <p className="max-w-xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
          Sign up & be the first to know about night floodlight GP races, secret weekend flash discounts, and new kart arrivals!
        </p>

        {!isSubscribed ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <input
              type="text"
              required
              placeholder="Enter WhatsApp Number or Email"
              value={contactInput}
              onChange={(e) => setContactInput(e.target.value)}
              className="w-full sm:flex-1 bg-[#131926] border border-white/15 focus:border-[#feb000] rounded-xl px-4 py-3.5 text-white placeholder-slate-500 text-sm font-medium focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#feb000] hover:bg-[#fcd107] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_4px_25px_rgba(254,176,0,0.4)] flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Unlock ₹200 OFF</span>
            </button>
          </form>
        ) : (
          <div className="max-w-lg mx-auto p-6 rounded-2xl bg-black/60 border-2 border-[#feb000] shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-center gap-2 text-[#feb000] font-extrabold text-sm uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Coupon Unlocked Successfully!</span>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Use code <strong className="text-white">VELOCITY200</strong> at checkout to get ₹200 off your track session.
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-dashed border-[#feb000] font-mono-tech text-lg font-black text-[#feb000]">
                <span>VELOCITY200</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 font-sans font-bold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-xl bg-[#feb000] hover:bg-[#fcd107] text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <span>Book Slot Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#feb000]" /> Instant WhatsApp delivery
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#feb000]" /> Valid for 30 days
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#feb000]" /> 100% spam-free promise
          </span>
        </div>
      </div>
    </section>
  );
}
