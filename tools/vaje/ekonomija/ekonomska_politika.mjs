import { kolicina, izbira, T } from "../lib.mjs";
const UK = [["vlada zniža davke", "ekspanzivna fiskalna politika"], ["vlada poveča javne investicije", "ekspanzivna fiskalna politika"], ["vlada zmanjša javno porabo", "restriktivna fiskalna politika"], ["vlada zviša DDV", "restriktivna fiskalna politika"], ["centralna banka zniža obrestne mere", "ekspanzivna denarna politika"], ["centralna banka zviša obrestne mere", "restriktivna denarna politika"], ["centralna banka odkupuje državne obveznice", "ekspanzivna denarna politika"], ["centralna banka zviša obvezno rezervo", "restriktivna denarna politika"]];
const VS = [...new Set(UK.map(([, v]) => v))];
export default function ({ serija, pojmi, vprasanja }) {
  serija("ukrep", 8, (r, i) => izbira({ r, tezavnost: 2, besedilo: `Kakšna politika je, če ${UK[i][0]}?`, pravilna: UK[i][1], napacne: VS.filter((x) => x !== UK[i][1]), postopek: `<p>${UK[i][1]}.</p>` }));
  serija("racun", 30, (r, i) => {
    const kaj = i % 5;
    if (kaj === 0) { const p = r.int(10, 30), o = p + r.int(-4, 6); return kolicina({ tezavnost: 1, vrednost: p - o, tol: 0.001, enota: "mrd €", besedilo: `Prihodki državnega proračuna so ${p} mrd €, odhodki ${o} mrd €. Kolikšen je saldo proračuna? (Primanjkljaj z minusom.)`, rezultat: `${p - o} mrd €`, postopek: `<p>${p} − ${o} = ${p - o}.</p>` }); }
    if (kaj === 1) { const d = r.int(20, 50), b = r.int(40, 80); return kolicina({ tezavnost: 2, vrednost: (d / b) * 100, tol: 0.01, enota: "%", besedilo: `Javni dolg je ${d} mrd €, BDP ${b} mrd €. Kolikšen je javni dolg v odstotkih BDP?`, rezultat: `${T((d / b) * 100, 1)} %`, postopek: `<p>\\(\\frac{${d}}{${b}} \\cdot 100 = ${T((d / b) * 100, 1)}\\,\\%\\)</p>` }); }
    if (kaj === 2) { const def = r.int(5, 40) / 10, b = r.int(40, 80); return kolicina({ tezavnost: 2, vrednost: (def / b) * 100, tol: 0.01, enota: "%", besedilo: `Proračunski primanjkljaj je ${T(def, 1)} mrd €, BDP ${b} mrd €. Kolikšen je primanjkljaj v odstotkih BDP?`, rezultat: `${T((def / b) * 100, 2)} %`, postopek: `<p>\\(\\frac{${T(def, 1)}}{${b}} \\cdot 100 = ${T((def / b) * 100, 2)}\\,\\%\\)</p>` }); }
    if (kaj === 3) { const mpc = r.izberi([0.5, 0.6, 0.75, 0.8, 0.9]), dG = r.int(1, 10) * 100, k = 1 / (1 - mpc); return kolicina({ tezavnost: 4, raven: "visja", vrednost: dG * k, tol: 0.01, enota: "mio €", besedilo: `Mejna nagnjenost k potrošnji je ${T(mpc, 2)}. Država poveča izdatke za ${dG} mio €. Za koliko se lahko po preprostem multiplikatorju poveča BDP?`, rezultat: `${T(dG * k, 0)} mio €`, postopek: `<p>\\(k = \\frac{1}{1 - ${T(mpc, 2)}} = ${T(k, 2)}\\); \\(${dG} \\cdot ${T(k, 2)} = ${T(dG * k, 0)}\\)</p>` }); }
    const dh = r.int(800, 3000), st = r.izberi([16, 26, 33]); return kolicina({ tezavnost: 2, vrednost: (dh * st) / 100, tol: 0.001, enota: "€", besedilo: `Davčna osnova je ${dh} €, davčna stopnja ${st} %. Koliko znaša davek?`, rezultat: `${T((dh * st) / 100, 2)} €`, postopek: `<p>\\(${dh} \\cdot ${T(st / 100, 2)} = ${T((dh * st) / 100, 2)}\\)</p>` });
  });
  pojmi([
    ["fiskalna politika", "Uravnavanje gospodarstva z državnimi izdatki in davki."],
    ["denarna politika", "Uravnavanje količine denarja in obrestnih mer, ki ga izvaja centralna banka."],
    ["državni proračun", "Načrt prihodkov in odhodkov države za eno leto."],
    ["proračunski primanjkljaj", "Presežek odhodkov nad prihodki proračuna."],
    ["javni dolg", "Skupni dolg države, nakopičen s preteklimi primanjkljaji."],
    ["progresivni davek", "Davek, pri katerem davčna stopnja z dohodkom narašča."],
    ["posredni davek", "Davek, vključen v ceno, npr. DDV in trošarine."],
    ["neposredni davek", "Davek na dohodek ali premoženje, npr. dohodnina."],
    ["avtomatski stabilizatorji", "Mehanizmi, ki samodejno blažijo cikel, npr. nadomestila za brezposelnost."],
    ["fiskalno pravilo", "Pravilo, ki omejuje primanjkljaj ali dolg države."],
  ]);
  vprasanja([
    [3, "Kakšni sta meji za primanjkljaj in javni dolg po maastrichtskih merilih?", "primanjkljaj do 3 % BDP, dolg do 60 % BDP", ["primanjkljaj do 10 %, dolg do 100 %", "primanjkljaj do 1 %, dolg do 30 %", "brez omejitev"], "Pakt stabilnosti in rasti."],
    [4, "Zakaj je ekspanzivna fiskalna politika med recesijo lahko utemeljena?", "ker državna poraba nadomesti upad zasebnega povpraševanja in zmanjša brezposelnost", ["ker vedno zniža dolg", "ker zniža inflacijo", "ker zmanjša uvoz"], "Keynesianski pristop.", "visja"],
    [4, "Kaj je učinek izrinjanja (crowding out)?", "državno zadolževanje dvigne obrestne mere in zmanjša zasebne investicije", ["država izrine tuje banke", "davki izrinejo potrošnjo", "uvoz izrine izvoz"], "Del učinka fiskalne ekspanzije se izniči.", "visja"],
  ]);
}
