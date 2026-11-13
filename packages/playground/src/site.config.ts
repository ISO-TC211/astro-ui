import type { SiteConfig } from '@isotc211/astro-ui'

export const siteConfig: SiteConfig = {
  title: 'ISO/TC 211 Playground',
  titleHtml: 'ISO/TC 211 Playground',
  brandSub: 'Shared UI Package Demo',
  description: 'Integration-test site for @isotc211/astro-ui — the shared UI for ISO/TC 211 Astro sites.',
  nav: [
    { title: 'Home', url: '/' },
    { title: 'Page', url: '/demo/page/' },
    { title: 'Post', url: '/demo/post/' },
    { title: 'News', url: '/news/' },
  ],
  committee: {
    id: 211,
    name: 'Geographic information/Geomatics',
    home: 'https://committee.iso.org/home/tc211',
  },
  footerLinks: [
    { title: 'Main Site', url: 'https://www.isotc211.org' },
    { title: 'Standards', url: 'https://standards.isotc211.org/' },
    { title: 'Schemas', url: 'https://schemas.isotc211.org/' },
  ],
  social: {
    links: [
      { url: 'https://twitter.com/ISOTC211' },
      { url: 'https://github.com/ISO-TC211' },
    ],
  },
  awards: [
    {
      title: 'ISO Award for Leadership',
      path: '/demo/post/',
    },
  ],
}
