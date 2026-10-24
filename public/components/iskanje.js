// public/components/iskanje.js
// Stran /iskanje.html: vsi zadetki iskanja, razvrščeni po poglavjih.
// Funkcija odlomek() je v components.js.

function sklon(n) {
  const d = n % 100;
  if (d === 1) return "zadetek";
  if (d === 2) return "zadetka";
  if (d === 3 || d === 4) return "zadetki";
  return "zadetkov";
}

function prazno(besedilo) {
  const p = document.createElement("p");
  p.className = "iskanje-prazno";
  p.textContent = besedilo;
  return p;
}

function skupina(zadetki) {
  const prvi = zadetki[0];
  const odsek = document.createElement("section");
  odsek.className = "iskanje-skupina";

  const h2 = document.createElement("h2");
  const predmet = document.createElement("span");
  predmet.className = "iskanje-predmet";
  predmet.textContent = prvi.predmet;
  const povezava = document.createElement("a");
  povezava.href = prvi.url;
  povezava.textContent = prvi.poglavje;
  const stevec = document.createElement("span");
  stevec.className = "iskanje-stevec";
  stevec.textContent = `${zadetki.length} ${sklon(zadetki.length)}`;
  h2.append(predmet, povezava, stevec);

  zadetki.sort((a, b) => a.polozaj - b.polozaj);
  const ul = document.createElement("ul");
  ul.className = "iskanje-zadetki";
  for (const z of zadetki) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "iskanje-zadetek";
    a.href = z.povezava;
    if (z.razdelek) {
      const kje = document.createElement("span");
      kje.className = "iskalnik-kje";
      kje.textContent = z.razdelek;
      a.append(kje);
    }
    a.append(odlomek(z));
    li.append(a);
    ul.append(li);
  }
  odsek.append(h2, ul);
  return odsek;
}

async function prikaziRezultate() {
  const q = (new URLSearchParams(location.search).get("q") || "").trim();
  const naslov = document.getElementById("iskanjeNaslov");
  const povzetek = document.getElementById("iskanjePovzetek");
  const rezultati = document.getElementById("iskanjeRezultati");

  if (q.length < 2) {
    povzetek.textContent = "";
    rezultati.replaceChildren(prazno("Vpiši vsaj dve črki v iskalnik v glavi strani."));
    return;
  }
  naslov.textContent = `Rezultati za »${q}«`;
  document.title = `${q} — iskanje | Piflar.si`;

  try {
    const res = await fetch(`/api/iskanje?q=${encodeURIComponent(q)}`);
    if (!res.ok) throw new Error(`iskanje → ${res.status}`);
    const { skupaj, zadetki } = await res.json();
    if (!zadetki.length) {
      povzetek.textContent = "";
      rezultati.replaceChildren(prazno(`Za »${q}« ni zadetkov. Poskusi s krajšo ali drugačno besedo.`));
      return;
    }

    // Zadetki pridejo razvrščeni po ujemanju; strani obdržijo vrstni red prvega zadetka,
    // znotraj strani pa jih uredimo tako, kot si sledijo v besedilu.
    const poStraneh = new Map();
    for (const z of zadetki) {
      if (!poStraneh.has(z.url)) poStraneh.set(z.url, []);
      poStraneh.get(z.url).push(z);
    }
    const strani = poStraneh.size;
    const prikazano = zadetki.length < skupaj ? ` Prikazanih je prvih ${zadetki.length}.` : "";
    povzetek.textContent = `${skupaj} ${sklon(skupaj)} v ${strani} ${strani === 1 ? "poglavju" : "poglavjih"}.${prikazano}`;
    rezultati.replaceChildren(...[...poStraneh.values()].map(skupina));
  } catch (err) {
    console.error("Napaka pri iskanju:", err);
    povzetek.textContent = "";
    rezultati.replaceChildren(prazno("Iskanje trenutno ne deluje. Poskusi znova čez nekaj trenutkov."));
  }
}

prikaziRezultate();
