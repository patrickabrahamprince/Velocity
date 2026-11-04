import React, { useState } from 'react';
import { 
  Trophy, 
  ArrowRight, 
  Bike, 
  Utensils, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Check 
} from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface KartOffer {
  id: string;
  name: string;
  fullName: string;
  tagline: string;
  price: string;
  taxNote: string;
  laps: string;
  badge: string;
  badgeStyle: string;
  timing: string;
  popular?: boolean;
  features: string[];
  buttonText: string;
}

// All 4 Karting Offers in ONE unified row with clean, aligned headers
const allKartOffers: KartOffer[] = [
  {
    id: 'normal-10-laps',
    name: '10 Laps Normal',
    fullName: '10 Laps Normal Session',
    tagline: 'Standard Pitlane Queue • All Days',
    price: '699',
    taxNote: '+ 18% TAX',
    laps: '10 Laps • 1,166M Track',
    badge: 'ALL-DAYS PASS',
    badgeStyle: 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300 border-slate-200 dark:border-white/10',
    popular: false,
    timing: '9 AM – 11 PM',
    features: [
      '10 Full Throttle Flying Laps (11.6 KM)',
      'Tuned 200cc Honda Racing Pro Kart',
      'Standard Pitlane Staging Queue',
      'Live F1 RFID Transponder Timing',
      'Top 3 Podium Trophy Ceremony Access',
    ],
    buttonText: 'Book Normal (₹699)',
  },
  {
    id: 'fastrak-10-laps',
    name: '10 Laps Fastrak',
    fullName: '10 Laps Fastrak VIP Session',
    tagline: 'Priority Zero-Wait Lane • Direct Grid',
    price: '899',
    taxNote: '+ 18% TAX',
    laps: '10 Laps • Zero Waiting',
    badge: '⚡ ZERO WAITING',
    badgeStyle: 'bg-blue-600/10 text-blue-700 dark:text-[#00D2FF] border-blue-500/30 font-bold',
    popular: true,
    timing: '9 AM – 11 PM',
    features: [
      'Priority Fastrak Pitlane Bypass',
      'Zero Waiting • Direct Grid Boarding',
      '10 Full Throttle Flying Laps (11.6 KM)',
      'Tuned 200cc Honda Racing Pro Kart',
      'Personal Telemetry Sheet & Podium Access',
    ],
    buttonText: 'Book Fastrak VIP (₹899)',
  },
  {
    id: 'weekday-8-laps',
    name: '8 Laps Weekday',
    fullName: '8 Laps Weekday Sprint',
    tagline: 'Mon to Fri Sprint (Excl. Holidays)',
    price: '499',
    taxNote: '+ 18% TAX',
    laps: '8 Laps • Mon to Fri',
    badge: 'WEEKDAY PASS',
    badgeStyle: 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300 border-slate-200 dark:border-white/10',
    popular: false,
    timing: '9 AM – 11 PM',
    features: [
      '8 Full Throttle Championship Laps (9.3 KM)',
      'Tuned 200cc Honda Racing Pro Kart',
      'Night Track Racing Under Floodlights',
      'Live Sector Transponder Telemetry',
      'Apex Viewing Deck Lounge Access',
    ],
    buttonText: 'Book Weekday (₹499)',
  },
  {
    id: 'student-5-laps',
    name: '5 Laps Student',
    fullName: '5 Laps Student Special',
    tagline: 'Student ID Required at Pitlane',
    price: '299',
    taxNote: '+ 18% TAX',
    laps: '5 Laps • Student Special',
    badge: 'STUDENT PASS',
    badgeStyle: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 font-bold',
    popular: false,
    timing: '9 AM – 6 PM',
    features: [
      '5 High-Speed Laps on 1,166m Circuit',
      'Tuned 200cc Honda Racing Pro Kart',
      'DOT Helmet & Balaclava Included Free',
      'Valid Student ID Mandatory at Gate',
      'Live Sector Transponder Timing',
    ],
    buttonText: 'Book Student (₹299)',
  },
];

// Food Combos
const foodCombos = [
  {
    id: 'combo-fastrak',
    name: '10 Laps Fastrak VIP + Energy',
    price: '899',
    taxNote: '+ TAX',
    laps: '10 Laps • Fast Lane Priority',
    badge: '⚡ ZERO WAITING',
    popular: true,
    timing: 'Valid All Days',
    validity: 'Priority Fastrak Pitlane • Zero Waiting Delay',
    foodIncluded: 'Fastrak VIP Pitlane Entry + Red Bull / Energy Drink ⚡',
    features: [
      '10 Full Throttle Flying Laps (11.6 KM)',
      'Zero Waiting Time in Pitlane Queue',
      'Tuned 200cc Honda Racing Engine',
      'Direct Grid Access & Fastrak Priority',
      'Chilled Red Bull or Energy Drink at Pitlane',
    ],
    buttonText: 'Reserve Fastrak Combo (₹899)',
  },
  {
    id: 'combo-birthday',
    name: 'Birthday & Group Celebration GP',
    price: '999',
    taxNote: '+ TAX',
    laps: '6 Laps • Combo Pack',
    badge: '🎂 GROUP SPECIAL',
    popular: false,
    timing: 'Valid All Days',
    validity: '6 Laps + Artisanal Meal & Beverage at Apex Cafe',
    foodIncluded: 'Signature Smash Burger / Pizza Slice + Chilled Beverage 🍔🥤',
    features: [
      '6 Championship Laps on 1,166m Circuit',
      'Tuned 200cc Honda Racing Engine',
      'Freshly prepared meal at Apex Rooftop Cafe',
      'Top 3 Podium Trophy & Photo Ceremony',
      'Live Leaderboard Transponder Timing',
    ],
    buttonText: 'Reserve Birthday Combo (₹999)',
  },
  {
    id: 'combo-weekday-burger',
    name: 'Weekday Sprint + Burger Combo',
    price: '649',
    taxNote: '+ TAX',
    laps: '8 Laps • Mon-Fri Pass',
    badge: 'WEEKDAY COMBO',
    popular: false,
    timing: 'Mon – Fri (9 AM – 6 PM)',
    validity: '8 Laps + Trackside Burger & Drink',
    foodIncluded: 'Crispy Veg / Chicken Burger + Soft Drink 🍔🥤',
    features: [
      '8 High-Speed Flying Laps',
      'Tuned 200cc Honda Racing Engine',
      'Trackside meal at Apex Rooftop Cafe',
      'Mon – Fri (9 AM – 6 PM)',
      'Digital Telemetry Timing Sheet',
    ],
    buttonText: 'Reserve Weekday Combo (₹649)',
  },
];

// Superbike Passes
const bikeOffers = [
  {
    id: 'bike-15-min',
    name: '15-Minute Track Session',
    price: '500',
    taxNote: '+ TAX',
    laps: '15 Mins • Half or Full Track',
    badge: '⚡ QUICK PASS',
    timing: 'Daytime (Subject to Track Availability)',
    validity: '15 Minutes session on half track or full track when available',
    features: [
      '15 Minutes of Uninterrupted Open Track Asphalt',
      'Half Track or Full Track access (based on live track availability)',
      'Open for 300cc to 1000cc+ motorcycles',
      'Live Sector Transponder Lap Timing',
      'Full riding gear mandatory (Ride Safe • Come Back Safe)',
    ],
  },
  {
    id: 'bike-dawn-session',
    name: 'Superbike Dawn Session (4 Hours)',
    price: '1500',
    taxNote: '+ TAX',
    laps: '4 Hours Unlimited Track',
    badge: '6 AM TO 10 AM',
    popular: true,
    timing: '06:00 AM TO 10:00 AM',
    validity: 'Open track for 300cc–1000cc+ motorcycles',
    foodIncluded: 'Combo Protein Breakfast (Bread Omelet / Veg Sandwich) + Hot Cappuccino ☕🥪',
    features: [
      '4 Hours of Unlimited Track Access (6:00 AM – 10:00 AM)',
      'Combo Protein Breakfast (Bread Omelet or Veg Sandwich)',
      'Fresh Hot Cappuccino at Apex Rooftop Cafe',
      'Open track for knee-dragging & apex practice before highway traffic',
      'Full riding gear mandatory (Ride Safe • Come Back Safe)',
    ],
  },
];

interface PricingSectionProps {
  onSelectPlan: (planName: string, price: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [activeTab, setActiveTab] = useState<'kart-offers' | 'food-combos' | 'bike-ride'>('kart-offers');

  return (
    <section id="pricing" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/10 via-[#00D2FF]/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200/80 dark:border-white/10">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-white/[0.06] border border-blue-500/20 dark:border-white/[0.12] text-xs font-bold tracking-[0.16em] uppercase text-blue-700 dark:text-sky-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] dark:bg-[#00D2FF]" />
              <span>Transparent Passes • 1,166M Track</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-asphalt text-slate-950 dark:text-white leading-[1.05] tracking-[-0.03em]">
              Standard <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00D2FF]">Race Packages</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-white/70 max-w-xl font-normal leading-relaxed">
              Transparent per-session pricing with zero hidden fees. Includes full safety briefing, DOT-certified helmets, balaclava & RFID transponder telemetry sheets.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="bg-slate-100/90 dark:bg-[#080C1A]/80 backdrop-blur-2xl p-1.5 rounded-full border border-slate-200 dark:border-white/[0.12] shadow-sm inline-flex flex-wrap items-center gap-1 shrink-0">
            <button
              onClick={() => {
                soundFx.playGearShift();
                setActiveTab('kart-offers');
              }}
              className={`px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 active:scale-[0.98] ${
                activeTab === 'kart-offers'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-md shadow-blue-600/35'
                  : 'text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Karting Laps</span>
            </button>

            <button
              onClick={() => {
                soundFx.playGearShift();
                setActiveTab('food-combos');
              }}
              className={`px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 active:scale-[0.98] ${
                activeTab === 'food-combos'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-md shadow-blue-600/35'
                  : 'text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Kart + Food Combos</span>
            </button>

            <button
              onClick={() => {
                soundFx.playGearShift();
                setActiveTab('bike-ride');
              }}
              className={`px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 active:scale-[0.98] ${
                activeTab === 'bike-ride'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-md shadow-blue-600/35'
                  : 'text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Superbike Dawn Pass</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ALL 4 KARTING OFFERS IN ONE SINGLE ROW WITH DELIGHTFUL HOVER EFFECTS */}
        {activeTab === 'kart-offers' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch pt-8 sm:pt-10">
              {allKartOffers.map((offer) => (
                <div
                  key={offer.id}
                  onMouseEnter={() => soundFx.playGearShift()}
                  className={`group cursor-pointer p-6 sm:p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                    offer.popular
                      ? 'bg-white dark:bg-[#0D132A] border-2 border-[#0052FF] dark:border-[#00D2FF] shadow-[0_20px_50px_rgba(0,102,255,0.22)] scale-[1.02] lg:-translate-y-2.5 hover:-translate-y-4 hover:shadow-[0_28px_65px_rgba(0,102,255,0.35)] dark:hover:shadow-[0_28px_65px_rgba(0,210,255,0.35)] z-10 text-slate-950 dark:text-white'
                      : 'bg-white dark:bg-[#0A0E22]/90 border border-slate-200 dark:border-white/10 hover:border-[#0066FF] dark:hover:border-[#00D2FF] hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,102,255,0.12)] dark:hover:shadow-[0_20px_50px_rgba(0,102,255,0.25)] text-slate-950 dark:text-white'
                  }`}
                >
                  {/* Top Laser/Neon Glow Line on Hover */}
                  <div className="absolute inset-x-8 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#0066FF] dark:via-[#00D2FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Floating Most Popular VIP Crown Badge on Fastrak */}
                  {offer.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 transition-transform duration-300 group-hover:scale-105">
                      <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold text-[10px] font-mono uppercase tracking-wider shadow-md flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                        <span>★ MOST POPULAR CHOICE</span>
                      </span>
                    </div>
                  )}

                  <div>
                    {/* 1. Header Top Strip: Badge & Timing */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-white/5">
                      <span className={`text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-lg border transition-colors duration-200 ${
                        offer.popular
                          ? 'border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-[#00D2FF]'
                          : 'border-slate-200 dark:border-white/10 group-hover:border-blue-500/40 group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-[#00D2FF]'
                      }`}>
                        {offer.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1 whitespace-nowrap group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0 group-hover:text-blue-500 transition-colors" />
                        <span>{offer.timing}</span>
                      </span>
                    </div>

                    {/* 2. Title & Unified 1-Line Tagline */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-[#00D2FF] transition-colors duration-200">
                        {offer.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 truncate">
                        {offer.tagline}
                      </p>
                    </div>

                    {/* 3. Price Block (Horizontally aligned, scales slightly on hover) */}
                    <div className="py-4 border-y border-slate-100 dark:border-white/10 mb-5 group-hover:border-blue-200 dark:group-hover:border-blue-500/20 transition-colors">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white font-mono transition-transform duration-200 group-hover:scale-[1.03] inline-block origin-left">
                          ₹{offer.price}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 dark:text-slate-500">
                          {offer.taxNote}
                        </span>
                      </div>
                      <div className={`text-xs font-semibold mt-1 font-mono transition-colors ${offer.popular ? 'text-blue-600 dark:text-[#00D2FF]' : 'text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-[#00D2FF]'}`}>
                        {offer.laps}
                      </div>
                    </div>

                    {/* 4. Features List (Checkmarks glow on hover) */}
                    <div className="space-y-2.5 mb-6 text-xs text-slate-600 dark:text-slate-300 font-sans">
                      {offer.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 transition-all duration-200 ${
                            offer.popular 
                              ? 'text-blue-600 dark:text-[#00D2FF]' 
                              : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-[#00D2FF] group-hover:scale-110'
                          }`} />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. CTA Button with Arrow Translation on Hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playRev(offer.popular ? 1.4 : 1.3);
                      onSelectPlan(offer.fullName, `₹${offer.price}`);
                    }}
                    className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] ${
                      offer.popular
                        ? 'bg-gradient-to-r from-[#0052FF] via-[#0066FF] to-[#00D2FF] hover:brightness-110 text-white shadow-lg shadow-blue-500/35 group-hover:shadow-blue-500/50'
                        : 'bg-slate-100 hover:bg-slate-900 hover:text-white dark:bg-white/10 dark:hover:bg-white dark:hover:text-slate-950 text-slate-950 dark:text-white border border-slate-200 dark:border-white/10 group-hover:border-transparent group-hover:shadow-md'
                    }`}
                  >
                    <span className="whitespace-nowrap">{offer.buttonText}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              ))}
            </div>

            {/* Circuit Hotline Strip */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0E1F]/80 border border-slate-200 dark:border-white/10 text-center text-xs font-mono text-slate-600 dark:text-slate-400 shadow-sm">
              ⚡ BUCKLE UP • PITLANE HOTLINE: <strong className="text-slate-900 dark:text-white font-bold">+91 90717 18620</strong> • SOLUR, HOSAKOTE BANGALORE
            </div>
          </div>
        )}

        {/* TAB 2: GO-KARTING + FOOD COMBOS */}
        {activeTab === 'food-combos' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {foodCombos.map((combo) => (
                <div
                  key={combo.id}
                  onMouseEnter={() => soundFx.playGearShift()}
                  className={`group cursor-pointer p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 relative border overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,102,255,0.15)] dark:hover:shadow-[0_20px_50px_rgba(0,102,255,0.25)] ${
                    combo.popular
                      ? 'bg-white dark:bg-[#0D132A] border-2 border-[#0052FF] dark:border-[#00D2FF] shadow-[0_15px_40px_rgba(0,102,255,0.15)] dark:shadow-[0_15px_40px_rgba(0,82,255,0.25)] text-slate-900 dark:text-white'
                      : 'bg-white dark:bg-[#0A0E22]/90 border-slate-200 dark:border-white/10 hover:border-[#0052FF]/60 shadow-sm dark:shadow-md text-slate-900 dark:text-white'
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div>
                    {/* Top Tag & Timing */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-white/5">
                      <span className={`text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-lg ${combo.popular ? 'bg-blue-50 dark:bg-[#0052FF]/20 text-blue-700 dark:text-[#00D2FF] border border-blue-200 dark:border-[#0052FF]/40' : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'}`}>
                        {combo.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{combo.timing}</span>
                      </span>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-bold text-xl text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-[#00D2FF] transition-colors">
                        {combo.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                        {combo.validity}
                      </p>
                    </div>

                    {combo.foodIncluded && (
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-[#0066FF] dark:text-[#00D2FF] shrink-0" />
                        <span>{combo.foodIncluded}</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="my-3 pb-3 border-b border-slate-200 dark:border-white/10">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono group-hover:scale-[1.03] transition-transform inline-block origin-left">
                          ₹{combo.price}
                        </span>
                        <span className="text-xs font-medium uppercase text-slate-500 dark:text-slate-400 font-mono">
                          {combo.taxNote}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-blue-600 dark:text-[#00D2FF] mt-1 font-mono">
                        {combo.laps}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6 text-xs text-slate-600 dark:text-slate-300 font-sans">
                      {combo.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-600 dark:text-[#00D2FF] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playRev(1.3);
                      onSelectPlan(combo.name, `₹${combo.price}`);
                    }}
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      combo.popular
                        ? 'bg-gradient-to-r from-[#0052FF] to-[#00D2FF] hover:brightness-110 text-white shadow-md shadow-blue-600/30'
                        : 'bg-slate-100 hover:bg-slate-900 hover:text-white dark:bg-white/10 dark:hover:bg-white dark:hover:text-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <span>{combo.buttonText}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              ))}
            </div>

            {/* Warning Banner */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0E1F]/80 border border-slate-200 dark:border-white/10 text-center text-xs text-slate-600 dark:text-slate-400 font-medium flex items-center justify-center gap-2 shadow-sm">
              <Clock className="w-4 h-4 text-[#0066FF] dark:text-[#00D2FF]" />
              <span>All food and kart combo passes are served fresh at Apex Rooftop Cafe until 6:00 PM daily.</span>
            </div>
          </div>
        )}

        {/* TAB 3: SUPERBIKE TRACK SESSIONS */}
        {activeTab === 'bike-ride' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Product 1: 15-Minute Track Session */}
              <div 
                onMouseEnter={() => soundFx.playGearShift()}
                className="group cursor-pointer rounded-[28px] bg-white dark:bg-[#0A0E1F]/95 p-8 border border-slate-200 dark:border-white/10 flex flex-col justify-between shadow-sm dark:shadow-xl relative hover:border-amber-400 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(251,191,36,0.15)] transition-all text-slate-900 dark:text-white overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                      {bikeOffers[0].badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>Subject to Track Availability</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors">
                      {bikeOffers[0].name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                      {bikeOffers[0].validity}. Perfect for riders who want quick apex laps and throttle practice when track slots are open.
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-4 border-y border-slate-200 dark:border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono group-hover:scale-[1.03] transition-transform inline-block origin-left">
                        ₹{bikeOffers[0].price}
                      </span>
                      <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-mono">
                        {bikeOffers[0].taxNote}
                      </span>
                    </div>
                    <div className="text-xs text-amber-600 dark:text-amber-400 font-mono mt-1 font-semibold">
                      {bikeOffers[0].laps}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 font-sans">
                    {bikeOffers[0].features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playRev(1.4);
                      onSelectPlan('15-Minute Bike Track Session', '₹500');
                    }}
                    className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:shadow-lg"
                  >
                    <span>Book 15-Min Session (₹500)</span>
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </button>

                  <a
                    href="https://wa.me/919071718620?text=Hi%20Velocity%20Circuit,%20I%20want%20to%20check%20availability%20for%20the%2015-Minute%20Track%20Session%20(Rs%20500)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white font-medium text-xs transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10"
                  >
                    <span>Check Track Slot via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Product 2: Superbike Dawn Session (4 Hours Unlimited) */}
              <div 
                onMouseEnter={() => soundFx.playGearShift()}
                className="group cursor-pointer rounded-[28px] p-1.5 bg-gradient-to-b from-amber-500/30 via-amber-500/10 to-transparent border border-amber-400 dark:border-amber-500/50 shadow-xl relative text-slate-900 dark:text-white hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(245,158,11,0.25)] transition-all overflow-hidden"
              >
                <div className="rounded-[24px] bg-white dark:bg-[#0A0E1F]/95 p-8 h-full flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
                      <span className="px-3 py-1 rounded-lg bg-amber-400 text-black font-bold text-xs uppercase tracking-wider">
                        {bikeOffers[1].badge}
                      </span>
                      <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">
                        ★ MOST POPULAR BIKER PASS
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-amber-500 transition-colors">
                        Superbike Dawn Session <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500">
                          4 Hours Unlimited
                        </span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                        {bikeOffers[1].validity}. Unleash your motorcycle on 1166 meters of outdoor asphalt before city highway traffic wakes up.
                      </p>
                    </div>

                    {/* Breakfast Callout */}
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 space-y-1">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-amber-700 dark:text-amber-400 font-bold uppercase">
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Included in ₹1500 Pass:</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        Protein Breakfast (Bread Omelet / Veg Sandwich) + Fresh Cappuccino ☕🥪
                      </p>
                    </div>

                    {/* Price */}
                    <div className="py-4 border-y border-slate-200 dark:border-white/10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono group-hover:scale-[1.03] transition-transform inline-block origin-left">
                          ₹{bikeOffers[1].price}
                        </span>
                        <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 font-mono">
                          {bikeOffers[1].taxNote}
                        </span>
                      </div>
                      <div className="text-xs text-amber-600 dark:text-amber-400 font-mono mt-1 font-semibold">
                        {bikeOffers[1].laps}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 font-sans">
                      {bikeOffers[1].features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playRev(1.4);
                        onSelectPlan('Superbike Dawn Session (4 Hours)', '₹1500');
                      }}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:shadow-xl"
                    >
                      <span>Book Dawn Bike Slot (₹1500)</span>
                      <ArrowRight className="w-4 h-4 text-black shrink-0 transition-transform group-hover:translate-x-1" />
                    </button>

                    <a
                      href="https://wa.me/919071718620?text=Hi%20Velocity%20Circuit,%20I%20want%20to%20book%20the%206%20AM%20Bike%20Ride%20Session%20(Rs%201500)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white font-medium text-xs transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10"
                    >
                      <span>WhatsApp Desk: +91 9071718620</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Rules Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#070A14] border border-slate-200 dark:border-white/10 text-center space-y-1 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-amber-500 dark:text-amber-400 mx-auto" />
                <div className="text-[10px] font-mono text-slate-900 dark:text-white font-bold">RIDING GEAR MANDATORY</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#070A14] border border-slate-200 dark:border-white/10 text-center space-y-1 shadow-sm">
                <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400 mx-auto" />
                <div className="text-[10px] font-mono text-slate-900 dark:text-white font-bold">HALF / FULL TRACK</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#070A14] border border-slate-200 dark:border-white/10 text-center space-y-1 shadow-sm">
                <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400 mx-auto" />
                <div className="text-[10px] font-mono text-slate-900 dark:text-white font-bold">TRANSPONDER TIMING</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#070A14] border border-slate-200 dark:border-white/10 text-center space-y-1 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 mx-auto" />
                <div className="text-[10px] font-mono text-slate-900 dark:text-white font-bold">RIDE SAFE COME BACK SAFE</div>
              </div>
            </div>
          </div>
        )}

        {/* Corporate Track Takeover Notice */}
        <div className="rounded-[30px] bg-white dark:bg-[#0A0E1F]/90 text-slate-900 dark:text-white p-7 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10 backdrop-blur-xl">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-[#00D2FF]">
              Corporate & Private Track Takeover
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Host Your Company Grand Prix in Hoskote
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Exclusive track rental, custom podium ceremonies, gourmet catering from Apex Cafe, and live DJ setups.
            </p>
          </div>

          <a
            href="https://wa.me/919071718620?text=Hi%20Velocity%20Circuit,%20I%20want%20to%20inquire%20about%20Corporate%20Track%20Rental"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playGearShift()}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 shadow-lg shadow-blue-600/30"
          >
            Inquire via WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
};
