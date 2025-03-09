'use client';

import { DomainPage } from './domain';

// Define our own type for the domain
interface Facet {
  facet: number;
  title: string;
  score: number;
  questionCount: number;
  result: string;
  text: string;
}

interface Domain {
  domain: string;
  title: string;
  description: string;
  score: number;
  result: string;
  facets: Facet[];
  text?: string;
}

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
  // Map domain codes to colors for better visual distinction
  const getDomainColorClass = (domain: string) => {
    switch(domain) {
      case 'P': return 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800';
      case 'S': return 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800';
      case 'W': return 'bg-danger-50 dark:bg-danger-900/20 border-danger-200 dark:border-danger-800';
      case 'E': return 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800';
      default: return 'bg-secondary-50 dark:bg-secondary-900/20 border-secondary-200 dark:border-secondary-800';
    }
  };

  return (
    <>
      {results.map((result: Domain, index: number) => (
        <div 
          key={index} 
          className={`my-8 p-4 rounded-lg border domain-section print:my-2 ${getDomainColorClass(result.domain)}`}
        >
          <DomainPage
            domain={result}
            scoreText={scoreText}
            showExpanded={showExpanded}
          />
        </div>
      ))}
    </>
  );
};
