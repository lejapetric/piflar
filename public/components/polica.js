// public/components/polica.js
// Videz »Tabla in polica«: predmete (naslovnica), poglavja in maturo
// (strani predmetov) prikaže kot knjige na knjižni polici.
// Vsebinskega HTML ne spreminja: knjige so prave povezave, zgrajene iz
// obstoječih seznamov. Naloži ga components/tema.js, ko je videz »tabla«.
(function () {
  if (document.documentElement.dataset.videz !== "tabla") return;

  // Barve knjig = barve strani predmetov (style/predmeti/<predmet>.css),
  // razen slovenščine (rumeno rjava) in matematike (rdeča), kot je želela Leja.
  var BARVA = {
    matematika: "#D2343F",
    slovenscina: "#B5782B",
    anglescina: "#1F3A68",
    fizika: "#1E4FB8",
    kemija: "#0B7285",
    biologija: "#2E7D4F",
    informatika: "#2458D3",
    geografija: "#1F6A8A",
    zgodovina: "#8A5A21",
    nemscina: "#B8261C",
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
  var OBVEZNI = ["slovenscina", "matematika", "anglescina", "poklicna_slovenscina"];
  // predmeti poklicne mature (poklicna_<predmet>) imajo barvo in znak osnovnega predmeta
  function osnova(slug) { return (slug || "").replace(/^poklicna_/, ""); }
  var VISINE = [312, 296, 324, 288, 306, 318, 292, 330, 300, 284];
  // Odtenki barve predmeta za knjige poglavij: + primeša belo, - črno (v %).
  // Sosednje knjige se opazno razlikujejo.
  var ODTENKI = [0, -28, 18, -14, 30, -36, 8, -20, 24, -8];
  function odtenek(barva, i) {
    var o = ODTENKI[i % ODTENKI.length];
    if (!o || !(window.CSS && CSS.supports("color", "color-mix(in oklab, red, white 10%)"))) return barva;
    return "color-mix(in oklab, " + barva + ", " + (o > 0 ? "white " : "black ") + Math.abs(o) + "%)";
  }
  var STEVILKA = /^(\d+(?:\.\d+)*)\.?\s+(.+)$/;
  var PRESKOK = 3; // razmik med knjigami (px), enak kot gap v tabla.css
  var mirno = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- pomožne ----------
  function predmetIz(href) {
    var m = /\/views\/([a-z_]+)\//.exec(href || "");
    return m ? m[1] : null;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function besedilo(a, sel) {
    var e = a.querySelector(sel);
    return e ? e.textContent.replace(/\s+/g, " ").trim() : "";
  }
  function pot(href) {
    try { return new URL(href, location.href).pathname; } catch (e) { return href; }
  }

  // Povezavo spremeni v hrbet knjige.
  // p: {oznaka, naslov, znak, barva, opis, svetlost, sirina}
  function vKnjigo(a, p, i) {
    a.classList.add("knjiga");
    var dolg = p.naslov.length > 19;
    if (dolg) a.classList.add("knjiga--dolga");
    var sirina = p.sirina || (dolg ? 66 : i % 3 === 1 ? 64 : 58);
    a.dataset.sirina = sirina;
    a.dataset.ime = p.naslov;
    a.dataset.opis = p.opis || "";
    a.style.setProperty("--barva", p.barva);
    a.style.setProperty("--visina", (p.visina || VISINE[i % VISINE.length]) + "px");
    a.style.setProperty("--sirina", sirina + "px");
    if (p.svetlost) a.style.setProperty("--svetlost", p.svetlost);
    if (p.naslov.length > 13 && !dolg) a.style.setProperty("--velikost", "16px");
    a.setAttribute("aria-label", p.naslov + (p.opis ? ": " + p.opis : ""));
    a.appendChild(el("span", "knjiga-oznaka", p.oznaka || ""));
    a.appendChild(el("span", "knjiga-naslov", p.naslov));
    // nalepka z znakom predmeta (risba iz glave strani predmeta, glej tabla.css)
    if (p.znak) a.dataset.znak = p.znak;
    var nalepka = el("span", "knjiga-nalepka");
    nalepka.setAttribute("aria-hidden", "true");
    a.appendChild(nalepka);
    return a;
  }

  // Nova povezava-knjiga (za police, zgrajene iz drugih seznamov).
  function novaKnjiga(href, p, i) {
    var a = document.createElement("a");
    a.href = href;
    return vKnjigo(a, p, i);
  }

  // ---------- polica ----------
  // Ovoj s policami (vrstami) in napisom pod njimi. Knjige se razporedijo
  // v vrste glede na širino; na telefonu ostane ena vrsta, ki se drsa.
  function polica(predmeti, nastavitve) {
    nastavitve = nastavitve || {};
    var ovoj = el("div", "polica-ovoj");
    if (nastavitve.razred) ovoj.classList.add(nastavitve.razred);
    var vrste = el("div", "polica-vrste");
    var napis = el("div", "polica-napis");
    napis.setAttribute("aria-live", "polite");
    ovoj.appendChild(vrste);
    ovoj.appendChild(napis);
    ovoj._predmeti = predmeti;
    ovoj._ime = nastavitve.ime || "";
    ovoj._namig = nastavitve.namig || "";
    nastaviNapis(ovoj, null, 0);

    predmeti.forEach(function (k) {
      if (!k.classList || !k.classList.contains("knjiga")) return;
      k.addEventListener("pointerenter", function () { izberi(ovoj, k); });
      k.addEventListener("focus", function () { izberi(ovoj, k); });
    });
    ovoj.addEventListener("pointerleave", function () {
      if (!ovoj.contains(document.activeElement)) izberi(ovoj, null);
    });
    ovoj.addEventListener("focusout", function (e) {
      if (!ovoj.contains(e.relatedTarget)) izberi(ovoj, null);
    });
    return ovoj;
  }

  function razporedi(ovoj) {
    var vrste = ovoj.querySelector(".polica-vrste");
    var sirinaOvoja = ovoj.clientWidth;
    if (!sirinaOvoja || sirinaOvoja === ovoj._zadnjaSirina) return;
    ovoj._zadnjaSirina = sirinaOvoja;
    var predmeti = ovoj._predmeti;
    var telefon = window.innerWidth <= 820;
    var prostor = sirinaOvoja - 2 * 26 - 24; // notranji rob + opornica

    function sirina(k) {
      return k.classList.contains("knjiga") ? +k.dataset.sirina : 18;
    }
    var skupaj = predmeti.reduce(function (s, k) { return s + sirina(k) + PRESKOK; }, 0);
    // če skoraj gre v eno vrsto, knjige malo stanjšaj
    var faktor = 1;
    if (!telefon && skupaj > prostor && skupaj * 0.78 <= prostor) faktor = prostor / skupaj;
    predmeti.forEach(function (k) {
      if (k.classList.contains("knjiga")) {
        k.style.setProperty("--sirina", Math.floor(+k.dataset.sirina * faktor) + "px");
      }
    });

    var skupine = [[]];
    if (!telefon && faktor === 1) {
      var zasedeno = 0;
      predmeti.forEach(function (k) {
        var s = sirina(k) + PRESKOK;
        if (zasedeno + s > prostor && skupine[skupine.length - 1].length) {
          skupine.push([]);
          zasedeno = 0;
        }
        if (!k.classList.contains("knjiga") && zasedeno === 0) return; // razmik na začetku vrste
        skupine[skupine.length - 1].push(k);
        zasedeno += s;
      });
    } else {
      skupine[0] = predmeti.slice();
    }

    vrste.textContent = "";
    skupine.forEach(function (skupina, i) {
      var vrsta = el("div", "polica");
      skupina.forEach(function (k) { vrsta.appendChild(k); });
      var deska = el("div", "polica-deska");
      if (i === skupine.length - 1 && ovoj._ime) {
        deska.appendChild(el("span", "polica-tablica", ovoj._ime));
      }
      vrste.appendChild(vrsta);
      vrste.appendChild(deska);
    });
  }

  function izberi(ovoj, knjiga) {
    if (ovoj._izbrana === knjiga) return;
    var predmeti = ovoj._predmeti;
    var smer = 1;
    if (knjiga && ovoj._izbrana) {
      smer = predmeti.indexOf(knjiga) > predmeti.indexOf(ovoj._izbrana) ? 1 : -1;
    }
    ovoj._izbrana = knjiga;
    ovoj.classList.toggle("ima-izbiro", !!knjiga);
    predmeti.forEach(function (k) {
      if (k.classList && k.classList.contains("knjiga")) k.classList.toggle("izbrana", k === knjiga);
    });
    nastaviNapis(ovoj, knjiga, smer);
  }

  // Napis pod polico: ime in opis izbrane knjige, ki prideta skozi masko.
  function nastaviNapis(ovoj, knjiga, smer) {
    var napis = ovoj.querySelector(".polica-napis");
    var nov = el("div", "polica-napis-vrsta");
    if (knjiga) {
      nov.appendChild(el("strong", "", knjiga.dataset.ime));
      if (knjiga.dataset.opis) nov.appendChild(el("span", "", knjiga.dataset.opis));
      // gumb »Odpri« je prava povezava na isto stran kot knjiga
      var odpri = el("a", "polica-napis-odpri", "Odpri →");
      odpri.href = knjiga.getAttribute("href");
      odpri.setAttribute("aria-label", "Odpri: " + knjiga.dataset.ime);
      nov.appendChild(odpri);

    } else {
      nov.classList.add("je-namig");
      nov.appendChild(el("span", "", ovoj._namig));
    }
    var stari = Array.prototype.slice.call(napis.children).filter(function (c) { return !c._odhaja; });
    napis.appendChild(nov);
    if (mirno || !nov.animate || !stari.length) {
      stari.forEach(function (c) { c.remove(); });
      return;
    }
    var cas = { duration: 450, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" };
    nov.animate([{ transform: "translateY(" + smer * 105 + "%)" }, { transform: "translateY(0)" }], cas);
    stari.forEach(function (c) {
      c._odhaja = true;
      c.animate([{ transform: getComputedStyle(c).transform === "none" ? "translateY(0)" : getComputedStyle(c).transform },
                 { transform: "translateY(" + -smer * 105 + "%)" }], cas)
        .onfinish = function () { c.remove(); };
    });
  }

  var ovoji = [];
  function vstavi(ovoj, predElementom, starsev) {
    if (predElementom) predElementom.parentNode.insertBefore(ovoj, predElementom);
    else starsev.appendChild(ovoj);
    ovoji.push(ovoj);
    razporedi(ovoj);
  }
  var cakaj;
  window.addEventListener("resize", function () {
    clearTimeout(cakaj);
    cakaj = setTimeout(function () { ovoji.forEach(razporedi); }, 120);
  });

  // Oštevilčena poglavja iz seznamov .link-list / .two-col.
  function seznamiPoglavij(koren) {
    var out = [];
    koren.querySelectorAll(".link-list, .two-col").forEach(function (seznam) {
      var povezave = Array.prototype.slice.call(seznam.querySelectorAll(":scope > a.link-item"));
      if (povezave.length < 4) return;
      var stevilcene = povezave.filter(function (a) { return STEVILKA.test(besedilo(a, "strong")); });
      if (stevilcene.length < povezave.length * 0.75) return;
      out.push({ seznam: seznam, povezave: povezave });
    });
    return out;
  }
  function podatkiPoglavja(a, predmet, i) {
    var m = STEVILKA.exec(besedilo(a, "strong"));
    return {
      oznaka: m ? m[1] : "",
      znak: osnova(predmet),
      naslov: m ? m[2] : besedilo(a, "strong"),
      opis: besedilo(a, "small"),
      barva: odtenek(BARVA[osnova(predmet)] || "#2F55D4", i)
    };
  }

  function postavi() {
    naslovnica();
    var predmet = document.documentElement.dataset.slug || document.documentElement.dataset.predmet;
    if (!predmet) return;
    var korenPredmeta = new RegExp("^/views/" + predmet + "/" + predmet + "\\.html$").test(location.pathname);
    if (korenPredmeta) stranPredmeta(predmet);
    else poglavjaNaMestu(predmet);
  }

  // ---------- Naslovnica: predmeti in poglavja ----------
  function naslovnica() {
    document.querySelectorAll(".chapters").forEach(function (seznam) {
      var karte = Array.prototype.slice.call(seznam.querySelectorAll(":scope > a.chapter-card"));
      if (karte.length < 4) return;
      function jePredmet(a) {
        var slug = predmetIz(a.getAttribute("href"));
        return slug && new RegExp("^/views/" + slug + "/" + slug + "\\.html$").test(a.getAttribute("href"));
      }
      var predmetna = karte.some(jePredmet);
      var obvezni = [];
      OBVEZNI.forEach(function (slug) {
        karte.forEach(function (a) {
          if (jePredmet(a) && predmetIz(a.getAttribute("href")) === slug) obvezni.push(a);
        });
      });
      var vse = obvezni.concat(karte.filter(function (a) { return obvezni.indexOf(a) < 0; }));
      var predmeti = [];
      vse.forEach(function (a, i) {
        var slug = predmetIz(a.getAttribute("href"));
        var naslov = besedilo(a, "h3");
        predmeti.push(vKnjigo(a, {
          oznaka: obvezni.indexOf(a) >= 0 ? "Obvezni" : "",
          naslov: naslov,
          znak: osnova(slug),
          opis: besedilo(a, "p"),
          barva: jePredmet(a) ? (BARVA[osnova(slug)] || "#2F55D4") : odtenek(BARVA[osnova(slug)] || "#2F55D4", i)
        }, i));
        if (obvezni.length && a === obvezni[obvezni.length - 1]) predmeti.push(el("span", "polica-razmik"));
      });
      var ovoj = polica(predmeti, {
        namig: predmetna ? "Izberi predmet s police." : "Izberi poglavje.",
        razred: predmetna ? "polica--predmeti" : ""
      });
      vstavi(ovoj, seznam);
      seznam.remove();
    });
  }

  // ---------- Strani, ki niso koren predmeta (npr. pregled snovi) ----------
  function poglavjaNaMestu(predmet) {
    seznamiPoglavij(document).forEach(function (s) {
      var predmeti = s.povezave.map(function (a, i) { return vKnjigo(a, podatkiPoglavja(a, predmet, i), i); });
      vstavi(polica(predmeti, { namig: "Izberi poglavje." }), s.seznam);
      s.seznam.remove();
    });
  }

  // ---------- Stran predmeta: tabla, pod njo polica snovi in polica mature ----------
  function stranPredmeta(predmet) {
    var glava = document.querySelector(".page-header");
    if (!glava) return;
    var mesto = el("div", "police-predmeta");
    glava.parentNode.insertBefore(mesto, glava.nextSibling);
    var porabljene = {};

    function dodajSnov(seznami, izTeStrani) {
      var predmeti = [];
      seznami.forEach(function (s) {
        s.povezave.forEach(function (a) {
          var i = predmeti.length;
          porabljene[pot(a.getAttribute("href"))] = true;
          predmeti.push(novaKnjiga(a.getAttribute("href"), podatkiPoglavja(a, predmet, i), i));
        });
      });
      if (!predmeti.length) return;
      vstavi(polica(predmeti, { ime: "Snov", namig: "Izberi poglavje in začni z razlago." }), mesto.firstChild, mesto);
      if (izTeStrani) skrijPorabljene();
    }

    function maturaPovezave(koren) {
      var re = new RegExp("^/views/" + predmet + "/(matura|naloge)/");
      var out = [];
      koren.querySelectorAll("a.link-item[href], .info-card a[href]").forEach(function (a) {
        var p = pot(a.getAttribute("href"));
        if (!re.test(p) || out.some(function (b) { return b.pot === p; })) return;
        out.push({ pot: p, a: a });
      });
      return out;
    }

    function dodajMaturo(povezave) {
      // pregled mature (matura.html) zamenjaj z njegovimi podstranmi, če jih najdemo
      var predmeti = [];
      var vrstni = function (p) { return /pole/.test(p) ? 0 : /po_snovi/.test(p) ? 1 : /matura\.html$/.test(p) ? 2 : 3; };
      povezave.sort(function (x, y) { return vrstni(x.pot) - vrstni(y.pot); });
      povezave.forEach(function (x, i) {
        var a = x.a;
        var naslov = besedilo(a, "strong") || a.textContent.trim();
        var naloge = /\/naloge\//.test(x.pot);
        porabljene[x.pot] = true;
        predmeti.push(novaKnjiga(a.getAttribute("href"), {
          oznaka: naloge ? "Vaja" : "Matura",
          naslov: naslov.replace(/^Maturitetne naloge po snovi$/, "Naloge po snovi"),
          znak: osnova(predmet),
          opis: besedilo(a, "small") || besedilo(a.closest(".link-item") || a, "small"),
          barva: odtenek(BARVA[osnova(predmet)] || "#2F55D4", i + 1),
          sirina: 92,
          visina: [324, 306, 316, 296][i % 4]
        }, i));
        predmeti[predmeti.length - 1].classList.add("knjiga--mapa");
      });
      if (!predmeti.length) return;
      vstavi(polica(predmeti, { ime: "Matura in vaja", namig: "Pole, naloge po snovi in vaja.", razred: "polica--ozka" }), null, mesto);
      skrijPorabljene();
    }

    // sekcije, katerih povezave so vse na policah, skrijemo (vsebina ostane v HTML)
    function skrijPorabljene() {
      document.querySelectorAll(".view .subsection").forEach(function (sekcija) {
        if (mesto.contains(sekcija)) return;
        var povezave = sekcija.querySelectorAll("a.link-item[href]");
        if (!povezave.length) return;
        var vse = Array.prototype.every.call(povezave, function (a) { return porabljene[pot(a.getAttribute("href"))]; });
        if (vse) sekcija.classList.add("na-polici");
      });
    }

    // snov: s te strani ali, če je tu ni, s pregleda snovi
    var tu = seznamiPoglavij(document);
    if (tu.length) dodajSnov(tu, true);
    else {
      fetch("/views/" + predmet + "/snov/snov.html").then(function (r) { return r.ok ? r.text() : ""; }).then(function (html) {
        if (!html) return;
        dodajSnov(seznamiPoglavij(new DOMParser().parseFromString(html, "text/html")), false);
      }).catch(function () {});
    }

    var matura = maturaPovezave(document);
    var pregled = matura.filter(function (x) { return /\/matura\/matura\.html$/.test(x.pot); })[0];
    if (pregled) {
      fetch(pregled.pot).then(function (r) { return r.ok ? r.text() : ""; }).then(function (html) {
        var pod = html ? maturaPovezave(new DOMParser().parseFromString(html, "text/html")) : [];
        dodajMaturo(matura.concat(pod.filter(function (x) {
          return !matura.some(function (y) { return y.pot === x.pot; });
        })));
      }).catch(function () { dodajMaturo(matura); });
    } else {
      dodajMaturo(matura);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", postavi);
  } else {
    postavi();
  }
})();
