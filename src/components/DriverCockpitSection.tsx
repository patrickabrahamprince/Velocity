import React, { useState } from 'react';
import {
  Zap,
  ArrowRight,
  Sparkles,
  Trophy,
  Gauge,
  Timer,
  Activity,
  Layers,
  CheckCircle2,
  Phone,
  Play,
  LogOut,
  UserPlus,
} from 'lucide-react';
import { soundFx } from '../utils/soundEngine';
import { driverStore } from '../utils/driverStore';
import type { DriverProfile } from '../types/driverOS';

interface DriverCockpitSectionProps {
  currentDriver: DriverProfile | null;
  onDriverLogin: (driver: DriverProfile) => void;
  onOpenDriverDashboard: () => void;
  onOpenBooking: () => void;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

interface TelemetryDriver {
  id: string;
  racingNumber: string;
  name: string;
  city: string;
  tier: string;
  avatar: string;
  kart: string;
  bestLap: string;
  delta: string;
  topSpeed: string;
  rpm: string;
  gForce: string;
  rank: string;
  lapBalance: number;
  points: number;
  sector1: string;
  sector2: string;
  sector3: string;
  sector1Purple: boolean;
  sector2Purple: boolean;
  sector3Purple: boolean;
  svgPath: string;
}

const telemetryDrivers: TelemetryDriver[] = [
  {
    id: 'vikram',
    racingNumber: '07',
    name: 'Vikram Sharma',
    city: 'Indiranagar, Bangalore',
    tier: 'PRO RACER',
    avatar: '/images/hero_racing_kart.jpg',
    kart: 'Tuned 200cc Honda Pro Kart',
    bestLap: '00:54.212',
    delta: '-0.420s',
    topSpeed: '85.4 km/h',
    rpm: '5,850 RPM',
    gForce: '1.85 G',
    rank: '#1 This Week',
    lapBalance: 14,
    points: 1240,
    sector1: '18.240s',
    sector2: '19.380s',
    sector3: '16.592s',
    sector1Purple: true,
    sector2Purple: false,
    sector3Purple: true,
    svgPath: 'M0,75 C60,20 120,60 180,30 C240,70 300,15 360,45 C420,75 480,20 540,55 C600,25 660,65 720,20 L720,100 L0,100 Z',
  },
  {
    id: 'arjun',
    racingNumber: '44',
    name: 'Arjun Rao',
    city: 'Hoskote, Bangalore',
    tier: 'APEX RACER',
    avatar: '/images/velocity_official_poster.jpg',
    kart: 'Tuned 200cc Honda Pro Kart',
    bestLap: '00:54.648',
    delta: '+0.016s',
    topSpeed: '84.1 km/h',
    rpm: '5,780 RPM',
    gForce: '1.78 G',
    rank: '#2 This Week',
    lapBalance: 22,
    points: 1980,
    sector1: '18.420s',
    sector2: '19.450s',
    sector3: '16.778s',
    sector1Purple: false,
    sector2Purple: true,
    sector3Purple: false,
    svgPath: 'M0,80 C60,25 120,65 180,35 C240,75 300,20 360,50 C420,80 480,25 540,60 C600,30 660,70 720,25 L720,100 L0,100 Z',
  },
  {
    id: 'priya',
    racingNumber: '12',
    name: 'Priya Sen',
    city: 'Whitefield, Bangalore',
    tier: 'ROOKIE PRO',
    avatar: '/images/kart_fleet_garage.jpg',
    kart: 'Tuned 200cc Honda Pro Kart',
    bestLap: '00:55.109',
    delta: '+0.477s',
    topSpeed: '81.8 km/h',
    rpm: '5,620 RPM',
    gForce: '1.65 G',
    rank: '#3 This Week',
    lapBalance: 8,
    points: 760,
    sector1: '18.680s',
    sector2: '19.650s',
    sector3: '16.779s',
    sector1Purple: false,
    sector2Purple: false,
    sector3Purple: false,
    svgPath: 'M0,85 C60,30 120,70 180,40 C240,80 300,25 360,55 C420,85 480,30 540,65 C600,35 660,75 720,30 L720,100 L0,100 Z',
  },
];

export const DriverCockpitSection: React.FC<DriverCockpitSectionProps> = ({
  currentDriver,
  onDriverLogin,
  onOpenDriverDashboard,
  onOpenBooking,
  onOpenAuth,
  onLogout,
}) => {
  const [selectedDriverIndex, setSelectedDriverIndex] = useState(0);
  const activeDriver = telemetryDrivers[selectedDriverIndex];

  const handleQuickDemoLogin = () => {
    soundFx.playRev(1.4);
    const { driver } = driverStore.loginWithPhone('9071718620');
    onDriverLogin(driver);
  };

  return (
    <section id="driver-os" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Telemetry Console Shell */}
      <div className="relative rounded-[36px] bg-white dark:bg-[#080C1B] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white p-6 sm:p-10 lg:p-12 shadow-sm dark:shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

        {currentDriver ? (
          /* LOGGED IN COCKPIT VIEW */
          <div className="relative z-10 space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100 dark:bg-[#070A14] border border-slate-200 dark:border-white/10 overflow-hidden shadow-md">
                    <img
                      src={currentDriver.avatar}
                      alt={currentDriver.name}
                      loading="lazy"
                      decoding="async"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-[#0052FF] text-white font-mono font-bold text-[10px] border border-white/20">
                    #{currentDriver.racingNumber}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-2xl text-slate-900 dark:text-white">
                      Welcome Back, {currentDriver.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-blue-50 dark:bg-[#0052FF]/20 text-blue-700 dark:text-[#00D2FF] border border-blue-200 dark:border-[#0052FF]/40">
                      {currentDriver.tier}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                    <span>📱 +91 {currentDriver.phone}</span>
                    <span>•</span>
                    <span>📍 {currentDriver.city}</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">● Active Driver Pass</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    soundFx.playRev(1.2);
                    onOpenDriverDashboard();
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-blue-600/35 flex items-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  <span>Open Driver OS</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playGearShift();
                    if (onLogout) onLogout();
                  }}
                  className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-slate-200 dark:border-white/10 flex items-center gap-1.5"
                  title="Log out of driver pass"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            {/* 4 Core Driver Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#070A14] border border-slate-200 dark:border-white/10 shadow-sm space-y-1">
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">Lap Bank Wallet</div>
                <div className="font-mono font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  {currentDriver.lapBalance} Laps
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Stored in digital pass</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#070A14] border border-slate-200 dark:border-white/10 shadow-sm space-y-1">
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">Personal Best</div>
                <div className="font-mono font-bold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
                  {currentDriver.bestLapTime}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">1,166M Hoskote Circuit</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#070A14] border border-slate-200 dark:border-white/10 shadow-sm space-y-1">
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">Bengaluru Rank</div>
                <div className="font-mono font-bold text-2xl sm:text-3xl text-blue-600 dark:text-[#00D2FF]">
                  #{currentDriver.globalRank}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Top 5% Lap Record</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#070A14] border border-slate-200 dark:border-white/10 shadow-sm space-y-1">
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">Reward Points</div>
                <div className="font-mono font-bold text-2xl sm:text-3xl text-amber-600 dark:text-amber-400">
                  {currentDriver.pointsBalance} Pts
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">₹{Math.round(currentDriver.pointsBalance / 10)} Cafe Credits</div>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#070A14] border border-slate-200 dark:border-white/10 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-[#0052FF]/20 border border-blue-200 dark:border-[#0052FF]/30 text-[#0066FF] dark:text-[#00D2FF] flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">Ready for your next track session?</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Book online with your stored laps or reserve your next heat.</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    soundFx.playGearShift();
                    onOpenDriverDashboard();
                  }}
                  className="px-4 py-2.5 rounded-full bg-slate-200/80 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white text-xs font-mono font-medium cursor-pointer transition-colors border border-slate-200 dark:border-white/10"
                >
                  Top Up Laps Bank
                </button>

                <button
                  onClick={() => {
                    soundFx.playRev(1.4);
                    onOpenBooking();
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-600/35"
                >
                  <span>Book Heat Slot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* MOTORSPORT TELEMETRY COCKPIT & LIVE HUD */
          <div className="relative z-10 space-y-8">
            {/* Header: Title & Interactive Driver Selector */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-[#0052FF]/15 border border-blue-200 dark:border-[#0052FF]/30 text-blue-700 dark:text-[#38BDF8] text-xs font-mono font-bold uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8]" />
                  <span>FIA RFID Live Telemetry & Driver OS</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-asphalt text-slate-950 dark:text-white leading-[1.05] tracking-[-0.03em]">
                  Real-Time Telemetry <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00D2FF]">
                    1,166M Cockpit HUD
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  Every 200cc Honda pro kart is connected to trackside sector sensors. Lap times, sector splits, and apex speeds sync live to your digital Driver Profile.
                </p>
              </div>

              {/* Interactive Driver Selector Tabs */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                  SELECT TELEMETRY PROFILE:
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {telemetryDrivers.map((driver, idx) => (
                    <button
                      key={driver.id}
                      onClick={() => {
                        soundFx.playGearShift();
                        setSelectedDriverIndex(idx);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-2 border ${
                        selectedDriverIndex === idx
                          ? 'bg-[#0052FF] text-white font-bold border-[#0052FF] shadow-lg shadow-blue-600/30'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                      }`}
                    >
                      <span className="font-extrabold">#{driver.racingNumber}</span>
                      <span>{driver.name.split(' ')[0]}</span>
                      <span className="text-[10px] opacity-75 font-semibold">({driver.bestLap})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Telemetry Cockpit Array */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Card 1: Driver Paddock ID & Ranking Badge (4 Cols) */}
              <div className="lg:col-span-4 rounded-3xl p-6 bg-slate-50 dark:bg-[#070A16] border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-black/60 border border-slate-300 dark:border-white/20 overflow-hidden shadow-md">
                          <img
                            src={activeDriver.avatar}
                            alt={activeDriver.name}
                            loading="lazy"
                            decoding="async"
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-[#0052FF] text-white font-mono font-bold text-[10px] shadow">
                          #{activeDriver.racingNumber}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                          {activeDriver.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          {activeDriver.city}
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-[#38BDF8] border border-blue-200 dark:border-blue-500/30">
                      {activeDriver.tier}
                    </span>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500 dark:text-slate-400 uppercase">Track Machine:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{activeDriver.kart}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500 dark:text-slate-400 uppercase">Leaderboard Rank:</span>
                      <span className="font-extrabold text-blue-600 dark:text-[#00D2FF]">{activeDriver.rank}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500 dark:text-slate-400 uppercase">Lap Bank Balance:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeDriver.lapBalance} Laps Stored</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-600 dark:text-slate-300">RFID Transponder</span>
                  </div>
                  <span className="text-slate-400 dark:text-slate-500">TX-1166#07</span>
                </div>
              </div>

              {/* Card 2: 3-Sector F1 Timing Screen (4 Cols) */}
              <div className="lg:col-span-4 rounded-3xl p-6 bg-slate-50 dark:bg-[#070A16] border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      <Timer className="w-4 h-4 text-[#0066FF] dark:text-[#00D2FF]" />
                      <span>F1 Sector Split Matrix</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold border border-purple-300 dark:border-purple-800">
                      LIVE DELTA: {activeDriver.delta}
                    </span>
                  </div>

                  {/* Sector 1 */}
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Sector 1 (Turns 1–6)</div>
                      <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white mt-0.5">{activeDriver.sector1}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold uppercase ${
                      activeDriver.sector1Purple 
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-emerald-600 text-white shadow-sm'
                    }`}>
                      {activeDriver.sector1Purple ? 'PURPLE' : 'GREEN'}
                    </span>
                  </div>

                  {/* Sector 2 */}
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Sector 2 (Chicanes & Esses)</div>
                      <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white mt-0.5">{activeDriver.sector2}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold uppercase ${
                      activeDriver.sector2Purple 
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-emerald-600 text-white shadow-sm'
                    }`}>
                      {activeDriver.sector2Purple ? 'PURPLE' : 'GREEN'}
                    </span>
                  </div>

                  {/* Sector 3 */}
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Sector 3 (Final Carousel)</div>
                      <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white mt-0.5">{activeDriver.sector3}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold uppercase ${
                      activeDriver.sector3Purple 
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-emerald-600 text-white shadow-sm'
                    }`}>
                      {activeDriver.sector3Purple ? 'PURPLE' : 'GREEN'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-baseline justify-between">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">Lap Record Time</span>
                  <span className="font-mono font-extrabold text-2xl text-purple-700 dark:text-[#A855F7] tracking-tight">
                    {activeDriver.bestLap}
                  </span>
                </div>
              </div>

              {/* Card 3: Speed, RPM & Telemetry Waveform (4 Cols) */}
              <div className="lg:col-span-4 rounded-3xl p-6 bg-slate-50 dark:bg-[#070A16] border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      <Gauge className="w-4 h-4 text-[#0066FF] dark:text-[#00D2FF]" />
                      <span>Speed & G-Force Telemetry</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      100% THROTTLE
                    </span>
                  </div>

                  {/* 3 Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10">
                      <div className="text-[9px] font-mono uppercase text-slate-500 dark:text-slate-400">Peak Speed</div>
                      <div className="font-mono font-extrabold text-base text-blue-600 dark:text-[#38BDF8] mt-0.5">{activeDriver.topSpeed}</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10">
                      <div className="text-[9px] font-mono uppercase text-slate-500 dark:text-slate-400">Max RPM</div>
                      <div className="font-mono font-extrabold text-base text-amber-600 dark:text-amber-400 mt-0.5">{activeDriver.rpm}</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10">
                      <div className="text-[9px] font-mono uppercase text-slate-500 dark:text-slate-400">Lateral G</div>
                      <div className="font-mono font-extrabold text-base text-rose-600 dark:text-rose-400 mt-0.5">{activeDriver.gForce}</div>
                    </div>
                  </div>

                  {/* Telemetry Waveform Graph */}
                  <div className="p-3 rounded-2xl bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10 relative overflow-hidden">
                    <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase flex items-center justify-between mb-1">
                      <span>1,166m Speed Profile (Turns 1-19)</span>
                      <span>85 km/h</span>
                    </div>
                    <div className="h-16 w-full relative">
                      <svg viewBox="0 0 720 100" preserveAspectRatio="none" className="w-full h-full">
                        <defs>
                          <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.02" />
                          </linearGradient>
                        </defs>
                        <path d={activeDriver.svgPath} fill="url(#speedGrad)" />
                        <path
                          d={activeDriver.svgPath.replace(' L720,100 L0,100 Z', '')}
                          fill="none"
                          stroke="#0066FF"
                          strokeWidth="2.5"
                          className="dark:stroke-[#00D2FF]"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Telemetry automatically saves after every race session.</span>
                </div>
              </div>
            </div>

            {/* Bottom Cockpit Action Bar: Demo & Login CTA */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 dark:from-[#0052FF]/15 dark:via-indigo-950/20 dark:to-black/30 border border-blue-200 dark:border-[#0052FF]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#0066FF] dark:text-[#38BDF8]" />
                  <span>Experience the Full Driver Cockpit on Your Phone</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Instant mobile access: track your lap times, bank free laps, and receive RFID telemetry sheets on WhatsApp.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="px-3.5 py-2.5 rounded-full bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-mono font-semibold transition-all border border-slate-300 dark:border-white/15 cursor-pointer shadow-2xs flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3 text-[#0066FF] dark:text-[#38BDF8] fill-current" />
                  <span>Demo (#07 Vikram)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playGearShift();
                    if (onOpenAuth) onOpenAuth();
                  }}
                  className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border border-slate-200 dark:border-white/10 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Driver Log In</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playGearShift();
                    if (onOpenAuth) onOpenAuth();
                  }}
                  className="px-4.5 py-2.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#2563EB] hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-blue-600/30 flex items-center gap-1.5 active:scale-98"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up (+5 Free Laps)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
