document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ components.js zagnan");

  // ============================================================
  // 0. NALOŽI MATHJAX
  // ============================================================
  await new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    script.onload = () => {
      console.log("✅ MathJax naložen");
      resolve();
    };
    document.head.appendChild(script);
  });

  // Konfiguracija MathJax (mora biti pred nalaganjem, ampak ker nalagamo dinamično,
  // nastavimo window.MathJax pred nalaganjem)
  window.MathJax = {
    tex: {
      inlineMath: [['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      processEscapes: true,
      processEnvironments: true
    },
    options: {
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
    },
    svg: { fontCache: 'global' },
    startup: {
      typeset: true,
      pageReady: () => {
        return MathJax.startup.defaultPageReady().then(() => {
          console.log("✅ MathJax typeset končan");
        });
      }
    }
  };

  // ============================================================
  // 1. NALOŽI KOMPONENTE
  // ============================================================
  async function loadComponent(url, targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${url} → ${res.status}`);
      el.innerHTML = await res.text();
      console.log(`✅ Naložen ${url}`);
    } catch (err) {
      console.error(`❌ Napaka pri nalaganju ${url}:`, err);
    }
  }

  await Promise.all([
    loadComponent("/components/header.html", "header"),
    loadComponent("/components/sidebar.html", "sidebar"),
    loadComponent("/components/footer.html", "footer"),
  ]);

  // Po nalaganju komponent znova procesiraj MathJax (če je treba)
  if (window.MathJax && window.MathJax.typesetPromise) {
    try {
      await window.MathJax.typesetPromise();
      console.log("✅ MathJax ponovno procesiran");
    } catch (e) {
      console.warn("MathJax typeset warning:", e);
    }
  }

  // ============================================================
  // 2. SIDEBAR TOGGLE (odpri/zapri)
  // ============================================================
  const sidebarEl = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");

  let overlay = document.getElementById("overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.className = "overlay";
    document.body.appendChild(overlay);
  }

  function openSidebar() {
    if (!sidebarEl || !mainContent) return;
    sidebarEl.classList.add("open");
    mainContent.classList.add("shifted");
    overlay.classList.add("visible");
  }

  function closeSidebar() {
    if (!sidebarEl || !mainContent) return;
    sidebarEl.classList.remove("open");
    mainContent.classList.remove("shifted");
    overlay.classList.remove("visible");
  }

  const menuBtn = document.getElementById("openSidebar") || document.getElementById("menuBtn");
  if (menuBtn) menuBtn.addEventListener("click", openSidebar);

  const closeBtn = document.getElementById("closeSidebar") || document.getElementById("closeBtn");
  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);

  overlay.addEventListener("click", closeSidebar);

  // ============================================================
  // 3. DROPDOWN TOGGLE (▸ / ▾)
  // ============================================================
  document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const targetId = btn.getAttribute("data-target");
      const target = document.getElementById(targetId);
      if (!target) {
        console.warn("Ni elementa z id:", targetId);
        return;
      }

      const isOpen = target.classList.toggle("open");
      btn.classList.toggle("open", isOpen);
    });
  });

  // ============================================================
  // 4. OZNAČI AKTIVNI LINK
  // ============================================================
  const currentPath = window.location.pathname;

  document.querySelectorAll(".sidebar-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href !== "/" && currentPath.startsWith(href)) {
      link.classList.add("active");
    }
  });

  // ============================================================
  // 5. ODPRI DROPDOWNE, ČE JE AKTIVNI LINK ZNOTRAJ
  // ============================================================
  document.querySelectorAll(".nav-sub-list, .nav-sub-sub-list").forEach((list) => {
    if (list.querySelector("a.active")) {
      list.classList.add("open");

      const toggle = document.querySelector(`.dropdown-toggle[data-target="${list.id}"]`);
      if (toggle) toggle.classList.add("open");

      // Odpri vse starše
      let parent = list.parentElement;
      while (parent && parent !== document.body) {
        if (parent.classList.contains("nav-sub") || parent.classList.contains("nav-sub-group")) {
          parent.classList.add("open");
          const pid = parent.id;
          if (pid) {
            const pt = document.querySelector(`.dropdown-toggle[data-target="${pid}"]`);
            if (pt) pt.classList.add("open");
          }
        }
        parent = parent.parentElement;
      }
    }
  });

  // ============================================================
  // 6. ZAPRI SIDEBAR OB KLIKU NA LINK (mobilni)
  // ============================================================
  document.querySelectorAll(".sidebar-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    });
  });

  // ============================================================
  // 7. NASTAVI DATUM V HEADERJU
  // ============================================================
  const dateEl = document.getElementById("currentDate");
  if (dateEl) {
    const now = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    dateEl.textContent = now.toLocaleDateString("sl-SI", options);
  }

  console.log("✅ components.js končan");
});