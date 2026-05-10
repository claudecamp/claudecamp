import { useEffect, useRef } from 'react';
import { infiniteMarquee } from '../utils/gsap-fx';

const ITEMS = [
  'Pai, Thailand',
  'Morning Yoga',
  'Claude Code Sessions',
  'Hot Springs',
  'Communal Dinners',
  'Tham Lod Cave',
  'Soak. Stretch. Ship.',
  'Nov 2026',
  'Max 7 Guests',
];

export function MarqueeBanner() {
  const trackRef = useRef(null);

  useEffect(() => {
    const cleanup = infiniteMarquee(trackRef.current, { speed: 40, direction: 'left', pauseOnHover: false });
    return cleanup;
  }, []);

  return (
    <div className="marquee-section">
      <div className="marquee-track" ref={trackRef}>
        {ITEMS.map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-item__dot" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
