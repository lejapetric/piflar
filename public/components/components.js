// public/components/components.js
// Skupni del vseh strani: header, sidebar, footer, MathJax in fiksni header.

const MATHJAX_URL = "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js";
const MOBILE_BREAKPOINT = 768;
const HIDE_HEADER_AFTER = 80; // px

// ============================================================
// 1. MATHJAX — naloži se samo na straneh, ki vsebujejo formule
// ============================================================
function loadMathJax() {
  const text = document.body.textContent;
  if (!text.includes("\\(") && !text.includes("\\[") && !text.includes("$$")) return;

  // Konfiguracija mora obstajati, preden se skripta naloži.
  window.MathJax = {
    tex: {
      inlineMath: [["\\(", "\\)"]],
      displayMath: [["$$", "$$"], ["\\[", "\\]"]],
      processEscapes: true,
      processEnvironments: true,
    },
    options: {
      skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"],
    },
  };

  const script = document.createElement("script");
  script.src = MATHJAX_URL;
  script.async = true;
  script.onerror = () => console.error("MathJax se ni naložil:", MATHJAX_URL);
  document.head.appendChild(script);
}

// ============================================================
// 2. KOMPONENTE (header, sidebar, footer)
// ============================================================
async function loadComponent(url, targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} → ${res.status}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error("Napaka pri nalaganju komponente:", err);
  }
}

// ============================================================
// 3. SIDEBAR (odpri/zapri, podmeniji, aktivna povezava)
// ============================================================
function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");
  const menuBtn = document.getElementById("openSidebar");
  if (!sidebar) return;

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  function setOpen(open) {
    sidebar.classList.toggle("open", open);
    mainContent?.classList.toggle("shifted", open);
    overlay.classList.toggle("visible", open);
    menuBtn?.setAttribute("aria-expanded", String(open));
  }

  menuBtn?.addEventListener("click", () => setOpen(!sidebar.classList.contains("open")));
  document.getElementById("closeSidebar")?.addEventListener("click", () => setOpen(false));
  overlay.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // En poslušalec za vse klike v sidebarju
  sidebar.addEventListener("click", (e) => {
    const toggle = e.target.closest(".dropdown-toggle");
    if (toggle) {
      const target = document.getElementById(toggle.dataset.target);
      if (!target) return;
      const isOpen = target.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      return;
    }
    if (e.target.closest("a") && window.innerWidth <= MOBILE_BREAKPOINT) setOpen(false);
  });

  // Označi aktivno povezavo in odpri vse menije nad njo
  const currentPath = window.location.pathname;
  const active = [...sidebar.querySelectorAll(".sidebar-nav a")].find(
    (link) => link.getAttribute("href") === currentPath
  );
  if (!active) return;

  active.classList.add("active");
  for (let el = active.parentElement; el && el !== sidebar; el = el.parentElement) {
    if (!el.id) continue;
    const toggle = sidebar.querySelector(`.dropdown-toggle[data-target="${el.id}"]`);
    if (!toggle) continue;
    el.classList.add("open");
    toggle.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }
}

// ============================================================
// 4. FIKSNI HEADER — skrij ob drsenju navzdol, pokaži ob drsenju navzgor
// ============================================================
function initHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  const dateEl = document.getElementById("currentDate");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("sl-SI", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  let lastScrollY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("header--scrolled", y > 0);
    if (y <= 0 || y < lastScrollY) header.classList.remove("header--hidden");
    else if (y > HIDE_HEADER_AFTER) header.classList.add("header--hidden");
    lastScrollY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ============================================================
// ZAGON
// ============================================================
async function init() {
  loadMathJax();

  await Promise.all([
    loadComponent("/components/header.html", "header"),
    loadComponent("/components/sidebar.html", "sidebar"),
    loadComponent("/components/footer.html", "footer"),
  ]);

  initHeader();
  initSidebar();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
