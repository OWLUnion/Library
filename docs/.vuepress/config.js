import { gitPlugin } from "@vuepress/plugin-git";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { defaultTheme } from '@vuepress/theme-default';
// import { docsearchPlugin } from '@vuepress/plugin-docsearch';

import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function autoSidebar (dir, locale) {
    var src = readdirSync(path.resolve(__dirname, "..", dir));
    var out = [];
    src.forEach(function(fileName){
        out.push("/" + locale + "/" + dir + "/" + fileName)
    });
    return out;
}


export default {
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    "/": {
      lang: "zh-CN",
      title: "OWL Library",
      description: "Our Wild Land, Our Wonderful Love.",
     },
     "/en/": {
      lang: "en-US",
      title: "OWL Library",
      description: "Our Wild Land, Our Wonderful Love.",
    },
  },
    head: [
      [
        'link',
        { rel: 'icon', href: 'assets/logo/library.png' }
      ]
    ],
    title: 'OWL Library',
    description: 'Welcome to OWL Library, where the documents are put out.',
    theme: defaultTheme({
        sidebar: {
    '/zh/': [
        {
            text: 'Wiki',
            link: '/zh/wiki/',
            collapsible: true,
            children: autoSidebar("wiki","zh")
        },
        {
            text: '公告',
            link: '/zh/announcement/',
            collapsible: true,
            children: autoSidebar("announcement")
        },
        {
            text: '资金明细',
            link: '/zh/finance/',
            collapsible: true,
            children: autoSidebar("finance")
        }
    ],
    '/en/': [
        {
            text: 'Wiki',
            link: '/en/wiki/',
            collapsible: true,
            children: autoSidebar("wiki","en")
        },
        {
            text: 'announcement',
            link: '/en/announcement/',
            collapsible: true,
            children: autoSidebar("announcement","en")
        },
        {
            text: 'finance',
            link: '/en/finance/',
            collapsible: true,
            children: autoSidebar("finance","en")
        }
    ]
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
