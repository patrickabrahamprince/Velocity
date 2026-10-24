import React, { useEffect, useState, useRef } from 'react';

interface CursorGlowProps {
  isDark?: boolean;
}

export const CursorGlow: React.FC<CursorGlowProps> = ({ isDark = false }) => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Target mouse position
  const mouseRef = useRef({ x: -100, y: -100 });
  // Interpolated position for smooth trailing aura
  const auraRef = useRef({ x: -100, y: -100 });
  const auraElementRef = useRef<HTMLDivElement>(null);
  const dotElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on devices that have fine pointer (mouse / trackpad)
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsPointerDevice(mediaQuery.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    mediaQuery.addEventListener('change', handlePointerChange);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Update global CSS variables for card spotlight illumination
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .apple-glass-card, .hover-target');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 60FPS Lerp Animation Loop
    let animId: number;
    const loop = () => {
      // Linear interpolation factor (0.15 = smooth elastic lag)
      auraRef.current.x += (mouseRef.current.x - auraRef.current.x) * 0.15;
      auraRef.current.y += (mouseRef.current.y - auraRef.current.y) * 0.15;

      if (auraElementRef.current) {
        auraElementRef.current.style.transform = `translate3d(${auraRef.current.x}px, ${auraRef.current.y}px, 0)`;
      }

      if (dotElementRef.current) {
        dotElementRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      mediaQuery.removeEventListener('change', handlePointerChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* 1. Ambient Mouse Spotlight Aura (Soft radial glow illuminating page) */}
      <div
        ref={auraElementRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full w-[440px] h-[440px] blur-[85px] z-20 transition-opacity duration-300 will-change-transform ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isDark
            ? 'bg-[radial-gradient(circle,rgba(0,102,255,0.18)_0%,rgba(0,210,255,0.08)_40%,transparent_70%)]'
            : 'bg-[radial-gradient(circle,rgba(0,102,255,0.12)_0%,rgba(2,132,199,0.06)_45%,transparent_75%)]'
        }`}
      />

      {/* 2. Precision Interactive Magnetic Cursor Ring */}
      <div
        ref={dotElementRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 rounded-full transition-all duration-150 ease-out will-change-transform ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? 'w-11 h-11 border-2 border-[#0066FF] bg-[#0066FF]/15 backdrop-blur-[2px] scale-110 shadow-lg shadow-blue-500/20'
            : isPressed
            ? 'w-4 h-4 border border-[#0066FF] bg-[#0066FF] scale-90'
            : 'w-6 h-6 border border-[#0066FF]/60 bg-[#0066FF]/5'
        }`}
      >
        {/* Inner center dot */}
        <span
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF] transition-all duration-150 ${
            isHovered ? 'w-1.5 h-1.5 opacity-80' : 'w-1 h-1 opacity-100'
          }`}
        />
      </div>
    </>
  );
};
