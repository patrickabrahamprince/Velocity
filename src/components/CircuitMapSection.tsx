import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Timer, 
  Award, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Flag, 
  ExternalLink 
} from 'lucide-react';
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
  timestampSeconds: number; // Lap timestamp in the onboard video
}

const turnsData: TurnInfo[] = [
  { id: 1, name: 'The Launchpad', sector: 1, type: 'High-Speed Sweeper', speed: '98 km/h', gear: '5th', overtakeRating: 'Extreme', tip: 'Wide entry from the main straight. Stay on the throttle and hit the inside curve with confidence.', timestampSeconds: 2 },
  { id: 2, name: 'Devil’s Drop', sector: 1, type: 'Technical S', speed: '75 km/h', gear: '4th', overtakeRating: 'High', tip: 'Gentle downhill turn. Keep your steering smooth to hold strong rear grip.', timestampSeconds: 6 },
  { id: 3, name: 'Hoskote Hook', sector: 1, type: 'Hairpin', speed: '48 km/h', gear: '2nd', overtakeRating: 'Extreme', tip: 'Brake firmly before turning in. The best spot on the track to pass other racers.', timestampSeconds: 10 },
  { id: 4, name: 'Alpha Hairpin', sector: 1, type: 'Hairpin', speed: '42 km/h', gear: '2nd', overtakeRating: 'High', tip: 'Tight turn with safety kerbs. Accelerate smoothly as you exit.', timestampSeconds: 13 },
  { id: 5, name: 'The Kicker', sector: 1, type: 'Straight Apex', speed: '88 km/h', gear: '4th', overtakeRating: 'Medium', tip: 'Fast sweeping section that leads right into Sector 2.', timestampSeconds: 17 },
  { id: 6, name: 'Apex Vortex', sector: 2, type: 'Technical S', speed: '62 km/h', gear: '3rd', overtakeRating: 'Medium', tip: 'Turn the wheel gently. Smooth driving gives you the fastest lap time here.', timestampSeconds: 21 },
  { id: 7, name: 'Red Bull Corner', sector: 2, type: 'High-Speed Sweeper', speed: '94 km/h', gear: '5th', overtakeRating: 'High', tip: 'Wide right-hand curve. Hug the inside line for top speed.', timestampSeconds: 25 },
  { id: 8, name: 'The Switchback', sector: 2, type: 'Chicane', speed: '55 km/h', gear: '3rd', overtakeRating: 'Extreme', tip: 'Quick left-to-right turn. Great place to make an overtake.', timestampSeconds: 28 },
  { id: 9, name: 'Solur Snare', sector: 2, type: 'Technical S', speed: '68 km/h', gear: '3rd', overtakeRating: 'Medium', tip: 'Look ahead toward the next corner before you turn in.', timestampSeconds: 32 },
  { id: 10, name: 'Adrenaline Loop', sector: 2, type: 'Hairpin', speed: '45 km/h', gear: '2nd', overtakeRating: 'High', tip: 'Turn in slightly late to get a huge speed boost down the next straight.', timestampSeconds: 36 },
  { id: 11, name: 'Velocity Kink', sector: 2, type: 'Straight Apex', speed: '105 km/h', gear: '5th', overtakeRating: 'High', tip: 'Hold your racing line steady and blast full throttle into Sector 3.', timestampSeconds: 40 },
  { id: 12, name: 'The Gauntlet', sector: 3, type: 'Chicane', speed: '58 km/h', gear: '3rd', overtakeRating: 'Extreme', tip: 'Brake straight, then turn left quickly to keep momentum.', timestampSeconds: 44 },
  { id: 13, name: 'Bangalore Curve', sector: 3, type: 'Technical S', speed: '72 km/h', gear: '4th', overtakeRating: 'Medium', tip: 'Feel the thrilling sideways push. Lean comfortably into the seat.', timestampSeconds: 47 },
  { id: 14, name: 'Monza Chicane', sector: 3, type: 'Chicane', speed: '52 km/h', gear: '3rd', overtakeRating: 'High', tip: 'Quick flick left and right. Clean steering saves precious seconds.', timestampSeconds: 50 },
  { id: 15, name: 'The Sweeper', sector: 3, type: 'High-Speed Sweeper', speed: '86 km/h', gear: '4th', overtakeRating: 'Medium', tip: 'Keep your speed up and let the kart drift wide onto the exit.', timestampSeconds: 53 },
  { id: 16, name: 'Pit Entry Kink', sector: 3, type: 'Straight Apex', speed: '90 km/h', gear: '5th', overtakeRating: 'High', tip: 'Pit entrance is on the right. Stay left if you are continuing your hot lap.', timestampSeconds: 56 },
  { id: 17, name: 'Thunder Alley', sector: 3, type: 'Straight Apex', speed: '112 km/h', gear: '6th', overtakeRating: 'Extreme', tip: 'Top speed zone! Slipstream the kart ahead and get ready to brake.', timestampSeconds: 59 },
  { id: 18, name: 'The Squeeze', sector: 3, type: 'Chicane', speed: '50 km/h', gear: '2nd', overtakeRating: 'Extreme', tip: 'Final passing zone before the finish line. Defend your spot!', timestampSeconds: 63 },
  { id: 19, name: 'Champions Curve', sector: 3, type: 'High-Speed Sweeper', speed: '92 km/h', gear: '5th', overtakeRating: 'High', tip: 'Final corner that launches you straight across the finish line!', timestampSeconds: 67 },
];

const TOTAL_LAP_DURATION = 74.5; // Full lap benchmark duration in seconds

interface CircuitMapSectionProps {
  /** Optional video URL (.mp4 or direct stream). Leave blank to display the interactive video placeholder poster */
  videoUrl?: string;
}

export const CircuitMapSection: React.FC<CircuitMapSectionProps> = ({ videoUrl = '' }) => {
  const [activeTurn, setActiveTurn] = useState<TurnInfo>(turnsData[0]);
  const [activeSector, setActiveSector] = useState<number | 'all'>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [customVideoSrc, setCustomVideoSrc] = useState<string>(videoUrl);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Interactive Timeline Scrubber Drag Gesture
  const scrubBarRef = useRef<HTMLDivElement | null>(null);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);

  const handleScrubAtPoint = (clientX: number) => {
    if (!scrubBarRef.current) return;
    const rect = scrubBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const targetTime = ratio * TOTAL_LAP_DURATION;
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
    const currentTurn = turnsData
      .slice()
      .reverse()
      .find((t) => targetTime >= t.timestampSeconds);
    if (currentTurn && currentTurn.id !== activeTurn.id) {
      setActiveTurn(currentTurn);
    }
  };

  const handleScrubPointerDown = (e: React.PointerEvent) => {
    setIsScrubbing(true);
    soundFx.playGearShift();
    handleScrubAtPoint(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleScrubPointerMove = (e: React.PointerEvent) => {
    if (isScrubbing) {
      handleScrubAtPoint(e.clientX);
    }
  };

  const handleScrubPointerUp = (e: React.PointerEvent) => {
    setIsScrubbing(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  // Compute live speed, gear and G-force based on playback timestamp
  const currentSpeed = parseInt(activeTurn.speed) || 92;
  const currentGForce = activeTurn.overtakeRating === 'Extreme' ? 2.3 : activeTurn.overtakeRating === 'High' ? 1.8 : 1.2;

  // Handle Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    } else {
      soundFx.playRev(1.1);
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Video progress animation (syncs turn data with elapsed video time)
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.2;
          if (next >= TOTAL_LAP_DURATION) {
            return 0; // Loop lap
          }

          // Auto-sync active turn with video timestamp
          const currentTurn = turnsData
            .slice()
            .reverse()
            .find((t) => next >= t.timestampSeconds);
          if (currentTurn && currentTurn.id !== activeTurn.id) {
            setActiveTurn(currentTurn);
          }

          return next;
        });
      }, 200);
    } else if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, activeTurn.id]);

  // Jump to specific turn in video
  const jumpToTurn = (turn: TurnInfo) => {
    soundFx.playGearShift();
    setActiveTurn(turn);
    setCurrentTime(turn.timestampSeconds);
    if (videoRef.current) {
      videoRef.current.currentTime = turn.timestampSeconds;
    }
  };

  // Reset video to start line
  const handleResetLap = () => {
    soundFx.playGearShift();
    setCurrentTime(0);
    setActiveTurn(turnsData[0]);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Toggle Fullscreen on player container
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Format seconds to mm:ss.ms
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    const ms = Math.floor((secs % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}.${ms}`;
  };

  // Filtered turns based on active sector
  const filteredTurns = turnsData.filter(
    (t) => activeSector === 'all' || t.sector === activeSector
  );

  return (
    <section id="circuit" className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-[1480px] mx-auto w-full">
      {/* Chassis Container for 19-Turn Circuit Showcase */}
      <div className="rounded-[32px] sm:rounded-[44px] bg-[#0A0E1F]/90 text-white p-6 sm:p-10 lg:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.8)] border border-white/10 space-y-10 backdrop-blur-xl">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0052FF]/15 border border-[#0052FF]/30 text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00D2FF]">
              <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
              <span>4K ONBOARD VIDEO • 1,166 METERS CIRCUIT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              19 Apex Corners. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#0052FF] to-[#38BDF8]">1.166 KM of Pure Asphalt.</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-sm font-sans leading-relaxed">
              Karnataka&apos;s biggest outdoor circuit in Hoskote with +4.2m elevation change. Watch the full-throttle 4K onboard hot lap or inspect corner braking telemetry and racing lines.
            </p>
          </div>

          {/* Sector Filters & Direct Google Maps Navigation */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            {/* Sector Filters */}
            <div className="flex items-center gap-1 bg-[#060914] p-1 rounded-2xl border border-white/10 shadow-inner shrink-0">
              <button
                onClick={() => { soundFx.playGearShift(); setActiveSector('all'); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeSector === 'all'
                    ? 'bg-[#0052FF] text-white font-extrabold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Sectors
              </button>
              <button
                onClick={() => { soundFx.playGearShift(); setActiveSector(1); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeSector === 1
                    ? 'bg-[#0052FF] text-white font-extrabold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                S1
              </button>
              <button
                onClick={() => { soundFx.playGearShift(); setActiveSector(2); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeSector === 2
                    ? 'bg-[#0052FF] text-white font-extrabold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                S2
              </button>
              <button
                onClick={() => { soundFx.playGearShift(); setActiveSector(3); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeSector === 3
                    ? 'bg-[#0052FF] text-white font-extrabold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
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
              className="px-3.5 py-2 rounded-2xl bg-[#0E1528] hover:bg-[#131D38] text-slate-300 hover:text-white text-xs font-mono uppercase border border-white/10 shadow-xs flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0"
            >
              <Compass className="w-3.5 h-3.5 text-[#00D2FF] shrink-0" />
              <span>Google Maps ↗</span>
            </a>
          </div>
        </div>

        {/* Main Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: 4K Onboard Video Player & Placeholder */}
          <div 
            ref={playerContainerRef}
            className="lg:col-span-8 w-full min-w-0 bg-[#040711] border border-slate-800/80 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col justify-between group min-h-[480px]"
          >
            {/* Background Poster / Real Video Component */}
            {customVideoSrc ? (
              <video
                ref={videoRef}
                src={customVideoSrc}
                poster="/images/hero_racing_kart.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                muted={isMuted}
                playsInline
                loop
                onTimeUpdate={(e) => {
                  const target = e.currentTarget;
                  setCurrentTime(target.currentTime);
                  const currentTurn = turnsData
                    .slice()
                    .reverse()
                    .find((t) => target.currentTime >= t.timestampSeconds);
                  if (currentTurn && currentTurn.id !== activeTurn.id) {
                    setActiveTurn(currentTurn);
                  }
                }}
              />
            ) : (
              <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
                <img
                  src="/images/hero_racing_kart.jpg"
                  alt="Velocity Circuit 4K Onboard Hot Lap"
                  className="w-full h-full object-cover filter brightness-[0.62] contrast-[1.15] saturate-[1.1] transition-transform duration-700 group-hover:scale-[1.01]"
                />
                {/* Motorsport Vignette & Scanline Grid Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040711] via-[#040711]/40 to-[#040711]/70" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,82,255,0.08)_100%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[#0052FF]/5 mix-blend-color-dodge pointer-events-none" />
              </div>
            )}

            {/* Top Video Header Bar with Status Badges */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 bg-gradient-to-b from-[#040711]/90 via-[#040711]/50 to-transparent">
              <div className="flex items-center gap-2.5 text-xs font-mono text-white font-semibold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E10600] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E10600]"></span>
                </span>
                <span className="text-white font-bold tracking-wider">REC • 4K 60FPS</span>
                <span className="text-white/30">•</span>
                <span className="text-[#38BDF8] text-[11px] font-mono tracking-wider hidden sm:inline">
                  ONBOARD TELEMETRY CAM
                </span>
              </div>

              {/* Action Buttons: Mute & Fullscreen */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFx.playGearShift();
                    setIsMuted(!isMuted);
                    if (videoRef.current) videoRef.current.muted = !isMuted;
                  }}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#38BDF8]" />}
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
                  title="Toggle Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center Area: Glowing Hero Play Button & Cockpit HUD */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 my-auto select-none">
              {!isPlaying ? (
                <div className="space-y-4">
                  {/* Glowing Play Orb Button */}
                  <button
                    onClick={togglePlay}
                    className="group/btn relative inline-flex items-center justify-center p-6 sm:p-7 rounded-full bg-gradient-to-tr from-[#0052FF] to-[#00D2FF] text-white shadow-[0_0_50px_rgba(0,82,255,0.6)] hover:shadow-[0_0_70px_rgba(0,82,255,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    aria-label="Play Onboard Lap Video"
                  >
                    <span className="absolute inset-0 rounded-full bg-[#0052FF] opacity-40 animate-ping pointer-events-none" />
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white text-white translate-x-0.5" />
                  </button>

                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      WATCH 4K ONBOARD HOT LAP
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-mono">
                      1,166m Full Lap Record • Driver Point of View • 19 Apex Turns
                    </p>
                  </div>
                </div>
              ) : (
                /* Live Cockpit HUD Overlay while video is playing */
                <div 
                  onClick={togglePlay}
                  className="w-full flex items-center justify-between px-4 sm:px-8 py-2 cursor-pointer"
                >
                  {/* Left HUD: Speedometer */}
                  <div className="bg-[#060A17]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg text-left font-mono">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">SPEED</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8] flex items-baseline gap-1">
                      <span>{currentSpeed}</span>
                      <span className="text-xs text-slate-400">KM/H</span>
                    </div>
                  </div>

                  {/* Center HUD: Active Turn Gantry */}
                  <div className="bg-[#060A17]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg font-mono text-center">
                    <div className="text-[10px] text-[#00D2FF] uppercase font-bold tracking-widest">
                      SECTOR {activeTurn.sector}
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-white">
                      T{activeTurn.id}: {activeTurn.name}
                    </div>
                  </div>

                  {/* Right HUD: Lateral G-Force */}
                  <div className="bg-[#060A17]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg text-right font-mono">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">LATERAL G</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-baseline gap-1 justify-end">
                      <span>{currentGForce}</span>
                      <span className="text-xs text-[#38BDF8]">G</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls Bar: Timeline Scrub Bar, Timer & Buttons */}
            <div className="relative z-10 p-4 sm:p-5 bg-gradient-to-t from-[#040711]/95 via-[#040711]/80 to-transparent space-y-3">
              {/* Timeline Scrub Bar with Turn Marker Pins & Gesture Drag */}
              <div className="space-y-1">
                <div 
                  ref={scrubBarRef}
                  onPointerDown={handleScrubPointerDown}
                  onPointerMove={handleScrubPointerMove}
                  onPointerUp={handleScrubPointerUp}
                  className="relative w-full h-4 py-1 cursor-ew-resize group/scrub touch-none select-none flex items-center"
                  title="Gesture: Click and drag horizontally to scrub the onboard lap video"
                >
                  <div className="relative w-full h-2 bg-white/15 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#0052FF] via-[#38BDF8] to-[#00D2FF] transition-all duration-75 rounded-full"
                      style={{ width: `${(currentTime / TOTAL_LAP_DURATION) * 100}%` }}
                    />
                  </div>
                  {/* Glowing Gesture Scrub Thumb */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-[#0052FF] scale-100 group-hover/scrub:scale-125 transition-transform"
                    style={{ left: `${(currentTime / TOTAL_LAP_DURATION) * 100}%` }}
                  />
                </div>

                {/* Timeline Turn Chapter Dots */}
                <div className="relative w-full h-3 select-none">
                  {turnsData.map((turn) => {
                    const pct = (turn.timestampSeconds / TOTAL_LAP_DURATION) * 100;
                    const isActive = activeTurn.id === turn.id;
                    return (
                      <button
                        key={turn.id}
                        onClick={() => jumpToTurn(turn)}
                        title={`T${turn.id}: ${turn.name} (${formatTime(turn.timestampSeconds)})`}
                        style={{ left: `${pct}%` }}
                        className={`absolute top-0 -translate-x-1/2 w-2 h-2 rounded-full cursor-pointer transition-all ${
                          isActive 
                            ? 'bg-white scale-150 ring-2 ring-[#0052FF]' 
                            : 'bg-white/40 hover:bg-[#38BDF8] hover:scale-125'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Controls Cluster */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0052FF] hover:bg-[#2563EB] text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/30 transition-all"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    <span>{isPlaying ? 'PAUSE' : 'PLAY LAP'}</span>
                  </button>

                  <button
                    onClick={handleResetLap}
                    title="Reset to Start/Finish Line"
                    className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-slate-300 font-mono text-xs pl-1">
                    <span className="text-white font-bold">{formatTime(currentTime)}</span>
                    <span className="text-slate-500"> / {formatTime(TOTAL_LAP_DURATION)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-300 hidden sm:inline">
                    TRACK RECORD: <strong className="text-white">00:54.212s</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-white/10 text-[#38BDF8] border border-white/10 font-bold">
                    1,166 METERS
                  </span>
                </div>
              </div>

              {/* Turn Quick-Jump Pill Strip along bottom of video */}
              <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-mono">
                <span className="text-slate-400 shrink-0 font-bold flex items-center gap-1 pr-1">
                  <Flag className="w-3 h-3 text-[#0052FF]" />
                  <span>CORNERS:</span>
                </span>
                {filteredTurns.map((turn) => {
                  const isSelected = activeTurn.id === turn.id;
                  return (
                    <button
                      key={turn.id}
                      onClick={() => jumpToTurn(turn)}
                      className={`px-2 py-0.5 rounded-lg shrink-0 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0052FF] text-white font-bold shadow-xs'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      T{turn.id}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Turn Detail Telemetry Card */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="bg-[#070A14] border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between">
              {/* Turn Number Badge */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#2563EB] flex items-center justify-center font-bold text-lg text-white shadow-md shadow-blue-600/30 font-mono">
                      T{activeTurn.id}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xl text-white tracking-tight leading-tight">
                        {activeTurn.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[#00D2FF] font-semibold uppercase">
                        Sector {activeTurn.sector} • {activeTurn.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 my-4">
                  <div className="bg-[#0C1124] p-3 rounded-2xl border border-white/10 shadow-xs">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">APEX SPEED</div>
                    <div className="font-extrabold font-mono text-2xl text-white mt-0.5">
                      {activeTurn.speed}
                    </div>
                  </div>

                  <div className="bg-[#0C1124] p-3 rounded-2xl border border-white/10 shadow-xs">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">RECOMMENDED GEAR</div>
                    <div className="font-extrabold font-mono text-2xl text-[#00D2FF] mt-0.5">
                      {activeTurn.gear}
                    </div>
                  </div>

                  <div className="bg-[#0C1124] p-3 rounded-2xl border border-white/10 shadow-xs col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">OVERTAKE OPPORTUNITY</span>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        activeTurn.overtakeRating === 'Extreme'
                          ? 'bg-[#0052FF] text-white shadow-sm shadow-blue-600/30'
                          : activeTurn.overtakeRating === 'High'
                          ? 'bg-[#0052FF]/20 text-[#38BDF8] border border-[#0052FF]/40'
                          : 'bg-white/10 text-slate-300'
                      }`}>
                        {activeTurn.overtakeRating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pro Driver Telemetry Tip */}
                <div className="bg-blue-950/40 p-4 rounded-2xl border-l-4 border-[#0052FF] border border-blue-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#00D2FF] uppercase">
                    <Award className="w-3.5 h-3.5" />
                    <span>RACING LINE TIP:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    &ldquo;{activeTurn.tip}&rdquo;
                  </p>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-white/10 mt-3">
                <button
                  onClick={() => {
                    soundFx.playGearShift();
                    const prevId = activeTurn.id === 1 ? 19 : activeTurn.id - 1;
                    jumpToTurn(turnsData[prevId - 1]);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono text-slate-200 font-semibold cursor-pointer transition-colors"
                >
                  ← Turn {activeTurn.id === 1 ? 19 : activeTurn.id - 1}
                </button>

                <button
                  onClick={() => {
                    soundFx.playGearShift();
                    const nextId = activeTurn.id === 19 ? 1 : activeTurn.id + 1;
                    jumpToTurn(turnsData[nextId - 1]);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#2563EB] hover:brightness-110 text-white text-xs font-mono font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Turn {activeTurn.id === 19 ? 1 : activeTurn.id + 1} →
                </button>
              </div>
            </div>

            {/* Quick Track Stats Bar with Live G-Force Telemetry */}
            <div className="bg-[#070A14] border border-white/10 rounded-2xl p-4 flex items-center justify-between text-xs font-mono text-slate-300 shadow-xl">
              <span className="flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span className="font-semibold text-white">G-FORCE: {currentGForce}G</span>
              </span>
              <span className="text-[#00D2FF] font-bold">1166 METERS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
