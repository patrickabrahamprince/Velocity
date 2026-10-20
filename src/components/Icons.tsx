import React from 'react';

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Official Velocity F1 Race Car Silhouette Outline Logo
export const VelocityF1Logo: React.FC<{ className?: string; color?: string }> = ({ 
  className = "h-10 w-auto", 
  color = "#0052FF" 
}) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    {/* Stylized V-Speed Emblem */}
    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#003bb3] shadow-[0_0_15px_rgba(0,82,255,0.7)] text-white font-black font-syne text-2xl -skew-x-12 shrink-0">
      <span className="transform skew-x-12">V</span>
      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00F0FF] rounded-full border-2 border-[#060813]" />
    </div>

    {/* Brand Typography & F1 Silhouette */}
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-1.5 leading-none">
        <span 
          className="font-syne font-black text-xl sm:text-2xl tracking-wider uppercase italic drop-shadow-[0_0_12px_rgba(0,82,255,0.6)]"
          style={{ color }}
        >
          VELOCITY
        </span>
        
        {/* Compact F1 Silhouette */}
        <svg 
          viewBox="0 0 120 40" 
          className="w-14 sm:w-16 h-5 stroke-current fill-none"
          style={{ color }}
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* F1 Car Path */}
          <path d="M 5 28 L 25 28 L 35 24 L 55 16 L 75 16 L 85 24 L 110 26" />
          <circle cx="28" cy="28" r="8" strokeWidth="3" />
          <circle cx="95" cy="28" r="8" strokeWidth="3" />
          <path d="M 5 18 L 16 12 L 16 28" />
          <path d="M 55 16 L 62 8 L 75 10 L 78 16" />
        </svg>
      </div>

      <span 
        className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.28em] uppercase -mt-0.5"
        style={{ color: '#00F0FF' }}
      >
        INTERNATIONAL CIRCUIT
      </span>
    </div>
  </div>
);
