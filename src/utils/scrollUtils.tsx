import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Utility to ensure proper ScrollTrigger refresh with Lenis
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

// Utility for smooth scroll to element with Lenis integration
export const scrollToElement = (selector: string, offset: number = 0) => {
  const element = document.querySelector(selector);
  if (element) {
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementTop - offset,
      behavior: 'auto' // Let Lenis handle the smoothness
    });
  }
};

// Debounced resize handler for better performance
export const createResizeHandler = (callback: () => void, delay: number = 250) => {
  let timeoutId: NodeJS.Timeout;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};

// Enhanced scroll animation with better Lenis integration
export const createScrollAnimation = (
  trigger: gsap.DOMTarget,
  animations: gsap.TweenVars,
  options: ScrollTrigger.Vars = {}
) => {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none play reverse',
      ...options,
      // Ensure proper refresh with Lenis
      onRefresh: () => ScrollTrigger.refresh(),
    },
  }).fromTo(trigger, 
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', ...animations }
  );
};