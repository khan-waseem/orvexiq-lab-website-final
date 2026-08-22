'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface AmbientVideoProps {
  src: string;
  /** The section's own styling — size, blend, mask, entrance animation. */
  className?: string;
}

/**
 * AmbientVideo — a looping, silent product animation used as page decoration.
 *
 * Shared by the landing hero and the inner page heroes so the playback rules
 * live in one place: autoplay muted (the only way browsers allow it), hold on
 * the first frame for anyone who asks for reduced motion, and never announce
 * itself to assistive tech — it carries no information the copy does not.
 *
 * The source is attached after the browser goes idle rather than sitting in the
 * initial markup. These clips run to several megabytes, and with `preload` in
 * the HTML they competed with the hero's own text for bandwidth on first paint.
 * They are composited with `mix-blend-mode: screen`, so before the source
 * attaches there is nothing to see — no gap, no flash, no layout shift.
 */
export const AmbientVideo: React.FC<AmbientVideoProps> = ({ src, className = '' }) => {
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
      className={className}
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
