"""Iz podatkov maturitetnih pol (api/data/matura*.json) naredi scenarij videov:
en video na nalogo (besedilo naloge, nato rešitev korak za korakom in rezultat).

python3 extract_matura.py <matura.json> <izhod.json> <predmet> <pola-id>
"""
import json, re, sys
from bs4 import BeautifulSoup

src, out, predmet, pola_id = sys.argv[1:5]
pole = json.load(open(src, encoding='utf-8'))
pola = next(p for p in pole if p['id'] == pola_id)

RAVEN = {'osnovna': 'osnovna raven', 'visja': 'višja raven'}
PRED = {'matematika': 'Matematika', 'fizika': 'Fizika', 'kemija': 'Kemija', 'slovenscina': 'Slovenščina',
        'anglescina': 'Angleščina', 'biologija': 'Biologija', 'informatika': 'Informatika'}
opis = ', '.join(x for x in [PRED.get(predmet, predmet.capitalize()), RAVEN.get(pola.get('raven'), pola.get('raven') or ''),
                             f"{pola.get('rok', '')} rok {pola.get('leto', '')}".strip(), f"pola {pola.get('stevilka', '')}"] if x)

bid = 0
def blok(kind, html, **kw):
    global bid
    bid += 1
    d = {'id': f'b{bid:04d}', 'kind': kind, 'html': html}
    d.update(kw)
    return d

def txtlen(html):
    t = BeautifulSoup(html, 'html.parser').get_text(' ')
    t = re.sub(r'\\[a-zA-Z]+', 'x', t)
    return len(re.sub(r'\s+', ' ', t).strip())

sklopi = []
for n in pola['naloge']:
    if not n.get('razlaga'):
        continue
    oznaka = n.get('oznaka') or f"Naloga {n['id']}"
    tocke = n.get('tocke')
    g = {'tip': 'naloga', 'oznaka': oznaka, 'naslov': '', 'stalni': [], 'bloki': []}
    if n.get('besedilo'):
        g['stalni'].append(blok('naloga', n['besedilo'], n=txtlen(n['besedilo'])))
    r = BeautifulSoup(n['razlaga'], 'html.parser')
    rok = r.select_one('.rokopis')
    koraki = rok.find_all(recursive=False) if rok else []
    if koraki:
        for k in koraki:
            g['bloki'].append(blok('rk', str(k), n=txtlen(str(k))))
    else:
        g['bloki'].append(blok('odstavek', n['razlaga'], n=txtlen(n['razlaga'])))
    if n.get('rezultat'):
        g['bloki'].append(blok('rezultat', n['rezultat'], n=txtlen(n['rezultat'])))
    def tt(t):
        return f'{t} točka' if t == 1 else f'{t} točki' if t == 2 else f'{t} točke' if t in (3, 4) else f'{t} točk'
    sklopi.append({'id': n['id'], 'num': oznaka, 'naslov': f'<small>({tt(tocke)})</small>' if tocke else '',
                   'podnaslov': 'Rešitev korak za korakom', 'eyebrow': opis,
                   'oznaka': f"{opis} · {n['id']}", 'skupine': [g]})

json.dump({'predmet': predmet, 'poglavje': opis, 'sklopi': sklopi}, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'{pola_id}: {len(sklopi)} nalog, {bid} blokov')
