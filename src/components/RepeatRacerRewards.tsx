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
    <section id="club" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="rounded-[36px] bg-slate-50 border border-slate-200 p-8 sm:p-12 lg:p-14 text-slate-900 shadow-xl relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & 4 Big Perks */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold tracking-wider uppercase text-[#0052FF]">
              <Sparkles className="w-3.5 h-3.5 text-[#0052FF]" />
              <span>Velocity Drivers Club • Rewards & Passes</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Race More. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-[#2563EB] to-cyan-500">Earn Free Laps & Rewards.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-xl">
              Every online registration links directly to your WhatsApp. Earn reward points on every lap, receive real-time timing telemetry on your mobile, and unlock instant ₹200 return vouchers.
            </p>

            {/* 4 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-start gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0052FF] shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">₹200 Welcome Voucher</div>
                  <div className="text-xs text-slate-600 mt-0.5">Instant ₹200 off for your race booking upon registering</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-start gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">WhatsApp Telemetry</div>
                  <div className="text-xs text-slate-600 mt-0.5">Sector times and Bengaluru leaderboard rank sent to chat</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-start gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Birthday Sprint Pass</div>
                  <div className="text-xs text-slate-600 mt-0.5">Complimentary 5-lap sprint heat during your birthday week</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-start gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">Apex Rooftop Lounge</div>
                  <div className="text-xs text-slate-600 mt-0.5">Show your digital race pass for 10% off at the cafe diner</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Claim / Coupon Card (Double Bezel) */}
          <div className="lg:col-span-5 rounded-[32px] p-2 bg-gradient-to-b from-blue-500/15 via-slate-100 to-white border border-blue-300/40 shadow-xl">
            <div className="rounded-[24px] bg-white p-6 sm:p-8 border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-[#0052FF]" />
                  <span className="font-bold text-xs uppercase text-slate-900 tracking-wider">
                    Digital Driver Pass
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 font-mono text-[11px] font-semibold">
                  Instant ₹200
                </span>
              </div>

              {!isUnlocked ? (
                <form onSubmit={handleClaimVoucher} className="space-y-4 pt-1">
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">
                      Unlock Your ₹200 Welcome Voucher
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Enter your name and WhatsApp number to generate your coupon code:
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aryan Roy"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#0052FF] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                      WhatsApp Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98765 43210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#0052FF] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/35 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Unlock ₹200 Code & Paddock Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-[11px] font-sans text-slate-500 text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant coupon code • Instant WhatsApp ticket receipt</span>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4 space-y-4 animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="text-xs font-mono text-slate-500 uppercase font-semibold">
                      Your Coupon Code
                    </div>
                    <div className="text-2xl font-mono font-bold text-[#0052FF] tracking-wider mt-1 bg-blue-50 py-2.5 rounded-xl border border-blue-200">
                      {unlockedCode}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600">
                    Use code <strong className="text-slate-900 font-mono">{unlockedCode}</strong> at checkout for ₹200 off your race booking today!
                  </p>

                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => {
                        soundFx.playRev(1.4);
                        onOpenBooking();
                      }}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/35 transition-all cursor-pointer flex items-center justify-center gap-2"
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
