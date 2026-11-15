// public/components/polica.js
// Videz »Tabla in polica«: sezname predmetov (naslovnica) in poglavij
// (strani predmetov) prikaže kot knjige na knjižni polici.
// Vsebine HTML ne spreminja ročno: obstoječe povezave ostanejo povezave,
// samo dobijo hrbet knjige. Naloži ga components/tema.js, ko je videz »tabla«.
(function () {
  if (document.documentElement.dataset.videz !== "tabla") return;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", postavi);
  } else {
    postavi();
  }
  function postavi() {

  // Barve knjig = barve strani predmetov (style/predmeti/<predmet>.css).
  // Slovenščina je rumeno rjava, kot je želela Leja.
  var BARVA = {
    matematika: "#2F5BD3",
    slovenscina: "#B5782B",
    anglescina: "#1F3A68",
    fizika: "#1E4FB8",
    kemija: "#0B7285",
    biologija: "#2E7D4F",
    informatika: "#2458D3",
    geografija: "#1F6A8A",
    zgodovina: "#8A5A21",
    nemscina: "#C8281E",
    francoscina: "#24418F",
    italijanscina: "#A84A27",
    spanscina: "#1C56A3",
    psihologija: "#6A4CA8",
    sociologija: "#0E6F68",
    filozofija: "#3A4A6B",
    ekonomija: "#16704A",
    glasba: "#7A1F3D",
    umetnostna_zgodovina: "#9A4317"
  };
  var KODA = {
    matematika: "MAT", slovenscina: "SLO", anglescina: "ANG", fizika: "FIZ",
    kemija: "KEM", biologija: "BIO", informatika: "INF", geografija: "GEO",
    zgodovina: "ZGO", nemscina: "NEM", francoscina: "FRA", italijanscina: "ITA",
    spanscina: "ŠPA", psihologija: "PSI", sociologija: "SOC", filozofija: "FIL",
    ekonomija: "EKO", glasba: "GLA", umetnostna_zgodovina: "UMZ"
  };
  var OBVEZNI = ["slovenscina", "matematika", "anglescina"];
  var VISINE = [312, 296, 324, 288, 306, 318, 292, 330, 300, 284];
  var SVETLOST = [1, 0.93, 1.06, 0.9, 1.1];

  function predmetIz(href) {
    var m = /\/views\/([a-z_]+)\//.exec(href || "");
    return m ? m[1] : null;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function besedilo(a, sel) {
    var e = a.querySelector(sel);
    return e ? e.textContent.replace(/\s+/g, " ").trim() : "";
  }

  // a: povezava; podatki: {oznaka, naslov, nalepka, nalepkaMala, listek, barva}; i: zaporedna št.
  function vKnjigo(a, p, i, n) {
    a.classList.add("knjiga");
    var dolg = p.naslov.length > 22;
    if (dolg) a.classList.add("knjiga--dolga");
    a.style.setProperty("--barva", p.barva);
    a.style.setProperty("--visina", VISINE[i % VISINE.length] + "px");
    a.style.setProperty("--sirina", ((n > 17 ? -6 : 0) + (dolg ? 66 : i % 3 === 1 ? 64 : 58)) + "px");
    if (p.svetlost) a.style.setProperty("--svetlost", p.svetlost);
    if (p.naslov.length > 13 && !dolg) a.style.setProperty("--velikost", "16px");
    if (!a.getAttribute("aria-label")) {
      a.setAttribute("aria-label", p.naslov + (p.listek ? ": " + p.listek : ""));
    }
    if (!a.title && p.listek) a.title = p.listek;

    var nalepka = el("span", "knjiga-nalepka", p.nalepka);
    if (p.nalepkaMala) nalepka.appendChild(el("small", "", p.nalepkaMala));
    a.appendChild(el("span", "knjiga-oznaka", p.oznaka || ""));
    a.appendChild(el("span", "knjiga-naslov", p.naslov));
    a.appendChild(nalepka);
    if (p.listek) a.appendChild(el("span", "knjiga-listek", p.listek));
  }

  function postaviPolico(seznam) {
    seznam.classList.add("polica");
    var ovoj = el("div", "polica-ovoj");
    seznam.parentNode.insertBefore(ovoj, seznam);
    ovoj.appendChild(seznam);
    ovoj.appendChild(el("div", "polica-deska"));
  }

  // ---------- Naslovnica: predmeti ----------
  document.querySelectorAll(".chapters").forEach(function (seznam) {
    var karte = Array.prototype.slice.call(seznam.querySelectorAll(":scope > a.chapter-card"));
    if (karte.length < 4) return;
    // obvezni predmeti najprej, nato presledek
    // korenska stran predmeta (/views/<p>/<p>.html) je »predmet«, vse ostalo »poglavje«
    function jePredmet(a) {
      var slug = predmetIz(a.getAttribute("href"));
      return slug && new RegExp("^/views/" + slug + "/" + slug + "\\.html$").test(a.getAttribute("href"));
    }
    var obvezni = [];
    OBVEZNI.forEach(function (slug) {
      karte.forEach(function (a) {
        if (jePredmet(a) && predmetIz(a.getAttribute("href")) === slug) obvezni.push(a);
      });
    });
    var ostali = karte.filter(function (a) { return obvezni.indexOf(a) < 0; });
    var vse = obvezni.concat(ostali);
    vse.forEach(function (a, i) {
      var slug = predmetIz(a.getAttribute("href"));
      var predmetna = jePredmet(a);
      seznam.appendChild(a);
      vKnjigo(a, {
        oznaka: obvezni.indexOf(a) >= 0 ? "Obvezni" : "",
        naslov: besedilo(a, "h3"),
        nalepka: KODA[slug] || besedilo(a, "h3").slice(0, 3).toUpperCase(),
        nalepkaMala: besedilo(a, ".chapter-num").replace(/poglavij|poglavja|poglavje|poglavji/, "pogl."),
        listek: besedilo(a, "p"),
        barva: BARVA[slug] || "#2F55D4",
        svetlost: predmetna ? null : SVETLOST[i % SVETLOST.length]
      }, i, vse.length);
      if (obvezni.length && a === obvezni[obvezni.length - 1]) {
        seznam.appendChild(el("span", "polica-razmik"));
      }
    });
    postaviPolico(seznam);
  });

  // ---------- Strani predmetov: poglavja ----------
  var predmet = document.documentElement.dataset.predmet;
  if (!predmet) return;
  var STEVILKA = /^(\d+(?:\.\d+)*)\.?\s+(.+)$/;
  document.querySelectorAll(".link-list, .two-col").forEach(function (seznam) {
    var povezave = Array.prototype.slice.call(seznam.querySelectorAll(":scope > a.link-item"));
    if (povezave.length < 4) return;
    var stevilcene = povezave.filter(function (a) { return STEVILKA.test(besedilo(a, "strong")); });
    if (stevilcene.length < povezave.length * 0.75) return;
    povezave.forEach(function (a, i) {
      var m = STEVILKA.exec(besedilo(a, "strong"));
      vKnjigo(a, {
        oznaka: KODA[predmet] || "",
        naslov: m ? m[2] : besedilo(a, "strong"),
        nalepka: m ? m[1] : "•",
        listek: besedilo(a, "small"),
        barva: BARVA[predmet] || "#2F55D4",
        svetlost: SVETLOST[i % SVETLOST.length]
      }, i, povezave.length);
    });
    postaviPolico(seznam);
  });
  }
})();
