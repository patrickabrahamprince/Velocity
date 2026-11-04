import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Video,
  Zap,
  Trophy,
  Shield,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  Plus,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundEngine';
import { leadStore } from '../utils/leadStore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialKart?: string;
  initialPlan?: string;
}

interface Addon {
  id: string;
  name: string;
  price: number;
  icon: typeof Video;
  description: string;
}

const availableAddons: Addon[] = [
  { id: 'gopro', name: 'GoPro 4K Helmet Cam Video', price: 199, icon: Video, description: 'Raw 60FPS high-bitrate onboard video sent to WhatsApp' },
  { id: 'balaclava', name: 'Velocity Pro Balaclava', price: 199, icon: Shield, description: 'Brand new breathable sanitized headwear (yours to keep)' },
  { id: 'telemetry', name: 'FIA Sector Telemetry Sheet', price: 149, icon: Zap, description: 'Corner-by-corner apex speeds & braking delta printout' },
  { id: 'podium', name: 'Podium Champagne & Trophy', price: 499, icon: Trophy, description: 'Podium presentation with champagne celebration' },
];

const racePackages = [
  {
    name: '10 Laps Normal Session (₹699 + Tax)',
    price: 699,
    laps: '10 Laps',
    desc: 'Valid Every Day • Full 1,166M Track • Standard Queue',
    badge: '🔥 ALL-DAYS',
    category: 'kart',
  },
  {
    name: '10 Laps Fastrak VIP Session (₹899 + Tax)',
    price: 899,
    laps: '10 Laps',
    desc: 'Zero Waiting • Priority Fastrak Lane & Direct Grid Access',
    badge: '⚡ ZERO WAITING',
    category: 'kart',
  },
  {
    name: '8 Laps Weekday Thrill (₹499 + Tax)',
    price: 499,
    laps: '8 Laps',
    desc: 'Monday to Friday • 8 Full Throttle Laps',
    badge: 'WEEKDAY',
    category: 'kart',
  },
  {
    name: '5 Laps Student Special (₹299 + Tax)',
    price: 299,
    laps: '5 Laps',
    desc: 'Mon to Fri (9 AM - 6 PM) • Show Valid Student ID',
    badge: 'STUDENT',
    category: 'kart',
  },
  {
    name: 'Birthday & Group GP (₹999 + Tax)',
    price: 999,
    laps: '6 Laps + Buffet',
    desc: '6 Laps + Party Buffet (Minimum 20 People)',
    badge: 'GROUPS',
    category: 'kart',
  },
  {
    name: 'Biker 15-Min Track Session (₹500 + Tax)',
    price: 500,
    laps: '15 Minutes',
    desc: '15 Mins • 300cc-1000cc+ Motorcycles on Track',
    badge: 'BIKER 15M',
    category: 'bike',
  },
  {
    name: 'Biker Morning Track Pass (₹1,500 + Tax)',
    price: 1500,
    laps: '4 Hours',
    desc: '6 AM - 10 AM Track + Breakfast & Coffee at Apex Cafe',
    badge: 'BIKER 4H',
    category: 'bike',
  },
];

export interface TimeSlotItem {
  time: string;
  label: string;
  tag: string;
  period: 'morning' | 'afternoon' | 'evening';
}

const timeSlots: TimeSlotItem[] = [
  // Morning (6:00 AM - 12:00 PM)
  { time: '06:00 AM - 07:00 AM', label: 'Dawn High-Grip Run', tag: 'HIGH GRIP', period: 'morning' },
  { time: '07:00 AM - 08:00 AM', label: 'Sunrise Track Session', tag: 'SUNRISE', period: 'morning' },
  { time: '08:00 AM - 09:00 AM', label: 'Morning Warmup Session', tag: 'WARMUP', period: 'morning' },
  { time: '09:00 AM - 10:00 AM', label: 'Track Opens & Grid Staging', tag: 'FAST', period: 'morning' },
  { time: '10:00 AM - 11:00 AM', label: 'Morning Sprint Session', tag: 'HIGH GRIP', period: 'morning' },
  { time: '11:00 AM - 12:00 PM', label: 'Pre-Noon Flying Laps', tag: 'POPULAR', period: 'morning' },

  // Afternoon (12:00 PM - 5:00 PM)
  { time: '12:00 PM - 01:00 PM', label: 'Midday Circuit Sprint', tag: 'FAST', period: 'afternoon' },
  { time: '01:00 PM - 02:00 PM', label: 'Afternoon Heatwave Heat', tag: 'OPEN', period: 'afternoon' },
  { time: '02:00 PM - 03:00 PM', label: 'Post-Lunch Qualifying', tag: 'OPEN', period: 'afternoon' },
  { time: '03:00 PM - 04:00 PM', label: 'Speed Session & Shakedown', tag: 'FAST', period: 'afternoon' },
  { time: '04:00 PM - 05:00 PM', label: 'Golden Hour Throttle', tag: 'POPULAR', period: 'afternoon' },

  // Evening & Night (5:00 PM - 11:30 PM)
  { time: '05:00 PM - 06:00 PM', label: 'Sunset Apex Battle', tag: '🔥 MOST POPULAR', period: 'evening' },
  { time: '06:00 PM - 07:00 PM', label: 'Twilight Track Session', tag: 'POPULAR', period: 'evening' },
  { time: '07:00 PM - 08:00 PM', label: 'Floodlight Prime Time', tag: 'NIGHT GP', period: 'evening' },
  { time: '08:00 PM - 09:00 PM', label: 'Stadium Floodlight Heat', tag: 'NIGHT GP', period: 'evening' },
  { time: '09:00 PM - 10:00 PM', label: 'Night Owl Speed GP', tag: 'NIGHT GP', period: 'evening' },
  { time: '10:00 PM - 11:00 PM', label: 'Late Night Circuit Sprint', tag: 'NIGHT GP', period: 'evening' },
  { time: '11:00 PM - 11:30 PM', label: 'Midnight Apex Dash', tag: 'FINAL HEAT', period: 'evening' },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialKart,
}) => {
  // Steps: 1 = Choose Pass, 2 = Date & Time, 3 = Driver & Confirm
  const [step, setStep] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<'all' | 'kart' | 'bike'>('all');
  const [selectedKart, setSelectedKart] = useState<string>(initialKart || racePackages[0].name);

  // Today's Date formatted YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    try {
      return new Date().toISOString().split('T')[0];
    } catch {
      return '2026-11-04';
    }
  });

  const [selectedSlot, setSelectedSlot] = useState<string>('05:00 PM - 06:00 PM');
  const [slotPeriodFilter, setSlotPeriodFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [driverCount, setDriverCount] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [showAddons, setShowAddons] = useState<boolean>(false);

  // Customer contact info
  const [customerName, setCustomerName] = useState<string>(() => localStorage.getItem('vic_prefill_name') || '');
  const [customerPhone, setCustomerPhone] = useState<string>(() => localStorage.getItem('vic_prefill_phone') || '');
  const [customerEmail, setCustomerEmail] = useState<string>('');

  // Voucher
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; text: string } | null>(null);
  const [couponError, setCouponError] = useState<string>('');

  // Payment Confirmation
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  const [repeatRacerCode, setRepeatRacerCode] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(true);
  const [showFullTerms, setShowFullTerms] = useState<boolean>(false);

  useEffect(() => {
    const savedName = localStorage.getItem('vic_prefill_name');
    const savedPhone = localStorage.getItem('vic_prefill_phone');
    if (savedName && !customerName) setCustomerName(savedName);
    if (savedPhone && !customerPhone) setCustomerPhone(savedPhone);
    if (initialKart) setSelectedKart(initialKart);
  }, [isOpen, initialKart]);

  if (!isOpen) return null;

  // Calculate Base Price
  const currentPackage = racePackages.find((p) => p.name === selectedKart) || racePackages[0];
  const baseKartPrice = currentPackage.price;

  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const found = availableAddons.find((a) => a.id === addonId);
    return acc + (found ? found.price : 0);
  }, 0);

  const subTotal = (baseKartPrice * driverCount) + addonsTotal;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, subTotal - discountAmount);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    setCouponError('');
    if (!code) return;

    soundFx.playGearShift();
    if (code === 'FIRST15' || code === 'FAST15') {
      const disc = Math.round(subTotal * 0.15);
      setAppliedCoupon({ code, discount: disc, text: '15% First Booking Discount' });
    } else if (code === 'VIP20' || code === 'VIPRACER') {
      const disc = Math.round(subTotal * 0.20);
      setAppliedCoupon({ code, discount: disc, text: '20% VIP Driver Discount' });
    } else if (code === 'STUDENT50') {
      const disc = driverCount * 50;
      setAppliedCoupon({ code, discount: disc, text: '₹50/driver Student Discount' });
    } else {
      setCouponError('Invalid coupon code. Try FIRST15 or VIP20.');
    }
  };

  const toggleAddon = (id: string) => {
    soundFx.playGearShift();
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleCompletePayment = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please fill in your name and WhatsApp number to receive your ticket & lap pass.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!agreedToTerms) {
      alert('Please agree to the Safety Rules & Indemnity Declaration to proceed.');
      return;
    }

    soundFx.playRev(1.8);
    const randomRef = 'VIC-' + Math.floor(100000 + Math.random() * 900000);
    const nextRepeatCode = 'REPEAT' + Math.floor(100 + Math.random() * 900);
    setBookingRef(randomRef);
    setRepeatRacerCode(nextRepeatCode);
    setIsPaid(true);

    // Save Lead to leadStore
    leadStore.saveLead(customerName, cleanPhone, selectedKart, 'Booking Checkout');
    localStorage.setItem('vic_prefill_name', customerName);
    localStorage.setItem('vic_prefill_phone', cleanPhone);

    // Save Booking Lead to LocalStorage
    const existingBookings = JSON.parse(localStorage.getItem('vic_bookings') || '[]');
    existingBookings.push({
      bookingId: randomRef,
      name: customerName,
      phone: cleanPhone,
      email: customerEmail,
      package: selectedKart,
      driverCount,
      date: selectedDate,
      timeSlot: selectedSlot,
      addons: selectedAddons,
      totalAmount: grandTotal,
      couponUsed: appliedCoupon?.code || 'NONE',
      nextRepeatCode,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('vic_bookings', JSON.stringify(existingBookings));

    confetti({
      particleCount: 140,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#0052FF', '#2563EB', '#38BDF8', '#ffffff'],
    });
  };

  const filteredPackages = racePackages.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      {/* PURE CLEAN WHITE MODAL CONTAINER */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-[28px] shadow-[0_25px_70px_rgba(15,23,42,0.25)] overflow-hidden text-slate-900 flex flex-col max-h-[92vh]">
        
        {/* Header: Clean White with Simple Progress Bar */}
        <div className="p-5 sm:p-6 bg-white border-b border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0052FF] flex items-center justify-center font-extrabold text-sm text-white shadow-md shadow-blue-500/25">
                VIC
              </div>
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-950 tracking-tight">
                  Reserve Track Session
                </h3>
                <div className="text-xs font-mono text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <span className="text-[#0052FF] font-bold">Step {step} of 3</span>
                  <span>•</span>
                  <span>Karnataka&apos;s Biggest Circuit (1,166m)</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Clean 3-Step Visual Progress Bar */}
          {!isPaid && (
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="space-y-1">
                <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-[#0052FF]' : 'bg-slate-200'}`} />
                <span className={`text-[10px] font-mono uppercase tracking-wider block font-semibold ${step === 1 ? 'text-[#0052FF]' : 'text-slate-400'}`}>
                  1. Choose Pass
                </span>
              </div>
              <div className="space-y-1">
                <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-[#0052FF]' : 'bg-slate-200'}`} />
                <span className={`text-[10px] font-mono uppercase tracking-wider block font-semibold ${step === 2 ? 'text-[#0052FF]' : 'text-slate-400'}`}>
                  2. Date & Time
                </span>
              </div>
              <div className="space-y-1">
                <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-[#0052FF]' : 'bg-slate-200'}`} />
                <span className={`text-[10px] font-mono uppercase tracking-wider block font-semibold ${step === 3 ? 'text-[#0052FF]' : 'text-slate-400'}`}>
                  3. Checkout
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-white">
          
          {/* ================================================================ */}
          {/* STEP 1: CHOOSE RACE PASS & DRIVER COUNT                          */}
          {/* ================================================================ */}
          {step === 1 && !isPaid && (
            <div className="space-y-5">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-medium">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeCategory === 'all'
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Passes ({racePackages.length})
                  </button>
                  <button
                    onClick={() => setActiveCategory('kart')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeCategory === 'kart'
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🏎️ Karting
                  </button>
                  <button
                    onClick={() => setActiveCategory('bike')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activeCategory === 'bike'
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🏍️ Superbikes
                  </button>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Official Circuit Rates</span>
                </div>
              </div>

              {/* Package Cards List */}
              <div className="space-y-2.5">
                {filteredPackages.map((item) => {
                  const isSelected = selectedKart === item.name;

                  return (
                    <div
                      key={item.name}
                      onClick={() => {
                        soundFx.playGearShift();
                        setSelectedKart(item.name);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-blue-50/60 border-[#0052FF] ring-2 ring-[#0052FF]/20 shadow-sm'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isSelected
                              ? 'bg-[#0052FF] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {item.badge}
                          </span>
                          <span className="font-bold text-sm text-slate-950 truncate">
                            {item.name.replace(/ \(₹\d+.*?\)/, '')}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-sans truncate">
                          {item.desc}
                        </div>
                      </div>

                      <div className="text-right shrink-0 flex items-center gap-3">
                        <div>
                          <div className="font-mono font-extrabold text-base text-slate-950">
                            ₹{item.price}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 uppercase">
                            +18% Tax
                          </div>
                        </div>

                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-[#0052FF] border-[#0052FF] text-white'
                            : 'border-slate-300 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Number of Drivers Counter */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-950">
                    Number of Drivers / Karts
                  </div>
                  <div className="text-xs text-slate-500 font-sans mt-0.5">
                    Race together on the same starting grid
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                  <button
                    onClick={() => {
                      soundFx.playGearShift();
                      setDriverCount(Math.max(1, driverCount - 1));
                    }}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold flex items-center justify-center transition-colors cursor-pointer text-base"
                    aria-label="Decrease drivers"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-base text-slate-900 w-8 text-center">
                    {driverCount}
                  </span>
                  <button
                    onClick={() => {
                      soundFx.playGearShift();
                      setDriverCount(Math.min(10, driverCount + 1));
                    }}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold flex items-center justify-center transition-colors cursor-pointer text-base"
                    aria-label="Increase drivers"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Optional Upgrades (Clean Expandable Accordion) */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setShowAddons(!showAddons)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900">
                      Optional Upgrades (GoPro 4K, Pro Balaclava, Telemetry)
                    </span>
                    {selectedAddons.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-mono text-[10px] font-bold">
                        {selectedAddons.length} added (+₹{addonsTotal})
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-600">
                    {showAddons ? 'Hide ▲' : 'Customize +'}
                  </span>
                </button>

                {showAddons && (
                  <div className="p-4 pt-0 border-t border-slate-100 space-y-2 mt-2">
                    {availableAddons.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      const Icon = addon.icon;

                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-blue-50/70 border-blue-500'
                              : 'bg-white hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isChecked ? 'bg-[#0052FF] text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-semibold text-xs text-slate-900">{addon.name}</div>
                              <div className="text-[11px] text-slate-500">{addon.description}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-900">
                            <span>+₹{addon.price}</span>
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                              isChecked ? 'bg-[#0052FF] border-[#0052FF] text-white' : 'border-slate-300'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 2: DATE & TIME SLOT SELECTION (HOUR TO HOUR)                */}
          {/* ================================================================ */}
          {step === 2 && !isPaid && (
            <div className="space-y-5">
              {/* Date Picker */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-600 font-bold uppercase tracking-wider flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Choose Race Date</span>
                  </div>
                  <span className="text-[11px] font-sans font-medium text-slate-400">
                    Open 7 Days a Week
                  </span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-mono text-sm focus:outline-none focus:border-[#0052FF] focus:bg-white transition-colors cursor-pointer"
                />
              </div>

              {/* Hour-to-Hour Time Slots with Period Filter */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-mono text-slate-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Select 1-Hour Arrival Slot</span>
                  </label>

                  {/* Period Filter Pills */}
                  <div className="flex gap-1 p-1 bg-slate-100 rounded-xl text-[11px] font-medium">
                    <button
                      type="button"
                      onClick={() => setSlotPeriodFilter('all')}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        slotPeriodFilter === 'all'
                          ? 'bg-white text-slate-950 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      All (18)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSlotPeriodFilter('morning')}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        slotPeriodFilter === 'morning'
                          ? 'bg-white text-slate-950 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Morning
                    </button>
                    <button
                      type="button"
                      onClick={() => setSlotPeriodFilter('afternoon')}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        slotPeriodFilter === 'afternoon'
                          ? 'bg-white text-slate-950 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Afternoon
                    </button>
                    <button
                      type="button"
                      onClick={() => setSlotPeriodFilter('evening')}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                        slotPeriodFilter === 'evening'
                          ? 'bg-white text-slate-950 font-bold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Night GP
                    </button>
                  </div>
                </div>

                {/* 1-Hour Slots Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {timeSlots
                    .filter((slot) => slotPeriodFilter === 'all' || slot.period === slotPeriodFilter)
                    .map((slot) => {
                      const isSelected = selectedSlot === slot.time;

                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => {
                            soundFx.playGearShift();
                            setSelectedSlot(slot.time);
                          }}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-blue-50/70 border-[#0052FF] ring-2 ring-[#0052FF]/20 shadow-sm'
                              : 'bg-white hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-xs font-extrabold text-slate-950">
                              {slot.time}
                            </span>
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              isSelected
                                ? 'bg-[#0052FF] text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {slot.tag}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-sans flex items-center justify-between">
                            <span>{slot.label}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-[#0052FF] stroke-[3]" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Track Hours Notice */}
              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center gap-2.5 text-xs text-blue-800">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Track is open daily 6:00 AM – 11:30 PM with stadium floodlights for night sessions.</span>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 3: DRIVER DETAILS & CHECKOUT                                */}
          {/* ================================================================ */}
          {step === 3 && !isPaid && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-600 font-bold uppercase tracking-wider">
                Driver Contact (For WhatsApp Ticket & Lap Times)
              </div>

              {/* Contact Inputs */}
              <div className="space-y-3">
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#0052FF] focus:bg-white transition-colors"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-500 border-r border-slate-200 pr-2">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Mobile Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-14 pr-4 py-3 text-slate-900 font-mono text-sm focus:outline-none focus:border-[#0052FF] focus:bg-white transition-colors"
                  />
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#0052FF] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Coupon Code Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold flex items-center justify-between">
                  <span>Discount Coupon</span>
                  {appliedCoupon && <span className="text-emerald-700 font-bold">{appliedCoupon.code} Applied</span>}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono uppercase text-slate-900 focus:outline-none focus:border-[#0052FF]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-mono font-bold rounded-xl cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="text-xs text-emerald-700 font-medium flex items-center justify-between pt-0.5">
                    <span>✓ {appliedCoupon.code} applied ({appliedCoupon.text})</span>
                    <span className="font-bold font-mono">-₹{appliedCoupon.discount}</span>
                  </div>
                )}
                {couponError && (
                  <div className="text-xs text-rose-600 font-medium pt-0.5">
                    {couponError}
                  </div>
                )}
              </div>

              {/* Transparent Order Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>{currentPackage.name.replace(/ \(₹\d+.*?\)/, '')} × {driverCount}</span>
                  <span className="font-bold text-slate-900">₹{baseKartPrice * driverCount}</span>
                </div>
                {selectedAddons.map((aid) => {
                  const add = availableAddons.find((a) => a.id === aid);
                  return (
                    <div key={aid} className="flex justify-between text-slate-500">
                      <span>+ {add?.name}</span>
                      <span>₹{add?.price}</span>
                    </div>
                  );
                })}
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Online Voucher ({appliedCoupon.code})</span>
                    <span>-₹{appliedCoupon.discount}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-slate-950 uppercase">Total Amount</span>
                  <span className="font-mono text-2xl font-extrabold text-[#0052FF]">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              {/* Simple Terms & Indemnity Agreement */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0052FF] focus:ring-0 cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    I agree to the <strong className="text-slate-900">Velocity International Circuit</strong> Safety Rules & Indemnity Declaration.
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowFullTerms(!showFullTerms)}
                  className="text-[11px] font-mono text-[#0052FF] hover:underline block cursor-pointer"
                >
                  {showFullTerms ? 'Hide Waiver Terms ▲' : 'Read Full Safety & Waiver Declaration ▼'}
                </button>

                {showFullTerms && (
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600 space-y-1.5 font-sans max-h-36 overflow-y-auto leading-relaxed">
                    <p className="font-bold text-slate-800">SAWOL BANGALORE LLP • VELOCITY INTERNATIONAL CIRCUIT INDEMNITY:</p>
                    <p>• Participant acknowledges go-karting involves inherent motorsport risks and assumes responsibility.</p>
                    <p>• Participant agrees to follow marshal instructions, safety flag rules, and circuit directives at all times.</p>
                    <p>• Helmets, balaclavas, and closed shoes are mandatory on track.</p>
                  </div>
                )}
              </div>

              {/* Simple Cancellation Policy Note */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-800 space-y-1">
                <span className="font-bold font-mono uppercase">⏱️ Cancellation Policy:</span>
                <div>100% full refund if informed 8+ hours prior. In case of rain, pass is freely rescheduled to any future session.</div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* CONFIRMED SCREEN                                                 */}
          {/* ================================================================ */}
          {isPaid && (
            <div className="text-center py-6 space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-2xl text-slate-950">
                  Race Booking Confirmed 🏁
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  Your track session slot and RFID transponder are now reserved.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-2 text-xs font-mono text-slate-700">
                <div className="text-[#0052FF] font-extrabold text-sm">BOOKING ID: #{bookingRef}</div>
                <div>DRIVER: {customerName || 'Lead Racer'}</div>
                <div>WHATSAPP: {customerPhone}</div>
                <div>PACKAGE: {selectedKart.replace('270cc', '200cc')} (Qty: {driverCount})</div>
                <div>DATE & TIME: {selectedDate} ({selectedSlot})</div>
                <div>CIRCUIT: Velocity International Circuit, Hoskote</div>
                <div className="text-emerald-700 font-bold pt-2 border-t border-slate-200">
                  ✓ Paid: ₹{grandTotal} • WhatsApp Ticket & QR Pass Dispatched
                </div>
              </div>

              {/* Telemetry & Driver Club Confirmation */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 max-w-md mx-auto text-left space-y-1">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-800">
                  <span>🏁 DRIVER PROFILE ACTIVE</span>
                  <span>+150 PTS</span>
                </div>
                <div className="text-xs text-slate-600">
                  Official RFID transponder lap times, sector splits, and Bengaluru leaderboard ranking will be sent directly to your WhatsApp after your session!
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
                <a
                  href={`https://wa.me/919071718620?text=${encodeURIComponent(`Hi Velocity Circuit! I booked online. Ref: ${bookingRef}, Name: ${customerName}, Phone: ${customerPhone}, Slot: ${selectedDate} ${selectedSlot}, Kart: ${selectedKart}. Please confirm my digital pass & timing transponder!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Open WhatsApp Pass ↗</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Navigation Buttons */}
        {!isPaid && (
          <div className="p-5 sm:p-6 bg-white border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => {
                  soundFx.playGearShift();
                  setStep(step - 1);
                }}
                className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-mono uppercase text-slate-700 flex items-center gap-1 cursor-pointer transition-colors font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div className="text-xs font-mono text-slate-500">
                Total: <span className="text-[#0052FF] font-extrabold text-xl ml-1 font-mono">₹{grandTotal}</span>
                {appliedCoupon && (
                  <span className="text-[10px] text-emerald-600 font-bold block sm:inline sm:ml-2">(-₹{appliedCoupon.discount} Applied)</span>
                )}
              </div>
            )}

            {step < 3 ? (
              <button
                onClick={() => {
                  soundFx.playGearShift();
                  setStep(step + 1);
                }}
                className="px-6 py-3 rounded-full bg-[#0052FF] hover:bg-[#0040D0] font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-blue-600/25 flex items-center gap-1.5 cursor-pointer transition-all active:scale-98"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCompletePayment}
                className="px-6 sm:px-8 py-3 rounded-full bg-[#0052FF] hover:bg-[#0040D0] font-bold text-xs sm:text-sm uppercase tracking-wider text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <CreditCard className="w-4 h-4 text-white" />
                <span>Confirm & Pay ₹{grandTotal}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
