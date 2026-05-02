const server={java:"kupars.top:35565",bedrockHost:"kupars.top",bedrockPort:"39132",javaVersion:"1.21.8 ~ 1.21.11 以及附近版本",bedrockVersion:"26.3 以及附近版本",lib:"https://lib.kupars.top/"};const platforms={minebbs:"MineBBS 宣传帖",klpbbs:"KLPBBS 宣传帖",zhihu:"知乎文章",bilibili:"B站动态",group:"群公告"};const els={toast:document.querySelector("#toast"),statusLabel:document.querySelector("#statusLabel"),copyOutput:document.querySelector("#copyOutput"),copyTitle:document.querySelector("#copyTitle"),updateInput:document.querySelector("#updateInput"),goalInput:document.querySelector("#goalInput")};let currentPlatform="minebbs";function showToast(e){els.toast.textContent=e;els.toast.classList.add("show"),window.setTimeout(()=>els.toast.classList.remove("show"),1800)}async function copyText(e){try{await navigator.clipboard.writeText(e),showToast("已复制")}catch{const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove(),showToast("已复制")}}function joinText(){return`OWL Server X4

Java 版：${server.java}
版本：${server.javaVersion}

基岩版：
地址：${server.bedrockHost}
端口：${server.bedrockPort}
版本：${server.bedrockVersion}

欢迎来到 OWL X4，欢迎回家。`}const copyMap={java:()=>server.java,bedrock:()=>`地址：${server.bedrockHost}\n端口：${server.bedrockPort}`,joinAll:joinText,ops:()=>`OWL 今日运营清单

1. 检查服务器是否可进入。
2. 发一条群内今日话题或小任务。
3. 回复新人问题，记录重复出现的问题。
4. 收集一张可用于宣传的截图。
5. 晚上安排一次低成本活动。`};function buildCopy(e){const t=els.updateInput.value.trim(),n=els.goalInput.value,r=`Java：${server.java}\n基岩：${server.bedrockHost}:${server.bedrockPort}`;return"minebbs"===e?`【OWL Server X4】Java + 基岩互通生存服｜养老生存｜主城共建｜轻经济

OWL X4 已正式开服。本服是 Java 版 + 基岩版互通服务器，并带有跨版本支持，可以容许一定范围内的版本跨度。

本次重点：${n}
${t}

服务器特色：
- Java 与基岩互通，手机和电脑都可以加入
- 主打养老生存、主城共建和长期社区建设
- 轻经济系统：金币可用于飞行、领地、公寓、传送和装饰
- 不出售 OP、创造、神装、常驻飞行等破坏平衡的权限
- 重要信息会同步到 OWL Library，方便玩家长期查看

服务器地址：
${r}

Java 支持版本：${server.javaVersion}
基岩支持版本：${server.bedrockVersion}

欢迎来到 OWL X4，欢迎回家。`:"klpbbs"===e?`OWL Server X4 招新

类型：Java + 基岩互通生存服
方向：养老生存 / 主城共建 / 轻经济 / 长期社区

${t}

加入方式：
- Java：${server.java}
- 基岩地址：${server.bedrockHost}
- 基岩端口：${server.bedrockPort}

版本：
- Java：${server.javaVersion}
- 基岩：${server.bedrockVersion}

我们不卖 OP、不卖创造、不卖神装。金币主要用于便利、领地、飞行、公寓、传送和装饰。

如果你想找一个能慢慢建设的小型互通生存服，欢迎来 OWL X4。`:"zhihu"===e?`标题：为什么我们还在认真做一个小型 Minecraft 服务器？

OWL Server X4 已正式开服。

我们想做的不是一个快餐式服务器，而是一个能长期留下记录、能让玩家参与建设的小型社区。X4 是 Java 版 + 基岩版互通服务器，手机和电脑都可以加入，也带有跨版本支持。

这次我们更重视三件事：

第一，新玩家进服以后要知道自己能做什么。
第二，老玩家要有长期建设目标，比如主城、公寓、领地、商铺和活动。
第三，经济系统不能破坏平衡。金币可以买便利、装饰和服务，但不能买无敌。

${t}

加入方式：
Java：${server.java}
基岩：${server.bedrockHost}:${server.bedrockPort}

欢迎来到 OWL X4，欢迎回家。`:"bilibili"===e?`OWL X4 已正式开服！

Java + 基岩互通，手机电脑都能进。
主打养老生存、主城共建、轻经济和长期社区建设。

${t}

Java：${server.java}
基岩：${server.bedrockHost}:${server.bedrockPort}

不卖 OP，不卖神装，不卖常驻飞行。
金币可以买便利，不能买无敌。

欢迎来到 OWL X4，欢迎回家。`:`OWL X4 今日公告

${t}

加入方式：
Java：${server.java}
基岩：${server.bedrockHost}:${server.bedrockPort}

新人进服后请先阅读出生点指引，领取新手资源，并设置自己的家。

欢迎来到 OWL X4，欢迎回家。`}function renderCopy(){els.copyTitle.textContent=platforms[currentPlatform],els.copyOutput.value=buildCopy(currentPlatform)}async function refreshStatus(){els.statusLabel.textContent="检查中";try{const e=`https://api.mcsrvstat.us/bedrock/3/${server.bedrockHost}:${server.bedrockPort}`,t=await fetch(e),n=await t.json();if(n.online){const e=n.players?.online??0,t=n.players?.max??"?";els.statusLabel.textContent=`${e}/${t} 在线`}else els.statusLabel.textContent="离线/不可达"}catch{els.statusLabel.textContent="检查失败"}}document.querySelectorAll(".nav-item").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".nav-item").forEach(e=>e.classList.remove("active")),document.querySelectorAll(".view").forEach(e=>e.classList.remove("active")),e.classList.add("active"),document.querySelector(`#${e.dataset.view}`).classList.add("active")})}),document.querySelectorAll("[data-copy]").forEach(e=>{e.addEventListener("click",()=>{const t=copyMap[e.dataset.copy];t&&copyText(t())})}),document.querySelectorAll(".copy-tab").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".copy-tab").forEach(e=>e.classList.remove("active")),e.classList.add("active"),currentPlatform=e.dataset.platform,renderCopy()})}),document.querySelector("#generateCopy").addEventListener("click",renderCopy),document.querySelector("#copyGenerated").addEventListener("click",()=>copyText(els.copyOutput.value)),document.querySelector("#refreshStatus").addEventListener("click",refreshStatus),renderCopy(),refreshStatus();
