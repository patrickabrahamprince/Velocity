import React, { useState } from 'react';
import { MapPin, ChevronDown, Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import { LocationPickerModal, bangaloreLocations, type LocationOption } from './LocationPickerModal';
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
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationOption>(currentLocation);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectLocation = (loc: LocationOption) => {
    setUserLocation(loc);
    if (onLocationChange) onLocationChange(loc);
  };

  const navItems = [
    { label: 'Fleet', href: '#machines' },
    { label: '1,166M Track', href: '#circuit' },
    { label: 'Why Online', href: '#why-book' },
    { label: 'VIP Club', href: '#club' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Rooftop Cafe', href: '#lifestyle' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleScrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Island Glass Capsule Navbar */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto rounded-full bg-white/90 backdrop-blur-2xl border border-slate-200/80 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.07)] pointer-events-auto">
          {/* Brand Logo with F1 Racing Silhouette (from User Reference Image) */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              {/* F1 Car Silhouette & Speed Streak SVG */}
              <div className="flex items-center gap-1.5 text-[#0052FF]">
                <svg className="h-4 w-auto fill-current" viewBox="0 0 160 30">
                  {/* Speed streak lines */}
                  <line x1="10" y1="15" x2="60" y2="15" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="6 4" />
                  <line x1="30" y1="21" x2="70" y2="21" stroke="#0052FF" strokeWidth="2" />
                  {/* F1 Car profile silhouette */}
                  <path d="M75,20 L88,14 L102,14 L114,9 L126,9 L132,14 L148,16 L154,20 L152,22 L140,22 C139,18 135,16 132,16 C129,16 125,18 124,22 L98,22 C97,18 93,16 90,16 C87,16 83,18 82,22 L75,22 Z" fill="#0052FF" />
                  {/* Front wing & rear wing */}
                  <rect x="146" y="14" width="8" height="3" fill="#38BDF8" rx="1" />
                  <rect x="74" y="10" width="6" height="10" fill="#38BDF8" rx="1" />
                  {/* Wheels */}
                  <circle cx="89" cy="22" r="5" fill="#0F172A" />
                  <circle cx="89" cy="22" r="2.5" fill="#E2E8F0" />
                  <circle cx="131" cy="22" r="5" fill="#0F172A" />
                  <circle cx="131" cy="22" r="2.5" fill="#E2E8F0" />
                </svg>
              </div>

              {/* Logotype text */}
              <div className="flex flex-col -mt-0.5">
                <span className="font-extrabold italic text-base sm:text-lg tracking-tight text-[#0052FF] leading-none group-hover:text-[#2563EB] transition-colors">
                  VELOCITY
                </span>
                <span className="text-[8px] font-mono tracking-[0.28em] text-slate-500 uppercase leading-tight mt-0.5">
                  INTERNATIONAL CIRCUIT
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-semibold text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleScrollTo(item.href)}
                className="px-3.5 py-1.5 rounded-full hover:text-[#0052FF] hover:bg-slate-100 transition-all cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Island */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Location Pill */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs font-medium text-slate-700 transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0052FF]" />
              <span className="font-medium text-slate-800">{userLocation.name.split('/')[0].split('(')[0].trim()}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {/* Direct Race Hotline */}
            <a
              href="tel:+919071718620"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-xs font-medium text-slate-700 hover:text-slate-900 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-mono text-[11px] text-slate-800">+91 90717 18620</span>
            </a>

            {/* Driver Profile or Auth */}
            {currentDriver ? (
              <button
                onClick={onOpenDriverDashboard}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs text-[#0052FF] cursor-pointer font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold">{currentDriver.name.split(' ')[0]}</span>
              </button>
            ) : null}

            {/* Book Pass CTA in Electric Blue */}
            <button
              onClick={onOpenBooking}
              className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:from-[#0042D9] hover:to-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,82,255,0.4)] flex items-center gap-2 cursor-pointer group"
            >
              <span>Book Pass</span>
              <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 max-w-md mx-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-5 shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Promo Banner inside mobile */}
            <div className="p-3 rounded-2xl bg-[#0052FF]/10 border border-[#0052FF]/20 text-slate-900 text-xs mb-4 flex items-center justify-between">
              <span className="font-bold">Code VELOCITY200 for ₹200 OFF</span>
              <button onClick={() => { setIsMobileMenuOpen(false); onOpenBooking(); }} className="underline font-bold text-[#0052FF]">
                Book ↗
              </button>
            </div>

            <div className="flex flex-col gap-1 text-sm font-semibold text-slate-700 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleScrollTo(item.href)}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 hover:text-[#0052FF] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsLocationModalOpen(true); }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0052FF]" />
                  <span>Start: {userLocation.name.split('/')[0]}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <a
                href="tel:+919071718620"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
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
