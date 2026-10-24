import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutOfferSection } from './components/AboutOfferSection';
import { WhyBookOnlineSection } from './components/WhyBookOnlineSection';
import { LifestyleBentoSection } from './components/LifestyleBentoSection';
import { FamilyDestinationSection } from './components/FamilyDestinationSection';
import { DriverCockpitSection } from './components/DriverCockpitSection';
import { RepeatRacerRewards } from './components/RepeatRacerRewards';
import { PricingSection } from './components/PricingSection';
import { InstagramWall } from './components/InstagramWall';
import { FaqSection } from './components/FaqSection';
import { LocoFooter } from './components/LocoFooter';
import { BookingModal } from './components/BookingModal';
import { CapturedLeadsModal } from './components/CapturedLeadsModal';
import { AuthModal } from './components/driver-os/AuthModal';
import { DriverDashboardModal } from './components/driver-os/DriverDashboardModal';
import { SarvamVoiceAgent } from './components/SarvamVoiceAgent';
import { CursorGlow } from './components/CursorGlow';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { driverStore } from './utils/driverStore';
import { smoothScroll } from './utils/smoothScroll';
import type { DriverProfile } from './types/driverOS';

function AppContent() {
  const { isDark } = useTheme();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLeadsOpen, setIsLeadsOpen] = useState(false);
  const [isDriverDashboardOpen, setIsDriverDashboardOpen] = useState(false);
  const [currentDriver, setCurrentDriver] = useState<DriverProfile | null>(() => driverStore.getCurrentDriver());
  const [selectedKart, setSelectedKart] = useState<string>('10 Laps All-Days GP (₹699 + Tax)');
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  // Start smooth scrolling engine and clear any stale URL hash on mount
  useEffect(() => {
    const cleanupScroll = smoothScroll.init();
    if (typeof window !== 'undefined' && window.location.hash) {
      try {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch {
        // Ignore
      }
    }
    return () => {
      if (cleanupScroll) cleanupScroll();
    };
  }, []);

  const handleOpenBooking = (kartName?: string, planName?: string) => {
    if (kartName) setSelectedKart(kartName);
    if (planName) setSelectedPlan(planName);
    setIsBookingOpen(true);
  };

  const handleLoginSuccess = (driver: DriverProfile) => {
    setCurrentDriver(driver);
    setIsDriverDashboardOpen(true);
  };

  const handleLogout = () => {
    driverStore.logout();
    setCurrentDriver(null);
  };

  return (
    <div
      className={`min-h-screen relative w-full overflow-x-hidden flex flex-col font-sans transition-colors duration-300 ${
        isDark
          ? 'bg-[#050814] text-[#F8FAFC] selection:bg-[#0052FF] selection:text-white'
          : 'bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0066FF] selection:text-white'
      }`}
    >
      {/* 0. Interactive Mouse Cursor Glow & Magnetic Hover Ring */}
      <CursorGlow isDark={isDark} />

      {/* 1. Sticky Glassmorphism Header with Theme Switcher */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        currentDriver={currentDriver}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenDriverDashboard={() => {
          if (currentDriver) {
            setIsDriverDashboardOpen(true);
          } else {
            setIsAuthOpen(true);
          }
        }}
      />

      {/* 2. Main Content Flow */}
      <main className="w-full flex-1 flex flex-col">
        {/* Section 1: Hero with high-converting Name & Phone Number Lead Capture Card */}
        <HeroSection onOpenBooking={(kart) => handleOpenBooking(kart)} />

        {/* Section 2: About Us & What We Really Offer (6 Bento Offerings) */}
        <AboutOfferSection onOpenBooking={(pkg) => handleOpenBooking(pkg)} />

        {/* Section 3: Why Book Online Instead of Walking In? */}
        <WhyBookOnlineSection onOpenBooking={() => handleOpenBooking()} />

        {/* Section 4: Standard Race Packages & Combos */}
        <PricingSection onSelectPlan={(pName, pPrice) => handleOpenBooking(`${pName} (${pPrice})`, pName)} />

        {/* Section 5: More Than Racing — Circuit Lifestyle & Apex Rooftop Cafe */}
        <LifestyleBentoSection />

        {/* Section 6: Family & Friends Destination */}
        <FamilyDestinationSection onOpenBooking={(pkg) => handleOpenBooking(pkg)} />

        {/* Section 7: Driver OS Telemetry & Inline Phone + Name Login */}
        <DriverCockpitSection
          currentDriver={currentDriver}
          onDriverLogin={(d) => setCurrentDriver(d)}
          onOpenDriverDashboard={() => setIsDriverDashboardOpen(true)}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Section 8: Repeat Racer VIP Club (Name & WhatsApp Lead Capture for ₹200 Voucher) */}
        <RepeatRacerRewards
          onOpenBooking={() => handleOpenBooking()}
          onOpenDriverDashboard={() => setIsDriverDashboardOpen(true)}
          onDriverLogin={(d) => setCurrentDriver(d)}
        />

        {/* Section 9: Social Wall & Bangalore Leaderboard */}
        <InstagramWall />

        {/* Section 10: Frequently Asked Questions Accordion */}
        <FaqSection />
      </main>

      {/* 3. Loco Bear Multi-Column Mega Footer */}
      <LocoFooter
        onOpenBooking={() => handleOpenBooking()}
        onOpenLeads={() => setIsLeadsOpen(true)}
      />

      {/* 4. Official Sarvam AI Voice Agent docked at bottom right */}
      <SarvamVoiceAgent onOpenBooking={() => handleOpenBooking()} />

      {/* 5. Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialKart={selectedKart}
        initialPlan={selectedPlan}
      />

      <CapturedLeadsModal
        isOpen={isLeadsOpen}
        onClose={() => setIsLeadsOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {currentDriver && (
        <DriverDashboardModal
          isOpen={isDriverDashboardOpen}
          onClose={() => setIsDriverDashboardOpen(false)}
          driver={currentDriver}
          onUpdateDriver={(updated) => setCurrentDriver(updated)}
          onOpenBooking={() => handleOpenBooking()}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
