import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitHeading } from '../components/SplitHeading';
import { MagneticButton } from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const INCLUDED = [
  { icon: '☀', label: '7 nights accommodation',   note: 'Bamboo bungalow or motel room' },
  { icon: '◎', label: 'Daily morning yoga',        note: 'Village instructor, open-air deck' },
  { icon: '⌘', label: 'Claude Code sessions',      note: 'Mon–Fri, 09:00–12:00' },
  { icon: '◈', label: 'All meals',                 note: 'Breakfast + lunch by Ying, communal dinners' },
  { icon: '〜', label: 'Hot springs entry',         note: 'Daily at 16:00, ฿300/day included' },
  { icon: '◇', label: 'Welcome basket',            note: 'Pai coffee, Saa journal, local goods' },
  { icon: '◉', label: 'All 5 excursions',          note: 'Cave, canyon, cooking class, closing dinner' },
  { icon: '◌', label: 'Closing certificate',       note: 'Hand-printed on Saa paper' },
  { icon: '✦', label: 'Cohort community access',   note: 'Discord + alumni network forever' },
];

export function TheOffer() {
  const eyebrowRef  = useRef(null);
  const introRef    = useRef(null);
  const cardsRef    = useRef(null);
  const gridRef     = useRef(null);
  const datesRef    = useRef(null);
  const formRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fade = (el, delay = 0) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 20 });
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.7, delay, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      };

      fade(eyebrowRef.current);
      fade(introRef.current, 0.1);

      cardsRef.current?.querySelectorAll('.pricing-card').forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 40 });
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      gridRef.current?.querySelectorAll('.included-item').forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 20 });
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });

      datesRef.current?.querySelectorAll('.date-item').forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 16 });
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      fade(formRef.current, 0.2);
    });

    return () => ctx.revert();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) return;
    const btn = e.target.querySelector('button');
    btn.textContent = 'You\'re on the list.';
    btn.disabled = true;
    e.target.email.value = '';
  }

  return (
    <section className="offer" id="waitlist">
      <span className="eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>10 — The Offer</span>

      <div className="grid-2" style={{ marginBottom: '4rem', alignItems: 'end' }}>
        <SplitHeading as="h2" className="offer__headline">
          One week. Seven beds. One cohort.
        </SplitHeading>
        <p className="offer__intro" ref={introRef} style={{ opacity: 0, margin: 0 }}>
          Claude Camp runs 6–8 cohorts a year in Pai, Thailand. Small by design — the cohort is 7 people maximum. You're not attending a conference. You're spending a week with people who want to build.
        </p>
      </div>

      {/* Pricing */}
      <div className="pricing-cards" ref={cardsRef}>
        <div className="pricing-card">
          <div className="pricing-card__badge">Standard · Year 1 Founding Price</div>
          <div className="pricing-card__price">$1,100</div>
          <div className="pricing-card__price-note">per person · 7 nights</div>
          <p className="pricing-card__desc">
            All accommodation, meals, yoga, Claude Code sessions, excursions, hot springs, and welcome basket. Everything. One price.
          </p>
        </div>

        <div className="pricing-card pricing-card--featured">
          <div className="pricing-card__badge">Premium · 1:1 Mentoring</div>
          <div className="pricing-card__price">$1,600</div>
          <div className="pricing-card__price-note">per person · 7 nights</div>
          <p className="pricing-card__desc">
            Everything in Standard, plus daily 30-minute 1:1 sessions with Sasha. Your project, your blockers, your specific use case. For founders and serious builders.
          </p>
        </div>
      </div>

      {/* What's included */}
      <span className="eyebrow" style={{ marginBottom: '1.5rem', display: 'block' }}>Everything included</span>
      <div className="included-grid" ref={gridRef}>
        {INCLUDED.map((item, i) => (
          <div key={i} className="included-item">
            <div className="included-item__icon">{item.icon}</div>
            <div className="included-item__label">{item.label}</div>
            <div className="included-item__note">{item.note}</div>
          </div>
        ))}
      </div>

      {/* Dates */}
      <span className="eyebrow" style={{ marginBottom: '1.5rem', display: 'block' }}>Cohort 1 dates</span>
      <div className="dates-row" ref={datesRef}>
        {[
          { label: 'Arrival',   value: 'Nov 8, 2026',  status: 'Cohort 1 — 4 spots open' },
          { label: 'Departure', value: 'Nov 15, 2026', status: null },
          { label: 'Cohort 2',  value: 'Dec 2026',     status: 'Dates TBD' },
          { label: 'Cohort 3',  value: 'Jan 2027',     status: 'Dates TBD' },
        ].map((d, i) => (
          <div key={i} className="date-item">
            <div className="date-item__label">{d.label}</div>
            <div className="date-item__value">{d.value}</div>
            {d.status && <div className="date-item__status">{d.status}</div>}
          </div>
        ))}
      </div>

      {/* Waitlist form */}
      <div ref={formRef} style={{ opacity: 0 }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-muted)',
          marginBottom: '1.25rem',
        }}>
          Join the waitlist — we'll reach out before spots open publicly
        </p>

        <form className="waitlist-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="waitlist-input"
            placeholder="your@email.com"
            required
          />
          <MagneticButton
            strength={0.4}
            style={{
              background: 'var(--color-accent)',
              color: '#000',
              fontWeight: 600,
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
              border: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Join waitlist
          </MagneticButton>
        </form>

        <p className="waitlist-note">
          No spam. We write one email when spots open. That's it.
        </p>
      </div>
    </section>
  );
}
