'use client';

import React, { useEffect, useRef } from 'react';
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
 */
export const HeroVideo: React.FC<HeroVideoProps> = ({ src, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
  }, []);

  return (
    <video
      ref={videoRef}
      className={[styles.heroVideo, className].filter(Boolean).join(' ')}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
};
