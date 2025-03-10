'use client';

import { Image } from '@nextui-org/image';
import { useEffect } from 'react';
import { title } from '@/components/primitives';

const BackButton = () => {
  return (
    <div
      className='mt-4 px-4 py-2 rounded-md flex items-center justify-center touch-manipulation cursor-pointer bg-danger text-white'
      style={{ minWidth: '44px', minHeight: '44px' }}
      onClick={() => {
        console.log('Go back button clicked');
        window.history.back();
      }}
    >
      Go back
    </div>
  );
};

const TryAgainButton = ({ reset }: { reset: () => void }) => {
  return (
    <div
      className='mt-4 px-4 py-2 rounded-md flex items-center justify-center touch-manipulation cursor-pointer bg-primary text-white'
      style={{ minWidth: '44px', minHeight: '44px' }}
      onClick={() => {
        console.log('Try again button clicked');
        reset();
      }}
    >
      Try again
    </div>
  );
};

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const onBackClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <h1 className={title()}>Error</h1>
      <h2 className='text-center mt-4'>
        {error ? error.message : 'Something went wrong!'}
      </h2>
      <div className='flex space-x-4'>
        <BackButton />
        <TryAgainButton reset={reset} />
      </div>
    </main>
  );
}
