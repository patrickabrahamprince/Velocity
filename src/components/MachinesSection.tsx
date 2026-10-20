import React from 'react';
import { soundFx } from '../utils/soundEngine';
import { ArrowRight } from 'lucide-react';

interface KartSession {
  id: string;
  category: string;
  title: string;
  price: string;
  duration: string;
  popular?: boolean;
  image: string;
  specs: string[];
}

const fleetSessions: KartSession[] = [
  {
    id: 'sprint-5',
    category: 'STUDENTS & BEGINNERS • 12+ YRS',
    title: '5 Laps Rush',
    price: '299',
    duration: '10 min (incl. briefing)',
    image: '/images/hero_racing_kart.jpg',
    specs: [
      'Tuned Honda 4-Stroke Engine',
      'Top Speed: 85+ km/h on straights',
      'Live transponder sector timing',
      'DOT certified helmet & balaclava',
    ],
  },
  {
    id: 'tandem-2seater',
    category: 'FAMILY & KIDS • AGES 4+ WITH PARENT',
    title: '2-Seater Tandem GP',
    price: '899',
    duration: '15 min parent+child heat',
    popular: true,
    image: '/images/hero_racing_kart.jpg',
    specs: [
      'Dual 4-point racing safety harnesses',
      'Parent drives + Kid co-pilot steering',
      'Full steel roll cage protection',
      'Unforgettable parent-child bonding',
    ],
  },
  {
    id: 'blitz-8',
    category: 'WEEKDAY SPECIAL • 16+ YEARS',
    title: '8 Laps Blitz',
    price: '499',
    duration: '15 min (incl. briefing)',
    image: '/images/velocity_official_poster.jpg',
    specs: [
      'Championship tuned racing chassis',
      'Top Speed: 90+ km/h',
      'Corner-by-corner telemetry sheet',
      'Apex viewing lounge access',
    ],
  },
  {
    id: 'gp-10',
    category: 'ALL AGES • VALID ON ALL DAYS',
    title: '10 Laps All-Days GP',
    price: '699',
    duration: '20 min full experience',
    popular: true,
    image: '/images/hero_racing_kart.jpg',
    specs: [
      '11.6 KM total track distance',
      'Valid on weekends & public holidays',
      'Top 3 Podium Trophy presentation',
      'Unrestricted full engine power',
    ],
  },
  {
    id: 'bike-ride',
    category: 'MOTORCYCLISTS • 6 AM TO 10 AM',
    title: 'Bike Ride Dawn Pass',
    price: '1,500',
    duration: '4 hours open track',
    image: '/images/bike_track_sunrise.jpg',
    specs: [
      '4 Hours non-stop track access',
      'Protein Breakfast & Cappuccino included',
      'Apex practice & knee dragging',
      'Full riding gear mandatory',
    ],
  },
];

interface MachinesSectionProps {
  onSelectMachine: (sessionName: string) => void;
}

export const MachinesSection: React.FC<MachinesSectionProps> = ({ onSelectMachine }) => {
  return (
    <section id="machines" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/20 text-xs font-mono font-semibold uppercase tracking-wider text-[#0052FF]">
            <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
            <span>Precision Fleet & Track Sessions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-[#2563EB] to-[#0284C7]">Racing Machine</span>
          </h2>
          <p className="text-slate-600 max-w-xl text-sm font-sans leading-relaxed">
            From 270cc 4-stroke sprint karts to family tandem rides and dawn superbike track sessions.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {fleetSessions.map((session) => (
            <div
              key={session.id}
              className={`loco-card p-6 transition-all duration-300 flex flex-col justify-between ${
                session.popular
                  ? 'border border-[#0052FF]/60 shadow-[0_12px_35px_rgba(0,82,255,0.25)] scale-[1.02]'
                  : ''
              }`}
            >
              <div>
                {/* Category tag */}
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-1">
                  {session.category}
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-slate-900 tracking-tight mb-3">
                  {session.title}
                </h3>

                {/* Kart Centerpiece with Telemetry callouts */}
                <div className="relative my-3 py-2 flex items-center justify-center">
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-black/60 border border-white/10">
                    <img
                      src={session.image}
                      alt={session.title}
                      className="w-full h-full object-cover filter contrast-105"
                    />

                    {/* Telemetry markers */}
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[9px] font-mono">
                      BRAKING ///
                    </div>
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#0052FF] text-white text-[9px] font-mono font-bold">
                      ACCEL ///
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="my-4 pb-4 border-b border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
                      ₹{session.price}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-500 font-mono">+ TAX</span>
                      <span className="text-[10px] text-slate-500 font-sans">{session.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={() => {
                    soundFx.playRev(1.3);
                    onSelectMachine(`${session.title} (₹${session.price})`);
                  }}
                  className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer mb-5 flex items-center justify-center gap-1.5 ${
                    session.popular
                      ? 'bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                  }`}
                >
                  <span>Book now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Features list with + bullets */}
                <div className="space-y-2 text-xs text-slate-600 font-sans">
                  {session.specs.map((spec) => (
                    <div key={spec} className="flex items-start gap-2">
                      <span className="text-[#0052FF] font-bold shrink-0">+</span>
                      <span className="leading-snug text-slate-600">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
