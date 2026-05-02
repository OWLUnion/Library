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
    description: '自由、开放、平等、互爱的 OWL Server 知识库。',
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
                text: '百科',
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
                text: '资金公开',
                link: '/finance/',
                collapsible: true
                    },
            {
                text: '社区公约',
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
                    contentLanguage: 'zh',
                    chapterTitle: '### 玩家赞助记录',
                    usageTitle: '### 赞助使用明细',
                    externalSupportTitle: '## 基金会之外的资金支持',
                    summary: ['目前我们共收到 ', ' 元赞助。'],
                    month: '月',
                    year: '年',
                    day: '日',
                    playerName: '玩家',
                    amount: '赞助金额 (CNY)',
                    date: '赞助日期'
                },
                '/en/': {
                    template: '/.vuepress/financialDetails/en_us.md',
                    path: '/en/finance/',
                    contentLanguage: 'en',
                    chapterTitle: '### Player Sponsorship Records',
                    usageTitle: '### Sponsorship Usage',
                    externalSupportTitle: '## External Financial Support',
                    summary: ['We have received ', ' CNY in sponsorships so far.'],
                    month: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                    ],
                    year: '',
                    day: '',
                    playerName: 'Player',
                    amount: 'Sponsorship Amount (CNY)',
                    date: 'Date'
                },
            },
            data: '/.vuepress/financialDetails/data.toml',
            usageData: '/.vuepress/financialDetails/usage.toml'
        })
    ]
}
