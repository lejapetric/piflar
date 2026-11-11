import { izbira } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";

const FRAZE = [["Dear Sir or Madam,", "formalno"], ["Hi Tom!", "neformalno"], ["I am writing to enquire about…", "formalno"], ["Thanks for your email!", "neformalno"], ["I look forward to hearing from you.", "formalno"], ["Can't wait to see you!", "neformalno"], ["Yours faithfully,", "formalno"], ["Love,", "neformalno"], ["I would be grateful if you could…", "formalno"], ["Guess what!", "neformalno"], ["Please find attached…", "formalno"], ["Write soon!", "neformalno"], ["I am writing to complain about…", "formalno"], ["Take care,", "neformalno"]];

export default function ({ serija, pojmi }) {
  serija("register", 16, (r) => {
    const [f, reg] = r.izberi(FRAZE);
    return izbira({ r, tezavnost: 1, besedilo: `Ali je fraza <em>${f}</em> formalna ali neformalna?`, pravilna: reg, napacne: [reg === "formalno" ? "neformalno" : "formalno"], postopek: `<p><em>${f}</em> – ${reg}.</p>` });
  });
  serija("vrsta", 10, (r) => {
    const [n, odg] = r.izberi([["Opiši šolski izlet za šolsko spletno stran.", "article (članek)"], ["Pritoži se hotelu zaradi slabe storitve.", "formal letter of complaint"], ["Povabi prijatelja na rojstni dan.", "informal email"], ["Ravnatelju poročaj o rezultatih ankete med dijaki.", "report (poročilo)"], ["Prijavi se na počitniško delo.", "letter of application"], ["Zahvali se gostiteljski družini po izmenjavi.", "informal letter of thanks"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Katero besedilno vrsto zahteva naloga: ${n}`, pravilna: odg, napacne: r.premesaj(["article (članek)", "formal letter of complaint", "informal email", "report (poročilo)", "letter of application", "informal letter of thanks"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg}.</p>` });
  });
  vrzeli(serija, "fraze", [
    ["Dear Mr Smith, … Yours ___,", "sincerely", ["faithfully", "lovely", "truly yours"], "Če naslovnika poznamo po imenu: Yours sincerely.", 3],
    ["Dear Sir or Madam, … Yours ___,", "faithfully", ["sincerely", "lovely", "friendly"], "Če naslovnika ne poznamo po imenu: Yours faithfully.", 3],
    ["I am writing ___ apply for the position of tour guide.", "to", ["for", "that", "about"], "I am writing to + infinitive.", 1],
    ["I would be grateful ___ you could send me more information.", "if", ["that", "when", "for"], "I would be grateful if you could…", 2],
    ["I am writing ___ your advertisement in Monday's newspaper.", "regarding", ["regard", "regards", "regarded"], "Regarding = v zvezi z.", 4, "visja"],
    ["This report ___ to present the results of the survey.", "aims", ["aim", "is aim", "aiming"], "The aim of this report is … / This report aims to …", 4, "visja"],
    ["Please do not hesitate ___ contact me.", "to", ["for", "and", "of"], "Do not hesitate to contact me.", 2],
    ["I look forward to ___ from you.", "hearing", ["hear", "heard", "be hearing"], "Look forward to + -ing.", 2],
    ["Thank you ___ your prompt reply.", "for", ["to", "about", "of"], "Thank you for.", 1],
    ["I am afraid I must ___ about the noise in my room.", "complain", ["complaint", "complaining", "complained"], "Complain about.", 2],
    ["In ___, I would recommend that the school buys more computers.", "conclusion", ["conclude", "concluding", "conclusive"], "In conclusion.", 2],
    ["I would ___ it if you replied by Friday.", "appreciate", ["appreciation", "appreciating", "be appreciate"], "I would appreciate it if…", 4, "visja"],
  ]);
  pojmi([
    ["register", "Stopnja formalnosti jezika, prilagojena naslovniku."],
    ["iztočnica", "Navodilo s točkami, ki jih mora sestavek razviti."],
    ["formalno pismo", "Pismo ustanovi ali neznani osebi z ustaljenimi vljudnostnimi frazami."],
    ["neformalno e-sporočilo", "Sproščeno sporočilo prijatelju s pogovornimi izrazi."],
    ["poročilo (report)", "Pregledno besedilo z naslovi in priporočili za nadrejenega."],
    ["članek (article)", "Besedilo za časopis ali spletno stran z zanimivim naslovom in nagovorom bralca."],
  ]);
}
