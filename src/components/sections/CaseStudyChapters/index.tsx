import React from 'react';
import { ChapteredCaseStudy } from '@/content/schemas/case-study-chapter.schema';
import { IntroChapter } from './IntroChapter';
import { FlowChapter } from './FlowChapter';
import {
  AssumptionsChapter,
  ConstraintsChapter,
  DecisionsChapter,
  OutcomeChapter,
  StatementChapter,
} from './TextChapters';

export interface CaseStudyChaptersProps {
  study: ChapteredCaseStudy;
}

/**
 * CaseStudyChapters — renders a chaptered case study.
 *
 * Each chapter type owns its own screen; this only dispatches. A case study
 * that needs a chapter type nobody has built yet simply does not use it, so
 * the vocabulary can grow one project at a time.
 */
export const CaseStudyChapters: React.FC<CaseStudyChaptersProps> = ({ study }) => {
  return (
    <>
      {study.chapters.map((chapter) => {
        switch (chapter.type) {
          case 'intro':
            return (
              <IntroChapter key={chapter.id} chapter={chapter} origin={study.origin} />
            );
          case 'flow':
            return <FlowChapter key={chapter.id} chapter={chapter} />;
          case 'statement':
            return <StatementChapter key={chapter.id} chapter={chapter} />;
          case 'decisions':
            return <DecisionsChapter key={chapter.id} chapter={chapter} />;
          case 'constraints':
            return <ConstraintsChapter key={chapter.id} chapter={chapter} />;
          case 'assumptions':
            return <AssumptionsChapter key={chapter.id} chapter={chapter} />;
          case 'outcome':
            return <OutcomeChapter key={chapter.id} chapter={chapter} />;
          default:
            /* breakdown / threshold / comparison are declared in the schema and
               used by the next case study; their components land with it. */
            return null;
        }
      })}
    </>
  );
};
