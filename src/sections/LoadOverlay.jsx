import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function LoadOverlay({ onComplete }) {
  const overlayRef  = useRef(null);
  const wordmarkRef = useRef(null);

  useEffect(() => {
    const overlay  = overlayRef.current;
    const wordmark = wordmarkRef.current;

    const tl = gsap.timeline();

    // 0.4s — wordmark fades in
    tl.to(wordmark, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.4)
      // 1.6s — hold, then overlay wipes upward
      .to(overlay, {
        scaleY: 0,
        duration: 0.9,
        ease: 'power3.inOut',
        transformOrigin: 'top center',
        delay: 1.0,
      })
      .set(overlay, { display: 'none' })
      .call(() => onComplete?.());

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="load-overlay" ref={overlayRef}>
      <span className="load-wordmark" ref={wordmarkRef}>
        Claude Camp
      </span>
    </div>
  );
}
