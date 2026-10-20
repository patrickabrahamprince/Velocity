import React, { useState } from 'react';
import { TrafficLightsLoader } from './components/TrafficLightsLoader';
import { SpeedometerHUD } from './components/SpeedometerHUD';
import { FloatingWidgets } from './components/FloatingWidgets';
import { QuickLeadBar } from './components/QuickLeadBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CircuitMapSection } from './components/CircuitMapSection';
import { MachinesSection } from './components/MachinesSection';
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
import { driverStore } from './utils/driverStore';
import type { DriverProfile } from './types/driverOS';

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLeadsOpen, setIsLeadsOpen] = useState(false);
  const [isDriverDashboardOpen, setIsDriverDashboardOpen] = useState(false);
  const [currentDriver, setCurrentDriver] = useState<DriverProfile | null>(() => driverStore.getCurrentDriver());
  const [selectedKart, setSelectedKart] = useState<string>('10 Laps All-Days GP (₹699 + Tax)');
  const [selectedPlan, setSelectedPlan] = useState<string>('');

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
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] selection:bg-[#0052FF] selection:text-white relative w-full overflow-x-hidden flex flex-col font-sans">
      {/* 1. Initial F1 Starting Lights Loader */}
      {isLoading && <TrafficLightsLoader onComplete={() => setIsLoading(false)} />}

      {/* 2. Interactive Telemetry HUD (Bottom Right / Collapsible) */}
      <SpeedometerHUD />

      {/* 3. Loco Bear Signature Floating Call & WhatsApp Concierge (with Lead Capture) */}
      <FloatingWidgets onOpenBooking={() => handleOpenBooking()} />

      {/* 4. Sticky Quick Lead Capture Drawer (Captures Name & Phone upon scroll) */}
      <QuickLeadBar onOpenBooking={() => handleOpenBooking()} />

      {/* 5. Sticky Glassmorphism Header */}
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

      {/* 6. Velocity Circuit Main Content Flow (Loco Bear Color Theme & Lead Capture) */}
      <main className="w-full flex-1 flex flex-col">
        {/* Section 1: Hero with high-converting Name & Phone Number Lead Capture Card */}
        <HeroSection onOpenBooking={(kart) => handleOpenBooking(kart)} />

        {/* Section 2: 1166M Track Map with 19 FIA Turns & Animated Kart */}
        <CircuitMapSection />

        {/* Section 3: Precision Racing Fleet ("Choose Your Ride") */}
        <MachinesSection onSelectMachine={(sessionName) => handleOpenBooking(sessionName)} />

        {/* Section 4: Why Book Online Instead of Walking In? */}
        <WhyBookOnlineSection onOpenBooking={() => handleOpenBooking()} />

        {/* Section 5: Circuit Lifestyle & Apex Rooftop Cafe */}
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

        {/* Section 9: Standard Pricing Matrix & Combos */}
        <PricingSection onSelectPlan={(pName, pPrice) => handleOpenBooking(`${pName} (${pPrice})`, pName)} />

        {/* Section 10: Social Wall & Bangalore Leaderboard */}
        <InstagramWall />

        {/* Section 11: Frequently Asked Questions Accordion */}
        <FaqSection />
      </main>

      {/* 7. Loco Bear Multi-Column Mega Footer */}
      <LocoFooter
        onOpenBooking={() => handleOpenBooking()}
        onOpenLeads={() => setIsLeadsOpen(true)}
      />

      {/* 8. Interactive Modals */}
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

export default App;
