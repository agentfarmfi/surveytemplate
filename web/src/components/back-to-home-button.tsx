'use client';

export const BackToHomeButton = () => {
  return (
    <div 
      className='mt-2 px-3 py-1 bg-white text-red-500 rounded inline-flex items-center justify-center touch-manipulation cursor-pointer'
      style={{ minWidth: '44px', minHeight: '36px' }}
      onClick={() => {
        console.log('Back to home clicked');
        window.location.href = '/';
      }}
    >
      Back to home
    </div>
  );
};