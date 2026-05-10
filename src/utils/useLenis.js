import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Drop useLenis() into any App root component — one call wires
 * Lenis smooth scroll to GSAP's ticker so ScrollTrigger stays in sync.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function onRaf(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0); // Lenis handles its own lag smoothing
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
    };
  }, []);
}
