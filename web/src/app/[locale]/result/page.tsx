import { title } from '@/components/primitives';
import { useTranslations } from 'next-intl';
import { GetResultPage } from './get-result';
import { unstable_setRequestLocale } from 'next-intl/server';


interface Props {
  params: { locale: string };
  searchParams?: { error?: string };
}

export default function ResultPage({ params: { locale }, searchParams }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('getResult');
  const showError = searchParams?.error === 'true';

  return (
    <div className='h-[calc(60vh)]'>
      <h1 className={title()}>{t('result')}</h1>
      <div className='mt-10'>{t('explanation')}</div>
      
      {showError && (
        <div className='mt-4 p-4 text-white bg-red-500 rounded-md mb-4'>
          We could not retrieve the requested result. Please check the ID code.
        </div>
      )}
      
      {/* Using a key to force remount when navigating back to this page */}
      <GetResultPage
        key={`get-result-${Date.now()}`}
        viewPreviousText={t('viewPrevious')}
        getResultsText={t('getResult')}
      />
    </div>
  );
}
