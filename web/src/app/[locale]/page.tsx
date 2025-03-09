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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-2">2. Information We Collect</h3>
              <p className="text-default-600">
                Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt.
              </p>
              <p className="mt-2 text-default-600">
                Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus:
              </p>
              <ul className="list-disc list-inside mt-2 ml-4 text-default-600">
                <li>Nam nec ante sed lacinia</li>
                <li>Pellentesque felis orci, lacinia ut</li>
                <li>Praesent fermentum tempor tellus</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-2">3. How We Use Your Data</h3>
              <p className="text-default-600">
                Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.
              </p>
              <p className="mt-2 text-default-600">
                Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-2">4. Data Security</h3>
              <p className="text-default-600">
                Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-2">5. Your Rights</h3>
              <p className="text-default-600">
                Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Mauris sollicitudin fermentum libero. Praesent nonummy mi in odio. Nunc interdum lacus sit amet orci. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi.
              </p>
              <p className="mt-2 text-default-600">
                Morbi mattis ullamcorper velit. Phasellus gravida semper nisi. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis.
              </p>
            </section>
          </div>
        </div>

      </div>
    </section>
  );
}
