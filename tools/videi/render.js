// node render.js work/<slug>.json <tema: svetla|temna> <izhodna mapa>
// Vsak blok scenarija izriše kot prozoren PNG (KaTeX + pisave), zapiše velikosti v sizes.json.
const fs = require('fs'), path = require('path');
const katex = require('katex');
const { chromium } = require('playwright');

const [, , jsonPath, tema, outDir] = process.argv;
const S = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
fs.mkdirSync(outDir, { recursive: true });
const W = 1280, H = 720;
const CW = 1140; // širina vsebine

const unesc = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
function tex(html) {
  const r = (src, display) => {
    try { return katex.renderToString(unesc(src), { displayMode: display, throwOnError: false, strict: false }); }
    catch (e) { return src; }
  };
  return html
    .replace(/\\\[([\s\S]+?)\\\]/g, (m, a) => r(a, true))
    .replace(/\$\$([\s\S]+?)\$\$/g, (m, a) => r(a, true))
    .replace(/\\\(([\s\S]+?)\\\)/g, (m, a) => r(a, false));
}

const T = tema === 'temna'
  ? { tabla: '#1F2C26', okvir: '#6B4E33', polica: '#523B26', bg: '#0B0D0C', mazilo: 'rgba(255,255,255,0.045)',
      text: '#F4F1E6', sec: '#C9CEC6', muted: '#8E978F', red: '#F3B3A2', blue: '#A9C2FF', green: '#9EE0B8', yel: '#F5D58A',
      line: 'rgba(244,241,230,0.35)', fill: 'rgba(244,241,230,0.06)', polUrl: fs.readFileSync(__dirname + '/polica_temna.txt', 'utf8').trim(), polH: 44 }
  : { tabla: '#FFFFFF', okvir: '#C7CACE', polica: '#B9BCC1', bg: '#E6E2D9', mazilo: 'rgba(22,24,27,0.035)',
      text: '#16181B', sec: '#4C5056', muted: '#8A8E95', red: '#D2382B', blue: '#1F3FBF', green: '#12805C', yel: '#C27803',
      line: 'rgba(22,24,27,0.25)', fill: 'rgba(31,63,191,0.04)', polUrl: fs.readFileSync(__dirname + '/polica_svetla.txt', 'utf8').trim(), polH: 34 };

const F = 'file://' + path.join(__dirname, 'fonts');
const css = `
@font-face{font-family:Kalam;src:url(${F}/Kalam-400.ttf);font-weight:400}
@font-face{font-family:Kalam;src:url(${F}/Kalam-700.ttf);font-weight:700}
@font-face{font-family:Figtree;src:url(${F}/figtree-latin-800-normal.woff2);font-weight:800}
@font-face{font-family:Figtree;src:url(${F}/figtree-latin-ext-800-normal.woff2);font-weight:800;unicode-range:U+0100-024F}
@font-face{font-family:Figtree;src:url(${F}/figtree-latin-400-normal.woff2);font-weight:400}
@font-face{font-family:Figtree;src:url(${F}/figtree-latin-ext-400-normal.woff2);font-weight:400;unicode-range:U+0100-024F}
html,body{margin:0;background:transparent}
body{font-family:Kalam,cursive;color:${T.text};font-size:25px;line-height:1.42}
.blk{position:absolute;left:0;top:0;width:${CW}px;padding:4px 6px}
.blk p{margin:0 0 6px}
.blk strong,.blk b{color:${T.red};font-weight:700}
.blk em{color:${T.yel};font-style:normal}
.katex{font-size:1.02em;color:inherit}
.tocka{display:flex;gap:12px}.tocka .zn{color:${T.red};font-weight:700;min-width:22px}
.odstavek{}
.prepoznaj{color:${T.sec};font-size:22px}
.prepoznaj strong{color:${T.blue}}
.naloga{border-left:4px solid ${T.blue};padding:2px 0 2px 16px;font-size:24px}
.naloga .lbl{font-family:Figtree;font-weight:800;font-size:15px;letter-spacing:.08em;text-transform:uppercase;color:${T.blue};display:block;margin-bottom:2px}
.korak{display:flex;gap:16px}
.korak .st{flex:0 0 38px;height:38px;border-radius:50%;border:2.5px solid ${T.red};color:${T.red};font-weight:700;display:flex;align-items:center;justify-content:center;font-size:22px;margin-top:2px}
.korak p.korak{display:block;color:${T.sec};font-size:22px;margin:0 0 4px}
.korak .na-nalogi{font-size:25px}
.korak .na-nalogi p{margin:0 0 4px}
.pazi{border:2.5px solid ${T.red};border-radius:10px;padding:8px 16px;font-size:23px}
.formula-card{border:2px solid ${T.line};border-radius:10px;padding:8px 16px;margin:4px 0;background:${T.fill}}
.formula-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.concept{border:2px solid ${T.line};border-radius:10px;padding:8px 16px}
.concept h4{margin:0;color:${T.blue};font-size:26px}
.concept-formula{margin:2px 0 4px}
.concept-desc{font-size:22px}
table{border-collapse:collapse;font-size:21px;line-height:1.3}
th{color:${T.blue};text-align:left;font-weight:700;border-bottom:2px solid ${T.line};padding:4px 14px}
td{border-bottom:1px solid ${T.line};padding:4px 14px;vertical-align:top}
.kljucne,.prepoznaj ul{display:none}
.slika{margin:0;display:inline-block;text-align:center}
.slika figcaption{font-size:19px;color:${T.sec};max-width:520px;margin:4px auto 0;line-height:1.3}
.slika svg{display:block;margin:0 auto}
.slika text{font-family:Kalam;font-size:14px;fill:${T.text};paint-order:stroke;stroke:${T.tabla};stroke-width:3px;stroke-linejoin:round}
.slika .s-mreza{stroke:${T.line};stroke-width:.6;opacity:.5}
.slika .s-os{stroke:${T.sec};stroke-width:1.4;fill:none}
.slika .s-os-txt,.slika .s-txt-muted{fill:${T.sec};font-size:12px}
.slika .s-k1{stroke:${T.blue};stroke-width:2.6;fill:none;stroke-linecap:round;stroke-linejoin:round}
.slika .s-k2{stroke:${T.red};stroke-width:2.4;fill:none;stroke-linecap:round;stroke-linejoin:round}
.slika .s-k3{stroke:${T.green};stroke-width:2.4;fill:none;stroke-linecap:round;stroke-linejoin:round}
.slika .s-k4{stroke:${T.yel};stroke-width:2.4;fill:none;stroke-linecap:round;stroke-linejoin:round}
.slika .s-pom{stroke:${T.sec};stroke-width:1.3;stroke-dasharray:5 4;fill:none;opacity:.8}
.slika .s-crtkano{stroke-dasharray:7 5;opacity:.75}
.slika .s-kot{fill:none;stroke:${T.yel};stroke-width:1.6}
.slika .s-kot-2{fill:none;stroke:${T.green};stroke-width:1.6}
.slika .s-kot-3{fill:none;stroke:${T.blue};stroke-width:1.6}
.slika .s-kot-4{fill:none;stroke:${T.red};stroke-width:1.6}
.slika .s-asim{stroke:${T.red};stroke-width:1.4;stroke-dasharray:7 5;fill:none}
.slika .s-tocka{fill:${T.blue};stroke:${T.tabla};stroke-width:1.5}
.slika .s-tocka-2{fill:${T.red};stroke:${T.tabla};stroke-width:1.5}
.slika .s-prazna{fill:${T.tabla};stroke:${T.blue};stroke-width:2}
.slika .s-ploskev{fill:${T.blue};fill-opacity:.18;stroke:none}
.slika .s-ploskev-2{fill:${T.red};fill-opacity:.16;stroke:none}
.slika .s-lik{fill:${T.blue};fill-opacity:.08;stroke:${T.blue};stroke-width:2;stroke-linejoin:round}
.slika .s-lik-2{fill:${T.green};fill-opacity:.08;stroke:${T.green};stroke-width:2;stroke-linejoin:round}
.slika .s-crta{stroke:${T.text};stroke-width:1.6;fill:none}
.slika .s-txt-k1{fill:${T.blue};font-weight:700}
.slika .s-txt-k2{fill:${T.red};font-weight:700}
.slika .s-txt-k3{fill:${T.green};font-weight:700}
.slika .s-txt-k4{fill:${T.yel};font-weight:700}
.slika .s-txt-b{font-weight:700}
.slika .s-stolpec{fill:${T.blue};fill-opacity:.35;stroke:${T.blue}}
.slika .s-pou1{fill:${T.blue};fill-opacity:.3;stroke:${T.blue};stroke-width:.8}
.slika .s-pou2{fill:${T.green};fill-opacity:.3;stroke:${T.green};stroke-width:.8}
marker[id$="-k1"] path{fill:${T.blue}}marker[id$="-k2"] path{fill:${T.red}}marker[id$="-k3"] path{fill:${T.green}}marker[id$="-k4"] path{fill:${T.yel}}marker[id$="-p"] path{fill:${T.sec}}marker[id$="-crn"] path{fill:${T.text}}
/* posebni bloki */
.oznaka{font-family:Kalam;font-weight:700;color:${T.red};font-size:24px;white-space:nowrap;transform:rotate(-1deg)}
.chip{font-family:Figtree;font-weight:800;font-size:15px;letter-spacing:.06em;text-transform:uppercase;color:${T.tabla};background:${T.text};border-radius:999px;padding:6px 14px;white-space:nowrap}
.podnaslov{font-family:Kalam;font-weight:700;color:${T.blue};font-size:30px;line-height:1.15}
.naslov-video{width:1000px}
.naslov-video .eb{font-family:Kalam;font-weight:700;color:${T.red};font-size:26px;transform:rotate(-1.5deg);display:inline-block}
.naslov-video h1{font-family:Figtree;font-weight:800;font-size:56px;line-height:1.02;letter-spacing:-.04em;margin:12px 0 14px}
.naslov-video h1 .st{color:${T.red}}
.naslov-video p{font-family:Figtree;font-weight:400;font-size:22px;color:${T.sec};margin:0;line-height:1.35}
#bg{position:absolute;left:0;top:0;width:${W}px;height:${H}px;background:${T.bg};overflow:hidden}
#bg .tabla{position:absolute;left:24px;top:16px;width:${W - 48 - 24}px;height:${H - 16 - 58 - 24}px;border:12px solid ${T.okvir};border-radius:6px;
 background-color:${T.tabla};background-image:radial-gradient(ellipse at 72% 28%,${T.mazilo},transparent 45%),radial-gradient(ellipse at 18% 85%,${T.mazilo},transparent 40%);
 box-shadow:inset 0 0 140px ${T.mazilo},0 16px 0 -2px ${T.polica},0 40px 50px -30px rgba(0,0,0,.45)}
#bg .tabla::before{content:"";position:absolute;right:70px;bottom:${tema === 'temna' ? -30 : -26}px;width:396px;height:${Math.round(T.polH * 1.2)}px;
 background:${T.polUrl} no-repeat center/contain;filter:drop-shadow(0 3px 2px rgba(0,0,0,.25));z-index:2}
`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const katexCss = 'file://' + require.resolve('katex/dist/katex.min.css');
  const pageFile = path.resolve(outDir, '_stran.html');
  fs.writeFileSync(pageFile, `<!doctype html><html data-theme="${tema === 'temna' ? 'dark' : 'light'}"><head><meta charset="utf-8"><link rel="stylesheet" href="${katexCss}"><style>${css}</style></head><body><div id="root"></div></body></html>`);
  await page.goto('file://' + pageFile);
  await page.waitForLoadState('networkidle');
  const sizes = {};
  async function shot(id, html, opts = {}) {
    await page.evaluate(([h, w]) => {
      const r = document.getElementById('root');
      r.innerHTML = `<div class="blk" id="cur" style="${w ? 'width:' + w + 'px' : 'width:auto;display:inline-block'}">${h}</div>`;
    }, [html, opts.w === undefined ? CW : opts.w]);
    await page.evaluate(() => document.fonts.ready);
    const el = await page.$('#cur');
    const file = path.join(outDir, id + '.png');
    await el.screenshot({ path: file, omitBackground: true });
    const bb = await el.boundingBox();
    sizes[id] = [Math.round(bb.width), Math.round(bb.height)];
  }
  // ozadje
  await page.setViewportSize({ width: W, height: H });
  await page.evaluate(() => { document.getElementById('root').innerHTML = '<div id="bg"><div class="tabla"></div></div>'; });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, 'ozadje.png') });

  for (const s of S.sklopi) {
    await shot(s.id + '-naslov', `<div class="naslov-video"><span class="eb">${S.poglavje}</span><h1><span class="st">${s.num}</span> ${tex(s.naslov)}</h1><p>${tex(s.podnaslov)}</p></div>`, { w: 1000 });
    await shot(s.id + '-oznaka', `<div class="oznaka">${s.num} · ${tex(s.naslov)}</div>`, { w: 0 });
    for (const [gi, g] of s.skupine.entries()) {
      await shot(`${s.id}-g${gi}-chip`, `<div class="chip">${g.oznaka}</div>`, { w: 0 });
      if (g.naslov) await shot(`${s.id}-g${gi}-pod`, `<div class="podnaslov">${tex(g.naslov)}</div>`);
      for (const b of [...g.stalni, ...g.bloki]) {
        let h = tex(b.html);
        if (b.kind === 'tocka') h = `<div class="tocka"><span class="zn">${b.znak}</span><div>${h}</div></div>`;
        else if (b.kind === 'odstavek') h = `<div class="odstavek">${h}</div>`;
        else if (b.kind === 'prepoznaj') h = `<div class="prepoznaj">${h}</div>`;
        else if (b.kind === 'naloga') h = `<div class="naloga"><span class="lbl">Naloga</span>${h}</div>`;
        else if (b.kind === 'korak') h = `<div class="korak"><span class="st">${b.znak}</span><div>${h}</div></div>`;
        else if (b.kind === 'pazi') h = `<div class="pazi">${h}</div>`;
        else if (b.kind === 'html' && b.wrap === 'concept') h = `<div class="concept-list">${h}</div>`;
        if (b.kind === 'slika') {
          // slike povečamo: viewBox širino * 1.5, največ 560 px
          h = h.replace(/<svg([^>]*?)viewBox="0 0 ([\d.]+) ([\d.]+)"/, (m, a, w_, h_) => {
            let k = Math.min(900 / w_, 320 / h_, 2.0);
            return `<svg${a} width="${Math.round(w_ * k)}" height="${Math.round(h_ * k)}" viewBox="0 0 ${w_} ${h_}"`;
          });
          await shot(b.id, h, { w: 0 });
        } else {
          await shot(b.id, h);
        }
      }
    }
  }
  fs.writeFileSync(path.join(outDir, 'sizes.json'), JSON.stringify(sizes));
  await browser.close();
  console.log(jsonPath, tema, Object.keys(sizes).length, 'blokov');
})();
