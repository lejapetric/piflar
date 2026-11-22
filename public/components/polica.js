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

  // Snov, razdeljena na več polic (po številki poglavja iz kataloga).
  var RAZDELITEV = {
    slovenscina: [
      { ime: "Jezikoslovje", oznaka: /^1\./, namig: "Jezik: od sporazumevanja in glasov do besedila." },
      { ime: "Književnost", oznaka: /^2\./, namig: "Književnost od antike do druge polovice 20. stoletja." }
    ]
  };
  // Polica »Priprava na maturo«: strani, ki so samo za izpit (zgradba izpita,
  // esej, ustni, pisni sestavki ...). snov = poglavja (slug), ki se s police
  // snovi preselijo sem; dodatne = druge strani za izpit.
  var PRIPRAVA = {
    slovenscina: {
      snov: ["esej"],
      dodatne: [
        { href: "/views/slovenscina/snov/besedilo/besedilo_razlaga.html#sklop-5", oznaka: "Pola 2",
          naslov: "Razčlemba in krajše besedilo", opis: "2. izpitna pola: razčlemba izhodiščnega besedila in odprta naloga (prošnja, vabilo, mnenje …)." },
        { href: "/views/slovenscina/matura/matura.html", oznaka: "Izpit",
          naslov: "Zgradba izpita", opis: "Izpitni poli, točke, čas in ustni del mature iz slovenščine." }
      ]
    },
    matematika: {
      dodatne: [
        { href: "/views/matematika/ustni/ustni.html", oznaka: "Ustni",
          naslov: "Ustni del mature", opis: "Vsi izpitni listki z odgovori in kviz za ponavljanje." }
      ]
    },
    anglescina: { snov: ["izpit_anglescina", "bralno_razumevanje", "slusno_razumevanje", "krajsi_pisni_sestavek",
      "daljsi_pisni_sestavek", "pisanje_eseja", "ustni_izpit", "opis_slike", "visja_raven"] },
    nemscina: { snov: ["izpit_nemscina", "razumevanje_de", "pisno_sporocanje_de", "ustni_izpit_de"] },
    francoscina: { snov: ["razumevanje_fr", "pisno_sporocanje_fr", "ustni_izpit_fr"] },
    italijanscina: { snov: ["izpit_italijanscina", "razumevanje_it", "pisno_sporocanje_it", "ustni_izpit_it"] },
    spanscina: { snov: ["izpit_es", "razumevanje_es", "pisno_sporocanje_es", "ustni_izpit_es"] },
    filozofija: { snov: ["komentar_besedila", "filozofski_esej", "seminarska_naloga"] },
    poklicna_slovenscina: { snov: ["izpit_pm_slovenscina", "razclemba_besedila", "tvorba_besedila"] }
  };
  function slugPoglavja(href) {
    var m = /\/snov\/([a-z0-9_]+)\//.exec(pot(href));
    return m ? m[1] : null;
  }
  // Poglavja razdeli na police: [{ime, namig, povezave, priprava?}].
  // Zadnja je »Priprava na maturo« (poglavja iz PRIPRAVA + dodatne strani).
  function razdeli(predmet, povezave) {
    var pr = PRIPRAVA[predmet] || {};
    var zaMaturo = pr.snov || [];
    var priprava = [];
    var ostale = [];
    povezave.forEach(function (a) {
      var i = zaMaturo.indexOf(slugPoglavja(a.getAttribute("href")));
      if (i >= 0) priprava[i] = a;
      else ostale.push(a);
    });
    priprava = priprava.filter(Boolean);
    var police = [];
    var deli = RAZDELITEV[predmet];
    if (deli) {
      var ostanek = ostale.slice();
      deli.forEach(function (d) {
        var tu = ostanek.filter(function (a) { return d.oznaka.test(besedilo(a, "strong")); });
        ostanek = ostanek.filter(function (a) { return tu.indexOf(a) < 0; });
        if (tu.length) police.push({ ime: d.ime, namig: d.namig, povezave: tu });
      });
      if (ostanek.length) police.push({ ime: "Snov", namig: "Izberi poglavje in začni z razlago.", povezave: ostanek });
    } else if (ostale.length) {
      police.push({ ime: "Snov", namig: "Izberi poglavje in začni z razlago.", povezave: ostale });
    }
    if (priprava.length || (pr.dodatne && pr.dodatne.length)) {
      police.push({ ime: "Priprava na maturo", namig: "Strani samo za izpit: kako je sestavljen, esej, pisanje, ustni.",
        povezave: priprava, dodatne: pr.dodatne || [], priprava: true });
    }
    return police;
  }
  // Knjige ene police iz razdeli().
  function knjigePolice(predmet, p, nova) {
    var knjige = [];
    p.povezave.forEach(function (a) {
      var i = knjige.length;
      var podatki = podatkiPoglavja(a, predmet, p.priprava ? i + 3 : i);
      knjige.push(nova ? novaKnjiga(a.getAttribute("href"), podatki, i) : vKnjigo(a, podatki, i));
    });
    (p.dodatne || []).forEach(function (d) {
      var i = knjige.length;
      knjige.push(novaKnjiga(d.href, {
        oznaka: d.oznaka || "",
        naslov: d.naslov,
        opis: d.opis || "",
        znak: osnova(predmet),
        barva: odtenek(BARVA[osnova(predmet)] || "#2F55D4", i + 3)
      }, i));
    });
    if (p.priprava) knjige.forEach(function (k) { k.classList.add("knjiga--priprava"); });
    return knjige;
  }
  var PRESKOK = 3; // razmik med knjigami (px), enak kot gap v tabla.css
  // telefon: knjige so zložene ena na drugo (glej tabla.css)
  var telefonMq = window.matchMedia ? matchMedia("(max-width: 820px)") : null;
  function telefon() { return telefonMq ? telefonMq.matches : window.innerWidth <= 820; }
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
    var visina = p.visina || VISINE[i % VISINE.length];
    a.style.setProperty("--visina", visina + "px");
    // na telefonu knjige ležijo: dolžina hrbta kot delež širine police
    a.style.setProperty("--dolzina", (visina / 330).toFixed(3));
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
    if (nastavitve.razred) nastavitve.razred.split(" ").forEach(function (r) { ovoj.classList.add(r); });
    var vrste = el("div", "polica-vrste");
    var napis = el("div", "polica-napis");
    napis.setAttribute("aria-live", "polite");
    ovoj.appendChild(vrste);
    ovoj.appendChild(napis);
    ovoj._predmeti = predmeti;
    ovoj._ime = nastavitve.ime || "";
    ovoj._namig = nastavitve.namig || "";
    nastaviNapis(ovoj, null, 0);

    // Hover velja samo za miško. Na zaslonu na dotik bi pointerenter ob tapu
    // knjigo le izbral (iOS potem zahteva še en tap) in pointerleave bi jo
    // takoj odznačil; tam knjigo izbira drsenje (glej izberiObDrsenju), tap
    // pa jo odpre kot klik na računalniku.
    function miska(e) { return !e.pointerType || e.pointerType === "mouse"; }
    predmeti.forEach(function (k) {
      if (!k.classList || !k.classList.contains("knjiga")) return;
      k.addEventListener("pointerenter", function (e) { if (miska(e)) izberi(ovoj, k); });
      k.addEventListener("focus", function () { izberi(ovoj, k); });
    });
    ovoj.addEventListener("pointerleave", function (e) {
      if (!miska(e) || telefon()) return;
      if (!ovoj.contains(document.activeElement)) izberi(ovoj, null);
    });
    ovoj.addEventListener("focusout", function (e) {
      if (telefon()) return;
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
    var naTelefonu = telefon();
    var prostor = sirinaOvoja - 2 * 26 - 24; // notranji rob + opornica

    function sirina(k) {
      return k.classList.contains("knjiga") ? +k.dataset.sirina : 18;
    }
    var skupaj = predmeti.reduce(function (s, k) { return s + sirina(k) + PRESKOK; }, 0);
    // če skoraj gre v eno vrsto, knjige malo stanjšaj
    var faktor = 1;
    if (!naTelefonu && skupaj > prostor && skupaj * 0.78 <= prostor) faktor = prostor / skupaj;
    predmeti.forEach(function (k) {
      if (k.classList.contains("knjiga")) {
        k.style.setProperty("--sirina", Math.floor(+k.dataset.sirina * faktor) + "px");
      }
    });

    var skupine = [[]];
    if (!naTelefonu && faktor === 1) {
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
    izberiObDrsenju();
  }
  var cakaj;
  // stikalo splošna/poklicna matura pokaže skrito polico, ki še nima razporeda
  window.addEventListener("ucilnica:matura", function () {
    requestAnimationFrame(function () { ovoji.forEach(razporedi); });
  });
  window.addEventListener("resize", function () {
    clearTimeout(cakaj);
    cakaj = setTimeout(function () { ovoji.forEach(razporedi); izberiObDrsenju(); }, 120);
  });

  // Telefon: med drsenjem je izbrana knjiga, ki je najbližje sredini zaslona
  // (namesto hoverja). Ko polica ni več ob sredini, se izbira umakne.
  function izberiObDrsenju() {
    if (!telefon()) return;
    var visina = window.innerHeight || document.documentElement.clientHeight;
    var sredina = visina / 2;
    ovoji.forEach(function (ovoj) {
      var vrste = ovoj.querySelector(".polica-vrste");
      var r = vrste && vrste.getBoundingClientRect();
      if (!r || !r.height || r.bottom < sredina - visina * 0.25 || r.top > sredina + visina * 0.25) {
        if (ovoj._izbrana) izberi(ovoj, null);
        return;
      }
      var najblizja = null, razdalja = Infinity;
      ovoj._predmeti.forEach(function (k) {
        if (!k.classList || !k.classList.contains("knjiga")) return;
        var kr = k.getBoundingClientRect();
        var d = Math.abs(kr.top + kr.height / 2 - sredina);
        if (d < razdalja) { razdalja = d; najblizja = k; }
      });
      izberi(ovoj, najblizja);
    });
  }
  var drsenje = false;
  window.addEventListener("scroll", function () {
    if (drsenje) return;
    drsenje = true;
    requestAnimationFrame(function () { drsenje = false; izberiObDrsenju(); });
  }, { passive: true });
  if (telefonMq) {
    var obMenjavi = function () {
      if (!telefon()) ovoji.forEach(function (o) { izberi(o, null); });
      else izberiObDrsenju();
    };
    if (telefonMq.addEventListener) telefonMq.addEventListener("change", obMenjavi);
    else if (telefonMq.addListener) telefonMq.addListener(obMenjavi);
  }

  // Oštevilčena poglavja iz seznamov .link-list / .two-col.
  function seznamiPoglavij(koren) {
    var out = [];
    koren.querySelectorAll(".link-list, .two-col").forEach(function (seznam) {
      var povezave = Array.prototype.slice.call(seznam.querySelectorAll(":scope > a.link-item"));
      if (!povezave.length) return;
      var stevilcene = povezave.filter(function (a) { return STEVILKA.test(besedilo(a, "strong")); });
      if (stevilcene.length < povezave.length * 0.75) return;
      out.push({ seznam: seznam, povezave: povezave });
    });
    // kratki seznami (npr. »Izpit« z enim poglavjem) štejejo, če je poglavij skupaj vsaj 4
    var skupaj = out.reduce(function (n, s) { return n + s.povezave.length; }, 0);
    return skupaj >= 4 ? out : [];
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
      if (karte.length < 3) return;
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
    var seznami = seznamiPoglavij(document);
    if (!seznami.length) return;
    // predmeti z lastno razdelitvijo ali polico za maturo: vsa poglavja strani
    // na skupnih policah; drugi: vsak seznam svoja polica, kot prej
    var skupaj = RAZDELITEV[predmet] || PRIPRAVA[predmet];
    var skupine = skupaj ? [seznami] : seznami.map(function (s) { return [s]; });
    skupine.forEach(function (sk) {
      var povezave = [];
      sk.forEach(function (s) { povezave = povezave.concat(s.povezave); });
      var vecSeznamov = sk.length > 1;
      var sidro = (vecSeznamov && sk[0].seznam.closest(".subsection")) || sk[0].seznam;
      var police = skupaj ? razdeli(predmet, povezave) : [{ povezave: povezave }];
      var vec = police.length > 1;
      police.forEach(function (p) {
        vstavi(polica(knjigePolice(predmet, p, false), {
          ime: vec ? p.ime : "",
          namig: vec ? p.namig : "Izberi poglavje.",
          razred: p.priprava ? "polica--ozka" : ""
        }), sidro);
      });
      sk.forEach(function (s) {
        var sekcija = vecSeznamov && s.seznam.closest(".subsection");
        if (sekcija) sekcija.classList.add("na-polici");
        s.seznam.remove();
      });
    });
  }

  // ---------- Stran predmeta: tabla, pod njo polica snovi in polica mature ----------
  function stranPredmeta(predmet) {
    var glava = document.querySelector(".page-header");
    if (!glava) return;
    var mesto = el("div", "police-predmeta");
    glava.parentNode.insertBefore(mesto, glava.nextSibling);
    var porabljene = {};

    // police si sledijo v tem vrstnem redu ne glede na to, katera se naloži prej
    function vMesto(ovoj, red) {
      ovoj.dataset.red = red;
      var pred = Array.prototype.filter.call(mesto.children, function (o) { return +o.dataset.red > red; })[0];
      vstavi(ovoj, pred || null, mesto);
    }

    function dodajSnov(seznami) {
      var povezave = [];
      seznami.forEach(function (s) { povezave = povezave.concat(s.povezave); });
      if (!povezave.length) return;
      razdeli(predmet, povezave).forEach(function (p, i) {
        p.povezave.forEach(function (a) { porabljene[pot(a.getAttribute("href"))] = true; });
        (p.dodatne || []).forEach(function (d) { porabljene[pot(d.href)] = true; });
        vMesto(polica(knjigePolice(predmet, p, true), {
          ime: p.ime, namig: p.namig, razred: p.priprava ? "polica--ozka polica--priprava" : ""
        }), p.priprava ? 50 : i);
      });
      skrijPorabljene();
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
      vMesto(polica(predmeti, { ime: "Matura in vaja", namig: "Pole, naloge po snovi in vaja.", razred: "polica--ozka" }), 60);
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
    if (tu.length) dodajSnov(tu);
    else {
      fetch("/views/" + predmet + "/snov/snov.html").then(function (r) { return r.ok ? r.text() : ""; }).then(function (html) {
        if (!html) return;
        dodajSnov(seznamiPoglavij(new DOMParser().parseFromString(html, "text/html")));
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
