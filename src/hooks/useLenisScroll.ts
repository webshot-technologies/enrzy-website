import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenisScroll = () => {
  useEffect(() => {
    // Initialize Lenis with proper TypeScript types
    const lenis = new Lenis({
      duration: 5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchInertiaMultiplier: 1,  // Changed from touchMultiplier
      wheelMultiplier: .5,  // Explicitly set wheel multiplier
      touchMultiplier: 6,
      autoResize: true,  // Keep this if needed, but touchInertiaMultiplier is more commonly used
    } as any);  // Using type assertion as a last resort if TypeScript still complains

    // Update Lenis on RAF
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);
};