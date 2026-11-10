import { kolicina, T } from "../lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  serija("iq", 14, (r, i) => {
    const ka = r.int(5, 14), ma = Math.max(3, ka + r.int(-3, 4)), iq = (ma / ka) * 100;
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: ma, tol: 0.01, enota: "let", besedilo: `Otrok, star ${ka} let, ima IQ ${T(iq, 0)} (po Sternovi formuli). Kolikšna je njegova mentalna starost?`, rezultat: `${ma} let`, postopek: `<p>\\(MS = \\frac{IQ \\cdot KS}{100} = \\frac{${T(iq, 2)} \\cdot ${ka}}{100} \\approx ${ma}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: iq, tol: 0.01, enota: "", besedilo: `Otrok je star ${ka} let, njegova mentalna starost je ${ma} let. Izračunaj IQ po Sternovi formuli.`, rezultat: T(iq, 0), postopek: `<p>\\(IQ = \\frac{MS}{KS} \\cdot 100 = \\frac{${ma}}{${ka}} \\cdot 100 \\approx ${T(iq, 0)}\\)</p>` });
  });
  serija("odklon", 8, (r, i) => {
    const k = r.izberi([-2, -1, 1, 2, 3]), iq = 100 + 15 * k;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: k, enota: "", besedilo: `Deviacijski IQ ima M = 100 in SD = 15. Za koliko standardnih odklonov od povprečja je oddaljen IQ ${iq}? (Vpiši s predznakom.)`, rezultat: `${k}`, postopek: `<p>\\(z = \\frac{${iq} - 100}{15} = ${k}\\)</p>` });
  });
  pojmi([
    ["inteligentnost", "Splošna sposobnost učinkovitega reševanja novih problemov in prilagajanja okolju."],
    ["mentalna starost", "Starost, ki ustreza ravni dosežka na testu inteligentnosti."],
    ["deviacijski IQ", "Količnik, ki dosežek primerja z vrstniki; povprečje je 100, standardni odklon 15."],
    ["faktor g", "Spearmanov splošni dejavnik inteligentnosti, skupen vsem umskim nalogam."],
    ["primarne sposobnosti", "Thurstonove neodvisne sposobnosti, npr. besedno razumevanje, prostorska predstavljivost, računanje."],
    ["fluidna inteligentnost", "Sposobnost reševanja novih problemov ne glede na znanje; s starostjo upada."],
    ["kristalizirana inteligentnost", "Nakopičeno znanje in izkušnje; s starostjo lahko raste."],
    ["Flynnov učinek", "Opažanje, da se povprečni dosežki na testih inteligentnosti skozi desetletja zvišujejo."],
    ["nadarjenost", "Izrazito nadpovprečne sposobnosti na enem ali več področjih."],
  ]);
  vprasanja([
    [2, "Kdo je sestavil prvi uporabni test inteligentnosti (1905)?", "Binet in Simon", ["Wundt", "Freud", "Piaget"], "Test je bil namenjen prepoznavanju otrok, ki potrebujejo pomoč v šoli."],
    [3, "Približno koliko odstotkov ljudi ima IQ med 85 in 115?", "68 %", ["50 %", "95 %", "99 %"], "To je območje ±1 SD pri normalni porazdelitvi."],
    [4, "Zakaj Sternove formule ne uporabljamo pri odraslih?", "mentalna starost po približno 16. letu ne narašča več", ["odrasli ne rešujejo testov", "formula je prezapletena", "odrasli imajo vedno IQ 100"], "Pri odraslih bi IQ s starostjo navidezno padal.", "visja"],
    [4, "Kaj kaže Gardnerjeva teorija mnogoterih inteligentnosti?", "da obstaja več razmeroma neodvisnih vrst inteligentnosti", ["da obstaja le faktor g", "da je inteligentnost povsem dedna", "da IQ ni mogoče meriti"], "Npr. jezikovna, logično-matematična, glasbena, telesno-gibalna …", "visja"],
  ]);
}
