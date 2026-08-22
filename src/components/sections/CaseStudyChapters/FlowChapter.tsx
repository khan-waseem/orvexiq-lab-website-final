import React from 'react';
import { ChapterShell } from './ChapterShell';
import { CHAPTER_ICONS } from './ChapterIcons';
import { FlowChapter as FlowChapterContent } from '@/content/schemas/case-study-chapter.schema';
import styles from './Chapters.module.css';
import flow from './FlowChapter.module.css';

export interface FlowChapterProps {
  chapter: FlowChapterContent;
}

/**
 * FlowChapter — a sequence of steps.
 *
 * `linked` runs them across as connected cards: a pipeline, where each stage
 * feeds the next. `timeline` runs them down a lit rail: a chain of events,
 * where what matters is that time passed and nothing intervened.
 */
export const FlowChapter: React.FC<FlowChapterProps> = ({ chapter }) => {
  const isTimeline = chapter.variant === 'timeline';

  return (
    <ChapterShell
      id={chapter.id}
      number={chapter.number}
      label={chapter.label}
      headlineLine1={chapter.headlineLine1}
      headlineAccent2={chapter.headlineAccent2}
      intro={chapter.intro}
      layout={isTimeline ? 'split' : 'stacked'}
    >
      <ol className={isTimeline ? flow.rail : flow.row}>
        {chapter.steps.map((step, index) => {
          const Icon = step.icon ? CHAPTER_ICONS[step.icon] : null;

          return (
            <li key={step.id} className={flow.step} data-tone={step.tone}>
              {isTimeline ? (
                <>
                  <span className={flow.node} aria-hidden="true">
                    {Icon && <Icon />}
                  </span>

                  <div className={`${styles.card} ${flow.railCard}`}>
                    {step.number && <span className={styles.cardNumber}>{step.number}</span>}
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                    <span className={styles.cardRule} aria-hidden="true" />
                    <p className={styles.cardBody}>{step.body}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${styles.card} ${flow.rowCard}`}>
                    {Icon && (
                      <span className={styles.cardIcon}>
                        <Icon />
                      </span>
                    )}
                    {step.number && <span className={flow.rowNumber}>{step.number}</span>}
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                    <span className={styles.cardRule} aria-hidden="true" />
                    <p className={styles.cardBody}>{step.body}</p>
                  </div>

                  {index < chapter.steps.length - 1 && (
                    <span className={flow.connector} aria-hidden="true">
                      <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                        <path d="M0 5h19M15.5 1.5 19 5l-3.5 3.5" stroke="currentColor"
                              strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>

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
};
