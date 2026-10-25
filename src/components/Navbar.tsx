import React, { useState } from 'react';
import { MapPin, ChevronDown, Phone, Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { LocationPickerModal, bangaloreLocations, type LocationOption } from './LocationPickerModal';
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
  currentLocation = bangaloreLocations[0],
  onLocationChange,
  currentDriver,
  onOpenAuth,
  onOpenDriverDashboard,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationOption>(currentLocation);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectLocation = (loc: LocationOption) => {
    setUserLocation(loc);
    if (onLocationChange) onLocationChange(loc);
  };

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

  // Format a compact, clean location display label
  const locationLabel = userLocation.name.toLowerCase().includes('velocity')
    ? 'Hoskote, BLR'
    : userLocation.name.split('/')[0].split('(')[0].trim();

  return (
    <>
      {/* Floating Island Glass Capsule Navbar */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
        <div className={`max-w-6xl mx-auto rounded-full px-4 sm:px-5 py-2 flex items-center justify-between pointer-events-auto min-h-[56px] transition-all duration-300 ${
          isDark
            ? 'bg-[#080C1A]/80 backdrop-blur-2xl border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] text-white'
            : 'bg-white/85 backdrop-blur-2xl border border-slate-200/80 shadow-[0_15px_40px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,1)] text-slate-900'
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
              <span className={`font-bold text-[15px] sm:text-base tracking-[-0.03em] leading-none transition-colors whitespace-nowrap font-apple-display ${
                isDark ? 'text-white group-hover:text-[#00D2FF]' : 'text-slate-900 group-hover:text-[#0066FF]'
              }`}>
                VELOCITY
              </span>
              <span className={`text-[7.5px] font-mono tracking-[0.24em] uppercase leading-none mt-1 whitespace-nowrap font-semibold ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                INTERNATIONAL CIRCUIT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[13px] font-medium tracking-tight mx-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScrollTo(item.href)}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
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
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
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
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-sm'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Location Pill */}
            <button
              onClick={() => {
                soundFx.playGearShift();
                setIsLocationModalOpen(true);
              }}
              title="Circuit Location & Map (Hoskote, Bengaluru)"
              className={`hidden sm:flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isDark
                  ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-white/90 shadow-inner'
                  : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
              <span>Hoskote, BLR</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-semibold ${
                isDark ? 'bg-blue-500/20 text-[#38BDF8]' : 'bg-blue-100 text-[#0052FF]'
              }`}>
                Map
              </span>
            </button>

            {/* Direct Race Hotline */}
            <a
              href="tel:+919071718620"
              className={`hidden xl:flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
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
                className="hidden sm:flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-xs text-[#0066FF] cursor-pointer font-medium whitespace-nowrap shrink-0"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-semibold">{currentDriver.name.split(' ')[0]}</span>
              </button>
            )}

            {/* Book Pass CTA in Apple Style Button */}
            <button
              onClick={onOpenBooking}
              className="h-9 px-4 sm:px-5 rounded-full bg-[#0066FF] hover:bg-[#0052FF] text-white font-semibold text-xs tracking-wide uppercase transition-all duration-300 shadow-md shadow-blue-500/25 flex items-center gap-2 cursor-pointer group whitespace-nowrap shrink-0 active:scale-[0.98]"
            >
              <span>Book Pass</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white cursor-pointer transition-colors flex items-center justify-center shrink-0"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 max-w-md mx-auto rounded-3xl bg-[#0A0E1D]/98 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Promo Banner inside mobile */}
            <div className="p-3 rounded-2xl bg-[#0052FF]/20 border border-[#0052FF]/30 text-white text-xs mb-4 flex items-center justify-between">
              <span className="font-bold">Code VELOCITY200 for ₹200 OFF</span>
              <button onClick={() => { setIsMobileMenuOpen(false); onOpenBooking(); }} className="underline font-bold text-[#00D2FF]">
                Book ↗
              </button>
            </div>

            <div className="flex flex-col gap-1 text-sm font-semibold text-slate-200 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleScrollTo(item.href)}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 hover:text-[#00D2FF] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => { 
                  soundFx.playGearShift();
                  setIsMobileMenuOpen(false); 
                  setIsLocationModalOpen(true); 
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00D2FF]" />
                  <span>Circuit Location & Map (Hoskote)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-[#38BDF8] font-bold">
                  View Map
                </span>
              </button>

              <a
                href="tel:+919071718620"
                className="w-full py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
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
        selectedLocation={userLocation}
        onSelectLocation={handleSelectLocation}
      />
    </>
  );
};
