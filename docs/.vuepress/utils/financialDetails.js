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

function centToYuan(cent) {
    let centStr = cent.toString()
    switch (centStr.length) {
        case 1:
            return "0.0" + centStr
        case 2:
            return "0." + centStr
        default:
            return centStr.slice(0, -2) + "." + centStr.slice(-2)
    }

}

function createDetails(data, i18n) {
    data = parse(data)
    let textResult = []
    let sum = 0
    let nonNumericalMonth = Object.prototype.toString.call(i18n.month) === '[object Array]'

    for (let year of hillSort(Object.keys(data))) {
        let monthResults = []
        for (let month in data[year]) {
            let monthResult = "##### " + (nonNumericalMonth ? i18n.month[month - 1] : month + i18n.month) + `\n| ${i18n.playerName} | ${i18n.amount}  | ${i18n.date} |\n|  :----:  | :----:  | :----: |\n`
            for (let entry of data[year][month]) {
                monthResult += `| ${entry.name} | ${centToYuan(entry.amount)} | ${entry.day}${i18n.day} |\n`
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
        let data = await readFile(app.dir.source() + options.data, { encoding: "utf-8" });
        for (let lang in options.locales) {
            let details = createDetails(data, options.locales[lang])
            let templateData = await readFile(app.dir.source() + options.locales[lang].template)
            let page = await createPage(app, {
                path: options.locales[lang].path,
                content: templateData.toString("utf-8").replace(String.raw`%%%details%%%`,details)
            });
            app.pages.push(page);
        }
    }

    }
}}

export default financialDetailsPlugin
