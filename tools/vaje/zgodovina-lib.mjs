// Skupne predloge za zgodovino: dogodki [opis, leto] (leto < 0 = pr. n. št.), osebe [ime, opis].
import { izbira, kolicina, besedilo } from "./lib.mjs";

export const letoTxt = (l) => (l < 0 ? `${-l} pr. n. št.` : `${l}`);
const stoletje = (l) => Math.ceil(Math.abs(l) / 100);
const veliko = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export function zgodovinskeSerije(serija, { dogodki, osebe }) {
  const pr = dogodki.some(([, l]) => l < 0);
  serija("letnica", Math.min(dogodki.length, 20), (r) => {
    const [d, l] = r.izberi(dogodki);
    return kolicina({ tezavnost: 2, vrednost: Math.abs(l), enota: "", besedilo: `Katerega leta${l < 0 ? " (pr. n. št.)" : ""}: ${d}?`, rezultat: letoTxt(l), postopek: `<p>${veliko(d)}: ${letoTxt(l)}.</p>` });
  });
  serija("najprej", 14, (r, i) => {
    const izb = r.premesaj(dogodki).slice(0, 4);
    if (new Set(izb.map(([, l]) => l)).size < 4) return null;
    const zadnji = i % 2 === 1, urejeni = [...izb].sort((a, b) => a[1] - b[1]), odg = zadnji ? urejeni[3] : urejeni[0];
    return izbira({ r, tezavnost: zadnji ? 3 : 2, besedilo: `Kateri dogodek se je zgodil ${zadnji ? "najpozneje" : "najprej"}?`, pravilna: veliko(odg[0]), napacne: izb.filter((x) => x !== odg).map(([d]) => veliko(d)), postopek: `<p>Kronološko: ${urejeni.map(([d, l]) => `${d} (${letoTxt(l)})`).join(" → ")}.</p>` });
  });
  if (new Set(dogodki.map(([, l]) => Math.sign(l) * stoletje(l))).size >= 3) serija("stoletje", 10, (r) => {
    const [d, l] = r.izberi(dogodki), s = stoletje(l);
    return kolicina({ tezavnost: 2, vrednost: s, enota: "", besedilo: `V katerem stoletju${l < 0 ? " pr. n. št." : ""} se je zgodilo: ${d}? (Vpiši številko stoletja.)`, rezultat: `${s}. stoletje${l < 0 ? " pr. n. št." : ""}`, postopek: `<p>Leto ${letoTxt(l)} spada v ${s}. stoletje${l < 0 ? " pr. n. št." : ""} (npr. leta 1901–2000 so 20. stoletje).</p>` });
  });
  serija("razlika", 10, (r) => {
    const [a, b] = r.premesaj(dogodki).slice(0, 2).sort((x, y) => x[1] - y[1]);
    if (a[1] === b[1]) return null;
    const cez = a[1] < 0 && b[1] > 0, raz = b[1] - a[1] - (cez ? 1 : 0);
    return kolicina({ tezavnost: cez ? 4 : 3, ...(cez ? { raven: "visja" } : {}), vrednost: raz, enota: "let", besedilo: `Koliko let je minilo med dogodkoma »${a[0]}« (${letoTxt(a[1])}) in »${b[0]}« (${letoTxt(b[1])})?`, rezultat: `${raz} let`, postopek: cez ? `<p>Leta 0 ni, zato: \\(${-a[1]} + ${b[1]} - 1 = ${raz}\\).</p>` : `<p>\\(${b[1]} - (${a[1]}) = ${raz}\\)</p>` });
  });
  serija("uredi", 10, (r) => {
    const izb = r.premesaj(dogodki).slice(0, 4);
    if (new Set(izb.map(([, l]) => l)).size < 4) return null;
    const crke = ["A", "B", "C", "D"], red = [...izb.keys()].sort((a, b) => izb[a][1] - izb[b][1]).map((i) => crke[i]);
    return besedilo({ tezavnost: 4, raven: "visja", sprejemljivi: [red.join(""), red.join(","), red.join("-")], besedilo: `Uredi dogodke kronološko od najzgodnejšega do najpoznejšega (vpiši črke, npr. BADC):<br>${izb.map(([d], i) => `${crke[i]}) ${veliko(d)}`).join("<br>")}`, rezultat: red.join(", "), postopek: `<p>${red.map((c) => { const [d, l] = izb[crke.indexOf(c)]; return `${c}: ${d} (${letoTxt(l)})`; }).join("<br>")}</p>` });
  });
  if (osebe?.length >= 4) {
    serija("oseba", Math.min(osebe.length, 14), (r, i) => {
      const [o, opis] = r.izberi(osebe);
      if (i % 2) return izbira({ r, tezavnost: 2, besedilo: `Kaj velja za osebnost ${o}?`, pravilna: veliko(opis), napacne: r.premesaj(osebe.filter(([x]) => x !== o)).slice(0, 3).map(([, y]) => veliko(y)), postopek: `<p>${o}: ${opis}.</p>` });
      return izbira({ r, tezavnost: 1, besedilo: `Kdo ${opis}?`, pravilna: o, napacne: r.premesaj(osebe.filter(([x]) => x !== o)).slice(0, 3).map(([x]) => x), postopek: `<p>${o} ${opis}.</p>` });
    });
  }
  return pr;
}
