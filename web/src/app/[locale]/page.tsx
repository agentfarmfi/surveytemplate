import { useTranslations } from 'next-intl';
import { button as buttonStyles } from '@nextui-org/theme';
import { title, subtitle } from '@/components/primitives';
import clsx from 'clsx';
import {
} from '@/components/icons';
import { ArrowRightIcon } from '@/components/icons';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';

interface Props {
  params: { locale: string };
}

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('frontpage');


  const features = [];

  const titleDescription = t.rich('description.top', {
    violet: (chunks) => (
      <span className={title({ color: 'violet' })}>{chunks}</span>
    )
  });


  return (
    <section className='relative'>
      <div>
        <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
          <div className='flex relative z-20 flex-col gap-6 w-full lg:w-1/2 xl:mt-10'>
            <div className='text-center justify-center mt-10'>
              <h1 className={title()}>{titleDescription}</h1>
              <br />
              <h2 className={subtitle({ class: 'mt-4' })}>
                {t('description.info')}
              </h2>
            </div>

            <div className='flex flex-col md:flex-row items-center gap-4 justify-center'>
              <Link
                href='/test'
                className={clsx(
                  buttonStyles({
                    color: 'primary',
                    radius: 'full',
                    variant: 'shadow',
                    size: 'lg',
                    fullWidth: true
                  }),
                  'md:w-auto'
                )}
              >
                {t('call_to_action')} <ArrowRightIcon />
              </Link>
            </div>
          </div>

          <div className='font-normal text-default-500 block max-w-full text-center underline'>
            {t('no_registration')}
          </div>
        </section>
        
        <div className="mt-20 max-w-4xl mx-auto px-4">
          <h2 className={title({ size: 'sm' })}>Data Privacy Notice</h2>
          <div className="mt-6 space-y-8 text-left">
            <section>
              <h3 className="text-xl font-bold mb-2">1. Introduction</h3>
              <p className="text-default-600">
                This privacy notice explains how we handle the data collected when you use the Change and Leadership Assessment tool. We are committed to protecting your privacy and ensuring transparency about how your data is processed.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-2">2. Information We Collect</h3>
              <p className="text-default-600">
                We collect minimal data necessary to provide you with assessment results. No personal identification information is required to take the assessment.
              </p>
              <ul className="list-disc list-inside mt-2 ml-4 text-default-600">
                <li>Your chosen test language</li>
                <li>Your responses to assessment questions</li>
                <li>Date and time of assessment submission</li>
              </ul>
              <p className="mt-2 text-default-600">
                We also use Google Analytics to measure website traffic and understand how users interact with our site. Google Analytics may set cookies (_ga and _gat) to distinguish users and limit traffic. Google Analytics terms specify that no personally identifiable information may be collected.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-2">3. How We Use Your Data</h3>
              <p className="text-default-600">
                Your assessment responses are used to calculate your leadership profile across various dimensions and facets. Results are stored in our database and linked to a unique ID that allows you to access your results later. This ID is provided to you upon completion of the assessment.
              </p>
              <p className="mt-2 text-default-600">
                We may create statistical, aggregated data from test results for analytical purposes. This aggregated data is anonymized and does not contain any individually identifiable information.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-2">4. Data Security</h3>
              <p className="text-default-600">
                Your data is stored in a secure MongoDB database with appropriate security measures. Connections to our database are managed with security best practices, including connection timeouts and proper connection pooling. We take reasonable precautions to prevent unauthorized access, disclosure, or modification of your data.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-2">5. Data Retention</h3>
              <p className="text-default-600">
                Your assessment results are retained to allow you to access them via the unique result ID. There is no automatic deletion of this data. If you wish to have your data removed, please contact us using the information provided below.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-2">6. Your Rights</h3>
              <p className="text-default-600">
                You have the right to access, correct, or request deletion of your data. Since we don't collect personal identification information, requests should include your unique result ID to help us locate your data.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-2">7. Contact Information</h3>
              <p className="text-default-600">
                If you have questions about this privacy notice or want to exercise your rights regarding your data, please contact <a href="mailto:ville.eloranta@agentfarm.fi" className="text-primary underline">ville.eloranta@agentfarm.fi</a>.
              </p>
            </section>
          </div>
        </div>

      </div>
    </section>
  );
}
