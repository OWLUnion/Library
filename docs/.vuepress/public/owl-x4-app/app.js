const server = {
  java: "kupars.top:35565",
  bedrockHost: "kupars.top",
  bedrockPort: "39132",
  javaVersion: "1.21.8 ~ 1.21.11 以及附近版本",
  bedrockVersion: "26.3 以及附近版本",
  lib: "https://lib.kupars.top/",
};

const platforms = {
  minebbs: "MineBBS 宣传帖",
  klpbbs: "KLPBBS 宣传帖",
  zhihu: "知乎文章",
  bilibili: "B站动态",
  group: "群公告",
};

const els = {
  toast: document.querySelector("#toast"),
  statusLabel: document.querySelector("#statusLabel"),
  copyOutput: document.querySelector("#copyOutput"),
  copyTitle: document.querySelector("#copyTitle"),
  updateInput: document.querySelector("#updateInput"),
  goalInput: document.querySelector("#goalInput"),
};

let currentPlatform = "minebbs";

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.setTimeout(() => els.toast.classList.remove("show"), 1800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("已复制");
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = text;
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand("copy");
    fallback.remove();
    showToast("已复制");
  }
}

function joinText() {
  return `OWL Server X4

Java 版：${server.java}
版本：${server.javaVersion}

基岩版：
地址：${server.bedrockHost}
端口：${server.bedrockPort}
版本：${server.bedrockVersion}

欢迎来到 OWL X4，欢迎回家。`;
}

const copyMap = {
  java: () => server.java,
  bedrock: () => `地址：${server.bedrockHost}\n端口：${server.bedrockPort}`,
  joinAll: joinText,
  ops: () => `OWL 今日运营清单

1. 检查服务器是否可进入。
2. 发一条群内今日话题或小任务。
3. 回复新人问题，记录重复出现的问题。
4. 收集一张可用于宣传的截图。
5. 晚上安排一次轻量活动。`,
};

function buildCopy(platform) {
  const updateText = els.updateInput.value.trim();
  const goal = els.goalInput.value;
  const addresses = `Java：${server.java}\n基岩：${server.bedrockHost}:${server.bedrockPort}`;

  if (platform === "minebbs") {
    return `【OWL Server X4】Java + 基岩互通生存服｜养老生存｜主城共建｜轻经济

OWL X4 现已正式开服。

我们想做的不是一个来得快、散得也快的服务器，而是一个愿意长期建设、愿意把故事慢慢留下来的社区。现在的 X4 是 Java + 基岩互通生存服，并带有跨版本支持，手机和电脑都可以加入。

本次重点：${goal}
${updateText}

服务器特色：
- Java 与基岩互通，手机和电脑都可以加入
- 主打养老生存、主城共建、轻经济和长期社区建设
- 金币主要用于飞行、领地、公寓、传送和装饰，不能直接买无敌
- 不出售 OP、创造、神装、常驻飞行等破坏平衡的权限
- 重要信息会尽量整理到 OWL Library，方便长期查看

服务器地址：
${addresses}

Java 支持版本：${server.javaVersion}
基岩支持版本：${server.bedrockVersion}

欢迎来到 OWL X4，欢迎回家。`;
  }

  if (platform === "klpbbs") {
    return `OWL Server X4 招新

类型：Java + 基岩互通生存服
方向：养老生存 / 主城共建 / 轻经济 / 长期社区

${updateText}

加入方式：
- Java：${server.java}
- 基岩地址：${server.bedrockHost}
- 基岩端口：${server.bedrockPort}

版本：
- Java：${server.javaVersion}
- 基岩：${server.bedrockVersion}

我们不卖 OP，不卖创造，不卖神装。金币更多是给大家提供便利和长期建设用的，而不是直接卖数值。

如果你想找一个能慢慢生活、慢慢建设、也愿意和大家一起留下记录的小型互通生存服，欢迎来 OWL X4 看看。`;
  }

  if (platform === "zhihu") {
    return `标题：为什么我们还在认真做一个小型 Minecraft 服务器？

OWL Server X4 已正式开服。

我们想做的不是一个快餐式服务器，而是一个能让人慢慢住下来、慢慢参与建设的小型社区。X4 是 Java 版 + 基岩版互通服务器，手机和电脑都可以加入，也带有跨版本支持。

对我们来说，更重要的事情其实很简单：

第一，新朋友进服以后，能知道自己接下来该做什么。
第二，老朋友回来以后，能看到这个世界还在继续成长。
第三，经济系统要服务于便利和建设，而不是把平衡卖掉。

${updateText}

加入方式：
Java：${server.java}
基岩：${server.bedrockHost}:${server.bedrockPort}

欢迎来到 OWL X4，欢迎回家。`;
  }

  if (platform === "bilibili") {
    return `OWL X4 现已正式开服。

Java + 基岩互通，手机电脑都能进。
主打养老生存、主城共建、轻经济和长期社区建设。

${updateText}

Java：${server.java}
基岩：${server.bedrockHost}:${server.bedrockPort}

不卖 OP，不卖神装，不卖常驻飞行。
金币可以买便利，不能买无敌。

欢迎来到 OWL X4，欢迎回家。`;
  }

  return `OWL X4 今日公告

${updateText}

加入方式：
Java：${server.java}
基岩：${server.bedrockHost}:${server.bedrockPort}

新人进服后可以先看看出生点指引，领一下新手资源，再慢慢找一个适合自己的地方开始生存。

欢迎来到 OWL X4，欢迎回家。`;
}

function renderCopy() {
  els.copyTitle.textContent = platforms[currentPlatform];
  els.copyOutput.value = buildCopy(currentPlatform);
}

async function refreshStatus() {
  els.statusLabel.textContent = "检查中";

  try {
    const url = `https://api.mcsrvstat.us/bedrock/3/${server.bedrockHost}:${server.bedrockPort}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.online) {
      const online = data.players?.online ?? 0;
      const max = data.players?.max ?? "?";
      els.statusLabel.textContent = `${online}/${max} 在线`;
    } else {
      els.statusLabel.textContent = "离线/不可达";
    }
  } catch {
    els.statusLabel.textContent = "检查失败";
  }
}

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
    item.classList.add("active");
    document.querySelector(`#${item.dataset.view}`).classList.add("active");
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => {
    const producer = copyMap[button.dataset.copy];
    if (producer) {
      copyText(producer());
    }
  });
});

document.querySelectorAll(".copy-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".copy-tab").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    currentPlatform = button.dataset.platform;
    renderCopy();
  });
});

document.querySelector("#generateCopy").addEventListener("click", renderCopy);
document.querySelector("#copyGenerated").addEventListener("click", () => copyText(els.copyOutput.value));
document.querySelector("#refreshStatus").addEventListener("click", refreshStatus);

renderCopy();
refreshStatus();
