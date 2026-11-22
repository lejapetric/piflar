// public/components/casovni-trak.js
// Časovni trak s premico in intervali (obdobja so intervali [od, do) ob levem robu).
// HTML ostane preprost seznam (deluje tudi brez JS in v iskalniku):
//   <div class="ct">
//     <ol class="ct-obdobja"><li data-od="1800" data-do="1821" data-barva="1">otroštvo</li></ol>
//     <ol class="ct-dogodki"><li data-leto="1800"><time>1800</time> <span>rojstvo</span></li></ol>
//   </div>
// Ta skripta ga izriše pokončno: na širokem zaslonu so dogodki izmenično levo in desno
// od premice, na ozkem vsi desno. Dolga obdobja brez dogodkov se stisnejo (znak //).
// Naloži jo components.js, ko je na strani .ct.
(function () {
  var SIROKO = 640;          // od te širine traku naprej: dogodki na obeh straneh
  var NS = "http://www.w3.org/2000/svg";

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }
  function svgEl(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function letoBesedilo(l) { return l < 0 ? -l + " pr. n. št." : String(l); }

  // Oznake na eni strani razmakne (visine: visina vsake oznake, med njimi `rob`);
  // prekrivajoce se skupine centrira okoli idealnih leg.
  function razmakni(idealni, visine, rob) {
    var poz = idealni.slice();
    var skupine = idealni.map(function (_, i) { return [i]; });
    function postavi(p) {
      var sr = p.reduce(function (s, i) { return s + idealni[i]; }, 0) / p.length;
      var dolzina = 0, odmiki = [];
      p.forEach(function (i, k) {
        if (k) dolzina += (visine[p[k - 1]] + visine[i]) / 2 + rob;
        odmiki.push(dolzina);
      });
      var srOdm = odmiki.reduce(function (s, o) { return s + o; }, 0) / p.length;
      p.forEach(function (i, k) { poz[i] = sr - srOdm + odmiki[k]; });
    }
    for (var korak = 0; korak < 60; korak++) {
      var nove = [], sprememba = false;
      skupine.forEach(function (g) {
        var p = nove[nove.length - 1];
        var zadnji = p && p[p.length - 1];
        if (p && poz[g[0]] < poz[zadnji] + (visine[zadnji] + visine[g[0]]) / 2 + rob) {
          Array.prototype.push.apply(p, g);
          postavi(p);
          sprememba = true;
        } else nove.push(g.slice());
      });
      skupine = nove;
      if (!sprememba) break;
    }
    return poz;
  }

  function preberi(ct) {
    if (ct._podatki) return ct._podatki;
    var obdobja = Array.prototype.map.call(ct.querySelectorAll(".ct-obdobja > li"), function (li) {
      return { el: li, od: +li.dataset.od, do: +li.dataset.do, barva: li.dataset.barva || "0", ime: li.textContent.trim() };
    });
    var dogodki = Array.prototype.map.call(ct.querySelectorAll(".ct-dogodki > li"), function (li) {
      return { el: li, leto: +li.dataset.leto };
    });
    dogodki.forEach(function (d) {
      d.barva = "0";
      obdobja.forEach(function (o, i) {
        var zadnje = i === obdobja.length - 1;
        if (d.leto >= o.od && (d.leto < o.do || (zadnje && d.leto <= o.do))) d.barva = o.barva;
      });
      d.el.style.setProperty("--b", "var(--ct-b" + d.barva + ")");
    });
    obdobja.forEach(function (o) {
      o.el.style.setProperty("--b", "var(--ct-b" + o.barva + ")");
      if (!o.el.querySelector(".ct-obd-cas")) {
        var ime = el("span", "ct-obd-ime");
        while (o.el.firstChild) ime.appendChild(o.el.firstChild);
        var cas = el("span", "ct-obd-cas");
        cas.textContent = o.od < 0 && o.do <= 0 ? "[" + -o.od + ", " + -o.do + ") pr. n. št." : "[" + letoBesedilo(o.od) + ", " + letoBesedilo(o.do) + ")";
        var crta = el("i", "ct-obd-crta");
        o.el.append(crta, ime, cas);
      }
    });
    ct._podatki = { obdobja: obdobja, dogodki: dogodki };
    return ct._podatki;
  }

  function izrisi(ct) {
    var sirina = ct.clientWidth;
    if (!sirina) return;
    var dve = sirina >= SIROKO;
    if (ct._nacin === dve && ct._sirina === sirina) return;
    ct._nacin = dve; ct._sirina = sirina;
    var p = preberi(ct);
    var obdobja = p.obdobja, dogodki = p.dogodki;
    if (!dogodki.length) return;
    ct.classList.add("ct--izrisan");
    ct.classList.toggle("ct--dve", dve);
    ct.classList.toggle("ct--ena", !dve);
    var ozadje = getComputedStyle(ct.closest(".slika") || ct).backgroundColor;
    ct.style.setProperty("--ct-ozadje", ozadje && ozadje !== "rgba(0, 0, 0, 0)" ? ozadje : "var(--bg-card, #fff)");

    var strani = { L: [], D: [] };
    dogodki.forEach(function (d, i) {
      d.stran = dve && i % 2 === 1 ? "L" : "D";
      strani[d.stran].push(d);
      d.el.classList.toggle("ct-dog--L", d.stran === "L");
      d.el.classList.toggle("ct-dog--D", d.stran === "D");
    });
    // povprečna višina oznake določi merilo, da oznake sledijo svojim letom
    var visineVse = dogodki.map(function (d) { return d.el.offsetHeight || 40; });
    var povp = visineVse.reduce(function (a, b) { return a + b; }, 0) / visineVse.length;
    // ---- preslikava leto -> y ----
    var leta = [];
    dogodki.forEach(function (d) { leta.push(d.leto); });
    obdobja.forEach(function (o) { leta.push(o.od, o.do); });
    leta = leta.filter(function (l, i) { return leta.indexOf(l) === i; }).sort(function (a, b) { return a - b; });
    var a0 = leta[0], b0 = leta[leta.length - 1], razpon = Math.max(1, b0 - a0);
    var u = dogodki.length * (dve ? (povp + 14) / 2 : povp + 8) * 1.15 / razpon;   // px na leto
    var NAJVEC = 150, STISNJEN = 64;
    var seg = [];
    for (var i = 0; i < leta.length - 1; i++) {
      var dl = (leta[i + 1] - leta[i]) * u;
      seg.push({ od: leta[i], do: leta[i + 1], dl: dl > NAJVEC ? STISNJEN : dl, stisnjen: dl > NAJVEC });
    }
    // obdobje mora biti dovolj visoko za svoje ime
    obdobja.forEach(function (o) {
      var vrstic = Math.ceil(o.ime.length / 13);
      var treba = dve ? Math.max(58, vrstic * 16 + 48) : Math.max(56, o.ime.length * 6.6 + 14);
      var notri = seg.filter(function (s) { return s.od >= o.od && s.do <= o.do; });
      var h = notri.reduce(function (v, s) { return v + s.dl; }, 0);
      if (h > 0 && h < treba) notri.forEach(function (s) { s.dl *= treba / h; });
    });
    var y = 0;
    seg.forEach(function (s) { s.y0 = y; y += s.dl; s.y1 = y; });
    var H = y;
    function f(l) {
      for (var i = 0; i < seg.length; i++) {
        var s = seg[i];
        if (l >= s.od && l <= s.do) return s.y0 + (l - s.od) / (s.do - s.od) * s.dl;
      }
      return l < a0 ? 0 : H;
    }

    // ---- oznake ----
    var min = 0, max = H;
    ["L", "D"].forEach(function (s) {
      var visine = strani[s].map(function (d) { return d.el.offsetHeight || 40; });
      var poz = razmakni(strani[s].map(function (d) { return f(d.leto); }), visine, dve ? 14 : 8);
      strani[s].forEach(function (d, i) {
        d.y = f(d.leto); d.ly = poz[i];
        min = Math.min(min, d.ly - visine[i] / 2 + 12); max = Math.max(max, d.ly + visine[i] / 2 - 12);
      });
    });
    var zamik = 30 - min;
    var visina = zamik + max + 46;

    // ---- izris ----
    var stara = ct.querySelector(".ct-risba");
    if (stara) stara.remove();
    var risba = el("div", "ct-risba");
    risba.setAttribute("aria-hidden", "true");
    ct.style.height = Math.round(visina) + "px";
    ct.style.setProperty("--ct-vrh", zamik + "px");
    ct.style.setProperty("--ct-dno", (zamik + H) + "px");
    risba.appendChild(el("div", "ct-os"));

    // letnice na premici (v razmiku vsaj 70 px), ne v stisnjenih delih
    var koraki = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000];
    var korak = koraki.filter(function (k) { return k * u >= 70; })[0] || 1000;
    var letaDog = dogodki.map(function (d) { return d.leto; });
    for (var l = Math.ceil(a0 / korak) * korak; l <= b0; l += korak) {
      var s = seg.filter(function (s) { return l >= s.od && l <= s.do; })[0];
      if (!s || (s.stisnjen && l !== s.od && l !== s.do)) continue;
      var ly = zamik + f(l);
      var blizu = dogodki.some(function (d) { return Math.abs(zamik + d.y - ly) < 24; });
      if (letaDog.indexOf(l) >= 0 || blizu) {
        var c = el("span", "ct-crtica"); c.style.top = ly + "px"; risba.appendChild(c);
        continue;
      }
      var t = el("span", "ct-leto"); t.style.top = ly + "px";
      t.textContent = l < 0 ? String(-l) : String(l);
      if (l < 0) { var pr = el("small"); pr.textContent = "pr. n. št."; t.appendChild(pr); }
      risba.appendChild(t);
    }
    seg.forEach(function (s) {
      if (!s.stisnjen) return;
      var pr = el("span", "ct-preskok"); pr.style.top = (zamik + (s.y0 + s.y1) / 2) + "px";
      risba.appendChild(pr);
    });

    var svg = svgEl("svg", { "class": "ct-vodila", width: "100%", height: Math.round(visina) });
    var X = 58; // os na telefonu (px), enako kot --x v casovni-trak.css
    dogodki.forEach(function (d) {
      var y0 = zamik + d.y, y1 = zamik + d.ly;
      var barva = "var(--ct-b" + d.barva + ")";
      if (dve) {
        var sx = d.stran === "D" ? 1 : -1;
        svg.appendChild(svgEl("line", { x1: "50%", y1: y0, x2: (50 + sx * 2.5) + "%", y2: y0, style: "stroke:" + barva }));
        svg.appendChild(svgEl("line", { x1: (50 + sx * 2.5) + "%", y1: y0, x2: (50 + sx * 5.5) + "%", y2: y1, style: "stroke:" + barva }));
      } else {
        svg.appendChild(svgEl("path", { d: "M" + X + " " + y0 + " H" + (X + 12) + " L" + (X + 30) + " " + y1 + " H" + (X + 40), style: "stroke:" + barva }));
      }
      svg.appendChild(svgEl("circle", { "class": "ct-tocka", cx: dve ? "50%" : X, cy: y0, r: 6, style: "stroke:" + barva }));
      d.el.style.top = y1 + "px";
    });
    risba.appendChild(svg);
    obdobja.forEach(function (o) {
      o.el.style.top = (zamik + f(o.od)) + "px";
      o.el.style.height = (f(o.do) - f(o.od)) + "px";
    });
    ct.insertBefore(risba, ct.firstChild);
  }

  var trakovi = Array.prototype.slice.call(document.querySelectorAll(".ct"));
  if (!trakovi.length) return;
  if (!document.querySelector('link[href="/style/casovni-trak.css"]')) {
    var css = el("link"); css.rel = "stylesheet"; css.href = "/style/casovni-trak.css";
    css.onload = function () { trakovi.forEach(izrisi); };
    document.head.appendChild(css);
  }
  trakovi.forEach(izrisi);
  var cakaj;
  window.addEventListener("resize", function () {
    clearTimeout(cakaj);
    cakaj = setTimeout(function () { trakovi.forEach(izrisi); }, 120);
  });
  // temni način spremeni ozadje slike (za krožce in letnice na premici)
  new MutationObserver(function () {
    trakovi.forEach(function (ct) { ct._sirina = null; izrisi(ct); });
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
})();
