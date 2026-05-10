import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitHeading } from '../components/SplitHeading';
import { TimeDivider } from '../components/TimeDivider';

gsap.registerPlugin(ScrollTrigger);

function fadeIn(el, delay = 0) {
  if (!el) return;
  gsap.set(el, { opacity: 0, y: 24 });
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
  });
}

function Section({ eyebrow, headline, children, accent, id, right }) {
  const eyebrowRef = useRef(null);
  const bodyRef    = useRef(null);
  const detailRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      fadeIn(eyebrowRef.current);

      if (bodyRef.current) {
        bodyRef.current.querySelectorAll('p').forEach((p, i) => fadeIn(p, i * 0.1));
      }

      if (detailRef.current) {
        detailRef.current.querySelectorAll('.day-section__detail-item').forEach((el, i) => {
          gsap.set(el, { opacity: 0, x: -16 });
          gsap.to(el, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="day-section" id={id} style={accent ? { background: `radial-gradient(ellipse at ${right ? '80%' : '20%'} 50%, rgba(245,158,11,0.05) 0%, transparent 60%)` } : {}}>
      <div className={`grid-2${right ? ' grid-2--reverse' : ''}`} style={right ? { direction: 'rtl' } : {}}>
        <div style={right ? { direction: 'ltr' } : {}}>
          <span className="eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>
            {eyebrow}
          </span>
          <SplitHeading as="h2" className="day-section__headline">
            {headline}
          </SplitHeading>
          <div ref={bodyRef}>
            {children}
          </div>
        </div>
        <div ref={detailRef} />
      </div>
    </section>
  );
}

export function DayStory() {
  const tracksRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (tracksRef.current) {
        tracksRef.current.querySelectorAll('.track').forEach((el, i) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="the-day">

      {/* ── 06:30 Wake ────────────────────────────────────── */}
      <TimeDivider time="06:30" />

      <section className="day-section">
        <div className="grid-2">
          <div>
            <WakeSection />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '3rem' }}>
            <DetailList items={[
              'Mountain mist over Pai Canyon',
              'Coffee from Mr. Jan\'s farm, two minutes away',
              'No agenda until 07:00',
              'Ying\'s kitchen light is already on',
            ]} />
          </div>
        </div>
      </section>

      {/* ── 07:00 Yoga ────────────────────────────────────── */}
      <TimeDivider time="07:00 → 08:30" />

      <section className="day-section" style={{ background: 'radial-gradient(ellipse at 70% 40%, rgba(20,184,166,0.06) 0%, transparent 55%)' }}>
        <div className="grid-2">
          <div>
            <YogaSection />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DetailList items={[
              'Bamboo deck, open-air, mountain view',
              'Village instructor — same teacher, every morning',
              'No screens until 09:00',
              'The body before the code',
            ]} />
          </div>
        </div>
      </section>

      {/* ── 09:00 Code ────────────────────────────────────── */}
      <TimeDivider time="09:00 → 12:00" />

      <section className="day-section" id="code">
        <CodeSection tracksRef={tracksRef} />
      </section>

      {/* ── 12:30 Lunch ───────────────────────────────────── */}
      <TimeDivider time="12:30" />

      <section className="day-section" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(245,158,11,0.06) 0%, transparent 55%)' }}>
        <div className="grid-2">
          <div>
            <LunchSection />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DetailList items={[
              'Thai home cooking by Ying',
              'Communal table — no phones, no laptops',
              'Genuine conversation, not networking',
              'Same lunch you\'d have at the farm',
            ]} />
          </div>
        </div>
      </section>

      {/* ── 13:00 Build ───────────────────────────────────── */}
      <TimeDivider time="13:00 → 16:00" />

      <section className="day-section">
        <div className="grid-2">
          <div>
            <BuildSection />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DetailList items={[
              'Your project, your pace',
              'Sasha available for 1:1 unblocking',
              'Laptop on the teak deck if you want',
              'This is where the real learning happens',
            ]} />
          </div>
        </div>
      </section>

      {/* ── 16:00 Hot Springs ─────────────────────────────── */}
      <TimeDivider time="16:00" />

      <section className="day-section" style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(20,184,166,0.07) 0%, transparent 55%)' }}>
        <div className="grid-2">
          <div>
            <SpringsSection />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DetailList items={[
              '4-minute walk from the front gate',
              '฿300 per person — included in your week',
              'Hot mineral water, mountain backdrop',
              'The day\'s code leaves your body here',
            ]} />
          </div>
        </div>
      </section>

      {/* ── 19:00 Dinner & Demo ───────────────────────────── */}
      <TimeDivider time="19:00" />

      <section className="day-section">
        <div className="grid-2">
          <div>
            <DemoSection />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DetailList items={[
              'No slides. Just a laptop and a story.',
              'What you built. What broke. What you\'d do differently.',
              'The cohort learns more here than in any session',
              'Ying\'s dinner is always better the second plate',
            ]} />
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── Individual section content ───────────────────── */

function WakeSection() {
  const eyebrowRef  = useRef(null);
  const bodyRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      fadeIn(eyebrowRef.current);
      bodyRef.current?.querySelectorAll('p').forEach((p, i) => fadeIn(p, i * 0.1));
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <span className="eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>02 — Wake</span>
      <SplitHeading as="h2" className="day-section__headline">
        Before the code, the body.
      </SplitHeading>
      <div ref={bodyRef}>
        <p className="day-section__body">
          The mountains are still in mist when the farm wakes up. You don't have to be anywhere until seven. There's coffee — locally grown, two minutes away — and a deck that looks north toward Pai Canyon.
        </p>
        <p className="day-section__body">
          This is not a hustle retreat. The morning has its own rhythm. You'll feel it by day two.
        </p>
      </div>
    </>
  );
}

function YogaSection() {
  const eyebrowRef = useRef(null);
  const bodyRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      fadeIn(eyebrowRef.current);
      bodyRef.current?.querySelectorAll('p').forEach((p, i) => fadeIn(p, i * 0.1));
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <span className="eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>03 — Yoga</span>
      <SplitHeading as="h2" className="day-section__headline">
        No screens until nine.
      </SplitHeading>
      <div ref={bodyRef}>
        <p className="day-section__body">
          Every morning begins the same way. Bamboo deck. Open sky. The same village instructor who has been here longer than you will be.
        </p>
        <p className="day-section__body">
          You cannot skip yoga to code. That's the rule. The structure is the point — when the morning is non-negotiable, the afternoon becomes remarkably focused.
        </p>
      </div>
    </>
  );
}

function CodeSection({ tracksRef }) {
  const eyebrowRef = useRef(null);
  const bodyRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      fadeIn(eyebrowRef.current);
      bodyRef.current?.querySelectorAll('p').forEach((p, i) => fadeIn(p, i * 0.1));
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <span className="eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>04 — Claude Code Sessions</span>
      <SplitHeading as="h2" className="day-section__headline">
        Then we build.
      </SplitHeading>
      <div ref={bodyRef}>
        <p className="day-section__body">
          Three focused hours with Sasha. Real prompts, real projects, real feedback. Not a workshop where you copy what's on screen — a working session where you're building something that matters to you.
        </p>
        <p className="day-section__body">
          Two tracks run simultaneously. You choose before you arrive. You can switch after day one if it isn't right.
        </p>
      </div>

      <div className="tracks" ref={tracksRef}>
        <div className="track">
          <div className="track__label">Track A</div>
          <div className="track__name">Beginner</div>
          <p className="track__desc">
            Non-coders learning to build real software with Claude Code. No prior experience needed — just a project you want to exist.
          </p>
          <ul className="track__items">
            <li>What Claude Code actually is and isn't</li>
            <li>Your first working app by day 2</li>
            <li>How to prompt for architecture, not just code</li>
            <li>Debugging with Claude as a thinking partner</li>
            <li>Ship something real before Saturday</li>
          </ul>
        </div>

        <div className="track">
          <div className="track__label">Track B</div>
          <div className="track__name">Builder</div>
          <p className="track__desc">
            Developers leveling up their Claude Code workflow — agents, MCPs, and production-grade prompting at speed.
          </p>
          <ul className="track__items">
            <li>CLAUDE.md and project memory patterns</li>
            <li>Building and connecting MCP servers</li>
            <li>Multi-agent workflows that don't break</li>
            <li>Hooks, permissions, and custom commands</li>
            <li>The agentic loop: when to trust, when to guide</li>
          </ul>
        </div>
      </div>
    </>
  );
}

function LunchSection() {
  const eyebrowRef = useRef(null);
  const bodyRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      fadeIn(eyebrowRef.current);
      bodyRef.current?.querySelectorAll('p').forEach((p, i) => fadeIn(p, i * 0.1));
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <span className="eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>05 — Lunch</span>
      <SplitHeading as="h2" className="day-section__headline">
        Ying cooks. You rest.
      </SplitHeading>
      <div ref={bodyRef}>
        <p className="day-section__body">
          The communal table has no agenda. No networking, no pitching, no laptops. Ying's Thai home cooking has been feeding volunteers at this farm for years. You're eating the same food.
        </p>
        <p className="day-section__body">
          That is not an accident. This is a house where people feel at home. The food is part of it.
        </p>
      </div>
    </>
  );
}

function BuildSection() {
  const eyebrowRef = useRef(null);
  const bodyRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      fadeIn(eyebrowRef.current);
      bodyRef.current?.querySelectorAll('p').forEach((p, i) => fadeIn(p, i * 0.1));
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <span className="eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>06 — Self-directed Build</span>
      <SplitHeading as="h2" className="day-section__headline">
        Your project. Your pace.
      </SplitHeading>
      <div ref={bodyRef}>
        <p className="day-section__body">
          Three hours of structured session in the morning gives you the vocabulary. The afternoon is where you use it. Open laptop, whatever you're building, Sasha nearby for unblocking but not hovering.
        </p>
        <p className="day-section__body">
          Most people do their best work of the week on day three. Something clicks in the afternoon that couldn't have clicked in the morning.
        </p>
      </div>
    </>
  );
}

function SpringsSection() {
  const eyebrowRef = useRef(null);
  const bodyRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      fadeIn(eyebrowRef.current);
      bodyRef.current?.querySelectorAll('p').forEach((p, i) => fadeIn(p, i * 0.1));
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <span className="eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>07 — Hot Springs</span>
      <SplitHeading as="h2" className="day-section__headline">
        Four minutes from the front gate.
      </SplitHeading>
      <div ref={bodyRef}>
        <p className="day-section__body">
          Every afternoon at four, the group walks over together. Hot mineral water, steam, the sound of actual silence. ฿300 included in your week.
        </p>
        <p className="day-section__body">
          This is not optional. This is where the code stops living in your head. The conversations that happen in the water are different from the conversations at the desk.
        </p>
      </div>
    </>
  );
}

function DemoSection() {
  const eyebrowRef = useRef(null);
  const bodyRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      fadeIn(eyebrowRef.current);
      bodyRef.current?.querySelectorAll('p').forEach((p, i) => fadeIn(p, i * 0.1));
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <span className="eyebrow" ref={eyebrowRef} style={{ opacity: 0 }}>08 — Dinner + Demo</span>
      <SplitHeading as="h2" className="day-section__headline">
        Show what you built today.
      </SplitHeading>
      <div ref={bodyRef}>
        <p className="day-section__body">
          No decks. No performance. Just laptops open at the dinner table — show the thing, say what worked and what didn't, take one question.
        </p>
        <p className="day-section__body">
          Seven people watching someone else build is worth more than three hours of reading about it. The cohort learns from each other more than they learn from the sessions. That's the design.
        </p>
      </div>
    </>
  );
}

function DetailList({ items }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ref.current?.querySelectorAll('.day-section__detail-item').forEach((el, i) => {
        gsap.set(el, { opacity: 0, x: -16 });
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: i * 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="day-section__detail" ref={ref}>
      {items.map((item, i) => (
        <div key={i} className="day-section__detail-item">{item}</div>
      ))}
    </div>
  );
}
