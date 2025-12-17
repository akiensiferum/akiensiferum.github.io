// assets/js/lang-switch.js
function rewriteLangLinks() {
  const links = document.querySelectorAll("a[data-lang]");
  if (!links.length) return;

  const path = location.pathname; // e.g. /it/tools/
  const langs = ["fr", "it", "la"];

  // Detect current language prefix (or null for English)
  let currentLang = null;
  for (const l of langs) {
    if (path === `/${l}/` || path.startsWith(`/${l}/`)) {
      currentLang = l;
      break;
    }
  }

  links.forEach(link => {
    const targetLang = link.dataset.lang;

    let newPath;
    if (currentLang) {
      // /it/tools/ -> /fr/tools/
      newPath = path.replace(`/${currentLang}/`, `/${targetLang}/`);
    } else {
      // /tools/ -> /fr/tools/
      newPath = `/${targetLang}${path}`;
    }

    newPath = newPath.replace(/\/{2,}/g, "/");
    link.setAttribute("href", newPath);
  });
}

document.addEventListener("DOMContentLoaded", rewriteLangLinks);
document.addEventListener("partials:loaded", rewriteLangLinks);
