// public/components/tema.js
// Naloži se v <head> pred izrisom, da stran v temnem načinu ne utripne svetlo.
// Stikalo v glavi upravlja components.js.
(function () {
  var tema = null;
  try {
    tema = localStorage.getItem("piflar-tema");
  } catch (e) {
    /* zasebno okno */
  }
  if (tema !== "dark" && tema !== "light") {
    tema = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.theme = tema;
})();

// Videz po predmetih: na straneh pod /views/<predmet>/ doda slog predmeta
// (style/predmeti/). Naslovnica in ostale splošne strani ostanejo osnovne.
// document.write, da se slog naloži pred izrisom (brez utripa).
(function () {
  var m = location.pathname.match(
    /^\/views\/(biologija|fizika|geografija|informatika|kemija|matematika|slovenscina|zgodovina|anglescina|nemscina|francoscina|italijanscina|spanscina|psihologija|sociologija|filozofija|ekonomija|glasba|umetnostna_zgodovina)\//
  );
  if (!m) return;
  document.documentElement.dataset.predmet = m[1];
  document.write(
    '<link rel="stylesheet" href="/style/predmeti/osnova.css">' +
      '<link rel="stylesheet" href="/style/predmeti/' + m[1] + '.css">'
  );
})();

// Splošna ali poklicna matura: na straneh predmeta velja matura predmeta
// (poklicna_<predmet>), drugje zadnja izbira (stikalo v meniju, glavi in na
// naslovnici), privzeto splošna. Predmeti poklicne mature imajo videz
// osnovnega predmeta (data-predmet), pot pa je /views/poklicna_<predmet>/
// (data-slug).
(function () {
  var html = document.documentElement;
  var pm = location.pathname.match(/^\/views\/poklicna_([a-z_]+)\//);
  var matura = null;
  if (pm) {
    matura = "poklicna";
    html.dataset.slug = "poklicna_" + pm[1];
    if (!html.dataset.predmet) {
      html.dataset.predmet = pm[1];
      document.write(
        '<link rel="stylesheet" href="/style/predmeti/osnova.css">' +
          '<link rel="stylesheet" href="/style/predmeti/' + pm[1] + '.css">'
      );
    }
  } else if (/^\/views\/[a-z_]+\//.test(location.pathname)) {
    matura = "splosna";
  }
  try {
    if (matura) localStorage.setItem("ucilnica-matura", matura);
    else matura = localStorage.getItem("ucilnica-matura");
  } catch (e) {
    /* zasebno okno */
  }
  html.dataset.matura = matura === "poklicna" ? "poklicna" : "splosna";
})();

// Videz »Tabla in polica« (preizkus): privzeto vklopljen. Primerjava s
// starim videzom: ?videz=osnovni (izbira se zapomni), nazaj z ?videz=tabla.
(function () {
  var videz = null;
  try {
    var q = new URLSearchParams(location.search).get("videz");
    if (q === "osnovni" || q === "tabla") localStorage.setItem("piflar-videz", q);
    videz = localStorage.getItem("piflar-videz");
  } catch (e) {
    /* zasebno okno */
  }
  if (videz !== "osnovni") videz = "tabla";
  document.documentElement.dataset.videz = videz;
  if (videz !== "tabla") return;
  document.write(
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Gaegu:wght@400;700&family=Barlow+Condensed:wght@600;700;800&display=swap">' +
      '<link rel="stylesheet" href="/style/tabla.css">' +
      '<script src="/components/polica.js" defer></scr' + 'ipt>'
  );
})();
