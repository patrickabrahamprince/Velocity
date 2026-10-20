import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Zap } from 'lucide-react';
import { soundFx } from '../utils/soundEngine';

export const SpeedometerHUD: React.FC = () => {
  const [speed, setSpeed] = useState<number>(0);
  const [gear, setGear] = useState<string>('N');
  const [gForce, setGForce] = useState<number>(0.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isRevving, setIsRevving] = useState<boolean>(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let timeout: ReturnType<typeof setTimeout>;

    const calculateSpeed = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const timeDelta = Math.max(1, now - lastTime);
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);

      // Convert scroll rate to dynamic virtual KM/H (0 to 140)
      const calculatedSpeed = Math.min(145, Math.round((scrollDelta / timeDelta) * 85));

      setSpeed(calculatedSpeed);

      // Calculate virtual Gear
      if (calculatedSpeed === 0) setGear('N');
      else if (calculatedSpeed < 25) setGear('1');
      else if (calculatedSpeed < 50) setGear('2');
      else if (calculatedSpeed < 75) setGear('3');
      else if (calculatedSpeed < 105) setGear('4');
      else if (calculatedSpeed < 125) setGear('5');
      else setGear('6');

      // Virtual Lateral G-Force
      const g = (calculatedSpeed / 145) * 2.4;
      setGForce(parseFloat(g.toFixed(1)));

      lastScrollY = currentScrollY;
      lastTime = now;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setSpeed(0);
        setGear('N');
        setGForce(0.0);
      }, 250);
    };

    window.addEventListener('scroll', calculateSpeed, { passive: true });
    return () => {
      window.removeEventListener('scroll', calculateSpeed);
      clearTimeout(timeout);
    };
  }, []);

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundFx.playRev(1.0);
    }
  };

  const handleManualRev = () => {
    setIsRevving(true);
    soundFx.playRev(1.5);
    setSpeed(128);
    setGear('4');
    setTimeout(() => {
      setIsRevving(false);
      setSpeed(0);
      setGear('N');
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Sound Toggle & Manual Rev Action Bar */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleToggleSound}
          title={isMuted ? "Unmute Engine Audio" : "Mute Audio"}
          className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 hover:border-[#0052FF] flex items-center justify-center text-slate-700 hover:text-[#0052FF] transition-all shadow-md cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-[#0052FF] animate-pulse" />}
        </button>

        <button
          onClick={handleManualRev}
          title="Rev Engine (Full Throttle)"
          className={`w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 hover:border-[#0052FF] flex items-center justify-center transition-all shadow-md cursor-pointer ${
            isRevving ? 'bg-[#0052FF] text-white scale-110 shadow-lg shadow-[#0052FF]/40' : 'text-slate-700 hover:text-[#0052FF]'
          }`}
        >
          <Zap className="w-5 h-5 fill-current" />
        </button>
      </div>

      {/* Futuristic Telemetry HUD Widget */}
      <div className="hidden sm:flex items-center gap-4 bg-white/95 backdrop-blur-xl border border-slate-200 px-4 py-3 rounded-2xl shadow-xl hover:border-[#0052FF]/60 transition-all text-slate-900">
        {/* Analog/Digital Gauge */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Arc */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="8"
              strokeDasharray="200"
              strokeDashoffset="50"
            />
            {/* Active Speed Arc */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={speed > 90 ? '#0052FF' : speed > 40 ? '#2563EB' : '#0284C7'}
              strokeWidth="8"
              strokeDasharray="200"
              strokeDashoffset={200 - (speed / 145) * 150}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>

          {/* Center Digital Speed */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading font-black text-lg leading-none tracking-tight text-slate-900">
              {speed}
            </span>
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">KM/H</span>
          </div>
        </div>

        {/* Telemetry Metrics (Gear & G-Force) */}
        <div className="flex flex-col justify-center border-l border-slate-200 pl-3 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500">GEAR:</span>
            <span className={`font-mono font-bold text-xs px-1.5 py-0.5 rounded ${
              gear === 'N' ? 'bg-slate-100 text-slate-700' : 'bg-[#0052FF] text-white shadow-sm'
            }`}>
              {gear}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500">G-FORCE:</span>
            <span className="font-mono text-xs text-[#0052FF] font-semibold">
              {gForce > 0 ? `+${gForce}G` : '0.0G'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 pt-0.5 border-t border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF] animate-pulse" />
            <span className="text-[9px] font-mono text-slate-500">TRACK: DRY 28°C</span>
          </div>
        </div>
      </div>
    </div>
  );
};
