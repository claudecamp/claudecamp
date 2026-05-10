import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Custom cursor — dot + lagging ring with mix-blend-mode: difference.
 * Scales up on elements with data-cursor="hover".
 * Automatically disabled on touch devices.
 */
export function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('has-custom-cursor');

    const setDotX  = gsap.quickSetter(dot,  'x', 'px');
    const setDotY  = gsap.quickSetter(dot,  'y', 'px');

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDotX(mouseX);
      setDotY(mouseY);
    };

    // Ring lags behind using lerp on every frame
    const ticker = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
    };

    gsap.ticker.add(ticker);
    window.addEventListener('mousemove', onMove, { passive: true });

    // Scale up on hoverable elements
    const onEnter = () => gsap.to(ring, { scale: 2.2, duration: 0.3, ease: 'power2.out' });
    const onLeave = () => gsap.to(ring, { scale: 1,   duration: 0.3, ease: 'power2.out' });

    document.querySelectorAll('[data-cursor="hover"], a, button').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // Hide when leaving window
    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    const onEnterWindow = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    document.addEventListener('mouseleave', onLeaveWindow);
    document.addEventListener('mouseenter', onEnterWindow);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeaveWindow);
      document.removeEventListener('mouseenter', onEnterWindow);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid #fff',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
    </>
  );
}
