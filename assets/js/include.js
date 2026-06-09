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

  // Mark active nav link, including grouped routes.
  const path = location.pathname.replace(/\/+$/, "")