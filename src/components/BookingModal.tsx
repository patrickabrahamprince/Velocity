import React, { useState, useEffect } from 'react';
import { X, Check, Video, Zap, Trophy, Shield, CreditCard, ChevronRight, ChevronLeft, Sparkles, User, Phone, Mail } from 'lucide-react';
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
  { id: 'balaclava', name: 'Velocity Pro Balaclava', price: 99, icon: Shield, description: 'Brand new breathable sanitized headwear (yours to keep)' },
  { id: 'telemetry', name: 'FIA Sector Telemetry Sheet', price: 149, icon: Zap, description: 'Corner-by-corner apex speeds & braking delta printout' },
  { id: 'podium', name: 'Podium Champagne & Trophy', price: 499, icon: Trophy, description: 'Podium presentation with champagne celebration' },
];

const timeSlots = [
  { time: '06:00 AM - 10:00 AM', label: 'Dawn Biker & Early Birds', slotsLeft: 6, tag: 'HIGH GRIP' },
  { time: '10:30 AM - 12:00 PM', label: 'Morning Warmup', slotsLeft: 8, tag: 'FAST' },
  { time: '12:30 PM - 03:00 PM', label: 'Afternoon Heatwave', slotsLeft: 12, tag: 'OPEN' },
  { time: '03:30 PM - 05:30 PM', label: 'Golden Hour Sprint', slotsLeft: 4, tag: 'POPULAR' },
  { time: '06:00 PM - 08:00 PM', label: 'Sunset Apex Battle', slotsLeft: 2, tag: 'FILLING FAST' },
  { time: '08:30 PM - 11:00 PM', label: 'Night Floodlight Rush', slotsLeft: 5, tag: 'CYBER NIGHT' },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialKart,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedKart, setSelectedKart] = useState<string>(initialKart || '10 Laps All-Days GP (₹699 + Tax)');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-21');
  const [selectedSlot, setSelectedSlot] = useState<string>(timeSlots[4].time);
  const [driverCount, setDriverCount] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['gopro']);
  const [customerName, setCustomerName] = useState<string>(() => localStorage.getItem('vic_prefill_name') || '');
  const [customerPhone, setCustomerPhone] = useState<string>(() => localStorage.getItem('vic_prefill_phone') || '');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('VELOCITY200');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; text: string } | null>({
    code: 'VELOCITY200',
    discount: 200,
    text: '₹200 Early Bird Voucher',
  });
  const [couponError, setCouponError] = useState<string>('');
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');
  const [repeatRacerCode, setRepeatRacerCode] = useState<string>('');

  useEffect(() => {
    const savedName = localStorage.getItem('vic_prefill_name');
    const savedPhone = localStorage.getItem('vic_prefill_phone');
    if (savedName && !customerName) setCustomerName(savedName);
    if (savedPhone && !customerPhone) setCustomerPhone(savedPhone);
    if (initialKart) setSelectedKart(initialKart);
  }, [isOpen, initialKart]);

  if (!isOpen) return null;

  // Calculate Base Price
  let baseKartPrice = 699;
  if (selectedKart.includes('299')) baseKartPrice = 299;
  else if (selectedKart.includes('399')) baseKartPrice = 399;
  else if (selectedKart.includes('499')) baseKartPrice = 499;
  else if (selectedKart.includes('699')) baseKartPrice = 699;
  else if (selectedKart.includes('899')) baseKartPrice = 899;
  else if (selectedKart.includes('999')) baseKartPrice = 999;
  else if (selectedKart.includes('1,500') || selectedKart.includes('1500')) baseKartPrice = 1500;

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
    } else if (code.startsWith('RACER') || code.startsWith('REPEAT') || code === 'REPEAT200' || code === 'FAMILY200' || code === 'VELOCITY200') {
      setAppliedCoupon({ code, discount: Math.min(200, subTotal - 50), text: '₹200 VIP Voucher' });
    } else if (code === 'VIP20' || code === 'VIPRACER') {
      const disc = Math.round(subTotal * 0.20);
      setAppliedCoupon({ code, discount: disc, text: '20% VIP Driver Discount' });
    } else if (code === 'STUDENT50') {
      const disc = driverCount * 50;
      setAppliedCoupon({ code, discount: disc, text: '₹50/driver Student Discount' });
    } else {
      setCouponError('Invalid coupon code. Try VELOCITY200 or FIRST15.');
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
    if (!customerName || !customerPhone) {
      alert('Please fill in your name and WhatsApp number to receive your ticket & lap pass.');
      return;
    }

    soundFx.playRev(1.8);
    const randomRef = 'VIC-' + Math.floor(100000 + Math.random() * 900000);
    const nextRepeatCode = 'REPEAT' + Math.floor(100 + Math.random() * 900);
    setBookingRef(randomRef);
    setRepeatRacerCode(nextRepeatCode);
    setIsPaid(true);

    // Save Lead to leadStore
    const cleanPhone = customerPhone.replace(/\D/g, '').slice(-10);
    leadStore.saveLead(customerName, cleanPhone, selectedKart, 'Booking Checkout');
    localStorage.setItem('vic_prefill_name', customerName);
    localStorage.setItem('vic_prefill_phone', cleanPhone);

    // Save Booking Lead to LocalStorage
    const existingBookings = JSON.parse(localStorage.getItem('vic_bookings') || '[]');
    existingBookings.push({
      bookingId: randomRef,
      name: customerName,
      phone: customerPhone,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0B0E17]/95 border border-white/15 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden text-white flex flex-col max-h-[92vh] backdrop-blur-2xl">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0E121F] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0052FF] to-[#1d4ed8] flex items-center justify-center font-extrabold text-base text-white shadow-lg shadow-blue-600/30">
              VIC
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white tracking-tight">
                Reserve Track Session
              </h3>
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                <span className="text-[#38BDF8] font-semibold">Step {step} of 4</span>
                <span>•</span>
                <span>Hosakote 1,166m Asphalt</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Step Content (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Select Machine / Package */}
          {step === 1 && !isPaid && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400 uppercase font-semibold tracking-wider flex items-center justify-between">
                <span>Choose Race Pass or Food Combo</span>
                <span className="text-emerald-400 text-[11px]">Instant ₹200 Applied</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: '10 Laps All-Days GP (₹699 + Tax)', desc: 'Valid Every Day • Full 1.1 KM Track', badge: '🔥 POPULAR' },
                  { name: '8 Laps Weekday Thrill (₹499 + Tax)', desc: 'Monday to Friday • 8 Fast Laps', badge: 'WEEKDAY' },
                  { name: '6 Laps + Mojito & Snacks (₹399 + Tax)', desc: '6 Laps + Chilled Mojito + Snacks (Till 6 PM)', badge: 'BEST VALUE' },
                  { name: '5 Laps Student Special (₹299 + Tax)', desc: 'Mon to Fri (9 AM - 6 PM) • Show Student ID', badge: 'STUDENTS' },
                  { name: 'Birthday & Group GP (₹999 + Tax)', desc: '8 Laps + Party Buffet (Min 20 People)', badge: 'GROUPS' },
                  { name: 'Biker Morning Track Pass (₹1,500 + Tax)', desc: '6 AM - 10 AM Track + Warm Breakfast & Coffee', badge: 'BIKERS' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      soundFx.playGearShift();
                      setSelectedKart(item.name);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedKart === item.name
                        ? 'bg-[#0052FF]/15 border-[#0052FF] shadow-md shadow-blue-600/20'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-white">{item.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold">
                        {item.badge}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-sans">{item.desc}</div>
                  </button>
                ))}
              </div>

              {/* Drivers Counter */}
              <div className="bg-white/[0.04] p-4 rounded-2xl border border-white/10 flex items-center justify-between mt-4">
                <div>
                  <div className="font-semibold text-sm text-white">Number of Karts / Drivers</div>
                  <div className="text-xs text-slate-400">Race together in the same group heat</div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      soundFx.playGearShift();
                      setDriverCount(Math.max(1, driverCount - 1));
                    }}
                    className="w-8 h-8 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 cursor-pointer flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-lg text-white w-6 text-center">
                    {driverCount}
                  </span>
                  <button
                    onClick={() => {
                      soundFx.playGearShift();
                      setDriverCount(Math.min(10, driverCount + 1));
                    }}
                    className="w-8 h-8 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 cursor-pointer flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time Slot */}
          {step === 2 && !isPaid && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 font-medium uppercase tracking-wider block mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-3.5 text-white font-mono text-sm focus:outline-none focus:border-[#0052FF] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 font-medium uppercase tracking-wider block mb-2">
                  Choose Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => {
                        soundFx.playGearShift();
                        setSelectedSlot(slot.time);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedSlot === slot.time
                          ? 'bg-[#0052FF]/15 border-[#0052FF] text-white shadow-md'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-white">{slot.time}</span>
                        <span className="text-[9px] font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded-full font-medium">
                          {slot.slotsLeft} slots left
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{slot.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Add-ons */}
          {step === 3 && !isPaid && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
                Optional Upgrades
              </div>

              <div className="space-y-3">
                {availableAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const Icon = addon.icon;
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#0052FF]/10 border-[#0052FF]'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isChecked ? 'bg-[#0052FF] text-white' : 'bg-white/10 text-slate-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white">{addon.name}</div>
                          <div className="text-xs text-slate-400 font-sans">{addon.description}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-bold text-base text-white">+₹{addon.price}</div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ml-auto mt-1 ${
                          isChecked ? 'bg-[#0052FF] border-[#0052FF]' : 'border-white/20'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Driver Information & Checkout */}
          {step === 4 && !isPaid && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
                Driver Contact (For WhatsApp Ticket & Lap Times):
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#0052FF] transition-colors"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Mobile Number (+91) *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#0052FF] transition-colors"
                  />
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#0052FF] transition-colors"
                  />
                </div>
              </div>

              {/* Coupon Code Input */}
              <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase flex items-center justify-between">
                  <span>Discount Coupon</span>
                  <span className="text-[#38BDF8] font-semibold">VELOCITY200 preapplied</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code (e.g. VELOCITY200)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono uppercase text-white focus:outline-none focus:border-[#0052FF]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold rounded-xl cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="text-xs text-emerald-400 font-medium flex items-center justify-between pt-1">
                    <span>✓ Coupon {appliedCoupon.code} applied ({appliedCoupon.text})</span>
                    <span>-₹{appliedCoupon.discount}</span>
                  </div>
                )}
                {couponError && (
                  <div className="text-xs text-rose-400 font-medium pt-1">
                    {couponError}
                  </div>
                )}
              </div>

              {/* Order Summary Box */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>{selectedKart} × {driverCount}</span>
                  <span className="font-semibold text-white">₹{baseKartPrice * driverCount}</span>
                </div>
                {selectedAddons.map((aid) => {
                  const add = availableAddons.find((a) => a.id === aid);
                  return (
                    <div key={aid} className="flex justify-between text-slate-400">
                      <span>+ {add?.name}</span>
                      <span>₹{add?.price}</span>
                    </div>
                  );
                })}
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{appliedCoupon.discount}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-white">
                  <span>Total Amount</span>
                  <span className="font-mono text-xl text-[#38BDF8]">₹{grandTotal}</span>
                </div>
              </div>
            </div>
          )}

          {/* CONFIRMED SCREEN */}
          {isPaid && (
            <div className="text-center py-6 space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <Check className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-2xl text-white">
                  Race Booking Confirmed 🏁
                </h3>
                <p className="text-xs text-slate-400">
                  Your track session slot and RFID transponder are now reserved.
                </p>
              </div>

              {/* Booking Summary Card */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 max-w-md mx-auto text-left space-y-1.5 text-xs font-mono text-slate-300">
                <div className="text-[#38BDF8] font-bold text-sm">BOOKING ID: #{bookingRef}</div>
                <div>DRIVER: {customerName || 'Lead Racer'}</div>
                <div>WHATSAPP: {customerPhone}</div>
                <div>PACKAGE: {selectedKart} (Qty: {driverCount})</div>
                <div>DATE & TIME: {selectedDate} ({selectedSlot})</div>
                <div>CIRCUIT: Velocity International Circuit, Hoskote</div>
                <div className="text-emerald-400 font-semibold pt-2 border-t border-white/10">
                  ✓ Paid: ₹{grandTotal} • WhatsApp Ticket & QR Pass Dispatched
                </div>
              </div>

              {/* Repeat Customer Retention Box */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 max-w-md mx-auto text-left space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400">
                  <span>🎁 VIP REPEAT RACER REWARD</span>
                  <span>+150 PTS</span>
                </div>
                <div className="text-xs text-slate-300">
                  Your personal VIP repeat code <strong className="font-mono text-white bg-black/40 px-2 py-0.5 rounded border border-white/10">{repeatRacerCode}</strong> gives you <strong>₹200 OFF</strong> on your next visit or when shared with friends!
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
                <a
                  href={`https://wa.me/919071718620?text=${encodeURIComponent(`Hi Velocity Circuit! I booked online. Ref: ${bookingRef}, Name: ${customerName}, Phone: ${customerPhone}, Slot: ${selectedDate} ${selectedSlot}, Kart: ${selectedKart}. Please confirm my digital pass & timing transponder!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Open WhatsApp Pass ↗</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Next Buttons */}
        {!isPaid && (
          <div className="p-5 sm:p-6 bg-[#0E121F] border-t border-white/10 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => {
                  soundFx.playGearShift();
                  setStep(step - 1);
                }}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-xs font-mono uppercase text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div className="text-xs font-mono text-slate-400">
                Total: <span className="text-[#38BDF8] font-bold text-xl ml-1">₹{grandTotal}</span>
              </div>
            )}

            {step < 4 ? (
              <button
                onClick={() => {
                  soundFx.playGearShift();
                  setStep(step + 1);
                }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-blue-600/25 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCompletePayment}
                className="px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 font-bold text-xs sm:text-sm uppercase tracking-wider text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-all"
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
