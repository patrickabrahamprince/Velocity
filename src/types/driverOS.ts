export type DriverTier = 'Rookie' | 'Club Racer' | 'Pro Racer';

export interface LapRecord {
  id: string;
  lapNumber: number;
  lapTime: string; // e.g. "00:54.412"
  lapSeconds: number; // e.g. 54.412
  sector1: string; // "18.24s"
  sector2: string; // "19.12s"
  sector3: string; // "17.05s"
  topSpeedKmh: number; // e.g. 96
  kartNo: number; // e.g. 14
  trackTemp: string; // "32°C"
  date: string; // "2026-10-08"
  sessionId: string;
  isPersonalBest?: boolean;
}

export interface CouponItem {
  id: string;
  code: string;
  title: string;
  description: string;
  discountValue: number;
  discountType: 'fixed' | 'percent';
  expiryDate: string;
  status: 'active' | 'redeemed' | 'expired';
  qrCodeUrl?: string;
  tag: string;
}

export interface BookingRecord {
  id: string;
  packageName: string;
  lapsCount: number;
  date: string;
  timeSlot: string;
  amount: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  couponUsed: string;
  createdAt: string;
}

export interface DriverProfile {
  id: string;
  phone: string;
  name: string;
  dob: string;
  city: string;
  tier: DriverTier;
  avatar: string;
  racingNumber: string;
  totalVisits: number;
  totalLaps: number;
  bestLapTime: string;
  bestLapSeconds: number;
  globalRank: number;
  lapBalance: number;
  pointsBalance: number;
  moneyBalance: number;
  referralCode: string;
  referralEarnings: number;
  createdAt: string;
  laps: LapRecord[];
  coupons: CouponItem[];
  bookings: BookingRecord[];
}

export interface LapPackage {
  id: string;
  title: string;
  laps: number;
  price: number;
  originalPrice: number;
  savings: number;
  badge?: string;
  popular?: boolean;
}
