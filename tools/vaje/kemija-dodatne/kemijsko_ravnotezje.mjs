import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Za reakcijo \(\mathrm{H_2 + I_2 \rightleftharpoons 2\,HI}\) je \(K_c = 49\). V posodo s prostornino \(1\ \mathrm{L}\) damo po \(1\ \mathrm{mol}\) vodika in joda. Koliko molov HI je v ravnotežju?`, v: 14 / 9, enota: "mol",
    rez: x`\(n(\mathrm{HI}) = \frac{14}{9} \approx 1{,}56\ \mathrm{mol}\)`, post: x`<p>Zreagira \(x\): \(\frac{(2x)^2}{(1 - x)^2} = 49\), \(\frac{2x}{1 - x} = 7\), \(x = \frac79\).</p><p>\(n(\mathrm{HI}) = 2x = \frac{14}{9} \approx 1{,}56\ \mathrm{mol}\)</p>` },
  { t: 4, b: x`V ravnotežju \(\mathrm{N_2 + 3\,H_2 \rightleftharpoons 2\,NH_3}\), \(\Delta H < 0\), hkrati povečamo tlak in znižamo temperaturo. Kaj se zgodi z množino amoniaka?`, p: "poveča se", n: ["zmanjša se", "ostane enaka", "ni mogoče napovedati"],
    post: x`<p>Višji tlak premakne ravnotežje na stran z manj molekulami plina (4 → 2), nižja temperatura pa v smer eksotermne reakcije. Oba vpliva povečata množino \(\mathrm{NH_3}\).</p>` },
  { t: 4, b: x`Kako vpliva dodatek katalizatorja na ravnotežno konstanto in na lego ravnotežja?`, p: "ne spremeni ne konstante ne lege, le hitreje se vzpostavi", n: ["poveča konstanto", "premakne ravnotežje v smer produktov", "zmanjša konstanto, a pospeši reakcijo"],
    post: x`<p>Katalizator enako pospeši obe smeri reakcije, zato le skrajša čas do ravnotežja.</p>` },
  { t: 4, raven: "visja", b: x`Za reakcijo \(\mathrm{PCl_5 \rightleftharpoons PCl_3 + Cl_2}\) je pri neki temperaturi \(K_c = 0{,}04\ \mathrm{mol/L}\). V \(1\ \mathrm{L}\) je v ravnotežju \(0{,}25\ \mathrm{mol}\) \(\mathrm{PCl_5}\) in enaki množini \(\mathrm{PCl_3}\) ter \(\mathrm{Cl_2}\). Kolikšna je ta množina?`, v: 0.1, enota: "mol",
    rez: x`\(0{,}1\ \mathrm{mol}\)`, post: x`<p>\(K_c = \frac{x^2}{0{,}25} = 0{,}04\), \(x^2 = 0{,}01\), \(x = 0{,}1\ \mathrm{mol/L}\)</p>` },
  { t: 4, b: x`V ravnotežje \(\mathrm{Fe^{3+} + SCN^- \rightleftharpoons [FeSCN]^{2+}}\) (temno rdeče) dodamo raztopino, ki veže \(\mathrm{Fe^{3+}}\) v brezbarvni kompleks. Kaj opazimo?`, p: "raztopina posvetli", n: ["raztopina potemni", "nastane oborina", "nič se ne spremeni"],
    post: x`<p>Zmanjšanje koncentracije \(\mathrm{Fe^{3+}}\) premakne ravnotežje v levo, rdečega kompleksa je manj.</p>` },
  { t: 4, b: x`Za reakcijo \(\mathrm{CO + H_2O \rightleftharpoons CO_2 + H_2}\) je \(K_c = 1\). Začnemo z \(1\ \mathrm{mol}\) CO in \(3\ \mathrm{mol}\) vode v \(1\ \mathrm{L}\). Koliko molov vodika je v ravnotežju?`, v: 0.75, enota: "mol",
    rez: x`\(0{,}75\ \mathrm{mol}\)`, post: x`<p>\(\frac{x^2}{(1 - x)(3 - x)} = 1\), \(x^2 = 3 - 4x + x^2\), \(x = 0{,}75\)</p>` },
];
