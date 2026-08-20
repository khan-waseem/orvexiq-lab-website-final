import React from 'react';
import styles from './ClientStoriesSection.module.css';

/**
 * The lit planet and its orbit rings on the right of the quote card. Drawn as
 * one inline SVG — gradients, rings and the points riding them are all vector,
 * so it stays clean at any size and follows the theme's violet ramp.
 */
export const OrbitVisual: React.FC = () => (
  <svg
    className={styles.orbit}
    viewBox="0 0 420 320"
    fill="none"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <radialGradient id="orbitPlanet" cx="38%" cy="34%" r="72%">
        <stop offset="0%" stopColor="#8b7bff" />
        <stop offset="42%" stopColor="#5b34d6" />
        <stop offset="100%" stopColor="#160a35" />
      </radialGradient>

      <radialGradient id="orbitHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(124, 58, 237, 0.42)" />
        <stop offset="60%" stopColor="rgba(124, 58, 237, 0.10)" />
        <stop offset="100%" stopColor="rgba(124, 58, 237, 0)" />
      </radialGradient>

      <linearGradient id="orbitRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(192, 132, 252, 0.75)" />
        <stop offset="55%" stopColor="rgba(124, 58, 237, 0.35)" />
        <stop offset="100%" stopColor="rgba(59, 76, 202, 0.15)" />
      </linearGradient>
    </defs>

    {/* Ambient wash behind the whole system */}
    <circle cx="210" cy="160" r="150" fill="url(#orbitHalo)" />

    {/* Orbit rings, each tilted a little further than the last */}
    <g stroke="url(#orbitRing)" fill="none">
      <ellipse cx="210" cy="160" rx="196" ry="72" strokeWidth="1.2" transform="rotate(-18 210 160)" />
      <ellipse cx="210" cy="160" rx="158" ry="58" strokeWidth="1" opacity="0.8"
               transform="rotate(-27 210 160)" />
      <ellipse cx="210" cy="160" rx="120" ry="44" strokeWidth="1" opacity="0.6"
               transform="rotate(-9 210 160)" />
    </g>

    {/* Planet */}
    <circle cx="210" cy="160" r="62" fill="url(#orbitPlanet)" />
    <circle cx="210" cy="160" r="62" fill="none" stroke="rgba(192, 132, 252, 0.35)" strokeWidth="1" />

    {/* Points riding the orbits */}
    <g>
      <circle cx="76" cy="112" r="7" fill="rgba(192, 132, 252, 0.16)" />
      <circle cx="76" cy="112" r="2.6" fill="#e9d5ff" />

      <circle cx="330" cy="226" r="8" fill="rgba(192, 132, 252, 0.14)" />
      <circle cx="330" cy="226" r="2.8" fill="#e9d5ff" />

      <circle cx="300" cy="86" r="6" fill="rgba(192, 132, 252, 0.12)" />
      <circle cx="300" cy="86" r="2" fill="#dacfff" />
    </g>
  </svg>
);
