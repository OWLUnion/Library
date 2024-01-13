import { parse } from "toml"
import { createPage } from '@vuepress/core'
import { readFile } from 'node:fs/promises';

function hillSort(arr) {
    for (let gap = parseInt(arr.length / 2); gap > 0; gap = parseInt(gap / 2)) {
        for (let i = gap; i < arr.length; i++) {
            let preIndex = i - gap;
            let current = arr[i]
            while (preIndex >= 0 && current < arr[preIndex]) {
                arr[preIndex + gap] = arr[preIndex]
                preIndex -= gap;
            }
            arr[preIndex + gap] = current
        }
    }
    return arr
}

const config = {
    locales: {
        "/": {
            template: "/.vuepress/financialDetails/zh_cn.md",
            path: "/finance/",
            chapterTitle: "### 玩家赞助明细",
            summary: ["我们共收到了 ", " 元赞助。"],
            month: "月",
            year: "年",
            playerName: "玩家名称",
            amount: "赞助金额 (CNY)",
            date: "赞助日期"
        },
        "/en/": {
            template: "/.vuepress/financialDetails/en_us.md",
            path: "/en/finance",
            chapterTitle: "### Sponsorship Details",
            summary: ["我们共收到了 ", " 元赞助。"],
            month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            year: "",
            playerName: "Sponsor",
            amount: "赞助金额 (CNY)",
            date: "赞助日期"
        }
    },
    data: "/.vuepress/financialDetails/data.toml"
}

function centToYuan(cent) {
    let str = cent.toString()
    return str.slice(0, -2) + "." + str.slice(-2)
}

function createDetails(data, i18n) {
    data = parse(data)
    let textResult = []
    let sum = 0
    let nonNumericalMonth = Object.prototype.toString.call(i18n.month) === '[object Array]'

    for (let year of hillSort(Object.keys(data))) {
        let monthResults = []
        for (let month of hillSort(Object.keys(data[year]))) {
            let monthResult = "##### " + nonNumericalMonth ? i18n.month[month - 1] : month + i18n.month + `\n| ${i18n.playerName} | ${i18n.amount}  | ${i18n.date} |\n|  :----:  | :----:  | :----: |\n`
            for (let entry of data[year][month]) {
                monthResult += `| ${entry.name} | ${centToYuan(entry.amount)} | ${entry.day} |\n`
                sum += entry.amount
            }
            monthResults.unshift(monthResult)
        }
        textResult.unshift(`#### ${year}${i18n.year}\n` + monthResults.join("\n"))
    }

    textResult.unshift(i18n.summary[0] + centToYuan(sum) + i18n.summary[1])
    textResult.unshift(i18n.chapterTitle)

    return textResult.join("\n")
}

const financialDetailsPlugin = (options) => {
    return {
        name: 'financialDetails',
        onInitialized: async (app) => {
            let data = await readFile(dir.source() + options.data, { encoding: "utf-8" })
            for (lang of options.locales) {
                let content = (await readFile(dir.source() + options.locales[lang]    .template), { encoding: "utf-8" }).replace("%%%details%%%", createDetails(data, options.locales[lang]))
                let page = await createPage(app, {
                    path: options.locales[lang]    .path,
                    content
                })
                app.pages.push(page)
            }
        }
    }
}

export default financialDetailsPlugin