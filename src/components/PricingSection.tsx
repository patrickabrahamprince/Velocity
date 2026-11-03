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
  Check, 
  Users, 
  Gauge, 
  Timer, 
  CloudRain, 
  Flame, 
  ChevronRight,
  Award
} from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface OfferItem {
  id: string;
  name: string;
  basePrice: number;
  taxNote: string;
  lapsCount: number;
  totalKm: string;
  badge: string;
  badgeStyle: string;
  timing: string;
  validity: string;
  popular?: boolean;
  image?: string;
  queueStatus?: string;
  waitDuration?: string;
  features: string[];
  specs: { label: string; value: string }[];
}

// 1. Tab 1 Flagship 10-Lap Sessions
const flagshipKartOffers: OfferItem[] = [
  {
    id: 'normal-10-laps',
    name: '10 Laps Normal Session',
    basePrice: 699,
    taxNote: '+ 18% TAX',
    lapsCount: 10,
    totalKm: '11.6 KM',
    badge: '🏁 ALL-DAYS GP PASS',
    badgeStyle: 'bg-slate-900/80 text-white border-slate-700/80 dark:bg-white/10 dark:text-slate-200 dark:border-white/20',
    popular: false,
    timing: '9:00 AM – 11:00 PM (Daily)',
    validity: 'Standard Pitlane Staging Queue • Valid on Weekdays, Weekends & Holidays',
    image: '/images/track_apex_daytime.jpg',
    queueStatus: 'Standard Queue',
    waitDuration: '20–35 min avg wait during rush hours',
    specs: [
      { label: 'TOP SPEED', value: '65+ km/h' },
      { label: 'ENGINE', value: 'Tuned 200cc Honda' },
      { label: 'TRACK', value: '1,166m FIA Asphalt' },
      { label: 'VALUE', value: '₹69.9 / Lap' },
    ],
    features: [
      '10 Full Throttle High-Speed Flying Laps (11.6 KM total)',
      'Tuned 200cc Honda 4-stroke pro racing go-kart fleet',
      'Standard pitlane staging queue with full safety briefing',
      'Live F1 timing screen transponder & digital telemetry',
      'Top 3 podium trophy ceremony & photo-op access',
    ],
  },
  {
    id: 'fastrak-10-laps',
    name: '10 Laps Fastrak VIP Session',
    basePrice: 899,
    taxNote: '+ 18% TAX',
    lapsCount: 10,
    totalKm: '11.6 KM',
    badge: '⚡ ZERO WAITING • FAST LANE',
    badgeStyle: 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white border-blue-400 font-extrabold shadow-md shadow-blue-500/30',
    popular: true,
    timing: '9:00 AM – 11:00 PM (Daily)',
    validity: 'Dedicated Priority Fastrak Lane • Zero Queue Delay • Direct Grid Entry',
    image: '/images/hero_racing_kart.jpg',
    queueStatus: 'Priority Bypass',
    waitDuration: '0 min wait • Immediate grid staging',
    specs: [
      { label: 'QUEUE DELAY', value: '⚡ 0 MINUTES' },
      { label: 'ENGINE', value: 'Tuned 200cc Honda' },
      { label: 'LAPS', value: '10 Laps (11.6 KM)' },
      { label: 'GRID ACCESS', value: 'VIP Fastrak Lane' },
    ],
    features: [
      'Priority Fastrak pitlane bypass — zero queue waiting delay',
      'Direct grid staging & immediate heat departure',
      '10 High-Speed Flying Laps on Karnataka’s longest circuit (11.6 KM)',
      'Tuned 200cc Honda pro racing go-kart fleet',
      'Personal digital telemetry timing sheet & leaderboard rank',
      'Top 3 podium trophy celebration access',
    ],
  },
];

// 2. Tab 1 Value Passes
const secondaryKartOffers = [
  {
    id: 'weekday-8-laps',
    name: '8 Laps Weekday Sprint',
    basePrice: 499,
    taxNote: '+ 18% TAX',
    lapsCount: 8,
    perLapCost: '₹62.3 / Lap',
    badge: 'WEEKDAY THRILL',
    badgeStyle: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-500/30 font-bold',
    timing: 'Mon – Fri • 9:00 AM – 11:00 PM',
    validity: 'Monday to Friday (Excludes Government & Public Holidays)',
    features: [
      '8 Full Throttle Championship Laps (9.3 KM)',
      'Tuned 200cc Honda Racing Go-Kart fleet',
      'Open until 11:00 PM for Night Track racing under floodlights',
      'Live Sector Transponder Lap Timing & Leaderboard',
      'Apex Viewing Deck Lounge Access',
    ],
  },
  {
    id: 'student-5-laps',
    name: '5 Laps Student Special',
    basePrice: 299,
    taxNote: '+ 18% TAX',
    lapsCount: 5,
    perLapCost: '₹59.8 / Lap',
    badge: 'STUDENT PASS • ID REQUIRED',
    badgeStyle: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 font-bold',
    timing: 'Mon – Fri • 9:00 AM – 6:00 PM',
    validity: 'Valid till 6:00 PM • Valid Physical or Digital Student ID Mandatory',
    features: [
      '5 High-Speed Laps on 1,166m International Circuit (5.8 KM)',
      'Tuned 200cc Honda Racing Go-Kart fleet',
      'Valid student ID required at pitlane gate',
      'DOT Helmet & Sanitized Balaclava Included Free (₹100 Value)',
      'Live Sector Transponder Lap Timing',
    ],
  },
];

// 3. Tab 2 Food Combos
const foodCombos = [
  {
    id: 'combo-fastrak',
    name: '10 Laps Fastrak VIP + Energy',
    price: 899,
    taxNote: '+ TAX',
    laps: '10 Laps • Fast Lane Priority',
    badge: '⚡ VIP FAST LANE',
    popular: true,
    timing: 'Valid All Days',
    image: '/images/hero_racing_kart.jpg',
    validity: 'Priority Fastrak Pitlane • Zero Waiting Delay',
    foodIncluded: 'Fastrak VIP Pitlane Entry + Red Bull / Energy Drink ⚡',
    features: [
      '10 Full Throttle Flying Laps (11.6 KM)',
      'Zero Waiting Time in Pitlane Queue',
      'Tuned 200cc Honda Racing Engine',
      'Direct Grid Access & Fastrak Priority',
      'Chilled Red Bull / Monster Energy Drink at Pitlane',
    ],
  },
  {
    id: 'combo-birthday',
    name: 'Birthday & Group Celebration GP',
    price: 999,
    taxNote: '+ TAX',
    laps: '6 Laps • Combo Pack',
    badge: '🎂 GROUP SPECIAL',
    popular: false,
    timing: 'Valid All Days',
    image: '/images/velocity_cafe_lifestyle.jpg',
    validity: '6 Laps + Artisanal Meal & Beverage at Apex Cafe',
    foodIncluded: 'Signature Smash Burger / Pizza Slice + Chilled Beverage 🍔🥤',
    features: [
      '6 Championship Laps on 1,166m Circuit',
      'Tuned 200cc Honda Racing Engine',
      'Freshly prepared meal at Apex Rooftop Cafe',
      'Top 3 Podium Trophy & Photo Ceremony',
      'Live Leaderboard Transponder Timing',
    ],
  },
  {
    id: 'combo-weekday-burger',
    name: 'Weekday Sprint + Burger Combo',
    price: 649,
    taxNote: '+ TAX',
    laps: '8 Laps • Mon-Fri Pass',
    badge: 'WEEKDAY COMBO',
    popular: false,
    timing: 'Mon – Fri (9 AM – 6 PM)',
    image: '/images/kart_fleet_garage.jpg',
    validity: '8 Laps + Trackside Burger & Drink',
    foodIncluded: 'Crispy Veg / Chicken Burger + Soft Drink 🍔🥤',
    features: [
      '8 High-Speed Flying Laps',
      'Tuned 200cc Honda Racing Engine',
      'Trackside meal at Apex Rooftop Cafe',
      'Mon – Fri (9 AM – 6 PM)',
      'Digital Telemetry Timing Sheet',
    ],
  },
];

// 4. Tab 3 Superbike Passes
const bikeOffers = [
  {
    id: 'bike-15-min',
    name: '15-Minute Track Session',
    price: 500,
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
    price: 1500,
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
  const [driverCount, setDriverCount] = useState<number>(1);

  const squadSizes = [
    { count: 1, label: '1 Racer (Solo)', note: 'Individual Driver' },
    { count: 2, label: '2 Racers (Duo)', note: 'Head-to-Head Duel' },
    { count: 4, label: '4 Racers (Squad)', note: 'Most Popular' },
    { count: 6, label: '6 Racers (Mini GP)', note: 'Private Heat' },
    { count: 8, label: '8+ Racers (Full Grid)', note: 'Championship Heat' },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative">
      {/* Background Ambient Lighting FX */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-[#00D2FF]/10 to-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-slate-200/80 dark:border-white/10">
          <div className="space-y-3.5">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-white/[0.06] border border-blue-500/20 dark:border-white/[0.12] text-xs font-bold tracking-[0.16em] uppercase text-blue-700 dark:text-sky-300 font-mono shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF] dark:bg-[#00D2FF]" />
              </span>
              <span>LIVE TRACK RATES • 1,166M FIA ASPHALT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-asphalt text-slate-950 dark:text-white leading-[1.02] tracking-[-0.03em]">
              Race Packages & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-[#0066FF] to-[#00D2FF]">Passes</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-white/70 max-w-2xl font-normal leading-relaxed">
              Transparent per-session pricing with zero hidden fees. Includes full track safety briefing, DOT-certified helmets, sanitized balaclavas, and live RFID transponder telemetry sheets.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="bg-slate-100/90 dark:bg-[#080C1A]/90 backdrop-blur-2xl p-1.5 rounded-2xl border border-slate-200/80 dark:border-white/[0.12] shadow-sm inline-flex flex-wrap items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                soundFx.playGearShift();
                setActiveTab('kart-offers');
              }}
              className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 active:scale-[0.98] ${
                activeTab === 'kart-offers'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-md shadow-blue-600/35'
                  : 'text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Karting Passes</span>
            </button>

            <button
              onClick={() => {
                soundFx.playGearShift();
                setActiveTab('food-combos');
              }}
              className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 active:scale-[0.98] ${
                activeTab === 'food-combos'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-md shadow-blue-600/35'
                  : 'text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Kart + Food Combos</span>
            </button>

            <button
              onClick={() => {
                soundFx.playGearShift();
                setActiveTab('bike-ride');
              }}
              className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 active:scale-[0.98] ${
                activeTab === 'bike-ride'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-md shadow-blue-600/35'
                  : 'text-slate-600 dark:text-white/60 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.06]'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Superbike Dawn Pass</span>
            </button>
          </div>
        </div>

        {/* TAB 1: KARTING OFFERS */}
        {activeTab === 'kart-offers' && (
          <div className="space-y-10">
            {/* Interactive Racers in Squad Selector (Engaging micro-interaction!) */}
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-100/80 dark:bg-[#0B1024]/80 border border-slate-200/90 dark:border-white/10 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-[#0066FF] dark:text-[#00D2FF] flex items-center justify-center shrink-0 border border-blue-500/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-white flex items-center gap-2">
                    <span>How many racers are in your heat?</span>
                    <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Live Dynamic Pricing
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Select group size to preview total squad cost & flying laps
                  </p>
                </div>
              </div>

              {/* Squad Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {squadSizes.map((squad) => (
                  <button
                    key={squad.count}
                    onClick={() => {
                      soundFx.playGearShift();
                      setDriverCount(squad.count);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      driverCount === squad.count
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-md scale-[1.03]'
                        : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-blue-400/50'
                    }`}
                  >
                    <span>{squad.label}</span>
                    {squad.count === 4 && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400 text-black font-extrabold uppercase">
                        POPULAR
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* TIER 1: The 2 Main Flagship 10-Lap Sessions (Hero Duel) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-mono uppercase tracking-wider font-extrabold text-slate-800 dark:text-slate-200">
                    Flagship 10-Lap Sessions • All Days Pass
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Open 9:00 AM – 11:00 PM Daily (Night Floodlights)</span>
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* 1. Normal Session (₹699) */}
                <div className="rounded-[32px] bg-white dark:bg-[#0A0E22]/90 border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col justify-between hover:border-slate-400 dark:hover:border-white/25 transition-all duration-300 shadow-md hover:shadow-xl group relative">
                  {/* Visual Top Header Image */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                    <img
                      src={flagshipKartOffers[0].image}
                      alt={flagshipKartOffers[0].name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-[#0A0E22] dark:via-[#0A0E22]/60 dark:to-transparent" />

                    {/* Header Badges Overlay */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-mono uppercase font-bold px-3.5 py-1 rounded-full backdrop-blur-md border ${flagshipKartOffers[0].badgeStyle}`}>
                        {flagshipKartOffers[0].badge}
                      </span>
                      <span className="text-xs font-mono text-slate-900 dark:text-white font-bold px-3 py-1 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/20 whitespace-nowrap flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>9:00 AM – 11:00 PM</span>
                      </span>
                    </div>

                    {/* Bottom overlay text on image */}
                    <div className="absolute bottom-3 inset-x-4 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-sky-300 bg-white/90 dark:bg-black/70 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10">
                        11.6 KM TOTAL ADRENALINE
                      </span>
                      <span className="text-xs font-mono text-slate-600 dark:text-slate-300 bg-white/90 dark:bg-black/70 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10">
                        Standard Pitlane Queue
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title & Description */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-2">
                        {flagshipKartOffers[0].name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-6">
                        {flagshipKartOffers[0].validity}. Experience Karnataka’s longest asphalt circuit with authentic F1 transponder timing.
                      </p>

                      {/* Specs Telemetry Strip */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 mb-6 text-center">
                        {flagshipKartOffers[0].specs.map((spec) => (
                          <div key={spec.label} className="p-1">
                            <div className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500 font-bold">
                              {spec.label}
                            </div>
                            <div className="text-xs font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                              {spec.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Price Block with dynamic Squad multiplier */}
                      <div className="py-4 border-y border-slate-200 dark:border-white/10 mb-6">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white font-mono">
                              ₹{(flagshipKartOffers[0].basePrice * driverCount).toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                              {flagshipKartOffers[0].taxNote}
                            </span>
                          </div>

                          {driverCount > 1 && (
                            <div className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/10 px-2.5 py-1 rounded-full">
                              ₹{flagshipKartOffers[0].basePrice} / racer
                            </div>
                          )}
                        </div>

                        <div className="text-xs font-semibold text-blue-600 dark:text-sky-400 font-mono mt-1.5 flex items-center gap-2">
                          <span>{flagshipKartOffers[0].lapsCount * driverCount} Total Flying Laps</span>
                          <span>•</span>
                          <span>{driverCount} {driverCount === 1 ? 'Kart' : 'Karts'} on Track</span>
                        </div>
                      </div>

                      {/* Queue Wait Reality Meter */}
                      <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 mb-6 text-xs space-y-1.5">
                        <div className="flex items-center justify-between font-mono font-semibold text-slate-700 dark:text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <Timer className="w-3.5 h-3.5 text-slate-500" />
                            <span>Pitlane Staging:</span>
                          </span>
                          <span className="text-slate-500">Regular Queue</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-slate-400 dark:bg-slate-500 h-full w-[45%]" />
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 text-right">
                          ~20–35 min queue time during peak hours
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
                        onSelectPlan(
                          driverCount > 1
                            ? `${flagshipKartOffers[0].name} (${driverCount} Racers)`
                            : flagshipKartOffers[0].name,
                          `₹${(flagshipKartOffers[0].basePrice * driverCount).toLocaleString('en-IN')}`
                        );
                      }}
                      className="w-full py-4 px-6 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-between group shadow-sm hover:shadow-lg"
                    >
                      <span>
                        Book Normal Session {driverCount > 1 ? `(${driverCount} Racers)` : ''} (₹{(flagshipKartOffers[0].basePrice * driverCount).toLocaleString('en-IN')})
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. Fastrak VIP Session (₹899) - THE HIGHLIGHTED VIP PASS */}
                <div className="rounded-[32px] p-1.5 bg-gradient-to-b from-[#0066FF] via-[#0052FF] to-[#00D2FF] shadow-[0_25px_60px_rgba(0,102,255,0.25)] relative text-slate-900 dark:text-white group">
                  {/* Floating VIP Crown Badge */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold text-[11px] font-mono uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      <span>RECOMMENDED • ZERO QUEUE WAITING</span>
                    </span>
                  </div>

                  <div className="rounded-[28px] bg-white dark:bg-[#0D132A] overflow-hidden h-full flex flex-col justify-between">
                    {/* Visual Top Header Image */}
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                      <img
                        src={flagshipKartOffers[1].image}
                        alt={flagshipKartOffers[1].name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-[#0D132A] dark:via-[#0D132A]/60 dark:to-transparent" />

                      {/* Header Badges Overlay */}
                      <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-2">
                        <span className={`text-[11px] font-mono uppercase font-bold px-3.5 py-1 rounded-full backdrop-blur-md border flex items-center gap-1.5 ${flagshipKartOffers[1].badgeStyle}`}>
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          <span>{flagshipKartOffers[1].badge}</span>
                        </span>
                        <span className="text-xs font-mono text-white font-bold px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md border border-blue-400 whitespace-nowrap flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>9:00 AM – 11:00 PM</span>
                        </span>
                      </div>

                      {/* Bottom banner on image */}
                      <div className="absolute bottom-3 inset-x-4 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-blue-700 dark:text-[#00D2FF] bg-blue-50/95 dark:bg-black/75 px-3 py-1 rounded-lg border border-blue-300 dark:border-blue-500/40">
                          ⚡ EXPRESS PITLANE FAST LANE
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-white/95 dark:bg-black/75 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-500/40">
                          DIRECT GRID ACCESS
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title & Subtitle */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                            {flagshipKartOffers[1].name}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-6">
                          {flagshipKartOffers[1].validity}. Skip long waitlists during busy evening hours and weekends with direct pitlane boarding.
                        </p>

                        {/* Specs Telemetry Strip (Electric Blue highlighted) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/30 mb-6 text-center">
                          {flagshipKartOffers[1].specs.map((spec) => (
                            <div key={spec.label} className="p-1">
                              <div className="text-[10px] font-mono uppercase text-blue-700 dark:text-[#00D2FF] font-bold">
                                {spec.label}
                              </div>
                              <div className="text-xs font-mono font-bold text-slate-950 dark:text-white mt-0.5">
                                {spec.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Price Block with dynamic Squad multiplier */}
                        <div className="py-4 border-y border-slate-200 dark:border-white/10 mb-6">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white font-mono">
                                ₹{(flagshipKartOffers[1].basePrice * driverCount).toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                                {flagshipKartOffers[1].taxNote}
                              </span>
                            </div>

                            {driverCount > 1 && (
                              <div className="text-xs font-mono font-bold text-blue-700 dark:text-[#00D2FF] bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-500/30">
                                ₹{flagshipKartOffers[1].basePrice} / racer
                              </div>
                            )}
                          </div>

                          <div className="text-xs font-semibold text-blue-600 dark:text-[#00D2FF] font-mono mt-1.5 flex items-center gap-2">
                            <span>{flagshipKartOffers[1].lapsCount * driverCount} Total Flying Laps</span>
                            <span>•</span>
                            <span>⚡ Zero Waiting for all {driverCount} {driverCount === 1 ? 'Racer' : 'Racers'}</span>
                          </div>
                        </div>

                        {/* Queue Wait Reality Meter (Fastrak Advantage Highlight!) */}
                        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50 dark:from-blue-950/40 dark:via-blue-900/20 dark:to-blue-950/40 border border-blue-200 dark:border-blue-500/30 mb-6 text-xs space-y-1.5">
                          <div className="flex items-center justify-between font-mono font-bold text-blue-950 dark:text-sky-200">
                            <span className="flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-[#00D2FF] fill-current" />
                              <span>Fastrak Priority Lane:</span>
                            </span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">0 MIN DELAY ⚡</span>
                          </div>
                          <div className="w-full bg-blue-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-[#00D2FF] h-full w-[100%]" />
                          </div>
                          <div className="text-[11px] text-blue-700 dark:text-sky-300 font-semibold text-right">
                            Direct boarding — bypass 25+ min pitlane queues instantly
                          </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-2.5 mb-8 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-sans">
                          {flagshipKartOffers[1].features.map((feat) => (
                            <div key={feat} className="flex items-start gap-2.5">
                              <div className="w-4 h-4 rounded-full bg-blue-600/10 dark:bg-blue-400/20 flex items-center justify-center shrink-0 mt-0.5 text-blue-600 dark:text-[#00D2FF]">
                                <Zap className="w-3 h-3 fill-current" />
                              </div>
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => {
                          soundFx.playRev(1.4);
                          onSelectPlan(
                            driverCount > 1
                              ? `${flagshipKartOffers[1].name} (${driverCount} Racers)`
                              : flagshipKartOffers[1].name,
                            `₹${(flagshipKartOffers[1].basePrice * driverCount).toLocaleString('en-IN')}`
                          );
                        }}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0052FF] via-[#0066FF] to-[#00D2FF] hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-between group shadow-lg shadow-blue-500/35 hover:shadow-blue-500/55 active:scale-[0.99]"
                      >
                        <span>
                          Book Fastrak VIP {driverCount > 1 ? `(${driverCount} Racers)` : ''} (₹{(flagshipKartOffers[1].basePrice * driverCount).toLocaleString('en-IN')})
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TIER 2: Weekday Sprint & Student Special (2 Sleek Cards) */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-mono uppercase tracking-wider font-extrabold text-slate-700 dark:text-slate-300">
                  Special Value Sessions • Monday to Friday Passes
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {secondaryKartOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#0A0E22]/90 border border-slate-200 dark:border-white/10 hover:border-blue-400/50 transition-all flex flex-col justify-between shadow-sm dark:shadow-md text-slate-900 dark:text-white group"
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
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white mb-1">
                        {offer.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-sans leading-relaxed">
                        {offer.validity}
                      </p>

                      {/* Price Block with squad multiplier */}
                      <div className="py-3 border-y border-slate-200 dark:border-white/10 mb-5">
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white font-mono">
                              ₹{(offer.basePrice * driverCount).toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                              {offer.taxNote}
                            </span>
                          </div>

                          <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400">
                            {offer.perLapCost}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono mt-1">
                          {offer.lapsCount * driverCount} Flying Laps • {driverCount} {driverCount === 1 ? 'Racer' : 'Racers'}
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
                        onSelectPlan(
                          driverCount > 1 ? `${offer.name} (${driverCount} Racers)` : offer.name,
                          `₹${(offer.basePrice * driverCount).toLocaleString('en-IN')}`
                        );
                      }}
                      className="w-full py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <span>
                        Book {offer.name.split(' ')[2] || 'Pass'} {driverCount > 1 ? `(${driverCount} Racers)` : ''} (₹{(offer.basePrice * driverCount).toLocaleString('en-IN')})
                      </span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* High-Trust Circuit Guarantees Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0E22]/80 border border-slate-200 dark:border-white/10 flex items-start gap-3 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase">
                    Zero Cancellation Stress
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    100% full refund if cancelled 8+ hours prior.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0E22]/80 border border-slate-200 dark:border-white/10 flex items-start gap-3 shadow-sm">
                <CloudRain className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase">
                    Weather Protection
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Rain on track? Pass freely valid on your next ride.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0E22]/80 border border-slate-200 dark:border-white/10 flex items-start gap-3 shadow-sm">
                <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase">
                    DOT Helmet & Balaclava
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Sanitized safety headgear included with all passes.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0E22]/80 border border-slate-200 dark:border-white/10 flex items-start gap-3 shadow-sm">
                <Timer className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase">
                    Live Telemetry on WhatsApp
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    F1-style millisecond lap time reports to your phone.
                  </div>
                </div>
              </div>
            </div>

            {/* Note banner */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0E1F]/80 border border-slate-200 dark:border-white/10 text-center text-xs font-mono text-slate-600 dark:text-slate-400 shadow-sm">
              ⚡ BUCKLE UP • PITLANE HOTLINE: <strong className="text-slate-900 dark:text-white font-bold">+91 90717 18620</strong> • SOLUR, HOSAKOTE BANGALORE
            </div>
          </div>
        )}

        {/* TAB 2: GO-KARTING + FOOD COMBOS */}
        {activeTab === 'food-combos' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {foodCombos.map((combo) => (
                <div
                  key={combo.id}
                  className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 border ${
                    combo.popular
                      ? 'bg-white dark:bg-[#0D132A] border-2 border-[#0052FF] shadow-[0_20px_50px_rgba(0,102,255,0.2)] text-slate-900 dark:text-white'
                      : 'bg-white dark:bg-[#0A0E22]/90 border-slate-200 dark:border-white/10 hover:border-[#0052FF]/50 shadow-sm dark:shadow-md text-slate-900 dark:text-white'
                  }`}
                >
                  {/* Thumbnail Image Header */}
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                      <span className={`text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full ${combo.popular ? 'bg-blue-600 text-white' : 'bg-black/60 text-white backdrop-blur-md border border-white/20'}`}>
                        {combo.badge}
                      </span>
                      <span className="text-xs font-mono text-white/90 bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                        {combo.timing}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xl text-slate-950 dark:text-white mb-1 tracking-tight">
                        {combo.name}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-sans">
                        {combo.validity}
                      </p>

                      {combo.foodIncluded && (
                        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-slate-200 mb-4 flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-[#0066FF] dark:text-[#00D2FF] shrink-0" />
                          <span>{combo.foodIncluded}</span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="my-3 pb-3 border-b border-slate-200 dark:border-white/10">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white font-mono">
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
                      <span>Reserve Combo Pass</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
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

        {/* TAB 3: BIKE RIDE 15-MIN & 4-HOUR DAWN TRACK SESSIONS */}
        {activeTab === 'bike-ride' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Product 1: 15-Minute Track Session */}
              <div className="rounded-[32px] bg-white dark:bg-[#0A0E1F]/95 p-8 border border-slate-200 dark:border-white/10 flex flex-col justify-between shadow-sm dark:shadow-xl relative hover:border-amber-400/50 transition-all text-slate-900 dark:text-white">
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
              <div className="rounded-[32px] p-1.5 bg-gradient-to-b from-amber-500/30 via-amber-500/10 to-transparent border border-amber-400 dark:border-amber-500/50 shadow-xl relative text-slate-900 dark:text-white">
                <div className="rounded-[28px] bg-white dark:bg-[#0A0E1F]/95 p-8 h-full flex flex-col justify-between">
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
        <div className="rounded-[32px] bg-white dark:bg-[#0A0E1F]/90 text-slate-900 dark:text-white p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10 backdrop-blur-xl">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-[#00D2FF]">
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
