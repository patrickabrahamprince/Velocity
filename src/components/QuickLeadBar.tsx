import React, { useState, useEffect } from 'react';
import { ArrowRight, User, Phone, Flame, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundEngine';
import { leadStore } from '../utils/leadStore';

interface QuickLeadBarProps {
  onOpenBooking: () => void;
}

export const QuickLeadBar: React.FC<QuickLeadBarProps> = ({ onOpenBooking }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [name, setName] = useState(() => localStorage.getItem('vic_prefill_name') || '');
  const [phone, setPhone] = useState(() => localStorage.getItem('vic_prefill_phone') || '');
  const [isClaimed, setIsClaimed] = useState(() => !!localStorage.getItem('vic_prefill_phone'));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your full name');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit WhatsApp number');
      return;
    }

    soundFx.playRev(1.5);
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.8 },
      colors: ['#0052FF', '#00D2FF', '#ffffff', '#2563EB']
    });

    leadStore.saveLead(name.trim(), cleanPhone, '10 Laps Pro Karting', 'Sticky Bottom Bar');
    localStorage.setItem('vic_prefill_name', name.trim());
    localStorage.setItem('vic_prefill_phone', cleanPhone);
    setIsClaimed(true);
    setIsExpanded(false);

    // Open booking modal with ₹200 preapplied
    setTimeout(() => {
      onOpenBooking();
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="rounded-full p-1 bg-gradient-to-r from-blue-500/30 via-slate-200 to-blue-500/30 border border-slate-300 shadow-2xl backdrop-blur-xl">
        <div className="rounded-full bg-white/95 px-4 sm:px-6 py-2.5 text-slate-900 flex items-center justify-between gap-3 border border-slate-200 shadow-sm">
          {!isExpanded ? (
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0052FF] to-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/40">
                  <Flame className="w-4 h-4 fill-current" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wide truncate">
                    <span className="text-[#0052FF] font-mono">₹200 OFF:</span>
                    <span>UNLOCK FIRST RACE PASS</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans truncate hidden sm:block">
                    Enter Name & WhatsApp to get coupon code VELOCITY200
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isClaimed ? (
                  <button
                    onClick={() => onOpenBooking()}
                    className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book with ₹200 Applied</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Claim ₹200</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsVisible(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title="Dismiss bar"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleClaim} className="flex flex-col sm:flex-row items-center gap-2 w-full py-1">
              <div className="relative w-full sm:w-1/3">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0052FF] focus:bg-white rounded-full pl-8 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="relative w-full sm:w-1/3">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#0052FF] focus:bg-white rounded-full pl-8 pr-3 py-2 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/30 flex items-center gap-1 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <span>Unlock</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
