import { parse } from "toml"

function hillSort(arr){
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

function financialDetails (data) {
    data = parse(data)
    let results = []

    for ( let year of hillSort(Object.keys(data)) ) {
        let monthResults = []
        for (let month of hillSort(Object.keys(data[year]))) {
            let monthResult = "##### " + month + "月\n| 玩家名称 | 赞助金额 (CNY)  | 赞助日期 |\n|  :----:  | :----:  | :----: |\n"
            for (let entry of data[year][month]) {
                monthResult += `| ${entry.name} | ${entry.amount} | ${entry.day} |\n`
            }
            monthResults.unshift(monthResult)
        }
     results.unshift("#### " + year + "年\n" + monthResults.join("\n"))
    }

    return results.join("\n")
}

export default financialDetails
