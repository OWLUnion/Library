import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()

const readmePath = resolve(root, 'docs/README.md')
const playPath = resolve(root, 'docs/play/README.md')
const serverPath = resolve(root, 'docs/wiki/OWL-Server.md')
const x4Path = resolve(root, 'docs/wiki/OWL-Server-X4.md')

const data = {
  javaHost: 'kupars.top',
  javaPort: '35565',
  javaVersion: '1.21.8 ~ 1.21.11 以及附近版本',
  bedrockHost: 'kupars.top',
  bedrockPort: '39132',
  bedrockVersion: '26.3 以及附近版本',
  currentLoop: 'X4',
  tagline: '一个正在发展中的互通养老生存服，主打主城共建、轻经济和长期社区建设。 金币可以买便利，不能买无敌。',
  features: [
    'Java 与基岩互通，手机和电脑都可以加入。',
    '有跨版本支持，可容许一定范围内的版本跨度。',
    '主打生存、养老、主城共建和玩家社区。',
    '金币主要用于飞行、领地、公寓、传送和装饰。',
    '不出售 OP、创造、神装、常驻飞行和破坏平衡的权限。',
    '重要变更会尽量沉淀到 OWL Library，避免信息只散落在聊天记录里。'
  ]
}

await writeFile(readmePath, `---
home: true
heroImage: /assets/世界旗/0.png
heroText: OWL Library
tagline: "自由，开放，平等，互爱。"
sidebar: true
title: OWL Library
actions:
  - text: 加入服务器
    type: primary
    link: /play/
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

::: tip OWL Server ${data.currentLoop} 已开服

Java 版：\`${data.javaHost}:${data.javaPort}\`  
基岩版：\`${data.bedrockHost}:${data.bedrockPort}\`

${data.currentLoop} 是 Java + 基岩互通生存服，并带有跨版本支持。

:::

## 推荐阅读

| 你想做什么 | 入口 |
|---|---|
| 立刻进服 | [加入服务器](/play/) |
| 了解 OWL 和 ${data.currentLoop} 当前信息 | [了解服务器](/wiki/OWL-Server.html) |
| 查看金币、领地、飞行等规则 | [经济系统](/wiki/OWL-Economy.html) |
| 查看赞助与支出 | [资金明细](/finance/) |

## OWL ${data.currentLoop} 一句话

${data.tagline}
`)

await writeFile(playPath, `# 加入服务器

OWL Server 当前运行周目为 **${data.currentLoop}**。${data.currentLoop} 是 Java 版 + 基岩版互通服务器，并带有跨版本支持，可以允许一定范围内的版本跨度。

::: tip 快速加入

Java 版直连：\`${data.javaHost}:${data.javaPort}\`  
基岩版地址：\`${data.bedrockHost}\`，端口：\`${data.bedrockPort}\`

:::

## 服务器地址

| 版本 | 地址 | 端口 | 支持版本 |
|---|---|---:|---|
| Java 版 | \`${data.javaHost}\` | \`${data.javaPort}\` | \`${data.javaVersion}\` |
| 基岩版 | \`${data.bedrockHost}\` | \`${data.bedrockPort}\` | \`${data.bedrockVersion}\` |

**[基岩版一键导入](minecraft://?addExternalServer=%C2%A7l%C2%A7bOWL%20%C2%A7aServer%C2%A7r|${data.bedrockHost}:${data.bedrockPort})**

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

OWL Server 是一个以“自由、开放、平等、互爱”为理念的 Minecraft 社区服务器。当前运行周目为 **OWL Server ${data.currentLoop}**，定位为 Java + 基岩互通生存服，主打养老生存、主城共建、轻经济和长期社区建设。

::: tip 当前周目

OWL Server ${data.currentLoop} 已正式开服。Java 版可通过 \`${data.javaHost}:${data.javaPort}\` 加入，基岩版可通过 \`${data.bedrockHost}:${data.bedrockPort}\` 加入。

:::

## OWL 是什么样的服务器

| 方向 | 说明 |
|---|---|
| 玩法 | 生存、养老、主城共建、轻经济 |
| 平台 | Java 版 + 基岩版互通 |
| 社区 | 鼓励长期建设、玩家协作和公开记录 |
| 经济 | 金币用于便利、建筑辅助、领地、公寓、传送和装饰 |
| 底线 | 不出售 OP、创造、神装、常驻飞行等破坏平衡的权限 |

## ${data.currentLoop} 当前信息

| 项目 | 内容 |
|---|---|
| 当前周目 | ${data.currentLoop} |
| 服务器类型 | Java + 基岩互通生存服 |
| Java 版 | \`${data.javaHost}:${data.javaPort}\` |
| Java 版版本 | \`${data.javaVersion.replace(' 以及附近版本', '')}\` 以及附近版本 |
| 基岩版地址 | \`${data.bedrockHost}\` |
| 基岩版端口 | \`${data.bedrockPort}\` |
| 基岩版版本 | \`${data.bedrockVersion.replace(' 以及附近版本', '')}\` 以及附近版本 |
| 核心理念 | 自由，开放，平等，互爱 |

## ${data.currentLoop} 适合谁

如果你希望找一个节奏慢一点、能长期建设、能参与服务器成长的小型社区，${data.currentLoop} 会比较适合你。这里不是以人数堆叠为第一目标，而是希望留下真正愿意一起建设服务器的人。

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
- [OWL 经济系统](/wiki/OWL-Economy.html)
- [资金明细](/finance/)

## 反馈问题

遇到连接异常、物品损坏、疑似作弊、规则争议等问题时，请在 OWL 社区频道中反馈。反馈时尽量提供截图、录像、时间、坐标和玩家名，方便管理组核查。

## 历史资料

旧周目的资料、纪念内容和存档下载会继续保留在 OWL Library 中。当前页面会集中维护 OWL Server 与 ${data.currentLoop} 的核心信息，避免新玩家在多个相似页面之间来回查找。
`)

await writeFile(x4Path, `# ${data.currentLoop} 现状

该页面已并入 [了解服务器](/wiki/OWL-Server.html)。

如果你想看当前周目、加入方式、玩法定位、经济原则和服务器方向，请直接前往：

- [了解服务器](/wiki/OWL-Server.html)
- [加入服务器](/play/)
- [经济系统](/wiki/OWL-Economy.html)
`)

console.log('OWL server pages updated.')
