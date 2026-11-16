"""Iz strani z razlago (…_razlaga.html) naredi scenarij videov: en video na sklop.

python3 extract.py <pot/do/razlaga.html> <izhod.json> <predmet>
"""
import json, re, sys
from bs4 import BeautifulSoup, NavigableString

src, out, predmet = sys.argv[1], sys.argv[2], sys.argv[3]
soup = BeautifulSoup(open(src, encoding='utf-8').read(), 'html.parser')
naslov = soup.title.get_text().split('—')[0].split('|')[0].strip() if soup.title else ''

bid = 0
def blok(kind, html, **kw):
    global bid
    bid += 1
    d = {'id': f'b{bid:04d}', 'kind': kind, 'html': html}
    d.update(kw)
    return d

def txtlen(html):
    t = BeautifulSoup(html, 'html.parser').get_text(' ')
    t = re.sub(r'\\[a-zA-Z]+', 'x', t)  # LaTeX ukazi štejejo kot en znak
    return len(re.sub(r'\s+', ' ', t).strip())

def inner(el):
    return ''.join(str(c) for c in el.contents)

def figure_blocks(el):
    """figure ali slike-vrsta -> seznam blokov s slikami"""
    figs = [el] if el.name == 'figure' else el.find_all('figure')
    return [blok('slika', str(f)) for f in figs]

sklopi = []
for sec in soup.select('section.sklop'):
    hdr = sec.select_one('.sklop-header')
    num = hdr.select_one('.sklop-num').get_text(strip=True) if hdr.select_one('.sklop-num') else ''
    h2 = hdr.find('h2').get_text(' ', strip=True) if hdr.find('h2') else ''
    sub = hdr.find('p').get_text(' ', strip=True) if hdr.find('p') else ''
    skupine = []   # vsaka skupina: {'tip':'razlaga'|'naloga', 'oznaka', 'naslov', 'stalni': [bloki], 'bloki': [...]}

    teo = sec.select_one('.sklop-teorija')
    cur = None
    def nova(naslov_):
        g = {'tip': 'razlaga', 'oznaka': 'Razlaga', 'naslov': naslov_, 'stalni': [], 'bloki': []}
        skupine.append(g)
        return g
    if teo:
        for ch in teo.find_all(recursive=False):
            if ch.name == 'h3':
                continue
            if ch.name == 'h4':
                cur = nova(ch.get_text(' ', strip=True)); continue
            if cur is None:
                cur = nova('')
            cls = ch.get('class', [])
            if ch.name in ('ul', 'ol'):
                for i, li in enumerate(ch.find_all('li', recursive=False)):
                    znak = f'{i + 1}.' if ch.name == 'ol' else '•'
                    cur['bloki'].append(blok('tocka', inner(li), znak=znak, n=txtlen(inner(li))))
            elif ch.name == 'p':
                cur['bloki'].append(blok('odstavek', inner(ch), n=txtlen(inner(ch))))
            elif ch.name == 'figure' or 'slike-vrsta' in cls:
                cur['bloki'] += figure_blocks(ch)
            elif 'concept-list' in cls:
                for c in ch.select('.concept'):
                    cur['bloki'].append(blok('html', str(c), wrap='concept', n=txtlen(str(c))))
            elif 'formula-grid' in cls:
                cur['bloki'].append(blok('html', str(ch), n=txtlen(str(ch))))
            else:
                cur['bloki'].append(blok('html', str(ch), n=txtlen(str(ch))))

    nal = sec.select_one('.sklop-naloge')
    if nal:
        for tip in nal.select('.tip-naloge'):
            h4 = tip.find('h4')
            g = {'tip': 'naloga', 'oznaka': h4.get_text(' ', strip=True).split(':')[0] if h4 else 'Naloga',
                 'naslov': h4.get_text(' ', strip=True) if h4 else '', 'stalni': [], 'bloki': []}
            tn = tip.select_one('.tip-naloga')
            if tn:
                p = ''.join(str(x) for x in tn.contents if not (getattr(x, 'get', None) and 'tip-naloga-oznaka' in (x.get('class') or [])))
                g['stalni'].append(blok('naloga', p, n=txtlen(p)))
            pr = tip.select_one('.prepoznaj > p')
            if pr:
                g['bloki'].append(blok('prepoznaj', inner(pr), n=txtlen(inner(pr))))
            ol = tip.select_one('ol.postopek')
            if ol:
                for i, li in enumerate(ol.find_all('li', recursive=False)):
                    k = li.select_one('.korak')
                    nn = li.select_one('.na-nalogi')
                    h = (f'<p class="korak">{inner(k)}</p>' if k else '') + (f'<div class="na-nalogi">{inner(nn)}</div>' if nn else '')
                    g['bloki'].append(blok('korak', h, znak=str(i + 1), n=txtlen(h)))
            for pz in tip.find_all('div', class_='pazi', recursive=False):
                g['bloki'].append(blok('pazi', inner(pz), n=txtlen(inner(pz))))
            skupine.append(g)
    sklopi.append({'id': sec.get('id'), 'num': num, 'naslov': h2, 'podnaslov': sub, 'skupine': skupine})

json.dump({'predmet': predmet, 'poglavje': naslov, 'sklopi': sklopi}, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'{src}: {len(sklopi)} sklopov, {bid} blokov')
