import React from 'react';
import { Mail, Phone, MapPin, Flame, Sparkles } from 'lucide-react';

interface LocoFooterProps {
  onOpenBooking: () => void;
  onOpenLeads?: () => void;
}

export function LocoFooter({ onOpenBooking, onOpenLeads }: LocoFooterProps) {
  return (
    <footer className="bg-slate-100 dark:bg-[#030611] border-t border-slate-200 dark:border-white/10 text-slate-900 dark:text-white relative overflow-hidden pt-16 pb-12 transition-colors">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Callout Box */}
        <div className="rounded-[32px] p-1.5 sm:p-2 bg-gradient-to-b from-slate-200 via-slate-100 to-transparent dark:from-white/15 dark:via-white/5 dark:to-white/0 border border-slate-200 dark:border-white/10 mb-16 shadow-xl dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          <div className="rounded-[24px] bg-white dark:bg-[#0A0E1F]/95 p-8 sm:p-10 border border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-sky-300 font-apple-display mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-[#00D2FF]" />
                <span>Karnataka's Biggest Outdoor Circuit</span>
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-asphalt text-slate-900 dark:text-white leading-[1.05] tracking-tight">
                Step Onto the Track. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00D2FF]">Let the Race Begin.</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-white/70 mt-2 font-normal font-apple-text">
                Walk-ins open daily from 6:00 AM to 11:30 PM. Book online to apply coupon VELOCITY200 and skip the paddock line.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full md:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D2FF] hover:brightness-110 text-white font-semibold text-xs tracking-wide uppercase transition-all duration-300 shadow-[0_0_30px_rgba(0,102,255,0.4)] flex items-center justify-center gap-2.5 shrink-0 cursor-pointer active:scale-[0.98]"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Book Passes Online</span>
            </button>
          </div>
        </div>

        {/* 3 Contact Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 border-b border-slate-200 dark:border-white/10 mb-14">
          <a
            href="mailto:hey@velocitycircuit.com"
            className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#0A0E1F]/80 hover:bg-slate-50 dark:hover:bg-[#0E152F] border border-slate-200 dark:border-white/10 transition-colors group shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 dark:bg-[#0052FF]/20 text-blue-600 dark:text-[#00D2FF] border border-blue-500/30 dark:border-[#0052FF]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block uppercase font-mono tracking-wider">Email Support</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00D2FF] transition-colors">
                hey@velocitycircuit.com
              </span>
            </div>
          </a>

          <a
            href="tel:+919071718620"
            className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#0A0E1F]/80 hover:bg-slate-50 dark:hover:bg-[#0E152F] border border-slate-200 dark:border-white/10 transition-colors group shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block uppercase font-mono tracking-wider">Race Control Desk</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                +91 90717 18620
              </span>
            </div>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Velocity+International+Circuit+Hoskote"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#0A0E1F]/80 hover:bg-slate-50 dark:hover:bg-[#0E152F] border border-slate-200 dark:border-white/10 transition-colors group shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-500/15 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block uppercase font-mono tracking-wider">Circuit Location</span>
              <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-1">
                Solur Village, NH-75, Hoskote Bengaluru
              </span>
            </div>
          </a>
        </div>

        {/* Multi-Column Link Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-14 border-b border-slate-200 dark:border-white/10 mb-12">
          {/* Col 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-slate-900 dark:text-white font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-600 dark:hover:text-white transition-colors">About Velocity</a></li>
              <li><a href="#circuit" className="hover:text-blue-600 dark:hover:text-white transition-colors">1,166M Track Map</a></li>
              <li><a href="#pricing" className="hover:text-blue-600 dark:hover:text-white transition-colors">Pricing & Combo Passes</a></li>
              <li><a href="#family" className="hover:text-blue-600 dark:hover:text-white transition-colors">Family & Tandem Karts</a></li>
              <li><a href="#driver-os" className="hover:text-blue-600 dark:hover:text-white transition-colors">Driver OS Pass</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-slate-900 dark:text-white font-mono">
              Fleets & Sessions
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li><a href="#pricing" className="hover:text-blue-600 dark:hover:text-white transition-colors">Honda 270cc Pro Karts</a></li>
              <li><a href="#family" className="hover:text-blue-600 dark:hover:text-white transition-colors">2-Seater Parent-Child Tandem</a></li>
              <li><a href="#pricing" className="hover:text-blue-600 dark:hover:text-white transition-colors">Superbike Dawn Sessions (6 AM)</a></li>
              <li><a href="#pricing" className="hover:text-blue-600 dark:hover:text-white transition-colors">Kart + Mojito Combo Passes</a></li>
              <li><a href="#pricing" className="hover:text-blue-600 dark:hover:text-white transition-colors">Corporate Grand Prix Rentals</a></li>
              <li><a href="#lifestyle" className="hover:text-blue-600 dark:hover:text-white transition-colors">Apex Rooftop Diner</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-slate-900 dark:text-white font-mono">
              Track Hours
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li className="text-slate-900 dark:text-white font-semibold">Open 7 Days a Week</li>
              <li>Monday – Friday: 6:00 AM – 11:30 PM</li>
              <li>Saturday & Sunday: 6:00 AM – 11:30 PM</li>
              <li className="pt-2 text-blue-600 dark:text-[#00D2FF] font-semibold">Dawn Sessions (Superbikes):</li>
              <li>Every Day: 6:00 AM – 10:00 AM</li>
              <li className="pt-2 text-slate-900 dark:text-white font-semibold">Floodlight Night GP:</li>
              <li>Every Day: 7:00 PM – 11:30 PM</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-slate-900 dark:text-white font-mono">
              Connect With Us
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Follow Bangalore's premier outdoor motorsport community for weekly lap telemetry and race footage.
            </p>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/velocity_internationalcircuit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-slate-200/80 hover:bg-[#0052FF] text-slate-700 hover:text-white dark:bg-white/[0.05] dark:text-slate-300 dark:hover:bg-[#0052FF] dark:hover:text-white border border-slate-300 dark:border-white/10 flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-xl bg-slate-200/80 hover:bg-red-600 text-slate-700 hover:text-white dark:bg-white/[0.05] dark:text-slate-300 dark:hover:bg-red-600 dark:hover:text-white border border-slate-300 dark:border-white/10 flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Velocity+International+Circuit+Hoskote"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-white dark:bg-[#0A0E1F] border border-slate-200 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-300 shadow-sm block hover:border-blue-500/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-blue-600 dark:text-[#38BDF8] font-mono font-semibold uppercase tracking-wider block">Live Directions</span>
                <span className="text-[10px] font-mono text-blue-600 dark:text-[#38BDF8] font-bold group-hover:translate-x-0.5 transition-transform">Get Route ↗</span>
              </div>
              <span className="text-slate-900 dark:text-white font-semibold">Velocity International Circuit</span>, Solur Village, NH-75 Hoskote.
            </a>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© 2026 Velocity International Circuit | All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            {onOpenLeads && (
              <>
                <button
                  onClick={onOpenLeads}
                  className="text-blue-600 dark:text-[#38BDF8] hover:text-blue-700 dark:hover:text-[#00D2FF] font-semibold font-mono text-[11px] uppercase tracking-wider cursor-pointer"
                >
                  ⚡ View Captured Leads
                </button>
                <span className="text-slate-300 dark:text-slate-600">•</span>
              </>
            )}
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Track Safety Rules</a>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
