'use client';

import { subtitle, heading } from '@/components/primitives';
import Link from 'next/link';
import { BarChart } from '@/components/bar-chart';
import ReadMore from '@/components/read-more';

// Define our own types for the domain and facet
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

interface DomainProps {
  domain: Domain;
  scoreText: string;
  showExpanded?: boolean;
}

export const DomainPage = ({
  domain,
  scoreText,
  showExpanded
}: DomainProps) => {
  return (
    <>
      <div className='mt-5 domain-section'>
        <Link href={`#${domain.title}`}>
          <h2 className={heading()} id={domain.title}>
            {domain.title}
          </h2>
        </Link>
        <p>{domain.description}</p>
        {domain.text && (
          <>
            <ReadMore showExpanded={showExpanded}>
              <p dangerouslySetInnerHTML={{ __html: domain.text }} />
            </ReadMore>
            <br />
            <br />
          </>
        )}
        <BarChart max={5} results={domain.facets} />
        <div>
          {domain.facets.map((facet: Facet, index: number) => (
            <div key={index} className='mt-5'>
              <Link href={`#${facet.title}`}>
                <h3 className={subtitle()} id={facet.title}>
                  {facet.title}
                </h3>
              </Link>
              <div className='font-semibold text-gray-500'>
                {scoreText}: {facet.score.toFixed(2)}/5.00 ({facet.result === 'high' ? 'High' : facet.result === 'low' ? 'Low' : 'Average'})
              </div>
              <p className='mt-3'>{facet.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
