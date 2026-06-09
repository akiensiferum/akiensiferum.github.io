// Apply saved theme immediately (runs in <head> — prevents flash)
const KEY = "siteTheme";

function applyTheme(theme) {
  const cleanTheme = theme === "night" ? "night" : "day";
  document.documentElement.setAttribute("data-theme", cleanTheme);

  if (document.body) {
    document.body.setAttribute("data-theme", cleanTheme);
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "day";
  const next = current === "night" ? "day" : "night";
  applyTheme(next);
  localStorage.setItem(KEY, next);
}

(function () {
  applyTheme(localStorage.getItem(KEY) || "day");
  window.__toggleTheme = toggleTheme;
})();

document.addEventListener("DOMContentLoaded", function () {
  applyTheme(localStorage.getItem(KEY) || "day");

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
  });
});
