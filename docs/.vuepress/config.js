import { gitPlugin } from "@vuepress/plugin-git";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
//import { pwaPlugin } from "@vuepress/plugin-pwa";
//import { defaultTheme } from '@vuepress/theme-default'
import themeSidebar from 'vuepress-theme-sidebar';

export default {
  title: 'OWL Library',
  description: 'Welcome to OWL Library, where the documents are put out.',
  theme: themeSidebar({
    sidebar: 'auto',
    nextLinks: true,
    prevLinks: true,
    repo: 'OWLUnion/Library',
    repoLabel: 'View on Github',
    docsRepo: 'OWLUnion/Library',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Edit on GitHub',
    colorModeSwitch: true
  }),
  plugins: [
    gitPlugin({
      createdTime: false,
      updatedTime: true,
      contributors: true
    }),
    mdEnhancePlugin({
      gfm: true,
      container: true,
      tabs: true,
      codetabs: true,
      card: true
    }),
    copyCodePlugin({
      
    })
  ]
}
