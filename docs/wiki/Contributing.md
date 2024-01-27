# OWL Library 贡献指北

你可能在 Library 发现过一些~~看着不顺眼~~值得改进的地方，我们鼓励各位为此网站做出贡献，请勇于编辑和修正！

## 准备工作

OWL Library 由 [Vuepress](https://v2.vuepress.vuejs.org/zh/) 驱动，静态网站托管于 AlexXuCN 的服务器，代码和文字储存于 Github。

<VPCard
  title="OWLUnion/Library"
  desc="OWL Library 的 Github 储存库"
  logo="https://lib.kupars.top/assets/logo/library.png"
  link="https://github.com/OWLUnion/Library"
  background="rgba(247,248,250,0.15)"
/>

因此，你需要：  
- 一个 GitHub 帐户  
- 可以访问 GitHub 的网络环境
- 一定 Markdown 基础
- 阅读和说人话的能力

你可以选择：  
- [编辑单一页面](#编辑单一页面)
- [编辑多个页面](#编辑多个页面)
- [在本地编辑](#在本地编辑)

祝你编辑愉快！

## 编辑单一页面  

你可以点击对应页面*（除了主页）*底部的 `在 GitHub 上编辑` 按钮

### 创建Fork

如果你是第一次编辑，你应该会遇到提示：`You need to fork this repository to propose changes.`  
由于你没有直接修改我们的储存库内容的权限，你需要为原储存库创建`复刻 (Fork)`后编辑自己的储存库，然后为主储存库提交`拉取请求 (Pull Request)`后由我们检查并合并

此时应点击 `Fork this repository`，你应该可以看到编辑器页面
![Forking the repository](/assets/contributing-guide/Screenshot_20240127_144644_com.huawei.browser_edit_358387449985935.jpg)

### 提交更改

在编辑完后，请点击页面上的`Commit changes`按钮来保存编辑至自己的储存库

接下来，你应该来到了`Comparing changes`页面  
无论是否有冲突 *(Able to merge (绿色) 或 Unable to merge (红色) )*，当你确认无误后，你可以点击`Create a pull request`来提交拉取请求

![Create a pull request](/assets/contributing-guide/Screenshot_20240127_152002_com.huawei.browser.png)

在接下来的页面中，请为你的拉取请求输入标题和描述（例如对编辑的概要等）后，点击`Create pull request`来提交

我们会收到通知并尽快处理你的拉取请求，你也可以考虑在QQ或其他地方提醒我们

至此已经全部完成，感谢你对 OWL Library 的贡献

## 编辑多个页面

你可以为原储存库创建`复刻 (Fork)`后在 GitHub 上编辑自己的储存库，然后为主储存库提交`拉取请求 (Pull Request)`后由我们检查并合并

### 创建复刻

如果你之前没有编辑过，你可以在 OWL Library 的 GitHub 储存库页面，点击右上角的`Fork`来创建复刻  
![Create a fork](/assets/contributing-guide/Screenshot_20240127_152859_com.huawei.browser_edit_360087544396092.png)

如果你在之前为主储存库创建过复刻，你可能需要让你的复刻与主储存库的新增更改保持一致，请进入你的储存库，并选择`Sync fork`

![Sync fork](/assets/contributing-guide/Screenshot_20240127_155028.jpg)

### 编辑文件

进入你帐户下的对应储存库  
OWL Library 的文本内容实际上储存在`储存库/docs`下，你可以在此目录中查找并进入对应文件的页面  
接着，你需要点击文件内容右上角的三点菜单并选择`Edit in place`，你应该可以看到编辑器页面

或者，你可以**在创建复刻后**回到 OWL Library 网站，并点击对应页面*（除了主页）*底部的 `在 GitHub 上编辑` 按钮

### 提交更改

在编辑完后，请点击页面上的`Commit changes`按钮来保存编辑至自己的储存库

编辑完所有文件后，请回到你的储存库的主页，当你确认无误后，你可以点击`Contribute - Open pull request`来提交拉取请求

![Open pull request](/assets/contributing-guide/Screenshot_20240127_155707_com.huawei.browser.png)

在接下来的页面中，请为你的拉取请求输入标题和描述（例如对编辑的概要等）后，点击`Create pull request`来提交

我们会收到通知并尽快处理你的拉取请求，你也可以考虑在QQ或其他地方提醒我们

至此已经全部完成，感谢你对 OWL Library 的贡献

## 在本地编辑

如果你有电脑等设备，你可以考虑将储存库`克隆 (Clone)`到本地编辑

优点：  
- 可以使用自己习惯的代码编辑器
- 可以在本地预览更改

你需要准备：  
- 命令行的使用经验
- Git的使用经验
- Node.js和pnpm

### 准备

首先要安装好 `Git`和`Node.js`（最好是版本20，也推荐你使用[fnm](https://github.com/Schniz/fnm)来管理Node.js的版本）

使用以下命令安装`pnpm`（如果你没有）:  
```bash
npm i -g pnpm
```

#### 配置Git

配置好用户名和邮箱后，还应该设置GitHub账号，推荐使用[GitHub CLI](https://cli.github.com/)

安装好 GitHub CLI 后，你可以在命令行中使用`gh auth login`来登录帐号，请随命令行中出现的提示完成操作  
登录成功后，使用`gh auth setup-git`来完成配置

#### 克隆储存库到本地

::: code-tabs#shell

@tab:active https
```bash
git clone https://github.com/<你的用户名>/Library.git
```

@tab ssh
```bash
git clone git@github.com:<你的用户名>/Library.git
```

@tab GitHub CLI
```bash
git repo clone <你的用户名>/Library
```

:::

#### 安装依赖

进入克隆好的本地储存库目录，使用命令  
```bash
pnpm i
```

然后你可以开始编辑

### 本地预览

你可以进入克隆好的本地储存库目录，使用命令  
```bash
pnpm run docs:dev
```
并在网页浏览器中打开 <http://localhost:8080> 以查看最终效果

### 提交更改

确保Git追踪所有文件更改：
```bash
git add .
```

提交commit：
```bash
git commit -m <你的commit消息>
```

推送至GitHub：
```bash
git push
```

确认无误后，可以使用 GitHub 网页或 GitHub CLI 来提交拉取请求

我们会收到通知并尽快处理你的拉取请求，你也可以考虑在QQ或其他地方提醒我们

至此已经全部完成，感谢你对 OWL Library 的贡献
