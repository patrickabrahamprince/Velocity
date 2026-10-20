import React, { useState } from 'react';
import { Trophy, ArrowRight, Bike, Utensils, Zap, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface OfferItem {
  id: string;
  name: string;
  price: string;
  taxNote: string;
  laps: string;
  badge?: string;
  badgeColor?: string;
  timing: string;
  validity: string;
  popular?: boolean;
  foodIncluded?: string;
  features: string[];
}

const weekdayOffers: OfferItem[] = [
  {
    id: 'student-5-laps',
    name: '5 Laps Student Special',
    price: '299',
    taxNote: '+ 18% TAX',
    laps: '5 Laps • 1,166M Track',
    badge: 'STUDENT ID',
    timing: '9:00 AM – 6:00 PM',
    validity: 'Monday to Friday (Excl. Govt Holidays)',
    features: [
      '5 High-Speed Laps on 1166m circuit',
      'Tuned 4-Stroke Racing Go-Kart',
      'Valid Student ID Card Mandatory',
      'DOT Helmet & Balaclava Included',
      'Live Sector Transponder Lap Timing',
    ],
  },
  {
    id: 'weekday-8-laps',
    name: '8 Laps Weekday Sprint',
    price: '499',
    taxNote: '+ 18% TAX',
    laps: '8 Laps • 1,166M Track',
    badge: 'WEEKDAY THRILL',
    timing: '9:00 AM – 11:00 PM',
    validity: 'Monday to Friday (Excl. Govt Holidays)',
    features: [
      '8 Full Throttle Championship Laps',
      'Tuned 4-Stroke Racing Go-Kart',
      'Open until 11 PM for Night Racing',
      'Digital Telemetry Timing Sheet',
      'Apex Viewing Lounge Access',
    ],
  },
  {
    id: 'all-days-10-laps',
    name: '10 Laps All-Days GP',
    price: '699',
    taxNote: '+ 18% TAX',
    laps: '10 Laps • Valid All Days',
    badge: '🔥 MOST POPULAR',
    popular: true,
    timing: '9:00 AM – 11:00 PM',
    validity: 'Valid on All Days (Including Weekends & Holidays)',
    features: [
      '10 High-Speed Laps (11.6 KM total)',
      'Valid on Weekends & Public Holidays',
      'Top 3 Podium Trophy Presentation',
      'No Restrictions • Full Track Power',
      'Live F1 Timing Screen Transponder',
    ],
  },
];

const foodCombos: OfferItem[] = [
  {
    id: 'combo-student',
    name: 'Student Combo Sprint',
    price: '299',
    taxNote: '+ TAX',
    laps: '5 Laps',
    badge: 'STUDENT',
    timing: 'Mon - Fri (9 AM - 6 PM)',
    validity: 'Valid till 6 PM with Student ID',
    features: [
      '5 Championship Laps',
      'Mon - Fri (9 AM - 6 PM)',
      'Valid Student ID Required',
      'DOT Helmet & Balaclava',
      'Live Leaderboard Timing',
    ],
  },
  {
    id: 'combo-mojito',
    name: '6 Laps + Mojito & Snacks',
    price: '399',
    taxNote: '+ TAX',
    laps: '6 Laps + Food & Drink',
    badge: 'TASTE & SPEED',
    popular: true,
    timing: 'Valid till 6:00 PM',
    validity: 'All Days till 6 PM',
    foodIncluded: 'Refreshing Mojito 🍹 + Hot Snacks 🍟',
    features: [
      '6 High-Speed Flying Laps',
      'Refreshing Mojito Included',
      'Crispy Hot Snacks from Apex Cafe',
      'Taste bites to fuel your racing',
      'Valid until 6:00 PM',
    ],
  },
  {
    id: 'combo-weekday-8',
    name: 'Weekday 8-Lap Heat',
    price: '499',
    taxNote: '+ TAX',
    laps: '8 Laps',
    badge: 'WEEKDAY',
    timing: 'Mon - Fri (9 AM - 6 PM)',
    validity: 'Student ID Mandatory',
    features: [
      '8 High-Speed Laps',
      'Student ID Mandatory',
      'Mon - Fri (9 AM - 6 PM)',
      'Telemetry Lap Report',
      'Apex Viewing Deck Access',
    ],
  },
  {
    id: 'combo-regular-10',
    name: 'Regular Anyday Unmatched',
    price: '699',
    taxNote: '+ TAX',
    laps: '10 Laps',
    badge: 'UNMATCHED',
    timing: 'Anytime (All Days)',
    validity: 'Anyday Thrill & Fun',
    features: [
      '10 Full Throttle Flying Laps',
      'Anyday Thrill & Unmatched Fun',
      'No Timing Restrictions',
      'Podium Ceremony Access',
      'Full Track 1166m Access',
    ],
  },
  {
    id: 'combo-family-tandem',
    name: 'Family Tandem & Meal GP',
    price: '899',
    taxNote: '+ TAX',
    laps: '2-Seater Kart + Food',
    badge: '👨‍👩‍👧 FAMILY',
    popular: true,
    timing: 'Valid All Days',
    validity: 'Parent + Child Co-Pilot Heat',
    foodIncluded: '2 Beverages 🍹 + Loaded Fries / Nachos 🍟',
    features: [
      '2-Seater Tandem Kart for Parent & Child',
      'Dual 4-Point Racing Harnesses',
      '2 Fresh Mocktails/Juices + Hot Snack',
      'Podium Photo Moment on Track',
      'Valid All Days & Weekends',
    ],
  },
];

const bikeRideOffer: OfferItem = {
  id: 'bike-dawn-session',
  name: 'Bike Ride Dawn Session',
  price: '1500',
  taxNote: '+ TAX',
  laps: '4 Hours Open Circuit',
  badge: '6 AM TO 10 AM',
  timing: '06:00 AM TO 10:00 AM',
  validity: 'Open track for 300cc–1000cc+ motorcycles',
  foodIncluded: 'Protein Breakfast (Bread Omelet / Veg Sandwich) + Cappuccino ☕🥪',
  features: [
    '4 Hours of Unlimited Track Access (6 AM – 10 AM)',
    'Combo Protein Breakfast (Bread Omelet or Veg Sandwich)',
    'Fresh Hot Cappuccino at Apex Rooftop Cafe',
    'Open track for knee-dragging & apex practice',
    'Full riding gear mandatory (Ride Safe • Come Back Safe)',
  ],
};

interface PricingSectionProps {
  onSelectPlan: (planName: string, price: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [activeTab, setActiveTab] = useState<'kart-offers' | 'food-combos' | 'bike-ride'>('kart-offers');

  return (
    <section id="pricing" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold tracking-wider uppercase text-[#0052FF]">
              <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
              <span>Transparent Passes • 1,166M Track</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Standard <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-[#2563EB] to-cyan-500">Race Packages</span>
            </h2>
            <p className="text-sm text-slate-600 max-w-xl font-sans leading-relaxed">
              Transparent per-session pricing with zero hidden fees. Includes full safety briefing, DOT-certified helmets, balaclava & RFID transponder telemetry sheets.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="bg-slate-100 p-1.5 rounded-full border border-slate-200 shadow-md inline-flex flex-wrap items-center gap-1 shrink-0">
            <button
              onClick={() => {
                soundFx.playGearShift();
                setActiveTab('kart-offers');
              }}
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'kart-offers'
                  ? 'bg-gradient-to-r from-[#0052FF] to-[#2563EB] text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
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
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'food-combos'
                  ? 'bg-gradient-to-r from-[#0052FF] to-[#2563EB] text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
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
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'bike-ride'
                  ? 'bg-gradient-to-r from-[#0052FF] to-[#2563EB] text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Superbike Dawn Pass</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Weekday & All-Days Karting Offers */}
        {activeTab === 'kart-offers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {weekdayOffers.map((offer) => (
                <div
                  key={offer.id}
                  className={`loco-card p-8 flex flex-col justify-between transition-all duration-300 relative bg-white border ${
                    offer.popular
                      ? 'border-2 border-[#0052FF] shadow-[0_15px_40px_rgba(0,82,255,0.15)] scale-[1.02] z-10'
                      : 'border-slate-200 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between gap-1 mb-4">
                      <span className={`text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full ${offer.popular ? 'bg-blue-50 text-[#0052FF] border border-blue-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                        {offer.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {offer.timing}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">
                      {offer.name}
                    </h3>

                    <p className="text-xs mb-4 leading-relaxed font-sans text-slate-600">
                      {offer.validity}
                    </p>

                    {/* Price */}
                    <div className="my-4 pb-4 border-b border-slate-200">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-mono">
                          ₹{offer.price}
                        </span>
                        <span className="text-xs font-medium uppercase font-mono text-slate-500">
                          {offer.taxNote}
                        </span>
                      </div>
                      <div className="text-xs font-semibold mt-1 font-mono text-[#0052FF]">
                        {offer.laps}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2.5 mb-8 text-xs font-sans text-slate-700">
                      {offer.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2">
                          <span className="font-bold text-[#0052FF] shrink-0">+</span>
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playRev(1.3);
                      onSelectPlan(offer.name, `₹${offer.price}`);
                    }}
                    className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      offer.popular
                        ? 'bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white shadow-lg shadow-blue-600/35'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                    }`}
                  >
                    <span>Book {offer.laps.split('•')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Note banner */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs font-mono text-slate-600">
              ⚡ BUCKLE UP • HOTLINE: <strong className="text-slate-900 font-bold">+91 90717 18620</strong> • SOLUR, HOSAKOTE BANGALORE
            </div>
          </div>
        )}

        {/* Tab 2: Go-Karting + Food Combos */}
        {activeTab === 'food-combos' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
              {foodCombos.map((combo) => (
                <div
                  key={combo.id}
                  className={`loco-card p-6 flex flex-col justify-between transition-all duration-300 relative bg-white border ${
                    combo.popular
                      ? 'border-2 border-[#0052FF] shadow-[0_15px_40px_rgba(0,82,255,0.15)] scale-[1.02] z-10'
                      : 'border-slate-200 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Top Tag */}
                    <div className="mb-3">
                      <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${combo.popular ? 'bg-blue-50 text-[#0052FF] border border-blue-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                        {combo.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 mb-1 tracking-tight">
                      {combo.name}
                    </h3>

                    <p className="text-xs text-slate-600 mb-3 leading-relaxed font-sans">
                      {combo.validity}
                    </p>

                    {combo.foodIncluded && (
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700 mb-3 flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
                        <span className="line-clamp-2">{combo.foodIncluded}</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="my-3 pb-3 border-b border-slate-200">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold tracking-tight text-slate-900 font-mono">
                          ₹{combo.price}
                        </span>
                        <span className="text-xs font-medium uppercase text-slate-500 font-mono">
                          {combo.taxNote}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-[#0052FF] mt-0.5 font-mono">
                        {combo.laps}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-1.5 mb-6 text-xs text-slate-700 font-sans">
                      {combo.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-1.5">
                          <span className="text-[#0052FF] font-bold shrink-0">+</span>
                          <span className="leading-snug line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playRev(1.3);
                      onSelectPlan(combo.name, `₹${combo.price}`);
                    }}
                    className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      combo.popular
                        ? 'bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white shadow-md shadow-blue-600/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                    }`}
                  >
                    <span>Reserve Combo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Warning Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-700 font-medium flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#0052FF]" />
              <span>All food and kart combo passes are valid until 6:00 PM daily.</span>
            </div>
          </div>
        )}

        {/* Tab 3: Bike Ride 4-Hour Dawn Track Session */}
        {activeTab === 'bike-ride' && (
          <div className="rounded-[32px] p-2 bg-gradient-to-b from-amber-200/50 via-slate-100 to-white border border-amber-300/50 shadow-xl">
            <div className="rounded-[24px] bg-slate-50 p-8 sm:p-12 border border-slate-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Column: Offer Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-amber-400 text-black font-bold text-xs uppercase tracking-wider">
                      Bikers of Bengaluru
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Open Track 6 AM – 10 AM
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    Superbike Dawn Session <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600">
                      4 Hours Unlimited
                    </span>
                  </h3>

                  <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-xl">
                    {bikeRideOffer.validity}. Unleash your motorcycle on 1166 meters of outdoor asphalt before city highway traffic wakes up.
                  </p>

                  {/* Included Breakfast Callout Card */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-600 font-bold uppercase">
                      <Utensils className="w-4 h-4" />
                      <span>Included in ₹1500 Pass:</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      Combo Protein Breakfast (Bread Omelet or Veg Sandwich) + Fresh Hot Cappuccino ☕🥪
                    </p>
                    <div className="text-xs text-slate-600">
                      Served hot at the Apex Rooftop Diner after your morning track run.
                    </div>
                  </div>

                  {/* Safety Rules Pillars */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
                      <ShieldCheck className="w-4 h-4 text-amber-500 mx-auto" />
                      <div className="text-[10px] font-mono text-slate-900 font-bold">RIDING GEAR</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
                      <Zap className="w-4 h-4 text-amber-500 mx-auto" />
                      <div className="text-[10px] font-mono text-slate-900 font-bold">RESPECT LIMITS</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
                      <Trophy className="w-4 h-4 text-amber-500 mx-auto" />
                      <div className="text-[10px] font-mono text-slate-900 font-bold">STAY IN CONTROL</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
                      <Sparkles className="w-4 h-4 text-amber-500 mx-auto" />
                      <div className="text-[10px] font-mono text-slate-900 font-bold">RIDE SAFE</div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Price & Instant Booking Card */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-[28px] p-8 shadow-xl space-y-6 text-center">
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-amber-600 uppercase tracking-widest font-semibold">
                      Session Pass
                    </div>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl sm:text-6xl font-extrabold text-slate-900 font-mono">
                        ₹1500
                      </span>
                      <span className="text-xs font-bold uppercase text-slate-500 font-mono">
                        + TAX
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      4 Hours Unlimited Access (6:00 AM – 10:00 AM)
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => {
                        soundFx.playRev(1.4);
                        onSelectPlan('Bike Ride 4-Hour Session', '₹1500');
                      }}
                      className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Book Dawn Bike Slot</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </button>

                    <a
                      href="https://wa.me/919071718620?text=Hi%20Velocity%20Circuit,%20I%20want%20to%20book%20the%206%20AM%20Bike%20Ride%20Session%20(Rs%201500)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs transition-all flex items-center justify-center gap-2 border border-slate-200"
                    >
                      <span>WhatsApp Desk: +91 9071718620</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Corporate Track Takeover Notice */}
        <div className="rounded-[30px] bg-slate-50 text-slate-900 p-7 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-slate-200">
          <div className="space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0052FF]">
              Corporate & Private Track Takeover
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Host Your Company Grand Prix in Hoskote
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Exclusive track rental, custom podium ceremonies, gourmet catering from Apex Cafe, and live DJ setups.
            </p>
          </div>

          <a
            href="https://wa.me/919071718620?text=Hi%20Velocity%20Circuit,%20I%20want%20to%20inquire%20about%20Corporate%20Track%20Rental"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playGearShift()}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 shadow-lg shadow-blue-600/30"
          >
            Inquire via WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
};
