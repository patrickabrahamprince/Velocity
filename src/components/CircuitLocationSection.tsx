import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, Copy, Check, Car, ExternalLink, Compass } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

export const CircuitLocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const venueAddress = '#84/2, Solur Road, Near NH-75 Highway, Hoskote, Bengaluru, Karnataka 562114';
  const plusCode = '3RCQ+GC Hoskote, Karnataka';

  const googleMapsSearchUrl = 'https://www.google.com/maps/search/?api=1&query=Velocity+International+Circuit+Hoskote';
  const googleMapsDirectionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=Velocity+International+Circuit+Hoskote';
  const appleMapsUrl = 'https://maps.apple.com/?daddr=13.0718,77.7980&q=Velocity+International+Circuit';

  const handleCopyAddress = () => {
    soundFx.playGearShift();
    navigator.clipboard.writeText(venueAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const travelHubs = [
    { name: 'Whitefield / ITPL', time: '25 mins', distance: '18 km', route: 'Via Whitefield-Hoskote Main Rd' },
    { name: 'Indiranagar / East BLR', time: '38 mins', distance: '26 km', route: 'Via Old Madras Rd onto NH-75' },
    { name: 'Koramangala / HSR', time: '45 mins', distance: '32 km', route: 'Via ORR & KR Puram Flyover' },
    { name: 'Hebbal / North BLR', time: '40 mins', distance: '34 km', route: 'Via STRR Highway (NH-648)' },
  ];

  return (
    <section id="location" className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Container */}
      <div className="rounded-[32px] sm:rounded-[40px] bg-white dark:bg-[#080C1B] border border-slate-200/80 dark:border-white/10 p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-[#0052FF]/15 border border-blue-200 dark:border-[#0052FF]/30 text-blue-700 dark:text-[#38BDF8] text-xs font-mono font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>1 Single Exclusive Location • Hoskote, Bengaluru</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
            How to Reach <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00D2FF]">Velocity Circuit</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
            Velocity International Circuit operates exclusively at our championship outdoor circuit in Hoskote. Located directly off the 6-lane NH-75 corridor, just 25 minutes from Whitefield with ample on-site secure parking.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Venue Details, Timings & Bengaluru Commute Hubs */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Address Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-[#38BDF8]">
                    EXACT TRACK ADDRESS
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {venueAddress}
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Google Plus Code: <span className="font-semibold text-slate-700 dark:text-slate-200">{plusCode}</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/20 border border-slate-200 dark:border-white/15 text-xs text-slate-700 dark:text-white font-medium transition-all shadow-xs cursor-pointer shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-300" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Hours & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-white/10 text-xs">
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-[#38BDF8] shrink-0" />
                  <div>
                    <span className="font-bold block">Open Daily (7 Days)</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">6:00 AM – 11:30 PM</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold block">Race Control Desk</span>
                    <a href="tel:+919071718620" className="text-slate-500 dark:text-slate-400 text-[11px] hover:underline">
                      +91 90717 18620
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Times from Bengaluru Hubs */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                <span>Drive Times to Circuit</span>
                <span className="text-[10px] text-blue-600 dark:text-[#38BDF8] font-normal">Tap for Google Maps route</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {travelHubs.map((hub) => {
                  const hubDirectionsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(hub.name + ', Bengaluru')}/Velocity+International+Circuit+Hoskote`;

                  return (
                    <a
                      key={hub.name}
                      href={hubDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] hover:bg-blue-50/50 dark:hover:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all group block"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#38BDF8] transition-colors">
                          {hub.name}
                        </span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-white shrink-0 ml-1" />
                      </div>
                      <div className="flex items-center gap-2 mt-1 font-mono text-xs">
                        <span className="font-extrabold text-blue-600 dark:text-[#38BDF8]">{hub.time}</span>
                        <span className="text-slate-400 dark:text-slate-500">•</span>
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">{hub.distance}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Navigation Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playGearShift()}
                className="px-5 py-3 rounded-2xl bg-[#0066FF] hover:bg-[#0052FF] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-102 cursor-pointer"
              >
                <Car className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </a>

              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playGearShift()}
                className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Compass className="w-4 h-4 text-blue-600 dark:text-[#38BDF8]" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playGearShift()}
                className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <span>Apple Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Interactive Map */}
          <div className="lg:col-span-6 w-full h-full min-h-[380px] sm:min-h-[460px] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 bg-slate-900 shadow-xl relative group">
            <iframe
              title="Velocity International Circuit Location Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.780%2C13.058%2C77.815%2C13.085&layer=mapnik&marker=13.0718%2C77.7980"
              className="w-full h-full min-h-[380px] sm:min-h-[460px] border-0 filter contrast-[1.05]"
              loading="lazy"
            />

            {/* Top Map Floating Badge */}
            <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 text-xs font-mono text-white shadow-xl flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="font-bold">Velocity International Circuit • Hoskote</span>
            </div>

            {/* Bottom Overlay Action */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playGearShift()}
                className="bg-[#0052FF] hover:bg-[#0040D0] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xl shadow-blue-600/50 transition-all hover:scale-105"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Start Navigation</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
