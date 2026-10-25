import React, { useState } from 'react';
import { Trophy, Flag, Sparkles, Phone, User, Check, Copy, Flame, MessageCircle, ShieldCheck, ArrowUpRight, ArrowRight, Zap, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundEngine';
import { leadStore, type CapturedLead } from '../utils/leadStore';

interface HeroSectionProps {
  onOpenBooking: (kartName?: string) => void;
}

const heroExperiences = [
  {
    id: 'karts',
    label: 'Pro Go-Karts',
    tag: '1,166M FIA ASPHALT',
    title: 'Tuned 270cc Honda Pro Karts',
    badge: '85+ KM/H FLEET',
    image: '/images/track_apex_daytime.jpg',
    telemetry: 'Turn 7 Apex • 82 km/h • High Grip Tarmac',
  },
  {
    id: 'family',
    label: '2-Seater Tandem',
    tag: 'PARENT + CHILD RIDES',
    title: 'Dual Steering Tandem Karts',
    badge: 'AGES 4+ WITH PARENT',
    image: '/images/family_tandem_kart.jpg',
    telemetry: 'Pit Straight • Dual Harness • Steel Roll Cage',
  },
  {
    id: 'superbikes',
    label: 'Superbike Sunrise',
    tag: '06:00 AM – 10:00 AM',
    title: 'Dawn Superbike Open Track',
    badge: '300CC TO 1000CC+',
    image: '/images/bike_track_sunrise.jpg',
    telemetry: 'Sunrise Mist • 4 Hours Open Track • Free Breakfast',
  },
  {
    id: 'rooftop',
    label: 'Apex Rooftop Diner',
    tag: 'PANORAMIC CIRCUIT VIEW',
    title: 'Rooftop Cafe & Night GP',
    badge: 'OPEN TILL 11:30 PM',
    image: '/images/velocity_cafe_lifestyle.jpg',
    telemetry: 'Overlooking Final 3 Turns • Artisanal Pizzas & Burgers',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [activeExp, setActiveExp] = useState(0);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [capturedLead, setCapturedLead] = useState<CapturedLead | null>(null);
  const [copied, setCopied] = useState(false);

  const currentExp = heroExperiences[activeExp];

  const handleCaptureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      alert('Please enter your WhatsApp Phone Number');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit WhatsApp number');
      return;
    }

    const leadName = name.trim() || 'Racer';
    soundFx.playRev(1.6);
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#0052FF', '#00D2FF', '#ffffff', '#2563EB'],
    });

    const lead = leadStore.saveLead(leadName, cleanPhone, currentExp.title, 'Hero Fast Voucher');
    setCapturedLead(lead);

    localStorage.setItem('vic_prefill_name', leadName);
    localStorage.setItem('vic_prefill_phone', cleanPhone);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('VELOCITY200');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToWhatsApp = () => {
    if (!capturedLead) return;
    const text = encodeURIComponent(
      `Hi Velocity International Circuit! I just unlocked my ₹200 voucher (code: VELOCITY200). Please share upcoming slot availability for ${capturedLead.interest}.`
    );
    window.open(`https://wa.me/919071718620?text=${text}`, '_blank');
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-10 lg:pb-16">
      {/* Background Ambient Lighting in Cobalt Blue */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-[#0052FF]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#00D2FF]/6 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Hero Chassis */}
      <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-white dark:bg-[#070A14] border border-slate-200/90 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px] xl:min-h-[660px]">
          
          {/* Left Column (Editorial Headline & Booking CTAs) */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between z-10 bg-white/95 dark:bg-[#070A14]/95">
            <div className="space-y-6">
              {/* Circuit Category Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-white/[0.06] border border-blue-200/80 dark:border-white/10 text-xs font-semibold text-blue-700 dark:text-sky-300">
                <span className="w-2 h-2 rounded-full bg-[#0052FF] dark:bg-[#00D2FF] animate-pulse" />
                <span>Karnataka&apos;s Biggest Outdoor Circuit • 1,166m</span>
              </div>

              {/* Asphalt 8 Racing Style Display Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-[3.6rem] font-asphalt text-slate-950 dark:text-white leading-[1.06] tracking-tight">
                Real Racing on{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-[#0066FF] to-[#00D2FF]">
                  Karnataka&apos;s Biggest
                </span>{' '}
                Asphalt Circuit
              </h1>

              {/* Clean Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl">
                Experience high-speed outdoor go-karting on authentic FIA-standard asphalt in Hoskote, Bangalore. 19 apex corners, tuned Honda karts, 2-seater family rides, and panoramic rooftop dining.
              </p>

              {/* Primary Call-to-Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  onClick={() => {
                    soundFx.playRev(1.4);
                    onOpenBooking(currentExp.title);
                  }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0052FF] via-[#0066FF] to-[#00D2FF] hover:brightness-110 text-white font-semibold text-sm tracking-wide shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <Flame className="w-4 h-4 fill-current" />
                  <span>Book Race Session (Save ₹200)</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>

                <a
                  href="#about"
                  onClick={() => soundFx.playGearShift()}
                  className="px-6 py-4 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-medium text-sm transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#0066FF] dark:text-[#00D2FF]" />
                  <span>Explore What We Offer</span>
                </a>
              </div>
            </div>

            {/* Bottom 4-Column Metric Strip */}
            <div className="pt-8 mt-8 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">1,166M</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Track Length</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">19</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">FIA Apex Turns</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">85+ <span className="text-xs font-normal text-slate-500">km/h</span></div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Fleet Speed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">6 AM</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Open Daily</div>
              </div>
            </div>
          </div>

          {/* Right Column (Dynamic Visual Action Stage & Fast Voucher) */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-full overflow-hidden bg-slate-900 flex flex-col justify-between p-6 sm:p-8">
            {/* Background Action Photo with Smooth Transition */}
            <img
              key={currentExp.image}
              src={currentExp.image}
              alt={currentExp.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out hover:scale-105"
            />

            {/* Subtle Gradient Vignette so overlays are ultra-crisp */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />

            {/* Top Interactive Experience Tabs */}
            <div className="relative z-10 flex flex-wrap items-center gap-2">
              {heroExperiences.map((exp, index) => (
                <button
                  key={exp.id}
                  onClick={() => {
                    soundFx.playGearShift();
                    setActiveExp(index);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer backdrop-blur-md ${
                    activeExp === index
                      ? 'bg-white text-slate-900 shadow-md font-semibold'
                      : 'bg-black/40 hover:bg-black/60 text-white/90 border border-white/20'
                  }`}
                >
                  {exp.label}
                </button>
              ))}
            </div>

            {/* Bottom Panel: Telemetry HUD + Instant ₹200 Voucher Drawer */}
            <div className="relative z-10 space-y-3 pt-12">
              {/* Telemetry Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-sky-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                <span>{currentExp.telemetry}</span>
              </div>

              {/* Instant ₹200 Pass Voucher Capsule */}
              <div className="rounded-2xl bg-white/95 dark:bg-[#070A14]/95 backdrop-blur-xl p-4 sm:p-5 border border-white/30 dark:border-white/10 shadow-xl text-slate-900 dark:text-white">
                {!capturedLead ? (
                  <form onSubmit={handleCaptureLead} className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex-1 w-full space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Claim Instant ₹200 Track Voucher</span>
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Coupon: VELOCITY200</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="tel"
                          required
                          placeholder="Enter 10-digit WhatsApp number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-white/[0.06] border border-slate-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0052FF]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0052FF] hover:bg-[#0042D9] text-white text-xs font-semibold whitespace-nowrap shadow-md cursor-pointer transition-all active:scale-95 shrink-0"
                    >
                      Unlock ₹200 Pass →
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>₹200 Voucher Ready: VELOCITY200</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Registered to +91 {capturedLead.phone}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        {copied ? 'Copied!' : 'Copy Code'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenBooking(currentExp.title)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#0052FF] text-white text-xs font-semibold hover:bg-[#0042D9] transition-colors cursor-pointer"
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
