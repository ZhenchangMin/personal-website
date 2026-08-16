/* 个人主页交互脚本：中英文切换、主题切换、移动端菜单、滚动显现动画、导航高亮 */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- 中英文切换（默认英文，选择会记住） ---------- */
  var LANG_KEY = "lang";
  var LANG_TEXT = {
    en: {
      title: "Zhenchang Min · Personal Website",
      description: "Zhenchang Min's personal website — projects, hobbies and contact. Student at Nanjing University."
    },
    zh: {
      title: "闵振昌 · 个人主页",
      description: "闵振昌的个人网站 —— 南京大学学生，记录我的项目、爱好与联系方式。"
    }
  };

  var langToggle = document.getElementById("lang-toggle");
  var themeToggle = document.getElementById("theme-toggle");
  var navToggle = document.getElementById("nav-toggle");

  function applyLang(lang) {
    root.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = LANG_TEXT[lang].title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", LANG_TEXT[lang].description);

    document.querySelectorAll("[data-en]").forEach(function (el) {
      el.textContent = el.getAttribute(lang === "zh" ? "data-zh" : "data-en");
    });

    // 按钮和图标按钮的无障碍标签也跟着换
    langToggle.textContent = lang === "zh" ? "EN" : "中文";
    themeToggle.setAttribute("aria-label", lang === "zh" ? "切换深色 / 浅色模式" : "Toggle dark / light mode");
    themeToggle.setAttribute("title", lang === "zh" ? "切换深色 / 浅色模式" : "Toggle dark / light mode");
    navToggle.setAttribute("aria-label", lang === "zh" ? "打开菜单" : "Open menu");

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* 忽略 */ }
  }

  var savedLang = null;
  try { savedLang = localStorage.getItem(LANG_KEY); } catch (e) { /* 忽略 */ }
  applyLang(savedLang === "zh" ? "zh" : "en");

  langToggle.addEventListener("click", function () {
    applyLang(root.lang === "zh-CN" ? "en" : "zh");
  });

  /* ---------- 深色 / 浅色主题切换 ---------- */
  function syncThemeIcon() {
    themeToggle.textContent = root.dataset.theme === "dark" ? "☀️" : "🌙";
  }

  themeToggle.addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("site-theme", next);
    } catch (e) {
      /* 隐私模式下 localStorage 可能不可用，忽略即可 */
    }
    syncThemeIcon();
  });
  syncThemeIcon();

  /* ---------- 移动端菜单开合 ---------- */
  var header = document.querySelector(".site-header");
  var navLinks = document.querySelectorAll(".site-nav a");

  navToggle.addEventListener("click", function () {
    var open = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 页脚年份自动更新 ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- 滚动进入视口时显现卡片 ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* 老浏览器降级：直接显示 */
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- 滚动时高亮当前分区的导航项 ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll(".site-nav a");

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navAnchors.forEach(function (a) {
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) {
      sectionObserver.observe(s);
    });
  }
})();
