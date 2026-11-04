import React, { useState } from 'react';
import {
  X,
  Phone,
  ShieldCheck,
  ArrowRight,
  User,
  MapPin,
  Sparkles,
  CheckCircle2,
  LogOut,
  Zap,
  Gauge,
  KeyRound,
  UserPlus,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../../utils/soundEngine';
import { driverStore } from '../../utils/driverStore';
import type { DriverProfile } from '../../types/driverOS';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (driver: DriverProfile) => void;
  onLogout?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onLogout,
}) => {
  const currentDriver = driverStore.getCurrentDriver();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginStep, setLoginStep] = useState<'phone' | 'otp'>('phone');
  
  // Login form state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupCity, setSignupCity] = useState('Bangalore (Indiranagar)');
  const [signupNumber, setSignupNumber] = useState('');
  const [signupKart, setSignupKart] = useState('Tuned 200cc Honda Pro Kart');

  if (!isOpen) return null;

  // Handle Quick Demo Login (Instant switch)
  const handleQuickDemoLogin = (phone: string) => {
    soundFx.playRev(1.4);
    const { driver } = driverStore.loginWithPhone(phone);
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#0052FF', '#00D2FF', '#2563EB'],
    });
    onLoginSuccess(driver);
    onClose();
  };

  // Submit Login Phone -> OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    soundFx.playGearShift();
    setLoginStep('otp');
  };

  // Verify OTP
  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    soundFx.playRev(1.5);

    const { driver } = driverStore.loginWithPhone(phoneNumber);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#0052FF', '#00D2FF', '#10B981'],
    });
    onLoginSuccess(driver);
    onClose();
  };

  // Submit Sign Up Form
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim()) {
      alert('Please enter your driver full name.');
      return;
    }
    const cleanPhone = signupPhone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    soundFx.playRev(1.8);
    const newDriver = driverStore.signUpNewDriver({
      name: signupName.trim(),
      phone: cleanPhone,
      city: signupCity.trim(),
      racingNumber: signupNumber.trim() || undefined,
      kartPreference: signupKart,
    });

    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#0052FF', '#00D2FF', '#10B981', '#F59E0B'],
    });

    onLoginSuccess(newDriver);
    onClose();
  };

  const handleOtpInput = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);

    if (val && index < 5) {
      const nextInput = document.getElementById(`auth-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const fillDemoOtp = () => {
    soundFx.playGearShift();
    setOtp(['1', '2', '3', '4', '5', '6']);
  };

  const handleLogoutAction = () => {
    soundFx.playGearShift();
    driverStore.logout();
    if (onLogout) onLogout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0B1026] border border-slate-200 dark:border-white/10 rounded-[32px] shadow-2xl overflow-hidden text-slate-900 dark:text-white flex flex-col max-h-[90vh]">
        
        {/* Glow ambient background accents */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between relative z-10 bg-slate-50/70 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] text-white font-bold text-sm flex items-center justify-center shadow-md shadow-blue-500/30">
              VIC
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-950 dark:text-white tracking-tight">
                Driver OS Authentication
              </h3>
              <div className="text-[11px] font-mono text-[#0066FF] dark:text-[#38BDF8] font-semibold flex items-center gap-1.5">
                <span>FIA RFID & TELEMETRY ACCESS</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Currently Logged In Notification Banner (if any) */}
        {currentDriver && (
          <div className="px-5 sm:px-6 py-2.5 bg-blue-50/80 dark:bg-blue-500/10 border-b border-blue-100 dark:border-blue-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-700 dark:text-slate-200">
                Logged in as <strong className="text-slate-950 dark:text-white">{currentDriver.name} (#{currentDriver.racingNumber})</strong>
              </span>
            </div>
            <button
              onClick={handleLogoutAction}
              className="font-mono text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              <LogOut className="w-3 h-3" />
              <span>Log Out</span>
            </button>
          </div>
        )}

        {/* Tab Switcher: Log In vs Sign Up */}
        <div className="p-4 sm:p-5 pb-0 relative z-10">
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-white/[0.06] rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                soundFx.playGearShift();
                setActiveTab('login');
              }}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white dark:bg-[#0052FF] text-slate-950 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Log In (Racer Pass)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.playGearShift();
                setActiveTab('signup');
              }}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-white dark:bg-[#0052FF] text-slate-950 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up (+5 Free Laps)</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* ================================================================ */}
          {/* TAB 1: LOG IN                                                    */}
          {/* ================================================================ */}
          {activeTab === 'login' && (
            <div className="space-y-5">
              {loginStep === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-slate-950 dark:text-white">
                      Enter Registered WhatsApp Number
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Login to access your stored laps, telemetry splits, and repeat race discounts.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider block font-bold">
                      WhatsApp Mobile Number:
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-300 border-r border-slate-300 dark:border-white/10 pr-2.5">
                        <span>🇮🇳 +91</span>
                      </div>
                      <input
                        type="tel"
                        required
                        autoFocus
                        placeholder="90717 18620"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-24 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#0052FF] focus:bg-white dark:focus:bg-white/[0.08] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052FF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <span>Get Login Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* 1-Click Instant Test Drivers */}
                  <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-semibold">
                      <span>⚡ One-Click Demo Racers:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">Instant Login</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('9071718620')}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 hover:bg-blue-50/60 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-left transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00D2FF]">
                            Vikram Malhotra
                          </span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-cyan-400">
                            #07
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          8 Laps Stored • 54.412s PB
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('9845012345')}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 hover:bg-blue-50/60 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-left transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00D2FF]">
                            Arjun Rao
                          </span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                            #44
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          14 Laps • Bengaluru #1
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                /* Step 2: OTP Verification */
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-slate-950 dark:text-white">
                      Enter 6-Digit Verification Code
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Sent to WhatsApp <strong className="text-slate-900 dark:text-white font-mono">+91 {phoneNumber}</strong>
                    </p>
                  </div>

                  {/* 6 OTP Boxes */}
                  <div className="flex justify-between gap-1.5 sm:gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`auth-otp-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpInput(idx, e.target.value)}
                        className="w-11 h-13 text-center rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-lg font-mono font-bold text-blue-600 dark:text-[#38BDF8] focus:outline-none focus:border-[#0052FF]"
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <button
                      type="button"
                      onClick={fillDemoOtp}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-white/10 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-white/10 cursor-pointer font-bold"
                    >
                      ⚡ Auto-fill 123456
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginStep('phone')}
                      className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer underline"
                    >
                      Change Number
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleVerifyOtp()}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052FF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <span>Verify & Open Driver Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: SIGN UP / CREATE DIGITAL DRIVER PASS                      */}
          {/* ================================================================ */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono font-bold">
                  <Sparkles className="w-3 h-3" />
                  <span>INCLUDES +5 FREE ROOKIE LAPS & ₹200 VOUCHER</span>
                </div>
                <h4 className="text-xl font-bold text-slate-950 dark:text-white">
                  Create Driver Profile
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Instant registration to store your telemetry, personal best lap records, and earn rewards.
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-3">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold block">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0052FF]"
                    />
                  </div>
                </div>

                {/* WhatsApp Phone */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold block">
                    WhatsApp Mobile Number *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-mono text-slate-500 border-r border-slate-300 dark:border-white/10 pr-2">
                      <span>🇮🇳 +91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="90717 18620"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      className="w-full pl-22 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-[#0052FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* City */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold block">
                      City / Area
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. Bangalore"
                        value={signupCity}
                        onChange={(e) => setSignupCity(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#0052FF]"
                      />
                    </div>
                  </div>

                  {/* Preferred Racing Number */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold block">
                      Racing # (Optional)
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      placeholder="e.g. 07 or 44"
                      value={signupNumber}
                      onChange={(e) => setSignupNumber(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#0052FF]"
                    />
                  </div>
                </div>

                {/* Ride Preference */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold block">
                    Preferred Kart / Track Ride
                  </label>
                  <select
                    value={signupKart}
                    onChange={(e) => setSignupKart(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#0052FF] cursor-pointer"
                  >
                    <option value="Tuned 200cc Honda Pro Kart">🏎️ Tuned 200cc Honda Pro Kart (65+ km/h)</option>
                    <option value="Tandem Twin 2-Seater Kart">🏎️ Tandem Twin 2-Seater (Parent & Kid / Couple)</option>
                    <option value="Dawn Superbike Session">🏍️ Dawn Superbike Open Track Session (6-10 AM)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052FF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <span>Create Pass & Claim +5 Free Laps 🚀</span>
              </button>
            </form>
          )}

          {/* Trust Badges */}
          <div className="pt-2 flex items-center justify-center gap-4 text-[11px] font-sans text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              100% Secure Access
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Real-time Laps & Rewards
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
