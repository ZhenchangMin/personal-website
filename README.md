# 我的个人主页

一个纯静态单页网站（HTML + CSS + JS，无需任何构建工具），专为 GitHub Pages 部署设计。

包含板块：**首屏自我介绍 · 项目展示 · 爱好 · 联系方式**，自带**深色默认主题**（可切换浅色，选择会记住）、**中英文切换（默认英文）** 和移动端适配。

## 文件结构

```
├── index.html      # 页面内容（所有需要你填的个人信息都在这里）
├── css/style.css   # 样式（换配色只改文件开头两组 CSS 变量）
├── js/main.js      # 交互：主题切换、移动端菜单、滚动动画
├── assets/         # 放头像等图片资源
├── .nojekyll       # 告诉 GitHub Pages 不要按 Jekyll 处理（保持原样即可）
└── README.md       # 本说明
```

## 修改网站内容

个人信息已基本填好（名字、身份、爱好、项目、联系方式）。日常改动参考：

| 想改什么 | 去哪改 |
| --- | --- |
| 名字 / 身份 / 自我介绍 | `index.html` 首屏区（logo、首屏、页脚三处）；网页标题与 SEO 描述在 `js/main.js` 的 `LANG_TEXT` |
| 爱好卡片的文案或跳转链接 | 对应卡片的 `data-en` / `data-zh` 和 `href` |
| 项目卡片（增删改） | `index.html` 项目区，复制整段 `<article>` 即可加新项目 |
| 联系方式 | `index.html` 联系区（目前是邮箱 + GitHub 两张卡片） |
| 头像 | 覆盖 `assets/avatar.jpg`（GitHub 头像，460×460） |

## 中英文双语机制

- **默认英文**。顶栏的「中文 / EN」按钮可随时切换，访客的选择会记住（localStorage），`<html lang>` 也会同步更新。
- 每段可翻译文案都写成这样（在 `index.html` 里）：

  ```html
  <h3 data-en="Football" data-zh="足球">Football</h3>
  ```

  标签里的默认文字、`data-en`、`data-zh` **三处都改** 才能保证两种语言一致。
- 网站标题 `<title>` 和 meta 描述的中英文版本存放在 `js/main.js` 顶部的 `LANG_TEXT` 里，改名字时记得一并修改。
- 新增可翻译内容时，照上面的格式加上 `data-en` / `data-zh` 即可，切换按钮会自动处理。
- 想把默认语言改成中文：把 `index.html` 里各处默认文字换成中文并把 `<html lang="en">` 改为 `zh-CN`，再把 `js/main.js` 里的 `applyLang(savedLang === "zh" ? "zh" : "en")` 改为三元反转即可。

## 本地预览

直接双击 `index.html` 用浏览器打开即可。如果想模拟线上环境，也可以在本目录启动一个静态服务器：

```bash
# 任选其一
python -m http.server 8000
npx serve .
```

然后访问 http://localhost:8000

## 部署到 GitHub Pages

### 方式一：用户主页（推荐，网址最短）

1. 在 GitHub 上新建一个**公开**仓库，名字必须是 `你的用户名.github.io`（例如用户名为 `zhangsan`，仓库就叫 `zhangsan.github.io`）；
2. 在本目录（`index.html` 所在的文件夹）打开终端，执行：

   ```bash
   git init
   git add .
   git commit -m "init: 个人主页第一版"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
   git push -u origin main
   ```

3. 等待一两分钟，访问 **https://你的用户名.github.io** 即可看到网站。

### 方式二：放在任意仓库里

1. 把文件推送到任意公开仓库的 `main` 分支；
2. 打开仓库 **Settings → Pages**，Source 选择 **Deploy from a branch**，分支选 `main`、目录选 `/ (root)`，保存；
3. 一两分钟后访问 **https://你的用户名.github.io/仓库名**。

> 以后每次改完内容，只需 `git add . && git commit -m "更新" && git push`，Pages 会自动重新发布（可在仓库的 Actions 标签页查看部署进度）。

### 可选：绑定自己的域名

在仓库 **Settings → Pages → Custom domain** 填入你的域名，并在域名服务商处添加 CNAME 解析到 `你的用户名.github.io`。

## 常见问题

- **推送后网页没变？** GitHub Pages 部署约需 1–2 分钟，可强制刷新（Ctrl+F5）或看 Actions 页确认部署完成。
- **想换主色调？** 打开 `css/style.css`，修改开头 `:root` 和 `:root[data-theme="dark"]` 里的 `--accent` 系列变量即可。
