// assets/js/lang-switch.js
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("[data-lang]");
  if (!links.length) return;

  const path = location.pathname;

  // Detect current language prefix
  const langs = ["fr", "it", "la"];
  let currentLang = null;

  for (const l of langs) {
    if (path === `/${l}/` || path.startsWith(`/${l}/`)) {
      currentLang = l;
      break;
    }
  }

  links.forEach(link => {
    const targetLang = link.dataset.lang;

    let newPath = path;

    if (currentLang) {
      // replace current language with target
      newPath = path.replace(`/${currentLang}/`, `/${targetLang}/`);
    } else {
      // from English (no prefix)
      newPath = `/${targetLang}${path}`;
    }

    // Normalize double slashes
    newPath = newPath.replace(/\/{2,}/g, "/");

    link.setAttribute("href", newPath);
  });
});
