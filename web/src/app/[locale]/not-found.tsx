'use client';

import { Image } from '@nextui-org/image';
import { title } from '@/components/primitives';

const BackButton = () => {
  return (
    <div
      className='mt-4 px-4 py-2 rounded-md flex items-center justify-center touch-manipulation cursor-pointer bg-danger text-white'
      style={{ minWidth: '44px', minHeight: '44px' }}
      onClick={() => {
        console.log('Go back button clicked from not-found page');
        window.history.back();
      }}
    >
      Go back
    </div>
  );
};

export default function NotFound() {
  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <h1 className={title()}>Not found</h1>
      <h2 className='text-center mt-4'>Could not find requested resource</h2>
      <div className='flex space-x-4'>
        <BackButton />
      </div>
      <Image src='/not_found.webp' className='mt-5' />
    </main>
  );
}
