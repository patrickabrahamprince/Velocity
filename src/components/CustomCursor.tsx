import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const deltaX = e.clientX - lastX;
      // Calculate rotation angle based on mouse horizontal speed
      const targetRot = Math.max(-45, Math.min(45, deltaX * 1.5));
      setRotation(targetRot);
      lastX = e.clientX;

      // Check if hovering interactive elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setRotation((prev) => (prev > 0 ? 30 : -30));
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setRotation(0);
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Only show on devices with fine pointer (mouse)
  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : isHovered ? 1.25 : 1}) rotate(${rotation}deg)`,
      }}
    >
      {/* Outer Steering Wheel Ring */}
      <div className={`relative flex items-center justify-center transition-all duration-200 ${
        isHovered ? 'w-10 h-10' : 'w-8 h-8'
      }`}>
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full drop-shadow-[0_0_10px_rgba(0,82,255,0.9)] ${
            isHovered ? 'text-[#00F0FF]' : 'text-[#0052FF]'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
        >
          {/* Wheel Ring */}
          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeDasharray="50 10 50 10" />
          {/* Center Hub */}
          <circle cx="50" cy="50" r="14" fill="#060813" stroke="currentColor" strokeWidth="4" />
          {/* Spokes */}
          <line x1="10" y1="50" x2="36" y2="50" stroke="currentColor" strokeWidth="5" />
          <line x1="64" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="5" />
          <line x1="50" y1="64" x2="50" y2="90" stroke="currentColor" strokeWidth="5" />
          {/* 12 o'clock Electric Apex Marker */}
          <rect x="46" y="4" width="8" height="12" fill="#00F0FF" rx="2" />
        </svg>

        {/* Center Glow Point */}
        <div
          className={`absolute w-2 h-2 rounded-full ${
            isHovered ? 'bg-[#00F0FF] animate-ping' : 'bg-[#0052FF]'
          }`}
        />
      </div>
    </div>
  );
};
