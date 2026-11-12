const x = String.raw;
export default [
  { t: 4, b: x`Kateri oksid je amfoteren (reagira s kislinami in z bazami)?`, p: x`\(\mathrm{Al_2O_3}\)`, n: [x`\(\mathrm{Na_2O}\)`, x`\(\mathrm{SO_3}\)`, x`\(\mathrm{MgO}\)`],
    post: x`<p>Aluminijev oksid reagira s kislino (\(\mathrm{Al^{3+}}\)) in z bazo (\(\mathrm{[Al(OH)_4]^-}\)). \(\mathrm{Na_2O}\) in \(\mathrm{MgO}\) sta bazična, \(\mathrm{SO_3}\) kisel.</p>` },
  { t: 4, b: x`Kolikšno je oksidacijsko število kobalta v kompleksnem ionu \(\mathrm{[Co(NH_3)_5Cl]^{2+}}\)?`, v: 3,
    rez: x`\(+\mathrm{III}\)`, post: x`<p>\(\mathrm{NH_3}\) je nevtralen, \(\mathrm{Cl^-}\) ima \(-1\): \(x - 1 = +2\), \(x = +3\).</p>` },
  { t: 4, b: x`Kolikšno je koordinacijsko število železa v ionu \(\mathrm{[Fe(C_2O_4)_3]^{3-}}\)? (Oksalatni ion je dvovezni ligand.)`, v: 6,
    rez: x`\(6\)`, post: x`<p>Trije dvovezni ligandi tvorijo \(3 \cdot 2 = 6\) koordinacijskih vezi.</p>` },
  { t: 4, b: x`Kateri element ima največjo prvo ionizacijsko energijo?`, p: "fluor", n: ["kisik", "dušik", "natrij"],
    post: x`<p>Ionizacijska energija v periodi narašča od leve proti desni. Fluor je med naštetimi najbolj desno v 2. periodi (dušik ima sicer višjo kot kisik zaradi pol zapolnjene podlupine p, a nižjo od fluora).</p>` },
  { t: 4, b: x`Zakaj so spojine prehodnih kovin pogosto obarvane?`, p: "elektroni v delno zasedenih orbitalah d absorbirajo vidno svetlobo", n: ["ker so vse ionske", "ker vsebujejo kisik", "ker so prehodne kovine radioaktivne"],
    post: x`<p>V kompleksih se orbitale d razcepijo na nivoje z majhno razliko energije. Elektroni ob prehodu absorbirajo del vidne svetlobe, vidimo komplementarno barvo. Zato je \(\mathrm{Zn^{2+}}\) (\(\mathrm{d^{10}}\)) brezbarven.</p>` },
  { t: 4, b: x`Kako se imenuje kompleksna spojina \(\mathrm{K_4[Fe(CN)_6]}\)?`, p: "kalijev heksacianoferat(II)", n: ["kalijev heksacianoferat(III)", "kalijev tetracianoferat(II)", "železov kalijev cianid"],
    post: x`<p>Šest ligandov CN\(^-\) (heksaciano), anionski kompleks (-ferat). Naboj: \(x - 6 = -4\), \(x = +2\): ferat(II).</p>` },
];
