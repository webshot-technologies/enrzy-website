// src/contexts/ScrollContext.tsx
import { createContext, useContext } from 'react';
import Lenis from '@studio-freight/lenis';

type ScrollContextType = {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: any) => void;
  stop: () => void;
  start: () => void;
};

export const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useScroll = () => useContext(ScrollContext);