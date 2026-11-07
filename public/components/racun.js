// public/components/racun.js
// Strani Uredi podatke (profil.html) in Nastavitve (nastavitve.html).
// Stran izbere atribut data-stran na <script>.
(() => {
  const stran = document.currentScript?.dataset.stran;
  const TEMA_KLJUC = "piflar-tema";
  const VELIKOST_SLIKE = 256; // px, slika se pomanjša v brskalniku

  const poslji = (metoda, pot, telo) =>
    fetch(pot, {
      method: metoda,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(telo),
    }).catch(() => null);

  const sporoci = (el, besedilo, uspeh = false) => {
    el.textContent = besedilo;
    el.classList.toggle("uspeh", uspeh);
  };

  async function jaz() {
    const res = await fetch("/api/jaz").catch(() => null);
    if (res?.ok) return res.json();
    location.replace(`/prijava.html?naprej=${encodeURIComponent(location.pathname)}`);
    return null;
  }

  const obvestiGlavo = (u) => window.dispatchEvent(new CustomEvent("piflar:uporabnik", { detail: u }));

  // Slika → kvadrat 256 × 256 (obreže na sredini) → JPEG data URL
  function pomanjsaj(datoteka) {
    return new Promise((ok, napaka) => {
      const url = URL.createObjectURL(datoteka);
      const img = new Image();
      img.onload = () => {
        const stranica = Math.min(img.width, img.height);
        const platno = document.createElement("canvas");
        platno.width = platno.height = VELIKOST_SLIKE;
        platno
          .getContext("2d")
          .drawImage(img, (img.width - stranica) / 2, (img.height - stranica) / 2, stranica, stranica, 0, 0, VELIKOST_SLIKE, VELIKOST_SLIKE);
        URL.revokeObjectURL(url);
        ok(platno.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        napaka(new Error("Slike ni mogoče prebrati."));
      };
      img.src = url;
    });
  }

  // ============================================================
  // UREDI PODATKE
  // ============================================================
  async function profil() {
    const u = await jaz();
    if (!u) return;
    const form = document.getElementById("profil");
    const sporocilo = document.getElementById("sporocilo");
    const predogled = document.getElementById("slikaPredogled");
    let slika = u.slika ?? null;

    const leto = new Date().getFullYear();
    const letoMature = document.getElementById("letoMature");
    for (let l = leto; l <= leto + 4; l++) letoMature.add(new Option(String(l), String(l)));
    if (u.letoMature && ![...letoMature.options].some((o) => o.value === String(u.letoMature)))
      letoMature.add(new Option(String(u.letoMature), String(u.letoMature)));

    const izrisiSliko = () => {
      predogled.replaceChildren(window.piflarAvatar({ ...u, ime: form.ime.value, priimek: form.priimek.value, slika }, "avatar--profil"));
      document.getElementById("slikaOdstrani").hidden = !slika;
    };

    form.ime.value = u.ime ?? "";
    form.priimek.value = u.priimek ?? "";
    form.starost.value = u.starost ?? "";
    form.email.value = u.email;
    form.sola.value = u.sola ?? "";
    form.letnik.value = u.letnik ?? "";
    form.letoMature.value = u.letoMature ?? "";
    form.querySelector(`[name="tipSole"][value="${u.tipSole ?? "gimnazija"}"]`).checked = true;
    form.querySelector(`[name="ravenMatematike"][value="${u.ravenMatematike ?? ""}"]`).checked = true;
    const opomba = () =>
      (document.getElementById("tipSoleOpomba").hidden = form.tipSole.value !== "srednja_strokovna");
    form.querySelectorAll('[name="tipSole"]').forEach((r) => r.addEventListener("change", opomba));
    opomba();
    form.ime.addEventListener("input", izrisiSliko);
    form.priimek.addEventListener("input", izrisiSliko);
    izrisiSliko();
    form.hidden = false;

    document.getElementById("slikaVnos").addEventListener("change", async (e) => {
      const datoteka = e.target.files?.[0];
      e.target.value = "";
      if (!datoteka) return;
      try {
        slika = await pomanjsaj(datoteka);
        izrisiSliko();
        sporoci(sporocilo, "Slika bo shranjena, ko klikneš Shrani spremembe.", true);
      } catch (err) {
        sporoci(sporocilo, err.message);
      }
    });
    document.getElementById("slikaOdstrani").addEventListener("click", () => {
      slika = null;
      izrisiSliko();
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.ime.value.trim() || !form.priimek.value.trim())
        return sporoci(sporocilo, "Vpiši ime in priimek.");
      const res = await poslji("PATCH", "/api/jaz", {
        ime: form.ime.value,
        priimek: form.priimek.value,
        starost: form.starost.value,
        sola: form.sola.value,
        tipSole: form.tipSole.value,
        letnik: form.letnik.value,
        letoMature: form.letoMature.value,
        ravenMatematike: form.ravenMatematike.value,
        slika,
      });
      const telo = await res?.json().catch(() => null);
      if (!res?.ok) return sporoci(sporocilo, telo?.message || "Shranjevanje ni uspelo.");
      Object.assign(u, telo);
      obvestiGlavo(telo);
      sporoci(sporocilo, "Shranjeno.", true);
    });
  }

  // ============================================================
  // NASTAVITVE
  // ============================================================
  async function nastavitve() {
    const u = await jaz();
    if (!u) return;
    document.getElementById("nastavitve").hidden = false;

    // Tema: shrani se v brskalnik (kot stikalo v glavi); "Kot sistem" izbriše izbiro
    let shranjena = null;
    try {
      shranjena = localStorage.getItem(TEMA_KLJUC);
    } catch { /* zasebno okno */ }
    document.querySelector(`[name="tema"][value="${shranjena ?? "sistem"}"]`).checked = true;
    document.querySelectorAll('[name="tema"]').forEach((r) =>
      r.addEventListener("change", () => {
        const sistemska = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        try {
          if (r.value === "sistem") localStorage.removeItem(TEMA_KLJUC);
          else localStorage.setItem(TEMA_KLJUC, r.value);
        } catch { /* zasebno okno */ }
        window.nastaviTemo?.(r.value === "sistem" ? sistemska : r.value);
      })
    );

    // Obvestila: shranijo se takoj ob preklopu
    const obvSporocilo = document.getElementById("obvestilaSporocilo");
    for (const ime of ["opomniki", "novice"]) {
      const stikalo = document.querySelector(`[name="${ime}"]`);
      stikalo.checked = Boolean(u.nastavitve?.[ime]);
      stikalo.addEventListener("change", async () => {
        const res = await poslji("PATCH", "/api/jaz", { nastavitve: { [ime]: stikalo.checked } });
        if (res?.ok) sporoci(obvSporocilo, "Shranjeno.", true);
        else {
          stikalo.checked = !stikalo.checked;
          sporoci(obvSporocilo, "Shranjevanje ni uspelo.");
        }
      });
    }

    const geslo = document.getElementById("geslo");
    const gSporocilo = document.getElementById("gesloSporocilo");
    geslo.addEventListener("submit", async (e) => {
      e.preventDefault();
      const novo = geslo.novo.value;
      if (novo.length < 8 || !/\p{Lu}/u.test(novo) || !/\d/.test(novo))
        return sporoci(gSporocilo, "Novo geslo mora imeti vsaj 8 znakov, 1 veliko tiskano črko in 1 številko.");
      if (novo !== geslo.novo2.value) return sporoci(gSporocilo, "Novi gesli se ne ujemata.");
      const res = await poslji("POST", "/api/jaz/geslo", { staro: geslo.staro.value, novo });
      const telo = await res?.json().catch(() => null);
      if (!res?.ok) return sporoci(gSporocilo, telo?.message || "Sprememba ni uspela.");
      geslo.reset();
      sporoci(gSporocilo, "Geslo je spremenjeno.", true);
    });

    const izbris = document.getElementById("izbris");
    const iSporocilo = document.getElementById("izbrisSporocilo");
    izbris.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!izbris.geslo.value) return sporoci(iSporocilo, "Vpiši geslo.");
      if (!confirm("Res želiš izbrisati račun? Tega ni mogoče razveljaviti.")) return;
      const res = await poslji("DELETE", "/api/jaz", { geslo: izbris.geslo.value });
      if (res?.ok) {
        location.href = "/";
        return;
      }
      const telo = await res?.json().catch(() => null);
      sporoci(iSporocilo, telo?.message || "Izbris ni uspel.");
    });
  }

  if (stran === "profil") profil();
  else if (stran === "nastavitve") nastavitve();
})();
