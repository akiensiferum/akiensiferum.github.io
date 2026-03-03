// assets/js/theme.js
(function () {
  const key = "acius-theme"; // "dark" | "light"
  const saved = localStorage.getItem(key);

  function apply(mode) {
    document.documentElement.setAttribute("data-theme", mode);
  }

  if (saved === "dark" || saved === "light") {
    apply(saved);
  } else {
    // default: dark (but respect OS if you prefer by flipping this logic)
    apply("dark");
  }

  window.__toggleTheme = function () {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    apply(next);
    localStorage.setItem(key, next);
  };
})();
