import React, { useState } from 'react';
import { Route, Zap, Rocket, ShieldCheck, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface ThunderProFeaturesProps {
  onOpenBooking: () => void;
}

const servicesCategories = [
  { id: 'sprint', label: '5 LAPS SPRINT', speed: '85+ km/h', age: 'All Drivers', price: '₹299', kart: 'Tuned 4-Stroke Racing Go-Kart' },
  { id: 'blitz', label: '8 LAPS BLITZ', speed: '90+ km/h', age: 'Weekday Pack', price: '₹399', kart: 'Tuned 4-Stroke Racing Go-Kart' },
  { id: 'supersaver', label: '10 LAPS GP', speed: '95+ km/h', age: 'Most Popular', price: '₹399', kart: 'Tuned 4-Stroke Racing Go-Kart' },
  { id: 'podium', label: 'WEEKEND GP', speed: '95+ km/h', age: 'Podium Pack', price: '₹699', kart: 'Tuned 4-Stroke Racing Go-Kart' },
  { id: 'night', label: '30-MIN NIGHT RUSH', speed: 'Unlimited', age: 'Pro Racers', price: '₹1,499', kart: 'Tuned 4-Stroke Racing Go-Kart' },
  { id: 'corporate', label: 'CORPORATE CUP', speed: 'Private Track', age: 'Groups 10+', price: 'Custom', kart: 'Full Fleet Track Takeover' },
];

export const ThunderProFeaturesSection: React.FC<ThunderProFeaturesProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState(servicesCategories[0]);

  return (
    <section className="py-12 lg:py-16 px-3 sm:px-6 lg:px-8 max-w-[1480px] mx-auto w-full">
      {/* Luxury Crisp White Container */}
      <div className="rounded-[32px] sm:rounded-[44px] bg-[#F8F9FC] text-neutral-900 p-6 sm:p-10 lg:p-14 shadow-sm border border-neutral-200/80 space-y-12">
        {/* 1. Header & 4 Pillars */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#0052FF]">
              VELOCITY INTERNATIONAL CIRCUIT
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 uppercase font-heading">
              India&apos;s Finest Outdoor Go-Karting Destination
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-lg mx-auto leading-relaxed">
              Designed to FIA Grade standards. 1166m of high-speed technical asphalt crafted for pure racing precision.
            </p>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1: TRACK */}
            <div className="p-6 rounded-[24px] bg-white border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0052FF] group-hover:scale-110 group-hover:bg-[#0052FF] group-hover:text-white transition-all">
                <Route className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 uppercase tracking-wider">1166M TRACK</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                1166m+ of FIA super-wide asphalt circuit with 19 technical corners for supreme overtaking.
              </p>
            </div>

            {/* Card 2: FLEET POWER */}
            <div className="p-6 rounded-[24px] bg-white border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0052FF] group-hover:scale-110 group-hover:bg-[#0052FF] group-hover:text-white transition-all">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 uppercase tracking-wider">TUNED FLEET</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                World championship French SODI RT8 chassis tuned with high-torque Honda 4-stroke engines.
              </p>
            </div>

            {/* Card 3: BOOSTER SPEED */}
            <div className="p-6 rounded-[24px] bg-white border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0052FF] group-hover:scale-110 group-hover:bg-[#0052FF] group-hover:text-white transition-all">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 uppercase tracking-wider">95+ KM/H SPEED</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Blistering straight-line acceleration down our 160-meter high-speed pit straight.
              </p>
            </div>

            {/* Card 4: SAFETY */}
            <div className="p-6 rounded-[24px] bg-white border border-neutral-200/80 hover:border-neutral-300 hover:shadow-md transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0052FF] group-hover:scale-110 group-hover:bg-[#0052FF] group-hover:text-white transition-all">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900 uppercase tracking-wider">FIA SAFETY</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                4-point racing harness, anti-whiplash padded seats, roll-over bars, and remote marshaling.
              </p>
            </div>
          </div>
        </div>

        {/* 2. SERVICES Category Tabs */}
        <div className="space-y-6 pt-6 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xl font-bold uppercase tracking-tight text-neutral-900 font-heading">RACE SESSION FORMATS</h3>
            <span className="text-xs font-mono text-neutral-500">SELECT FORMAT FOR DETAILS</span>
          </div>

          {/* Navigation Category Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-neutral-200">
            {servicesCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playGearShift();
                  setActiveTab(cat);
                }}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                  activeTab.id === cat.id
                    ? 'bg-[#0052FF] text-white shadow-md font-bold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active Category Display Card */}
          <div className="p-8 rounded-[28px] bg-white border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-[#0052FF]">
                <span>{activeTab.age}</span>
                <span>•</span>
                <span>Top Speed: {activeTab.speed}</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">{activeTab.kart}</h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                Engineered with hydraulic disc braking, competition slick tires, adjustable pedals, and real-time transponder sector timing.
              </p>

              <div className="flex items-center gap-4 pt-2">
                <div className="text-3xl font-extrabold text-neutral-900 font-heading">
                  {activeTab.price} <span className="text-xs font-mono text-neutral-500">/ SESSION</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playRev(1.3);
                onOpenBooking();
              }}
              className="px-8 py-4 rounded-full bg-[#0052FF] hover:bg-[#0040C7] text-white font-semibold text-sm tracking-tight shadow-[0_10px_25px_rgba(0,82,255,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <span>Book {activeTab.label}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
