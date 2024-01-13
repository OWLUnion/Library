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
/*
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
*/

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
    return (app) => {
        return {
            name: 'financialDetails',
onInitialized: async (app) => {
    try {
        // Add a log statement here to check if the hook is being called
        console.log('onInitialized hook called');

        let data = await readFile(app.dir.source() + options.data, { encoding: "utf-8" });
        console.log('Read file successfully:', data);

        for (let lang in options.locales) {
            // Add a log statement to check the language iteration
            console.log('Processing language:', lang);
            let details = createDetails(data, options.locales[lang])
            console.log(details)
            let templateData = await readFile(app.dir.source() + options.locales[lang].template)
            let page = await createPage(app, {
                path: options.locales[lang].path,
                content: templateData.toString("utf-8").replace(String.raw`%%%details%%%`,details)
            });
            app.pages.push(page);
        }
    } catch (error) {
        console.error('Error in onInitialized hook:', error);
    }
}

    }
}}

export default financialDetailsPlugin
