import { HeartBoldIcon } from '@/components/icons';
import { title } from '@/components/primitives';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Feedback from './feedback';
import { Link } from '@/navigation';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('seo.title'),
    description: t('seo.description')
  };
}

export default function AboutPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <div className='text-center justify-center mt-10'>
        <h1 className={title()}>About</h1>
      </div>
      <div className='mt-2 text-medium lg:mt-4 lg:text-large'>
        <p>
          Welcome to the Teamwork Approaches Survey. This assessment is designed to provide insights into your approach to teamwork across six key dimensions: Innovation and Change, Learning and Development, Driving for Results, Building Team Spirit, Prosocial Approach, and Technology Adoption Attitude.
        </p>
        <br />
        <p>
          Each dimension is carefully analyzed to provide a comprehensive view of your teamwork style and how it may influence your collaboration and team interactions.
        </p>
        <p>
          Developed with precision and accessibility in mind, our survey helps you understand your teamwork approach better and identify areas for personal and team development.
        </p>
        <br />
        <p>
          If you have questions please read through the{' '}
          <Link href='/faq' className='underline'>
            FAQ
          </Link>{' '}
          first. If you can&apos;t find an answer there, feel free to contact us.
        </p>
      </div>
      <section>
        <div className='text-center justify-center mt-20'>
          <h2 className={title()}>We love feedback!&nbsp;</h2>
          <div className='flex md:inline-flex flex-col md:flex-row items-center'>
            <HeartBoldIcon
              className='text-pink-500 animate-heartbeat'
              size={50}
              style={{
                animationDuration: '2.5s'
              }}
            />
          </div>
          <div className='mt-2 text-medium lg:mt-4 lg:text-large'>
            Send us feedback about how our features can be improved or specific
            issues.
          </div>
        </div>
        <Feedback />
      </section>
    </>
  );
}
