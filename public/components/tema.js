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
