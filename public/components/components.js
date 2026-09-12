// public/components/components.js

document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ components.js zagnan");

  // ============================================================
  // 1. NALOŽI KOMPONENTE (header, sidebar, footer) prek fetch
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

  // ============================================================
  // 2. SIDEBAR TOGGLE (odpri/zapri)
  // ============================================================
  const sidebarEl = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");

  // Overlay (ustvari, če ga ni)
  let overlay = document.getElementById("overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.className = "overlay";
    document.body.appendChild(overlay);
  }

  function openSidebar() {
    sidebarEl.classList.add("open");
    mainContent.classList.add("shifted");
    overlay.classList.add("visible");
  }

  function closeSidebar() {
    sidebarEl.classList.remove("open");
    mainContent.classList.remove("shifted");
    overlay.classList.remove("visible");
  }

  // Gumb ☰ v headerju
  const menuBtn = document.getElementById("openSidebar") || document.getElementById("menuBtn");
  if (menuBtn) menuBtn.addEventListener("click", openSidebar);

  // Gumb × v sidebaru
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
  document.querySelectorAll(".nav-sub-list").forEach((list) => {
    if (list.querySelector("a.active")) {
      list.classList.add("open");

      const parentSub = list.closest(".nav-sub");
      if (parentSub) parentSub.classList.add("open");

      const toggle = document.querySelector(`.dropdown-toggle[data-target="${list.id}"]`);
      if (toggle) toggle.classList.add("open");

      if (parentSub) {
        const parentToggle = document.querySelector(
          `.dropdown-toggle[data-target="${parentSub.id}"]`
        );
        if (parentToggle) parentToggle.classList.add("open");
      }
    }
  });

  console.log("✅ components.js končan");
});