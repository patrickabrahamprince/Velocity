import React, { useState, useEffect, useRef } from 'react';
import { Compass, Timer, Award, Play, Pause, RotateCcw, Satellite, Radio, ExternalLink } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

interface TurnInfo {
  id: number;
  name: string;
  sector: 1 | 2 | 3;
  type: 'Hairpin' | 'High-Speed Sweeper' | 'Chicane' | 'Straight Apex' | 'Technical S';
  speed: string;
  gear: string;
  overtakeRating: 'Extreme' | 'High' | 'Medium' | 'Defensive';
  tip: string;
  coords: { x: number; y: number };
}

const turnsData: TurnInfo[] = [
  { id: 1, name: 'The Launchpad', sector: 1, type: 'High-Speed Sweeper', speed: '98 km/h', gear: '5th', overtakeRating: 'Extreme', tip: 'Wide entry from the main straight. Stay on the throttle and hit the inside curve with confidence.', coords: { x: 180, y: 380 } },
  { id: 2, name: 'Devil’s Drop', sector: 1, type: 'Technical S', speed: '75 km/h', gear: '4th', overtakeRating: 'High', tip: 'Gentle downhill turn. Keep your steering smooth to hold strong rear grip.', coords: { x: 260, y: 340 } },
  { id: 3, name: 'Hoskote Hook', sector: 1, type: 'Hairpin', speed: '48 km/h', gear: '2nd', overtakeRating: 'Extreme', tip: 'Brake firmly before turning in. The best spot on the track to pass other racers.', coords: { x: 340, y: 300 } },
  { id: 4, name: 'Alpha Hairpin', sector: 1, type: 'Hairpin', speed: '42 km/h', gear: '2nd', overtakeRating: 'High', tip: 'Tight turn with safety kerbs. Accelerate smoothly as you exit.', coords: { x: 420, y: 270 } },
  { id: 5, name: 'The Kicker', sector: 1, type: 'Straight Apex', speed: '88 km/h', gear: '4th', overtakeRating: 'Medium', tip: 'Fast sweeping section that leads right into Sector 2.', coords: { x: 500, y: 250 } },
  { id: 6, name: 'Apex Vortex', sector: 2, type: 'Technical S', speed: '62 km/h', gear: '3rd', overtakeRating: 'Medium', tip: 'Turn the wheel gently. Smooth driving gives you the fastest lap time here.', coords: { x: 590, y: 220 } },
  { id: 7, name: 'Red Bull Corner', sector: 2, type: 'High-Speed Sweeper', speed: '94 km/h', gear: '5th', overtakeRating: 'High', tip: 'Wide right-hand curve. Hug the inside line for top speed.', coords: { x: 680, y: 190 } },
  { id: 8, name: 'The Switchback', sector: 2, type: 'Chicane', speed: '55 km/h', gear: '3rd', overtakeRating: 'Extreme', tip: 'Quick left-to-right turn. Great place to make an overtake.', coords: { x: 760, y: 170 } },
  { id: 9, name: 'Solur Snare', sector: 2, type: 'Technical S', speed: '68 km/h', gear: '3rd', overtakeRating: 'Medium', tip: 'Look ahead toward the next corner before you turn in.', coords: { x: 840, y: 190 } },
  { id: 10, name: 'Adrenaline Loop', sector: 2, type: 'Hairpin', speed: '45 km/h', gear: '2nd', overtakeRating: 'High', tip: 'Turn in slightly late to get a huge speed boost down the next straight.', coords: { x: 870, y: 270 } },
  { id: 11, name: 'Velocity Kink', sector: 2, type: 'Straight Apex', speed: '105 km/h', gear: '5th', overtakeRating: 'High', tip: 'Hold your racing line steady and blast full throttle into Sector 3.', coords: { x: 810, y: 350 } },
  { id: 12, name: 'The Gauntlet', sector: 3, type: 'Chicane', speed: '58 km/h', gear: '3rd', overtakeRating: 'Extreme', tip: 'Brake straight, then turn left quickly to keep momentum.', coords: { x: 740, y: 410 } },
  { id: 13, name: 'Bangalore Curve', sector: 3, type: 'Technical S', speed: '72 km/h', gear: '4th', overtakeRating: 'Medium', tip: 'Feel the thrilling sideways push. Lean comfortably into the seat.', coords: { x: 660, y: 450 } },
  { id: 14, name: 'Monza Chicane', sector: 3, type: 'Chicane', speed: '52 km/h', gear: '3rd', overtakeRating: 'High', tip: 'Quick flick left and right. Clean steering saves precious seconds.', coords: { x: 570, y: 470 } },
  { id: 15, name: 'The Sweeper', sector: 3, type: 'High-Speed Sweeper', speed: '86 km/h', gear: '4th', overtakeRating: 'Medium', tip: 'Keep your speed up and let the kart drift wide onto the exit.', coords: { x: 480, y: 460 } },
  { id: 16, name: 'Pit Entry Kink', sector: 3, type: 'Straight Apex', speed: '90 km/h', gear: '5th', overtakeRating: 'High', tip: 'Pit entrance is on the right. Stay left if you are continuing your hot lap.', coords: { x: 390, y: 460 } },
  { id: 17, name: 'Thunder Alley', sector: 3, type: 'Straight Apex', speed: '112 km/h', gear: '6th', overtakeRating: 'Extreme', tip: 'Top speed zone! Slipstream the kart ahead and get ready to brake.', coords: { x: 300, y: 470 } },
  { id: 18, name: 'The Squeeze', sector: 3, type: 'Chicane', speed: '50 km/h', gear: '2nd', overtakeRating: 'Extreme', tip: 'Final passing zone before the finish line. Defend your spot!', coords: { x: 210, y: 460 } },
  { id: 19, name: 'Champions Curve', sector: 3, type: 'High-Speed Sweeper', speed: '92 km/h', gear: '5th', overtakeRating: 'High', tip: 'Final corner that launches you straight across the finish line!', coords: { x: 130, y: 420 } },
];

export const CircuitMapSection: React.FC = () => {
  const [activeTurn, setActiveTurn] = useState<TurnInfo>(turnsData[0]);
  const [activeSector, setActiveSector] = useState<number | 'all'>('all');
  const [isPlaying, setIsPlaying] = useState(true);
  const [kartState, setKartState] = useState({
    x: 130,
    y: 420,
    angle: 0,
    speed: 98,
    gForce: 1.2,
    lapTime: 0,
  });

  const pathRef = useRef<SVGPathElement | null>(null);
  const progressRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  // Animate the Go-Kart along the circuit line continuously
  useEffect(() => {
    let lastTimestamp = performance.now();

    const animateKart = (now: number) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (isPlaying && pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        progressRef.current = (progressRef.current + delta * 0.052) % 1;

        const currentDistance = progressRef.current * pathLength;
        const point = pathRef.current.getPointAtLength(currentDistance);
        const lookAheadDistance = (currentDistance + 3) % pathLength;
        const nextPoint = pathRef.current.getPointAtLength(lookAheadDistance);

        const dx = nextPoint.x - point.x;
        const dy = nextPoint.y - point.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Dynamically compute speed & G-force based on turn curvature
        let calculatedSpeed = 92;
        let calculatedG = 1.1;

        turnsData.forEach((turn) => {
          const distToTurn = Math.hypot(point.x - turn.coords.x, point.y - turn.coords.y);
          if (distToTurn < 45) {
            calculatedSpeed = parseInt(turn.speed) || 70;
            calculatedG = turn.overtakeRating === 'Extreme' ? 2.3 : turn.overtakeRating === 'High' ? 1.8 : 1.3;
          }
        });

        setKartState((prev) => ({
          x: point.x,
          y: point.y,
          angle,
          speed: calculatedSpeed,
          gForce: parseFloat(calculatedG.toFixed(1)),
          lapTime: (prev.lapTime + delta) % 55,
        }));
      }

      requestRef.current = requestAnimationFrame(animateKart);
    };

    requestRef.current = requestAnimationFrame(animateKart);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  const handleResetLap = () => {
    soundFx.playGearShift();
    progressRef.current = 0;
    setKartState((prev) => ({ ...prev, lapTime: 0 }));
  };

  return (
    <section id="circuit" className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto w-full">
      {/* Chassis Container for 19-Turn Circuit */}
      <div className="rounded-[32px] sm:rounded-[44px] bg-white text-slate-900 p-6 sm:p-10 lg:p-14 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] border border-slate-200 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/20 text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#0052FF]">
              <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-pulse" />
              <span>LIVE SATELLITE TELEMETRY • 1,166 METERS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              19 Apex Corners. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-[#2563EB] to-[#0284C7]">1.166 KM of Pure Asphalt.</span>
            </h2>
            <p className="text-slate-600 max-w-xl text-sm font-sans leading-relaxed">
              India&apos;s longest outdoor karting track in Hoskote with +4.2m elevation change. Watch the live moving kart beacon on high-res satellite or click any turn for braking tips and speeds.
            </p>
          </div>

          {/* Sector Filters & Direct Google Maps Navigation */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Sector Filters */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-xs">
              <button
                onClick={() => { soundFx.playGearShift(); setActiveSector('all'); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer ${
                  activeSector === 'all'
                    ? 'bg-[#0052FF] text-white font-extrabold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Sectors
              </button>
              <button
                onClick={() => { soundFx.playGearShift(); setActiveSector(1); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer ${
                  activeSector === 1
                    ? 'bg-[#0052FF] text-white font-extrabold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                S1
              </button>
              <button
                onClick={() => { soundFx.playGearShift(); setActiveSector(2); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer ${
                  activeSector === 2
                    ? 'bg-[#0052FF] text-white font-extrabold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                S2
              </button>
              <button
                onClick={() => { soundFx.playGearShift(); setActiveSector(3); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer ${
                  activeSector === 3
                    ? 'bg-[#0052FF] text-white font-extrabold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                S3
              </button>
            </div>

            {/* Direct Google Maps Link */}
            <a
              href="https://share.google/nVeWwRIvbWOKT3RJq"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playGearShift()}
              className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-mono uppercase border border-slate-200 shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-[#0052FF]" />
              <span className="hidden sm:inline">Directions in</span>
              <span>Google Maps ↗</span>
            </a>
          </div>
        </div>

        {/* Main Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Circuit Interactive Animated Satellite Map */}
          <div className="lg:col-span-8 bg-[#040711] border border-slate-200/80 rounded-3xl p-4 sm:p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between group min-h-[460px]">
            {/* Satellite Aerial Photo Foundation */}
            <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
              <img
                src="/images/circuit_satellite_aerial.jpg"
                alt="Velocity International Circuit Satellite View"
                className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.18] saturate-[1.25] transition-transform duration-700 group-hover:scale-[1.01]"
              />
              {/* Dark Motorsport Vignette & Contrast Tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040711]/90 via-[#040711]/30 to-[#040711]/70" />
              <div className="absolute inset-0 bg-[#0052FF]/5 mix-blend-color-dodge pointer-events-none" />

              {/* Animated Radar Scanning Beam */}
              <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-[#0052FF]/20 to-[#38BDF8]/40 border-b border-[#38BDF8]/70 pointer-events-none animate-satellite-radar" />

              {/* High-Tech GPS Overlay Coordinates */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-cyan-400/60 pointer-events-none tracking-widest hidden sm:block">
                + 13.0674° N, 77.8288° E • ORBITAL LOCK
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-cyan-400/60 pointer-events-none tracking-widest hidden sm:block">
                ALT: 875M MSL [ + ]
              </div>
            </div>

            {/* Top Control Bar with Satellite Tracking & Simulation Controls */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-2 bg-[#060A17]/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 shadow-lg">
              <div className="flex items-center gap-2.5 text-xs font-mono text-white font-semibold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0052FF]"></span>
                </span>
                <span className="text-[#38BDF8] font-bold">ORBITAL SATELLITE ACTIVE</span>
                <span className="text-white/30 hidden sm:inline">•</span>
                <span className="text-slate-300 hidden sm:inline text-[11px]">+4.2M ELEVATION</span>
              </div>

              {/* Play / Pause / Reset Simulation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFx.playRev(1.1);
                    setIsPlaying(!isPlaying);
                  }}
                  className="px-3 py-1 rounded-xl bg-[#0052FF] hover:bg-[#2563EB] text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/30 transition-all"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'PAUSE' : 'RUN LAP'}</span>
                </button>

                <button
                  onClick={handleResetLap}
                  title="Reset Kart to Start Line"
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://share.google/nVeWwRIvbWOKT3RJq"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playGearShift()}
                  className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/15 text-[#38BDF8] hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1 transition-all"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#38BDF8]" />
                </a>
              </div>
            </div>

            {/* Vector Track Graphic with Live Animated Moving Kart Over Satellite */}
            <div className="relative z-10 w-full aspect-[16/9] flex items-center justify-center my-2">
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full drop-shadow-2xl"
              >
                <defs>
                  <linearGradient id="trackGradCobalt" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0052FF" />
                    <stop offset="50%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#00D2FF" />
                  </linearGradient>

                  {/* Headlight cone gradient */}
                  <linearGradient id="headlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Outer Glow Halo for High Satellite Visibility */}
                <path
                  d="M 130 420 L 180 380 Q 220 360 260 340 T 340 300 Q 380 280 420 270 T 500 250 Q 550 230 590 220 T 680 190 Q 720 180 760 170 T 840 190 Q 890 220 870 270 Q 850 310 810 350 T 740 410 Q 700 440 660 450 T 570 470 Q 520 470 480 460 T 390 460 Q 340 470 300 470 T 210 460 Z"
                  fill="none"
                  stroke="#0052FF"
                  strokeWidth="36"
                  opacity="0.30"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Main Circuit Asphalt Track Foundation */}
                <path
                  ref={pathRef}
                  d="M 130 420 L 180 380 Q 220 360 260 340 T 340 300 Q 380 280 420 270 T 500 250 Q 550 230 590 220 T 680 190 Q 720 180 760 170 T 840 190 Q 890 220 870 270 Q 850 310 810 350 T 740 410 Q 700 440 660 450 T 570 470 Q 520 470 480 460 T 390 460 Q 340 470 300 470 T 210 460 Z"
                  fill="none"
                  stroke="#070D1F"
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />

                {/* Animated Luminous Racing Line Stream */}
                <path
                  d="M 130 420 L 180 380 Q 220 360 260 340 T 340 300 Q 380 280 420 270 T 500 250 Q 550 230 590 220 T 680 190 Q 720 180 760 170 T 840 190 Q 890 220 870 270 Q 850 310 810 350 T 740 410 Q 700 440 660 450 T 570 470 Q 520 470 480 460 T 390 460 Q 340 470 300 470 T 210 460 Z"
                  fill="none"
                  stroke="url(#trackGradCobalt)"
                  strokeWidth="4"
                  strokeDasharray="16 8"
                  className="animate-track-stream"
                />

                {/* Start/Finish Line Gantry */}
                <line
                  x1="120"
                  y1="400"
                  x2="140"
                  y2="440"
                  stroke="#FFFFFF"
                  strokeWidth="5"
                />
                <line
                  x1="120"
                  y1="400"
                  x2="140"
                  y2="440"
                  stroke="#0052FF"
                  strokeWidth="5"
                  strokeDasharray="4 4"
                />

                {/* 19 Turn Nodes on Satellite Track */}
                {turnsData.map((turn) => {
                  const isSelected = activeTurn.id === turn.id;
                  const isSectorActive = activeSector === 'all' || activeSector === turn.sector;
                  return (
                    <g
                      key={turn.id}
                      className="cursor-pointer group"
                      opacity={isSectorActive ? 1 : 0.35}
                      onClick={() => {
                        soundFx.playRev(0.9);
                        setActiveTurn(turn);
                      }}
                    >
                      {isSelected && (
                        <circle
                          cx={turn.coords.x}
                          cy={turn.coords.y}
                          r="22"
                          fill="#0052FF"
                          opacity="0.45"
                          className="animate-ping"
                        />
                      )}

                      <circle
                        cx={turn.coords.x}
                        cy={turn.coords.y}
                        r={isSelected ? "14" : "10"}
                        fill={isSelected ? "#0052FF" : "#0A0F24"}
                        stroke={isSelected ? "#38BDF8" : turn.sector === 1 ? "#0052FF" : turn.sector === 2 ? "#00D2FF" : "#FF3366"}
                        strokeWidth={isSelected ? "3" : "2"}
                        className="transition-all duration-200 group-hover:scale-125"
                      />

                      <text
                        x={turn.coords.x}
                        y={turn.coords.y + 4}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize={isSelected ? "10" : "8"}
                        fontWeight="bold"
                        fontFamily="Space Grotesk, sans-serif"
                      >
                        {turn.id}
                      </text>
                    </g>
                  );
                })}

                {/* LIVE ANIMATED RACING KART BEACON ON SATELLITE */}
                <g transform={`translate(${kartState.x}, ${kartState.y})`}>
                  {/* Glowing Blue Slipstream Aura */}
                  <circle r="20" fill="#0052FF" opacity="0.35" className="animate-ping" />
                  <circle r="11" fill="#0052FF" opacity="0.9" />

                  {/* Rotated Kart Shape */}
                  <g transform={`rotate(${kartState.angle})`}>
                    {/* Headlight beam illuminating satellite asphalt */}
                    <polygon
                      points="6,-4 42,-18 42,18 6,4"
                      fill="url(#headlightGrad)"
                      opacity="0.9"
                    />

                    {/* Kart Chassis */}
                    <rect x="-10" y="-7" width="20" height="14" rx="4" fill="#070A14" stroke="#0052FF" strokeWidth="2" />
                    <rect x="-6" y="-4" width="12" height="8" rx="2" fill="#0052FF" />

                    {/* Front Wheels */}
                    <rect x="3" y="-9" width="6" height="3" rx="1" fill="#111" />
                    <rect x="3" y="6" width="6" height="3" rx="1" fill="#111" />

                    {/* Rear Wheels */}
                    <rect x="-8" y="-9" width="7" height="3.5" rx="1" fill="#111" />
                    <rect x="-8" y="5.5" width="7" height="3.5" rx="1" fill="#111" />

                    {/* Helmet */}
                    <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                  </g>

                  {/* Telemetry Speed Tooltip Floating Badge */}
                  <g transform="translate(0, -22)">
                    <rect x="-32" y="-12" width="64" height="18" rx="6" fill="#070A14" stroke="#0052FF" strokeWidth="1.5" />
                    <text
                      x="0"
                      y="1"
                      textAnchor="middle"
                      fill="#38BDF8"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="Space Grotesk, sans-serif"
                    >
                      {kartState.speed} KM/H
                    </text>
                  </g>
                </g>
              </svg>
            </div>

            {/* Footer Track Legend & Live Lap Timer */}
            <div className="relative z-10 flex flex-wrap items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono text-slate-300 bg-[#060A17]/85 backdrop-blur-md px-4 py-2.5 rounded-2xl">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0052FF]" />
                  <span>Sector 1</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00D2FF]" />
                  <span>Sector 2</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF3366]" />
                  <span>Sector 3</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-300">
                  LIVE SIM LAP: <strong className="text-white">00:{kartState.lapTime.toFixed(2).padStart(5, '0')}s</strong>
                </span>
                <span className="text-[#38BDF8] font-bold">
                  RECORD: 00:54.212s
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Turn Detail Telemetry Card */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-between">
              {/* Turn Number Badge */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#2563EB] flex items-center justify-center font-bold text-lg text-white shadow-sm font-mono">
                      T{activeTurn.id}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xl text-slate-900 tracking-tight leading-tight">
                        {activeTurn.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[#0052FF] font-semibold uppercase">
                        Sector {activeTurn.sector} • {activeTurn.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 my-4">
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">APEX SPEED</div>
                    <div className="font-extrabold font-mono text-2xl text-slate-900 mt-0.5">
                      {activeTurn.speed}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">RECOMMENDED GEAR</div>
                    <div className="font-extrabold font-mono text-2xl text-[#0052FF] mt-0.5">
                      {activeTurn.gear}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">OVERTAKE OPPORTUNITY</span>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        activeTurn.overtakeRating === 'Extreme'
                          ? 'bg-[#0052FF] text-white shadow-sm shadow-blue-600/30'
                          : activeTurn.overtakeRating === 'High'
                          ? 'bg-[#0052FF]/15 text-[#0052FF] border border-[#0052FF]/30'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {activeTurn.overtakeRating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pro Driver Telemetry Tip */}
                <div className="bg-blue-50/80 p-4 rounded-2xl border-l-4 border-[#0052FF] space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#0052FF] uppercase">
                    <Award className="w-3.5 h-3.5" />
                    <span>RACING LINE TIP:</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    &ldquo;{activeTurn.tip}&rdquo;
                  </p>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-200 mt-3">
                <button
                  onClick={() => {
                    soundFx.playGearShift();
                    const prevId = activeTurn.id === 1 ? 19 : activeTurn.id - 1;
                    setActiveTurn(turnsData[prevId - 1]);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 border border-slate-200 text-xs font-mono text-slate-800 font-semibold cursor-pointer transition-colors"
                >
                  ← Turn {activeTurn.id === 1 ? 19 : activeTurn.id - 1}
                </button>

                <button
                  onClick={() => {
                    soundFx.playGearShift();
                    const nextId = activeTurn.id === 19 ? 1 : activeTurn.id + 1;
                    setActiveTurn(turnsData[nextId - 1]);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white text-xs font-mono font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Turn {activeTurn.id === 19 ? 1 : activeTurn.id + 1} →
                </button>
              </div>
            </div>

            {/* Quick Track Stats Bar with Live G-Force Telemetry */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between text-xs font-mono text-slate-700 shadow-xs">
              <span className="flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5 text-[#0052FF]" />
                <span className="font-semibold text-slate-900">G-FORCE: {kartState.gForce}G</span>
              </span>
              <span className="text-[#0052FF] font-bold">1166 METERS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
