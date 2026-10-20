import React from 'react';
import { Check, X, Gift, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface WhyBookOnlineSectionProps {
  onOpenBooking: () => void;
}

export const WhyBookOnlineSection: React.FC<WhyBookOnlineSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="why-book" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/20 text-[#0052FF] text-xs font-mono font-semibold tracking-wider uppercase">
            <Gift className="w-3.5 h-3.5 text-[#0052FF]" />
            <span>VIP Online Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Why Book Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-[#2563EB] to-[#0284C7]">Instead of Walking In?</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            Skip the 45-minute paddock wait, unlock instant ₹200 savings with coupon VELOCITY200, and get your transponder lap telemetry delivered straight to your WhatsApp.
          </p>
        </div>

        {/* Comparison: Walk-in vs Online Booking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Walk-In */}
          <div className="rounded-[30px] p-7 sm:p-9 bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                    Ticket Counter
                  </span>
                  <h3 className="text-2xl font-bold text-slate-800">
                    Walking In
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-slate-200/60 border border-slate-200 text-slate-500 flex items-center justify-center font-bold">
                  <X className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-sans">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5 border border-rose-200">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900">45 to 90 min queue:</strong> On weekends, heats fill up fast and walk-ins wait in paddock lines.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5 border border-rose-200">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900">Full counter pricing:</strong> No promo vouchers or online discounts available at the desk.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5 border border-rose-200">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900">No telemetry saved:</strong> Times are only displayed on the overhead LED board during your run.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 mt-0.5 border border-rose-200">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-slate-900">No repeat discount:</strong> You miss the ₹200 repeat driver voucher for future races.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 text-xs font-mono text-slate-400 text-center">
              Not recommended for weekends & group events
            </div>
          </div>

          {/* Card 2: Book Online */}
          <div className="rounded-[32px] p-2 bg-gradient-to-b from-blue-200 via-blue-50 to-white border border-[#0052FF]/30 shadow-[0_20px_50px_-10px_rgba(0,82,255,0.15)] flex flex-col justify-between relative overflow-hidden">
            <div className="rounded-[24px] bg-white p-6 sm:p-8 flex flex-col justify-between h-full border border-slate-100">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-mono text-[#0052FF] uppercase tracking-wider font-semibold">
                      Fast-Track Paddock Pass
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Online Booking
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/20 flex items-center justify-center font-bold">
                    <Check className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-sans">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900">Instant ₹200 OFF (Code: VELOCITY200):</strong> Apply directly at checkout on all race sessions.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900">Fast-Track Pit Priority:</strong> Your kart is fueled, inspected, and ready for your exact slot.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900">WhatsApp Telemetry Pass:</strong> Sector times, top speed, and ranking delivered right to your chat.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900">₹200 Repeat Voucher:</strong> Generates a return voucher for your next race day.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
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
        <div className="p-8 sm:p-10 rounded-[30px] bg-slate-50 border border-slate-200 text-slate-900 space-y-6 shadow-sm">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              How Your Online Perks & Repeat Coupons Work
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              A high-speed 3-step loop turning every lap into real savings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#003ECC] text-white font-mono font-bold flex items-center justify-center text-sm shadow-md">
                1
              </div>
              <h4 className="font-bold text-base text-slate-900">Book & Save ₹200</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Use code <strong className="text-[#0052FF] font-mono">VELOCITY200</strong> at online checkout to apply an instant ₹200 discount to your ticket.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#003ECC] text-white font-mono font-bold flex items-center justify-center text-sm shadow-md">
                2
              </div>
              <h4 className="font-bold text-base text-slate-900">WhatsApp Telemetry Pass</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Our timing transponders sync with your mobile number. Your official lap stats and leader rankings arrive automatically.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#003ECC] text-white font-mono font-bold flex items-center justify-center text-sm shadow-md">
                3
              </div>
              <h4 className="font-bold text-base text-slate-900">₹200 Return Voucher</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Receive a private <strong className="text-[#0052FF] font-mono">₹200 repeat code</strong> plus 150 Driver Club points to use whenever you or friends return.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
