import { useEffect, useRef } from 'react';
import { splitReveal } from '../utils/gsap-fx';

/**
 * Heading that reveals line-by-line with a clip-path wipe on scroll.
 *
 * Usage:
 *   <SplitHeading as="h1" delay={0.2}>Hello World</SplitHeading>
 *
 * Props:
 *   as        — 'h1' | 'h2' | 'h3' | 'h4'  (default 'h2')
 *   className — extra class names
 *   delay     — seconds before reveal starts (default 0)
 *   stagger   — seconds between lines (default 0.12)
 *   duration  — seconds per line (default 0.8)
 *   ease      — GSAP ease name (default 'cinematic')
 */
export function SplitHeading({
  as: Tag = 'h2',
  children,
  className = '',
  delay = 0,
  stagger = 0.12,
  duration = 0.8,
  ease = 'cinematic',
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const cleanup = splitReveal(ref.current, { delay, stagger, duration, ease });
    return cleanup;
  }, [delay, stagger, duration, ease]);

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}
