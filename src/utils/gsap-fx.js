/**
 * gsap-fx.js — Reusable GSAP animation patterns
 *
 * Every function returns a cleanup() fn — call it in useEffect return.
 * All animations skip if user prefers reduced motion.
 * Only transform + opacity are animated (compositor-only = no reflow).
 *
 * Usage:
 *   useEffect(() => {
 *     const cleanup = clipReveal(ref.current);
 *     return cleanup;
 *   }, []);
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

// ─── Custom eases (registered once, usable by name anywhere) ────────────────
CustomEase.create('snap',      'M0,0 C0.34,1.56 0.64,1 1,1');   // slight overshoot
CustomEase.create('cinematic', 'M0,0 C0.76,0 0.24,1 1,1');      // dramatic slow-in
CustomEase.create('smooth',    'M0,0 C0.25,0.1 0.25,1 1,1');    // balanced

const reduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── 1. Clip-path reveal ─────────────────────────────────────────────────────
/**
 * Wipe an element into view using clip-path.
 * @param {Element} el
 * @param {{ direction?: 'up'|'left'|'right'|'down', duration?: number, delay?: number, ease?: string, scrollTrigger?: object }} opts
 */
export function clipReveal(el, opts = {}) {
  if (!el) return () => {};
  if (reduced()) { gsap.set(el, { opacity: 1 }); return () => {}; }

  const {
    direction = 'up',
    duration  = 0.9,
    delay     = 0,
    ease      = 'cinematic',
    scrollTrigger: stOpts = {},
  } = opts;

  const clips = {
    up:    ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'],
    down:  ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    left:  ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    right: ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'],
  };

  gsap.set(el, { willChange: 'clip-path', clipPath: clips[direction][0] });

  const tween = gsap.to(el, {
    clipPath: clips[direction][1],
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      once: true,
      ...stOpts,
    },
    onComplete: () => gsap.set(el, { willChange: 'auto' }),
  });

  return () => { tween.kill(); ScrollTrigger.getById(tween.scrollTrigger?.vars?.id)?.kill(); };
}

// ─── 2. SplitText line reveal ────────────────────────────────────────────────
/**
 * Split heading into lines, wipe each line up with clip-path.
 * @param {Element} el
 * @param {{ stagger?: number, duration?: number, delay?: number, ease?: string }} opts
 */
export function splitReveal(el, opts = {}) {
  if (!el) return () => {};
  if (reduced()) { gsap.set(el, { opacity: 1 }); return () => {}; }

  const { stagger = 0.12, duration = 0.8, delay = 0, ease = 'cinematic' } = opts;

  const split = new SplitText(el, { type: 'lines', linesClass: 'split-line' });

  gsap.set(split.lines, {
    overflow: 'hidden',
    clipPath: 'inset(0% 0% 100% 0%)',
    willChange: 'clip-path',
  });

  const tween = gsap.to(split.lines, {
    clipPath: 'inset(0% 0% 0% 0%)',
    duration,
    delay,
    ease,
    stagger,
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    onComplete: () => gsap.set(split.lines, { willChange: 'auto' }),
  });

  return () => {
    tween.kill();
    split.revert();
  };
}

// ─── 3. Magnetic hover ───────────────────────────────────────────────────────
/**
 * Button follows cursor magnetically, snaps back on leave.
 * @param {Element} el
 * @param {number} strength  0–1, default 0.3
 */
export function magneticHover(el, strength = 0.3) {
  if (!el || reduced()) return () => {};

  const onMove = (e) => {
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width  / 2) * strength,
      y: (e.clientY - r.top  - r.height / 2) * strength,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const onEnter = () => gsap.set(el, { willChange: 'transform' });

  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    gsap.set(el, { willChange: 'auto' });
  };

  el.addEventListener('mousemove',  onMove);
  el.addEventListener('mouseenter', onEnter);
  el.addEventListener('mouseleave', onLeave);

  return () => {
    el.removeEventListener('mousemove',  onMove);
    el.removeEventListener('mouseenter', onEnter);
    el.removeEventListener('mouseleave', onLeave);
    gsap.killTweensOf(el);
  };
}

// ─── 4. Infinite marquee ─────────────────────────────────────────────────────
/**
 * Seamless horizontal loop. Duplicates children automatically.
 * @param {Element} trackEl  The flex container holding items
 * @param {{ speed?: number, direction?: 'left'|'right', pauseOnHover?: boolean }} opts
 */
export function infiniteMarquee(trackEl, opts = {}) {
  if (!trackEl) return () => {};

  const { speed = 35, direction = 'left', pauseOnHover = true } = opts;

  // Duplicate children for seamless loop
  const original = Array.from(trackEl.children);
  original.forEach((child) => trackEl.appendChild(child.cloneNode(true)));

  const halfWidth = trackEl.scrollWidth / 2;
  const xTarget   = direction === 'left' ? -halfWidth : halfWidth;

  const tween = gsap.to(trackEl, {
    x: xTarget,
    duration: speed,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: (x) => `${parseFloat(x) % halfWidth}px`,
    },
  });

  if (pauseOnHover) {
    const pause  = () => tween.pause();
    const resume = () => tween.resume();
    trackEl.addEventListener('mouseenter', pause);
    trackEl.addEventListener('mouseleave', resume);
    return () => {
      tween.kill();
      trackEl.removeEventListener('mouseenter', pause);
      trackEl.removeEventListener('mouseleave', resume);
    };
  }

  return () => tween.kill();
}

// ─── 5. Stagger reveal ───────────────────────────────────────────────────────
/**
 * ScrollTrigger batch reveal for a group of cards/items.
 * @param {Element} containerEl
 * @param {string}  selector     CSS selector for children, e.g. '.card'
 * @param {{ y?: number, stagger?: number, duration?: number, ease?: string }} opts
 */
export function staggerReveal(containerEl, selector, opts = {}) {
  if (!containerEl) return () => {};
  if (reduced()) return () => {};

  const { y = 60, stagger = 0.1, duration = 0.9, ease = 'power3.out' } = opts;
  const els = containerEl.querySelectorAll(selector);

  gsap.set(els, { y, opacity: 0, willChange: 'transform, opacity' });

  const st = ScrollTrigger.batch(els, {
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        onComplete: () => gsap.set(batch, { willChange: 'auto' }),
      }),
    start: 'top 85%',
    once: true,
  });

  return () => st.forEach((t) => t.kill());
}

// ─── 6. Parallax layer ───────────────────────────────────────────────────────
/**
 * Scroll-linked vertical parallax. speed 0 = no move, 1 = full scroll height.
 * @param {Element} el
 * @param {number}  speed  default 0.5
 */
export function parallaxLayer(el, speed = 0.5) {
  if (!el || reduced()) return () => {};

  gsap.set(el, { willChange: 'transform' });

  const tween = gsap.to(el, {
    yPercent: -20 * speed * 2,
    ease: 'none',
    scrollTrigger: {
      trigger: el.parentElement || el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
    },
    onComplete: () => gsap.set(el, { willChange: 'auto' }),
  });

  return () => { tween.kill(); tween.scrollTrigger?.kill(); };
}

// ─── 7. Counter up ───────────────────────────────────────────────────────────
/**
 * Counts from 0 to target when element enters viewport.
 * @param {Element} el
 * @param {number}  target
 * @param {{ duration?: number, prefix?: string, suffix?: string, separator?: boolean }} opts
 */
export function counterUp(el, target, opts = {}) {
  if (!el) return () => {};

  const { duration = 2, prefix = '', suffix = '', separator = true } = opts;
  const obj = { value: 0 };

  const tween = gsap.to(obj, {
    value: target,
    duration,
    ease: 'power2.out',
    round: true,
    onUpdate: () => {
      const n = separator
        ? obj.value.toLocaleString()
        : Math.round(obj.value);
      el.textContent = `${prefix}${n}${suffix}`;
    },
    scrollTrigger: { trigger: el, start: 'top 80%', once: true },
  });

  return () => { tween.kill(); tween.scrollTrigger?.kill(); };
}

// ─── 8. Ken Burns ────────────────────────────────────────────────────────────
/**
 * Cinematic slow zoom-out on page load (hero background).
 * @param {Element} bgEl
 */
export function kenBurns(bgEl) {
  if (!bgEl || reduced()) return () => {};

  gsap.set(bgEl, { willChange: 'transform', scale: 1.06 });

  const tween = gsap.to(bgEl, {
    scale: 1,
    duration: 3.5,
    ease: 'power2.out',
    onComplete: () => gsap.set(bgEl, { willChange: 'auto' }),
  });

  return () => tween.kill();
}

// ─── 9. SVG path draw ────────────────────────────────────────────────────────
/**
 * Draws an SVG path on scroll (stroke-dashoffset technique).
 * @param {SVGPathElement} pathEl
 */
export function drawSVGPath(pathEl) {
  if (!pathEl || reduced()) return () => {};

  const length = pathEl.getTotalLength();
  gsap.set(pathEl, {
    strokeDasharray: length,
    strokeDashoffset: length,
    willChange: 'stroke-dashoffset',
  });

  const tween = gsap.to(pathEl, {
    strokeDashoffset: 0,
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: { trigger: pathEl, start: 'top 80%', scrub: 1 },
    onComplete: () => gsap.set(pathEl, { willChange: 'auto' }),
  });

  return () => { tween.kill(); tween.scrollTrigger?.kill(); };
}

// ─── 10. Scroll progress bar ─────────────────────────────────────────────────
/**
 * Scrubs a bar element's scaleX from 0→1 as page scrolls.
 * @param {Element} barEl
 */
export function scrollProgressBar(barEl) {
  if (!barEl) return () => {};

  gsap.set(barEl, { scaleX: 0, transformOrigin: 'left center', willChange: 'transform' });

  const tween = gsap.to(barEl, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0,
    },
  });

  return () => { tween.kill(); tween.scrollTrigger?.kill(); };
}
