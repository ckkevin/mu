# MU STUDIO 摄影工作室 · 静态网站

一个无需构建工具的中文摄影工作室官网示例，使用 HTML、CSS 和原生 JavaScript 制作。

## 页面

- `index.html` — 首页、品牌理念、精选影像、预约信息区
- `portfolio.html` — 摄影作品展示、按风格筛选、图片放大预览、键盘左右切换
- `team.html` — 3 位摄影师与 4 位化妆师的展示卡片（目前为占位）

## 本地运行

在项目目录中双击 `index.html` 即可打开。也可以使用本地静态服务：

```sh
python3 -m http.server 8000
```

然后访问 `http://localhost:8000/`。不需要 Node.js 或其他依赖。部分字体和示意图片来自在线 CDN，需要网络访问。

## 上线前必须替换

1. **品牌与员工信息**：`team.html` 中的员工姓名、专业方向、个人介绍及人物形象占位区域。当前仅使用“摄影师 01”等标记，不是真实姓名。
2. **真实摄影作品**：`index.html`、`portfolio.html` 和 `assets/css/style.css` 中当前使用的 Unsplash 展示图。示意图片不代表 MU STUDIO 作品，不得对外宣称其为自有案例。
3. **联系渠道**：`index.html` 中的 `#contact` 区域。请添加经过确认的微信、电话与地址。当前预约咨询按钮只跳到该信息区，**没有实际预约系统**。
4. **真实性与授权**：替换为已经获得模特和摄影版权授权、允许官网使用的图片与文案。

## GitHub Pages 部署

把全部文件上传到**指定的新建或已有仓库**后，在 GitHub 仓库的 `Settings → Pages` 中选择 `Deploy from a branch`，选中默认分支与 `/ (root)`，保存后由 GitHub 提供公开访问地址。

### 结构

```text
mu-studio-site/
├── index.html
├── portfolio.html
├── team.html
├── assets/
│   ├── css/style.css
│   └── js/main.js
├── PHOTO_CREDITS.md
└── README.md
```

## 技术细节

- 自适应桌面 / 平板 / 手机
- 移动端导航、筛选切换、无障碍辅助说明、键盘交互
- `prefers-reduced-motion` 友好
- 外部图片使用 Unsplash 公开展示图；不依赖任何外部 JS 框架