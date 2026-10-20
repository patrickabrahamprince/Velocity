import React, { useState } from 'react';
import { soundFx } from '../utils/soundEngine';

interface DriverProfile {
  id: string;
  name: string;
  location: string;
  flag: string;
  kart: string;
  bestLap: string;
  topSpeed: string;
  points: string;
  avatar: string;
  accentColor: string;
  bio: string;
  racingNumber: string;
}

const drivers: DriverProfile[] = [
  {
    id: 'arjun',
    name: 'Arjun Rao',
    location: 'Hoskote, Bangalore',
    flag: '🇮🇳',
    kart: 'SODI RT8 270cc Beast',
    bestLap: '00:54.212',
    topSpeed: '98 km/h',
    points: '4987',
    avatar: '/images/hero_racing_kart.jpg',
    accentColor: '#0052FF',
    bio: 'Current 2026 Lap Record Holder at Velocity International Circuit. Master of Turn 3 hairpin divebombs.',
    racingNumber: '44',
  },
  {
    id: 'vikram',
    name: 'Vikramaditya S.',
    location: 'Indiranagar, Bangalore',
    flag: '🇮🇳',
    kart: 'SODI RT8 270cc Pro',
    bestLap: '00:54.648',
    topSpeed: '96 km/h',
    points: '4620',
    avatar: '/images/velocity_official_poster.jpg',
    accentColor: '#F59E0B',
    bio: 'Bangalore Autocross podium finisher. Precision apex specialist on Sector 2 chicanes.',
    racingNumber: '16',
  },
  {
    id: 'nisha',
    name: 'Nisha "Nitro" Patel',
    location: 'Whitefield, Bangalore',
    flag: '🇮🇳',
    kart: 'SODI RT8 200cc Club',
    bestLap: '00:55.109',
    topSpeed: '92 km/h',
    points: '4190',
    avatar: '/images/kart_fleet_garage.jpg',
    accentColor: '#0052FF',
    bio: 'Fastest female racer on track. 10 consecutive wins in the Velocity Club Sprint series.',
    racingNumber: '55',
  },
];

export const DriverTelemetryShowcase: React.FC = () => {
  const [selectedDriver, setSelectedDriver] = useState<DriverProfile>(drivers[0]);

  return (
    <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto w-full">
      {/* Master F1 75 Style Clean Light Container */}
      <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-[#F8F9FC] text-neutral-900 p-6 sm:p-10 lg:p-14 shadow-sm border border-neutral-200/80">
        {/* Subtle Ambient Blue Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

        {/* Large Racing Number Background Watermark */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 font-extrabold text-[160px] sm:text-[240px] text-neutral-900/[0.03] select-none pointer-events-none font-heading">
          {selectedDriver.racingNumber}
        </div>

        <div className="relative z-10 space-y-8">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1 rounded-lg bg-[#0052FF] text-white font-extrabold text-xs tracking-wider uppercase">
                LEADERBOARD
              </div>
              <span className="text-xs font-mono text-neutral-500 font-semibold">
                THIS WEEK&apos;S FASTEST RACERS
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs text-neutral-500 font-sans">
              <span className="hover:text-black transition-colors cursor-pointer">Sector Times</span>
              <span className="text-[#0052FF] font-bold border-b-2 border-[#0052FF] pb-0.5">Top Drivers</span>
              <span className="hover:text-black transition-colors cursor-pointer">Track Records</span>
            </div>
          </div>

          {/* Main Showcase Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Driver Info & Headline */}
            <div className="lg:col-span-5 space-y-6">
              {/* Country & Track Subheading */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                  <span>{selectedDriver.location}</span>
                  <span>{selectedDriver.flag}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-800">
                  Velocity International Circuit
                </h3>
              </div>

              {/* Driver Selector Avatars */}
              <div className="flex items-center gap-2.5 pt-1">
                {drivers.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      soundFx.playGearShift();
                      setSelectedDriver(d);
                    }}
                    className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedDriver.id === d.id
                        ? 'border-[#0052FF] scale-110 shadow-md ring-2 ring-blue-200'
                        : 'border-neutral-300 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={d.avatar} alt={d.name} className="w-full h-full object-cover" />
                  </button>
                ))}
                <div className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600 font-medium">
                  Top 3
                </div>
              </div>

              {/* Massive Bold Driver Name */}
              <div className="space-y-2">
                <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 leading-none font-heading">
                  {selectedDriver.name.split(' ')[0]} <br />
                  <span className="text-neutral-500">
                    {selectedDriver.name.split(' ').slice(1).join(' ')}
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md pt-1 font-sans">
                  {selectedDriver.bio}
                </p>
              </div>

              {/* Telemetry Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0052FF] text-xs font-mono font-semibold">
                  🏎️ {selectedDriver.kart}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-mono font-medium">
                  ⚡ Best: {selectedDriver.bestLap}s
                </span>
              </div>
            </div>

            {/* Center Column: Interactive Glowing Track Outline */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-[340px] aspect-square relative flex items-center justify-center p-4">
                {/* Track SVG */}
                <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-md">
                  {/* Track line */}
                  <path
                    d="M 60 180 C 40 100, 100 40, 200 40 C 300 40, 360 80, 360 160 C 360 240, 280 260, 200 240 C 140 220, 80 240, 60 180 Z"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 60 180 C 40 100, 100 40, 200 40 C 300 40, 360 80, 360 160 C 360 240, 280 260, 200 240 C 140 220, 80 240, 60 180 Z"
                    fill="none"
                    stroke="#0052FF"
                    strokeWidth="3"
                    strokeDasharray="8 4"
                  />

                  {/* Start / Finish Gantry */}
                  <line x1="50" y1="175" x2="70" y2="185" stroke="#000000" strokeWidth="4" />

                  {/* Active Sector Marker */}
                  <circle cx="120" cy="80" r="8" fill="#F59E0B" className="animate-pulse" />
                  <circle cx="280" cy="120" r="6" fill="#0052FF" opacity="0.8" />
                  <circle cx="240" cy="245" r="6" fill="#0052FF" opacity="0.8" />
                </svg>

                <div className="absolute bottom-2 text-center">
                  <span className="text-[10px] font-mono text-neutral-500 font-semibold uppercase tracking-wider">
                    Sector 1 Record: 18.24s
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Massive Stacked Numbers */}
            <div className="lg:col-span-3 flex flex-col justify-center items-end text-right space-y-1">
              <div className="text-[11px] font-mono text-neutral-500 font-semibold uppercase tracking-widest pb-1">
                SEASON SCORE & POINTS
              </div>

              <div className="font-heading font-black text-5xl sm:text-6xl text-neutral-300 tracking-tight select-none">
                227
              </div>
              <div className="font-heading font-black text-6xl sm:text-7xl text-neutral-400 tracking-tight select-none">
                374
              </div>
              <div className="font-heading font-black text-7xl sm:text-8xl text-amber-500 tracking-tight leading-none">
                {selectedDriver.points}
              </div>

              <div className="pt-4 text-xs font-mono text-neutral-500 font-semibold">
                Hoskote Championship Points
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
