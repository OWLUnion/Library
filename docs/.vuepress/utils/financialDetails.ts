import { parse } from "toml"

function hillSort(arr: any[]): any[] {
  for(let gap: number = parseInt(arr.length/2); gap > 0 ; gap = parseInt(gap/2)){
    for(let i: number = gap ; i < arr.length ; i++){
      let preIndex: number = i-gap;
      let current: number = arr[i]
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

function centToYuan(cent: number): string {
    let str: string = cent.toString()
    return str.slice(0,-2) + "." + str.slice(-2)
}

function financialDetails (data: string, i18n: any): string {
    data = <any> parse(data)
    let textResult: string[] = []
    let sum: number = 0

    for ( let year: string of hillSort(Object.keys(data)) ) {
        let monthResults = []
        for (let month: string of hillSort(Object.keys(data[year]))) {
            let monthResult: string = `##### ${month}${i18n.month}\n| ${i18n.playerName} | ${i18n.amount}  | ${i18n.date} |\n|  :----:  | :----:  | :----: |\n`
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
