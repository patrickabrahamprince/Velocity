import React, { useState } from 'react';
import { Gift, Award, Zap, Phone, User, CheckCircle2, ArrowRight, Sparkles, Trophy, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundEngine';
import type { DriverProfile } from '../types/driverOS';
import { driverStore } from '../utils/driverStore';
import { leadStore } from '../utils/leadStore';

interface RepeatRacerRewardsProps {
  onOpenBooking: () => void;
  onOpenDriverDashboard?: () => void;
  onDriverLogin?: (driver: DriverProfile) => void;
}

export const RepeatRacerRewards: React.FC<RepeatRacerRewardsProps> = ({
  onOpenBooking,
  onDriverLogin,
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockedCode, setUnlockedCode] = useState('');

  const handleClaimVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your full name');
      return;
    }
    const cleanPhone = phoneNumber.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit WhatsApp number');
      return;
    }

    soundFx.playRev(1.5);
    const { driver } = driverStore.loginWithPhone(cleanPhone);
    driver.name = name.trim();
    if (onDriverLogin) onDriverLogin(driver);

    // Save Lead to leadStore
    leadStore.saveLead(name, cleanPhone, 'Rewards & Passes', 'Repeat Racer Rewards');
    localStorage.setItem('vic_prefill_name', name.trim());
    localStorage.setItem('vic_prefill_phone', cleanPhone);

    const randomCoupon = 'VELOCITY200';
    setUnlockedCode(randomCoupon);
    setIsUnlocked(true);

    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#0052FF', '#00D2FF', '#ffffff', '#2563EB'],
    });
  };

  return (
    <section id="club" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="rounded-[2.5rem] bg-white dark:bg-[#0A0E1F]/90 border border-slate-200 dark:border-white/10 p-8 sm:p-12 lg:p-14 text-slate-900 dark:text-white shadow-sm dark:shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & 4 Big Perks */}
          <div className="lg:col-span-7 space-y-6">
            <div className="apple-badge">
              <Sparkles className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#38BDF8]" />
              <span>Velocity Drivers Club • Rewards & Passes</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-asphalt text-slate-950 dark:text-white leading-[1.05] tracking-[-0.03em]">
              Race More <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00D2FF]">
                Earn Free Laps & VIP Rewards
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-apple-text leading-relaxed max-w-xl">
              Every online registration links directly to your WhatsApp. Earn reward points on every lap, receive real-time timing telemetry on your mobile, and unlock instant ₹200 return vouchers.
            </p>

            {/* 4 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070B18]/90 border border-slate-200 dark:border-white/[0.08] hover:border-[#0071E3]/40 transition-all flex items-start gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-[#38BDF8] shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-white font-apple-display">₹200 Welcome Voucher</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-apple-text">Instant ₹200 off for your race booking upon registering</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070B18]/90 border border-slate-200 dark:border-white/[0.08] hover:border-[#0071E3]/40 transition-all flex items-start gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-white font-apple-display">WhatsApp Telemetry</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-apple-text">Sector times and Bengaluru leaderboard rank sent to chat</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070B18]/90 border border-slate-200 dark:border-white/[0.08] hover:border-[#0071E3]/40 transition-all flex items-start gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-white font-apple-display">Birthday Sprint Pass</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-apple-text">Complimentary 5-lap sprint heat during your birthday week</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070B18]/90 border border-slate-200 dark:border-white/[0.08] hover:border-[#0071E3]/40 transition-all flex items-start gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-white font-apple-display">Apex Rooftop Lounge</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-apple-text">Show your digital race pass for 10% off at the cafe diner</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Claim / Coupon Card */}
          <div className="lg:col-span-5 rounded-[2rem] p-1 bg-gradient-to-b from-blue-500/15 via-slate-100 to-white dark:from-white/15 dark:via-white/5 dark:to-transparent border border-blue-200 dark:border-white/10 shadow-sm dark:shadow-2xl">
            <div className="rounded-[1.85rem] bg-white dark:bg-[#070B18]/95 p-6 sm:p-8 border border-slate-200 dark:border-white/[0.08] space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-blue-600 dark:text-[#38BDF8]" />
                  <span className="font-semibold text-xs uppercase text-slate-900 dark:text-white tracking-[0.1em] font-apple-display">
                    Digital Driver Pass
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold">
                  Instant ₹200
                </span>
              </div>

              {!isUnlocked ? (
                <form onSubmit={handleClaimVoucher} className="space-y-4 pt-1">
                  <div>
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white tracking-[-0.02em] font-apple-display">
                      Unlock Your ₹200 Welcome Voucher
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-apple-text">
                      Enter your name and WhatsApp number to generate your coupon code:
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 font-apple-text">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aryan Roy"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.12] text-sm text-slate-900 dark:text-white font-apple-text focus:outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/30 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 font-apple-text">
                      WhatsApp Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98765 43210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.12] text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/30 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 font-apple-display"
                  >
                    <span>Unlock ₹200 Code & Paddock Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-[11px] font-apple-text text-slate-500 dark:text-slate-400 text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Instant coupon code • Instant WhatsApp ticket receipt</span>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4 space-y-4 animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">
                      Your Coupon Code
                    </div>
                    <div className="text-2xl font-mono font-bold text-blue-600 dark:text-[#38BDF8] tracking-wider mt-1 bg-blue-50 dark:bg-blue-950/40 py-2.5 rounded-xl border border-blue-200 dark:border-blue-500/30">
                      {unlockedCode}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-apple-text">
                    Use code <strong className="text-slate-900 dark:text-white font-mono">{unlockedCode}</strong> at checkout for ₹200 off your race booking today!
                  </p>

                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => {
                        soundFx.playRev(1.4);
                        onOpenBooking();
                      }}
                      className="w-full py-3.5 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 font-apple-display"
                    >
                      <span>Apply Coupon & Book Race Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
