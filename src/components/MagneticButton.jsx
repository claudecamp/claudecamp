import { useEffect, useRef } from 'react';
import { magneticHover } from '../utils/gsap-fx';

/**
 * Button (or link) that magnetically follows the cursor and snaps back.
 *
 * Usage:
 *   <MagneticButton onClick={fn}>Apply Now</MagneticButton>
 *   <MagneticButton href="/apply" strength={0.4}>Apply Now</MagneticButton>
 *
 * Props:
 *   href      — renders as <a> if provided, otherwise <button>
 *   strength  — magnetic pull strength 0–1 (default 0.3)
 *   className — extra class names
 */
export function MagneticButton({
  children,
  href,
  strength = 0.3,
  className = '',
  style = {},
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const cleanup = magneticHover(ref.current, strength);
    return cleanup;
  }, [strength]);

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 2rem',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'transparent',
    color: 'inherit',
    fontSize: '0.9rem',
    letterSpacing: '0.05em',
    fontFamily: 'inherit',
    cursor: 'none',
    transition: 'background 0.2s ease, border-color 0.2s ease',
    ...style,
  };

  if (href) {
    return (
      <a ref={ref} href={href} style={baseStyle} className={className} data-cursor="hover" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref} style={baseStyle} className={className} data-cursor="hover" {...props}>
      {children}
    </button>
  );
}
