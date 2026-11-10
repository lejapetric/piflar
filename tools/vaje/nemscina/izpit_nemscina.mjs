import { izpitShema, vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  izpitShema(serija, { t3A: 18, t3B: "OR 19, VR 21" });
  vrzeli(serija, "mesano", [
    ["Ich interessiere mich ___ Musik.", "für", ["an", "auf", "mit"], "sich interessieren für + Akk.", 2],
    ["Ich freue mich ___ die Ferien.", "auf", ["über", "für", "an"], "sich freuen auf = veseliti se nečesa prihodnjega.", 3],
    ["Ich freue mich ___ dein Geschenk.", "über", ["auf", "für", "an"], "sich freuen über = veseliti se nečesa, kar je že tu.", 4, "visja"],
    ["Er wartet ___ den Bus.", "auf", ["für", "an", "zu"], "warten auf + Akk.", 2],
    ["Wir haben keine Lust, ins Kino ___ gehen.", "zu", ["um", "für", "–"], "Infinitiv mit zu.", 3],
    ["Er lernt viel, ___ die Prüfung zu bestehen.", "um", ["damit", "für", "zu"], "Um … zu za namen (isti osebek).", 4, "visja"],
    ["Ich habe ___ Bruder und zwei Schwestern.", "einen", ["ein", "einem", "einer"], "Haben + Akkusativ (m): einen.", 2],
    ["Kannst du mir ___ helfen?", "bitte", ["bitten", "gebeten", "bittet"], "Bitte = prosim.", 1],
    ["Das Wetter ist heute ___ als gestern.", "besser", ["gut", "am besten", "guter"], "Primernik od gut: besser.", 2],
    ["Berlin ist die ___ Stadt Deutschlands.", "größte", ["große", "größer", "großeste"], "Presežnik: die größte.", 3],
    ["Ich habe ___ Zeit.", "keine", ["nicht", "kein", "keinen"], "Kein- za zanikanje samostalnika (die Zeit).", 2],
    ["Er fährt ___ Fahrrad zur Schule.", "mit dem", ["mit das", "mit den", "mit der"], "Mit + Dativ (das Fahrrad → dem).", 2],
    ["Es ist wichtig, regelmäßig Sport ___ treiben.", "zu", ["um", "–", "für"], "Infinitiv mit zu po izrazih es ist wichtig.", 3],
    ["Ich erinnere mich gern ___ meine Kindheit.", "an", ["auf", "über", "für"], "sich erinnern an + Akk.", 4, "visja"],
    ["Sie hat Angst ___ Hunden.", "vor", ["von", "für", "über"], "Angst haben vor + Dativ.", 3],
    ["Wohin fährst du im Sommer? – ___ die Schweiz.", "In", ["Nach", "Zu", "Auf"], "Države s členom: in die Schweiz.", 4, "visja"],
    ["Ich bin ___ Slowenien.", "aus", ["von", "in", "nach"], "Kommen/sein aus + država.", 1],
    ["Wie lange lernst du schon Deutsch? – ___ fünf Jahren.", "Seit", ["Vor", "Für", "Ab"], "Seit + Dativ.", 2],
    ["Ich habe ihn ___ zwei Tagen gesehen.", "vor", ["seit", "für", "nach"], "Vor = pred (časovno).", 3],
  ]);
}
