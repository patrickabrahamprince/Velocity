import React from 'react';

export const LifestyleBentoSection: React.FC = () => {
  return (
    <section id="lifestyle" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/20 text-xs font-mono font-semibold uppercase tracking-wider text-[#0052FF]">
            <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
            <span>Circuit Lifestyle & Dining</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            More than racing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-[#2563EB] to-[#0284C7]">The Ultimate Hangout Hub.</span>
          </h2>
        </div>

        {/* Top Row: 2 Large Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Gift Cards */}
          <div className="loco-card overflow-hidden flex flex-col justify-between group">
            <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src="/images/velocity_official_poster.jpg"
                alt="Velocity Gift Cards"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="p-8 space-y-2 bg-white">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0052FF]">
                Gifts & Passes
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Gift Passes & Race Vouchers
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-md">
                The ultimate gift for birthdays and friends who love motorsport adrenaline, high speeds, and weekend fun.
              </p>
            </div>
          </div>

          {/* Card 2: Birthdays & Corporate Events */}
          <div className="loco-card overflow-hidden flex flex-col justify-between group">
            <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src="/images/velocity_cafe_lifestyle.jpg"
                alt="Birthdays and events"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="p-8 space-y-2 bg-white">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0052FF]">
                Events & Celebrations
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Birthdays & Corporate Grand Prix
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-md">
                Celebrate birthdays and team outings with private heats, official podium trophies, champagne, and delicious cafe buffets.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row: 3 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 3: 1166M Track */}
          <div className="loco-card overflow-hidden flex flex-col justify-between group">
            <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
              <img
                src="/images/hero_racing_kart.jpg"
                alt="1166M Track"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="p-7 space-y-2 bg-white">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0052FF]">
                Circuit Layout
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                1,166m Asphalt Circuit
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                19 technical apex corners with FIA-grade safety barriers, smooth racing asphalt, and wide straights for overtaking.
              </p>
            </div>
          </div>

          {/* Card 4: Lounge Area / Apex Cafe */}
          <div className="loco-card overflow-hidden flex flex-col justify-between group">
            <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
              <img
                src="/images/velocity_cafe_lifestyle.jpg"
                alt="Lounge area"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="p-7 space-y-2 bg-white">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-600">
                Cafe & Dining
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Apex Rooftop Diner
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                A comfortable spot to chill, eat fresh pizzas, mocktails, burgers, and watch live races from the elevated viewing deck.
              </p>
            </div>
          </div>

          {/* Card 5: Groups & Parties / Dawn Track */}
          <div className="loco-card overflow-hidden flex flex-col justify-between group">
            <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
              <img
                src="/images/bike_track_sunrise.jpg"
                alt="Dawn Superbike Session"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="p-7 space-y-2 bg-white">
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-600">
                Dawn Superbikes
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Sunrise Track Days
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Open morning track time from 6 AM to 10 AM for 300cc+ motorcycles, with breakfast and hot cappuccino included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
