import { readFile, writeFile } from 'node:fs/promises'

const dataPath = new URL('../docs/.vuepress/serverData/owl-x4.json', import.meta.url)
const readmePath = new URL('../docs/README.md', import.meta.url)
const playPath = new URL('../docs/play/README.md', import.meta.url)
const statusPath = new URL('../docs/wiki/OWL-Server-X4.md', import.meta.url)
const economyPath = new URL('../docs/wiki/OWL-Economy.md', import.meta.url)

const data = JSON.parse(await readFile(dataPath, 'utf8'))

async function fetchStatus() {
  const url = `https://api.mcsrvstat.us/bedrock/3/${data.address}:${data.bedrockPort}`
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'OWL Library server page updater'
      }
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

function statusBlock(status) {
  if (!status) return '服务器公开状态暂时无法获取。'
  if (!status.online) return '服务器公开状态：离线或暂时无法从状态接口访问。'

  const players = status.players
    ? `${status.players.online ?? 0}/${status.players.max ?? '?'}`
    : '未知'
  const version = status.version || status.protocol?.name || '未知'
  const motd = status.motd?.clean?.filter(Boolean).join(' / ') || '未设置'

  return [
    '服务器公开状态：在线',
    `在线人数：${players}`,
    `版本：${version}`,
    `MOTD：${motd}`
  ].join('\n\n')
}

const status = await fetchStatus()
const generatedAt = new Date().toISOString().slice(0, 10)
const statusText = statusBlock(status)

await writeFile(readmePath, `---
home: true
heroImage: /assets/世界旗/0.png
heroText: OWL Library
tagline: "${data.slogan}"
sidebar: true
title: OWL Library
actions:
  - text: 加入 OWL Server
    type: primary
    link: /play/
  - text: X4 现状
    type: secondary
    link: /wiki/OWL-Server-X4.html
  - text: 经济系统
    type: secondary
    link: /wiki/OWL-Economy.html
  - text: 资金明细
    type: secondary
    link: /finance/

footer: MIT Licensed | Copyright © 2023-至今 OWL Union
---

# 即刻加入 OWL Server

${data.name} ${data.season} 是服务器当前运行中的周目。Java 版玩家可以通过 \`${data.address}:${data.javaPort}\` 加入；基岩版玩家可以通过 \`${data.address}:${data.bedrockPort}\` 加入。

这里是 OWL Server 的公开知识库，用于整理加入方式、服务器现状、经济系统、公告、资金明细和历史资料。旧周目的记录会继续保留，新玩家请优先阅读 X4 相关页面。

## 快速入口

- [加入服务器](/play/)
- [OWL Server X4 现状](/wiki/OWL-Server-X4.html)
- [OWL 经济系统](/wiki/OWL-Economy.html)
- [OWL Server 百科](/wiki/OWL-Server.html)
`)

await writeFile(playPath, `# 加入服务器

OWL Server 当前运行周目为 **${data.season}**。X4 是 Java 版 + 基岩版互通服务器，并带有跨版本支持，可以容许一定范围内的版本跨度。

## OWL Server ${data.season}

**[基岩版一键导入](${data.joinUrl})**

### Java 版

\`\`\`text
地址：${data.address}
端口：${data.javaPort}
直连：${data.address}:${data.javaPort}
版本：${data.javaVersion}
\`\`\`

### 基岩版

\`\`\`text
地址：${data.address}
端口：${data.bedrockPort}
版本：${data.bedrockVersion}
\`\`\`

## 新玩家建议

首次进入服务器后，建议先完成以下步骤：

1. 阅读出生点规则和基础指引。
2. 领取新手资源，了解金币、传送、领地和每日任务。
3. 使用 \`/rtp\` 或服务器菜单前往适合生存的位置。
4. 建立第一个临时据点，并设置自己的家。
5. 加入社区频道，方便获得通知、活动信息和帮助。

::: note 历代周目存档

如果你想获取历代周目的存档，请移步 [OWL Memories](/wiki/OWL-Memories.html)。那里保留了大部分历史周目存档文件的下载方式。

:::
`)

await writeFile(statusPath, `# OWL Server ${data.season}

${data.name} ${data.season} 已正式开服。X4 是 ${data.type}，带有跨版本支持，可以容许一定范围内的版本跨度。

漫长的黑夜终于破晓，齿轮已经开始转动。通往 OWL X4 新世界的大门已向所有人敞开。欢迎来到 OWL X4，欢迎回家。

## 公开状态

${statusText}

最后自动检查：${generatedAt}

## 基本信息

| 项目 | 内容 |
|---|---|
| 当前周目 | ${data.season} |
| 服务器类型 | ${data.type} |
| Java 版地址 | \`${data.address}:${data.javaPort}\` |
| Java 版版本 | \`${data.javaVersion}\` |
| 基岩版地址 | \`${data.address}\` |
| 基岩版端口 | \`${data.bedrockPort}\` |
| 基岩版版本 | \`${data.bedrockVersion}\` |
| 核心理念 | ${data.slogan} |

## X4 的方向

X4 会优先做好三件事：

- 让新玩家能快速开始生存，而不是进服后不知道做什么。
- 让老玩家有长期建设目标，例如主城、公寓、领地、商铺和活动。
- 让金币成为便利与社区服务的媒介，而不是破坏平衡的战斗力来源。

## 服务器特色

${data.features.map((feature) => `- ${feature}`).join('\n')}

## 适合谁加入

如果你希望找一个节奏慢一点、能长期建设、能参与服务器成长的小型社区，X4 会比较适合你。这里不是以人数堆叠为第一目标，而是希望留下真正愿意一起建设服务器的人。

## 页面状态

本页面是 X4 的现状页。服务器功能仍会持续调整，如发现页面内容与游戏内实际情况不同，请以游戏内公告和管理组说明为准，并提醒我们更新 Library。
`)

await writeFile(economyPath, `# OWL 经济系统

OWL 的金币系统用于维持服务器内的便利服务、领地、公寓、传送和装饰消费。设计原则很简单：

> ${data.economy.principle}

## 基础汇率

\`\`\`text
${data.economy.rate}
\`\`\`

## 金币获取

| 来源 | 奖励 |
|---|---:|
| 每日签到 | ${data.economy.dailySign} |
| 每日任务 | ${data.economy.dailyTask} |
| 在线奖励 | ${data.economy.onlineReward} |
| 在线奖励上限 | ${data.economy.onlineRewardLimit} |

普通玩家每日免费获取${data.economy.dailyFreeIncome}。活动奖励可能额外发放，但会控制数量，避免金币通胀。

## 主要消费

| 项目 | 价格 |
|---|---:|
| 飞行 | ${data.economy.fly} |
${data.economy.landPrices.map((item) => {
  const [name, price] = item.split('：')
  return `| ${name} | ${price} |`
}).join('\n')}
| 主城公寓 | 3000 金币 / 7 天 |

## 传送收费

免费传送：

${data.economy.teleport.free.map((item) => `- \`${item}\``).join('\n')}

收费传送：

| 指令或区域 | 价格 |
|---|---:|
${data.economy.teleport.paid.map((item) => {
  const [name, price] = item.split('：')
  return `| ${name} | ${price} |`
}).join('\n')}

## 礼包与服务

补给包和加强包均为 **7 天限购 1 次**。

| 项目 | 价格范围 | 说明 |
|---|---:|---|
| 补给包 | 3000-6000 金币 | 食物、火把、基础工具、少量经验、建筑材料 |
| 加强包 | 12000-15000 金币 | 修理券、装饰箱钥匙、飞行券、领地扩容券、称号外观 |

## 不出售内容

金币不直接出售以下内容：

- OP 权限
- 创造模式
- 顶级装备
- 常驻飞行
- 大量稀有矿物
- 破坏平衡的附魔或神器

经济系统会根据服务器活跃度、金币流通和玩家反馈继续调整。
`)
