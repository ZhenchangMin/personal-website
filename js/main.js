/* Only one enhancement is needed: bilingual copy. All content remains visible without JS. */
(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("lang-toggle");
  var year = document.getElementById("year");
  var descriptions = {
    en: "Zhenchang Min is an undergraduate student in Software Engineering at Nanjing University. Research interests, projects, and contact.",
    zh: "闵振昌的个人学术主页。南京大学软件工程专业本科生，记录研究兴趣、项目与联系方式。"
  };

  function applyLanguage(language) {
    var zh = language === "zh";
    root.lang = zh ? "zh-CN" : "en";
    document.title = zh ? "闵振昌 · 个人主页" : "Zhenchang Min · Home";
    var description = document.querySelector('meta[name="description"]');
    if (description) description.content = descriptions[zh ? "zh" : "en"];
    document.querySelectorAll("[data-en][data-zh]").forEach(function (element) {
      element.textContent = element.getAttribute(zh ? "data-zh" : "data-en");
    });
    toggle.textContent = zh ? "EN" : "中文";
    toggle.setAttribute("aria-label", zh ? "Switch to English" : "切换为中文");
    try { localStorage.setItem("personal-website-language", zh ? "zh" : "en"); } catch (_) {}
  }

  var saved = "en";
  try { saved = localStorage.getItem("personal-website-language") || localStorage.getItem("lang") || "en"; } catch (_) {}
  applyLanguage(saved === "zh" ? "zh" : "en");
  toggle.addEventListener("click", function () {
    applyLanguage(root.lang === "zh-CN" ? "en" : "zh");
  });
  if (year) year.textContent = String(new Date().getFullYear());
})();
