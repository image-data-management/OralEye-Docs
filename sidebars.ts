import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  ifuSidebar: [
    {
      type: 'category',
      label: 'Instructions For Use',
      collapsed: false,
      items: [
        'ifu/overview',
        'ifu/intended-use',
        'ifu/device-description',
        'ifu/safety',
        'ifu/operation',
        'ifu/maintenance',
        'ifu/troubleshooting',
        'ifu/technical-specs',
      ],
    },
    {
      type: 'category',
      label: 'Regulatory Information',
      items: [
        'regulatory/fda-clearance',
        'regulatory/symbols',
        'regulatory/version-history',
      ],
    },
  ],
};

export default sidebars;
