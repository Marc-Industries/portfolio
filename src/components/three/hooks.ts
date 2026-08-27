'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Tracks document scroll progress (0..1) and current section index (0..n).
 * Lightweight; uses a passive scroll listener.
 */
export function useScroll() {
  const [state, setState] = useState({ progress: 0, section: 0 });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
        setState({ progress: p, section: Math.floor(p * 10) });
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return state;
}

export function useDeviceProfile() {
  const [profile, setProfile] = useState({
    isMobile: false,
    isTablet: false,
    dpr: 1,
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setProfile({
        isMobile: w < 640,
        isTablet: w >= 640 && w < 1024,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return profile;
}

/** Smoothed scroll progress for camera transitions */
export function useSmoothedScroll(alpha = 0.12) {
  const target = useRef(0);
  const value = useRef(0);
  const [v, setV] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      target.current = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      value.current += (target.current - value.current) * alpha;
      if (Math.abs(target.current - value.current) > 0.0005) {
        setV(value.current);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [alpha]);

  return v;
}
