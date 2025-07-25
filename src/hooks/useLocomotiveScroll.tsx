// src/hooks/useLocomotiveScroll.ts
import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css"; // Import the CSS

interface LocomotiveScrollOptions {
  el?: React.MutableRefObject<HTMLElement | null>;
  name?: string;
  offset?: number[];
  repeat?: boolean;
  smooth?: boolean;
  direction?: 'vertical' | 'horizontal';
  initOnTouch?: boolean;
  getDirection?: boolean;
  getSpeed?: boolean;
  lerp?: number;
  class?: string;
  initElements?: boolean;
  scroller?: string | HTMLElement;
  smoothMobile?: boolean;
  resetNativeScroll?: boolean;
  multiplier?: number;
  firefoxMultiplier?: number;
  touchMultiplier?: number;
  mouseMultiplier?: number;
  smartphone?: { smooth?: boolean };
  tablet?: { smooth?: boolean };
  // Add other options as needed from Locomotive Scroll documentation
}

const useLocomotiveScroll = (options: LocomotiveScrollOptions = {}) => {
  const scrollRef = useRef<HTMLElement | null>(null); // Ref to attach to your scroll container
  const ls = useRef<LocomotiveScroll | null>(null); // Ref to store the LocomotiveScroll instance

  useEffect(() => {
    // Make sure LocomotiveScroll is imported correctly
    if (typeof window === "undefined" || !scrollRef.current) {
      return;
    }

    ls.current = new LocomotiveScroll({
      el: scrollRef.current, // The element that will be scrolled
      smooth: true, // Enable smooth scrolling
      multiplier: 1, // Adjust scroll speed
      class: 'is-reveal', // Class added when an element enters the viewport
      initOnTouch: false, // Prevents issues on touch devices, you might need to adjust
      // ... default options or spread provided options
      ...options,
    });

    // Update Locomotive Scroll whenever layout changes (e.g., images load, content changes)
    const handleResize = () => {
      if (ls.current) {
        ls.current.update();
      }
    };
    window.addEventListener('resize', handleResize);

    // Destroy Locomotive Scroll instance on component unmount
    return () => {
      if (ls.current) {
        ls.current.destroy();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [options]);

  return { scrollRef, lsInstance: ls.current };
};

export default useLocomotiveScroll;