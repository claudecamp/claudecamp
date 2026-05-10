import { useEffect, useRef } from 'react';
import { scrollProgressBar } from '../utils/gsap-fx';

/**
 * Thin fixed bar at the top of the viewport that fills as the page scrolls.
 *
 * Usage:
 *   <ScrollProgress color="#7c3aed" height={2} />
 *
 * Props:
 *   color  — CSS color string (default: '--color-accent' purple)
 *   height — bar height in px (default 2)
 *   zIndex — default 1000
 */
export function ScrollProgress({ color = '#7c3aed', height = 2, zIndex = 1000 }) {
  const barRef = useRef(null);

  useEffect(() => {
    const cleanup = scrollProgressBar(barRef.current);
    return cleanup;
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height,
        background: color,
        zIndex,
        transformOrigin: 'left center',
        pointerEvents: 'none',
      }}
    />
  );
}
