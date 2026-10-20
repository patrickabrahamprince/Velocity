import React, { useState } from 'react';
import { ShieldCheck, Flag, Users, Utensils, Zap, Award, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LocoWhoWeAreProps {
  onOpenBooking: () => void;
}

export function LocoWhoWeAre({ onOpenBooking }: LocoWhoWeAreProps) {
  const [activeTab, setActiveTab] = useState<'mission' | 'safety' | 'experience'>('mission');

  const pillars = [
    {
      icon: <Flag className="w-6 h-6 text-[#feb000]" />,
      title: "1166M FIA-Grade Circuit",
      desc: "India's biggest outdoor asphalt track featuring 19 apex turns, high-grip racing surface, and professional kerbs.",
      metric: "19 TURNS"
    },
    {
      icon: <Users className="w-6 h-6 text-[#00f0ff]" />,
      title: "All-Ages Family Destination",
      desc: "From 6-year-old rookie drivers in 2-seater tandem karts to corporate leagues and pro track riders.",
      metric: "FAMILY FIRST"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#ff3366]" />,
      title: "Uncompromising Safety",
      desc: "Polyethylene impact barrier systems, Snell/DOT-approved full-face helmets, and certified marshals at every sector.",
      metric: "100% SAFE"
    },
    {
      icon: <Utensils className="w-6 h-6 text-[#feb000]" />,
      title: "Apex Rooftop Dining",
      desc: "Relax post-race at our multi-cuisine cafe overlooking Turn 7 with artisanal pizzas, burgers, and thick shakes.",
      metric: "PADDOCK CAFE"
    }
  ];

  return (
    <section id="about" className="relative py-24 bg-[#090d16] border-y border-white/5 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#feb000]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00f0ff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header (Loco Bear Style) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#feb000]/10 border border-[#feb000]/30 text-[#feb000] text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Who We Are</span>
          </div>
          <h2 className="font-bison text-4xl sm:text-6xl md:text-7xl text-white font-black uppercase tracking-tight">
            An Ultimate <span className="text-[#feb000]">Entertainment Hub</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Imagine twin-engine torque, professional telemetry timing, and 19 FIA-spec corners under stadium floodlights.
            <span className="text-white font-bold"> Get. Set. Velocity.</span> We’re not just a karting track—we are Bangalore's premier entertainment arena where motorsport passion meets unforgettable family weekends.
          </p>
        </div>

        {/* 4 Pillar Cards with Loco Bear Interactive Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="loco-card p-6 sm:p-7 flex flex-col justify-between group hover:border-[#feb000] relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/5 text-slate-400 group-hover:bg-[#feb000]/20 group-hover:text-[#feb000] transition-colors">
                {item.metric}
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#feb000]/40 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white mb-2 group-hover:text-[#feb000] transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                <span>Certified Standard</span>
                <CheckCircle2 className="w-4 h-4 text-[#feb000]" />
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Feature Callout Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#111726] via-[#151c2e] to-[#111726] border border-[#feb000]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <span className="px-3 py-1 rounded-md bg-[#feb000] text-black font-extrabold text-xs uppercase tracking-wider">
              Ready To Race?
            </span>
            <h3 className="font-bison text-3xl sm:text-4xl text-white font-black tracking-wide uppercase">
              No Prior Experience Needed — We Provide Everything!
            </h3>
            <p className="text-sm text-slate-300">
              Complete FIA safety gear, racing overalls, sanitized full-face helmets, and a 5-minute pre-race tactical briefing are included with every single pass.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-xl bg-[#feb000] hover:bg-[#fcd107] text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_25px_rgba(254,176,0,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Your First GP Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+919071718620"
              className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-sm tracking-wide flex items-center justify-center text-center"
            >
              Call Us: +91 90717 18620
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
