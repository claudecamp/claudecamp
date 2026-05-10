import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MagneticButton } from '../components/MagneticButton';
import { splitReveal } from '../utils/gsap-fx';

export function Hero() {
  const bgRef       = useRef(null);
  const eyebrowRef  = useRef(null);
  const headlineRef = useRef(null);
  const subRef      = useRef(null);
  const actionsRef  = useRef(null);
  const scrollRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.4 });

      // Ken Burns on bg
      gsap.set(bgRef.current, { scale: 1.05 });
      gsap.to(bgRef.current, {
        scale: 1,
        duration: 4,
        ease: 'power2.out',
        delay: 1.8,
      });

      // Reveal sequence
      tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0)
        .call(() => splitReveal(headlineRef.current, { delay: 0, duration: 0.9 }), null, 0.15)
        .to(subRef.current,     { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.55)
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.75)
        .to(scrollRef.current,  { opacity: 1,        duration: 0.6 }, 1.2);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero">
      <div className="hero__bg" ref={bgRef} />
      <div className="hero__noise" />

      <div className="hero__content">
        <span
          className="eyebrow"
          ref={eyebrowRef}
          style={{ opacity: 0, transform: 'translateY(12px)' }}
        >
          01 — A Day in Pai · Pai, Thailand
        </span>

        <h1 className="hero__headline" ref={headlineRef}>
          Seven days that change how you build.
        </h1>

        <p
          className="hero__sub"
          ref={subRef}
          style={{ opacity: 0, transform: 'translateY(16px)' }}
        >
          <span>Soak.</span> &nbsp;Stretch. &nbsp;Ship. &nbsp;—&nbsp; Cohort 1 · Nov 2026
        </p>

        <div
          className="hero__actions"
          ref={actionsRef}
          style={{ opacity: 0, transform: 'translateY(16px)' }}
        >
          <MagneticButton
            strength={0.4}
            className="btn-primary"
            style={{
              background: 'var(--color-accent)',
              color: '#000',
              fontWeight: 600,
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
              border: 'none',
            }}
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join the waitlist
          </MagneticButton>

          <MagneticButton
            strength={0.3}
            onClick={() => document.getElementById('the-day')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See the day ↓
          </MagneticButton>
        </div>
      </div>

      <span
        className="hero__scroll-hint"
        ref={scrollRef}
      >
        Scroll to live the day
      </span>
    </section>
  );
}
