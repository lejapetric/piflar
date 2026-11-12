const x = String.raw;
export default [
  { t: 4, b: x`Katero zaporedje taksonomskih kategorij je pravilno od najširše do najožje?`, p: "domena, kraljestvo, deblo, razred, red, družina, rod, vrsta", n: ["kraljestvo, domena, razred, deblo, družina, red, rod, vrsta", "domena, deblo, kraljestvo, razred, red, rod, družina, vrsta", "kraljestvo, deblo, red, razred, družina, rod, vrsta, domena"],
    post: x`<p>Domena → kraljestvo → deblo → razred → red → družina → rod → vrsta.</p>` },
  { t: 4, b: x`Katera skupina je po molekularnih podatkih najbližje sorodna glivam?`, p: "živali", n: ["rastline", "bakterije", "arheje"],
    post: x`<p>Glive in živali spadata v skupino opistokontov (skupni prednik z enim bičkom zadaj). Obe skladiščita glikogen in imata hitin pri glivah oziroma pri nekaterih živalih.</p>` },
  { t: 4, b: x`Zakaj arhej ne uvrščamo med bakterije, čeprav sta obe skupini prokariontski?`, p: "razlikujeta se v zgradbi membranskih lipidov, celične stene in v genih za rRNA", n: ["ker imajo arheje jedro", "ker imajo arheje mitohondrije", "ker so arheje večcelične"],
    post: x`<p>Arheje imajo etrske membranske lipide, steno brez peptidoglikana in molekularne mehanizme (npr. RNA-polimeraze), ki so bolj podobni evkariontom.</p>` },
  { t: 4, b: x`Kaj je skupno vsem strunarjem v nekem razvojnem obdobju?`, p: "hrbtna struna, hrbtna cevasta živčevina in škržne reže", n: ["hrbtenica in štiri okončine", "perje ali dlaka", "notranje okostje iz kosti"],
    post: x`<p>Hrbtna struna, hrbtna živčna cev, škržne reže (in rep za zadnjikom) so znaki strunarjev; pri vretenčarjih se struna nadomesti s hrbtenico.</p>` },
  { t: 4, b: x`Pri kateri skupini rastlin je gametofit prevladujoča (dolgo živeča) generacija?`, p: "mahovi", n: ["praprotnice", "golosemenke", "kritosemenke"],
    post: x`<p>Pri mahovih je zelena rastlina haploidni gametofit, sporofit raste na njem. Pri praprotnicah in semenkah prevladuje diploidni sporofit.</p>` },
  { t: 4, b: x`Na kladogramu imata vrsti A in B zadnjega skupnega prednika bližje kot A in C. Kaj to pomeni?`, p: "A je bolj sorodna z B kot s C", n: ["A je bolj sorodna s C", "B je prednik vrste A", "A in B sta enako sorodni s C kot med sabo"],
    post: x`<p>Sorodnost na kladogramu določa najbližje skupno razvejišče, ne razporeditev vrst levo ali desno.</p>` },
  { t: 4, b: x`Katera značilnost loči kritosemenke od golosemenk?`, p: "semenska zasnova je zaprta v plodnici, nastane plod", n: ["imajo semena", "imajo žile", "imajo cvetni prah"],
    post: x`<p>Golosemenke imajo semenske zasnove gole na plodnih luskah, kritosemenke pa v plodnici, iz katere nastane plod.</p>` },
];
