import { kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  pojmi([
    ["čaša", "Valjasta steklena posoda z izlivom za mešanje, segrevanje in približno odmerjanje tekočin."],
    ["erlenmajerica", "Stožčasta bučka z ozkim vratom, primerna za titracije in mešanje brez razlitja."],
    ["merilni valj", "Pokončna graduirana posoda za odmerjanje prostornine tekočin."],
    ["bireta", "Dolga graduirana cev s petelinčkom za natančno dodajanje tekočine pri titraciji."],
    ["pipeta", "Steklena cevka za natančno odmerjanje določene prostornine tekočine."],
    ["lij ločnik", "Posoda s petelinčkom za ločevanje dveh tekočin, ki se ne mešata."],
    ["presesalna steklenica", "Debelostenska bučka s stranskim nastavkom za filtracijo z znižanim tlakom."],
    ["izparilnica", "Plitva porcelanasta posoda za izparevanje topila iz raztopine."],
    ["terilnica", "Posoda s pestilom za drobljenje trdnih snovi."],
    ["digestorij", "Prezračevana omara, v kateri delamo s strupenimi ali hlapnimi snovmi."],
    ["filtracija", "Ločevanje trdne snovi od tekočine skozi filtrirni papir."],
    ["destilacija", "Ločevanje tekočin na podlagi različnih vrelišč z izparevanjem in kondenzacijo."],
    ["kristalizacija", "Pridobivanje čiste trdne snovi z izločanjem kristalov iz raztopine."],
    ["dekantiranje", "Previdno odlivanje tekočine nad usedlino."],
  ], { uvod: "pripomoček ali postopek" });
  vprasanja([
    [1, "Kaj pomeni piktogram z lobanjo in prekrižanima kostema?", "akutna strupenost", ["jedka snov", "vnetljiva snov", "nevarno za okolje"], "Piktogram GHS06 označuje snovi, ki so lahko smrtno nevarne že v majhnih količinah."],
    [1, "Kaj pomeni piktogram s plamenom?", "vnetljiva snov", ["oksidativna snov", "eksploziv", "plin pod tlakom"], "Piktogram GHS02 označuje vnetljive snovi."],
    [1, "Kaj pomeni piktogram s plamenom nad krogom?", "oksidativna snov", ["vnetljiva snov", "eksploziv", "strupena snov"], "Piktogram GHS03: snov pospešuje gorenje drugih snovi."],
    [1, "Kaj pomeni piktogram z razjedeno roko in površino?", "jedka snov", ["dražilna snov", "strupena snov", "vnetljiva snov"], "Piktogram GHS05 označuje snovi, ki razjedajo kožo in kovine."],
    [1, "Kaj pomeni piktogram z odmrlim drevesom in ribo?", "nevarno za vodno okolje", ["strupeno za ljudi", "vnetljivo", "jedko"], "Piktogram GHS09."],
    [1, "Kaj pomeni piktogram s klicajem?", "dražilna ali škodljiva snov", ["eksploziv", "plin pod tlakom", "rakotvorna snov"], "Piktogram GHS07 opozarja na manjšo nevarnost (draženje, škodljivost)."],
    [1, "Kaj pomeni piktogram s silhueto človeka z zvezdo na prsih?", "resna nevarnost za zdravje (npr. rakotvornost)", ["vnetljivost", "jedkost", "nevarnost za okolje"], "Piktogram GHS08."],
    [1, "Kaj pomeni piktogram z eksplodirajočo bombo?", "eksploziv", ["vnetljiva snov", "plin pod tlakom", "oksidativna snov"], "Piktogram GHS01."],
    [1, "Kaj pomeni piktogram s plinsko jeklenko?", "plin pod tlakom", ["eksploziv", "vnetljiv plin", "strupen plin"], "Piktogram GHS04."],
    [2, "Kako pravilno redčimo koncentrirano žveplovo kislino?", "kislino počasi vlivamo v vodo ob mešanju", ["vodo vlivamo v kislino", "zmešamo hkrati", "kislino segrejemo in dodamo vodo"], "Pri redčenju se sprošča veliko toplote; če vlivamo vodo v kislino, lahko vzkipi in brizgne."],
    [2, "Kaj najprej naredimo, če nam kislina pljusne v oko?", "oko takoj in dolgo spiramo s tekočo vodo", ["oko nevtraliziramo z bazo", "oko zavežemo", "počakamo, da mine"], "Spiranje z veliko vode vsaj 15 minut, nato zdravniška pomoč."],
    [2, "Kako vohamo snov v laboratoriju?", "s pahljanjem hlapov z roko proti nosu", ["neposredno nad posodo", "ne vohamo nikoli, niti s pahljanjem", "z globokim vdihom"], "Z roko pahljamo pare proti sebi, nikoli ne vdihnemo neposredno."],
    [2, "Kam zavržemo ostanke organskih topil?", "v posebej označeno posodo za odpadna topila", ["v odtok", "v koš za smeti", "jih izlijemo na prostem"], "Organska topila so nevarni odpadki."],
    [2, "Kako segrevamo tekočino v epruveti?", "poševno, z odprtino stran od sebe in drugih", ["navpično nad plamenom", "z zamaško na epruveti", "z odprtino proti sebi"], "Tako preprečimo, da bi vrela tekočina brizgnila v koga."],
    [2, "Katera oznaka na steklovini pomeni, da je umerjena na izliv?", "Ex", ["In", "TD", "A"], "Ex pomeni, da izlije označeno prostornino; In pomeni, da jo vsebuje."],
    [3, "S katerim pripomočkom najnatančneje odmerimo 25,00 mL raztopine?", "polnilna pipeta", ["merilni valj", "čaša", "erlenmajerica"], "Polnilna pipeta ima najmanjšo napako."],
    [3, "Kako ločimo zmes vode in olja?", "z lijem ločnikom", ["s filtracijo", "z destilacijo pri 100 °C", "s kristalizacijo"], "Tekočini se ne mešata in imata različni gostoti."],
    [3, "Kako ločimo sol iz morske vode?", "z izparevanjem vode", ["s filtracijo", "z lijem ločnikom", "z dekantiranjem"], "Sol je raztopljena, zato jo dobimo, ko voda izpari."],
    [3, "Kako odčitamo prostornino v merilnem valju?", "pri spodnjem robu meniskusa v višini oči", ["pri zgornjem robu meniskusa", "od zgoraj navzdol", "kadar koli, saj ni pomembno"], "Pri vodnih raztopinah odčitamo spodnji rob meniskusa, oči v isti višini, da ni paralakse."],
  ]);
  serija("redcenje", 5, (r) => {
    const c1 = r.izberi([96, 37, 65, 25]), V = r.int(1, 10) * 100, c2 = r.int(2, 20);
    const m = (V * c2) / c1;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: m, tol: 0.01, enota: "g", besedilo: `Koliko gramov ${c1}-odstotne raztopine potrebujemo za pripravo ${V} g ${c2}-odstotne raztopine?`, rezultat: `${T(m, 1)} g (in ${T(V - m, 1)} g vode)`, postopek: `<p>Masa topljenca ostane enaka: \\(m_1 \\cdot ${c1} = ${V} \\cdot ${c2}\\).</p><p>\\(m_1 = \\frac{${V} \\cdot ${c2}}{${c1}} \\approx ${L(m, 1)}\\ \\text{g}\\)</p>` });
  });
}
