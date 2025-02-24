'use client';

import { Domain } from '@bigfive-org/results';
import { DomainPage } from './domain';

interface DomainTabsProps {
  results: Domain[];
  showExpanded: boolean;
  scoreText: string;
}

export const DomainTabs = ({
  results,
  showExpanded,
  scoreText
}: DomainTabsProps) => {
  return (
    <>
      {results.map((result: Domain, index: number) => (
        <DomainPage
          key={index}
          domain={result}
          scoreText={scoreText}
          showExpanded={showExpanded}
        />
      ))}
    </>
  );
};
