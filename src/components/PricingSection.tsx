import React, { useState } from 'react';
import { Trophy, ArrowRight, Bike, Utensils, Zap, Clock, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface OfferItem {
  id: string;
  name: string;
  price: string;
  taxNote: string;
  laps: string;
  badge?: string;
  badgeStyle?: string;
  timing: string;
  validity: string;
  popular?: boolean;
  foodIncluded?: string;
  features: string[];
  buttonText?: string;
}

// 1. Tab 1 Flagship 10-Lap Sessions (Normal vs Fastrak VIP)
const flagshipKartOffers: OfferItem[] = [
  {
    id: 'normal-10-laps',
    name: '10 Laps Normal Session',
    price: '699',
    taxNote: '+ 18% TAX',
    laps: '10 Laps • 1,166M Track',
    badge: 'ALL-DAYS GENERAL PASS',
    badgeStyle: 'bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-slate-200 border-slate-200 dark:border-white/10',
    popular: false,
    timing: '9:00 AM – 11:00 PM',
    validity: 'Standard Pitlane Queue • Valid on All Days (Including Weekends & Holidays)',
    features: [
      '10 Full Throttle High-Speed Flying Laps (11.6 KM total)',
      'Tuned 200cc Honda Racing Go-Kart fleet',
      'Standard pitlane queue access with safety briefing',
      'Live F1 timing screen transponder & personal lap sheet',
      'Top 3 podium trophy ceremony access & photo-op',
    ],
    buttonText: 'Book Normal Session (₹699)',
  },
  {
    id: 'fastrak-10-laps',
    name: '10 Laps Fastrak VIP Session',
    price: '899',
    taxNote: '+ 18% TAX',
    laps: '10 Laps • Zero Waiting Time',
    badge: '⚡ ZERO WAITING • FAST LANE',
    badgeStyle: 'bg-blue-600/15 text-[#0066FF] dark:text-[#00D2FF] border border-[#0066FF]/35 font-bold',
    popular: true,
    timing: '9:00 AM – 11:00 PM',
    validity: 'Dedicated Priority Fastrak Lane • Zero Queue Delay • Direct Grid Entry',
    features: [
      'Priority Fastrak pitlane bypass — zero queue waiting delay',
      'Direct grid staging & immediate session release',
      '10 High-Speed Flying Laps on Karnataka’s longest circuit (11.6 KM)',
      'Tuned 200cc Honda Racing Go-Kart fleet',
      'Personal digital telemetry timing sheet & leaderboard rank',
      'Top 3 podium trophy celebration access',
    ],
    buttonText: 'Book Fastrak VIP (₹899)',
  },
];

// 2. Tab 1 Value Passes (Weekday Sprint & Student Special)
const secondaryKartOffers: OfferItem[] = [
  {
    id: 'weekday-8-laps',
    name: '8 Laps Weekday Sprint',
    price: '499',
    taxNote: '+ 18% TAX',
    laps: '8 Laps • Weekday Only',
    badge: 'WEEKDAY THRILL',
    badgeStyle: 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300 border-slate-200 dark:border-white/10',
    popular: false,
    timing: 'Mon – Fri • 9:00 AM – 11:00 PM',
    validity: 'Monday to Friday (Excluding Public Holidays)',
    features: [
      '8 Full Throttle Championship Laps',
      'Tuned 200cc Honda Racing Go-Kart fleet',
      'Open until 11:00 PM for Night Track racing under floodlights',
      'Live Sector Transponder Lap Timing & Leaderboard',
      'Apex Viewing Deck Lounge Access',
    ],
    buttonText: 'Book Weekday Sprint (₹499)',
  },
  {
    id: 'student-5-laps',
    name: '5 Laps Student Special',
    price: '299',
    taxNote: '+ 18% TAX',
    laps: '5 Laps • 1,166M Track',
    badge: 'STUDENT PASS • ID REQUIRED',
    badgeStyle: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 font-bold',
    popular: false,
    timing: 'Mon – Fri • 9:00 AM – 6:00 PM',
    validity: 'Monday to Friday (Valid till 6:00 PM) • Valid Student ID Mandatory',
    features: [
      '5 High-Speed Laps on 1,166m International Circuit',
      'Tuned 200cc Honda Racing Go-Kart fleet',
      'Valid physical or digital student ID required at gate',
      'DOT-Certified helmet & sanitized balaclava included',
      'Live Sector Transponder Lap Timing',
    ],
    buttonText: 'Book Student Special (₹299)',
  },
];

// 3. Tab 2 Food + Kart Combos
const foodCombos: OfferItem[] = [
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
      '10 Full Throttle Flying Laps',
      'Zero Waiting Time in Pitlane Queue',
      'Tuned 200cc Honda Racing Engine',
      'Direct Grid Access & Fastrak Priority',
      'Digital Transponder Telemetry Sheet',
    ],
    buttonText: 'Reserve Fastrak Combo (₹899)',
  },
  {
    id: 'combo-birthday',
    name: 'Birthday & Group Celebration GP',
    price: '999',
    taxNote: '+ TAX',
    laps: '6 Laps • Combo Pack',
    badge: '🎂 GROUP CELEBRATION',
    popular: false,
    timing: 'Valid All Days',
    validity: '6 Laps + Artisanal Meal & Beverage at Apex Cafe',
    foodIncluded: 'Artisanal Smash Burger / Pizza + Chilled Beverage 🍔🥤',
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
    badge: 'WEEKDAY MEAL',
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

// 4. Tab 3 Superbike Passes
const bikeOffers: OfferItem[] = [
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
    <section id="pricing" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.12] text-xs font-semibold tracking-[0.16em] uppercase text-sky-300 font-apple-display shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0066FF] dark:bg-[#00D2FF]" />
              <span>Transparent Passes • 1,166M Track</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-asphalt text-slate-950 dark:text-white leading-[1.05] tracking-[-0.03em]">
              Standard <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00D2FF]">Race Packages</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-white/70 max-w-xl font-normal font-apple-text leading-relaxed">
              Transparent per-session pricing with zero hidden fees. Includes full safety briefing, DOT-certified helmets, balaclava & RFID transponder telemetry sheets.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="bg-slate-100/90 dark:bg-[#080C1A]/80 backdrop-blur-2xl p-1.5 rounded-full border border-slate-200 dark:border-white/[0.12] shadow-sm dark:shadow-xl inline-flex flex-wrap items-center gap-1 shrink-0">
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

        {/* Tab 1: Karting Passes */}
        {activeTab === 'kart-offers' && (
          <div className="space-y-8">
            {/* TIER 1: The 2 Main 10-Lap Sessions (Normal vs Fastrak VIP) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300">
                    Flagship 10-Lap Sessions • All Days Pass
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                  Open 9:00 AM – 11:00 PM Daily
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* 1. Normal Session (₹699) */}
                <div className="rounded-[28px] bg-white dark:bg-[#0A0E1F]/90 border border-slate-200 dark:border-white/10 p-7 sm:p-9 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/25 transition-all shadow-sm dark:shadow-xl relative text-slate-900 dark:text-white">
                  <div>
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <span className={`text-[11px] font-mono uppercase font-bold px-3 py-1 rounded-full border ${flagshipKartOffers[0].badgeStyle}`}>
                        {flagshipKartOffers[0].badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{flagshipKartOffers[0].timing}</span>
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-2">
                      {flagshipKartOffers[0].name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-5">
                      {flagshipKartOffers[0].validity}
                    </p>

                    {/* Price Block */}
                    <div className="py-4 border-y border-slate-200 dark:border-white/10 mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white font-mono">
                          ₹{flagshipKartOffers[0].price}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                          {flagshipKartOffers[0].taxNote}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-blue-600 dark:text-[#00D2FF] font-mono mt-1 flex items-center gap-2">
                        <span>10 Flying Laps</span>
                        <span>•</span>
                        <span>1,166M Track (11.6 KM Total)</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans">
                      {flagshipKartOffers[0].features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-blue-600 dark:text-[#00D2FF] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      soundFx.playRev(1.3);
                      onSelectPlan(flagshipKartOffers[0].name, `₹${flagshipKartOffers[0].price}`);
                    }}
                    className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <span>{flagshipKartOffers[0].buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. Fastrak VIP Session (₹899) - THE HIGHLIGHTED VIP PASS */}
                <div className="rounded-[28px] p-1 bg-gradient-to-b from-[#0066FF] via-[#0052FF] to-[#00D2FF] shadow-[0_20px_50px_rgba(0,102,255,0.25)] relative">
                  <div className="rounded-[25px] bg-white dark:bg-[#0D132A] p-7 sm:p-9 h-full flex flex-col justify-between text-slate-900 dark:text-white">
                    <div>
                      {/* Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <span className={`text-[11px] font-mono uppercase font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${flagshipKartOffers[1].badgeStyle}`}>
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          <span>{flagshipKartOffers[1].badge}</span>
                        </span>
                        <span className="text-xs font-mono text-blue-600 dark:text-[#00D2FF] font-bold whitespace-nowrap flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-500" />
                          <span>{flagshipKartOffers[1].timing}</span>
                        </span>
                      </div>

                      {/* Fastrak Callout Pill */}
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-500/30 text-xs text-blue-900 dark:text-blue-200 font-medium mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#0066FF] dark:text-[#00D2FF] shrink-0" />
                        <span className="font-semibold">Priority Fastrak Bypass: Zero queue delay & direct grid entry</span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-2">
                        {flagshipKartOffers[1].name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-5">
                        {flagshipKartOffers[1].validity}
                      </p>

                      {/* Price Block */}
                      <div className="py-4 border-y border-slate-200 dark:border-white/10 mb-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white font-mono">
                            ₹{flagshipKartOffers[1].price}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                            {flagshipKartOffers[1].taxNote}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-blue-600 dark:text-[#00D2FF] font-mono mt-1 flex items-center gap-2">
                          <span>10 Flying Laps</span>
                          <span>•</span>
                          <span>Priority Pitlane Fastrak Lane</span>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans">
                        {flagshipKartOffers[1].features.map((feat) => (
                          <div key={feat} className="flex items-start gap-2.5">
                            <Zap className="w-4 h-4 text-[#0066FF] dark:text-[#00D2FF] shrink-0 mt-0.5 fill-current" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => {
                        soundFx.playRev(1.4);
                        onSelectPlan(flagshipKartOffers[1].name, `₹${flagshipKartOffers[1].price}`);
                      }}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0052FF] via-[#0066FF] to-[#00D2FF] hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-500/35 hover:shadow-blue-500/50"
                    >
                      <span>{flagshipKartOffers[1].buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TIER 2: Weekday Sprint & Student Special (2 Sleek Cards) */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400">
                  Special Value Sessions • Mon to Fri
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {secondaryKartOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#0A0E1F]/90 border border-slate-200 dark:border-white/10 hover:border-blue-400/50 transition-all flex flex-col justify-between shadow-sm dark:shadow-md text-slate-900 dark:text-white"
                  >
                    <div>
                      {/* Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <span className={`text-[11px] font-mono uppercase font-bold px-3 py-1 rounded-full border ${offer.badgeStyle}`}>
                          {offer.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{offer.timing}</span>
                        </span>
                      </div>

                      {/* Title & Validity */}
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
                        {offer.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-sans leading-relaxed">
                        {offer.validity}
                      </p>

                      {/* Price Block */}
                      <div className="py-3 border-y border-slate-200 dark:border-white/10 mb-5">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
                            ₹{offer.price}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                            {offer.taxNote}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-blue-600 dark:text-[#00D2FF] font-mono mt-1">
                          {offer.laps}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2 mb-6 text-xs text-slate-600 dark:text-slate-300 font-sans">
                        {offer.features.map((feat) => (
                          <div key={feat} className="flex items-start gap-2">
                            <span className="text-blue-600 dark:text-[#00D2FF] font-bold shrink-0">+</span>
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => {
                        soundFx.playRev(1.3);
                        onSelectPlan(offer.name, `₹${offer.price}`);
                      }}
                      className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>{offer.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Note banner */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0E1F]/80 border border-slate-200 dark:border-white/10 text-center text-xs font-mono text-slate-600 dark:text-slate-400 shadow-sm">
              ⚡ BUCKLE UP • HOTLINE: <strong className="text-slate-900 dark:text-white font-bold">+91 90717 18620</strong> • SOLUR, HOSAKOTE BANGALORE
            </div>
          </div>
        )}

        {/* Tab 2: Go-Karting + Food Combos */}
        {activeTab === 'food-combos' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {foodCombos.map((combo) => (
                <div
                  key={combo.id}
                  className={`p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 relative border ${
                    combo.popular
                      ? 'bg-white dark:bg-[#0D132A] border-2 border-[#0052FF] shadow-[0_15px_40px_rgba(0,102,255,0.15)] dark:shadow-[0_15px_40px_rgba(0,82,255,0.25)] text-slate-900 dark:text-white'
                      : 'bg-white dark:bg-[#0A0E1F]/90 border-slate-200 dark:border-white/10 hover:border-[#0052FF]/50 shadow-sm dark:shadow-md text-slate-900 dark:text-white'
                  }`}
                >
                  <div>
                    {/* Top Tag & Timing */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full ${combo.popular ? 'bg-blue-50 dark:bg-[#0052FF]/20 text-blue-700 dark:text-[#00D2FF] border border-blue-200 dark:border-[#0052FF]/40' : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'}`}>
                        {combo.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {combo.timing}
                      </span>
                    </div>

                    <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-1 tracking-tight">
                      {combo.name}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-sans">
                      {combo.validity}
                    </p>

                    {combo.foodIncluded && (
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-[#0066FF] dark:text-[#00D2FF] shrink-0" />
                        <span>{combo.foodIncluded}</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="my-3 pb-3 border-b border-slate-200 dark:border-white/10">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
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
                          <span className="text-blue-600 dark:text-[#00D2FF] font-bold shrink-0">+</span>
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playRev(1.3);
                      onSelectPlan(combo.name, `₹${combo.price}`);
                    }}
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      combo.popular
                        ? 'bg-gradient-to-r from-[#0052FF] to-[#00D2FF] hover:brightness-110 text-white shadow-md shadow-blue-600/30'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <span>{combo.buttonText || 'Reserve Combo'}</span>
                    <ArrowRight className="w-4 h-4" />
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

        {/* Tab 3: Bike Ride 15-Min & 4-Hour Dawn Track Sessions */}
        {activeTab === 'bike-ride' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Product 1: 15-Minute Track Session */}
              <div className="rounded-[28px] bg-white dark:bg-[#0A0E1F]/95 p-8 border border-slate-200 dark:border-white/10 flex flex-col justify-between shadow-sm dark:shadow-xl relative hover:border-amber-400/50 transition-all text-slate-900 dark:text-white">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                      {bikeOffers[0].badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      Subject to Track Availability
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                      {bikeOffers[0].name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                      {bikeOffers[0].validity}. Perfect for riders who want quick apex laps and throttle practice when track slots are open.
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-4 border-y border-slate-200 dark:border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono">
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
                        <span className="text-amber-500 font-bold shrink-0">✓</span>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <button
                    onClick={() => {
                      soundFx.playRev(1.4);
                      onSelectPlan('15-Minute Bike Track Session', '₹500');
                    }}
                    className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Book 15-Min Session (₹500)</span>
                    <ArrowRight className="w-4 h-4" />
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
              <div className="rounded-[28px] p-1.5 bg-gradient-to-b from-amber-500/30 via-amber-500/10 to-transparent border border-amber-400 dark:border-amber-500/50 shadow-xl relative text-slate-900 dark:text-white">
                <div className="rounded-[24px] bg-white dark:bg-[#0A0E1F]/95 p-8 h-full flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="px-3.5 py-1 rounded-full bg-amber-400 text-black font-bold text-xs uppercase tracking-wider">
                        {bikeOffers[1].badge}
                      </span>
                      <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">
                        ★ MOST POPULAR BIKER PASS
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2 leading-tight">
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
                        <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono">
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
                          <span className="text-amber-500 font-bold shrink-0">✓</span>
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <button
                      onClick={() => {
                        soundFx.playRev(1.4);
                        onSelectPlan('Superbike Dawn Session (4 Hours)', '₹1500');
                      }}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Book Dawn Bike Slot (₹1500)</span>
                      <ArrowRight className="w-4 h-4 text-black" />
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
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 shadow-lg shadow-blue-600/30"
          >
            Inquire via WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
};
