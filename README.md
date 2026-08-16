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
