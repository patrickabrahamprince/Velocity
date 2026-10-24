import React from 'react';
import { 
  Zap, 
  Users, 
  Bike, 
  Utensils, 
  Trophy, 
  Smartphone, 
  Flag, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Compass, 
  Award 
} from 'lucide-react';
import { soundFx } from '../utils/soundEngine';
import { smoothScroll } from '../utils/smoothScroll';

interface AboutOfferSectionProps {
  onOpenBooking: (pkgName?: string) => void;
}

export const AboutOfferSection: React.FC<AboutOfferSectionProps> = ({ onOpenBooking }) => {
  const offerings = [
    {
      id: 'pro-karting',
      title: 'Pro Go-Karting & GP Laps',
      badge: '85+ km/h • Honda 270cc',
      image: '/images/track_apex_daytime.jpg',
      badgeColor: 'bg-blue-600/90 text-white',
      description: 'Championship-grade sprint racing on 1,166 meters of high-grip asphalt. 19 technical apex corners and RFID transponders recording lap times to the millisecond.',
      highlights: ['Tuned 4-Stroke Honda Fleet', '5, 8 & 10 Lap Sprint Formats', 'WhatsApp Timing Telemetry'],
      actionLabel: 'Book Karting Pass',
      actionPayload: '10 Laps All-Days GP (₹699 + Tax)',
      popular: true,
    },
    {
      id: 'family-tandem',
      title: 'Parent & Child Tandem Karts',
      badge: 'Ages 4+ • Dual Steering',
      image: '/images/family_tandem_kart.jpg',
      badgeColor: 'bg-cyan-600/90 text-white',
      description: 'Specially engineered twin-seater karts designed for parents to race alongside their kids with full safety roll cages and dual harnesses.',
      highlights: ['Dual 4-Point Racing Harnesses', 'Full Steel Enclosed Roll Cage', 'Sanitized Child Helmets Included'],
      actionLabel: 'Book 2-Seater Pass',
      actionPayload: '2-Seater Parent-Child Tandem (₹899 + Tax)',
      popular: false,
    },
    {
      id: 'superbike-dawn',
      title: 'Superbike Dawn Track Sessions',
      badge: 'Daily 06:00 – 10:00 AM',
      image: '/images/bike_track_sunrise.jpg',
      badgeColor: 'bg-amber-600/90 text-white',
      description: 'The premier open track experience for motorcyclists in Bangalore. 4 uninterrupted morning hours of wide asphalt, plus complimentary breakfast & cappuccino.',
      highlights: ['300cc to 1000cc+ Machines', 'Includes Breakfast & Coffee', '4 Hours Unlimited Track Access'],
      actionLabel: 'Book Dawn Pass',
      actionPayload: 'Superbike Dawn Pass (₹1,500 + Tax)',
      popular: false,
    },
    {
      id: 'rooftop-cafe',
      title: 'Apex Rooftop Diner & Lounge',
      badge: 'Panoramic Turn 7 View',
      image: '/images/velocity_cafe_lifestyle.jpg',
      badgeColor: 'bg-emerald-600/90 text-white',
      description: 'Perched directly above the final 3 corners with an unobstructed panoramic view of overtakes. Enjoy artisanal burgers, pizzas, craft shakes, and specialty brews.',
      highlights: ['Woodfired Artisanal Pizzas', 'Elevated Paddock Viewing Deck', 'Open Daily Till 11:30 PM'],
      actionLabel: 'Explore Cafe & Lifestyle',
      actionScroll: '#lifestyle',
      popular: false,
    },
    {
      id: 'corporate-gp',
      title: 'Corporate GP & Celebrations',
      badge: '10 to 200+ Racers',
      image: '/images/hero_racing_kart.jpg',
      badgeColor: 'bg-purple-600/90 text-white',
      description: 'Transform team outings and birthdays into real Formula-style Grand Prix battles with private heats, qualifying grids, and podium champagne presentations.',
      highlights: ['Podium Trophies & Medals', 'Exclusive Track & Pit Lane Time', 'Customized Gourmet Buffets'],
      actionLabel: 'Book Group GP',
      actionPayload: 'Corporate & Birthday GP (₹999 + Tax/Person)',
      popular: false,
    },
    {
      id: 'driver-os',
      title: 'Driver OS & VIP Repeat Rewards',
      badge: 'Instant ₹200 Vouchers',
      image: '/images/kart_fleet_garage.jpg',
      badgeColor: 'bg-blue-600/90 text-white',
      description: 'Connect your WhatsApp to your Velocity Driver Profile. Receive official transponder lap telemetry sheets and unlock ₹200 vouchers on every return.',
      highlights: ['Instant WhatsApp Telemetry', '₹200 Discount on Every Return', 'Bangalore Driver Leaderboard'],
      actionLabel: 'View Driver Telemetry',
      actionScroll: '#driver-os',
      popular: false,
    },
  ];

  const handleAction = (item: typeof offerings[0]) => {
    soundFx.playGearShift();
    if (item.actionScroll) {
      smoothScroll.scrollTo(item.actionScroll, { offset: -70 });
    } else if (item.actionPayload) {
      onOpenBooking(item.actionPayload);
    } else {
      onOpenBooking();
    }
  };

  return (
    <section id="about" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto w-full relative">
      {/* Background Ambient Motorsport Lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0052FF]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#00D2FF]/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="space-y-16 relative z-10">
        
        {/* ============================================================== */}
        {/* PART 1: ABOUT US HERO CHASSIS */}
        {/* ============================================================== */}
        <div className="rounded-[28px] sm:rounded-[36px] overflow-hidden bg-white dark:bg-[#0A0E1F] border border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-6 sm:p-10 lg:p-12">
          
          {/* Top Identity Lockup */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-white/[0.06] border border-blue-200/80 dark:border-white/10 text-xs font-semibold text-blue-700 dark:text-sky-300">
                <Compass className="w-3.5 h-3.5 text-[#0052FF] dark:text-[#00D2FF]" />
                <span>About Velocity International Circuit</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-[3.2rem] font-asphalt text-slate-950 dark:text-white leading-[1.02] tracking-[-0.03em]">
                Born for Pure Racing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00D2FF]">
                  Built for the Entire City
                </span>
              </h2>

              <p className="text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                Located in Hoskote just 25 minutes from Whitefield, Velocity International Circuit is <strong className="text-slate-900 dark:text-white font-semibold">Karnataka&apos;s biggest outdoor motorsport arena</strong>. Spanning an authentic FIA-standard 1,166-meter asphalt layout with 19 apex corners, natural elevation drops, and stadium floodlights, we created an arena where true racing adrenaline meets relaxed rooftop dining and family entertainment.
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                Whether you are chasing your personal best lap time in a tuned Honda 270cc kart, leaning into high-speed apexes on a 1000cc superbike at dawn, sharing a tandem ride with your child, or celebrating a corporate podium with champagne—Velocity provides the complete motorsport lifestyle.
              </p>

              {/* Key Metric Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 font-medium">
                  <Flag className="w-4 h-4 text-[#0052FF] dark:text-[#00D2FF]" />
                  <span><strong className="text-slate-900 dark:text-white">1,166 Meters</strong> Asphalt</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 font-medium">
                  <Zap className="w-4 h-4 text-[#0052FF]" />
                  <span><strong className="text-slate-900 dark:text-white">19</strong> Apex Corners</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span><strong className="text-slate-900 dark:text-white">6 AM – 11:30 PM</strong> Daily</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Feature Board */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] bg-slate-50 dark:bg-[#070A14] p-6 sm:p-7 border border-slate-200/90 dark:border-white/10 space-y-5 shadow-sm">
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#0052FF] dark:text-[#00D2FF]" />
                    <span className="text-xs uppercase font-bold text-slate-900 dark:text-white tracking-wider">
                      The Velocity Standard
                    </span>
                  </div>
                  <span className="text-xs text-blue-600 dark:text-[#38BDF8] font-bold">FIA GRADE</span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-[#0052FF]/20 text-[#0052FF] dark:text-[#00D2FF] flex items-center justify-center shrink-0 border border-blue-200 dark:border-[#0052FF]/30 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-semibold">100% Real Asphalt Circuit</strong>
                      <span className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        No painted concrete or indoor slick surfaces. Genuine high-traction racing tarmac built to FIA standards.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-[#0052FF]/20 text-[#0052FF] dark:text-[#00D2FF] flex items-center justify-center shrink-0 border border-blue-200 dark:border-[#0052FF]/30 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-semibold">Wireless Safety Telemetry</strong>
                      <span className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        Certified track marshals can safely speed-govern or kill engine switches remotely during any on-track incident.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-[#0052FF]/20 text-[#0052FF] dark:text-[#00D2FF] flex items-center justify-center shrink-0 border border-blue-200 dark:border-[#0052FF]/30 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white block font-semibold">No Experience or License Required</strong>
                      <span className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        Every driver receives DOT full-face helmets, hygienic balaclavas, and a 1-on-1 safety briefing before boarding.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      soundFx.playRev(1.4);
                      onOpenBooking();
                    }}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00D2FF] hover:brightness-110 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Flame className="w-4 h-4 fill-current" />
                    <span>Book Passes Online (Save ₹200)</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* PART 2: WHAT WE REALLY OFFER (6 IMAGE-LED BENTO CARDS) */}
        {/* ============================================================== */}
        <div id="offers" className="space-y-10 pt-4">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-white/[0.06] border border-blue-200 dark:border-white/10 text-xs font-semibold text-blue-700 dark:text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-[#0052FF] dark:text-[#38BDF8]" />
              <span>What We Really Offer</span>
            </div>

            <h3 className="text-3xl sm:text-5xl lg:text-5xl font-asphalt text-slate-950 dark:text-white leading-[1.05] tracking-[-0.03em]">
              6 Ways to Experience <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00D2FF]">
                Karnataka&apos;s Biggest Circuit
              </span>
            </h3>

            <p className="text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              From solo high-speed flying laps to parent-child adventures, sunrise superbike sessions, and rooftop dining under stadium lights.
            </p>
          </div>

          {/* 6 Rich Bento Grid Cards with Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {offerings.map((item) => (
              <div
                key={item.id}
                className="rounded-[24px] overflow-hidden flex flex-col justify-between transition-all duration-300 bg-white dark:bg-[#0A0E1F] border border-slate-200/90 dark:border-white/10 hover:border-blue-500/50 shadow-sm hover:shadow-xl group"
              >
                {/* Top Image Stage with Zoom Effect & Floating Badge */}
                <div className="h-48 sm:h-52 w-full overflow-hidden relative bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-md ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title overlay on bottom of image for sleek look */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h4 className="text-lg font-bold text-white tracking-tight drop-shadow-md">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Bottom Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0052FF] dark:text-[#00D2FF] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleAction(item)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-[#0052FF] text-slate-800 hover:text-white dark:bg-white/[0.05] dark:hover:bg-[#0052FF] dark:text-white font-semibold text-xs tracking-wide transition-all duration-200 flex items-center justify-between cursor-pointer group-hover:shadow-md"
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust & Assurance Strip */}
          <div className="rounded-[24px] bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs text-blue-600 dark:text-[#38BDF8] font-semibold uppercase tracking-wider">
                Zero Hidden Fees • Transparent Track Rates
              </div>
              <div className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                All passes include sanitized DOT helmets, hygiene balaclavas & live transponders.
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  soundFx.playRev(1.4);
                  onOpenBooking();
                }}
                className="px-6 py-3 rounded-full bg-[#0052FF] hover:bg-[#0042D9] text-white font-semibold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Book Online & Save ₹200
              </button>
              <a
                href="#pricing"
                onClick={() => soundFx.playGearShift()}
                className="px-5 py-3 rounded-full bg-white dark:bg-white/10 hover:bg-slate-50 text-slate-800 dark:text-white font-semibold text-xs uppercase tracking-wider border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
              >
                View All Prices
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
