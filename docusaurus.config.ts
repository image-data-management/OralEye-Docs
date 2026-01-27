import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'OralEye Documentation',
  tagline: 'Instructions For Use and Clinical Documentation',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://image-data-management.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/OralEye-Docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'image-data-management', // Usually your GitHub org/user name.
  projectName: 'OralEye-Docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Remove edit links for regulatory compliance
          editUrl: undefined,
          // Show last update time
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
        },
        blog: false, // Disable blog for IFU site
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'OralEye',
      logo: {
        alt: 'OralEye Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'ifuSidebar',
          position: 'left',
          label: 'Instructions For Use',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/image-data-management/OralEye',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Instructions For Use',
              to: '/docs/ifu/overview',
            },
            {
              label: 'Safety Information',
              to: '/docs/ifu/safety',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: 'Contact Us',
              href: 'https://oraleye.ai/contact',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Terms of Use',
              href: 'https://oraleye.ai/terms',
            },
            {
              label: 'Privacy Policy',
              href: 'https://oraleye.ai/privacy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OralEye. All rights reserved. | Document Version: 1.0.0`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
