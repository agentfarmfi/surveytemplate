import { Report, getTestResult } from '@/actions';
import { Snippet } from '@nextui-org/snippet';
import { useTranslations } from 'next-intl';
import { title } from '@/components/primitives';
import { DomainPage } from './domain';
import { Domain } from '@bigfive-org/results';
import { getTranslations } from 'next-intl/server';
import { BarChart } from '@/components/bar-chart';
// Removed OverviewBarChart import
import { Link, redirect } from '@/navigation';
import { ReportLanguageSwitch } from './report-language-switch';
import { Alert } from '@/components/alert';
import { supportEmail } from '@/config/site';
import ShareBar from '@/components/share-bar';
import { DomainTabs } from './domain-tabs';
import { Chip } from '@nextui-org/react';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'results' });
  return {
    title: 'My results from the Change and Leadership Assessment - Aalto University',
    description: 'See my results from the Change and Leadership Assessment'
  };
}

interface ResultPageParams {
  params: { id: string };
  searchParams: { lang: string; showExpanded?: boolean; printing?: string };
}

export default async function ResultPage({
  params,
  searchParams
}: ResultPageParams) {
  let report;
  let error = false;

  try {
    // Only get the first 24 characters of the ID
    const id = params.id.substring(0, 24);
    report = await getTestResult(id, searchParams.lang);
  } catch (e) {
    console.error('Failed to retrieve report:', e);
    error = true;
  }

  if (error || !report) {
    // Redirect back to the results page with an error parameter
    return redirect(`/result?error=true`);
  }

  // Always show expanded content when printing by setting showExpanded
  const isPrintingQuery = searchParams.printing === 'true';
  const shouldExpandContent = !!searchParams.showExpanded || isPrintingQuery;

  return <Results report={report} showExpanded={shouldExpandContent} />;
}

interface ResultsProps {
  report: Report;
  showExpanded?: boolean;
}

const Results = ({ report, showExpanded }: ResultsProps) => {
  const t = useTranslations('results');

  return (
    <div className="results-container">
      <div className='flex'>
        <div className='flex-grow'>
          <ReportLanguageSwitch
            language={report.language}
            availableLanguages={report.availableLanguages}
          />
        </div>
        <Chip>{new Date(report.timestamp).toLocaleDateString()}</Chip>
      </div>
      <div className='text-center mt-4'>
        <span className='font-bold'>{t('important')}</span> &nbsp;
        {t('saveResults')}
      </div>
      <div className='flex mt-4'>
        <Snippet
          hideSymbol
          color='danger'
          className='w-full justify-center'
          size='lg'
        >
          {report.id}
        </Snippet>
      </div>
      <div className='flex mt-5 justify-end w-full gap-x-1 print:hidden'>
        <ShareBar report={report} />
      </div>
      <div className='flex mt-10 justify-center'>
        <h1 className={title()}>Your Results</h1>
      </div>
      {/* Removed overview bar chart
      <div>
        <OverviewBarChart results={report.results} />
      </div>
      */}
      <DomainTabs
        results={report.results}
        showExpanded={!!showExpanded}
        scoreText={t('score')}
      />
    </div>
  );
};
