import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TimeDivider({ time }) {
  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: labelRef.current,
          start: 'top 88%',
          once: true,
        },
      });

      tl.to(leftRef.current,  { scaleX: 1, duration: 0.9, ease: 'power3.out' }, 0)
        .to(rightRef.current, { scaleX: 1, duration: 0.9, ease: 'power3.out' }, 0)
        .to(labelRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.3);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="time-divider" style={{ padding: '0 6vw' }}>
      <div className="time-divider__line" ref={leftRef} />
      <span className="time-divider__label" ref={labelRef}>{time}</span>
      <div className="time-divider__line time-divider__line--right" ref={rightRef} />
    </div>
  );
}
