import React from 'react';
import { Users, Utensils, Award, ShieldCheck, Heart, Sparkles, Smile, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface FamilyDestinationSectionProps {
  onOpenBooking: (packageName?: string) => void;
}

export const FamilyDestinationSection: React.FC<FamilyDestinationSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="family" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/20 text-xs font-mono font-semibold uppercase tracking-wider text-[#0052FF]">
              <Users className="w-3.5 h-3.5 text-[#0052FF]" />
              <span>Bangalore Weekend Destination</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              High-Speed Fun for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-[#2563EB] to-[#0284C7]">Kids, Parents & Friends.</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl font-sans leading-relaxed">
              More than just an outdoor asphalt circuit. Velocity is a weekend day-out hub where families race together, relax over delicious food at the Apex diner, and celebrate birthdays.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playRev(1.2);
              onOpenBooking('Family Tandem GP (2 Drivers + Food)');
            }}
            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-600/25 transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Book Family Rides</span>
          </button>
        </div>

        {/* 4 Feature Bento Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: 2-Seater Tandem Karts */}
          <div className="loco-card p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0052FF] shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-mono text-[#0052FF] font-semibold uppercase tracking-wider">
                Ages 4+ with Parent
              </div>
              <h3 className="font-bold text-xl text-slate-900 tracking-tight leading-snug">
                2-Seater Tandem Karts
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Kids ride safely alongside parents with dual safety harnesses and an interactive steering wheel for the young co-pilot.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dual 4-Point Harnesses</span>
            </div>
          </div>

          {/* Card 2: Apex Rooftop Cafe */}
          <div className="loco-card p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shadow-sm">
                <Utensils className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-mono text-cyan-600 font-semibold uppercase tracking-wider">
                Track-View Diner
              </div>
              <h3 className="font-bold text-xl text-slate-900 tracking-tight leading-snug">
                Apex Rooftop Diner
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Watch races from above with woodfired pizzas, crispy smashed burgers, mocktails, coffee, and ice cream sundaes.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Full Family & Kids Menu</span>
            </div>
          </div>

          {/* Card 3: Birthday GP */}
          <div className="loco-card p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-mono text-rose-500 font-semibold uppercase tracking-wider">
                Birthdays & Celebrations
              </div>
              <h3 className="font-bold text-xl text-slate-900 tracking-tight leading-snug">
                Birthday Grand Prix
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Give your kid an unforgettable birthday with private heat races, real metal trophies on the podium, and cafe celebration.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Real Podium Trophies & Photos</span>
            </div>
          </div>

          {/* Card 4: Open Countryside Lawns */}
          <div className="loco-card p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                <Smile className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-mono text-emerald-600 font-semibold uppercase tracking-wider">
                Fresh Outdoor Air
              </div>
              <h3 className="font-bold text-xl text-slate-900 tracking-tight leading-snug">
                Scenic Day Outing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Just 25 minutes from Whitefield along Hosakote Highway. Clean outdoor countryside air, lush lawns, and free parking.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sanitized Helments & Liners</span>
            </div>
          </div>
        </div>

        {/* Highlight Banner: Remote Marshaling & Safety */}
        <div className="rounded-[32px] p-2 bg-gradient-to-b from-slate-200 via-slate-100 to-white border border-slate-200 shadow-md">
          <div className="rounded-[24px] bg-slate-50 p-8 sm:p-10 border border-slate-200/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-mono text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>100% Track Marshal Controlled</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Engineered with Wireless Track Safety for Every Driver
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-2xl">
                  Our FIA-certified safety marshals can regulate or cut kart speeds instantly via wireless track controllers. High-impact energy-absorbing barriers line every corner.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <button
                  onClick={() => {
                    soundFx.playRev(1.3);
                    onOpenBooking('2-Seater Tandem Kart (Parent + Kid)');
                  }}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
                >
                  <span>Book 2-Seater Tandem Kart</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/919071718620?text=Hi%20Velocity%20Circuit,%20I%20want%20to%20plan%20a%20Family%20Day%20Outing%20or%20Kids%20Birthday"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playGearShift()}
                  className="w-full py-3.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center shadow-xs"
                >
                  <span>Chat on WhatsApp: +91 90717 18620 →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
