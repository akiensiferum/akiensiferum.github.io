function rewriteLangLinks() {
  const links = document.querySelectorAll("a[data-lang]");
  if (!links.length) return;

  const path = location.pathname; // e.g. /it/tools/
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
    let newPath;

    if (targetLang === "en") {
      // remove prefix if we are in /fr/... /it/... /la/...
      newPath = currentLang ? path.replace(`/${currentLang}`, "") : path;
      if (newPath === "") newPath = "/";
    } else {
      if (currentLang) {
        newPath = path.replace(`/${currentLang}/`, `/${targetLang}/`);
      } else {
        newPath = `/${targetLang}${path}`;
      }
    }

    newPath = newPath.replace(/\/{2,}/g, "/");
    link.setAttribute("href", newPath);
  });
}

document.addEventListener("DOMContentLoaded", rewriteLangLinks);
document.addEventListener("partials:loaded", rewriteLangLinks);
