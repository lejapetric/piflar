// public/components/narocnina.js
const PAKETI = { brezplacno: "Brezplačni", osnovni: "Osnovni", premium: "Premium" };
const PRIPONE = { mesecno: "/ mesec", letno: "/ leto", solsko: "za 10 mesecev" };

const obvestilo = document.getElementById("obvestilo");
let cenik = null;
let obdobje = "mesecno";

function pokaziObvestilo(besedilo, napaka = false) {
  obvestilo.textContent = besedilo;
  obvestilo.classList.toggle("napaka", napaka);
  obvestilo.hidden = false;
}

const formatCena = ({ znesek, valuta }) =>
  new Intl.NumberFormat("sl-SI", { style: "currency", currency: valuta.toUpperCase() }).format(znesek);

function izrisi() {
  document.querySelectorAll(".narocnina-obdobje").forEach((b) => {
    const izbran = b.dataset.obdobje === obdobje;
    b.classList.toggle("izbran", izbran);
    b.setAttribute("aria-checked", String(izbran));
  });
  document.querySelectorAll(".narocnina-paket").forEach((karta) => {
    const cena = cenik?.[karta.dataset.paket]?.[obdobje];
    karta.querySelector("[data-cena]").textContent = cena
      ? `${formatCena(cena)} ${PRIPONE[obdobje]}`
      : "—";
    karta.querySelector("[data-kupi]").disabled = !cena;
  });
}

async function kupi(paket) {
  const res = await fetch("/api/placila/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paket, obdobje }),
  }).catch(() => null);
  if (res?.status === 401) {
    location.href = "/prijava.html?naprej=/narocnina.html";
    return;
  }
  const data = await res?.json().catch(() => null);
  if (res?.ok && data?.url) location.href = data.url;
  else pokaziObvestilo(data?.message || "Plačila trenutno ni mogoče začeti.", true);
}

async function init() {
  if (new URLSearchParams(location.search).has("uspeh"))
    pokaziObvestilo("Hvala! Plačilo je uspelo. Dostop se odklene v nekaj sekundah.");

  document.querySelectorAll(".narocnina-obdobje").forEach((b) =>
    b.addEventListener("click", () => {
      obdobje = b.dataset.obdobje;
      izrisi();
    })
  );
  document.querySelectorAll(".narocnina-paket").forEach((karta) =>
    karta.querySelector("[data-kupi]").addEventListener("click", () => kupi(karta.dataset.paket))
  );
  document.getElementById("portal").addEventListener("click", async () => {
    const res = await fetch("/api/placila/portal", { method: "POST" }).catch(() => null);
    const data = await res?.json().catch(() => null);
    if (res?.ok) location.href = data.url;
    else pokaziObvestilo(data?.message || "Upravljanje naročnine trenutno ni na voljo.", true);
  });

  const [cenikRes, jazRes] = await Promise.all([
    fetch("/api/placila/cenik").catch(() => null),
    fetch("/api/jaz").catch(() => null),
  ]);
  if (cenikRes?.ok) cenik = await cenikRes.json();
  else if (!obvestilo.textContent) pokaziObvestilo("Plačila bodo kmalu na voljo.");

  if (jazRes?.ok) {
    const jaz = await jazRes.json();
    const velja = jaz.paketVelja && new Date(jaz.paketVelja) > new Date();
    if (jaz.paket !== "brezplacno" && velja) {
      document.getElementById("mojPaketBesedilo").textContent =
        `Tvoj paket: ${PAKETI[jaz.paket]}, velja do ${new Date(jaz.paketVelja).toLocaleDateString("sl-SI")}.`;
      document.getElementById("mojPaket").hidden = false;
    }
  }
  izrisi();
}

init();
