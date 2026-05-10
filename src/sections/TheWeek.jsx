import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitHeading } from '../components/SplitHeading';

gsap.registerPlugin(ScrollTrigger);

const EXCURSIONS = [
  {
    day: 'Arrival',
    label: 'Sai Sin Blessing',
    desc: 'A monk ties a sacred white string on each wrist. Most guests keep it for a year.',
  },
  {
    day: 'Tuesday',
    label: 'Pai Canyon at Sunset',
    desc: '8km away. The canyon at dusk. The best hour in Pai.',
  },
  {
    day: 'Wednesday',
    label: 'Tham Lod Cave',
    desc: 'Underground river by lantern. 2,000-year-old teak coffins. Bat exodus at sunset.',
  },
  {
    day: 'Friday',
    label: 'Cooking Class',
    desc: 'Charlie & Lek\'s. Mortar-and-pestle curry. The "I made something with my hands" reset.',
  },
  {
    day: 'Saturday',
    label: 'Closing Dinner',
    desc: 'Reverie Siam. Hand-printed certificate on Saa paper. Krathong send-off on the river.',
  },
];

export function TheWeek() {
  const eyebrowRef = useRef(null);
  const bodyRef    = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      gsap.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: eyebrowRef.current, start: 'top 85%', once: true },
      });

      bodyRef.current?.querySelectorAll('p').forEach((p, i) => {
        gsap.set(p, { opacity: 0, y: 24 });
        gsap.to(p, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: p, start: 'top 85%', once: true },
        });
      });

      gridRef.current?.querySelectorAll('.excursion-card').forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 32 });
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="day-section" style={{
      background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 55%)',
      borderTop: '1px solid var(--color-border)',
    }}>
      <span className="eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>
        09 — The Full Week
      </span>

      <div className="grid-2" style={{ marginBottom: '5rem' }}>
        <div>
          <SplitHeading as="h2" className="day-section__headline">
            Five anchor moments you don't forget.
          </SplitHeading>
        </div>
        <div ref={bodyRef}>
          <p className="day-section__body">
            The daily rhythm repeats. The week doesn't. Each day has its own excursion built in — not tourist activities, but experiences that only exist because you're in Pai and not somewhere else.
          </p>
          <p className="day-section__body" style={{ marginTop: '1rem' }}>
            Every item in your welcome basket connects to a place or person you'll meet that week.
          </p>
        </div>
      </div>

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1px',
          background: 'var(--color-border)',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        {EXCURSIONS.map((ex, i) => (
          <div
            key={i}
            className="excursion-card"
            style={{
              background: 'var(--color-bg)',
              padding: '2rem',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '0.75rem',
            }}>
              {ex.day}
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '1.2rem',
              color: 'var(--color-text)',
              marginBottom: '0.6rem',
              lineHeight: 1.3,
            }}>
              {ex.label}
            </div>
            <div style={{
              fontSize: '0.82rem',
              lineHeight: 1.65,
              color: 'var(--color-muted)',
            }}>
              {ex.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
