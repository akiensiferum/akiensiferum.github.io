// assets/js/include.js
async function includePartials() {
  const nodes = document.querySelectorAll("[data-include]");
  await Promise.all([...nodes].map(async (el) => {
    const url = el.getAttribute("data-include");
    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      el.innerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<div style="padding:1rem;opacity:.8">Partial failed: ${url}</div>`;
      console.error("Include failed:", url, err);
    }
  }));

  // Mark active nav link (simple)
  const path = location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll('a[data-navlink="true"]').forEach(a => {
    const href = (a.getAttribute("href") || "").replace(/\/$/, "") || "/";
    if (href === path) a.setAttribute("aria-current", "page");
  });

  // Keep language switch on the current section when possible.
  const supportedLangs = new Set(["en", "fr", "it", "la"]);
  const knownSections = new Set([
    "about",
    "research",
    "tools",
    "portfolio",
    "blog",
    "contact",
  ]);
  const normalizedPath = location.pathname.replace(/\/+/g, "/");
  const parts = normalizedPath.split("/").filter(Boolean);
  const currentLang = supportedLangs.has(parts[0]) && parts[0] !== "en" ? parts[0] : "en";
  const relativeParts = currentLang === "en" ? parts : parts.slice(1);
  const section = relativeParts[0] || "";

  function buildPath(lang, segments) {
    const all = lang === "en" ? segments : [lang, ...segments];
    if (!all.length) return "/";
    return `/${all.join("/")}/`;
  }

  document.querySelectorAll("a[data-lang]").forEach((a) => {
    const lang = (a.getAttribute("data-lang") || "").toLowerCase();
    if (!supportedLangs.has(lang)) return;

    let nextSegments = [];
    if (relativeParts.length === 0) {
      nextSegments = [];
    } else if (knownSections.has(section)) {
      if (lang === currentLang) {
        nextSegments = relativeParts;
      } else {
        nextSegments = [section];
      }
    } else {
      nextSegments = [];
    }

    a.setAttribute("href", buildPath(lang, nextSegments));
    if (lang === currentLang) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
  
  // ✅ ADD THIS: tell other scripts partials are now in the DOM
  document.dispatchEvent(new Event("partials:loaded"));
}

document.addEventListener("DOMContentLoaded", includePartials);
