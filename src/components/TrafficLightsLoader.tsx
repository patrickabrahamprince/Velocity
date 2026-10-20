import React, { useEffect, useState } from 'react';
import { soundFx } from '../utils/soundEngine';

interface TrafficLightsLoaderProps {
  onComplete: () => void;
}

export const TrafficLightsLoader: React.FC<TrafficLightsLoaderProps> = ({ onComplete }) => {
  const [lightsCount, setLightsCount] = useState<number>(0);
  const [isLightsOut, setIsLightsOut] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    // 5 red lights sequence
    const t1 = setTimeout(() => { setLightsCount(1); soundFx.playBeep(false); }, 400);
    const t2 = setTimeout(() => { setLightsCount(2); soundFx.playBeep(false); }, 800);
    const t3 = setTimeout(() => { setLightsCount(3); soundFx.playBeep(false); }, 1200);
    const t4 = setTimeout(() => { setLightsCount(4); soundFx.playBeep(false); }, 1600);
    const t5 = setTimeout(() => { setLightsCount(5); soundFx.playBeep(false); }, 2000);

    // Lights out after random duration (classic F1 style)
    const t6 = setTimeout(() => {
      setIsLightsOut(true);
      soundFx.playBeep(true);
      soundFx.playRev(1.3);
    }, 2600);

    // Fade out and reveal site
    const t7 = setTimeout(() => {
      setFadeOut(true);
    }, 3200);

    const t8 = setTimeout(() => {
      onComplete();
    }, 3700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0D14] transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute w-96 h-96 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
        {/* FIA Starting Gantry */}
        <div className="bg-[#111624] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl mb-8 w-full">
          <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-mono mb-4 flex items-center justify-between border-b border-white/10 pb-2">
            <span>VELOCITY STARTING GANTRY</span>
            <span className="text-[#38BDF8] animate-pulse">GRID SYSTEM: ARMED</span>
          </div>

          {/* 5 Light Columns */}
          <div className="grid grid-cols-5 gap-3 sm:gap-5 justify-items-center py-2">
            {[0, 1, 2, 3, 4].map((index) => {
              const isLit = !isLightsOut && lightsCount > index;
              const isGo = isLightsOut;

              return (
                <div
                  key={index}
                  className="w-10 h-24 sm:w-14 sm:h-32 bg-[#07090E] rounded-xl p-1.5 flex flex-col justify-between items-center border border-neutral-800 shadow-inner"
                >
                  {/* Top bulb / Green Go */}
                  <div
                    className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full transition-all duration-150 ${
                      isGo
                        ? 'bg-emerald-500 shadow-[0_0_20px_#10b981]'
                        : 'bg-neutral-900 border border-neutral-800'
                    }`}
                  />
                  {/* Bottom Red Start Bulb */}
                  <div
                    className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full transition-all duration-100 ${
                      isLit
                        ? 'bg-[#E10600] shadow-[0_0_25px_#E10600]'
                        : 'bg-neutral-900 border border-neutral-800'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Loading Text */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-wider text-white uppercase">
            {isLightsOut ? (
              <span className="text-emerald-400 animate-bounce inline-block">
                LIGHTS OUT & AWAY WE GO! 🏁
              </span>
            ) : (
              <span className="text-white">
                START YOUR ENGINES <span className="text-[#38BDF8]">...</span>
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono tracking-widest uppercase">
            Velocity International Circuit • Hoskote Bangalore
          </p>
        </div>

        {/* Skip button for instant entry */}
        <button
          onClick={onComplete}
          className="mt-8 text-xs font-mono text-neutral-500 hover:text-white uppercase tracking-widest underline decoration-[#0052FF] underline-offset-4 cursor-pointer transition-colors"
        >
          [ Skip to Track ]
        </button>
      </div>
    </div>
  );
};
