import React, { useState, useRef } from 'react';
import { ArrowRight, Trophy, Flag, Route, Sparkles, Phone, User, Check, Copy, Flame, MessageCircle, ShieldCheck, ArrowUpRight, Play, Pause, Video } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundEngine';
import { leadStore, type CapturedLead } from '../utils/leadStore';

interface HeroSectionProps {
  onOpenBooking: (kartName?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('10 Laps All-Days GP (₹699)');
  const [capturedLead, setCapturedLead] = useState<CapturedLead | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleCaptureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please enter your Name and WhatsApp Phone Number');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit WhatsApp number');
      return;
    }

    soundFx.playRev(1.6);
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#0052FF', '#00D2FF', '#ffffff', '#2563EB']
    });

    const lead = leadStore.saveLead(name, phone, interest, 'Hero Form');
    setCapturedLead(lead);

    localStorage.setItem('vic_prefill_name', name);
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
      `Hi Velocity International Circuit! My name is ${capturedLead.name}. I just claimed my ₹200 voucher (code: VELOCITY200) for ${capturedLead.interest}. Please confirm slot availability.`
    );
    window.open(`https://wa.me/919071718620?text=${text}`, '_blank');
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-16 lg:pb-24 max-w-7xl mx-auto w-full">
      {/* Background Ambient Glow & Racing Lighting in Electric Blue */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[500px] bg-[#0052FF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#00D2FF]/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Hero Container with Doppelrand (Double-Bezel) Architecture */}
      <div className="relative rounded-[36px] sm:rounded-[44px] p-2 sm:p-2.5 bg-gradient-to-b from-slate-200/90 via-slate-100 to-white border border-slate-200/80 shadow-[0_25px_60px_-12px_rgba(15,23,42,0.12)] overflow-hidden">
        {/* Inner Core Container */}
        <div className="relative rounded-[30px] sm:rounded-[38px] overflow-hidden bg-[#070A14]/95 p-6 sm:p-10 lg:p-14 border border-slate-800/40">
          {/* Background Video Player Layer with Fallback Poster & Controls */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              poster="/images/velocity_hero_theme.png"
              className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-115 scale-105 transition-opacity duration-1000"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-go-karts-racing-on-a-track-40810-large.mp4"
                type="video/mp4"
              />
              <img
                src="/images/velocity_hero_theme.png"
                alt="Velocity International Circuit Track"
                className="w-full h-full object-cover object-center"
              />
            </video>

            {/* Gradient Mask Overlays so content is 100% legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-[#070A14]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070A14] via-[#070A14]/85 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[length:24px_24px] pointer-events-none" />

            {/* Video Control Pill (Top Right of inner container) */}
            <button
              onClick={toggleVideoPlayback}
              title={isPlaying ? "Pause Background Video" : "Play Background Video"}
              className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span className="text-[11px] font-medium hidden sm:inline">Pause Video</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#0052FF]" />
                  <span className="text-[11px] font-medium hidden sm:inline">Play Video</span>
                </>
              )}
            </button>
          </div>

          {/* Main 2-Column Hero Content */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Headlines & Editorial Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0052FF]/15 border border-[#0052FF]/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-ping" />
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#38BDF8] font-bold">
                  INDIA&apos;S LONGEST FIA CIRCUIT • 1,166 METERS
                </span>
              </div>

              {/* High-Impact Modern Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Real Racing. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#38BDF8]">
                  On India&apos;s Longest Track.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl">
                Experience outdoor go-karting on a real international race track in Hoskote, Bangalore. 19 technical FIA apex corners, tuned 85 km/h racing karts, 2-seater family rides, and panoramic rooftop dining.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    soundFx.playRev(1.4);
                    onOpenBooking();
                  }}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:from-[#0042D9] hover:to-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(0,82,255,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2.5 group"
                >
                  <Flame className="w-4 h-4 fill-current text-white" />
                  <span>Book Race Session</span>
                  <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </button>

                <a
                  href="#circuit"
                  onClick={() => soundFx.playGearShift()}
                  className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Route className="w-4 h-4 text-[#00D2FF]" />
                  <span>Explore 19 Turns</span>
                </a>
              </div>

              {/* Official Velocity Signature Banner Pill (from reference image) */}
              <div className="pt-2">
                <div className="p-1 rounded-full bg-gradient-to-r from-blue-500/30 via-white/10 to-blue-500/30 border border-blue-400/30 shadow-lg backdrop-blur-md max-w-xl">
                  <div className="px-4 py-2 rounded-full bg-[#060D20]/90 flex flex-wrap items-center justify-around gap-2 text-[11px] text-slate-200 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00D2FF]" />
                      <span className="font-semibold">TUNED GO KARTS</span>
                    </div>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
                      <span className="font-semibold">1,166M RACING CIRCUIT</span>
                    </div>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-emerald-400">BEST BUDGET RATES</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telemetry Metric Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">1,166M</div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Track Length</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">19</div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">FIA Turns</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">85+ <span className="text-xs font-normal text-slate-400">km/h</span></div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Fleet Speed</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">6 AM</div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Open Daily</div>
                </div>
              </div>
            </div>

            {/* Right Column: Double-Bezel VIP Paddock Pass Card (Lead Capture in Electric Blue Theme) */}
            <div className="lg:col-span-5">
              <div className="rounded-[30px] p-2 bg-gradient-to-b from-blue-500/25 via-white/5 to-white/0 border border-blue-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
                <div className="rounded-[22px] bg-[#0A0F1E]/95 p-6 sm:p-7 border border-white/5">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0052FF]/20 border border-[#0052FF]/40 text-[#38BDF8] text-[10px] font-mono font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-[#00D2FF]" />
                      <span>OFFICIAL DRIVER PASS</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      SAVE ₹200
                    </span>
                  </div>

                  {!capturedLead ? (
                    <form onSubmit={handleCaptureLead} className="space-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                          Claim ₹200 Off Your Race
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          Enter your Name & WhatsApp number to immediately unlock your VIP ₹200 voucher code & priority track entry.
                        </p>
                      </div>

                      {/* Name Field */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                          Full Name <span className="text-[#0052FF]">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rahul Sharma"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/[0.04] border border-white/10 focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder-slate-500 font-medium focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                          WhatsApp Phone Number <span className="text-[#0052FF]">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                          <input
                            type="tel"
                            required
                            placeholder="e.g. 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-white/[0.04] border border-white/10 focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder-slate-500 font-mono font-medium focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Interest Field */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                          Select Karting Package
                        </label>
                        <select
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                          className="w-full bg-white/[0.04] border border-white/10 focus:border-[#0052FF] rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none transition-all"
                        >
                          <option value="10 Laps All-Days GP (₹699)" className="bg-[#0A0F1E]">🏎️ 10 Laps Pro Racing (₹699 + Tax)</option>
                          <option value="Parent-Child 2-Seater Tandem (₹799)" className="bg-[#0A0F1E]">👨‍👩‍👧 2-Seater Parent-Child Tandem</option>
                          <option value="Student 5 Laps Special (₹299)" className="bg-[#0A0F1E]">🎓 Student Special 5 Laps (₹299)</option>
                          <option value="Superbike Dawn Session (₹1,500)" className="bg-[#0A0F1E]">🏍️ Superbike Sunrise Apex (6-10 AM)</option>
                          <option value="Birthday & Group GP" className="bg-[#0A0F1E]">🎂 Birthday GP / Corporate Outing</option>
                        </select>
                      </div>

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:from-[#0042D9] hover:to-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/35 transition-all duration-200 hover:scale-[1.01] active:scale-95 flex items-center justify-between group cursor-pointer mt-2"
                      >
                        <span>Unlock ₹200 Voucher & Pass</span>
                        <div className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </button>

                      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Instant WhatsApp delivery • 100% spam-free</span>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4 text-center animate-in fade-in zoom-in-95 duration-200 py-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>

                      <div>
                        <h4 className="text-xl font-extrabold text-white tracking-tight">
                          Pass Unlocked, {capturedLead.name}!
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Voucher registered for phone <strong className="text-white font-mono">+91 {capturedLead.phone}</strong>.
                        </p>
                      </div>

                      {/* Digital Coupon Box */}
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-dashed border-[#0052FF] flex items-center justify-between">
                        <div className="text-left">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">PROMO VOUCHER CODE</span>
                          <span className="font-mono text-2xl font-black text-[#38BDF8]">VELOCITY200</span>
                        </div>

                        <button
                          type="button"
                          onClick={handleCopyCode}
                          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-300" />
                              <span>COPY</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-2 pt-2">
                        <button
                          type="button"
                          onClick={handleSendToWhatsApp}
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                          <span>Confirm Slot Over WhatsApp</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenBooking(capturedLead.interest)}
                          className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Apply Code at Checkout Online
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
