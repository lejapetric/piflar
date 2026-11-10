import { skladateljiSerije } from "../glasba-lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  skladateljiSerije(serija, {
    kdo: ["umetnik", "umetnika"],
    dela: [["kupola firenške stolnice", "Filippo Brunelleschi"], ["bronasti David", "Donatello"], ["Sveta Trojica (Santa Maria Novella)", "Masaccio"], ["Rojstvo Venere", "Sandro Botticelli"], ["Zadnja večerja", "Leonardo da Vinci"], ["Mona Lisa", "Leonardo da Vinci"], ["marmorni David", "Michelangelo Buonarroti"], ["poslikava stropa Sikstinske kapele", "Michelangelo Buonarroti"], ["Atenska šola", "Rafael Santi"], ["Sikstinska Madona", "Rafael Santi"], ["Venera iz Urbina", "Tizian"], ["Vrt zemeljskih naslad", "Hieronymus Bosch"], ["Avtoportret s krznom", "Albrecht Dürer"], ["Lovci v snegu", "Pieter Bruegel st."]],
    osebe: [["Filippo Brunelleschi", "arhitekt, ki je odkril zakonitosti linearne perspektive"], ["Donatello", "kipar, ki je ustvaril prvi samostoječi akt po antiki"], ["Masaccio", "slikar, ki je prvi dosledno uporabil linearno perspektivo v sliki"], ["Leonardo da Vinci", "univerzalni genij, mojster sfumata"], ["Michelangelo Buonarroti", "kipar, slikar in arhitekt, avtor kupole sv. Petra"], ["Rafael Santi", "slikar harmoničnih Madon in vatikanskih sob"], ["Albrecht Dürer", "nemški slikar in grafik, mojster lesoreza in bakroreza"], ["Jan van Eyck", "nizozemski slikar, izpopolnjevalec oljne tehnike"]],
  });
  pojmi([
    ["renesansa", "Obdobje »prerojenja« antike v 15. in 16. stoletju."],
    ["humanizem", "Miselnost, ki postavlja človeka v središče in proučuje antiko."],
    ["linearna perspektiva", "Prikaz globine, pri katerem se vzporednice stikajo v izginjališču."],
    ["sfumato", "Leonardova tehnika mehkih prehodov brez ostrih obrisov."],
    ["visoka renesansa", "Vrhunec renesanse okoli 1500 v Rimu (Leonardo, Michelangelo, Rafael)."],
    ["manierizem", "Pozna renesansa s podaljšanimi figurami in napetimi kompozicijami."],
    ["centralna stavba", "Stavba, razporejena okrog središča, ideal renesančne arhitekture."],
    ["palača", "Mestno bivališče plemiške ali meščanske družine."],
    ["oljna tehnika", "Slikanje z barvnimi pigmenti v olju."],
    ["mecen", "Bogat podpornik umetnikov, npr. Medičejci."],
  ]);
  vprasanja([
    [4, "Po čem se severna renesansa razlikuje od italijanske?", "poudarja natančne podrobnosti in realizem predmetov, manj antične ideale", ["uporablja le fresko", "ne pozna oljne tehnike", "slika samo antične bogove"], "Npr. van Eyck in Dürer.", "visja"],
    [4, "Zakaj je piramidalna kompozicija značilna za visoko renesanso?", "ustvarja ravnovesje, mir in harmonijo, ki sta ideal obdobja", ["ker je bila predpisana s strani Cerkve", "ker so jo izumili v baroku", "ker je ustvarjala dramatično gibanje"], "Npr. Rafaelove Madone.", "visja"],
  ]);
}
