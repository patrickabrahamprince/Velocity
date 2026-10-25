import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const LifestyleBentoSection: React.FC = () => {
  return (
    <section id="lifestyle" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-12">
        {/* Apple Keynote Style Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="apple-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] dark:bg-[#00D2FF] animate-pulse" />
            <span>Circuit Lifestyle & Dining</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-5xl font-asphalt text-slate-950 dark:text-white leading-[1.05] tracking-[-0.03em]">
            More Than Racing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00D2FF]">
              The Ultimate Trackside Destination
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-apple-text leading-relaxed">
            From rooftop artisanal burgers overlooking Karnataka&apos;s biggest circuit to VIP gift passes and corporate championships.
          </p>
        </div>

        {/* Top Row: 2 Large Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Gift Cards */}
          <div className="apple-glass-card rounded-[2rem] overflow-hidden flex flex-col justify-between group">
            <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src="/images/velocity_official_poster.jpg"
                alt="Velocity Gift Cards"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-[#070B18] via-transparent to-transparent opacity-90" />
            </div>

            <div className="p-8 space-y-3 bg-white dark:bg-[#070B18]/90 border-t border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-blue-600 dark:text-[#38BDF8]">
                Gifts & Passes
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-[-0.025em] font-apple-display flex items-center justify-between">
                <span>Gift Passes & Race Vouchers</span>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:text-white/40 dark:group-hover:text-[#00D2FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-apple-text max-w-md">
                The ultimate gift for birthdays and friends who love motorsport adrenaline, high speeds, and weekend fun.
              </p>
            </div>
          </div>

          {/* Card 2: Birthdays & Corporate Events */}
          <div className="apple-glass-card rounded-[2rem] overflow-hidden flex flex-col justify-between group">
            <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src="/images/velocity_cafe_lifestyle.jpg"
                alt="Birthdays and corporate events"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-[#070B18] via-transparent to-transparent opacity-90" />
            </div>

            <div className="p-8 space-y-3 bg-white dark:bg-[#070B18]/90 border-t border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-blue-600 dark:text-[#38BDF8]">
                Events & Celebrations
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-[-0.025em] font-apple-display flex items-center justify-between">
                <span>Birthdays & Corporate Grand Prix</span>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:text-white/40 dark:group-hover:text-[#00D2FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-apple-text max-w-md">
                Celebrate birthdays and corporate team outings with private heats, official podium trophies, champagne, and cafe buffets.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row: 3 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 3: 1166M Track */}
          <div className="apple-glass-card rounded-[2rem] overflow-hidden flex flex-col justify-between group">
            <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
              <img
                src="/images/hero_racing_kart.jpg"
                alt="1166M Track"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-[#070B18] via-transparent to-transparent opacity-90" />
            </div>

            <div className="p-7 space-y-2 bg-white dark:bg-[#070B18]/90 border-t border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-blue-600 dark:text-[#38BDF8]">
                Circuit Layout
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-[-0.02em] font-apple-display">
                1,166m Asphalt Circuit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-apple-text">
                19 technical apex corners with FIA-grade safety barriers, smooth racing asphalt, and wide straights for overtaking.
              </p>
            </div>
          </div>

          {/* Card 4: Lounge Area / Apex Cafe */}
          <div className="apple-glass-card rounded-[2rem] overflow-hidden flex flex-col justify-between group">
            <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
              <img
                src="/images/velocity_cafe_lifestyle.jpg"
                alt="Apex Rooftop Diner"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-[#070B18] via-transparent to-transparent opacity-90" />
            </div>

            <div className="p-7 space-y-2 bg-white dark:bg-[#070B18]/90 border-t border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-cyan-600 dark:text-cyan-400">
                Cafe & Dining
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-[-0.02em] font-apple-display">
                Apex Rooftop Diner
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-apple-text">
                A comfortable spot to chill, eat fresh wood-fired pizzas, mocktails, burgers, and watch live races from the elevated viewing deck.
              </p>
            </div>
          </div>

          {/* Card 5: Groups & Parties / Dawn Track */}
          <div className="apple-glass-card rounded-[2rem] overflow-hidden flex flex-col justify-between group">
            <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
              <img
                src="/images/bike_track_sunrise.jpg"
                alt="Dawn Superbike Session"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-[#070B18] via-transparent to-transparent opacity-90" />
            </div>

            <div className="p-7 space-y-2 bg-white dark:bg-[#070B18]/90 border-t border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400">
                Dawn Superbikes
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-[-0.02em] font-apple-display">
                Sunrise Track Days
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-apple-text">
                Open morning track time from 6 AM to 10 AM for 300cc+ motorcycles, with breakfast and hot cappuccino included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
