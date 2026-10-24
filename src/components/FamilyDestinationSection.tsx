import React from 'react';
import { Users, Utensils, Award, ShieldCheck, Heart, Sparkles, Smile, ArrowRight, Compass } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface FamilyDestinationSectionProps {
  onOpenBooking: (packageName?: string) => void;
}

export const FamilyDestinationSection: React.FC<FamilyDestinationSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="family" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto w-full">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-white/[0.06] border border-blue-200 dark:border-white/10 text-xs font-semibold text-blue-700 dark:text-sky-300">
              <Users className="w-3.5 h-3.5 text-[#0052FF] dark:text-[#00D2FF]" />
              <span>Bangalore Weekend Destination</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-asphalt text-slate-950 dark:text-white leading-[1.05] tracking-[-0.03em]">
              High-Speed Fun for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00D2FF]">
                Kids, Parents & Friends
              </span>
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
              More than just an outdoor asphalt circuit. Velocity is a weekend day-out hub where families race together, relax over delicious food at the Apex diner, and celebrate birthdays.
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playRev(1.4);
              onOpenBooking('Parent-Child 2-Seater Tandem (₹899)');
            }}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00D2FF] hover:brightness-110 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-blue-600/30 shrink-0 cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Book Family Rides</span>
          </button>
        </div>

        {/* 4 Feature Bento Pillars with Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: 2-Seater Tandem Karts */}
          <div className="rounded-[24px] bg-white dark:bg-[#0A0E1F] border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl group">
            <div className="h-44 w-full overflow-hidden relative bg-slate-900">
              <img
                src="/images/family_tandem_kart.jpg"
                alt="2-Seater Tandem Go Kart"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-600/90 text-white backdrop-blur-md">
                Ages 4+ with Parent
              </span>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight leading-snug">
                  2-Seater Tandem Karts
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                  Kids ride safely alongside parents with dual safety harnesses and an interactive steering wheel for the young co-pilot.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Dual 4-Point Harnesses</span>
              </div>
            </div>
          </div>

          {/* Card 2: Apex Rooftop Cafe */}
          <div className="rounded-[24px] bg-white dark:bg-[#0A0E1F] border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl group">
            <div className="h-44 w-full overflow-hidden relative bg-slate-900">
              <img
                src="/images/velocity_cafe_lifestyle.jpg"
                alt="Apex Rooftop Cafe"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-cyan-600/90 text-white backdrop-blur-md">
                Track-View Diner
              </span>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight leading-snug">
                  Apex Rooftop Diner
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                  Watch races from above with woodfired pizzas, crispy smashed burgers, mocktails, coffee, and ice cream sundaes.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Full Family & Kids Menu</span>
              </div>
            </div>
          </div>

          {/* Card 3: Birthday GP */}
          <div className="rounded-[24px] bg-white dark:bg-[#0A0E1F] border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl group">
            <div className="h-44 w-full overflow-hidden relative bg-slate-900">
              <img
                src="/images/hero_racing_kart.jpg"
                alt="Birthday Grand Prix"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-rose-600/90 text-white backdrop-blur-md">
                Birthdays & Trophies
              </span>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight leading-snug">
                  Birthday Grand Prix
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                  Give your kid an unforgettable birthday with private heat races, real metal trophies on the podium, and cafe celebration.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <Heart className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>Podium Trophies & Photos</span>
              </div>
            </div>
          </div>

          {/* Card 4: Open Countryside Lawns */}
          <div className="rounded-[24px] bg-white dark:bg-[#0A0E1F] border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl group">
            <div className="h-44 w-full overflow-hidden relative bg-slate-900">
              <img
                src="/images/circuit_satellite_aerial.jpg"
                alt="Scenic Day Outing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-600/90 text-white backdrop-blur-md">
                Fresh Outdoor Air
              </span>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight leading-snug">
                  Scenic Day Outing
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                  Just 25 minutes from Whitefield along Hosakote Highway. Clean outdoor countryside air, lush lawns, and free parking.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <Smile className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Sanitized Helmets & Liners</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Banner: Remote Marshaling & Safety */}
        <div className="rounded-[28px] bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-xs text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span>100% Track Marshal Controlled</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Engineered with Wireless Track Safety for Every Driver
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                Our FIA-certified safety marshals can regulate or cut kart speeds instantly via wireless track controllers. High-impact energy-absorbing barriers line every corner.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => {
                  soundFx.playRev(1.3);
                  onOpenBooking('Parent-Child 2-Seater Tandem (₹899)');
                }}
                className="w-full py-3.5 rounded-full bg-[#0052FF] hover:bg-[#0042D9] text-white font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-blue-600/30"
              >
                <span>Book 2-Seater Tandem Kart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
