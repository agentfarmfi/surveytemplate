import { getTranslations } from 'next-intl/server';

export type SiteConfig = typeof siteConfig;

export type Language = {
  code: string;
  name: string;
  countryCode?: string;
  map?: string[];
};

export const languages: Language[] = [
  { code: 'en', name: 'English', countryCode: 'us', map: ['en-GB'] }
];

export const locales = languages.map((lang) => lang.code) as string[];

export const siteConfig = {
  name: 'Technological Change and Leadership Style Survey',
  navItems: [
    {
      label: 'home',
      href: '/'
    },
    {
      label: 'result',
      href: '/result'
    }
  ],
  navMenuItems: [
    {
      label: 'home',
      href: '/'
    },
    {
      label: 'see_results',
      href: '/result'
    }
  ],
  footerLinks: [
    {
      label: 'home',
      href: '/'
    }
  ],
  links: {}
};

export const getNavItems = async ({
  locale,
  linkType
}: {
  locale: string;
  linkType: 'navItems' | 'navMenuItems' | 'footerLinks';
}) => {
  const t = await getTranslations({ locale, namespace: 'toolbar' });
  return siteConfig[linkType].map((link) => ({
    label: t(`${link.label}`),
    href: link.href
  }));
};
