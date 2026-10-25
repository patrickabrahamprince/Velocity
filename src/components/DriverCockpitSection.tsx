import React, { useState } from 'react';
import {
  Zap,
  Phone,
  User,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Trophy,
  Gift,
  QrCode,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundEngine';
import { driverStore } from '../utils/driverStore';
import { leadStore } from '../utils/leadStore';
import type { DriverProfile } from '../types/driverOS';

interface DriverCockpitSectionProps {
  currentDriver: DriverProfile | null;
  onDriverLogin: (driver: DriverProfile) => void;
  onOpenDriverDashboard: () => void;
  onOpenBooking: () => void;
}

export const DriverCockpitSection: React.FC<DriverCockpitSectionProps> = ({
  currentDriver,
  onDriverLogin,
  onOpenDriverDashboard,
  onOpenBooking,
}) => {
  const [driverName, setDriverName] = useState(() => localStorage.getItem('vic_prefill_name') || '');
  const [phoneNumber, setPhoneNumber] = useState(() => localStorage.getItem('vic_prefill_phone') || '');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phoneNumber.replace(/\D/g, '').slice(-10);
    if (clean.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    soundFx.playGearShift();
    setOtpStep(true);

    leadStore.saveLead(driverName || 'Racer ' + clean.slice(-4), clean, 'Driver OS Pass', 'Driver Cockpit');
    if (driverName.trim()) localStorage.setItem('vic_prefill_name', driverName.trim());
    localStorage.setItem('vic_prefill_phone', clean);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playRev(1.6);
    const { driver } = driverStore.loginWithPhone(phoneNumber);
    if (driverName.trim()) {
      driver.name = driverName.trim();
    }
    onDriverLogin(driver);
    setOtpStep(false);

    confetti({
      particleCount: 130,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#0052FF', '#2563EB', '#38BDF8', '#ffffff'],
    });
  };

  const handleQuickDemoLogin = () => {
    soundFx.playRev(1.4);
    const { driver } = driverStore.loginWithPhone('9071718620');
    onDriverLogin(driver);
  };

  return (
    <section id="driver-os" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Racing Terminal Container */}
      <div className="relative rounded-[36px] bg-white dark:bg-[#0A0E1F]/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white p-6 sm:p-10 lg:p-12 shadow-sm dark:shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden">
        {/* Glowing Background Ambience */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

        {currentDriver ? (
          /* LOGGED IN VIEW */
          <div className="relative z-10 space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100 dark:bg-[#070A14] border border-slate-200 dark:border-white/10 overflow-hidden shadow-md">
                    <img src={currentDriver.avatar} alt={currentDriver.name} className="w-full h-full object-cover" />
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
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    soundFx.playRev(1.2);
                    onOpenDriverDashboard();
                  }}
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-blue-600/35 flex items-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  <span>Open Driver OS</span>
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
                  <div className="text-xs text-slate-500 dark:text-slate-400">Book online with your stored laps or apply your ₹200 repeat voucher.</div>
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
          /* NOT LOGGED IN: INLINE TERMINAL */
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Why Login & Perks */}
            <div className="lg:col-span-7 space-y-6">
              <div className="apple-badge">
                <Sparkles className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8]" />
                <span>Integrated Driver OS & Telemetry</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-asphalt text-slate-950 dark:text-white leading-[1.05] tracking-[-0.03em]">
                Log In With Your Phone <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00D2FF]">
                  Track Laps & Earn VIP Rewards
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-apple-text leading-relaxed max-w-xl">
                Every racer at Velocity gets a digital Driver Profile. Log in with your mobile number to unlock <strong className="text-slate-900 dark:text-white font-semibold">+5 Free Rookie Laps</strong>, save your lap records on your phone, and claim ₹200 vouchers after every visit.
              </p>

              {/* 3 Quick Benefit Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070B18]/90 border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-[#38BDF8] font-semibold">
                    <Zap className="w-4 h-4" />
                    <span>Lap Bank Wallet</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-apple-text">Store laps with zero expiration date</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070B18]/90 border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                    <Trophy className="w-4 h-4" />
                    <span>Live Telemetry</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-apple-text">Sector times sync directly to your phone</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070B18]/90 border border-slate-200 dark:border-white/[0.08] shadow-sm space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Gift className="w-4 h-4" />
                    <span>₹200 Vouchers</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-apple-text">Automatic discounts for repeat visits</div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Performance Card */}
            <div className="lg:col-span-5 rounded-[2rem] p-1 bg-gradient-to-b from-blue-500/15 via-slate-100 to-white dark:from-white/15 dark:via-white/5 dark:to-transparent border border-blue-200 dark:border-white/10 shadow-sm dark:shadow-2xl">
              <div className="rounded-[1.85rem] bg-white dark:bg-[#070B18]/95 p-6 sm:p-8 border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0066FF] dark:bg-[#00D2FF] animate-pulse" />
                    <span className="font-semibold text-xs uppercase text-slate-900 dark:text-white tracking-[0.1em] font-apple-display">
                      Instant Mobile Pass
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    10-Sec Setup
                  </span>
                </div>

                {!otpStep ? (
                  <form onSubmit={handleSendOtp} className="space-y-4 pt-1">
                    {/* Full Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block font-apple-text">
                        Your Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikram Sharma"
                          value={driverName}
                          onChange={(e) => setDriverName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.12] text-slate-900 dark:text-white font-apple-text text-sm focus:outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/30 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Number Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block font-apple-text">
                        WhatsApp Mobile Number
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-white/15 pr-2">
                          <span>+91</span>
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="90717 18620"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full pl-16 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.12] text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/30 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 group font-apple-display"
                    >
                      <span>Unlock Pass & +5 Free Laps</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <div className="pt-2 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Quick Test Demo?</span>
                      <button
                        type="button"
                        onClick={handleQuickDemoLogin}
                        className="text-blue-600 dark:text-[#38BDF8] font-mono hover:underline cursor-pointer font-medium"
                      >
                        ⚡ Log in as Vikram (#07)
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4 pt-1 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-blue-600 dark:text-[#38BDF8] font-semibold">OTP Sent to +91 {phoneNumber}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Enter 6-digit verification code:</div>
                    </div>

                    <div className="flex gap-2">
                      {otp.map((d, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          value={d}
                          onChange={(e) => {
                            const updated = [...otp];
                            updated[i] = e.target.value;
                            setOtp(updated);
                          }}
                          className="w-full h-12 text-center rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.12] text-lg font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/30"
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 font-apple-display"
                    >
                      <span>Verify & Open Driver Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
