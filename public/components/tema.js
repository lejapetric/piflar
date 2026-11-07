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
    /^\/views\/(biologija|fizika|geografija|informatika|kemija|matematika|slovenscina|zgodovina)\//
  );
  if (!m) return;
  document.documentElement.dataset.predmet = m[1];
  document.write(
    '<link rel="stylesheet" href="/style/predmeti/osnova.css">' +
      '<link rel="stylesheet" href="/style/predmeti/' + m[1] + '.css">'
  );
})();
