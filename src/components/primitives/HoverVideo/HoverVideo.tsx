'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './HoverVideo.module.css';

export interface HoverVideoProps {
  src: string;
  /** Still shown at rest, on top of the clip. */
  poster: string;
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
 * with the copy beside it.
 *
 * At rest it shows a still rather than the clip's own first frame. The capture
 * zooms as it plays, so no single frame of it holds the whole dashboard — the
 * card would sit permanently on a cropped view of the thing it is meant to
 * show. The still is a separate image of the complete screen; the clip runs
 * over it on hover.
 *
 * The clip loads on visibility rather than at page load, so a visitor who
 * never reaches this band never downloads it. The still carries the card until
 * then, and is what is seen for as long as nobody hovers.
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
export const HoverVideo: React.FC<HoverVideoProps> = ({
  src,
  poster,
  label,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string | undefined>(undefined);
  const [running, setRunning] = useState(false);
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
    const video = videoRef.current;
    if (!video) return;
    // The still only lifts once the clip is actually running, so a slow start
    // shows the dashboard rather than a blank frame.
    void video
      .play()
      .then(() => setRunning(true))
      .catch(() => {});
  }, [motionAllowed]);

  const rest = useCallback(() => {
    const video = videoRef.current;
    setRunning(false);
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  return (
    <div
      className={[styles.frame, className].filter(Boolean).join(' ')}
      onMouseEnter={play}
      onMouseLeave={rest}
      onFocus={play}
      onBlur={rest}
    >
      <video
        ref={videoRef}
        className={styles.video}
        src={source}
        muted
        loop
        playsInline
        preload="auto"
        aria-label={label}
      />

      <Image
        src={poster}
        alt={label}
        fill
        sizes="(max-width: 900px) 100vw, 560px"
        className={`${styles.poster} ${running ? styles.posterHidden : ''}`}
      />
    </div>
  );
};
