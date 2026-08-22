'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface HoverVideoProps {
  src: string;
  /** Describes what the clip shows, for anyone who cannot see it. */
  label: string;
  className?: string;
}

/**
 * HoverVideo — a clip that runs while the pointer is over it and rests on its
 * first frame otherwise.
 *
 * Used for the case study mockups, where four of these sit in one grid. They
 * are deliberately not autoplaying: four clips looping at once is a lot of
 * decoding for a band a visitor is only scanning, and the movement competes
 * with the copy beside it. Resting on frame one still shows the product.
 *
 * Loading is tied to visibility rather than to load or to hover. Attaching at
 * load would pull four clips down for a band most visitors never reach;
 * attaching on hover would leave the card empty until then, since a video with
 * no source has no frame to show. An observer attaches the source when the card
 * comes near the viewport, so the still is ready before anyone looks at it and
 * the clip is ready before anyone points at it.
 *
 * Touch has no hover, and phones fire mouseenter on tap anyway, so playback is
 * gated on the pointer actually being a hovering one. Rather than invent a
 * touch equivalent — autoplaying in view would put every clip on a phone's
 * decoder at once — the clip stays on its first frame there, which is what the
 * card needs anyway: the card is a link, and the still is the picture on it.
 *
 * A reduced-motion preference is honoured the same way: the frame, never the
 * motion.
 */
export const HoverVideo: React.FC<HoverVideoProps> = ({ src, label, className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [motionAllowed, setMotionAllowed] = useState(true);

  useEffect(() => {
    /* Two conditions, both about whether motion belongs here at all.
       `hover: hover` is the one that matters on touch: phones still fire
       mouseenter on tap, so without it a tap would start the clip on the way
       to opening the card. */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverable = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => setMotionAllowed(!reduced.matches && hoverable.matches);
    apply();
    reduced.addEventListener('change', apply);
    hoverable.addEventListener('change', apply);
    return () => {
      reduced.removeEventListener('change', apply);
      hoverable.removeEventListener('change', apply);
    };
  }, []);

  /* Attach once the card is near the viewport, so the first frame is painted
     before it is looked at. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || source) return;

    if (typeof IntersectionObserver !== 'function') {
      setSource(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSource(src);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, source]);

  const play = useCallback(() => {
    if (!motionAllowed) return;
    // Rejects if the pointer left before the clip was ready; nothing to undo.
    void videoRef.current?.play().catch(() => {});
  }, [motionAllowed]);

  const rest = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={source}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={label}
      onMouseEnter={play}
      onMouseLeave={rest}
      onFocus={play}
      onBlur={rest}
    />
  );
};
