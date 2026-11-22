// api/controllers/priprava.js
// Tedenska priprava na maturo (samo prijavljeni). Vsak teden dobi dijak nekaj snovi izbranih
// predmetov. Snov je opravljena, ko (1) predela razlago: prebere ali pogleda video vsaj 75 %
// sklopov, kar meri stran z razlago (components/branje.js), in (2) reši cilj nalog iz te snovi.
// Teden je opravljen, ko so do nedelje opravljene vse njegove snovi; zaporedni opravljeni
// tedni so niz.
import { snovi, naloge, matura, koledarMature } from "../data/index.js";
import Priprava from "../models/priprava.js";
import Branje from "../models/branje.js";
import Napredek from "../models/napredek.js";
import { opis } from "./napredek.js";
import {
  CILJ_NALOG, NAJVEC_TEMPO, imaRazlago, zgradbaStrani, povzetekBranja, pristejBranje,
  zacetekTedna, mejeTedna, pristejDni, izmenicno, tedniDoMature, priporocenTempo, casOpravljene, niz,
  ROKI, letoMature, maturaZa, polnocLj, danesLj,
} from "../utils/priprava.js";

// Snovi, ki imajo stran z razlago (samo te lahko dijak predela)
const snoviZRazlago = snovi.filter((s) => imaRazlago(s.predmet, s.slug));
const kljuc = (s) => `${s.predmet}/${s.slug}`;
const poKljucu = new Map(snoviZRazlago.map((s) => [kljuc(s), s]));
const PREDMETI = [...new Set(snoviZRazlago.map((s) => s.predmet))];

// Število nalog za vajo po snoveh (cilj ne more biti večji od števila nalog)
const steviloNalog = new Map();
for (const n of naloge) steviloNalog.set(`${n.predmet}/${n.poglavje}`, (steviloNalog.get(`${n.predmet}/${n.poglavje}`) ?? 0) + 1);
const imaMaturitetne = new Set();
for (const pola of matura) for (const n of pola.naloge ?? []) for (const p of [n.poglavje ?? []].flat()) imaMaturitetne.add(`${pola.predmet}/${p}`);
const ciljNalog = (s) => Math.min(CILJ_NALOG, (steviloNalog.get(kljuc(s)) ?? 0) || (imaMaturitetne.has(kljuc(s)) ? CILJ_NALOG : 0));

// Pri matematiki na osnovni ravni sklopi višje ravni ne štejejo
function zgradbaZa(uporabnik, predmet, slug) {
  const zgradba = zgradbaStrani(predmet, slug);
  if (/matematika$/.test(predmet) && uporabnik.ravenMatematike === "osnovna") return zgradba.filter((s) => !s.visja);
  return zgradba;
}

const nalogeUrl = (s) =>
  steviloNalog.get(kljuc(s))
    ? `/views/${s.predmet}/naloge/naloge.html?snov=${s.slug}&stanje=nereseno,neuspesno`
    : `/views/${s.predmet}/matura/po_snovi/naloge.html?poglavje=${s.slug}`;

// ------------------------------------------------------------
// Stanje vseh snovi za uporabnika: razlaga in časi prvih rešitev nalog
// ------------------------------------------------------------
async function stanjeSnovi(uporabnik) {
  const [branja, resene] = await Promise.all([
    Branje.find({ uporabnik: uporabnik._id }).select("predmet slug sklopi predelanoOb").lean(),
    Napredek.find({ uporabnik: uporabnik._id, reseno: true })
      .select("naloga vir predmet poglavje poglavja resenoOb zadnjiPoskus createdAt")
      .lean(),
  ]);
  const branjePo = new Map(branja.map((b) => [kljuc(b), b]));
  const reseneOb = new Map();
  for (const z of resene) {
    const o = opis(z);
    if (!o.predmet) continue;
    const cas = z.resenoOb ?? z.zadnjiPoskus ?? z.createdAt;
    for (const p of new Set(o.poglavja)) {
      const k = `${o.predmet}/${p}`;
      if (!reseneOb.has(k)) reseneOb.set(k, []);
      reseneOb.get(k).push(cas);
    }
  }
  return (s) => {
    const b = branjePo.get(kljuc(s));
    const branje = povzetekBranja(zgradbaZa(uporabnik, s.predmet, s.slug), b?.sklopi);
    const casi = reseneOb.get(kljuc(s)) ?? [];
    const cilj = ciljNalog(s);
    const opravljenaOb = casOpravljene({ predelanoOb: b?.predelanoOb, reseneOb: casi, cilj });
    return { branje, predelanoOb: b?.predelanoOb ?? null, reseneOb: casi, cilj, opravljenaOb };
  };
}

// Snovi za nov teden: najprej neopravljene iz prejšnjega tedna, nato po vrsti iz kataloga
function izberiSnovi(priprava, stanje, { ohrani = [], zacetek }) {
  const izbrane = [...ohrani];
  const zasedeno = new Set(izbrane.map(kljuc));
  const prejsnji = priprava.tedni.find((t) => t.zacetek === pristejDni(zacetek, -7));
  const kandidati = [
    ...(prejsnji?.snovi ?? []).filter((s) => priprava.predmeti.includes(s.predmet)),
    ...izmenicno(snoviZRazlago.filter((s) => priprava.predmeti.includes(s.predmet)), priprava.predmeti),
  ];
  for (const s of kandidati) {
    if (izbrane.length >= priprava.tempo) break;
    const snov = poKljucu.get(kljuc(s));
    if (!snov || zasedeno.has(kljuc(s)) || stanje(snov).opravljenaOb) continue;
    izbrane.push({ predmet: s.predmet, slug: s.slug });
    zasedeno.add(kljuc(s));
  }
  return izbrane;
}

function opisSnovi(s, st, meje) {
  const snov = poKljucu.get(kljuc(s));
  const vTednu = st.reseneOb.filter((d) => new Date(d) >= meje.od && new Date(d) < meje.do).length;
  return {
    predmet: s.predmet,
    slug: s.slug,
    stevilka: snov?.stevilka ?? null,
    naslov: snov?.naslov ?? s.slug,
    url: snov?.url ?? null,
    nalogeUrl: nalogeUrl(s),
    branje: { predelani: st.branje.predelani, potrebno: st.branje.potrebno, skupaj: st.branje.skupaj, predelano: st.branje.predelano },
    naloge: { reseno: Math.min(st.reseneOb.length, st.cilj), vTednu, cilj: st.cilj },
    opravljena: Boolean(st.opravljenaOb && st.opravljenaOb < meje.do),
    opravljenaOb: st.opravljenaOb,
  };
}

function tedenOpravljen(teden, stanje) {
  const meje = mejeTedna(teden.zacetek);
  if (!teden.snovi.length) return false;
  return teden.snovi.every((s) => {
    const snov = poKljucu.get(kljuc(s));
    const ob = snov && stanje(snov).opravljenaOb;
    return ob && ob < meje.do;
  });
}

async function odgovor(req, res, priprava, stanje) {
  const zdaj = new Date();
  const trenutni = zacetekTedna(zdaj);
  const izbrani = snoviZRazlago.filter((s) => priprava.predmeti.includes(s.predmet));
  const preostale = izbrani.filter((s) => !stanje(s).opravljenaOb).length;
  const leto = letoMature(req.uporabnik, zdaj);
  const maturaUradno = maturaZa(koledarMature, { predmeti: priprava.predmeti, leto, rok: priprava.rok ?? "spomladanski" });
  // Uradni datum (RIC) ima prednost; ročni datum le, če za to leto podatkov še ni
  const tedni = tedniDoMature(trenutni, maturaUradno ? polnocLj(maturaUradno.zacetek) : priprava.datumMature);
  const teden = priprava.tedni.find((t) => t.zacetek === trenutni);
  const meje = mejeTedna(trenutni);
  const vsiTedni = priprava.tedni.map((t) => ({ zacetek: t.zacetek, opravljen: tedenOpravljen(t, stanje) }));

  res.status(200).json({
    nastavitve: { predmeti: priprava.predmeti, tempo: priprava.tempo, rok: priprava.rok ?? "spomladanski", datumMature: priprava.datumMature ?? null },
    danes: danesLj(zdaj),
    leto,
    matura: maturaUradno,
    zacetekNacrta: priprava.tedni.map((t) => t.zacetek).sort()[0] ?? trenutni,
    vsiPredmeti: PREDMETI,
    teden: {
      zacetek: trenutni,
      konec: pristejDni(trenutni, 6),
      preostaloDni: Math.max(0, Math.ceil((meje.do - zdaj) / 86_400_000)),
      snovi: (teden?.snovi ?? []).map((s) => opisSnovi(s, stanje(poKljucu.get(kljuc(s)) ?? s), meje)),
      opravljen: vsiTedni.find((t) => t.zacetek === trenutni)?.opravljen ?? false,
    },
    niz: niz(vsiTedni, trenutni),
    zgodovina: vsiTedni.filter((t) => t.zacetek < trenutni).sort((a, b) => b.zacetek.localeCompare(a.zacetek)).slice(0, 12),
    skupno: { opravljene: izbrani.length - preostale, vse: izbrani.length },
    tedniDoMature: tedni,
    priporocenTempo: priporocenTempo(preostale, tedni),
    // za zamenjavo snovi: neopravljene snovi izbranih predmetov, ki niso v tem tednu
    drugeSnovi: izbrani
      .filter((s) => !stanje(s).opravljenaOb && !(teden?.snovi ?? []).some((t) => kljuc(t) === kljuc(s)))
      .map((s) => ({ predmet: s.predmet, slug: s.slug, stevilka: s.stevilka, naslov: s.naslov })),
  });
}

function privzetDatumMature(uporabnik) {
  const zdaj = new Date();
  // Spomladanski rok splošne mature se začne v začetku maja
  const leto = uporabnik.letoMature ?? (zdaj.getMonth() >= 5 ? zdaj.getFullYear() + 1 : zdaj.getFullYear());
  return `${leto}-05-01`;
}

// GET /api/priprava
const pripravaGet = async (req, res) => {
  const priprava = await Priprava.findOne({ uporabnik: req.uporabnik._id });
  if (!priprava || !priprava.predmeti.length) {
    return res.status(200).json({
      nastavitve: null,
      predmeti: PREDMETI,
      privzeto: { datumMature: privzetDatumMature(req.uporabnik), predmeti: ["matematika"], rok: "spomladanski" },
      leto: letoMature(req.uporabnik),
      imaKoledar: Boolean(koledarMature[letoMature(req.uporabnik)]),
    });
  }
  const stanje = await stanjeSnovi(req.uporabnik);
  const trenutni = zacetekTedna();
  if (!priprava.tedni.some((t) => t.zacetek === trenutni)) {
    priprava.tedni.push({ zacetek: trenutni, snovi: izberiSnovi(priprava, stanje, { zacetek: trenutni }) });
    await priprava.save();
  }
  await odgovor(req, res, priprava, stanje);
};

const jeDatum = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));

// PUT /api/priprava { predmeti: [..], tempo: 1–5, rok: "spomladanski" | "jesenski", datumMature: "YYYY-MM-DD" }
// datumMature je potreben le, če za leto mature še ni uradnega koledarja (data/koledar-mature.json)
const pripravaPut = async (req, res) => {
  const { predmeti, tempo, datumMature, rok } = req.body ?? {};
  if (!Array.isArray(predmeti) || !predmeti.length || predmeti.some((p) => !PREDMETI.includes(p)))
    return res.status(400).json({ message: "Izberi vsaj en predmet." });
  if (!Number.isInteger(tempo) || tempo < 1 || tempo > NAJVEC_TEMPO)
    return res.status(400).json({ message: `Tempo je od 1 do ${NAJVEC_TEMPO} snovi na teden.` });
  if (datumMature != null && datumMature !== "" && !jeDatum(datumMature))
    return res.status(400).json({ message: "Datum mature ni veljaven." });
  if (rok != null && !ROKI.includes(rok))
    return res.status(400).json({ message: "Rok mature je spomladanski ali jesenski." });

  const priprava = (await Priprava.findOne({ uporabnik: req.uporabnik._id })) ?? new Priprava({ uporabnik: req.uporabnik._id });
  priprava.predmeti = [...new Set(predmeti)];
  priprava.tempo = tempo;
  if (rok) priprava.rok = rok;
  if (datumMature !== undefined) priprava.datumMature = datumMature ? new Date(`${datumMature}T00:00:00Z`) : undefined;

  // Ta teden sestavi znova: snovi, ki jih je ta teden že opravil ali začel, ostanejo
  const stanje = await stanjeSnovi(req.uporabnik);
  const trenutni = zacetekTedna();
  const meje = mejeTedna(trenutni);
  const teden = priprava.tedni.find((t) => t.zacetek === trenutni);
  const ohrani = (teden?.snovi ?? []).filter((s) => {
    const snov = poKljucu.get(kljuc(s));
    if (!snov || !priprava.predmeti.includes(s.predmet)) return false;
    const st = stanje(snov);
    return (st.opravljenaOb && st.opravljenaOb >= meje.od) || st.branje.predelani > 0;
  }).slice(0, priprava.tempo);
  const nove = izberiSnovi(priprava, stanje, { ohrani, zacetek: trenutni });
  if (teden) teden.snovi = nove;
  else priprava.tedni.push({ zacetek: trenutni, snovi: nove });
  await priprava.save();
  await odgovor(req, res, priprava, stanje);
};

// POST /api/priprava/zamenjaj { iz: "matematika/mnozice", v: "matematika/funkcije" }
const pripravaZamenjaj = async (req, res) => {
  const { iz, v } = req.body ?? {};
  const priprava = await Priprava.findOne({ uporabnik: req.uporabnik._id });
  const teden = priprava?.tedni.find((t) => t.zacetek === zacetekTedna());
  if (!teden) return res.status(404).json({ message: "Načrta za ta teden ni." });
  const i = teden.snovi.findIndex((s) => kljuc(s) === iz);
  const nova = poKljucu.get(String(v));
  if (i < 0 || !nova || !priprava.predmeti.includes(nova.predmet) || teden.snovi.some((s) => kljuc(s) === v))
    return res.status(400).json({ message: "Te snovi ni mogoče zamenjati." });
  teden.snovi.splice(i, 1, { predmet: nova.predmet, slug: nova.slug });
  await priprava.save();
  await odgovor(req, res, priprava, await stanjeSnovi(req.uporabnik));
};

// ------------------------------------------------------------
// Branje razlage (components/branje.js na straneh z razlago)
// ------------------------------------------------------------
function snovIzZahteve(src) {
  const predmet = String(src?.predmet ?? "");
  const slug = String(src?.slug ?? "");
  return poKljucu.get(`${predmet}/${slug}`) ?? null;
}

const odgovorBranja = (uporabnik, snov, b) => ({
  predmet: snov.predmet,
  slug: snov.slug,
  ...povzetekBranja(zgradbaZa(uporabnik, snov.predmet, snov.slug), b?.sklopi),
  predelanoOb: b?.predelanoOb ?? null,
});

// GET /api/priprava/branje?predmet=matematika&slug=mnozice
const branjeGet = async (req, res) => {
  const snov = snovIzZahteve(req.query);
  if (!snov) return res.status(404).json({ message: "Snov nima razlage." });
  const b = await Branje.findOne({ uporabnik: req.uporabnik._id, predmet: snov.predmet, slug: snov.slug }).lean();
  res.status(200).json(odgovorBranja(req.uporabnik, snov, b));
};

// POST /api/priprava/branje { predmet, slug, sklopi: [{ id, cas, video, trajanje }] }  (prirastki v s)
const branjePost = async (req, res) => {
  const snov = snovIzZahteve(req.body);
  if (!snov) return res.status(404).json({ message: "Snov nima razlage." });
  const zdaj = new Date();
  const pogoj = { uporabnik: req.uporabnik._id, predmet: snov.predmet, slug: snov.slug };
  const b = (await Branje.findOne(pogoj)) ?? new Branje(pogoj);
  const sekundOdZadnjega = b.zadnjaPosodobitev ? (zdaj - b.zadnjaPosodobitev) / 1000 : undefined;
  b.sklopi = pristejBranje(b.sklopi, req.body.sklopi, { zgradba: zgradbaStrani(snov.predmet, snov.slug), sekundOdZadnjega });
  b.zadnjaPosodobitev = zdaj;
  const povzetek = povzetekBranja(zgradbaZa(req.uporabnik, snov.predmet, snov.slug), b.sklopi);
  if (povzetek.predelano && !b.predelanoOb) b.predelanoOb = zdaj;
  try {
    await b.save();
  } catch (napaka) {
    // Dve sočasni prvi poročili: drugo naj poskusi znova ob naslednjem poročilu
    if (napaka?.code !== 11000) throw napaka;
  }
  res.status(200).json(odgovorBranja(req.uporabnik, snov, b));
};

export default { pripravaGet, pripravaPut, pripravaZamenjaj, branjeGet, branjePost };
