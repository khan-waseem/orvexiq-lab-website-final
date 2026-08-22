import React from 'react';
import Image from 'next/image';
import { CaseStudyScreen } from '@/content/schemas/case-study-chapter.schema';
import styles from './Chapters.module.css';

export interface ScreenShotProps {
  screen: CaseStudyScreen;
  /** Screens above the fold on the opening chapter load eagerly. */
  priority?: boolean;
  sizes?: string;
  /** Lets a chapter re-space the figure for its own layout. */
  className?: string;
}

/**
 * ScreenShot — a product screen exported from the design file.
 *
 * A full desktop screen is seated in a laptop mockup, which reads as a shipped
 * artefact rather than a flat crop. Dialogs keep the plain frame: a dialog in
 * a laptop lid would claim it fills a screen it does not.
 *
 * The caption carries what the screen is for; the alt text describes what is
 * actually on it, so the argument still lands for anyone who cannot see it.
 */
export const ScreenShot: React.FC<ScreenShotProps> = ({
  screen,
  priority = false,
  sizes = '(max-width: 900px) 100vw, 1248px',
  className,
}) => {
  const image = (
    <Image
      src={screen.src}
      alt={screen.alt}
      width={screen.width}
      height={screen.height}
      className={styles.screenImage}
      sizes={sizes}
      priority={priority}
    />
  );

  return (
    <figure className={className ? `${styles.screenFigure} ${className}` : styles.screenFigure}>
      {screen.frame === 'laptop' ? (
        <div className={styles.laptop}>
          <div className={styles.laptopLid}>
            <span className={styles.laptopCamera} aria-hidden="true" />
            <div className={styles.laptopScreen}>{image}</div>
          </div>

          <div className={styles.laptopBase} aria-hidden="true">
            <span className={styles.laptopNotch} />
          </div>

          <span className={styles.laptopGlow} aria-hidden="true" />
        </div>
      ) : (
        <div className={styles.screenFrame}>{image}</div>
      )}

      <figcaption className={styles.screenCaption}>{screen.caption}</figcaption>
    </figure>
  );
};
