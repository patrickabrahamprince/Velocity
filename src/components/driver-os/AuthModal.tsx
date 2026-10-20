import React, { useState } from 'react';
import { X, Phone, ShieldCheck, ArrowRight, User, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../../utils/soundEngine';
import { driverStore } from '../../utils/driverStore';
import type { DriverProfile } from '../../types/driverOS';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (driver: DriverProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'onboarding'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isNewUser, setIsNewUser] = useState(false);
  const [currentDriver, setCurrentDriver] = useState<DriverProfile | null>(null);

  // Onboarding fields
  const [name, setName] = useState('');
  const [dob, setDob] = useState('1998-10-14');
  const [city, setCity] = useState('Bangalore (Indiranagar)');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    soundFx.playGearShift();
    setStep('otp');
  };

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    soundFx.playRev(1.4);

    const { driver, isNew } = driverStore.loginWithPhone(phoneNumber);
    setCurrentDriver(driver);
    setIsNewUser(isNew);

    if (isNew) {
      setStep('onboarding');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#CCFF00', '#0052FF', '#FF4D00'],
      });
    } else {
      onLoginSuccess(driver);
      onClose();
    }
  };

  const handleCompleteOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your driver name.');
      return;
    }

    soundFx.playRev(1.8);
    const updated = driverStore.updateProfile(phoneNumber, {
      name: name.trim(),
      dob,
      city,
    });

    if (updated) {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#CCFF00', '#0052FF', '#FF4D00'],
      });
      onLoginSuccess(updated);
      onClose();
    }
  };

  const handleOtpInput = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const fillDemoOtp = () => {
    soundFx.playGearShift();
    setOtp(['1', '2', '3', '4', '5', '6']);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0A0A0A] border border-neutral-800 rounded-[32px] shadow-2xl overflow-hidden text-white flex flex-col">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#CCFF00]/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#0052FF]/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between relative z-10 bg-neutral-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#CCFF00] text-black font-heading font-black text-base flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.3)]">
              VIC
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white tracking-wide uppercase">
                DRIVER OS LOGIN
              </h3>
              <div className="text-[11px] font-mono text-[#CCFF00] font-semibold flex items-center gap-1.5">
                <span>PHONE OTP AUTHENTICATION</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 relative z-10 space-y-6">
          {/* STEP 1: PHONE NUMBER INPUT */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="space-y-1.5">
                <h4 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  Enter Your Mobile Number
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Login to access your lap bank, fastest telemetry records, and unlock ₹200 repeat vouchers.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  WHATSAPP MOBILE NUMBER:
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-sm font-mono text-neutral-400 border-r border-neutral-700 pr-2">
                    <span>🇮🇳 +91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    autoFocus
                    placeholder="90717 18620"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-24 pr-4 py-3.5 rounded-2xl bg-neutral-900 border border-neutral-700 text-white font-mono text-base focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]"
                  />
                </div>
              </div>

              {/* Quick Demo Number Button */}
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Want to test an existing driver?</span>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playGearShift();
                    setPhoneNumber('9071718620');
                  }}
                  className="text-[#CCFF00] font-mono hover:underline cursor-pointer"
                >
                  Use Demo #9071718620
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#CCFF00] hover:bg-[#b8e600] text-black font-heading font-black text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get 6-Digit Login Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] font-sans text-neutral-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero password hassle • Encrypted phone login</span>
              </div>
            </form>
          )}

          {/* STEP 2: 6-DIGIT OTP VERIFICATION */}
          {step === 'otp' && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <h4 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  Enter 6-Digit Code
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Sent via WhatsApp & SMS to <strong className="text-white font-mono">+91 {phoneNumber}</strong>
                </p>
              </div>

              {/* 6 OTP Boxes */}
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpInput(idx, e.target.value)}
                    className="w-12 h-14 text-center rounded-2xl bg-neutral-900 border border-neutral-700 text-xl font-mono font-bold text-[#CCFF00] focus:outline-none focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <button
                  type="button"
                  onClick={fillDemoOtp}
                  className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-[#CCFF00] border border-neutral-700 cursor-pointer"
                >
                  ⚡ Auto-fill 123456
                </button>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-neutral-400 hover:text-white cursor-pointer underline"
                >
                  Change Number
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleVerifyOtp()}
                className="w-full py-4 rounded-2xl bg-[#CCFF00] hover:bg-[#b8e600] text-black font-heading font-black text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Verify & Launch Driver OS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 3: 10-SECOND FAST ONBOARDING FOR NEW DRIVER */}
          {step === 'onboarding' && (
            <form onSubmit={handleCompleteOnboarding} className="space-y-5">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-[11px] font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>WELCOME! YOU EARNED +5 FREE LAPS & ₹200 REWARD</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  Complete Driver Profile
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Quick 10-second setup so we can sync your lap transponders and birthday gift:
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                    YOUR FULL NAME:
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Rao"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-700 text-white font-sans text-sm focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                    DATE OF BIRTH (FOR FREE BIRTHDAY GRAND PRIX):
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-700 text-white font-mono text-sm focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                    HOME CITY / AREA:
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Whitefield, Bangalore"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-700 text-white font-sans text-sm focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#CCFF00] hover:bg-[#b8e600] text-black font-heading font-black text-xs uppercase tracking-wider shadow-lg hover:scale-[1.02] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Save Profile & Open Driver OS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
