// Tedenska priprava: tedni po slovenskem času, zgradba strani, predelanost razlage, omejitev
// prirastkov, izbira snovi, tempo, opravljene snovi in niz tednov.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  zacetekTedna, mejeTedna, pristejDni, zgradbaIzHtml, zgradbaStrani, najmanjCasa, sklopPredelan,
  povzetekBranja, pristejBranje, izmenicno, priporocenTempo, tedniDoMature, casOpravljene, niz,
  maturaZa, letoMature, danesLj,
} from "../api/utils/priprava.js";
import { snovi, koledarMature } from "../api/data/index.js";

test("teden se začne v ponedeljek ob polnoči po času v Ljubljani", () => {
  assert.equal(zacetekTedna(new Date("2026-11-20T14:00:00Z")), "2026-11-16"); // petek
  assert.equal(zacetekTedna(new Date("2026-11-22T22:59:59Z")), "2026-11-16"); // nedelja 23:59 v Lj
  assert.equal(zacetekTedna(new Date("2026-11-22T23:00:00Z")), "2026-11-23"); // ponedeljek 00:00 v Lj
  assert.equal(zacetekTedna(new Date("2026-06-07T21:59:00Z")), "2026-06-01"); // poletni čas
  assert.equal(zacetekTedna(new Date("2026-06-07T22:00:00Z")), "2026-06-08");
  assert.deepEqual(mejeTedna("2026-11-16"), { od: new Date("2026-11-15T23:00:00Z"), do: new Date("2026-11-22T23:00:00Z") });
  // teden s prehodom na poletni čas (29. 3. 2026)
  assert.deepEqual(mejeTedna("2026-03-23"), { od: new Date("2026-03-22T23:00:00Z"), do: new Date("2026-03-29T22:00:00Z") });
  assert.equal(pristejDni("2026-12-28", 7), "2027-01-04");
});

test("zgradba strani: sklopi z id, besede, video in višja raven", () => {
  const html = `
    <section class="sklop" id="sklop-1"><header class="sklop-header"><h2>Osnove</h2></header>
      <div class="sklop-video"><video src="a.mp4"></video></div>
      <p>${"beseda ".repeat(300)}</p><svg><text>${"x ".repeat(500)}</text></svg></section>
    <section class="sklop sklop--visja" id="sklop-2"><h2>Težje</h2><p>kratko \\(x^2\\)</p></section>
    <section class="subsection" id="kljuc"><p>${"ključ ".repeat(100)}</p></section>`;
  const z = zgradbaIzHtml(html);
  assert.equal(z.length, 2);
  assert.equal(z[0].id, "sklop-1");
  assert.equal(z[0].naslov, "Osnove");
  assert.ok(z[0].besede >= 300 && z[0].besede < 310, "SVG ne šteje");
  assert.equal(z[0].video, true);
  assert.equal(z[0].visja, false);
  assert.equal(z[1].visja, true);
  assert.equal(z[1].video, false);
  assert.equal(z[1].minCas, 20);
  assert.equal(najmanjCasa(5000), 180);
});

test("vsaka snov z razlago ima vsaj en sklop", () => {
  for (const s of snovi) {
    const z = zgradbaStrani(s.predmet, s.slug);
    // snovi brez strani (v pripravi) imajo prazno zgradbo
    for (const sklop of z) assert.match(sklop.id, /^sklop-/, `${s.predmet}/${s.slug}`);
  }
  assert.ok(zgradbaStrani("matematika", "mnozice").length >= 5);
});

test("sklop je predelan po dovolj branja ali 80 % videa", () => {
  const sklop = { id: "sklop-1", minCas: 60, video: true };
  assert.equal(sklopPredelan(sklop, { cas: 59 }), false);
  assert.equal(sklopPredelan(sklop, { cas: 60 }), true);
  assert.equal(sklopPredelan(sklop, { video: 79, trajanje: 100 }), false);
  assert.equal(sklopPredelan(sklop, { video: 80, trajanje: 100 }), true);
  assert.equal(sklopPredelan({ ...sklop, video: false }, { video: 80, trajanje: 100 }), false);
  assert.equal(sklopPredelan(sklop, { video: 5, trajanje: 5 }), false, "prekratek video ne šteje");

  const zgradba = [1, 2, 3, 4].map((i) => ({ id: `sklop-${i}`, minCas: 30, video: false }));
  const p = povzetekBranja(zgradba, [{ id: "sklop-1", cas: 30 }, { id: "sklop-2", cas: 40 }]);
  assert.equal(p.predelani, 2);
  assert.equal(p.potrebno, 3);
  assert.equal(p.predelano, false);
  assert.equal(povzetekBranja(zgradba, [1, 2, 3].map((i) => ({ id: `sklop-${i}`, cas: 30 }))).predelano, true);
  assert.equal(povzetekBranja([], []).predelano, false);
});

test("prirastki ne smejo preseči časa, ki je res minil", () => {
  const zgradba = [{ id: "sklop-1" }, { id: "sklop-2" }];
  // 15 s po zadnjem poročilu: največ 20 s branja
  let s = pristejBranje([], [{ id: "sklop-1", cas: 30 }, { id: "sklop-2", cas: 10 }, { id: "tuj", cas: 100 }], { zgradba, sekundOdZadnjega: 15 });
  const vsota = s.reduce((a, x) => a + x.cas, 0);
  assert.ok(Math.abs(vsota - 20) < 1e-9);
  assert.equal(s.some((x) => x.id === "tuj"), false);
  // prvo poročilo: največ 60 s; negativne in neštevilske vrednosti se ne štejejo
  s = pristejBranje([{ id: "sklop-1", cas: 5, video: 0, trajanje: 0 }], [{ id: "sklop-1", cas: -10, video: "x", trajanje: 200 }], { zgradba });
  assert.equal(s[0].cas, 5);
  assert.equal(s[0].trajanje, 200);
  // video do 2× hitreje (pospešeno predvajanje)
  s = pristejBranje([], [{ id: "sklop-1", video: 100 }], { zgradba, sekundOdZadnjega: 15 });
  assert.equal(s[0].video, 40);
});

test("snovi izbranih predmetov si sledijo izmenično", () => {
  const k = [
    { predmet: "matematika", slug: "a" }, { predmet: "matematika", slug: "b" }, { predmet: "matematika", slug: "c" },
    { predmet: "fizika", slug: "x" },
  ];
  assert.deepEqual(izmenicno(k, ["matematika", "fizika"]).map((s) => s.slug), ["a", "x", "b", "c"]);
  assert.deepEqual(izmenicno(k, ["fizika"]).map((s) => s.slug), ["x"]);
});

test("priporočen tempo: vsa snov predelana 3 tedne pred maturo", () => {
  assert.equal(priporocenTempo(17, 23), 1);
  assert.equal(priporocenTempo(40, 23), 2);
  assert.equal(priporocenTempo(40, 5), 5); // največ 5
  assert.equal(priporocenTempo(0, 10), 1);
  assert.equal(priporocenTempo(10, null), 2);
  assert.equal(tedniDoMature("2026-11-16", new Date("2027-05-01T00:00:00Z")), 23);
});

test("snov je opravljena, ko je razlaga predelana in je rešenih dovolj nalog", () => {
  const predelanoOb = new Date("2026-11-17T10:00:00Z");
  const resene = ["2026-11-18", "2026-11-16", "2026-11-19"].map((d) => new Date(`${d}T12:00:00Z`));
  assert.equal(casOpravljene({ predelanoOb: null, reseneOb: resene, cilj: 2 }), null);
  assert.equal(casOpravljene({ predelanoOb, reseneOb: resene, cilj: 4 }), null);
  assert.deepEqual(casOpravljene({ predelanoOb, reseneOb: resene, cilj: 2 }), new Date("2026-11-18T12:00:00Z"));
  assert.deepEqual(casOpravljene({ predelanoOb, reseneOb: resene, cilj: 1 }), predelanoOb);
  assert.deepEqual(casOpravljene({ predelanoOb, cilj: 0 }), predelanoOb);
});

test("niz šteje zaporedne opravljene tedne", () => {
  const t = (zacetek, opravljen) => ({ zacetek, opravljen });
  const tedni = [t("2026-10-26", true), t("2026-11-02", true), t("2026-11-09", true), t("2026-11-16", false)];
  assert.equal(niz(tedni, "2026-11-16"), 3); // ta teden še ni opravljen: niz se ne prekine
  assert.equal(niz([...tedni.slice(0, 3), t("2026-11-16", true)], "2026-11-16"), 4);
  assert.equal(niz([t("2026-10-26", true), t("2026-11-09", true)], "2026-11-16"), 1); // vmesni teden manjka
  assert.equal(niz([], "2026-11-16"), 0);
});

test("koledar mature: datumi izbranih predmetov iz koledarja RIC", () => {
  const m = maturaZa(koledarMature, { predmeti: ["matematika", "fizika"], leto: 2027 });
  assert.equal(m.vrsta, "splosna");
  assert.equal(m.zacetek, "2027-05-04"); // esej
  assert.deepEqual(m.izpiti.map((i) => [i.predmet, i.datum]), [["matematika", "2027-06-05"], ["fizika", "2027-06-16"]]);
  assert.ok(m.vir.startsWith("https://www.ric.si/"));
  assert.ok(m.mejniki.some((x) => x.vrsta === "rok" && x.datum === "2027-03-30"));

  const jesen = maturaZa(koledarMature, { predmeti: ["matematika", "kemija"], leto: 2027, rok: "jesenski" });
  assert.equal(jesen.izpiti.find((i) => i.predmet === "matematika").datum, "2027-08-24");
  assert.deepEqual(jesen.izpiti.find((i) => i.predmet === "kemija").do, "2027-08-31"); // po razporedu šole

  const pm = maturaZa(koledarMature, { predmeti: ["poklicna_matematika"], leto: 2027 });
  assert.equal(pm.vrsta, "poklicna");
  assert.equal(pm.izpiti[0].datum, "2027-06-05");

  assert.equal(maturaZa(koledarMature, { predmeti: ["matematika"], leto: 2031 }), null);
});

test("koledar mature: vsi datumi so veljavni in vsi predmeti splošne mature imajo spomladanski izpit", () => {
  const datumi = JSON.stringify(koledarMature).match(/\d{4}-\d{2}-\d{2}/g);
  for (const d of datumi) assert.ok(!Number.isNaN(Date.parse(d)), d);
  const izpiti = koledarMature[2027].splosna.spomladanski.izpiti;
  for (const p of ["matematika", "fizika", "kemija", "biologija", "informatika", "slovenscina", "anglescina", "zgodovina", "geografija"])
    assert.ok(izpiti[p], p);
});

test("leto mature: iz profila ali konec tekočega šolskega leta", () => {
  assert.equal(letoMature({ letoMature: 2028 }), 2028);
  assert.equal(letoMature({}, new Date("2026-11-22T12:00:00Z")), 2027);
  assert.equal(letoMature({}, new Date("2027-03-01T12:00:00Z")), 2027);
  assert.equal(letoMature({}, new Date("2027-07-02T12:00:00Z")), 2028);
  assert.equal(danesLj(new Date("2026-11-22T23:30:00Z")), "2026-11-23");
});
