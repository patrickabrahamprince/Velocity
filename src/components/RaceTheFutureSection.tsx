import React from 'react';
import { ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface RaceTheFutureSectionProps {
  onOpenBooking: () => void;
}

export const RaceTheFutureSection: React.FC<RaceTheFutureSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="ecosystem" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0052FF]">
            TRACK PERKS & SERVICES
          </div>
          <h2 className="text-4xl sm:text-6xl font-heading tracking-tight text-neutral-900 leading-none">
            Everything for your race day
          </h2>
        </div>

        {/* 2 Wide Ecosystem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Online Booking */}
          <div
            onClick={() => {
              soundFx.playRev(1.2);
              onOpenBooking();
            }}
            className="rounded-[32px] overflow-hidden bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div className="relative h-72 sm:h-80 overflow-hidden bg-neutral-900">
              <img
                src="/images/kart_fleet_garage.jpg"
                alt="Online Booking"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="p-8 space-y-2">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-neutral-400">
                EASY BOOKING
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-neutral-900 flex items-center justify-between">
                <span>Book your race online</span>
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#0052FF] group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans max-w-md">
                Book in just a few clicks. Pick your date, time slot, and number of karts, and get your ticket on WhatsApp right away.
              </p>
            </div>
          </div>

          {/* Card 2: Live Statistics & Telemetry */}
          <a
            href="#leaderboard"
            onClick={() => soundFx.playGearShift()}
            className="rounded-[32px] overflow-hidden bg-white border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group block"
          >
            <div className="relative h-72 sm:h-80 overflow-hidden bg-neutral-900">
              <img
                src="/images/hero_racing_kart.jpg"
                alt="Live Lap Times & Leaderboard"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <div className="p-8 space-y-2">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-neutral-400">
                LIVE TIMING
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-neutral-900 flex items-center justify-between">
                <span>Live lap times & scores</span>
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#0052FF] group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans max-w-md">
                See your exact lap times, track ranking, and top speeds displayed live on big screens after every race.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
