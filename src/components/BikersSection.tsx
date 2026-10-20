import React from 'react';
import { ShieldCheck, Sun, Zap, Clock, AlertTriangle, ChevronRight, Gauge } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface BikersSectionProps {
  onBookBikeSlot: () => void;
}

export const BikersSection: React.FC<BikersSectionProps> = ({ onBookBikeSlot }) => {
  const bikerHighlights = [
    { title: '4 HOURS OPEN TRACK', desc: 'Non-stop knee-dragging action from 6:00 AM to 10:00 AM morning mist.', icon: Clock },
    { title: 'HIGH-GRIP AGGREGATE', desc: 'Specially conditioned high-friction asphalt for extreme lean angles.', icon: Gauge },
    { title: 'FIA RUN-OFF ZONES', desc: 'Wide gravel traps, tire barriers, and professional track marshals on post.', icon: ShieldCheck },
    { title: 'NO OPPOSING TRAFFIC', desc: 'Zero potholes, zero oncoming traffic. Pure racing freedom in Hoskote.', icon: Zap },
  ];

  return (
    <section id="bikers" className="relative py-20 lg:py-24 bg-[#060813] overflow-hidden w-full border-b border-[#0052FF]/15">
      {/* Carbon and Cobalt ambient glow */}
      <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-[#0052FF]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#00F0FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 bg-[#0052FF]/15 border border-[#0052FF]/40 px-3.5 py-1 rounded-full text-xs font-mono text-[#00F0FF]">
              <Sun className="w-3.5 h-3.5 animate-spin text-[#00F0FF]" />
              <span>DAWN SESSIONS • 06:00 AM TO 10:00 AM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              BIKERS PARADISE. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00F0FF]">
                DRAG KNEE IN PEACE.
              </span>
            </h2>

            <p className="text-zinc-300 max-w-xl text-xs sm:text-sm font-sans">
              Tired of Bengaluru speed bumps and potholes? Take your machine to India&apos;s widest technical circuit before the city wakes up. 19 turns of pure lean-angle bliss.
            </p>
          </div>

          {/* Pricing Highlight Card */}
          <div className="bg-[#090E24] border border-[#0052FF]/40 rounded-2xl p-4 shadow-xl flex items-center gap-5 shrink-0 self-start lg:self-end">
            <div>
              <div className="text-[10px] font-mono uppercase text-zinc-400">DAWN TRACK PASS</div>
              <div className="font-anton text-2xl sm:text-3xl text-[#00F0FF] text-glow-cyan leading-tight">
                ₹1,500 <span className="text-xs font-mono text-zinc-300 font-normal">+ GST</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-300">4 FULL HOURS OPEN CIRCUIT</div>
            </div>

            <button
              onClick={() => {
                soundFx.playRev(1.5);
                onBookBikeSlot();
              }}
              className="px-4 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#1E60FF] text-white font-syne font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            >
              BOOK BIKE SLOT
            </button>
          </div>
        </div>

        {/* Media & Specs Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left: Cinematic Knee-Dragging Image */}
          <div className="lg:col-span-7 relative h-[340px] sm:h-[440px] rounded-3xl overflow-hidden border border-[#0052FF]/30 shadow-2xl group w-full">
            <img
              src="/images/bike_track_sunrise.jpg"
              alt="Superbike knee drag at dawn in Hoskote Bangalore"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-6 left-6 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#0052FF]/30 text-xs font-mono text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
              <span>DAWN ASPHALT TEMP: 24°C • OPTIMAL GRIP</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-zinc-300">
              <span className="font-syne font-bold uppercase text-white">
                TURN 7 RED BULL SWEEPER // 94 KM/H
              </span>
              <span className="text-[#00F0FF] font-bold">300cc - 1000cc+ ELIGIBLE</span>
            </div>
          </div>

          {/* Right: Technical Features & Rules */}
          <div className="lg:col-span-5 space-y-4 w-full">
            <div className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] font-bold">
              // WHY BENGALURU RIDERS LOVE VELOCITY
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bikerHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-4 rounded-2xl bg-[#090D1E] border border-[#0052FF]/20 hover:border-[#0052FF]/50 transition-all space-y-1"
                  >
                    <Icon className="w-5 h-5 text-[#00F0FF] mb-2" />
                    <h3 className="font-syne font-extrabold text-sm uppercase text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Gear & Safety Rule Box */}
            <div className="bg-[#0C122C] border border-[#0052FF]/40 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00F0FF] uppercase">
                <AlertTriangle className="w-4 h-4 text-[#00F0FF]" />
                <span>MANDATORY RIDER GEAR REQUIREMENTS:</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Full-face ECE/DOT helmet, riding jacket with CE Level 2 armor, riding pants or knee guards, gauntlet gloves, and ankle-height boots required.
              </p>
            </div>

            <button
              onClick={() => {
                soundFx.playRev(1.4);
                onBookBikeSlot();
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0052FF] via-[#1E60FF] to-[#0052FF] hover:opacity-90 font-syne font-extrabold text-xs uppercase tracking-wider text-white shadow-xl shadow-blue-950/60 hover:shadow-[0_0_35px_#0052FF] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>REGISTER FOR NEXT DAWN TRACK DAY (₹1,500)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
