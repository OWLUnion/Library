import { gitPlugin } from "@vuepress/plugin-git";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { defaultTheme } from '@vuepress/theme-default';
// import { docsearchPlugin } from '@vuepress/plugin-docsearch';

import autoSidebar from "./utils/autoSidebar.js"


export default {
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'OWL Library',
            description: 'Our Wild Land, Our Wonderful Love.',
        },
        '/en/': {
            lang: 'en-US',
            title: 'OWL Library',
            description: 'Our Wild Land, Our Wonderful Love.',
        },
    },
    head: [
      [
        'link',
            { rel: 'icon', href: 'assets/logo/library.png' }
      ]
    ],
    theme: defaultTheme({
        locales: {
            '/': {
                selectLanguageName: '简体中文',
                selectLanguageText: '选择语言',
                selectLanguageAriaLabel: '选择语言',
                sidebar: [
                    {
                        text: 'Wiki',
                        link: '/wiki/',
                        collapsible: true,
                        children: autoSidebar("wiki")

                        },
                    {
                        text: '公告',
                        link: '/announcement/',
                        collapsible: true,
                        children: autoSidebar("announcement")
                        },
                    {
                        text: '资金明细',
                        link: '/finance/',
                        collapsible: true,
                        children: autoSidebar("finance")
                        }
                    ]
            },
            '/en/': {
                selectLanguageName: 'English',
                selectLanguageText: 'Languages',
                selectLanguageAriaLabel: "Languages",
                sidebar: [
                    {
                        text: 'Wiki',
                        link: '/en/wiki/',
                        collapsible: true,
                        children: autoSidebar("en/wiki")
                        },
                    {
                        text: 'announcement',
                        link: '/en/announcement/',
                        collapsible: true,
                        children: autoSidebar("en/announcement")
                        },
                    {
                        text: 'finance',
                        link: '/en/finance/',
                        collapsible: true,
                        children: autoSidebar("en/finance")
                        }
                    ]
            },
        },
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
            presentation: true,
            container: true,
            tabs: true,
            codetabs: true,
            card: true
        }),
    copyCodePlugin({})
    /*,
    docsearchPlugin({
      appId: '2HM9GWMXWD',
      apiKey: 'c76cfa7049c88b719f377b4bea71a403',
      indexName: 'lib-kupars',
      locales: {
        '/en/': {
          placeholder: 'Search Documentation',
          translations: {
            button: {
              buttonText: 'Search Documentation',
            },
          },
        },
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          },
        },
      },
    })*/
  ]
}
