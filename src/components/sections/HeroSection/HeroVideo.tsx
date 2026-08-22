'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './HeroSection.module.css';

export interface HeroVideoProps {
  src: string;
  className?: string;
}

/**
 * HeroVideo — the looping product animation on the right of the hero
 * (Figma 290:249, 974x548 at section x=456 y=165).
 *
 * Autoplays muted so browsers allow it, and holds on the first frame for
 * viewers who ask for reduced motion. The fade-up itself is CSS, so the clip
 * still appears if this component never hydrates.
 *
 * The source is attached after the browser goes idle rather than in the initial
 * markup. The clip is 5 MB, and with `preload="auto"` in the HTML it competed
 * with the hero's own text and image for bandwidth on first paint. It blends
 * with `mix-blend-mode: screen` over the hero backdrop, so before it attaches
 * there is nothing to see — no gap, no flash, no layout shift.
 */
export const HeroVideo: React.FC<HeroVideoProps> = ({ src, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string | undefined>(undefined);

  useEffect(() => {
    const attach = () => setSource(src);
    const idle = window.requestIdleCallback;
    if (typeof idle === 'function') {
      const handle = idle(attach, { timeout: 2000 });
      return () => window.cancelIdleCallback?.(handle);
    }
    const timer = window.setTimeout(attach, 600);
    return () => window.clearTimeout(timer);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    const apply = () => {
      if (media.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        // play() rejects when the tab is backgrounded; nothing to recover from.
        void video.play().catch(() => {});
      }
    };

    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [source]);

  return (
    <video
      ref={videoRef}
      className={[styles.heroVideo, className].filter(Boolean).join(' ')}
      src={source}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
};
