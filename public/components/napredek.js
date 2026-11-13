// public/components/napredek.js
// Stran Moje naloge: povzetek rešenih nalog prijavljenega uporabnika po predmetih in snoveh
// (iz /api/napredek). Povezave odprejo strani z nalogami s filtrom ?stanje=neuspesno ali uspesno,
// kjer lahko dijak neuspešne naloge reši znova ali pregleda uspešne.

const koren = document.getElementById("napredek");

const PREDMETI = {
  matematika: "Matematika", fizika: "Fizika", kemija: "Kemija", biologija: "Biologija",
  informatika: "Informatika", geografija: "Geografija", zgodovina: "Zgodovina",
  slovenscina: "Slovenščina", anglescina: "Angleščina", nemscina: "Nemščina",
  francoscina: "Francoščina", italijanscina: "Italijanščina", spanscina: "Španščina",
  psihologija: "Psihologija", sociologija: "Sociologija", filozofija: "Filozofija",
  ekonomija: "Ekonomija", glasba: "Glasba", umetnostna_zgodovina: "Umetnostna zgodovina",
};
const VIRI = {
  vaja: {
    ime: "Naloge za vajo",
    url: (predmet, snov, stanje) =>
      `/views/${predmet}/naloge/naloge.html?${snov ? `snov=${snov}&` : ""}stanje=${stanje}`,
  },
  matura: {
    ime: "Maturitetne naloge",
    url: (predmet, snov, stanje) =>
      `/views/${predmet}/matura/po_snovi/naloge.html?${snov ? `poglavje=${snov}&` : ""}stanje=${stanje}`,
  },
};

function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

function povezava(href, besedilo, razred) {
  const a = el("a", razred, besedilo);
  a.href = href;
  return a;
}

const besediloSt = (n) => {
  const d = n % 100;
  return d === 1 ? `${n} naloga` : d === 2 ? `${n} nalogi` : d === 3 || d === 4 ? `${n} naloge` : `${n} nalog`;
};

const prazno = () => ({ uspesno: 0, neuspesno: 0 });

// Števec in gumba za en vir (vaje ali matura) v eni snovi ali celem predmetu
function vrsticaVira(vir, predmet, snov, st) {
  const vrstica = el("div", "napredek-vir");
  vrstica.append(el("span", "napredek-vir-ime", VIRI[vir].ime));
  const stevci = el("span", "napredek-stevci");
  const u = el("span", "napredek-st napredek-st--uspesno", `✓ ${st.uspesno}`);
  u.title = `Uspešno rešene: ${besediloSt(st.uspesno)}`;
  const n = el("span", "napredek-st napredek-st--neuspesno", `✗ ${st.neuspesno}`);
  n.title = `Neuspešne: ${besediloSt(st.neuspesno)}`;
  stevci.append(u, n);
  const gumbi = el("span", "napredek-gumbi");
  if (st.neuspesno)
    gumbi.append(povezava(VIRI[vir].url(predmet, snov, "neuspesno"), `Ponovi neuspešne (${st.neuspesno})`, "btn btn-primary napredek-gumb"));
  if (st.uspesno)
    gumbi.append(povezava(VIRI[vir].url(predmet, snov, "uspesno"), "Preglej uspešne", "btn btn-secondary napredek-gumb"));
  vrstica.append(stevci, gumbi);
  return vrstica;
}

function izrisi(zapisi, snovi) {
  const imeSnovi = new Map(snovi.map((s, i) => [`${s.predmet}/${s.slug}`, { ...s, red: i }]));
  // predmet → { skupaj: {vir: st}, snovi: Map(slug → {vir: st}) }
  const poPredmetih = new Map();
  for (const z of zapisi) {
    if (!z.stanje) continue;
    if (!poPredmetih.has(z.predmet)) poPredmetih.set(z.predmet, { skupaj: {}, snovi: new Map() });
    const p = poPredmetih.get(z.predmet);
    (p.skupaj[z.vir] ??= prazno())[z.stanje]++;
    // Maturitetna naloga, ki preverja več snovi, šteje pri vsaki
    for (const slug of new Set(z.poglavja)) {
      if (!p.snovi.has(slug)) p.snovi.set(slug, {});
      (p.snovi.get(slug)[z.vir] ??= prazno())[z.stanje]++;
    }
  }

  if (!poPredmetih.size) {
    const kartica = el("section", "racun-kartica");
    kartica.append(el("h2", "", "Še nisi reševal nalog"));
    const p = el("p", "", "Ko pri nalogah za vajo ali maturitetnih nalogah preveriš odgovor, se naloga shrani sem. ");
    p.append(povezava("/views/matematika/naloge/naloge.html", "Začni z nalogami iz matematike"), ".");
    kartica.append(p);
    koren.replaceChildren(kartica);
    return;
  }

  const vseU = zapisi.filter((z) => z.stanje === "uspesno").length;
  const vseN = zapisi.filter((z) => z.stanje === "neuspesno").length;
  const povzetek = el("div", "napredek-povzetek");
  for (const [st, ime, razred] of [[vseU + vseN, "rešenih nalog", ""], [vseU, "uspešnih", "uspesno"], [vseN, "neuspešnih", "neuspesno"]]) {
    const k = el("div", `napredek-ploscica${razred ? ` napredek-ploscica--${razred}` : ""}`);
    k.append(el("strong", "", String(st)), el("span", "", ime));
    povzetek.append(k);
  }

  const vrstni = Object.keys(PREDMETI);
  const predmeti = [...poPredmetih.keys()].sort((a, b) => vrstni.indexOf(a) - vrstni.indexOf(b));
  const seznam = el("div", "napredek-predmeti");
  for (const predmet of predmeti) {
    const p = poPredmetih.get(predmet);
    const kartica = el("section", "racun-kartica napredek-predmet");
    kartica.id = predmet;
    kartica.append(el("h2", "", PREDMETI[predmet] ?? predmet));
    const skupaj = el("div", "napredek-skupaj");
    for (const vir of Object.keys(VIRI)) if (p.skupaj[vir]) skupaj.append(vrsticaVira(vir, predmet, "", p.skupaj[vir]));
    kartica.append(skupaj);

    const podrobno = el("details", "napredek-snovi");
    podrobno.open = predmeti.length === 1;
    podrobno.append(el("summary", "", `Po snoveh (${p.snovi.size})`));
    const slugi = [...p.snovi.keys()].sort(
      (a, b) => (imeSnovi.get(`${predmet}/${a}`)?.red ?? 999) - (imeSnovi.get(`${predmet}/${b}`)?.red ?? 999)
    );
    for (const slug of slugi) {
      const snov = imeSnovi.get(`${predmet}/${slug}`);
      const vrstica = el("div", "napredek-snov");
      const naslov = el("h3", "napredek-snov-naslov");
      if (snov?.url) naslov.append(povezava(snov.url, [snov.stevilka, snov.naslov].filter(Boolean).join(" ")));
      else naslov.textContent = slug.replaceAll("_", " ");
      vrstica.append(naslov);
      for (const vir of Object.keys(VIRI)) {
        const st = p.snovi.get(slug)[vir];
        if (st) vrstica.append(vrsticaVira(vir, predmet, slug, st));
      }
      podrobno.append(vrstica);
    }
    kartica.append(podrobno);
    seznam.append(kartica);
  }
  koren.replaceChildren(povzetek, seznam);
}

async function init() {
  if (!koren) return;
  const res = await fetch("/api/napredek").catch(() => null);
  if (res?.status === 401 || res?.status === 503) {
    const kartica = el("section", "racun-kartica");
    kartica.append(el("h2", "", "Prijavi se"));
    const p = el("p", "", "Napredek pri nalogah se shranjuje samo prijavljenim uporabnikom. ");
    p.append(povezava("/prijava.html", "Prijava ali registracija"), ".");
    kartica.append(p);
    koren.replaceChildren(kartica);
    return;
  }
  try {
    if (!res?.ok) throw new Error();
    const [zapisi, snovi] = await Promise.all([res.json(), fetch("/api/snovi").then((r) => r.json())]);
    izrisi(zapisi, snovi);
  } catch {
    koren.textContent = "Napredka ni bilo mogoče naložiti. Poskusi znova čez nekaj trenutkov.";
  }
}

init();
