import React from 'react';
import styles from './CaseMockup.module.css';

export interface CaseMockupProps {
  /** Product name shown in the mockup's title bar. */
  label: string;
}

/* One generic console screen, reused by every case card until real per-project
   artwork lands. Everything is markup — no placed screenshots — so it stays
   sharp at any density. A case study opts out by setting coverScreenAssetUrl. */

const NAV_ROWS = 7;
const CHART_POINTS = '0,44 26,36 52,40 78,24 104,30 130,14 156,20 182,8';
const BAR_HEIGHTS = [10, 16, 12, 22, 18, 26, 20, 30];

const KPIS = [
  { label: 'Active', value: '2,147' },
  { label: 'In transit', value: '128' },
  { label: 'On time', value: '96.2%' },
  { label: 'Alerts', value: '18' },
];

export const CaseMockup: React.FC<CaseMockupProps> = ({ label }) => (
  <div className={styles.stage} aria-hidden="true">
    {/* Desktop console */}
    <div className={styles.screen}>
      <div className={styles.titleBar}>
        <span className={styles.titleMark} />
        <span className={styles.titleText}>{label}</span>
        <span className={styles.windowDots}>
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className={styles.screenBody}>
        <aside className={styles.sidebar}>
          <span className={`${styles.navRow} ${styles.navRowActive}`} />
          {Array.from({ length: NAV_ROWS }, (_, i) => (
            <span key={i} className={styles.navRow} />
          ))}
        </aside>

        <div className={styles.main}>
          <div className={styles.kpiRow}>
            {KPIS.map((kpi) => (
              <div key={kpi.label} className={styles.kpi}>
                <span className={styles.kpiLabel}>{kpi.label}</span>
                <span className={styles.kpiValue}>{kpi.value}</span>
              </div>
            ))}
          </div>

          <div className={styles.chartPanel}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>Performance</span>
              <span className={styles.panelChip}>Last 30 days</span>
            </div>

            <div className={styles.chartWrap}>
              <svg className={styles.chart} viewBox="0 0 182 52" fill="none" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="caseChartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(168, 85, 247, 0.45)" />
                    <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
                  </linearGradient>
                </defs>
                <polygon points={`${CHART_POINTS} 182,52 0,52`} fill="url(#caseChartFill)" />
                <polyline
                  points={CHART_POINTS}
                  stroke="#c084fc"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* The plot is stretched to fill the panel, which would squash a
                  marker drawn inside it — so the last point rides outside the
                  SVG and keeps its shape. Its position mirrors the final data
                  point (182,8 in a 182x52 box). */}
              <span className={styles.chartTip} />
            </div>
          </div>

          <div className={styles.listPanel}>
            {[0, 1, 2].map((row) => (
              <div key={row} className={styles.listRow}>
                <span className={styles.listDot} />
                <span className={styles.listBarWide} />
                <span className={styles.listBarNarrow} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Companion handset, overlapping the console's lower-right corner */}
    <div className={styles.phone}>
      <span className={styles.phoneNotch} />
      <div className={styles.phoneScreen}>
        <span className={styles.phoneTitle} />
        <span className={styles.phoneSub} />

        <div className={styles.phoneCard}>
          <span className={styles.phoneCardLine} />
          <span className={styles.phoneCardValue} />
        </div>

        <div className={styles.phoneBars}>
          {BAR_HEIGHTS.map((h, i) => (
            <span key={i} className={styles.phoneBar} style={{ height: h }} />
          ))}
        </div>

        <div className={styles.phoneRows}>
          {[0, 1, 2].map((row) => (
            <div key={row} className={styles.phoneRow}>
              <span className={styles.phoneRowDot} />
              <span className={styles.phoneRowBar} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
