import React from 'react';
import styles from './PillarDemos.module.css';

/**
 * The miniature UI shown inside each pillar card. Every element here is real
 * markup — swatches, controls and the product screen are built in code, not
 * placed as flattened artwork, so they stay sharp on any display.
 *
 * These are decorative illustrations of the system, so the whole block is
 * hidden from assistive tech by the card that renders it.
 */

const SWATCHES = ['#a855f7', '#6366f1', '#2b7fd4', '#1f8a7a', '#4b4b55', '#a9a9b4'];
const RADII = [2, 4, 7, 11];

/** TOKENS — colour ramp, type specimen and radius scale. */
export const TokensDemo: React.FC = () => (
  <div className={styles.demo}>
    <div className={styles.panel}>
      <span className={styles.panelLabel}>Colors</span>
      <div className={styles.swatchRow}>
        {SWATCHES.map((c, i) => (
          <span
            key={c}
            className={`${styles.swatch} ${i === 0 ? styles.swatchLead : ''}`}
            style={{ background: c }}
          />
        ))}
      </div>
    </div>

    <div className={styles.panelRow}>
      <div className={styles.panel}>
        <span className={styles.panelLabel}>Typography</span>
        <div className={styles.typeRow}>
          <span className={styles.typeSpecimen}>Ag</span>
          <span className={styles.typeMeta}>
            <span className={styles.typeMetaPrimary}>Inter</span>
            <span className={styles.typeMetaSecondary}>Manrope</span>
          </span>
        </div>
      </div>

      <div className={styles.panel}>
        <span className={styles.panelLabel}>Radius</span>
        <div className={styles.radiusRow}>
          {RADII.map((r, i) => (
            <span
              key={r}
              className={`${styles.radiusBox} ${i === RADII.length - 1 ? styles.radiusBoxLead : ''}`}
              style={{ borderRadius: r }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

/** COMPONENTS — buttons, icon buttons and selection controls. */
export const ComponentsDemo: React.FC = () => (
  <div className={styles.demo}>
    <div className={styles.panel}>
      <div className={styles.primaryButton}>
        <span>Primary Button</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 7h9M7.8 3.4 11.5 7l-3.7 3.6" stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className={styles.controlRow}>
        <div className={styles.secondaryButton}>Secondary Button</div>

        <div className={styles.iconButton}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <circle cx="5.6" cy="5.6" r="3.9" stroke="currentColor" strokeWidth="1.2" />
            <path d="m8.6 8.6 2.6 2.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        <div className={styles.iconButton}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M3 5.4a3.5 3.5 0 1 1 7 0c0 2.4.9 3.3.9 3.3H2.1s.9-.9.9-3.3Z"
                  stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            <path d="M5.4 10.6a1.2 1.2 0 0 0 2.2 0" stroke="currentColor" strokeWidth="1.1"
                  strokeLinecap="round" />
          </svg>
        </div>

        <div className={styles.iconButton}>
          <span className={styles.ellipsis} />
        </div>
      </div>
    </div>

    <div className={styles.panel}>
      <div className={styles.controlRow}>
        <span className={styles.tag}>
          Tag
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
            <path d="m1.5 1.5 6 6m0-6-6 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
        </span>

        <span className={styles.checkbox}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="m2 5.2 2 2 4-4.4" stroke="currentColor" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <span className={styles.radio}>
          <span className={styles.radioDot} />
        </span>

        <span className={styles.toggle}>
          <span className={styles.toggleKnob} />
        </span>
      </div>
    </div>
  </div>
);

const SIDEBAR_ICONS = ['plane', 'bag', 'ticket', 'chat', 'user'] as const;

const SidebarGlyph: React.FC<{ kind: (typeof SIDEBAR_ICONS)[number] }> = ({ kind }) => {
  const p = { stroke: 'currentColor', strokeWidth: 1.1, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
      {kind === 'plane' && <path d="M1 6.6 11 2 6.6 11 5.3 6.9 1 6.6Z" {...p} />}
      {kind === 'bag' && <><rect x="2" y="4" width="8" height="6.4" rx="1.2" {...p} /><path d="M4.4 4V2.8a1.6 1.6 0 0 1 3.2 0V4" {...p} /></>}
      {kind === 'ticket' && <><rect x="1.6" y="3.2" width="8.8" height="5.6" rx="1.2" {...p} /><path d="M6 3.2v5.6" strokeDasharray="1.2 1.2" {...p} /></>}
      {kind === 'chat' && <path d="M2 3.4A1.4 1.4 0 0 1 3.4 2h5.2A1.4 1.4 0 0 1 10 3.4v3.4a1.4 1.4 0 0 1-1.4 1.4H5.2L2.8 10V8.2A1.4 1.4 0 0 1 2 6.8V3.4Z" {...p} />}
      {kind === 'user' && <><circle cx="6" cy="4.2" r="1.8" {...p} /><path d="M2.6 10c.5-1.9 1.8-2.8 3.4-2.8S8.9 8.1 9.4 10" {...p} /></>}
    </svg>
  );
};

/** PRODUCT — a real interface built from the system above. */
export const ProductDemo: React.FC = () => (
  <div className={styles.demo}>
    <div className={styles.app}>
      <aside className={styles.appSidebar}>
        <span className={styles.appLogo}>S</span>
        {SIDEBAR_ICONS.map((k) => (
          <span key={k} className={styles.appSidebarIcon}>
            <SidebarGlyph kind={k} />
          </span>
        ))}
      </aside>

      <div className={styles.appBody}>
        {/* Flight arc drawn behind the header, as in the design. */}
        <svg className={styles.appArc} viewBox="0 0 220 70" fill="none" aria-hidden="true">
          <path d="M4 66C58 34 130 12 214 8" stroke="rgba(168,85,247,0.45)" strokeWidth="1"
                strokeDasharray="3 4" />
          <path d="m206 3 10 5-9 5.5.6-4.6L206 3Z" fill="rgba(216,180,254,0.8)" />
        </svg>

        <header className={styles.appHeader}>
          <div>
            <p className={styles.appGreeting}>
              Hello, Waseem <span aria-hidden="true">👋</span>
            </p>
            <p className={styles.appSubGreeting}>Where do you want to go?</p>
          </div>
          <div className={styles.appHeaderActions}>
            <span className={styles.appBell}>
              <svg width="11" height="11" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M3 5.4a3.5 3.5 0 1 1 7 0c0 2.4.9 3.3.9 3.3H2.1s.9-.9.9-3.3Z"
                      stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={styles.appAvatar} />
          </div>
        </header>

        <div className={styles.appTabs}>
          <span className={`${styles.appTab} ${styles.appTabActive}`}>
            <SidebarGlyph kind="plane" />
            Flights
          </span>
          <span className={styles.appTab}>
            <SidebarGlyph kind="bag" />
            Hotels
          </span>
          <span className={styles.appTab}>
            <SidebarGlyph kind="ticket" />
            Activities
          </span>
        </div>

        <div className={styles.appRow}>
          <div className={styles.appField}>
            <span className={styles.appFieldLabel}>From</span>
            <span className={styles.appFieldValue}>Lahore (LHE)</span>
          </div>

          <span className={styles.appSwap}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1.5 4h8L7.6 2.2M10.5 8h-8l1.9 1.8" stroke="currentColor" strokeWidth="1.1"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <div className={styles.appField}>
            <span className={styles.appFieldLabel}>To</span>
            <span className={styles.appFieldValue}>Istanbul (IST)</span>
          </div>
        </div>

        <div className={styles.appRow}>
          <div className={styles.appField}>
            <span className={styles.appFieldLabel}>Depart</span>
            <span className={styles.appFieldValue}>12 Aug 2026</span>
          </div>
          <div className={styles.appField}>
            <span className={styles.appFieldLabel}>Travelers</span>
            <span className={styles.appFieldValue}>1 Adult</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const PILLAR_DEMOS = {
  tokens: TokensDemo,
  components: ComponentsDemo,
  product: ProductDemo,
} as const;
