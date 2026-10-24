// Velocity International Circuit — Native High-Performance Smooth Scroll Controller
// Provides silky-smooth 120Hz native browser scrolling without wheel hijacking or input lag

class SmoothScrollEngine {
  private listeners: Set<(scroll: number, velocity: number) => void> = new Set();
  private lastScrollY: number = 0;
  private lastTime: number = 0;
  private rafId: number | null = null;
  private velocity: number = 0;

  public init(): () => void {
    if (typeof window === 'undefined') return () => {};

    this.lastScrollY = window.scrollY;
    this.lastTime = performance.now();

    const handleScroll = () => {
      if (this.rafId) return;

      this.rafId = requestAnimationFrame(() => {
        const now = performance.now();
        const currentY = window.scrollY;
        const dt = Math.max(1, now - this.lastTime);
        const dy = currentY - this.lastScrollY;

        this.velocity = dy / dt;
        this.lastScrollY = currentY;
        this.lastTime = now;
        this.rafId = null;

        this.listeners.forEach((fn) => {
          try {
            fn(currentY, this.velocity);
          } catch {
            // Handled
          }
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (this.rafId) cancelAnimationFrame(this.rafId);
    };
  }

  public subscribe(fn: (scroll: number, velocity: number) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  public scrollTo(target: string | HTMLElement | number, options?: { offset?: number }) {
    if (typeof window === 'undefined') return;

    const offset = options?.offset ?? -70;

    if (typeof target === 'number') {
      window.scrollTo({ top: target + offset, behavior: 'smooth' });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else if (target instanceof HTMLElement) {
      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  public getVelocity(): number {
    return this.velocity;
  }
}

export const smoothScroll = new SmoothScrollEngine();
