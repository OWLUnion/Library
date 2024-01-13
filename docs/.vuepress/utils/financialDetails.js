import { parse } from "toml"

function hillSort(arr) {
  for(let gap = parseInt(arr.length/2); gap > 0 ; gap = parseInt(gap/2)){
    for(let i = gap ; i < arr.length ; i++){
      let preIndex = i-gap;
      let current = arr[i]
      while(preIndex >=0 && current < arr[preIndex]){
          arr[preIndex + gap] = arr[preIndex]
          preIndex -= gap;
      }
      arr[preIndex+gap] = current
    }
  }
  return arr
}

/*
const i18n = {
    chapterTitle: "### 玩家赞助明细",
    summary: ["我们共收到了 "," 元赞助。"],
    month: "月",
    year: "年",
    playerName: "玩家名称",
    amount: "赞助金额 (CNY)",
    date: "赞助日期"
}
*/

function centToYuan(cent) {
    let str = cent.toString()
    return str.slice(0,-2) + "." + str.slice(-2)
}

function financialDetails (data, i18n) {
    data = parse(data)
    let textResult = []
    let sum = 0

    for ( let year of hillSort(Object.keys(data)) ) {
        let monthResults = []
        for (let month of hillSort(Object.keys(data[year]))) {
            let monthResult = `##### ${month}${i18n.month}\n| ${i18n.playerName} | ${i18n.amount}  | ${i18n.date} |\n|  :----:  | :----:  | :----: |\n`
            for (let entry of data[year][month]) {
                monthResult += `| ${entry.name} | ${centToYuan(entry.amount)} | ${entry.day} |\n`
                sum += entry.amount
            }
            monthResults.unshift(monthResult)
        }
     textResult.unshift(`#### ${year}${i18n.year}\n` + monthResults.join("\n"))
    }
    
    textResult.unshift(i18n.summary[0] + centToYuan(sum) +  i18n.summary[1])
    textResult.unshift(i18n.chapterTitle)

    return textResult.join("\n")
}

export default financialDetails
