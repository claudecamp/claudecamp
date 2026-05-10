import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const storyRef  = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(storyRef.current, { opacity: 0, y: 32 });
      gsap.to(storyRef.current, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: storyRef.current, start: 'top 85%', once: true },
      });

      gsap.set(bottomRef.current, { opacity: 0 });
      gsap.to(bottomRef.current, {
        opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: bottomRef.current, start: 'top 90%', once: true },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer">
      <p className="footer__story" ref={storyRef}>
        <em>"I ran a Workaway mountain farm in Pai for years</em> — gardening mornings, hot springs afternoons. Then Claude Code happened. I started building real software here, between watering tomatoes and cutting bamboo. Volunteers started doing it with me. One wrote about it in her review. Claude Camp is what happens when we make that intentional — same farm, same rhythm, same Ying-cooked breakfasts, but now the morning work is shipping code with Claude instead of pulling weeds."
      </p>

      <div className="footer__bottom" ref={bottomRef}>
        <div className="footer__brand">
          <strong>Claude Camp</strong>
          Sasha & Ying · Pai, Mae Hong Son, Thailand · claudecamp.org
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.15em',
          color: 'var(--color-muted)',
          textAlign: 'right',
        }}>
          <div style={{ marginBottom: '0.3rem' }}>WhatsApp: +66 92 286 4775</div>
          <div>Nov–Feb · May–Jun · Sep–Oct</div>
          <div style={{ marginTop: '0.3rem', color: 'var(--color-border)' }}>© 2026 Claude Camp</div>
        </div>
      </div>
    </footer>
  );
}
