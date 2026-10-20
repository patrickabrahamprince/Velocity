import React, { useState } from 'react';
import { Coffee, Gamepad2, ShoppingBag, Calendar, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

export const LifestyleSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cafe' | 'sim' | 'events' | 'merch'>('cafe');

  return (
    <section id="lifestyle" className="relative py-20 lg:py-28 bg-[#080B1B] overflow-hidden border-t border-[#0052FF]/20 w-full">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0052FF]/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 bg-[#0052FF]/15 border border-[#0052FF]/40 px-3.5 py-1 rounded-full text-xs font-mono text-[#00F0FF]">
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>BEYOND THE ASPHALT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
              MORE THAN RACING. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00F0FF]">
                AN IMMERSIVE CULTURE.
              </span>
            </h2>
            <p className="text-zinc-300 max-w-xl text-xs sm:text-sm font-sans">
              Fuel up at the Apex Rooftop Cafe, master apexes on Fanatec Simulators, or suit up with official Velocity Merch.
            </p>
          </div>

          {/* Navigation Pills */}
          <div className="flex items-center gap-2 flex-wrap self-start lg:self-end">
            <button
              onClick={() => { soundFx.playGearShift(); setActiveTab('cafe'); }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl font-syne font-bold text-xs uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'cafe'
                  ? 'bg-[#0052FF] text-white shadow-md shadow-blue-950/60'
                  : 'bg-[#090D1E] text-zinc-300 hover:text-white border border-[#0052FF]/20'
              }`}
            >
              <Coffee className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Apex Cafe</span>
            </button>

            <button
              onClick={() => { soundFx.playGearShift(); setActiveTab('sim'); }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl font-syne font-bold text-xs uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'sim'
                  ? 'bg-[#0052FF] text-white shadow-md shadow-blue-950/60'
                  : 'bg-[#090D1E] text-zinc-300 hover:text-white border border-[#0052FF]/20'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Sim Racing</span>
            </button>

            <button
              onClick={() => { soundFx.playGearShift(); setActiveTab('events'); }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl font-syne font-bold text-xs uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'events'
                  ? 'bg-[#0052FF] text-white shadow-md shadow-blue-950/60'
                  : 'bg-[#090D1E] text-zinc-300 hover:text-white border border-[#0052FF]/20'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Events</span>
            </button>

            <button
              onClick={() => { soundFx.playGearShift(); setActiveTab('merch'); }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl font-syne font-bold text-xs uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'merch'
                  ? 'bg-[#0052FF] text-white shadow-md shadow-blue-950/60'
                  : 'bg-[#090D1E] text-zinc-300 hover:text-white border border-[#0052FF]/20'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Merch</span>
            </button>
          </div>
        </div>

        {/* Dynamic Lifestyle Display Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#0F1635] to-[#060813] border border-[#0052FF]/30 p-6 sm:p-8 lg:p-10 shadow-2xl w-full">
          {activeTab === 'cafe' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00F0FF] uppercase">
                  <Coffee className="w-4 h-4" />
                  <span>OVERLOOKING TURN 19 & MAIN STRAIGHT</span>
                </div>
                <h3 className="font-syne font-extrabold text-2xl sm:text-4xl uppercase text-white">
                  APEX ROOFTOP <br />
                  <span className="text-[#00F0FF]">CAFE & GRILL</span>
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Watch live overtakes from our multi-tier glass viewing deck while enjoying artisan smash burgers, woodfired pizzas, and Red Bull nitro mocktails. The ultimate motorsports hangout in Hoskote.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#060813] p-3 rounded-xl border border-white/5">
                    <div className="font-syne font-bold text-xs text-white uppercase">SMASH BURGERS & BITES</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Truffle fries, peri-peri wings & burgers</div>
                  </div>
                  <div className="bg-[#060813] p-3 rounded-xl border border-white/5">
                    <div className="font-syne font-bold text-xs text-[#00F0FF] uppercase">NITRO COLD BREW</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Red Bull infusions & specialty coffee</div>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-mono text-[#00FF66] font-semibold">
                    OPEN DAILY: 06:00 AM - 11:30 PM • LIVE F1 SCREENINGS
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 relative h-[300px] sm:h-[380px] rounded-2xl overflow-hidden border border-[#0052FF]/20 group w-full">
                <img
                  src="/images/velocity_cafe_lifestyle.jpg"
                  alt="Apex Rooftop Cafe at Velocity International Circuit Hoskote"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#0052FF]/30 text-xs font-mono text-white">
                  ROOFTOP VIEWING DECK • 360° CIRCUIT VIEW
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sim' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00F0FF] uppercase">
                  <Gamepad2 className="w-4 h-4" />
                  <span>FANATEC DIRECT-DRIVE RACING RIGS</span>
                </div>
                <h3 className="font-syne font-extrabold text-2xl sm:text-4xl uppercase text-white">
                  VELOCITY SIM <br />
                  <span className="text-[#00F0FF]">ESPORTS ARENA</span>
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Warm up before hitting the real tarmac. 6 professional hydraulic motion rigs equipped with laser-scanned circuits, 20Nm torque force feedback, and Triple 4K curved displays.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#060813] p-3 rounded-xl border border-white/5">
                    <div className="font-syne font-bold text-xs text-white">₹199 / 15 MIN SESSION</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Assetto Corsa & iRacing Pro Rigs</div>
                  </div>
                  <div className="bg-[#060813] p-3 rounded-xl border border-white/5">
                    <div className="font-syne font-bold text-xs text-[#00F0FF]">MOTION COCKPIT</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Hydraulic pitch, roll & yaw simulation</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative h-[300px] sm:h-[380px] rounded-2xl overflow-hidden border border-[#0052FF]/20 group w-full">
                <img
                  src="/images/kart_fleet_garage.jpg"
                  alt="Sim Racing Arena Hoskote"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#0052FF]/30 text-xs font-mono text-white">
                  6X DIRECT DRIVE ESPORTS RIGS
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00F0FF] uppercase">
                  <Calendar className="w-4 h-4" />
                  <span>REGULAR MOTORSPORT FIXTURES</span>
                </div>
                <h3 className="font-syne font-extrabold text-2xl sm:text-4xl uppercase text-white">
                  AUTOCROSS & <br />
                  <span className="text-[#00F0FF]">SKATATHON NIGHTS</span>
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  We host South India&apos;s biggest Gymkhana Autocross championships, Roller-skating marathons (Skatathon), and Midnight Drift Battles. Check the calendar and test your limits.
                </p>

                <div className="space-y-2 pt-2 text-xs font-mono">
                  <div className="bg-[#060813] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                    <span className="text-white font-bold">BANGALORE AUTOCROSS RD. 4</span>
                    <span className="text-[#00F0FF]">EVERY 2ND SATURDAY</span>
                  </div>
                  <div className="bg-[#060813] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                    <span className="text-white font-bold">1166M SKATATHON CHALLENGE</span>
                    <span className="text-[#00FF66]">SUNDAY MORNINGS (5AM)</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative h-[300px] sm:h-[380px] rounded-2xl overflow-hidden border border-[#0052FF]/20 group w-full">
                <img
                  src="/images/hero_racing_kart.jpg"
                  alt="Autocross events Hoskote"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#0052FF]/30 text-xs font-mono text-white">
                  NATIONAL MOTORSPORTS CALENDAR
                </div>
              </div>
            </div>
          )}

          {activeTab === 'merch' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00F0FF] uppercase">
                  <ShoppingBag className="w-4 h-4" />
                  <span>STREETWEAR MEETS RACING</span>
                </div>
                <h3 className="font-syne font-extrabold text-2xl sm:text-4xl uppercase text-white">
                  VELOCITY RACING <br />
                  <span className="text-[#00F0FF]">PADDOCK GEAR</span>
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Heavyweight oversized hoodies, carbon-fiber keytags, Alpinestars-grade driving gloves, and custom track-day balaclavas. Available at the track store.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2 text-center font-mono text-xs">
                  <div className="bg-[#060813] p-3 rounded-xl border border-white/5">
                    <div className="text-white font-bold">HOODIE</div>
                    <div className="text-[#00F0FF] mt-1">₹1,999</div>
                  </div>
                  <div className="bg-[#060813] p-3 rounded-xl border border-white/5">
                    <div className="text-white font-bold">GLOVES</div>
                    <div className="text-[#00F0FF] mt-1">₹899</div>
                  </div>
                  <div className="bg-[#060813] p-3 rounded-xl border border-white/5">
                    <div className="text-white font-bold">KEYTAG</div>
                    <div className="text-[#00F0FF] mt-1">₹299</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative h-[300px] sm:h-[380px] rounded-2xl overflow-hidden border border-[#0052FF]/20 group w-full">
                <img
                  src="/images/kart_fleet_garage.jpg"
                  alt="Velocity Merch"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#0052FF]/30 text-xs font-mono text-white">
                  AVAILABLE AT PADDOCK PRO STORE
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
