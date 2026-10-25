import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, ArrowUpRight } from 'lucide-react';
import { InstagramIcon, VelocityF1Logo } from './Icons';
import { soundFx } from '../utils/soundEngine';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer id="contact" className="bg-[#0A0D14] text-white pt-20 pb-12 overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-neutral-800">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="w-56 h-auto">
              <VelocityF1Logo />
            </div>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-sm">
              HOUSE OF CHAMPIONS. Karnataka&apos;s biggest 1166-meter FIA-grade asphalt go-karting track & superbike circuit in Hoskote, Bangalore.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  soundFx.playRev(1.3);
                  onOpenBooking();
                }}
                className="px-6 py-3 rounded-full bg-[#0052FF] hover:bg-[#0040C7] text-white font-semibold text-xs tracking-tight shadow-md shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Book now • From ₹299</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0052FF]">
              QUICK NAVIGATION
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans">
              <li><a href="#pricing" className="hover:text-white transition-colors">Tuned Go-Karts</a></li>
              <li><a href="#family" className="hover:text-white transition-colors">Family & Kids Tandem GP</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Prices & Combos</a></li>
              <li><a href="#circuit" className="hover:text-white transition-colors">19 Turns Circuit Map</a></li>
              <li><a href="#lifestyle" className="hover:text-white transition-colors">Apex Rooftop Cafe</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ & Rules</a></li>
            </ul>
          </div>

          {/* Col 3: Direct Contact & Hotline */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0052FF]">
              RESERVATIONS & DESK
            </div>

            <div className="space-y-3 text-xs font-sans text-neutral-300">
              <a
                href="tel:9071718620"
                onClick={() => soundFx.playGearShift()}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all block group"
              >
                <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-[#0052FF] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 font-mono uppercase">PHONE HOTLINE</div>
                  <div className="font-semibold text-white text-sm">+91 9071718620</div>
                </div>
              </a>

              <a
                href="https://wa.me/919071718620?text=Hi%20Velocity%20Circuit,%20I%20want%20to%20book%20a%20karting%20session"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playGearShift()}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#0052FF]/40 transition-all block group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-[#0052FF] shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 font-mono uppercase">WHATSAPP DESK</div>
                  <div className="font-semibold text-white">+91 9071718620</div>
                </div>
              </a>

              <a
                href="https://instagram.com/velocity_international"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all block group"
              >
                <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white shrink-0">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 font-mono uppercase">INSTAGRAM</div>
                  <div className="font-semibold text-white">@velocity_international</div>
                </div>
              </a>
            </div>
          </div>

          {/* Col 4: Location Map & Direction Pin */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0052FF]">
              VENUE ADDRESS
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-start gap-2.5 text-xs font-sans text-neutral-300">
                <MapPin className="w-4 h-4 text-[#0052FF] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Velocity International Circuit</strong>
                  <div className="text-neutral-400 mt-1 leading-relaxed text-[11px]">
                    3RCQ+GC, Solur Village, Near NH-75, Hoskote, Karnataka 562114
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/5">
                <Clock className="w-3.5 h-3.5 text-[#0052FF]" />
                <span>OPEN DAILY: 06:00 AM – 11:30 PM</span>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Velocity+International+Circuit+Hoskote"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playGearShift()}
                className="w-full py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-tight flex items-center justify-center gap-1.5 hover:bg-neutral-200 transition-all cursor-pointer shadow-md"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-neutral-500">
          <div>
            © {new Date().getFullYear()} Velocity International Circuit. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>1166M FIA Track</span>
            <span>•</span>
            <span>Hoskote, Bangalore</span>
            <span>•</span>
            <span className="text-[#0052FF] font-semibold">House of Champions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
