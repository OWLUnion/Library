import { gitPlugin } from "@vuepress/plugin-git";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { defaultTheme } from '@vuepress/theme-default'
//import themeSidebar from 'vuepress-theme-sidebar';

import { readdirSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function autoSidebar (dir) {
    var src = readdirSync(path.resolve(__dirname, "..", dir))
    var out = []
    src.forEach(function(fileName){
        out.push("/" + dir + "/" + fileName)
    })
    return out
}

export default {
    title: 'OWL Library',
    description: 'Welcome to OWL Library, where the documents are put out.',
    theme: defaultTheme({
        sidebar: [
            {
                text: 'Wiki',
                link: '/wiki/',
                collapsible: true,
                children: autoSidebar("wiki")
                /*children: [
                    {
                        text: '欢迎',
                        link: '/wiki/README.md'
                    },
                    '/wiki/Add-ons.md',
                    '/wiki/OWL-Chat.md',
                    '/wiki/OWL-Foundation.md',
                    '/wiki/OWL-Memories.md',
                    '/wiki/OWL-Scenery.md',
                    '/wiki/OWL-Security.md',
                    '/wiki/OWL-Server.md',
                    '/wiki/OWL-Square.md',
                    '/wiki/OWL-Store.md',
                    '/wiki/OWL-周年纪念品.md',
                    '/wiki/OWL-和平会.md',
                    '/wiki/OWL-政府.md',
                    '/wiki/Robot-Galaxy.md',
                    '/wiki/United-Servers.md',
                    {
                        text: '旗帜和图案',
                        link: '/wiki/flags-icons.md'
                    }
                ]*/
            },
            {
                collapsible: true,
                text: '公告',
                link: '/announcement/',
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
            container: true,
            tabs: true,
            codetabs: true,
            card: true
        }),
    copyCodePlugin({

        })
  ]
}