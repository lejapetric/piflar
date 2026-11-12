import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Klor ima izotopa \(^{35}\mathrm{Cl}\) in \(^{37}\mathrm{Cl}\), povprečna relativna atomska masa je \(35{,}45\). Kolikšen je delež izotopa \(^{37}\mathrm{Cl}\)? (V odstotkih, mase izotopov vzemi \(35\) in \(37\).)`, v: 22.5, enota: "%",
    rez: x`\(22{,}5\,\%\)`, post: x`<p>\(35(1 - x) + 37x = 35{,}45\), \(2x = 0{,}45\), \(x = 0{,}225\)</p>` },
  { t: 4, b: x`Koliko neparnih elektronov ima atom železa (\(Z = 26\)) v osnovnem stanju?`, v: 4,
    rez: x`\(4\)`, post: x`<p>\(\mathrm{[Ar]\,4s^2\,3d^6}\). Šest elektronov v petih orbitalah d: po Hundovem pravilu najprej po eden v vsaki (5), šesti se sklopi. Neparnih ostane \(4\).</p>` },
  { t: 4, b: x`Kateri ion ima elektronsko konfiguracijo \(\mathrm{1s^2\,2s^2\,2p^6\,3s^2\,3p^6}\) in naboj \(2-\)?`, p: x`\(\mathrm{S^{2-}}\)`, n: [x`\(\mathrm{O^{2-}}\)`, x`\(\mathrm{Ca^{2+}}\)`, x`\(\mathrm{Ar^{2-}}\)`],
    post: x`<p>Konfiguracija ima 18 elektronov. Ion z nabojem \(2-\) ima dva elektrona več kot protonov: \(Z = 16\), to je žveplo.</p>` },
  { t: 4, b: x`Koliko nevtronov je v ionu \(^{56}_{26}\mathrm{Fe^{3+}}\)?`, v: 30,
    rez: x`\(30\)`, post: x`<p>Nevtronov \(A - Z = 56 - 26 = 30\). Naboj iona vpliva le na število elektronov (\(23\)), ne na nevtrone.</p>` },
  { t: 4, b: x`Kateri element ima v osnovnem stanju konfiguracijo zunanje lupine \(\mathrm{4s^1\,3d^{10}}\) (izjema od pravila zapolnjevanja)?`, p: "baker", n: ["kalij", "cink", "krom"],
    post: x`<p>Baker (\(Z = 29\)): namesto \(\mathrm{4s^2\,3d^9}\) je stabilnejša popolnoma zapolnjena podlupina d, \(\mathrm{4s^1\,3d^{10}}\). (Krom ima \(\mathrm{4s^1\,3d^5}\).)</p>` },
  { t: 4, b: x`Kateri od delcev ima največji polmer: \(\mathrm{Na^+}\), \(\mathrm{Mg^{2+}}\), \(\mathrm{F^-}\), \(\mathrm{O^{2-}}\)?`, p: x`\(\mathrm{O^{2-}}\)`, n: [x`\(\mathrm{F^-}\)`, x`\(\mathrm{Na^+}\)`, x`\(\mathrm{Mg^{2+}}\)`],
    post: x`<p>Vsi imajo 10 elektronov (izoelektronski). Manj protonov pomeni šibkejši privlak in večji polmer: O (8 protonov) je največji.</p>` },
  { t: 4, b: x`Koliko orbital je zasedenih (vsaj z enim elektronom) v atomu fosforja (\(Z = 15\)) v osnovnem stanju?`, v: 9,
    rez: x`\(9\)`, post: x`<p>\(\mathrm{1s^2\,2s^2\,2p^6\,3s^2\,3p^3}\): 1s (1), 2s (1), 2p (3), 3s (1), 3p (3, vsaka z enim elektronom). Skupaj \(9\).</p>` },
];
