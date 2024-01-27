import { gitPlugin } from "@vuepress/plugin-git";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { defaultTheme } from '@vuepress/theme-default';

import financialDetailsPlugin from "./utils/financialDetails.js"
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
                        collapsible: true
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
                        collapsible: true
                        },
                    {
                        text: 'Join Server',
                        link: '/en/play/',
                        collapsible: true
                        },
                    {
                        text: 'Homepage',
                        link: '/en/',
                        collapsible: false
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
        copyCodePlugin({}),
        financialDetailsPlugin({
            locales: {
                "/": {
                    template: "/.vuepress/financialDetails/zh_cn.md",
                    path: "/finance/",
                    chapterTitle: "### 玩家赞助明细",
                    summary: ["我们共收到了 ", " 元赞助。"],
                    month: "月",
                    year: "年",
                    day: "日",
                    playerName: "玩家名称",
                    amount: "赞助金额 (CNY)",
                    date: "赞助日期"
                },
                "/en/": {
                    template: "/.vuepress/financialDetails/en_us.md",
                    path: "/en/finance",
                    chapterTitle: "### Sponsorship Details",
                    summary: ["We received a total of ¥", " (CNY) in sponsorship."],
                    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    year: "",
                    day: "",
                    playerName: "Sponsor",
                    amount: "Amount (CNY)",
                    date: "Day of the Month"
                }
            },
            data: "/.vuepress/financialDetails/data.toml"
        })
    ]
}
