import React, { useState } from 'react';
import { MapPin, Navigation, X, ExternalLink, Clock, Phone, Copy, Check, Car, Compass } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

export interface LocationHub {
  id: string;
  name: string;
  distanceKm: number;
  driveTimeMin: number;
  route: string;
}

export const bangaloreHubs: LocationHub[] = [
  {
    id: 'whitefield',
    name: 'Whitefield / ITPL / Kadugodi',
    distanceKm: 18,
    driveTimeMin: 25,
    route: 'Direct via Whitefield-Hoskote Main Road (Toll Free)',
  },
  {
    id: 'indiranagar',
    name: 'Indiranagar / Old Airport Road',
    distanceKm: 26,
    driveTimeMin: 38,
    route: 'Via Old Madras Road onto 6-Lane NH-75 Highway',
  },
  {
    id: 'koramangala',
    name: 'Koramangala / HSR Layout',
    distanceKm: 32,
    driveTimeMin: 45,
    route: 'Via Outer Ring Road & KR Puram Flyover to NH-75',
  },
  {
    id: 'yelahanka',
    name: 'Hebbal / Yelahanka / North BLR',
    distanceKm: 34,
    driveTimeMin: 40,
    route: 'Via Satellite Town Ring Road (STRR / NH-648)',
  },
  {
    id: 'electronic-city',
    name: 'Electronic City / South BLR',
    distanceKm: 42,
    driveTimeMin: 52,
    route: 'Via STRR or Sarjapur-Whitefield-Hoskote link',
  },
  {
    id: 'mg-road',
    name: 'MG Road / Central Bengaluru',
    distanceKm: 29,
    driveTimeMin: 42,
    route: 'Via Ulsoor & Old Madras Road directly onto NH-75',
  },
];

// Preserved for type backward compatibility
export type LocationOption = LocationHub;
export const bangaloreLocations = bangaloreHubs;

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation?: LocationHub;
  onSelectLocation?: (loc: LocationHub) => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedHub, setSelectedHub] = useState<LocationHub>(bangaloreHubs[0]);

  if (!isOpen) return null;

  const venueAddress = '#84/2, Solur Road, Near NH-75 Highway, Hoskote, Bengaluru, Karnataka 562114';
  const plusCode = '3RCQ+GC Hoskote, Karnataka';

  const googleMapsSearchUrl = 'https://www.google.com/maps/search/?api=1&query=Velocity+International+Circuit+Hoskote';
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=Velocity+International+Circuit+Hoskote`;
  const appleMapsUrl = 'https://maps.apple.com/?daddr=13.0718,77.7980&q=Velocity+International+Circuit';

  const handleCopyAddress = () => {
    soundFx.playGearShift();
    navigator.clipboard.writeText(venueAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#090D1A] border-2 border-[#0052FF]/40 rounded-3xl p-5 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-white animate-in fade-in zoom-in duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00D2FF] flex items-center justify-center text-white shadow-lg shadow-blue-600/30 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-extrabold text-base sm:text-lg uppercase text-white tracking-tight">
                  Circuit Location & Map
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                  1 Single Location
                </span>
              </div>
              <div className="text-xs text-slate-400 font-sans">
                Velocity International Circuit • Hoskote, Bengaluru
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playGearShift();
              onClose();
            }}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Highlight Note: 1 Location */}
        <div className="mt-4 p-3 rounded-2xl bg-[#0052FF]/10 border border-[#0052FF]/20 flex items-start sm:items-center gap-3">
          <Compass className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs text-slate-300 leading-snug">
            Velocity is <strong className="text-white">one single premier motorsport destination</strong> located in Hoskote. We do not operate secondary branch tracks.
          </p>
        </div>

        {/* Embedded Interactive Map */}
        <div className="mt-4 rounded-2xl overflow-hidden border border-white/15 bg-[#040711] shadow-inner relative group">
          <iframe
            title="Velocity International Circuit Location Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.780%2C13.058%2C77.815%2C13.085&layer=mapnik&marker=13.0718%2C77.7980"
            className="w-full h-52 sm:h-64 border-0 filter contrast-[1.05]"
            loading="lazy"
          />

          {/* Map Overlay Badge */}
          <div className="absolute top-3 left-3 bg-[#0A0E1F]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-[11px] font-mono text-white shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold">1,166M Track Apex • Solur, Hoskote</span>
          </div>

          {/* Direct Navigation Overlay button */}
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playGearShift()}
            className="absolute bottom-3 right-3 bg-[#0052FF] hover:bg-[#0040D0] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/50 transition-all hover:scale-105"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Start Navigation</span>
          </a>
        </div>

        {/* Venue Information Card */}
        <div className="mt-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#38BDF8]">
                EXACT CIRCUIT ADDRESS
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                {venueAddress}
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Google Plus Code: <span className="text-slate-200">{plusCode}</span>
              </div>
            </div>

            <button
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium transition-all shrink-0 cursor-pointer self-start"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <span><strong>Open Daily:</strong> 6:00 AM – 11:30 PM</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>Helpline:</strong> <a href="tel:+919071718620" className="hover:text-white underline">+91 90717 18620</a></span>
            </div>
          </div>
        </div>

        {/* Driving Distance from Bengaluru Hubs */}
        <div className="mt-4">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
            <span>Estimated Drive Time from Bangalore Hubs</span>
            <span className="text-[10px] text-slate-500 font-normal">Tap to route from hub</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {bangaloreHubs.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              const hubDirectionsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(hub.name + ', Bengaluru')}/Velocity+International+Circuit+Hoskote`;

              return (
                <a
                  key={hub.id}
                  href={hubDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    soundFx.playGearShift();
                    setSelectedHub(hub);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all group block ${
                    isSelected
                      ? 'bg-[#0052FF]/20 border-[#0052FF]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-[#38BDF8] transition-colors truncate">
                      {hub.name.split('/')[0].trim()}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white shrink-0 ml-1" />
                  </div>
                  <div className="flex items-baseline gap-1 mt-1 font-mono">
                    <span className="text-xs font-bold text-[#38BDF8]">~{hub.driveTimeMin}m</span>
                    <span className="text-[10px] text-slate-400">({hub.distanceKm} km)</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-end gap-2.5">
          <a
            href={appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playGearShift()}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>Apple Maps</span>
          </a>

          <a
            href={googleMapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playGearShift()}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>Open Google Maps</span>
          </a>

          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playGearShift()}
            className="px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052FF] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-600/40 transition-all hover:scale-102"
          >
            <Car className="w-4 h-4" />
            <span>Get Driving Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
};
