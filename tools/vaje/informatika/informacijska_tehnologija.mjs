import { izbira, kolicina, besedilo, T, L, sci } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("gostitelji", 8, (r) => {
    const p = r.int(20, 30), n = 2 ** (32 - p) - 2;
    return kolicina({ tezavnost: 3, vrednost: n, enota: "", besedilo: `Koliko naprav (gostiteljev) lahko naslovimo v omrežju z IPv4 predpono /${p}?`, rezultat: `${n}`, postopek: `<p>Za gostitelje ostane \\(32 - ${p} = ${32 - p}\\) bitov: \\(2^{${32 - p}} - 2 = ${n}\\) (odštejemo naslov omrežja in razpršilni naslov).</p>` });
  });
  serija("maska", 6, (r) => {
    const p = r.izberi([8, 16, 24, 25, 26, 27, 28]), m = Array.from({ length: 4 }, (_, i) => { const b = Math.max(0, Math.min(8, p - 8 * i)); return 256 - 2 ** (8 - b); }).join(".");
    return besedilo({ tezavnost: 3, sprejemljivi: [m], besedilo: `Zapiši omrežno masko za predpono /${p} v desetiškem zapisu s pikami.`, rezultat: m, postopek: `<p>${p} enic in ${32 - p} ničel, razdeljenih na 4 oktete: ${m}.</p>` });
  });
  serija("omrezje", 6, (r) => {
    const a = [r.int(10, 200), r.int(0, 255), r.int(0, 255), r.int(1, 254)], p = r.izberi([24, 16]);
    const net = p === 24 ? `${a[0]}.${a[1]}.${a[2]}.0` : `${a[0]}.${a[1]}.0.0`;
    return besedilo({ tezavnost: 4, raven: "visja", sprejemljivi: [net], besedilo: `Kateri je naslov omrežja, v katerem je naprava ${a.join(".")}/${p}?`, rezultat: net, postopek: `<p>Gostiteljske bite (zadnjih ${32 - p}) postavimo na 0: ${net}.</p>` });
  });
  serija("naslovi", 6, (r) => {
    const n = r.int(8, 36);
    return kolicina({ tezavnost: 2, vrednost: 2 ** n, enota: "", besedilo: `Koliko pomnilniških lokacij lahko naslovi procesor z ${n}-bitnim naslovnim vodilom?`, rezultat: `\\(2^{${n}}\\) = ${2 ** n}`, postopek: `<p>\\(2^{${n}} = ${2 ** n}\\)</p>` });
  });
  serija("takt", 6, (r) => {
    const f = r.izberi([1, 2, 2.5, 3, 3.5, 4]), t = 1 / f;
    return kolicina({ tezavnost: 2, vrednost: t, tol: 0.01, enota: "ns", besedilo: `Kako dolg je en urin cikel procesorja s taktom ${T(f, 1)} GHz (v ns)?`, rezultat: `${T(t, 3)} ns`, postopek: `<p>\\(t = \\frac{1}{f} = \\frac{1}{${L(f, 1)} \\cdot 10^9}\\ \\text{s} \\approx ${L(t, 3)}\\ \\text{ns}\\)</p>` });
  });
  serija("disk", 6, (r) => {
    const GB = r.izberi([256, 500, 512, 1000, 2000]), MB = r.int(2, 8), n = Math.floor((GB * 1000) / MB);
    return kolicina({ tezavnost: 2, vrednost: n, enota: "", besedilo: `Koliko fotografij po ${MB} MB največ shranimo na disk velikosti ${GB} GB (1 GB = 1000 MB)?`, rezultat: `${n}`, postopek: `<p>\\(\\lfloor \\frac{${GB * 1000}}{${MB}} \\rfloor = ${n}\\)</p>` });
  });
  serija("plast", 7, (r) => {
    const [p, odg] = r.izberi([["HTTP", "aplikacijska"], ["TCP", "transportna"], ["UDP", "transportna"], ["IP", "omrežna (internetna)"], ["Ethernet", "povezavna (podatkovna)"], ["DNS", "aplikacijska"], ["SMTP", "aplikacijska"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Na kateri plasti modela TCP/IP deluje protokol ${p}?`, pravilna: odg, napacne: ["aplikacijska", "transportna", "omrežna (internetna)", "povezavna (podatkovna)"].filter((x) => x !== odg), postopek: `<p>${p}: ${odg} plast.</p>` });
  });
  serija("protokol", 7, (r) => {
    const [n, odg] = r.izberi([["pretvarja domenska imena v IP-naslove", "DNS"], ["samodejno dodeljuje IP-naslove", "DHCP"], ["prenaša spletne strani šifrirano", "HTTPS"], ["pošilja elektronsko pošto", "SMTP"], ["prenaša datoteke", "FTP"], ["zagotavlja zanesljiv prenos s potrditvami", "TCP"], ["oddaljeno varno prijavljanje v ukazno vrstico", "SSH"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kateri protokol ${n}?`, pravilna: odg, napacne: r.premesaj(["DNS", "DHCP", "HTTPS", "SMTP", "FTP", "TCP", "SSH"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg}: ${n}.</p>` });
  });
  serija("strojna", 7, (r) => {
    const [n, odg] = r.izberi([["izvaja ukaze programov", "procesor (CPE)"], ["začasno hrani podatke in programe med delovanjem", "delovni pomnilnik (RAM)"], ["trajno shranjuje podatke", "trdi disk ali SSD"], ["povezuje vse komponente računalnika", "matična plošča"], ["obdeluje grafiko in slike", "grafična kartica (GPE)"], ["vsebuje program za zagon računalnika", "ROM (BIOS/UEFI)"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Kateri del računalnika ${n}?`, pravilna: odg, napacne: r.premesaj(["procesor (CPE)", "delovni pomnilnik (RAM)", "trdi disk ali SSD", "matična plošča", "grafična kartica (GPE)", "ROM (BIOS/UEFI)"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg}: ${n}.</p>` });
  });
  serija("napad", 5, (r) => {
    const [n, odg] = r.izberi([["lažno e-sporočilo, ki zvabi uporabnika, da vpiše geslo", "ribarjenje (phishing)"], ["program, ki zašifrira datoteke in zahteva odkupnino", "izsiljevalski program (ransomware)"], ["množica zahtev, ki preobremeni strežnik", "napad DoS"], ["program, ki se skriva v navidezno koristnem programu", "trojanski konj"], ["poskušanje vseh možnih gesel", "napad s surovo silo"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kako imenujemo grožnjo: ${n}?`, pravilna: odg, napacne: ["ribarjenje (phishing)", "izsiljevalski program (ransomware)", "napad DoS", "trojanski konj", "napad s surovo silo"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("geslo", 4, (r) => {
    const [abc, k] = r.izberi([["samo male črke (26)", 26], ["male in velike črke (52)", 52], ["črke in števke (62)", 62], ["števke (10)", 10]]), n = r.int(4, 10);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: k ** n, tol: 0.001, enota: "", besedilo: `Koliko različnih gesel dolžine ${n} lahko sestavimo iz znakov: ${abc}? (vpiši npr. 2,1e11)`, rezultat: `\\(${k}^{${n}} \\approx ${sci(k ** n)}\\)`, postopek: `<p>Na vsakem mestu je ${k} možnosti: \\(${k}^{${n}}\\).</p>` });
  });
  pojmi([
    ["strojna oprema", "Fizični deli računalnika."],
    ["programska oprema", "Programi, ki jih računalnik izvaja."],
    ["operacijski sistem", "Programska oprema, ki upravlja strojno opremo in izvaja programe."],
    ["gonilnik", "Program, ki operacijskemu sistemu omogoča uporabo naprave."],
    ["predpomnilnik", "Majhen hiter pomnilnik med procesorjem in delovnim pomnilnikom."],
    ["navidezni pomnilnik", "Uporaba diska kot razširitve delovnega pomnilnika."],
    ["IP-naslov", "Številčni naslov naprave v omrežju."],
    ["MAC-naslov", "Strojni naslov omrežne kartice."],
    ["usmerjevalnik", "Naprava, ki posreduje pakete med omrežji."],
    ["stikalo", "Naprava, ki povezuje naprave v lokalnem omrežju."],
    ["požarni zid", "Sistem, ki nadzira in filtrira omrežni promet."],
    ["šifriranje", "Pretvorba podatkov v obliko, berljivo le z ustreznim ključem."],
    ["dvostopenjsko preverjanje", "Prijava z geslom in še enim neodvisnim dokazilom."],
    ["oblak", "Storitve in shranjevanje na oddaljenih strežnikih prek interneta."],
  ]);
  vprasanja([
    [3, "Kateri pomnilnik je najhitrejši?", "registri procesorja", ["predpomnilnik", "RAM", "SSD"], "Hierarhija: registri → predpomnilnik → RAM → disk."],
    [4, "Zakaj predpomnilnik pospeši delovanje, čeprav je majhen?", "zaradi časovne in prostorske lokalnosti dostopov", ["ker je večji od RAM", "ker hrani celoten disk", "ker nadomesti procesor"], "Programi pogosto ponovno dostopajo do istih ali bližnjih podatkov.", "visja"],
    [4, "Kakšna je razlika med simetričnim in asimetričnim šifriranjem?", "simetrično uporablja en skupni ključ, asimetrično par javnega in zasebnega ključa", ["simetrično je vedno počasnejše", "asimetrično ne potrebuje ključa", "razlike ni"], "Asimetrično rešuje izmenjavo ključev, simetrično je hitrejše.", "visja"],
    [4, "Zakaj se za prenos videa v živo pogosto uporablja UDP namesto TCP?", "ker je hitrejši in izgubljeni paketi niso kritični", ["ker je zanesljivejši", "ker šifrira podatke", "ker deluje brez IP"], "TCP bi ob izgubi čakal na ponovni prenos.", "visja"],
    [2, "Kateri je zasebni (lokalni) IP-naslov?", "192.168.1.10", ["8.8.8.8", "213.250.1.5", "142.250.180.14"], "Zasebni obsegi: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16."],
  ]);
}
