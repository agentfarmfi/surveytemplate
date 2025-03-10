'use client';

import { FC } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useTheme } from 'next-themes';
import { useIsSSR } from '@react-aria/ssr';
import clsx from 'clsx';

import { SunFilledIcon, MoonFilledIcon } from '@/components/icons';

export interface ThemeSwitchProps {
  className?: string;
  classNames?: any;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    console.log('Theme toggle clicked');
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const isSelected = theme === 'light' || isSSR;

  return (
    <div 
      className={clsx(
        'px-px transition-opacity hover:opacity-80 cursor-pointer touch-manipulation',
        className
      )}
      style={{ minWidth: '44px', minHeight: '44px' }}
      onClick={onChange}
      aria-label={`Switch to ${isSelected ? 'dark' : 'light'} mode`}
    >
      <VisuallyHidden>
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={onChange}
          aria-label={`Switch to ${isSelected ? 'dark' : 'light'} mode`}
        />
      </VisuallyHidden>
      <div
        className={clsx(
          'w-auto h-auto min-w-[44px] min-h-[44px]',
          'bg-transparent',
          'rounded-lg',
          'flex items-center justify-center',
          'p-2',
          '!text-default-500'
        )}
      >
        {!isSelected || isSSR ? (
          <SunFilledIcon size={28} />
        ) : (
          <MoonFilledIcon size={28} />
        )}
      </div>
    </div>
  );
};
