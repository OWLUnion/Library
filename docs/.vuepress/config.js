import { gitPlugin } from "@vuepress/plugin-git";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { defaultTheme } from '@vuepress/theme-default';

import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function autoSidebar (dir) {
    var src = readdirSync(path.resolve(__dirname, "..", dir));
    var out = [];
    src.forEach(function(fileName){
        out.push("/" + dir + "/" + fileName)
    });
    return out;
}

export default {
    head: [
      [
        'link',
        { rel: 'icon', href: 'assets/logo/library.png' }
      ]
    ],
    title: 'OWL Library',
    description: 'Welcome to OWL Library, where the documents are put out.',
    theme: defaultTheme({
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
        ],
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
  ]
}
module.exports = {
    locales: {
      // 键名是该语言所属的子路径
      // 作为特例，默认语言可以使用 '/' 作为其路径。
      '/': {
        lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
        title: 'VuePress',
        description: 'Vue-powered Static Site Generator'
      },
      '/zh/': {
        lang: 'zh-CN',
        title: 'VuePress',
        description: 'Vue 驱动的静态网站生成器'
      }
    }
  }