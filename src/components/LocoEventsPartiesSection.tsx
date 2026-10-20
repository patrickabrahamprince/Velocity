import React, { useState } from 'react';
import { Cake, Briefcase, Users, Trophy, Sparkles, Check, ChevronRight, MessageSquare, Flame } from 'lucide-react';

interface LocoEventsPartiesSectionProps {
  onOpenBooking: (pkgName?: string) => void;
}

export function LocoEventsPartiesSection({ onOpenBooking }: LocoEventsPartiesSectionProps) {
  const [activeTab, setActiveTab] = useState<'birthday' | 'corporate' | 'squad'>('birthday');
  const [guestCount, setGuestCount] = useState<number>(12);

  const packages = {
    birthday: {
      title: 'Grand Prix Birthday Celebration',
      tagline: 'Make your birthday an unforgettable 85 km/h celebration on India’s biggest circuit!',
      icon: <Cake className="w-6 h-6 text-[#feb000]" />,
      badge: 'Most Popular for Kids & Adults',
      basePrice: '₹14,999',
      covers: 'Up to 10 Racers',
      features: [
        'Dedicated exclusive track heat with F1 standing grid start',
        'Custom engraved 1st, 2nd, 3rd place podium trophies',
        'Checkered flag cake-cutting ceremony at Apex Rooftop Cafe',
        'Full HD podium photo session with winner caps & laurels',
        'Artisanal pizzas, burger sliders, fries & milkshakes included'
      ]
    },
    corporate: {
      title: 'Corporate Championship Grand Prix',
      tagline: 'Boost team morale with high-adrenaline competition, qualifiers, and executive networking.',
      icon: <Briefcase className="w-6 h-6 text-[#00f0ff]" />,
      badge: 'Executive Team Building',
      basePrice: '₹24,999',
      covers: 'Up to 15 Drivers',
      features: [
        'Timed practice + knockout qualifiers + championship final',
        'Official digital telemetry sheets with sector splits & top speeds',
        'Customized corporate branded trophies with company logo',
        'Full paddock executive lunch/dinner buffet at Apex Lounge',
        'Dedicated race director, marshals, and track photographer'
      ]
    },
    squad: {
      title: 'Squad & Bachelor Adrenaline Night',
      tagline: 'Combine 1166m high-speed asphalt karting with tactical laser combat under floodlights.',
      icon: <Users className="w-6 h-6 text-[#ff3366]" />,
      badge: 'Ultimate Weekend Squad Blast',
      basePrice: '₹12,999',
      covers: 'Up to 8 Racers',
      features: [
        '15 Laps per driver under high-lux stadium floodlights',
        '30-minute tactical infrared Laser Tag squad battle',
        'Pitstop challenge: timed tire-change competition with air tools',
        'Craft non-alcoholic beers, loaded nachos & gourmet barbecue',
        'VIP private deck reservation at Apex Cafe'
      ]
    }
  };

  const currentPkg = packages[activeTab];

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hi Velocity International Circuit! I want to book a ${currentPkg.title} for approximately ${guestCount} people. Please share available weekend/weekday dates and custom pricing.`
    );
    window.open(`https://wa.me/919071718620?text=${text}`, '_blank');
  };

  return (
    <section id="parties" className="py-24 bg-[#07090e] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#feb000]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title (Loco Bear Style) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#feb000]/10 border border-[#feb000]/30 text-[#feb000] text-xs font-black uppercase tracking-wider mb-4">
            <Trophy className="w-3.5 h-3.5 text-[#feb000]" />
            <span>Celebrate At The Track</span>
          </div>
          <h2 className="font-bison text-4xl sm:text-6xl md:text-7xl text-white font-black uppercase tracking-tight">
            Birthday Party • <span className="text-[#feb000]">Corporate Events</span> • Team Building
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            From unforgettable kids birthday GPs with real podium champagne sprays to high-stakes corporate company cups.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab('birthday')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all cursor-pointer ${
              activeTab === 'birthday'
                ? 'bg-[#feb000] text-black shadow-[0_4px_25px_rgba(254,176,0,0.4)] scale-105'
                : 'bg-[#121824] text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            <Cake className="w-4 h-4" />
            <span>Birthday Party GP</span>
          </button>

          <button
            onClick={() => setActiveTab('corporate')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all cursor-pointer ${
              activeTab === 'corporate'
                ? 'bg-[#00f0ff] text-black shadow-[0_4px_25px_rgba(0,240,255,0.4)] scale-105'
                : 'bg-[#121824] text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Corporate Grand Prix</span>
          </button>

          <button
            onClick={() => setActiveTab('squad')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all cursor-pointer ${
              activeTab === 'squad'
                ? 'bg-[#ff3366] text-white shadow-[0_4px_25px_rgba(255,51,102,0.4)] scale-105'
                : 'bg-[#121824] text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team Building & Squads</span>
          </button>
        </div>

        {/* Active Package Showcase Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card (7 Cols) */}
          <div className="lg:col-span-7 loco-card p-8 sm:p-10 flex flex-col justify-between border-[#feb000]/40">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#feb000]/20 text-[#feb000] border border-[#feb000]/30 mb-4">
                {currentPkg.badge}
              </div>

              <h3 className="font-bison text-3xl sm:text-5xl text-white font-black uppercase tracking-wide mb-3">
                {currentPkg.title}
              </h3>
              <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                {currentPkg.tagline}
              </p>

              <div className="space-y-3.5 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Package Highlights:</h4>
                {currentPkg.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-[#feb000]/20 text-[#feb000] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block uppercase font-bold">Package Starting From</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-bison text-3xl font-black text-[#feb000]">{currentPkg.basePrice}</span>
                  <span className="text-xs text-slate-400 font-bold">({currentPkg.covers})</span>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking(currentPkg.title)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#feb000] hover:bg-[#fcd107] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Flame className="w-4 h-4 fill-current" />
                <span>Book This Event</span>
              </button>
            </div>
          </div>

          {/* Right Instant Estimator (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0d121d] border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-black uppercase text-[#feb000] tracking-wider block mb-1">
                  ⚡ Instant Custom Quote
                </span>
                <h4 className="font-bison text-2xl text-white font-black uppercase">
                  Customize Guest Count
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Tailored catering, private briefing rooms, and race slot timings are calculated automatically.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-300 uppercase">Estimated Guests:</span>
                  <span className="font-bison text-2xl text-[#feb000] font-black">{guestCount} People</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="60"
                  step="2"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="w-full accent-[#feb000] h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Track Heats Required:</span>
                  <span className="font-bold text-white">{Math.ceil(guestCount / 8)} Exclusive Heats</span>
                </div>
                <div className="flex justify-between">
                  <span>Trophy Podiums:</span>
                  <span className="font-bold text-[#feb000]">Gold, Silver & Bronze Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Rooftop Cafe Seating:</span>
                  <span className="font-bold text-white">Reserved Private Paddock Area</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <button
                onClick={handleWhatsAppEnquiry}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#25d366] to-[#075e54] text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:brightness-110 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Get Instant WhatsApp Quote ({guestCount} Guests)</span>
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Or speak to our Event Concierge directly: <strong className="text-white">+91 90717 18620</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
