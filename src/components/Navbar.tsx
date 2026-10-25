import React, { useState } from 'react';
import { MapPin, Phone, Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { LocationPickerModal, type LocationOption } from './LocationPickerModal';
import { smoothScroll } from '../utils/smoothScroll';
import { soundFx } from '../utils/soundEngine';
import { useTheme } from '../context/ThemeContext';
import type { DriverProfile } from '../types/driverOS';

interface NavbarProps {
  onOpenBooking: () => void;
  currentLocation?: LocationOption;
  onLocationChange?: (loc: LocationOption) => void;
  currentDriver?: DriverProfile | null;
  onOpenAuth?: () => void;
  onOpenDriverDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  currentDriver,
  onOpenDriverDashboard,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'About & Offers', href: '#about' },
    { label: 'Why Online', href: '#why-book' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Rooftop Cafe', href: '#lifestyle' },
    { label: 'VIP Club', href: '#club' },
    { label: 'Location & Map', href: '#location' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    soundFx.playGearShift();
    smoothScroll.scrollTo(href, { offset: -70 });
  };

  return (
    <>
      {/* Floating Island Glass Capsule Navbar */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none">
        <div className={`max-w-7xl mx-auto rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-between pointer-events-auto min-h-[56px] transition-all duration-300 w-full shadow-lg ${
          isDark
            ? 'bg-[#080C1A]/85 backdrop-blur-2xl border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] text-white'
            : 'bg-white/92 backdrop-blur-2xl border border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,1)] text-slate-900'
        }`}>
          
          {/* Brand Logo: Balanced Horizontal Racing Lockup */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0 select-none">
            {/* High-speed F1 Emblem badge */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M2.5 13.5h2l1.5-3h4l1.5 3h7l1.5-4h2v7H20l-1-2h-3l-1 2H8l-1-2H4l-1 2H1v-3z" />
                <circle cx="6.5" cy="15.5" r="1.5" />
                <circle cx="17.5" cy="15.5" r="1.5" />
              </svg>
            </div>

            {/* Logotype typography */}
            <div className="flex flex-col justify-center">
              <span className={`font-bold text-[14px] sm:text-[15px] tracking-[-0.03em] leading-none transition-colors whitespace-nowrap font-apple-display ${
                isDark ? 'text-white group-hover:text-[#00D2FF]' : 'text-slate-900 group-hover:text-[#0066FF]'
              }`}>
                VELOCITY
              </span>
              <span className={`text-[7px] sm:text-[7.5px] font-mono tracking-[0.22em] uppercase leading-none mt-1 whitespace-nowrap font-semibold ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                INTERNATIONAL CIRCUIT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Visible on xl: 1280px+) */}
          <nav className="hidden xl:flex items-center gap-1 xl:gap-1.5 text-[13px] font-medium tracking-tight mx-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScrollTo(item.href)}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isDark
                    ? 'text-white/70 hover:text-white hover:bg-white/[0.08]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Island */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Theme Toggle Button (Light / Dark) */}
            <button
              onClick={() => {
                soundFx.playGearShift();
                toggleTheme();
              }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
              className={`h-9 w-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-amber-300 border border-white/15'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-xs'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Location Pill (Hoskote, Bengaluru single track) */}
            <button
              onClick={() => {
                soundFx.playGearShift();
                setIsLocationModalOpen(true);
              }}
              title="Circuit Location & Map (Hoskote, Bengaluru)"
              className={`hidden md:flex items-center gap-1.5 h-9 px-3 rounded-full border text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isDark
                  ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-white/90 shadow-inner'
                  : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
              <span>Hoskote, BLR</span>
              <span className={`text-[9.5px] font-mono px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                isDark ? 'bg-blue-500/20 text-[#38BDF8]' : 'bg-blue-100 text-[#0052FF]'
              }`}>
                Map
              </span>
            </button>

            {/* Direct Race Hotline (Ultra-wide screens) */}
            <a
              href="tel:+919071718620"
              title="Call Race Control: +91 90717 18620"
              className={`hidden 2xl:flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                isDark
                  ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-white/80 hover:text-white'
                  : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-800'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-mono text-[11px] font-semibold">+91 90717 18620</span>
            </a>

            {/* Driver Profile or Auth */}
            {currentDriver && (
              <button
                onClick={onOpenDriverDashboard}
                className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-xs text-[#0066FF] cursor-pointer font-medium whitespace-nowrap shrink-0"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-semibold">{currentDriver.name.split(' ')[0]}</span>
              </button>
            )}

            {/* Book Pass CTA */}
            <button
              onClick={onOpenBooking}
              className="h-9 px-3.5 sm:px-4.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052FF] hover:brightness-110 text-white font-bold text-xs tracking-wide uppercase transition-all duration-300 shadow-md shadow-blue-500/25 flex items-center gap-1.5 sm:gap-2 cursor-pointer group whitespace-nowrap shrink-0 active:scale-[0.98]"
            >
              <span>Book Pass</span>
              <div className="w-4.5 h-4.5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </button>

            {/* Tablet & Mobile Menu Hamburger (Visible below xl: 1280px) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`xl:hidden w-9 h-9 rounded-full cursor-pointer transition-colors flex items-center justify-center shrink-0 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 shadow-xs'
              }`}
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Panel */}
        {isMobileMenuOpen && (
          <div className={`xl:hidden mt-2 max-w-lg mx-auto rounded-3xl p-5 shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200 border ${
            isDark
              ? 'bg-[#080C1A]/95 backdrop-blur-2xl border-white/15 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
              : 'bg-white/95 backdrop-blur-2xl border-slate-200 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.15)]'
          }`}>
            {/* Promo Banner inside mobile */}
            <div className="p-3 rounded-2xl bg-[#0052FF]/15 border border-[#0052FF]/30 text-xs mb-4 flex items-center justify-between">
              <span className="font-bold text-[#0066FF] dark:text-[#38BDF8]">Code VELOCITY200 for ₹200 OFF</span>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onOpenBooking(); }} 
                className="underline font-bold text-blue-700 dark:text-[#00D2FF] cursor-pointer"
              >
                Book ↗
              </button>
            </div>

            <div className="flex flex-col gap-1 text-sm font-semibold mb-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleScrollTo(item.href)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                    isDark 
                      ? 'text-slate-200 hover:bg-white/10 hover:text-[#00D2FF]' 
                      : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => { 
                  soundFx.playGearShift();
                  setIsMobileMenuOpen(false); 
                  setIsLocationModalOpen(true); 
                }}
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0066FF] dark:text-[#00D2FF]" />
                  <span>Circuit Location & Map (Hoskote)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-[#38BDF8] font-bold">
                  View Map
                </span>
              </button>

              <a
                href="tel:+919071718620"
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>Call Hotline: +91 90717 18620</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Location Picker Modal */}
      <LocationPickerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
};
