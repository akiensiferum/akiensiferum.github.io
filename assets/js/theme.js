// Apply saved theme immediately (runs in <head> — prevents flash)
(function () {
  const saved = localStorage.getItem("siteTheme");
  document.documentElement.setAttribute("data-theme", saved || "day");
})();

// Wire up the toggle button once DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  const KEY = "siteTheme";
  const btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;
  btn.addEventListener("click", function () {
    const cur = document.body.getAttribute("data-theme") || "day";
    const next = cur === "night" ? "day" : "night";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
  });
});
