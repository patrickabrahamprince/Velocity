import React from 'react';
import { Check, X, Gift, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface WhyBookOnlineSectionProps {
  onOpenBooking: () => void;
}

export const WhyBookOnlineSection: React.FC<WhyBookOnlineSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="why-book" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-white/[0.06] border border-blue-200 dark:border-white/[0.12] text-xs font-semibold tracking-[0.16em] uppercase text-blue-700 dark:text-sky-300 font-apple-display shadow-sm">
            <Gift className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#00D2FF]" />
            <span>VIP Online Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-5xl font-asphalt text-slate-950 dark:text-white leading-[1.05] tracking-[-0.03em]">
            Why Book Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00D2FF]">Instead of Walking In?</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-white/70 font-normal font-apple-text leading-relaxed">
            Skip the 45-minute paddock wait, unlock instant ₹200 savings with coupon VELOCITY200, and get your transponder lap telemetry delivered straight to your WhatsApp.
          </p>
        </div>

        {/* Comparison: Walk-in vs Online Booking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Walk-In */}
          <div className="rounded-[30px] p-7 sm:p-9 bg-white dark:bg-[#0A0E1F]/80 border border-slate-200 dark:border-white/10 flex flex-col justify-between shadow-sm dark:shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                <div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    Ticket Counter
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
                    Walking In
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 flex items-center justify-center font-bold">
                  <X className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5 border border-rose-500/20">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">45 to 90 min queue:</strong> On weekends, heats fill up fast and walk-ins wait in paddock lines.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5 border border-rose-500/20">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Full counter pricing:</strong> No promo vouchers or online discounts available at the desk.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5 border border-rose-500/20">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">No telemetry saved:</strong> Times are only displayed on the overhead LED board during your run.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5 border border-rose-500/20">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">No repeat discount:</strong> You miss the ₹200 repeat driver voucher for future races.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 text-xs font-mono text-slate-500 text-center">
              Not recommended for weekends & group events
            </div>
          </div>

          {/* Card 2: Book Online */}
          <div className="rounded-[32px] p-1.5 bg-gradient-to-b from-[#0052FF]/30 via-slate-100 to-white dark:from-[#0052FF]/60 dark:via-[#0052FF]/20 dark:to-transparent border border-blue-300 dark:border-[#0052FF]/40 shadow-md dark:shadow-[0_20px_60px_rgba(0,82,255,0.25)] flex flex-col justify-between relative overflow-hidden">
            <div className="rounded-[26px] bg-white/95 dark:bg-[#0A0E22]/95 p-6 sm:p-8 flex flex-col justify-between h-full border border-slate-200 dark:border-white/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                  <div>
                    <span className="text-[11px] font-mono text-blue-600 dark:text-[#00D2FF] uppercase tracking-wider font-semibold">
                      Fast-Track Paddock Pass
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Online Booking
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-[#0052FF]/20 text-[#0066FF] dark:text-[#00D2FF] border border-blue-200 dark:border-[#0052FF]/30 flex items-center justify-center font-bold">
                    <Check className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white">Instant ₹200 OFF (Code: VELOCITY200):</strong> Apply directly at checkout on all race sessions.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white">Fast-Track Pit Priority:</strong> Your kart is fueled, inspected, and ready for your exact slot.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white">WhatsApp Telemetry Pass:</strong> Sector times, top speed, and ranking delivered right to your chat.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white">₹200 Repeat Voucher:</strong> Generates a return voucher for your next race day.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => {
                    soundFx.playRev(1.3);
                    onOpenBooking();
                  }}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-600/35 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Book Online & Apply ₹200 Coupon</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Step "How It Works" Banner */}
        <div className="p-8 sm:p-10 rounded-[30px] bg-white dark:bg-[#0A0E1F]/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white space-y-6 shadow-sm dark:shadow-xl backdrop-blur-xl">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              How Your Online Perks & Repeat Coupons Work
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              A high-speed 3-step loop turning every lap into real savings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#070A14] border border-slate-200 dark:border-white/10 shadow-sm space-y-2 hover:border-[#0052FF]/50 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#003ECC] text-white font-mono font-bold flex items-center justify-center text-sm shadow-md">
                1
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">Book & Save ₹200</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Use code <strong className="text-blue-600 dark:text-[#00D2FF] font-mono">VELOCITY200</strong> at online checkout to apply an instant ₹200 discount to your ticket.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#070A14] border border-slate-200 dark:border-white/10 shadow-sm space-y-2 hover:border-[#0052FF]/50 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#003ECC] text-white font-mono font-bold flex items-center justify-center text-sm shadow-md">
                2
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">WhatsApp Telemetry Pass</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Our timing transponders sync with your mobile number. Your official lap stats and leader rankings arrive automatically.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#070A14] border border-slate-200 dark:border-white/10 shadow-sm space-y-2 hover:border-[#0052FF]/50 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#003ECC] text-white font-mono font-bold flex items-center justify-center text-sm shadow-md">
                3
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">₹200 Return Voucher</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Receive a private <strong className="text-blue-600 dark:text-[#00D2FF] font-mono">₹200 repeat code</strong> plus 150 Driver Club points to use whenever you or friends return.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
