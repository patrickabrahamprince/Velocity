import React, { useState } from 'react';
import { Phone, MessageCircle, X, ChevronRight, User, Sparkles } from 'lucide-react';
import { leadStore } from '../utils/leadStore';

interface FloatingWidgetsProps {
  onOpenBooking: () => void;
}

export function FloatingWidgets({ onOpenBooking }: FloatingWidgetsProps) {
  const [isWaOpen, setIsWaOpen] = useState(false);
  const [waName, setWaName] = useState(() => localStorage.getItem('vic_prefill_name') || '');
  const [waPhone, setWaPhone] = useState(() => localStorage.getItem('vic_prefill_phone') || '');
  const [selectedTopic, setSelectedTopic] = useState('Pricing and Combos Offers');

  const handleSendWhatsApp = () => {
    if (waName.trim() && waPhone.trim()) {
      const clean = waPhone.replace(/\D/g, '').slice(-10);
      leadStore.saveLead(waName.trim(), clean, selectedTopic, 'Floating WhatsApp Concierge');
      localStorage.setItem('vic_prefill_name', waName.trim());
      localStorage.setItem('vic_prefill_phone', clean);
    }

    const greeting = waName.trim() ? `My name is ${waName.trim()}. ` : '';
    const text = encodeURIComponent(
      `Hi Velocity International Circuit! ${greeting}I would like to enquire about: ${selectedTopic}. Please share details & confirm slot availability.`
    );
    window.open(`https://wa.me/919071718620?text=${text}`, '_blank');
    setIsWaOpen(false);
  };

  return (
    <>
      {/* Floating WhatsApp Concierge docked on bottom-left, maintaining clean symmetry with HUD on bottom-right */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start">
        {/* Interactive Popup Box */}
        {isWaOpen && (
          <div className="mb-3 w-80 sm:w-96 bg-[#0B0E17]/95 border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#0E1524] to-[#141B2D] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
                    Velocity Concierge
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <p className="text-[11px] text-slate-400">Direct Pit Lane Desk • Avg reply 2 min</p>
                </div>
              </div>
              <button
                onClick={() => setIsWaOpen(false)}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3.5 text-xs text-slate-200">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0052FF]/15 border border-[#0052FF]/30 text-[#38BDF8] text-[11px] font-semibold">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Instant ₹200 voucher applied to your WhatsApp reply</span>
              </div>

              {/* Name field */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={waName}
                    onChange={(e) => setWaName(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/10 focus:border-emerald-500/60 rounded-xl pl-10 pr-3 py-2.5 text-white font-medium focus:outline-none transition-colors text-xs"
                  />
                </div>
              </div>

              {/* Phone field */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                  WhatsApp Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    placeholder="e.g. 98765 43210"
                    value={waPhone}
                    onChange={(e) => setWaPhone(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/10 focus:border-emerald-500/60 rounded-xl pl-10 pr-3 py-2.5 text-white font-mono font-medium focus:outline-none transition-colors text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                  What would you like to plan?
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full bg-[#121624] border border-white/10 rounded-xl px-3 py-2.5 text-white font-medium focus:outline-none focus:border-emerald-500/60 transition-colors text-xs cursor-pointer"
                >
                  <option value="Pricing and Combos Offers">⚡ Pricing & Combo Passes</option>
                  <option value="Track Booking & Lap Passes">🏎️ 10 / 15 Lap Track Slots</option>
                  <option value="Birthday Party & Corporate GP">🎂 Birthday & Corporate Grand Prix</option>
                  <option value="2-Seater Tandem Parent+Kid Karts">👨‍👩‍👧 2-Seater Tandem Karts</option>
                  <option value="Superbike Sunrise Apex Session">🏍️ Superbike Sunrise Track Days</option>
                  <option value="Apex Cafe Table Reservation">🍕 Apex Rooftop Cafe Booking</option>
                  <option value="Other Questions">💬 General Track Question</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Start WhatsApp Concierge</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsWaOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-2 px-4 rounded-xl font-medium text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-center cursor-pointer"
                >
                  Or Book Directly Online (Fast-Track)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Pill Launcher */}
        <button
          onClick={() => setIsWaOpen(!isWaOpen)}
          aria-label="Open WhatsApp Support"
          className="group flex items-center gap-2.5 bg-[#0B0E17]/90 hover:bg-[#121726] border border-white/10 hover:border-emerald-500/40 px-4 py-2.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
            VIP Concierge
          </span>
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
          </div>
        </button>
      </div>
    </>
  );
}
