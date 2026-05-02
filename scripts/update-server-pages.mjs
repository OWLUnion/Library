import { readFile, writeFile } from 'node:fs/promises'

const dataPath = new URL('../docs/.vuepress/serverData/owl-x4.json', import.meta.url)
const readmePath = new URL('../docs/README.md', import.meta.url)
const playPath = new URL('../docs/play/README.md', import.meta.url)
const serverPath = new URL('../docs/wiki/OWL-Server.md', import.meta.url)
const statusPath = new URL('../docs/wiki/OWL-Server-X4.md', import.meta.url)
const economyPath = new URL('../docs/wiki/OWL-Economy.md', import.meta.url)

const data = JSON.parse(await readFile(dataPath, 'utf8'))
const generatedAt = new Date().toISOString().slice(0, 10)

async function fetchStatus() {
  const url = `https://api.mcsrvstat.us/bedrock/3/${data.address}:${data.bedrockPort}`
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'OWL Library server page updater' }
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

const statusText = statusBlock(await fetchStatus())

await writeFile(readmePath, `---
home: true
heroImage: /assets/世界旗/0.png
heroText: OWL Library
tagline: "${data.slogan}"
sidebar: true
title: OWL Library
actions:
  - text: 加入服务器
    type: primary
    link: /play/
  - text: 运营控制台
    type: secondary
    link: /owl-x4-app/
  - text: 了解服务器
    type: secondary
    link: /wiki/OWL-Server.html
  - text: 经济系统
    type: secondary
    link: /wiki/OWL-Economy.html
  - text: 资金明细
    type: secondary
    link: /finance/

footer: MIT Licensed | Copyright © 2023-至今 OWL Union
---

# 欢迎来到 OWL Library

OWL Library 是 OWL Server 的公开知识库。这里整理服务器加入方式、当前周目、经济系统、公告、资金明细和历史资料。

::: tip OWL Server X4 已开服

Java 版：\`${data.address}:${data.javaPort}\`  
基岩版：\`${data.address}:${data.bedrockPort}\`

X4 是 Java + 基岩互通生存服，并带有跨版本支持。

:::

## 推荐阅读

| 你想做什么 | 入口 |
|---|---|
| 立刻进服 | [加入服务器](/play/) |
| 生成宣传文案和运营清单 | [运营控制台](/owl-x4-app/) |
| 了解 OWL 和 X4 当前信息 | [了解服务器](/wiki/OWL-Server.html) |
| 查看金币、领地、飞行等规则 | [经济系统](/wiki/OWL-Economy.html) |
| 查看赞助与支出 | [资金明细](/finance/) |

## OWL X4 一句话

${data.oneLine} 金币可以买便利，不能买无敌。
`)

await writeFile(playPath, `# 加入服务器

OWL Server 当前运行周目为 **${data.season}**。X4 是 Java 版 + 基岩版互通服务器，并带有跨版本支持，可以允许一定范围内的版本跨度。

::: tip 快速加入

Java 版直连：\`${data.address}:${data.javaPort}\`  
基岩版地址：\`${data.address}\`，端口：\`${data.bedrockPort}\`

:::

## 服务器地址

| 版本 | 地址 | 端口 | 支持版本 |
|---|---|---:|---|
| Java 版 | \`${data.address}\` | \`${data.javaPort}\` | \`${data.javaVersion}\` |
| 基岩版 | \`${data.address}\` | \`${data.bedrockPort}\` | \`${data.bedrockVersion}\` |

**[基岩版一键导入](${data.joinUrl})**

## 第一次进入后做什么

1. 阅读出生点规则和基础指引。
2. 领取新手资源，了解金币、传送、领地和每日任务。
3. 使用 \`/rtp\` 或服务器菜单前往适合生存的位置。
4. 建立第一个临时据点，并设置自己的家。
5. 加入社区频道，方便获得通知、活动信息和帮助。

::: note 历代周目存档

如果你想获取历代周目的存档，请移步 [OWL Memories](/wiki/OWL-Memories.html)。那里保留了大部分历史周目存档文件的下载方式。

:::
`)

await writeFile(serverPath, `# 了解服务器

OWL Server 是一个以“${data.slogan.replace('。', '')}”为理念的 Minecraft 社区服务器。当前运行周目为 **${data.name} ${data.season}**，定位为 ${data.type}，主打养老生存、主城共建、轻经济和长期社区建设。

::: tip 当前周目

${data.name} ${data.season} 已正式开服。Java 版可通过 \`${data.address}:${data.javaPort}\` 加入，基岩版可通过 \`${data.address}:${data.bedrockPort}\` 加入。

:::

## OWL 是什么样的服务器

| 方向 | 说明 |
|---|---|
| 玩法 | 生存、养老、主城共建、轻经济 |
| 平台 | Java 版 + 基岩版互通 |
| 社区 | 鼓励长期建设、玩家协作和公开记录 |
| 经济 | 金币用于便利、建筑辅助、领地、公寓、传送和装饰 |
| 底线 | 不出售 OP、创造、神装、常驻飞行等破坏平衡的权限 |

## X4 当前信息

| 项目 | 内容 |
|---|---|
| 当前周目 | ${data.season} |
| 服务器类型 | ${data.type} |
| Java 版 | \`${data.address}:${data.javaPort}\` |
| Java 版版本 | \`${data.javaVersion}\` |
| 基岩版地址 | \`${data.address}\` |
| 基岩版端口 | \`${data.bedrockPort}\` |
| 基岩版版本 | \`${data.bedrockVersion}\` |
| 核心理念 | ${data.slogan} |

## 公开状态

${statusText}

最后自动检查：${generatedAt}

## X4 适合谁

如果你希望找一个节奏慢一点、能长期建设、能参与服务器成长的小型社区，X4 会比较适合你。这里不是以人数堆叠为第一目标，而是希望留下真正愿意一起建设服务器的人。

如果你更想找高强度 PvP、开局即满配、夸张礼包、强付费能力或超大规模商业化快餐服，这里大概率不是最合适的选择。

## 服务器特色

${data.features.map((feature) => `- ${feature}`).join('\n')}

## 当前方向

| 方向 | 说明 |
|---|---|
| 新人体验 | 让新玩家快速开始生存，而不是进服后不知道做什么 |
| 长期建设 | 鼓励主城、公寓、领地、商铺和活动发展 |
| 轻经济 | 金币作为便利与社区服务媒介，不作为战斗力来源 |

## 快速入口

- [加入服务器](/play/)
- [运营控制台](/owl-x4-app/)
- [OWL 经济系统](/wiki/OWL-Economy.html)
- [资金明细](/finance/)

## 反馈问题

遇到连接异常、物品损坏、疑似作弊、规则争议等问题时，请在 OWL 社区频道中反馈。反馈时尽量提供截图、录像、时间、坐标和玩家名，方便管理组核查。

## 历史资料

旧周目的资料、纪念内容和存档下载会继续保留在 OWL Library 中。当前页面会集中维护 OWL Server 与 X4 的核心信息，避免新玩家在多个相似页面之间来回查找。
`)

await writeFile(statusPath, `# OWL Server ${data.season}

::: tip 页面已合并

X4 现状已经合并到 [了解服务器](/wiki/OWL-Server.html)。那里会统一维护 OWL Server 的介绍、X4 当前信息、服务器特色和当前方向。

:::

## 快速入口

- [了解服务器](/wiki/OWL-Server.html)
- [加入服务器](/play/)
- [OWL 经济系统](/wiki/OWL-Economy.html)

保留这个页面是为了兼容旧链接，避免已经发布出去的 \`X4 现状\` 地址失效。
`)

await writeFile(economyPath, `# OWL 经济系统

OWL 的金币系统用于维持服务器内的便利服务、领地、公寓、传送和装饰消费。

::: tip 核心原则

${data.economy.principle}

:::

## 基础汇率

| 项目 | 数值 |
|---|---:|
| 赞助换算 | ${data.economy.rate} |

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

| 类型 | 价格 |
|---|---:|
${data.economy.teleport.free.map((item) => `| \`${item}\` | 免费 |`).join('\n')}
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

::: warning 调整说明

经济系统会根据服务器活跃度、金币流通和玩家反馈继续调整。游戏内实际配置与本页面不一致时，请以游戏内公告和管理组说明为准。

:::
`)
