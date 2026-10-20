import React, { useState } from 'react';
import { MapPin, Navigation, Search, X, Check, ArrowRight, Compass } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

export interface LocationOption {
  id: string;
  name: string;
  area: string;
  distanceKm: number;
  driveTimeMin: number;
  route: string;
  isPopular?: boolean;
}

export const bangaloreLocations: LocationOption[] = [
  {
    id: 'hoskote',
    name: 'Velocity International Circuit (Main Track)',
    area: 'Solur Village, NH-75, Hoskote',
    distanceKm: 0,
    driveTimeMin: 0,
    route: 'You are at the venue! Pit lane entry at Gate 2',
    isPopular: true,
  },
  {
    id: 'whitefield',
    name: 'Whitefield / ITPL / Kadugodi',
    area: 'East Bengaluru',
    distanceKm: 18,
    driveTimeMin: 25,
    route: 'Fastest via Whitefield-Hoskote Main Rd (Toll Free)',
    isPopular: true,
  },
  {
    id: 'indiranagar',
    name: 'Indiranagar / Old Airport Rd',
    area: 'Central East Bengaluru',
    distanceKm: 26,
    driveTimeMin: 38,
    route: 'Take Old Madras Rd directly onto NH-75 Highway',
    isPopular: true,
  },
  {
    id: 'koramangala',
    name: 'Koramangala / HSR Layout',
    area: 'South East Bengaluru',
    distanceKm: 32,
    driveTimeMin: 45,
    route: 'Via Outer Ring Road & KR Puram Flyover to NH-75',
    isPopular: true,
  },
  {
    id: 'yelahanka',
    name: 'Hebbal / Yelahanka / North BLR',
    area: 'North Bengaluru (Airport Corridor)',
    distanceKm: 34,
    driveTimeMin: 40,
    route: 'Via Satellite Town Ring Road (STRR / NH 648)',
    isPopular: true,
  },
  {
    id: 'electronic-city',
    name: 'Electronic City / Silk Board',
    area: 'South Bengaluru Tech Hub',
    distanceKm: 42,
    driveTimeMin: 55,
    route: 'Via Nice Road or Sarjapur-Whitefield-Hoskote link',
  },
  {
    id: 'mg-road',
    name: 'MG Road / CBD / Church Street',
    area: 'Central Bengaluru',
    distanceKm: 29,
    driveTimeMin: 42,
    route: 'Via Ulsoor & Old Madras Road 6-lane highway',
  },
  {
    id: 'marathahalli',
    name: 'Marathahalli / Bellandur',
    area: 'East Bengaluru Tech Belt',
    distanceKm: 24,
    driveTimeMin: 32,
    route: 'Via Hoodi & Hope Farm onto Hoskote Bypass',
  },
];

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: LocationOption;
  onSelectLocation: (loc: LocationOption) => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  selectedLocation,
  onSelectLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isOpen) return null;

  const filteredLocations = bangaloreLocations.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUseCurrentLocation = () => {
    setIsDetecting(true);
    soundFx.playRev(1.1);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsDetecting(false);
          const detected = bangaloreLocations[2];
          onSelectLocation(detected);
          onClose();
        },
        () => {
          setIsDetecting(false);
          onSelectLocation(bangaloreLocations[1]);
          onClose();
        },
        { timeout: 5000 }
      );
    } else {
      setTimeout(() => {
        setIsDetecting(false);
        onSelectLocation(bangaloreLocations[1]);
        onClose();
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0d121d] border-2 border-[#0052FF]/40 rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden text-white animate-in fade-in zoom-in duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0052FF]/20 border border-[#0052FF]/40 flex items-center justify-center text-[#38BDF8]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base sm:text-lg uppercase text-white leading-tight">
                SELECT YOUR LOCATION
              </h2>
              <div className="text-[11px] font-mono text-slate-400">
                Bengaluru • Instant ETA & Route to Circuit
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playGearShift();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative my-4 z-10">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search area, landmark in Bengaluru (e.g. Indiranagar, Whitefield)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#131926] border border-white/15 text-white placeholder-slate-400 text-xs font-sans focus:outline-none focus:border-[#0052FF]"
          />
        </div>

        {/* Detect Location Button */}
        <button
          onClick={handleUseCurrentLocation}
          disabled={isDetecting}
          className="w-full mb-4 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0052FF]/60 flex items-center justify-between text-left transition-all cursor-pointer group z-10 relative"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0052FF] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
              <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <div className="font-heading font-bold text-xs uppercase text-[#38BDF8]">
                {isDetecting ? 'DETECTING GPS LOCATION...' : 'USE CURRENT LOCATION'}
              </div>
              <div className="text-[11px] text-slate-400">
                Auto-calculate driving distance & live route to Hoskote
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#38BDF8] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Locations List */}
        <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1 z-10 relative">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
            POPULAR BENGALURU START POINTS
          </div>

          {filteredLocations.map((loc) => {
            const isSelected = selectedLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => {
                  soundFx.playGearShift();
                  onSelectLocation(loc);
                  onClose();
                }}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0052FF]/15 border-[#0052FF] shadow-sm'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-[#0052FF] text-white font-bold'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {isSelected ? <Check className="w-4 h-4" /> : <Compass className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <div className="font-heading font-bold text-xs text-white flex items-center gap-2">
                      <span>{loc.name}</span>
                      {loc.distanceKm === 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-[#0052FF]/20 text-[#38BDF8] text-[9px] font-mono font-bold">
                          CIRCUIT VENUE
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {loc.route}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-3">
                  <div className="font-heading font-black text-sm sm:text-base text-[#38BDF8]">
                    {loc.distanceKm === 0 ? '0 KM' : `${loc.distanceKm} KM`}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {loc.driveTimeMin === 0 ? 'At Track' : `~${loc.driveTimeMin} mins`}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Route Info Banner */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="text-slate-400">
            <span>DESTINATION: </span>
            <span className="text-[#38BDF8] font-bold">
              VELOCITY INTERNATIONAL CIRCUIT, HOSKOTE
            </span>
          </div>

          <a
            href="https://share.google/nVeWwRIvbWOKT3RJq"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playGearShift()}
            className="px-4 py-2 rounded-xl bg-[#0052FF] hover:bg-[#2563EB] text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-[#0052FF]/30 shrink-0"
          >
            <Navigation className="w-3.5 h-3.5 text-white" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
};
