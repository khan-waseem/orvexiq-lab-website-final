import React from 'react';

/** Referenced from CSS as `filter: url(#orv-video-floor-clear)`. */
export const VIDEO_FLOOR_CLEAR_FILTER = 'orv-video-floor-clear';

/**
 * VideoFloorClear — takes the background of the hero clips down to true black.
 *
 * The clips are composited with `mix-blend-mode: screen`, where a pixel's
 * brightness is its opacity: black disappears, anything above it adds light.
 * That is what gives them transparency without an alpha channel, and it is also
 * why it is unforgiving — the background has to be *actually* black.
 *
 * It is not. Measuring the background of the three page clips, per channel:
 *
 *            p50   p90   p99
 *   red       1    3-4   5-6
 *   green     3    9-10  10-13
 *   blue      6-7  19    24
 *
 * Blue sits at two to three times red and green across roughly three quarters
 * of the frame. Screen blend turns that floor into a wash of blue over the
 * page, with the clip's rectangle showing at its edges.
 *
 * The obvious correction — subtract a constant per channel — is wrong, and was
 * tried: it takes the same amount off every pixel, so the subject's outer glow
 * loses it too. Blue at 20 removed most of a halo that lives around 25-60, and
 * the orbit came out with hard edges.
 *
 * So each channel gets a curve with a knee instead: flat zero across its own
 * floor, then back to identity by the time the glow starts. Above 64 nothing is
 * touched at all.
 *
 *   red    0 up to 8     identity from 32
 *   green  0 up to 16    identity from 48
 *   blue   0 up to 24    identity from 64
 *
 * Each table has 33 entries, so the breakpoints land every 8 levels — fine
 * enough to put the knee where the floor actually ends.
 *
 * Rendered once in the root layout: an SVG filter is referenced by id, so one
 * definition serves every video on the site.
 */

/** Identity ramp for the untouched part of each curve: i/32 from `from` up. */
const identityFrom = (from: number): string =>
  Array.from({ length: 33 - from }, (_, i) => ((from + i) / 32).toFixed(4)).join(' ');

/* Values below each knee are the recovery ramp — deliberately a little under
   identity so the transition back is smooth rather than a visible step. */
const RED = `0 0 0.0400 0.0750 ${identityFrom(4)}`;
const GREEN = `0 0 0 0.0450 0.0800 0.1200 ${identityFrom(6)}`;
const BLUE = `0 0 0 0 0.0350 0.0750 0.1150 0.1700 ${identityFrom(8)}`;

/**
 * The host is 1x1 and moved off-screen rather than sized 0x0 or hidden.
 * Safari has long dropped `filter: url(#…)` when the SVG holding the filter has
 * no layout box, and it does not fall back to rendering unfiltered — the
 * element it is applied to disappears entirely. A one-pixel box parked outside
 * the viewport avoids that while showing nothing.
 */
export const VideoFloorClear: React.FC = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="1"
    height="1"
    style={{
      position: 'absolute',
      left: '-9999px',
      top: 0,
      width: '1px',
      height: '1px',
      overflow: 'hidden',
      pointerEvents: 'none',
    }}
  >
    <defs>
      <filter id={VIDEO_FLOOR_CLEAR_FILTER} colorInterpolationFilters="sRGB">
        <feComponentTransfer>
          <feFuncR type="table" tableValues={RED} />
          <feFuncG type="table" tableValues={GREEN} />
          <feFuncB type="table" tableValues={BLUE} />
        </feComponentTransfer>
      </filter>
    </defs>
  </svg>
);
