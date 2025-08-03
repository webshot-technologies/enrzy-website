// src/components/LenisProvider.jsx
import { ReactLenis } from '@studio-freight/react-lenis';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LenisProvider = ({ children }) => {
  useEffect(() => {
    // This is the core synchronization between Lenis and GSAP
    const lenis = new ReactLenis({});

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <ReactLenis root>{children}</ReactLenis>;
};

export default LenisProvider;