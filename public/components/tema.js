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

// Predogled novih videzov (začasno, dokler ne izberemo enega): /predogled/.
// ?videz=1 … 10 vklopi videz za ta zavihek, ?videz=0 ga izklopi.
// Brez parametra se stran izriše v sedanjem slogu.
(function () {
  var videz = null;
  try {
    var m = location.search.match(/[?&]videz=(\d+)/);
    if (m) {
      videz = m[1];
      if (videz === "0") sessionStorage.removeItem("piflar-videz");
      else sessionStorage.setItem("piflar-videz", videz);
    } else {
      videz = sessionStorage.getItem("piflar-videz");
    }
  } catch (e) {
    /* zasebno okno */
  }
  if (!videz || !/^([1-9]|10)$/.test(videz)) return;
  var html = document.documentElement;
  html.dataset.videz = videz;
  ["osnova", "videz-" + videz].forEach(function (ime) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/predogled/videzi/" + ime + ".css";
    document.head.appendChild(link);
  });
  if (window.top !== window) return; // v primerjalni strani brez značke
  document.addEventListener("DOMContentLoaded", function () {
    var a = document.createElement("a");
    a.className = "videz-znacka";
    a.href = location.pathname + "?videz=0";
    a.title = "Izklopi predogled in se vrni na sedanji videz";
    a.textContent = "Predogled videza " + videz + " · izklopi";
    document.body.appendChild(a);
  });
})();
