import { spregatev, vrzeli } from "../jezik-lib.mjs";

const O = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];
const K2 = [["sein", ["wäre", "wärst", "wäre", "wären", "wärt", "wären"]], ["haben", ["hätte", "hättest", "hätte", "hätten", "hättet", "hätten"]], ["können", ["könnte", "könntest", "könnte", "könnten", "könntet", "könnten"]], ["werden", ["würde", "würdest", "würde", "würden", "würdet", "würden"]], ["müssen", ["müsste", "müsstest", "müsste", "müssten", "müsstet", "müssten"]], ["dürfen", ["dürfte", "dürftest", "dürfte", "dürften", "dürftet", "dürften"]]];

export default function ({ serija }) {
  spregatev(serija, "konjunktiv2", { glagoli: K2, osebe: O, cas: "Konjunktiv II", tez: 3, n: 24 });
  vrzeli(serija, "raba", [
    ["Wenn ich reich ___, würde ich reisen.", "wäre", ["bin", "war", "sei"], "Irrealni pogoj v sedanjosti: Konjunktiv II.", 2],
    ["Wenn ich Zeit ___, käme ich mit.", "hätte", ["habe", "hatte", "hat"], "Konjunktiv II od haben.", 2],
    ["___ Sie mir bitte helfen?", "Könnten", ["Können", "Konnten", "Kann"], "Vljudna prošnja s Konjunktiv II.", 2],
    ["Ich ___ gern ein Glas Wasser.", "hätte", ["habe", "hatte", "hat"], "Vljudna želja: Ich hätte gern …", 2],
    ["An deiner Stelle ___ ich mehr lernen.", "würde", ["werde", "wurde", "wird"], "Nasvet: an deiner Stelle würde ich …", 2],
    ["Wenn ich das gewusst ___, wäre ich gekommen.", "hätte", ["habe", "hatte", "wäre"], "Irealnost v preteklosti: hätte + Partizip II.", 4, "visja"],
    ["Wenn er früher losgefahren ___, hätte er den Zug erreicht.", "wäre", ["hätte", "ist", "war"], "Glagoli premikanja: wäre + Partizip II.", 4, "visja"],
    ["Er sagt, er ___ krank. (Konjunktiv I)", "sei", ["ist", "wäre", "war"], "Odvisni govor: Konjunktiv I od sein je sei.", 4, "visja"],
    ["Sie sagte, sie ___ keine Zeit. (Konjunktiv I)", "habe", ["hat", "hätte", "hatte"], "Konjunktiv I od haben: habe.", 4, "visja"],
    ["Er tut so, als ob er alles ___.", "wüsste", ["weiß", "wusste", "wisse"], "Als ob + Konjunktiv II.", 4, "visja"],
    ["Ich wünschte, ich ___ fliegen.", "könnte", ["kann", "konnte", "kannte"], "Želja: ich wünschte + Konjunktiv II.", 3],
    ["Du ___ mehr schlafen.", "solltest", ["sollst", "solltet", "sollen"], "Nasvet: Du solltest …", 3],
    ["Wenn es nicht regnen ___, gingen wir schwimmen.", "würde", ["wird", "wurde", "werde"], "Würde + nedoločnik.", 3],
  ]);
}
