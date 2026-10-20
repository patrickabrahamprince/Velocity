import React, { useState } from 'react';
import { Flame, Clock, Gauge, Users, Shield, ArrowRight, Sparkles, Check, ChevronRight } from 'lucide-react';

interface AttractionItem {
  id: string;
  name: string;
  tagline: string;
  category: 'High-Speed Racing' | 'Family & Tandem' | 'Superbike Track' | 'Tactical & Sim' | 'Food & Dining';
  image: string;
  badge: string;
  badgeColor: string;
  price: string;
  specs: {
    speed?: string;
    duration?: string;
    ageLimit?: string;
    capacity?: string;
  };
  features: string[];
}

interface LocoAttractionsSectionProps {
  onSelectAttraction: (attractionName: string) => void;
  selectedCategory?: string;
}

export function LocoAttractionsSection({ onSelectAttraction, selectedCategory: initialCategory }: LocoAttractionsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'All');
  const [activeModalItem, setActiveModalItem] = useState<AttractionItem | null>(null);

  const categories = ['All', 'High-Speed Racing', 'Family & Tandem', 'Superbike Track', 'Tactical & Sim', 'Food & Dining'];

  const attractions: AttractionItem[] = [
    {
      id: 'go-karting',
      name: 'Go - Karting (1166M Pro GP)',
      tagline: 'Life is short, track is long.',
      category: 'High-Speed Racing',
      image: '/images/hero_racing_kart.jpg',
      badge: "India's Longest Track",
      badgeColor: '#feb000',
      price: '₹699',
      specs: {
        speed: '85+ km/h',
        duration: '10 / 15 / 20 Laps',
        ageLimit: 'Age 12+',
        capacity: 'Single Seater'
      },
      features: [
        'Tuned Honda 4-stroke 270cc racing engine',
        'FIA-standard 19 apex corners with kerbs',
        'Live RFID transponder telemetry lap times',
        'Snell-approved full face helmet & neck brace'
      ]
    },
    {
      id: 'tandem-karts',
      name: 'Parent-Child 2-Seater Tandem',
      tagline: 'Double the adrenaline, 100% family safe.',
      category: 'Family & Tandem',
      image: '/images/kart_fleet_garage.jpg',
      badge: 'Family Favorite',
      badgeColor: '#00f0ff',
      price: '₹899',
      specs: {
        speed: '55 km/h (Gov.)',
        duration: '10 Laps',
        ageLimit: 'Age 6+ (with adult)',
        capacity: 'Dual Seater'
      },
      features: [
        'Dual steering wheel controls (Child can steer)',
        'Dual 5-point certified safety harnesses',
        'Reinforced roll cage & wraparound bumpers',
        'Special certificate & podium photo for kids'
      ]
    },
    {
      id: 'superbike-track',
      name: 'Superbike Sunrise Apex Sessions',
      tagline: 'Dawn knee-down sessions down the 220m main straight.',
      category: 'Superbike Track',
      image: '/images/bike_track_sunrise.jpg',
      badge: 'Morning Only (6-9 AM)',
      badgeColor: '#ff3366',
      price: '₹1,499',
      specs: {
        speed: '180+ km/h',
        duration: '3 Hour Open Track',
        ageLimit: 'Valid License',
        capacity: '200cc–1000cc'
      },
      features: [
        'Pristine asphalt with zero public road hazards',
        'Full medical team & track recovery on standby',
        'Paddock tire warmers & compressor access',
        'Complimentary post-ride espresso at Apex Cafe'
      ]
    },
    {
      id: 'apex-cafe',
      name: 'Apex Rooftop Cafe & Paddock Diner',
      tagline: 'Gourmet wood-fired pizzas with a panoramic view of Turn 7.',
      category: 'Food & Dining',
      image: '/images/velocity_cafe_lifestyle.jpg',
      badge: 'Rooftop Panoramic',
      badgeColor: '#feb000',
      price: 'From ₹149',
      specs: {
        duration: 'Open 6 AM - 11:30 PM',
        capacity: '120 Seats',
        ageLimit: 'All Ages',
        speed: 'Fast Bites'
      },
      features: [
        'Artisanal hand-tossed sourdough pizzas',
        'Signature smash burgers & high-protein shakes',
        'Direct grandstand balcony view of the track',
        'Private VIP lounge booking for birthdays'
      ]
    },
    {
      id: 'laser-tag',
      name: 'Tactical Laser Tag & Combat Arena',
      tagline: 'Ready, Aim, Fire! Squad vs squad tactical laser battle.',
      category: 'Tactical & Sim',
      image: '/images/velocity_official_poster.jpg',
      badge: 'Team Battle Arena',
      badgeColor: '#00f0ff',
      price: '₹399',
      specs: {
        duration: '15 Min Mission',
        capacity: 'Up to 16 Players',
        ageLimit: 'Age 8+',
        speed: 'Indoor Glow'
      },
      features: [
        'Advanced Red-Dot tactical infrared rifles',
        'Fog, laser lights & multi-level obstacles',
        'Real-time squad scoring & accuracy tracking',
        'Ideal team-building warmup before karting'
      ]
    },
    {
      id: 'sim-racing',
      name: 'F1 Motion Sim Rig & Pitstop Challenge',
      tagline: 'Direct-Drive Force Feedback simulated Grand Prix.',
      category: 'Tactical & Sim',
      image: '/images/hero_racing_kart.jpg',
      badge: 'Pro Esports Rig',
      badgeColor: '#ff3366',
      price: '₹299',
      specs: {
        duration: '15 Min Session',
        capacity: 'Single Driver',
        ageLimit: 'Age 10+',
        speed: '300+ km/h Sim'
      },
      features: [
        'Triple 144Hz curved displays & Fanatec wheel',
        'Full hydraulic load-cell pedals & haptics',
        'Exact digital 1:1 laser scan of Velocity circuit',
        'Global leaderboard with weekly prize pool'
      ]
    }
  ];

  const filteredAttractions = activeCategory === 'All'
    ? attractions
    : attractions.filter((a) => a.category === activeCategory);

  return (
    <section id="attractions" className="py-24 bg-[#07090e] relative overflow-hidden">
      {/* Background Neon Elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#feb000]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#ff3366]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title (Loco Bear Style) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#feb000]/10 border border-[#feb000]/30 text-[#feb000] text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Range Of Adventure We Offer</span>
          </div>
          <h2 className="font-bison text-4xl sm:text-6xl md:text-7xl text-white font-black uppercase tracking-tight">
            Experience The World Of <span className="text-[#feb000]">Adventure In Bangalore</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            From 85 km/h high-downforce racing karts to family tandem rides, morning superbike apex sessions, and tactical laser skirmishes.
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#feb000] text-black shadow-[0_4px_20px_rgba(254,176,0,0.4)] scale-105'
                  : 'bg-[#121824] text-slate-300 hover:text-white hover:bg-[#1a2233] border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Attraction Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAttractions.map((item) => (
            <div
              key={item.id}
              className="loco-card overflow-hidden group flex flex-col justify-between"
            >
              <div>
                {/* Image & Badge Container */}
                <div className="relative h-60 w-full overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d121d] via-transparent to-black/40" />

                  {/* Badge */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-black shadow-lg"
                    style={{ backgroundColor: item.badgeColor }}
                  >
                    {item.badge}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-xl text-right">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Starts at</span>
                    <span className="text-lg font-black text-[#feb000] font-bison">{item.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bison text-2xl text-white font-black uppercase tracking-wide group-hover:text-[#feb000] transition-colors mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 italic mb-4">
                    "{item.tagline}"
                  </p>

                  {/* Quick Specs Badges */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/40 border border-white/5 mb-5 text-[11px] text-slate-300">
                    {item.specs.speed && (
                      <div className="flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-[#feb000]" />
                        <span>{item.specs.speed}</span>
                      </div>
                    )}
                    {item.specs.duration && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
                        <span>{item.specs.duration}</span>
                      </div>
                    )}
                    {item.specs.ageLimit && (
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-[#ff3366]" />
                        <span>{item.specs.ageLimit}</span>
                      </div>
                    )}
                    {item.specs.capacity && (
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.specs.capacity}</span>
                      </div>
                    )}
                  </div>

                  {/* Features Bullet List */}
                  <ul className="space-y-1.5 mb-2 text-xs text-slate-300">
                    {item.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#feb000] mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-2.5">
                <button
                  onClick={() => onSelectAttraction(item.name)}
                  className="flex-1 py-3 rounded-xl bg-[#feb000] hover:bg-[#fcd107] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>Book Now</span>
                </button>
                <button
                  onClick={() => setActiveModalItem(item)}
                  className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive "Know More" Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#0d121d] border-2 border-[#feb000] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer text-sm font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-black uppercase text-black"
                style={{ backgroundColor: activeModalItem.badgeColor }}
              >
                {activeModalItem.badge}
              </span>
              <span className="text-xl font-black text-[#feb000] font-bison">{activeModalItem.price}</span>
            </div>

            <h3 className="font-bison text-3xl sm:text-4xl text-white font-black uppercase mb-1">
              {activeModalItem.name}
            </h3>
            <p className="text-sm text-slate-300 italic mb-6">
              "{activeModalItem.tagline}"
            </p>

            <div className="space-y-4 mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Included In This Activity:</h4>
              <ul className="space-y-2.5">
                {activeModalItem.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <Check className="w-4 h-4 text-[#feb000] mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const name = activeModalItem.name;
                  setActiveModalItem(null);
                  onSelectAttraction(name);
                }}
                className="flex-1 py-3.5 rounded-xl bg-[#feb000] hover:bg-[#fcd107] text-black font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Proceed to Reserve Slot</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
