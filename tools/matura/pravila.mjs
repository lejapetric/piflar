// Pravila, ki jih uporabljamo v postopkih rešitev maturitetnih pol, in ali so
// zapisana na listu s formulami, ki je priložen poli.
//   or: na listu s formulami za osnovno raven
//   vr: na listu s formulami za višjo raven
//   k:  regularni izraz za sivi komentar koraka
//   v:  (neobvezno) regularni izraz za rokopis koraka
export const PRAVILA = [
  // ---------- na listu s formulami ----------
  { ime: "Evklidov in višinski izrek", k: /evklid|višinsk\w* izrek/i, or: true, vr: true },
  { ime: "Heronova formula", k: /heron/i, or: true, vr: true },
  { ime: "Polmer trikotniku včrtanega kroga (r = S/s)", k: /polmer včrtan\w* (krožnice|kroga)/i, or: true, vr: true },
  { ime: "Površina in prostornina krogle", k: /(površin|prostornin)\w* krogl/i, or: true, vr: true },
  { ime: "Vsota in razlika kubov", k: /(vsot|razlik)\w* kubov/i, or: true, vr: true },
  { ime: "Adicijski izreki", k: /adicijsk/i, or: true, vr: true },
  { ime: "Kotne funkcije polovičnih kotov", k: /polovičn\w* kot/i, or: true, vr: true },
  { ime: "Ekscentričnost elipse (e² = a² − b²)", k: /e² = a² − b²/, v: /e<sup>2<\/sup> = a<sup>2<\/sup> − b/, or: true, vr: true },
  { ime: "Ekscentričnost hiperbole (e² = a² + b²)", k: /e² = a² \+ b²/, v: /e<sup>2<\/sup> = a<sup>2<\/sup> \+ b/, or: true, vr: true },
  { ime: "Gorišče in vodnica parabole", k: /gorišč\w*[^.]*parabol|vodnic/i, or: true, vr: true },
  { ime: "Vsota prvih n členov aritmetičnega zaporedja", k: /vsot\w* prvih n členov aritmetičn/i, or: true, vr: true },
  { ime: "Vsota prvih n členov geometrijskega zaporedja", k: /vsot\w* geometrijsk\w* zaporedj/i, or: true, vr: true },
  { ime: "Limita sin x / x", k: /sin x ?\/ ?x/i, or: true, vr: true },
  { ime: "Standardni odklon", k: /standardn\w* odklon/i, or: true, vr: false },
  { ime: "Prehod logaritma na novo osnovo", k: /nov\w* osnov/i, or: false, vr: true },
  { ime: "Razdalja točke od premice", k: /razdalj\w* točke (od|do) premice/i, or: false, vr: true },
  { ime: "Nedoločeni integral ∫ dx/(x² + a²) = (1/a) arctan(x/a)", k: /∫ dx \/ \(x² \+ a²\)|arctan\(x\/a\)/, or: false, vr: true },
  { ime: "Integracija po delih", k: /po delih|per partes/i, or: false, vr: true },
  { ime: "Prostornina rotacijskega telesa V = π∫ f(x)² dx", k: /vrtenin\w* (okrog|pod)|V = π∫|rotacijsk/i, or: false, vr: true },
  { ime: "Bernoullijeva formula", k: /bernoulli/i, or: false, vr: true },

  // ---------- niso na listu s formulami (treba jih je znati) ----------
  { ime: "Kosinusni izrek", k: /kosinusn\w* izrek/i },
  { ime: "Sinusni izrek", k: /(?<!ko)sinusn\w* izrek/i },
  { ime: "Pitagorov izrek", k: /pitagor/i },
  { ime: "Vsota notranjih kotov", k: /vsota notranjih kotov/i },
  { ime: "Zunanji kot trikotnika", k: /zunanji kot je enak/i },
  { ime: "Podobni trikotniki", k: /podobn\w* (trikotnik|sta)/i },
  { ime: "Sokota in sovršna kota", k: /sokot|sovršn/i },
  { ime: "Razlika kvadratov", k: /razlik\w* kvadratov/i },
  { ime: "Kvadrat dvočlenika", k: /kvadrat (vsote|razlike|dvočlenika)|popoln\w* kvadrat/i },
  { ime: "Vietovo pravilo", k: /viet/i },
  { ime: "Rešitve kvadratne enačbe (diskriminanta)", k: /[Dd]iskriminant|\bD [<>=] |kvadratn\w* enačb/ },
  { ime: "Teme parabole (p = −b/2a)", k: /abscisa temena|teme[^n]|−b\/\(2a\)|p = −b/ },
  { ime: "Hornerjev algoritem", k: /horner/i },
  { ime: "Deljenje polinomov", k: /deljenj\w* polinom/i },
  { ime: "Ničla polinoma", k: /vrednost polinoma/i },
  { ime: "Izpostavljanje skupnega faktorja", k: /izpostavi/i },
  { ime: "Pravila za računanje s potencami", k: /potenc\w* (potenciramo|z isto osnovo)|eksponent\w* (seštejemo|odštejemo|zmnožimo|delimo)|izenačimo eksponent/i },
  { ime: "Koren kot potenca (ⁿ√a = a^(1/n))", k: /koren\w* zapišemo|kot potenco/i },
  { ime: "Definicija logaritma", k: /definicij\w* logaritm/i },
  { ime: "Pravila za računanje z logaritmi", k: /logaritem (produkta|količnika|potence)/i },
  { ime: "Odvod produkta", k: /odvod\w* produkta|\(uv\)'/i },
  { ime: "Odvod količnika", k: /odvod\w* količnika|pravilu za odvod količnika/i },
  { ime: "Odvod sestavljene funkcije (verižno pravilo)", k: /verižn|odvod notranje/i },
  { ime: "Odvodi elementarnih funkcij", k: /odvod (kosinusa|sinusa|eksponentne|potence)|ima odvod 0/i },
  { ime: "Tangenta: smerni koeficient je odvod", k: /smern\w* koeficient tangente/i },
  { ime: "Stacionarne točke (f '(x) = 0)", k: /stacionar|odvod[^.]*(= 0|enak 0)|lokaln\w* (maksimum|minimum)/i },
  { ime: "Integrali elementarnih funkcij", k: /integral potence|integral konstante|integral kosinusa|integral sinusa|integriramo člen/i },
  { ime: "Določeni integral (Newton-Leibnizova formula)", k: /ploščina[^.]*integral|enaka (določenemu )?integralu/i, v: /\|<sub>[^<]*<\/sub><sup>|\]<sub>/ },
  { ime: "Skalarni produkt", k: /skalarn\w* produkt/i },
  { ime: "Komponente vektorja (končna minus začetna točka)", k: /končna točka minus začetna|komponente vektorja/i },
  { ime: "Dolžina vektorja", k: /dolžina vektorja/i },
  { ime: "Enačba krožnice (x − p)² + (y − q)² = r²", k: /enačb\w* krožnice|krožnica s središčem|polmer je razdalja|razdalja središča/i },
  { ime: "Enačba elipse x²/a² + y²/b² = 1", k: /x²\/a² \+ y²\/b²|polosi|temeni na osi/i },
  { ime: "Linearna funkcija in enačba premice", k: /enačb\w* premice|y = kx|smern\w* koeficient(?! tangente)/i },
  { ime: "Pravokotni premici (k₁ · k₂ = −1)", k: /produkt je −1|pravokotnica ima k/i },
  { ime: "Absolutna vrednost kompleksnega števila", k: /absolutn\w* vrednost(: koren|i? kompleksn)|absolutna vrednost 2/i },
  { ime: "Enačbe z absolutno vrednostjo", k: /absolutna vrednost je \d/i },
  { ime: "Računanje s kompleksnimi števili (i² = −1)", k: /konjugiran|i² = −1/i },
  { ime: "Potence števila i", k: /potence i/i },
  { ime: "Vrednosti kotnih funkcij", k: /enotsk\w* krožnic|kosinus ima vrednost|sinus ima vrednost/i },
  { ime: "Reševanje enačb s kotnimi funkcijami", k: /skupin\w* rešitev/i },
  { ime: "Amplituda in premik kotne funkcije", k: /amplitud|premik grafa|premik navpično/i },
  { ime: "Aritmetično zaporedje", k: /aritmetičn\w* zaporedj|aritmetična sredina sosed/i },
  { ime: "Geometrijsko zaporedje", k: /geometrijsk\w* zaporedj|geometrijska sredina|delimo s prvo/i },
  { ime: "Vsota neskončne geometrijske vrste a₁/(1 − q)", k: /neskončn\w* geometrijsk\w* vrst/i },
  { ime: "Obrestno obrestovanje G = G₀ · rⁿ", k: /obrestn\w* obrestovanj/i },
  { ime: "Obrok posojila (sedanja vrednost obrokov)", k: /obrok pri vračanju posojila/i },
  { ime: "Pravilo produkta in pravilo vsote", k: /pravil\w* (produkta|vsote)/i },
  { ime: "Variacije, permutacije, kombinacije", k: /variacij|permutacij|vrstni red ni pomemben|izberemo \d+ (moš|žen|fant|deklet)/i },
  { ime: "Klasična definicija verjetnosti", k: /ugodn\w* izid/i },
  { ime: "Verjetnost nasprotnega dogodka", k: /nasprotn\w* dogod/i },
  { ime: "Verjetnost neodvisnih dogodkov", k: /neodvisn/i },
  { ime: "Aritmetična sredina in mediana", k: /median|tehtan\w* aritmetičn|vsota vseh podatkov/i },
  { ime: "Prostornina in površina teles", k: /prostornin\w* (valja|stožca|piramide|kocke|kvadra)|plašč|osnovn\w* ploskev krat|prostornina se ohrani|osni presek/i },
  { ime: "Ploščine likov", k: /ploščin\w* (trapeza|paralelograma|pravokotnika|šestkotnika|kroga|enakostraničn|pravokotnega|šestih)|polovica produkta katet|višina trapeza/i },
  { ime: "Asimptote racionalne funkcije", k: /asimptot/i },
  { ime: "Ničle in poli racionalne funkcije", k: /števec je 0|imenovalec je 0|imenovalec[^.]*= 0/i },
  { ime: "Matematična indukcija", k: /indukcij/i },
  { ime: "Operacije z množicami", k: /skupni elementi|ki niso v|(?<!osni )presek|unij|potenčn\w* množic|kartezičn/i },
  { ime: "Logični vezniki", k: /implikacij|konjunkcij|disjunkcij/i },
  { ime: "Odstotki", k: /odstot|\d ?% pomeni|faktor 1,|množenje z (1|0),/i },
  { ime: "Reševanje sistema enačb", k: /sistem\w* (enačb|treh)|iz (prve|druge|tretje) enačbe|vstavimo v (drugo|prvo|tretjo)|seštejemo (vse|enačb)|drugo enačbo delimo/i },
  { ime: "Reševanje neenačb", k: /neenača/i },
  { ime: "Periodična decimalna števila", k: /perioda/i },
  { ime: "Razcep na prafaktorje, največji skupni delitelj", k: /prafaktor|skupn\w* delitelj/i },
  { ime: "Razmerja", k: /razmerj/i },
  { ime: "Zrcaljenje točk", k: /zrcaljenj/i },
  { ime: "Znanstveni zapis števil", k: /isto potenco 10|znanstven/i },
  { ime: "Sode in lihe funkcije", k: /\bsoda funkcija|\bliha funkcija|funkcija je (soda|liha)/i },
  { ime: "Presečišča grafa z osema in med grafi", k: /presečišč|izenačimo (funkcij|desni)|imata premici enak/i },
  { ime: "Ničle in začetna vrednost funkcije", k: /začetn\w* vrednost|^ničl\w*: |ničla: f\(x\) = 0/i },
];

// Doda vrstico s pravilom pod sivi komentar korakov. raven: "osnovna" | "visja".
// Največ dve pravili na korak, vsako pravilo v nalogi le prvič.
export function dodajPravila(razlaga, raven) {
  if (typeof razlaga !== "string" || !razlaga.includes("rk-korak")) return razlaga;
  const cisto = razlaga.replace(/<span class="rk-pravilo">[\s\S]*?<\/span><\/span>/g, "");
  const ze = new Set();
  return cisto.replace(/<div class="rk-korak([^"]*)"><div class="rk-v">([\s\S]*?)<\/div>(?:<div class="rk-kom">([\s\S]*?)<\/div>)?<\/div>/g, (vse, razred, v, kom = "") => {
    if (razred.includes("rk-naslov")) return vse;
    const najdena = PRAVILA.filter((p) => p.k.test(kom) || (p.v && p.v.test(v))).filter((p) => !ze.has(p.ime)).slice(0, 2);
    if (!najdena.length) return vse;
    najdena.forEach((p) => ze.add(p.ime));
    const oznake = najdena.map((p) => {
      const naListu = raven === "visja" ? p.vr : p.or;
      return `<span class="rk-pravilo"><span class="rk-pravilo-ime">${p.ime}</span><span class="rk-list ${naListu ? "rk-da" : "rk-ne"}">${naListu ? "je na listu s formulami" : "ni na listu s formulami"}</span></span>`;
    }).join("");
    return `<div class="rk-korak${razred}"><div class="rk-v">${v}</div><div class="rk-kom">${kom}${oznake}</div></div>`;
  });
}
