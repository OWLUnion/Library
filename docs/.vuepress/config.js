import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
//import { gitPlugin } from '@vuepress/plugin-git'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
//import { docsearchPlugin } from '@vuepress/plugin-docsearch'

import financialDetailsPlugin from './utils/financialDetails.js'
import autoSidebar from './utils/autoSidebar.js'


export default {
    bundler: viteBundler(),
    //    locales: {
    //        '/': {
    lang: 'zh-CN',
    title: 'OWL Library',
    description: 'Our Wild Land, Our Wonderful Love.',
    //        },
    //    },
    head: [
      [
        'link',
            { rel: 'icon', href: 'assets/logo/library.png' }
      ]
    ],
    theme: defaultTheme({
        //        locales: {
        //            '/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑',
        repoLabel: '在 GitHub 上查看',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        sidebar: [
            {
                text: 'Wiki',
                link: '/wiki/',
                collapsible: true,
                children: autoSidebar('wiki')
                    },
            {
                text: '公告',
                link: '/announcement/',
                collapsible: true,
                children: autoSidebar('announcement')
                    },
            {
                text: '资金明细',
                link: '/finance/',
                collapsible: true
                    },
            {
                text: '公约',
                link: '/rules/',
                collapsible: true,
                children: autoSidebar('rules')
                    },
            {
                text: '加入服务器',
                link: '/play/',
                collapsible: true
                    },
            {
                text: '首页',
                link: '/',
                collapsible: false
                    }
                ],
        //            },
        //        },
        nextLinks: true,
        prevLinks: true,
        repo: 'OWLUnion/Library',
        docsRepo: 'OWLUnion/Library',
        docsDir: 'docs',
        docsBranch: 'main',
        lastUpdated: true,
        contributors: true,
        editLinks: true,
        colorModeSwitch: true,
    }),
    plugins: [
/*        gitPlugin({
            createdTime: false,
            updatedTime: true,
            contributors: true
        }),*/
        mdEnhancePlugin({
            gfm: true,
//            tabs: true,
//            codetabs: true,
//            hint: true,
//            components: true
        }),
        /*
        docsearchPlugin({
            apiKey: '1c9f43ca88682ced733c7ddc35ef672a',
            indexName: 'lib-kupars2',
            appid: 'JY2N18S6T2',
            placeholder: 'Search'
        }),*/
        financialDetailsPlugin({
            locales: {
                '/': {
                    template: '/.vuepress/financialDetails/zh_cn.md',
                    path: '/finance/',
                    chapterTitle: '### 玩家赞助明细',
                    summary: ['我们共收到了 ', ' 元赞助。'],
                    month: '月',
                    year: '年',
                    day: '日',
                    playerName: '玩家名称',
                    amount: '赞助金额 (CNY)',
                    date: '赞助日期'
                },
            },
            data: '/.vuepress/financialDetails/data.toml'
        })
    ]
}
