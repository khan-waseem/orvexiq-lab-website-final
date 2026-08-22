import React from 'react';
import { ChapterShell } from './ChapterShell';
import {
  AssumptionsChapter as AssumptionsContent,
  ConstraintsChapter as ConstraintsContent,
  DecisionsChapter as DecisionsContent,
  OutcomeChapter as OutcomeContent,
  StatementChapter as StatementContent,
} from '@/content/schemas/case-study-chapter.schema';
import { ScreenShot } from './ScreenShot';
import styles from './Chapters.module.css';
import text from './TextChapters.module.css';

/* The four chapters whose diagram is the layout itself rather than a drawing.
   They share one file because they share one visual language: a tone-keyed
   panel, a rule, and a body. */

/**
 * StatementChapter — what was tried and rejected.
 *
 * Given its own screen rather than a callout inside another chapter: a studio
 * that shows what it threw away reads very differently from one that presents
 * a design as though it arrived finished.
 */
export const StatementChapter: React.FC<{ chapter: StatementContent }> = ({ chapter }) => (
  <ChapterShell
    id={chapter.id}
    number={chapter.number}
    label={chapter.label}
    headlineLine1={chapter.headlineLine1}
    headlineAccent2={chapter.headlineAccent2}
  >
    <div className={text.statement} data-tone={chapter.tone}>
      {chapter.badge && <span className={text.statementBadge}>{chapter.badge}</span>}

      <div className={text.statementBody}>
        {chapter.paragraphs.map((paragraph) => (
          <p key={paragraph} className={text.statementParagraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>

    {chapter.screen && <ScreenShot screen={chapter.screen} />}
  </ChapterShell>
);

/**
 * DecisionsChapter — each decision beside the thing it cost.
 *
 * The trade-off is not a footnote here: it sits in its own panel on every
 * card, because a decision without a cost is a preference.
 */
export const DecisionsChapter: React.FC<{ chapter: DecisionsContent }> = ({ chapter }) => (
  <ChapterShell
    id={chapter.id}
    number={chapter.number}
    label={chapter.label}
    headlineLine1={chapter.headlineLine1}
    headlineAccent2={chapter.headlineAccent2}
    intro={chapter.intro}
    layout="split"
  >
    <ol className={text.decisions}>
      {chapter.items.map((item) => (
        <li key={item.id} className={`${styles.card} ${text.decision}`} data-tone="violet">
          <div className={text.decisionMain}>
            <span className={styles.cardNumber}>{item.number}</span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <span className={styles.cardRule} aria-hidden="true" />
            <p className={styles.cardBody}>{item.body}</p>
          </div>

          <div className={text.tradeOff} data-tone="amber">
            <span className={text.tradeOffLabel}>{item.tradeOffLabel}</span>
            <p className={text.tradeOffBody}>{item.tradeOff}</p>
          </div>

          {item.screens.length > 0 && (
            <div className={item.screens.length > 1 ? styles.screenPair : text.decisionScreen}>
              {item.screens.map((screen) => (
                <ScreenShot
                  key={screen.src}
                  screen={screen}
                  sizes={
                    item.screens.length > 1
                      ? '(max-width: 900px) 100vw, 600px'
                      : '(max-width: 900px) 100vw, 1180px'
                  }
                />
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  </ChapterShell>
);

/** ConstraintsChapter — the boundaries that removed options. */
export const ConstraintsChapter: React.FC<{ chapter: ConstraintsContent }> = ({ chapter }) => (
  <ChapterShell
    id={chapter.id}
    number={chapter.number}
    label={chapter.label}
    headlineLine1={chapter.headlineLine1}
    headlineAccent2={chapter.headlineAccent2}
    intro={chapter.intro}
    layout="split"
  >
    <ul className={text.constraints}>
      {chapter.items.map((item) => (
        <li key={item.id} className={`${styles.card} ${text.constraint}`} data-tone={item.tone}>
          <span className={text.constraintLabel}>{item.label}</span>
          <p className={styles.cardBody}>{item.body}</p>
        </li>
      ))}
    </ul>
  </ChapterShell>
);

/** AssumptionsChapter — what the work rests on, stated rather than buried. */
export const AssumptionsChapter: React.FC<{ chapter: AssumptionsContent }> = ({ chapter }) => (
  <ChapterShell
    id={chapter.id}
    number={chapter.number}
    label={chapter.label}
    headlineLine1={chapter.headlineLine1}
    headlineAccent2={chapter.headlineAccent2}
    intro={chapter.intro}
    layout="split"
  >
    <ul className={text.assumptions}>
      {chapter.items.map((item) => (
        <li key={item.id} className={text.assumption} data-tone="violet">
          <span className={text.assumptionKey}>{item.key}</span>
          <p className={text.assumptionBody}>{item.body}</p>
        </li>
      ))}
    </ul>

    {chapter.note && (
      <p className={styles.footnote}>
        <span className={styles.footnoteMark} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
               strokeWidth="1.3" strokeLinecap="round">
            <circle cx="8" cy="8" r="6.4" />
            <path d="M8 5.2v.1M8 7.6v3.2" />
          </svg>
        </span>
        {chapter.note}
      </p>
    )}
  </ChapterShell>
);

/** OutcomeChapter — where it stands, and what would prove it. */
export const OutcomeChapter: React.FC<{ chapter: OutcomeContent }> = ({ chapter }) => (
  <ChapterShell
    id={chapter.id}
    number={chapter.number}
    label={chapter.label}
    headlineLine1={chapter.headlineLine1}
    headlineAccent2={chapter.headlineAccent2}
    intro={chapter.intro}
    layout="split"
  >
    <ul className={text.outcome}>
      {chapter.columns.map((column) => (
        <li key={column.id} className={`${styles.card} ${text.outcomeColumn}`} data-tone={column.tone}>
          <span className={text.outcomeLabel}>{column.label}</span>
          <span className={styles.cardRule} aria-hidden="true" />

          <ul className={text.outcomeList}>
            {column.items.map((entry) => (
              <li key={entry} className={text.outcomeItem}>
                <span className={text.outcomeTick} aria-hidden="true" />
                {entry}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>

    {chapter.footnote && (
      <p className={styles.footnote}>
        <span className={styles.footnoteMark} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
               strokeWidth="1.3" strokeLinecap="round">
            <circle cx="8" cy="8" r="6.4" />
            <path d="M8 5.2v.1M8 7.6v3.2" />
          </svg>
        </span>
        {chapter.footnote}
      </p>
    )}
  </ChapterShell>
);
