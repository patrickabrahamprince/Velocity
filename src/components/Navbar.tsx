import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Menu,
  X,
  ArrowUpRight,
  Sun,
  Moon,
  User,
  LogOut,
  ChevronDown,
  Gauge,
  Sparkles,
} from 'lucide-react';
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
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  currentDriver,
  onOpenAuth,
  onOpenDriverDashboard,
  onLogout,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDriverMenuOpen, setIsDriverMenuOpen] = useState(false);
  const driverDropdownRef = useRef<HTMLDivElement>(null);

  // Close driver dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        driverDropdownRef.current &&
        !driverDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDriverMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Streamlined, punchy navigation items (no redundant "Location & Map" since button exists)
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Rooftop Cafe', href: '#lifestyle' },
    { label: 'Driver OS', href: '#driver-os' },
    { label: 'VIP Club', href: '#club' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    setIsDriverMenuOpen(false);
    soundFx.playGearShift();
    smoothScroll.scrollTo(href, { offset: -70 });
  };

  return (
    <>
      {/* Floating Island Glass Capsule Navbar */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pointer-events-none">
        <div
          className={`max-w-7xl mx-auto rounded-full px-3 sm:px-4.5 py-1.5 sm:py-2 flex items-center justify-between pointer-events-auto min-h-[52px] sm:min-h-[56px] transition-all duration-300 w-full shadow-lg ${
            isDark
              ? 'bg-[#080C1A]/90 backdrop-blur-2xl border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] text-white'
              : 'bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,1)] text-slate-900'
          }`}
        >
          {/* Brand Logo: Balanced Racing Lockup */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group shrink-0 select-none cursor-pointer"
          >
            {/* Emblem badge */}
            <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                <path d="M2.5 13.5h2l1.5-3h4l1.5 3h7l1.5-4h2v7H20l-1-2h-3l-1 2H8l-1-2H4l-1 2H1v-3z" />
                <circle cx="6.5" cy="15.5" r="1.5" />
                <circle cx="17.5" cy="15.5" r="1.5" />
              </svg>
            </div>

            {/* Logotype */}
            <div className="flex flex-col justify-center">
              <span
                className={`font-bold text-[13.5px] sm:text-[14.5px] tracking-[-0.03em] leading-none transition-colors whitespace-nowrap font-apple-display ${
                  isDark ? 'text-white group-hover:text-[#00D2FF]' : 'text-slate-900 group-hover:text-[#0066FF]'
                }`}
              >
                VELOCITY
              </span>
              <span
                className={`text-[6.5px] sm:text-[7px] font-mono tracking-[0.2em] uppercase leading-none mt-0.5 whitespace-nowrap font-semibold ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                INTERNATIONAL CIRCUIT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 text-[13px] font-medium tracking-tight mx-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScrollTo(item.href)}
                className={`px-2.5 2xl:px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isDark
                    ? 'text-white/75 hover:text-white hover:bg-white/[0.08]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Island */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={() => {
                soundFx.playGearShift();
                toggleTheme();
              }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
              className={`h-8.5 w-8.5 sm:h-9 sm:w-9 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-amber-300 border border-white/15'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-2xs'
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Location Pill (Hoskote, Bengaluru single track) */}
            <button
              onClick={() => {
                soundFx.playGearShift();
                setIsLocationModalOpen(true);
              }}
              title="Circuit Location & Map (Hoskote, Bengaluru)"
              className={`hidden md:flex items-center gap-1.5 h-8.5 sm:h-9 px-2.5 sm:px-3 rounded-full border text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isDark
                  ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-white/90 shadow-inner'
                  : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
              <span>Hoskote, BLR</span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isDark ? 'bg-blue-500/20 text-[#38BDF8]' : 'bg-blue-100 text-[#0052FF]'
                }`}
              >
                Map
              </span>
            </button>

            {/* Direct Race Hotline (Ultra-wide screens 2xl only) */}
            <a
              href="tel:+919071718620"
              title="Call Race Control: +91 90717 18620"
              className={`hidden 2xl:flex items-center gap-1.5 h-9 px-3 rounded-full border text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                isDark
                  ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-white/80 hover:text-white'
                  : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-800'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-mono text-[11px] font-semibold">+91 90717 18620</span>
            </a>

            {/* ======================================================== */}
            {/* DRIVER AUTH & PROFILE CORNER                             */}
            {/* ======================================================== */}
            {currentDriver ? (
              /* LOGGED IN: Sleek Dropdown Pill */
              <div className="relative shrink-0" ref={driverDropdownRef}>
                <button
                  onClick={() => {
                    soundFx.playGearShift();
                    setIsDriverMenuOpen(!isDriverMenuOpen);
                  }}
                  className={`flex items-center gap-1.5 h-8.5 sm:h-9 px-2.5 sm:px-3 rounded-full border text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'bg-blue-500/15 hover:bg-blue-500/25 border-blue-400/30 text-white'
                      : 'bg-blue-50 hover:bg-blue-100/80 border-blue-200 text-blue-900'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="font-bold">{currentDriver.name.split(' ')[0]}</span>
                  <span className="text-[10px] font-mono text-blue-600 dark:text-[#38BDF8] font-bold">
                    #{currentDriver.racingNumber}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 opacity-60 ml-0.5 transition-transform duration-200 ${
                      isDriverMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Driver Dropdown Menu */}
                {isDriverMenuOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2 ${
                      isDark
                        ? 'bg-[#0B1026] border-white/10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                        : 'bg-white border-slate-200 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.15)]'
                    }`}
                  >
                    {/* Driver Card Summary */}
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/5 space-y-1">
                      <div className="font-bold text-xs truncate text-slate-950 dark:text-white">
                        {currentDriver.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
                        <span>{currentDriver.tier} • #{currentDriver.racingNumber}</span>
                        <span className="text-blue-600 dark:text-[#38BDF8] font-bold">
                          {currentDriver.lapBalance} Laps Stored
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-0.5 text-xs font-semibold">
                      <button
                        onClick={() => {
                          setIsDriverMenuOpen(false);
                          soundFx.playRev(1.2);
                          onOpenDriverDashboard?.();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-[#38BDF8] flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Gauge className="w-3.5 h-3.5 text-blue-600 dark:text-[#38BDF8]" />
                          <span>Open Driver OS & Laps</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                      </button>

                      <button
                        onClick={() => {
                          setIsDriverMenuOpen(false);
                          soundFx.playGearShift();
                          onOpenAuth?.();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 opacity-70" />
                          <span>Switch Driver Profile</span>
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setIsDriverMenuOpen(false);
                          soundFx.playGearShift();
                          if (onLogout) onLogout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center justify-between cursor-pointer transition-colors border-t border-slate-100 dark:border-white/5 pt-2"
                      >
                        <span className="flex items-center gap-2 font-bold">
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Log Out</span>
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* LOGGED OUT: Clean Driver Log In button */
              <button
                onClick={() => {
                  soundFx.playGearShift();
                  onOpenAuth?.();
                }}
                className={`hidden sm:flex items-center gap-1.5 h-8.5 sm:h-9 px-3 rounded-full border text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isDark
                    ? 'bg-white/[0.06] hover:bg-white/[0.12] border-white/10 text-slate-200 hover:text-white'
                    : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-700 hover:text-blue-600'
                }`}
              >
                <User className="w-3.5 h-3.5 text-blue-600 dark:text-[#38BDF8]" />
                <span>Log In</span>
              </button>
            )}

            {/* Primary Action: Book Pass CTA */}
            <button
              onClick={onOpenBooking}
              className="h-8.5 sm:h-9 px-3.5 sm:px-4 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052FF] hover:brightness-110 text-white font-bold text-xs tracking-wide uppercase transition-all duration-300 shadow-md shadow-blue-500/25 flex items-center gap-1.5 sm:gap-2 cursor-pointer group whitespace-nowrap shrink-0 active:scale-[0.98]"
            >
              <span>Book Pass</span>
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0">
                <ArrowUpRight className="w-2.5 h-2.5 text-white" />
              </div>
            </button>

            {/* Mobile / Tablet Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`xl:hidden w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full cursor-pointer transition-colors flex items-center justify-center shrink-0 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 shadow-2xs'
              }`}
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div
            className={`xl:hidden mt-2 max-w-lg mx-auto rounded-3xl p-5 shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200 border ${
              isDark
                ? 'bg-[#080C1A]/95 backdrop-blur-2xl border-white/15 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                : 'bg-white/95 backdrop-blur-2xl border-slate-200 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.15)]'
            }`}
          >
            {/* Driver Profile or Login prompt on Mobile */}
            {currentDriver ? (
              <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 mb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {currentDriver.name} (#{currentDriver.racingNumber})
                    </div>
                    <div className="text-[11px] font-mono text-blue-600 dark:text-[#38BDF8]">
                      {currentDriver.lapBalance} Laps Stored • {currentDriver.tier}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenDriverDashboard?.();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold font-mono"
                  >
                    Cockpit ↗
                  </button>
                </div>

                <div className="pt-2 border-t border-blue-100 dark:border-white/10 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAuth?.();
                    }}
                    className="text-slate-600 dark:text-slate-300 hover:underline"
                  >
                    Switch Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="text-rose-600 dark:text-rose-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 mb-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Driver OS & VIP Pass</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Get +5 Free Laps & ₹200 Voucher
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth?.();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#0052FF] text-white text-xs font-bold font-mono shadow-xs"
                >
                  Log In ↗
                </button>
              </div>
            )}

            {/* Mobile Navigation Links */}
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

            {/* Mobile Bottom Links */}
            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
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
                  <span>Circuit Location (Hoskote, Bengaluru)</span>
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
