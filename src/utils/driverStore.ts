import type { DriverProfile, LapRecord, CouponItem, BookingRecord, LapPackage } from '../types/driverOS';

const STORAGE_KEY = 'vic_current_driver';
const DRIVERS_DB_KEY = 'vic_all_drivers';

export const availableLapPacks: LapPackage[] = [
  {
    id: 'pack-starter-10',
    title: '10 Laps Warmup Pack',
    laps: 10,
    price: 699,
    originalPrice: 850,
    savings: 151,
    badge: 'FLEXIBLE',
  },
  {
    id: 'pack-racer-20',
    title: '20 Laps Pro Bank',
    laps: 20,
    price: 1299,
    originalPrice: 1600,
    savings: 301,
    badge: 'MOST POPULAR',
    popular: true,
  },
  {
    id: 'pack-apex-50',
    title: '50 Laps Championship Vault',
    laps: 50,
    price: 2999,
    originalPrice: 4250,
    savings: 1251,
    badge: 'MAX SAVINGS (Save ₹1250)',
  },
];

const generateMockLaps = (bestSeconds = 54.412): LapRecord[] => {
  const lapTimes = [
    58.42, 57.19, 56.88, 56.32, 55.94, 55.61, 55.38, 55.10, 54.95, 54.78,
    55.20, 54.88, 54.62, 54.45, bestSeconds, 54.60, 54.75, 54.51, 54.49, 54.42
  ];

  return lapTimes.map((sec, idx) => ({
    id: `lap-${idx + 1}`,
    lapNumber: idx + 1,
    lapSeconds: Number(sec.toFixed(3)),
    lapTime: `00:${sec.toFixed(3)}s`,
    sector1: `${(sec * 0.33).toFixed(2)}s`,
    sector2: `${(sec * 0.35).toFixed(2)}s`,
    sector3: `${(sec * 0.32).toFixed(2)}s`,
    topSpeedKmh: Math.round(84 + Math.random() * 14),
    kartNo: Math.floor(10 + Math.random() * 20),
    trackTemp: '32°C',
    date: '2026-10-08',
    sessionId: `HOSKOTE-GP-${Math.floor(100 + idx)}`,
    isPersonalBest: sec === bestSeconds,
  }));
};

const defaultRacer: DriverProfile = {
  id: 'dr-9071718620',
  phone: '9071718620',
  name: 'Vikram Malhotra',
  dob: '1998-10-14',
  city: 'Bangalore (Indiranagar)',
  tier: 'Club Racer',
  avatar: '/images/hero_racing_kart.jpg',
  racingNumber: '07',
  totalVisits: 6,
  totalLaps: 48,
  bestLapTime: '00:54.412s',
  bestLapSeconds: 54.412,
  globalRank: 14,
  lapBalance: 8,
  pointsBalance: 1250,
  moneyBalance: 350,
  referralCode: 'VIKRAM07',
  referralEarnings: 400,
  createdAt: '2026-08-15',
  laps: generateMockLaps(54.412),
  coupons: [
    {
      id: 'cp-welcome',
      code: 'FIRST15',
      title: '15% First Online Booking Discount',
      description: 'Valid on all kart fleet sessions',
      discountValue: 15,
      discountType: 'percent',
      expiryDate: '2026-12-31',
      status: 'active',
      tag: 'WELCOME BONUS',
    },
    {
      id: 'cp-repeat-1',
      code: 'REPEAT200',
      title: '₹200 Repeat Racer Voucher',
      description: 'Auto-credited from your previous race weekend',
      discountValue: 200,
      discountType: 'fixed',
      expiryDate: '2026-11-30',
      status: 'active',
      tag: 'REPEAT REWARD',
    },
    {
      id: 'cp-bday',
      code: 'BDAYRACE',
      title: 'Birthday Free 5-Lap Sprint Pass',
      description: 'Valid anytime during your birthday month',
      discountValue: 299,
      discountType: 'fixed',
      expiryDate: '2026-10-31',
      status: 'active',
      tag: 'BIRTHDAY GIFT',
    },
    {
      id: 'cp-cafe',
      code: 'APEX10',
      title: '10% Off Apex Rooftop Diner',
      description: 'Show QR code at cafe counter for burgers & shakes',
      discountValue: 10,
      discountType: 'percent',
      expiryDate: '2026-12-31',
      status: 'active',
      tag: 'FOOD & DRINKS',
    },
  ],
  bookings: [
    {
      id: 'VIC-948201',
      packageName: '10 Laps All-Days GP',
      lapsCount: 10,
      date: '2026-10-10',
      timeSlot: '06:00 PM - 08:00 PM',
      amount: 699,
      status: 'confirmed',
      couponUsed: 'FIRST15',
      createdAt: '2026-10-08',
    },
    {
      id: 'VIC-839102',
      packageName: '8 Laps Weekday Thrill',
      lapsCount: 8,
      date: '2026-10-02',
      timeSlot: '04:00 PM - 05:30 PM',
      amount: 499,
      status: 'completed',
      couponUsed: 'NONE',
      createdAt: '2026-10-01',
    },
  ],
};

export const driverStore = {
  // Get currently logged-in driver from LocalStorage
  getCurrentDriver(): DriverProfile | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  // Save / Update Driver
  saveDriver(driver: DriverProfile) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(driver));
    // Also save in all drivers directory
    const all = this.getAllDrivers();
    const idx = all.findIndex((d) => d.phone === driver.phone);
    if (idx >= 0) {
      all[idx] = driver;
    } else {
      all.push(driver);
    }
    localStorage.setItem(DRIVERS_DB_KEY, JSON.stringify(all));
  },

  // Get all registered drivers (for leaderboard / counter staff)
  getAllDrivers(): DriverProfile[] {
    const raw = localStorage.getItem(DRIVERS_DB_KEY);
    if (!raw) {
      const initial = [defaultRacer];
      localStorage.setItem(DRIVERS_DB_KEY, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [defaultRacer];
    }
  },

  // Login with Phone Number
  loginWithPhone(phone: string): { driver: DriverProfile; isNew: boolean } {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const all = this.getAllDrivers();
    const existing = all.find((d) => d.phone === cleanPhone);

    if (existing) {
      this.saveDriver(existing);
      return { driver: existing, isNew: false };
    }

    // Create a new driver with starter perks
    const newDriver: DriverProfile = {
      id: `dr-${cleanPhone}`,
      phone: cleanPhone,
      name: `Racer #${cleanPhone.slice(-4)}`,
      dob: '2000-01-01',
      city: 'Bangalore',
      tier: 'Rookie',
      avatar: '/images/hero_racing_kart.jpg',
      racingNumber: cleanPhone.slice(-2),
      totalVisits: 1,
      totalLaps: 0,
      bestLapTime: '--:--.---',
      bestLapSeconds: 99.999,
      globalRank: 180 + Math.floor(Math.random() * 40),
      lapBalance: 5, // 5 Free Welcome Laps
      pointsBalance: 150, // 150 Welcome Coins
      moneyBalance: 0,
      referralCode: `VIC${cleanPhone.slice(-4)}`,
      referralEarnings: 0,
      createdAt: new Date().toISOString().split('T')[0],
      laps: [],
      coupons: [
        {
          id: 'cp-welcome-15',
          code: 'FIRST15',
          title: '15% First Online Booking Discount',
          description: 'Valid for your first race session',
          discountValue: 15,
          discountType: 'percent',
          expiryDate: '2026-12-31',
          status: 'active',
          tag: 'WELCOME PERK',
        },
        {
          id: 'cp-repeat-200',
          code: `REPEAT${cleanPhone.slice(-3)}`,
          title: '₹200 Repeat Racer Voucher',
          description: 'Use on your second race or share with friends',
          discountValue: 200,
          discountType: 'fixed',
          expiryDate: '2026-12-31',
          status: 'active',
          tag: 'REPEAT VOUCHER',
        },
      ],
      bookings: [],
    };

    this.saveDriver(newDriver);
    return { driver: newDriver, isNew: true };
  },

  // Onboarding profile update
  updateProfile(phone: string, updates: Partial<DriverProfile>): DriverProfile | null {
    const driver = this.getCurrentDriver();
    if (!driver) return null;
    const updated = { ...driver, ...updates };
    this.saveDriver(updated);
    return updated;
  },

  // Buy Lap Pack
  buyLapPackage(packId: string): DriverProfile | null {
    const driver = this.getCurrentDriver();
    if (!driver) return null;
    const pack = availableLapPacks.find((p) => p.id === packId);
    if (!pack) return null;

    const updated: DriverProfile = {
      ...driver,
      lapBalance: driver.lapBalance + pack.laps,
      pointsBalance: driver.pointsBalance + Math.round(pack.price * 0.1),
      bookings: [
        {
          id: `VIC-LAPBANK-${Math.floor(100000 + Math.random() * 900000)}`,
          packageName: `${pack.title} (+${pack.laps} Laps Vault)`,
          lapsCount: pack.laps,
          date: new Date().toISOString().split('T')[0],
          timeSlot: 'Wallet Lap Bank',
          amount: pack.price,
          status: 'confirmed',
          couponUsed: 'NONE',
          createdAt: new Date().toISOString().split('T')[0],
        },
        ...driver.bookings,
      ],
    };

    this.saveDriver(updated);
    return updated;
  },

  // Simulate Track Transponder Lap Recording
  addSimulatedLap(): DriverProfile | null {
    const driver = this.getCurrentDriver();
    if (!driver) return null;

    const randomSec = Number((54.1 + Math.random() * 2.8).toFixed(3));
    const isPB = randomSec < driver.bestLapSeconds;
    const newBestSec = isPB ? randomSec : driver.bestLapSeconds;
    const newBestTime = isPB ? `00:${randomSec}s` : driver.bestLapTime;

    const newLap: LapRecord = {
      id: `lap-${Date.now()}`,
      lapNumber: driver.laps.length + 1,
      lapSeconds: randomSec,
      lapTime: `00:${randomSec}s`,
      sector1: `${(randomSec * 0.33).toFixed(2)}s`,
      sector2: `${(randomSec * 0.35).toFixed(2)}s`,
      sector3: `${(randomSec * 0.32).toFixed(2)}s`,
      topSpeedKmh: Math.round(88 + Math.random() * 12),
      kartNo: Math.floor(1 + Math.random() * 20),
      trackTemp: '34°C',
      date: new Date().toISOString().split('T')[0],
      sessionId: `SESSION-${Math.floor(100 + Math.random() * 900)}`,
      isPersonalBest: isPB,
    };

    const updated: DriverProfile = {
      ...driver,
      totalLaps: driver.totalLaps + 1,
      lapBalance: Math.max(0, driver.lapBalance - 1),
      pointsBalance: driver.pointsBalance + 25,
      bestLapSeconds: newBestSec,
      bestLapTime: newBestTime,
      globalRank: isPB ? Math.max(1, driver.globalRank - 2) : driver.globalRank,
      laps: [newLap, ...driver.laps],
    };

    this.saveDriver(updated);
    return updated;
  },

  // Logout
  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
