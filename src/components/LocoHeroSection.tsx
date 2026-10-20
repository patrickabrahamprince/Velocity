import React from 'react';
import { Zap, ShieldCheck, Trophy, Flame, ChevronRight, Award, Compass, Sparkles } from 'lucide-react';

interface LocoHeroSectionProps {
  onOpenBooking: (kartName?: string) => void;
  onSelectCategory?: (category: string) => void;
}

export function LocoHeroSection({ onOpenBooking, onSelectCategory }: LocoHeroSectionProps) {
  const quickFilters = [
    { label: '🏎️ Pro Go-Karting', targetId: 'attractions', category: 'High-Speed Racing' },
    { label: '👨‍👩‍👧 2-Seater Tandem', targetId: 'attractions', category: 'Family & Tandem' },
    { label: '🏍️ Superbike Track Days', targetId: 'attractions', category: 'Superbike Track' },
    { label: '🎯 Apex Laser Tag', targetId: 'attractions', category: 'Tactical & Sim' },
    { label: '🎮 F1 Sim Rig Racing', targetId: 'attractions', category: 'Tactical & Sim' },
    { label: '🍕 Apex Rooftop Cafe', targetId: 'attractions', category: 'Food & Dining' },
  ];

  const handleFilterClick = (filter: typeof quickFilters[0]) => {
    if (onSelectCategory) {
      onSelectCategory(filter.category);
    }
    const elem = document.getElementById(filter.targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-between overflow-hidden bg-[#07090e] pt-28 pb-12">
      {/* Background Media & Atmospheric Glow */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_racing_kart.jpg"
          alt="Velocity International Circuit Bangalore"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105 animate-pulse duration-[8000ms]"
        />
        {/* Gradients to match Loco Bear dark neon vibe */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/80 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#07090e]/60 to-[#07090e]" />
        
        {/* Loco Bear Accent Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#feb000]/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#ff3366]/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-64 h-64 rounded-full bg-[#00f0ff]/10 blur-[100px] pointer-events-none" />
      </div>

      {/* Top Banner Tag */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#feb000]/10 border border-[#feb000]/30 text-[#feb000] text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#feb000]" />
          <span>India's Biggest 1166M Asphalt Track & Family Entertainment Hub</span>
        </div>

        {/* Signature Loco Bear Kinetic Headlines */}
        <div className="flex flex-col items-center justify-center leading-none select-none text-center">
          <h2 className="font-bison text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-wide font-black uppercase drop-shadow-md">
            Time To
          </h2>
          <h1 className="font-bison text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] text-[#feb000] tracking-normal font-black uppercase drop-shadow-[0_10px_40px_rgba(254,176,0,0.4)] mt-[-0.2em] mb-4">
            Go Velocity !
          </h1>
        </div>

        {/* Subtitle & Value Proposition */}
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-8">
          Experience the ultimate adrenaline rush in Bangalore. 19 FIA-spec apex corners, tuned 4-stroke racing karts, 2-seater parent-child karts, and panoramic rooftop dining.
        </p>

        {/* Interactive Quick Filter Pills (Loco Bear Style) */}
        <div className="w-full max-w-4xl flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {quickFilters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => handleFilterClick(filter)}
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#131926]/90 hover:bg-[#feb000] text-slate-200 hover:text-black border border-white/10 hover:border-[#feb000] transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Main Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => onOpenBooking()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#feb000] hover:bg-[#fcd107] text-black font-extrabold text-base tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(254,176,0,0.45)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Flame className="w-5 h-5 fill-current" />
            <span>Book Passes Now</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          <a
            href="#circuit"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent hover:bg-white/5 border-2 border-white/20 hover:border-white text-white font-extrabold text-base tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Compass className="w-5 h-5 text-[#feb000]" />
            <span>Explore 19 Turns</span>
          </a>
        </div>
      </div>

      {/* Hero Telemetry & Stats Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full mt-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 rounded-2xl bg-[#0d121d]/90 border border-white/10 backdrop-blur-xl">
          <div className="text-center p-3 border-r border-white/10 last:border-none">
            <div className="font-bison text-3xl sm:text-4xl text-[#feb000] font-black">1166M</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider mt-0.5">India's Longest</div>
          </div>
          <div className="text-center p-3 border-r border-white/10 last:border-none">
            <div className="font-bison text-3xl sm:text-4xl text-[#00f0ff] font-black">19</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider mt-0.5">FIA Apex Corners</div>
          </div>
          <div className="text-center p-3 border-r border-white/10 last:border-none">
            <div className="font-bison text-3xl sm:text-4xl text-[#ff3366] font-black">85+ KM/H</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider mt-0.5">Pro Lap Speeds</div>
          </div>
          <div className="text-center p-3 border-r border-white/10 last:border-none">
            <div className="font-bison text-3xl sm:text-4xl text-white font-black">15,000+</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider mt-0.5">Happy Racers</div>
          </div>
          <div className="col-span-2 md:col-span-1 text-center p-3 flex flex-col justify-center">
            <div className="font-bison text-3xl sm:text-4xl text-[#feb000] font-black">4.8 ★★★★★</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider mt-0.5">Top Rated Hub</div>
          </div>
        </div>
      </div>
    </section>
  );
}
