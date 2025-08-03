import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// import { useEffect } from 'react';
// import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useLenisScroll = () => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with optimized settings for smooth scrolling
    const lenis = new Lenis({
      duration: .3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
     
    });

    // Connect Lenis with GSAP ScrollTrigger for seamless animation integration
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis ticker to GSAP for proper synchronization
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing for better performance
    gsap.ticker.lagSmoothing(0);

    // Cleanup function
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);
};