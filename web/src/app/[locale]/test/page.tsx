// import { getItems, getInfo } from '@bigfive-org/questions';
import fs from 'fs';
import path from 'path';
import { Survey } from './survey';
import { useTranslations } from 'next-intl';
import { saveTest } from '@/actions';
import { unstable_setRequestLocale } from 'next-intl/server';
import { TestLanguageSwitch } from './test-language-switch';

// Directly import our custom entrepreneurship questions
import customQuestions from '../../../../custom-questions';
import customChoices from '../../../../custom-choices';

// Type declaration for customChoices
interface CustomChoices {
  plus: { text: string; score: number; color: number }[];
  minus: { text: string; score: number; color: number }[];
  [key: string]: { text: string; score: number; color: number }[];
}

// Add choice objects to each question
const questionsWithChoices = customQuestions.map(q => ({
  ...q,
  num: q.id, // Add a num property for compatibility
  choices: (customChoices as CustomChoices)[q.keyed] // Add appropriate choices based on question keying
}));

// Mock the original API with our custom data
const questionLanguages = [{ id: 'en', name: 'English' }];

interface Props {
  params: { locale: string };
  searchParams: { lang?: string };
}

export default function TestPage({
  params: { locale },
  searchParams: { lang }
}: Props) {
  unstable_setRequestLocale(locale);
  const language = 'en'; // Only using English now
  const questions = questionsWithChoices;
  const t = useTranslations('test');
  return (
    <>
      <div className='flex'>
        <TestLanguageSwitch
          availableLanguages={questionLanguages}
          language={language}
        />
      </div>
      <Survey
        questions={questions}
        nextText={t('next')}
        prevText={t('back')}
        resultsText={t('seeResults')}
        saveTest={saveTest}
        language={language}
      />
    </>
  );
}
