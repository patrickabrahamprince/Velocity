import React, { useState } from 'react';
import {
  X,
  User,
  Zap,
  Wallet,
  Gift,
  Trophy,
  Calendar,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  QrCode,
  Share2,
  Phone,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Sparkles,
  ShoppingBag,
  Layers,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../../utils/soundEngine';
import { driverStore, availableLapPacks } from '../../utils/driverStore';
import type { DriverProfile, LapRecord } from '../../types/driverOS';

interface DriverDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: DriverProfile;
  onUpdateDriver: (driver: DriverProfile) => void;
  onOpenBooking: () => void;
  onLogout: () => void;
}

type TabType = 'overview' | 'laps' | 'wallet' | 'rewards' | 'leaderboard' | 'bookings' | 'counter';

const mockGlobalLeaderboard = [
  { rank: 1, name: 'Arjun "Apex" Rao', phone: '98450*****', time: '00:54.212s', kart: 'SODI RT8 #03', gap: 'LEADER', tier: 'Pro Racer' },
  { rank: 2, name: 'Vikramaditya S.', phone: '98801*****', time: '00:54.412s', kart: 'SODI RT8 #07', gap: '+0.200s', tier: 'Club Racer' },
  { rank: 3, name: 'Nisha "Nitro" Patel', phone: '99002*****', time: '00:54.648s', kart: 'SODI RT8 #14', gap: '+0.436s', tier: 'Pro Racer' },
  { rank: 4, name: 'Rohan Mehra', phone: '97403*****', time: '00:55.109s', kart: 'SODI RT8 #22', gap: '+0.897s', tier: 'Club Racer' },
  { rank: 5, name: 'Siddharth V.', phone: '96321*****', time: '00:55.450s', kart: 'SODI RT8 #11', gap: '+1.238s', tier: 'Club Racer' },
  { rank: 6, name: 'Pooja Reddy', phone: '99864*****', time: '00:55.820s', kart: 'SODI RT8 #08', gap: '+1.608s', tier: 'Club Racer' },
  { rank: 7, name: 'Ananya Sharma', phone: '98440*****', time: '00:56.110s', kart: 'SODI RT8 #19', gap: '+1.898s', tier: 'Rookie' },
  { rank: 8, name: 'Karthik Raja', phone: '97390*****', time: '00:56.450s', kart: 'SODI RT8 #02', gap: '+2.238s', tier: 'Club Racer' },
];

export const DriverDashboardModal: React.FC<DriverDashboardModalProps> = ({
  isOpen,
  onClose,
  driver,
  onUpdateDriver,
  onOpenBooking,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [hoveredLap, setHoveredLap] = useState<LapRecord | null>(null);
  const [leaderboardFilter, setLeaderboardFilter] = useState<'weekly' | 'alltime'>('weekly');
  const [counterPhone, setCounterPhone] = useState('');
  const [counterLapsToAdd, setCounterLapsToAdd] = useState(10);
  const [counterNotice, setCounterNotice] = useState('');
  const [showQrModal, setShowQrModal] = useState<string | null>(null);

  if (!isOpen) return null;

  // Simulate buying a lap pack
  const handleBuyPack = (packId: string) => {
    soundFx.playRev(1.6);
    const updated = driverStore.buyLapPackage(packId);
    if (updated) {
      onUpdateDriver(updated);
      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#CCFF00', '#0052FF', '#FF4D00'],
      });
    }
  };

  // Simulate Track Transponder hotlap trigger
  const handleSimulateTransponder = () => {
    soundFx.playRev(1.8);
    const updated = driverStore.addSimulatedLap();
    if (updated) {
      onUpdateDriver(updated);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#CCFF00', '#FFFFFF', '#0052FF'],
      });
    }
  };

  // Counter Staff Fast Lookup / Credit
  const handleCounterCredit = (e: React.FormEvent) => {
    e.preventDefault();
    if (counterPhone.length < 10) {
      alert('Enter a valid 10-digit number');
      return;
    }

    soundFx.playGearShift();
    const { driver: targetDriver } = driverStore.loginWithPhone(counterPhone);
    const updated: DriverProfile = {
      ...targetDriver,
      lapBalance: targetDriver.lapBalance + counterLapsToAdd,
      totalVisits: targetDriver.totalVisits + 1,
    };
    driverStore.saveDriver(updated);

    setCounterNotice(`✓ Successfully credited +${counterLapsToAdd} laps to +91 ${counterPhone}. WhatsApp pass sent!`);
    setTimeout(() => setCounterNotice(''), 5000);
  };

  // SVG Line Chart Calculation for Laps
  const lapsList = driver.laps.slice(0, 20).reverse();
  const minSeconds = lapsList.length > 0 ? Math.min(...lapsList.map((l) => l.lapSeconds)) - 0.5 : 53;
  const maxSeconds = lapsList.length > 0 ? Math.max(...lapsList.map((l) => l.lapSeconds)) + 0.5 : 60;
  const range = maxSeconds - minSeconds || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/85 backdrop-blur-lg animate-fadeIn overflow-hidden">
      <div className="relative w-full max-w-6xl h-[94vh] bg-[#0A0A0A] border border-neutral-800 rounded-[32px] sm:rounded-[40px] shadow-2xl overflow-hidden text-white flex flex-col">
        {/* Glow ambient background elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#0052FF]/15 rounded-full blur-[140px] pointer-events-none" />

        {/* 1. TOP STATUS BAR */}
        <div className="p-4 sm:p-6 bg-neutral-900/60 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Driver Avatar */}
            <div className="relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-neutral-800 border-2 border-[#CCFF00] overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.25)]">
                <img src={driver.avatar} alt={driver.name} className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-black text-[#CCFF00] font-mono font-black text-[9px] border border-[#CCFF00]/50">
                #{driver.racingNumber}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base sm:text-xl text-white">
                  {driver.name}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                  driver.tier === 'Pro Racer'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : driver.tier === 'Club Racer'
                    ? 'bg-[#0052FF]/20 text-[#60A5FA] border border-blue-500/40'
                    : 'bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/40'
                }`}>
                  {driver.tier}
                </span>
              </div>
              <div className="text-xs font-mono text-neutral-400 flex items-center gap-2 mt-0.5">
                <span>+91 {driver.phone}</span>
                <span>•</span>
                <span>{driver.city}</span>
              </div>
            </div>
          </div>

          {/* Quick Balance Pills & Close */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Lap Bank Pill */}
            <div
              onClick={() => {
                soundFx.playGearShift();
                setActiveTab('wallet');
              }}
              className="px-3.5 py-1.5 rounded-2xl bg-neutral-900 border border-neutral-700 hover:border-[#CCFF00] transition-colors cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#CCFF00]" />
              <div>
                <div className="text-[9px] font-mono text-neutral-400 uppercase">LAP BANK</div>
                <div className="font-heading font-black text-xs sm:text-sm text-white">
                  {driver.lapBalance} Laps
                </div>
              </div>
            </div>

            {/* Points Pill */}
            <div
              onClick={() => {
                soundFx.playGearShift();
                setActiveTab('rewards');
              }}
              className="px-3.5 py-1.5 rounded-2xl bg-neutral-900 border border-neutral-700 hover:border-amber-400 transition-colors cursor-pointer flex items-center gap-2"
            >
              <Gift className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[9px] font-mono text-neutral-400 uppercase">REWARDS</div>
                <div className="font-heading font-black text-xs sm:text-sm text-amber-400">
                  {driver.pointsBalance} Pts
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. NAVIGATION TABS (Horizontal scrolling) */}
        <div className="px-4 sm:px-6 bg-neutral-950/80 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto py-2.5 relative z-10 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview', icon: Layers },
            { id: 'laps', label: 'My Laps & Telemetry', icon: TrendingUp },
            { id: 'wallet', label: 'Lap Bank & Buy Laps', icon: Wallet },
            { id: 'rewards', label: 'Coupons & Vouchers', icon: Gift },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'bookings', label: 'Bookings & Gate Pass', icon: Calendar },
            { id: 'counter', label: 'Staff Kiosk Mode', icon: ShoppingBag },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playGearShift();
                  setActiveTab(tab.id as TabType);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#CCFF00] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. MAIN TAB CONTENT AREA (Scrollable) */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1 relative z-10 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 4 Stat Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">BEST LAP TIME</div>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#CCFF00]">
                    {driver.bestLapTime}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-sans">1166M Track Record</div>
                </div>

                <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">GLOBAL RANK</div>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-white">
                    #{driver.globalRank}
                  </div>
                  <div className="text-[11px] text-[#60A5FA] font-sans">Top 5% of Bangalore</div>
                </div>

                <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">TOTAL LAPS COMPLETED</div>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-white">
                    {driver.totalLaps}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-sans">{driver.totalVisits} Track Visits</div>
                </div>

                <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">ACTIVE REPEAT VOUCHERS</div>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-amber-400">
                    {driver.coupons.filter((c) => c.status === 'active').length}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-sans">₹{driver.coupons.reduce((a, b) => a + (b.discountType === 'fixed' ? b.discountValue : 0), 0)} Total Value</div>
                </div>
              </div>

              {/* Fast Action Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Action 1: Transponder Simulation Trigger */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 to-[#121B0A] border border-[#CCFF00]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#CCFF00] uppercase">TRANSPONDER SYNC</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    Simulate Live Hotlap
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Click to test live track timing transponder signal and push a new lap into your telemetry chart.
                  </p>
                  <button
                    onClick={handleSimulateTransponder}
                    className="w-full py-3 rounded-2xl bg-[#CCFF00] hover:bg-[#b8e600] text-black font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Record Hotlap Signal</span>
                    <Zap className="w-4 h-4" />
                  </button>
                </div>

                {/* Action 2: Buy Lap Pack */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 to-[#0A1225] border border-blue-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#60A5FA] uppercase">LAP VAULT PACKS</span>
                    <span className="text-xs font-mono text-neutral-400">SAVE UP TO ₹1250</span>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    Top Up Lap Bank
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Buy discounted lap packs (20 or 50 laps). Laps never expire and can be used on any weekend!
                  </p>
                  <button
                    onClick={() => setActiveTab('wallet')}
                    className="w-full py-3 rounded-2xl bg-[#0052FF] hover:bg-[#0040C7] text-white font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>View Lap Packages</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Action 3: Book Weekend Slot */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-900 to-[#1F120A] border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase">TRACK RESERVATION</span>
                    <span className="text-xs font-mono text-emerald-400">FAST-TRACK PASS</span>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    Book Next Race Heat
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Reserve your date and heat slot online to skip 45-min walk-in lines at the ticket counter.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Book Heat Slot (15% OFF)</span>
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Referral Mini Bar */}
              <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-white">
                      Give ₹100, Get ₹100 Referral Link
                    </div>
                    <div className="text-xs text-neutral-400">
                      Share your code <strong className="text-purple-300 font-mono">{driver.referralCode}</strong> with friends. When they race, you both earn ₹100 credits!
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hey! Use my referral code ${driver.referralCode} for ₹100 off your go-karting race at Velocity International Circuit Hoskote: https://velocityinternationalcircuit.com`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-mono font-bold uppercase shrink-0 flex items-center gap-1.5 hover:bg-[#20bd5a]"
                >
                  <span>Share on WhatsApp ↗</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: MY LAPS & TELEMETRY */}
          {activeTab === 'laps' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-heading font-bold text-xl text-white">
                    Lap Progression & Telemetry Chart
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Live sector deltas recorded by our timing loop transponders across 19 turns.
                  </p>
                </div>

                <button
                  onClick={handleSimulateTransponder}
                  className="px-4 py-2 rounded-xl bg-[#CCFF00] text-black font-mono font-bold text-xs uppercase hover:bg-[#b8e600] flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Simulate Transponder Signal</span>
                </button>
              </div>

              {/* Interactive SVG Lap Graph */}
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 relative">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-4">
                  <span>LAST {lapsList.length} LAPS PROGRESSION</span>
                  <span className="text-[#CCFF00]">PERSONAL BEST: {driver.bestLapTime}</span>
                </div>

                {lapsList.length > 0 ? (
                  <div className="w-full h-48 sm:h-64 relative flex items-end">
                    <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible">
                      {/* Grid Lines */}
                      <line x1="0" y1="50" x2="800" y2="50" stroke="#333" strokeDasharray="4 4" strokeWidth="0.8" />
                      <line x1="0" y1="100" x2="800" y2="100" stroke="#333" strokeDasharray="4 4" strokeWidth="0.8" />
                      <line x1="0" y1="150" x2="800" y2="150" stroke="#333" strokeDasharray="4 4" strokeWidth="0.8" />

                      {/* Area Fill */}
                      <path
                        d={`M 0 200 ${lapsList
                          .map((l, i) => {
                            const x = (i / Math.max(1, lapsList.length - 1)) * 800;
                            const y = 200 - ((l.lapSeconds - minSeconds) / range) * 160 - 20;
                            return `L ${x} ${y}`;
                          })
                          .join(' ')} L 800 200 Z`}
                        fill="url(#limeGradient)"
                        opacity="0.15"
                      />

                      {/* Polyline */}
                      <path
                        d={`M ${lapsList
                          .map((l, i) => {
                            const x = (i / Math.max(1, lapsList.length - 1)) * 800;
                            const y = 200 - ((l.lapSeconds - minSeconds) / range) * 160 - 20;
                            return `${x},${y}`;
                          })
                          .join(' ')}`}
                        fill="none"
                        stroke="#CCFF00"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Data Circles */}
                      {lapsList.map((l, i) => {
                        const x = (i / Math.max(1, lapsList.length - 1)) * 800;
                        const y = 200 - ((l.lapSeconds - minSeconds) / range) * 160 - 20;
                        return (
                          <g key={l.id}>
                            <circle
                              cx={x}
                              cy={y}
                              r={l.isPersonalBest ? 6 : 4}
                              fill={l.isPersonalBest ? '#CCFF00' : '#FFFFFF'}
                              stroke="#0A0A0A"
                              strokeWidth="2"
                              className="cursor-pointer hover:scale-150 transition-transform"
                              onMouseEnter={() => setHoveredLap(l)}
                            />
                          </g>
                        );
                      })}

                      <defs>
                        <linearGradient id="limeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Hovered Lap Badge */}
                    {hoveredLap && (
                      <div className="absolute top-2 right-2 bg-black/90 border border-[#CCFF00] p-3 rounded-xl text-xs font-mono shadow-xl animate-fadeIn">
                        <div className="text-[#CCFF00] font-bold">LAP #{hoveredLap.lapNumber}: {hoveredLap.lapTime}</div>
                        <div className="text-neutral-400 text-[10px] mt-1">
                          S1: {hoveredLap.sector1} • S2: {hoveredLap.sector2} • S3: {hoveredLap.sector3}
                        </div>
                        <div className="text-neutral-400 text-[10px]">
                          Speed: {hoveredLap.topSpeedKmh} km/h • Kart #{hoveredLap.kartNo}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs text-neutral-500 font-mono">
                    No laps recorded yet. Click &ldquo;Simulate Transponder Signal&rdquo; or book a race to start logging your hotlaps!
                  </div>
                )}
              </div>

              {/* Lap Records Table */}
              <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden">
                <div className="p-4 border-b border-neutral-800 font-heading font-bold text-sm text-white">
                  ALL RECORDED LAPS & SECTOR TIMINGS
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-neutral-950 text-neutral-500 text-[10px] uppercase border-b border-neutral-800">
                      <tr>
                        <th className="p-3.5">LAP #</th>
                        <th className="p-3.5">TIME</th>
                        <th className="p-3.5">SECTOR 1</th>
                        <th className="p-3.5">SECTOR 2</th>
                        <th className="p-3.5">SECTOR 3</th>
                        <th className="p-3.5">TOP SPEED</th>
                        <th className="p-3.5">KART</th>
                        <th className="p-3.5">DATE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 text-neutral-300">
                      {driver.laps.map((lap) => (
                        <tr key={lap.id} className="hover:bg-neutral-800/50 transition-colors">
                          <td className="p-3.5 font-bold">#{lap.lapNumber}</td>
                          <td className="p-3.5">
                            <span className={`font-bold ${lap.isPersonalBest ? 'text-[#CCFF00]' : 'text-white'}`}>
                              {lap.lapTime}
                            </span>
                            {lap.isPersonalBest && (
                              <span className="ml-1.5 px-1.5 py-0.5 rounded bg-[#CCFF00]/20 text-[#CCFF00] text-[9px] font-bold">
                                PB
                              </span>
                            )}
                          </td>
                          <td className="p-3.5">{lap.sector1}</td>
                          <td className="p-3.5">{lap.sector2}</td>
                          <td className="p-3.5">{lap.sector3}</td>
                          <td className="p-3.5">{lap.topSpeedKmh} KM/H</td>
                          <td className="p-3.5">#{lap.kartNo}</td>
                          <td className="p-3.5 text-neutral-500">{lap.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MY WALLET & LAP BANK */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-[#101828] to-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-[#CCFF00] font-bold uppercase tracking-wider">
                    CURRENT DRIVER WALLET
                  </div>
                  <h3 className="text-3xl font-heading font-black text-white">
                    {driver.lapBalance} Laps Remaining in Bank
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Use your stored laps anytime at the pit gate. No need to stand in counter lines!
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center">
                    <div className="text-[10px] font-mono text-neutral-500">POINTS</div>
                    <div className="font-heading font-black text-lg text-amber-400">{driver.pointsBalance}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center">
                    <div className="text-[10px] font-mono text-neutral-500">RUPEES</div>
                    <div className="font-heading font-black text-lg text-emerald-400">₹{driver.moneyBalance}</div>
                  </div>
                </div>
              </div>

              {/* 3 Lap Bank Packages */}
              <div className="space-y-3">
                <h4 className="font-heading font-bold text-lg text-white">
                  Buy Lap Bank Packages (Razorpay Instant Credit)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {availableLapPacks.map((pack) => (
                    <div
                      key={pack.id}
                      className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                        pack.popular
                          ? 'bg-neutral-900 border-[#CCFF00] shadow-[0_0_30px_rgba(204,255,0,0.15)] ring-1 ring-[#CCFF00]'
                          : 'bg-neutral-900/60 border-neutral-800'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">
                            {pack.badge}
                          </span>
                          <span className="text-xs font-mono text-emerald-400 font-bold">
                            SAVE ₹{pack.savings}
                          </span>
                        </div>

                        <h5 className="font-heading font-bold text-xl text-white">
                          {pack.title}
                        </h5>

                        <div className="flex items-baseline gap-2 py-2">
                          <span className="font-heading font-black text-3xl text-[#CCFF00]">
                            ₹{pack.price}
                          </span>
                          <span className="text-xs text-neutral-500 line-through font-mono">
                            ₹{pack.originalPrice}
                          </span>
                        </div>

                        <div className="text-xs text-neutral-300 space-y-1">
                          <div>✓ +{pack.laps} Laps credited instantly to wallet</div>
                          <div>✓ Valid all days (Weekdays + Weekends)</div>
                          <div>✓ Shareable with friends & family</div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBuyPack(pack.id)}
                        className={`w-full py-3.5 rounded-2xl font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer mt-6 flex items-center justify-center gap-1.5 ${
                          pack.popular
                            ? 'bg-[#CCFF00] hover:bg-[#b8e600] text-black shadow-lg'
                            : 'bg-white hover:bg-neutral-200 text-black'
                        }`}
                      >
                        <span>Top Up +{pack.laps} Laps</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REWARDS & COUPONS */}
          {activeTab === 'rewards' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-xl text-white">
                    My Active Vouchers & QR Gate Passes
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Show these QR passes at the paddock gate or apply code at online checkout.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {driver.coupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-[#60A5FA] border border-blue-500/30 text-[10px] font-mono font-bold">
                        {coupon.tag}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        Expires: {coupon.expiryDate}
                      </span>
                    </div>

                    <div>
                      <h5 className="font-heading font-bold text-lg text-white">
                        {coupon.title}
                      </h5>
                      <p className="text-xs text-neutral-400 mt-1">
                        {coupon.description}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                      <div>
                        <div className="text-[9px] font-mono text-neutral-500">PROMO CODE</div>
                        <div className="font-mono font-black text-base text-[#CCFF00]">
                          {coupon.code}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          soundFx.playGearShift();
                          setShowQrModal(coupon.code);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white flex items-center gap-1.5 cursor-pointer"
                      >
                        <QrCode className="w-3.5 h-3.5 text-[#CCFF00]" />
                        <span>Show QR</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* QR Modal Popup */}
              {showQrModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                  <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-700 text-center max-w-sm w-full space-y-4 animate-scaleUp">
                    <div className="w-48 h-48 rounded-2xl bg-white p-4 mx-auto flex items-center justify-center">
                      {/* Realistic SVG QR Placeholder */}
                      <QrCode className="w-full h-full text-black" />
                    </div>
                    <div className="font-mono font-bold text-lg text-[#CCFF00]">
                      {showQrModal}
                    </div>
                    <p className="text-xs text-neutral-400">
                      Scan this QR at the Velocity counter or cafe terminal for instant validation.
                    </p>
                    <button
                      onClick={() => setShowQrModal(null)}
                      className="w-full py-3 rounded-xl bg-[#CCFF00] text-black font-heading font-bold text-xs uppercase cursor-pointer"
                    >
                      Close Pass
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: LEADERBOARD */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-heading font-bold text-xl text-white">
                    Velocity Circuit Global Leaderboard
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Official transponder timing records across 1166m track in Hoskote.
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-2xl border border-neutral-800">
                  <button
                    onClick={() => {
                      soundFx.playGearShift();
                      setLeaderboardFilter('weekly');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer ${
                      leaderboardFilter === 'weekly' ? 'bg-[#CCFF00] text-black font-bold' : 'text-neutral-400'
                    }`}
                  >
                    This Week
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playGearShift();
                      setLeaderboardFilter('alltime');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer ${
                      leaderboardFilter === 'alltime' ? 'bg-[#CCFF00] text-black font-bold' : 'text-neutral-400'
                    }`}
                  >
                    All-Time Record
                  </button>
                </div>
              </div>

              {/* Leaderboard Table */}
              <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden">
                <div className="divide-y divide-neutral-800">
                  {mockGlobalLeaderboard.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`p-4 flex items-center justify-between ${
                        entry.name.includes(driver.name.split(' ')[0])
                          ? 'bg-[#CCFF00]/10 border-l-4 border-[#CCFF00]'
                          : 'hover:bg-neutral-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-heading font-black text-xs ${
                          entry.rank === 1
                            ? 'bg-amber-400 text-black'
                            : entry.rank === 2
                            ? 'bg-neutral-300 text-black'
                            : entry.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {entry.rank}
                        </div>

                        <div>
                          <div className="font-heading font-bold text-sm text-white flex items-center gap-2">
                            <span>{entry.name}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400">
                              {entry.tier}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-neutral-400">
                            {entry.kart} • Phone: {entry.phone}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-heading font-black text-sm sm:text-base text-[#CCFF00]">
                          {entry.time}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-500">
                          {entry.gap}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MY BOOKINGS & GATE PASS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-xl text-white">
                    Track Reservations & Active Gate Passes
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Show your booking ID at the pit lane for fast-track entry.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#CCFF00] text-black font-mono font-bold text-xs uppercase hover:bg-[#b8e600] flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Book New Session</span>
                </button>
              </div>

              <div className="space-y-3">
                {driver.bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#CCFF00]">{b.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          b.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <div className="font-heading font-bold text-base text-white">{b.packageName}</div>
                      <div className="text-xs font-mono text-neutral-400">
                        Date: {b.date} • Slot: {b.timeSlot}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={`https://wa.me/919071718620?text=${encodeURIComponent(`Hi Velocity Circuit, I want to manage my booking ${b.id} (${b.packageName}) on ${b.date}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs cursor-pointer flex items-center gap-1"
                      >
                        <span>Reschedule / WhatsApp ↗</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: TRACK COUNTER / STAFF KIOSK MODE */}
          {activeTab === 'counter' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-[#60A5FA] text-xs font-mono font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>CIRCUIT COUNTER & STAFF ONBOARDING DESK</span>
                </div>

                <h4 className="font-heading font-bold text-xl text-white">
                  Fast Walk-in Check-in (5 Seconds)
                </h4>
                <p className="text-xs text-neutral-400">
                  Enter customer phone to look up their wallet, auto-create a profile if new, and credit laps instantly.
                </p>

                <form onSubmit={handleCounterCredit} className="space-y-4 pt-2">
                  <div>
                    <label className="text-xs font-mono text-neutral-400 uppercase block mb-1">
                      CUSTOMER MOBILE NUMBER:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="98801 12345"
                      value={counterPhone}
                      onChange={(e) => setCounterPhone(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-neutral-950 border border-neutral-700 text-white font-mono text-sm focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-neutral-400 uppercase block mb-1">
                      LAPS TO CREDIT:
                    </label>
                    <div className="flex gap-2">
                      {[5, 8, 10, 20, 50].map((laps) => (
                        <button
                          key={laps}
                          type="button"
                          onClick={() => setCounterLapsToAdd(laps)}
                          className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer ${
                            counterLapsToAdd === laps
                              ? 'bg-[#CCFF00] text-black'
                              : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                          }`}
                        >
                          +{laps}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#CCFF00] hover:bg-[#b8e600] text-black font-heading font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer"
                  >
                    Credit Laps & Send WhatsApp Pass
                  </button>

                  {counterNotice && (
                    <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono animate-fadeIn">
                      {counterNotice}
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>

        {/* 4. FOOTER STATUS BAR */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span>DRIVER OS ACTIVE • TRANSPONDERS ONLINE</span>
          </div>

          <button
            onClick={() => {
              soundFx.playGearShift();
              onLogout();
              onClose();
            }}
            className="text-neutral-500 hover:text-rose-400 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
