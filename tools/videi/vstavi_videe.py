"""Vstavi video razlage v strani z razlago snovi.

Za vsak sklop (<section class="sklop" id="sklop-N">), ki ima v public/videi/<pot>/
datoteki sklop-N-svetla.mp4 in sklop-N-temna.mp4, doda predvajalnik takoj pod glavo
sklopa. Stran pokaže različico z belo tablo v svetlem in z zeleno tablo v temnem načinu.
Skripto lahko poganjaš večkrat: obstoječe predvajalnike zamenja.

python3 tools/videi/vstavi_videe.py public/views/matematika/snov/vektorji_ravnina_prostor/vektorji_ravnina_prostor_razlaga.html matematika/vektorji_ravnina_prostor
"""
import os, re, sys

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
html_path, pot = sys.argv[1], sys.argv[2]
html = open(html_path, encoding='utf-8').read()

# odstrani stare predvajalnike
html = re.sub(r'\n?\s*<div class="sklop-video">.*?</div><!-- /sklop-video -->', '', html, flags=re.S)

n = 0
def vstavi(m):
    global n
    sid = m.group(1)
    vid = os.path.join(ROOT, 'public', 'videi', pot)
    if not all(os.path.exists(os.path.join(vid, f'{sid}-{t}.mp4')) for t in ('svetla', 'temna')):
        return m.group(0)
    n += 1
    url = f'/videi/{pot}/{sid}'
    blok = (f'\n          <div class="sklop-video">'
            f'<span class="sklop-video-oznaka">Video razlaga</span>'
            f'<video class="video-svetla" controls preload="none" playsinline data-poster="{url}-svetla.jpg" src="{url}-svetla.mp4"></video>'
            f'<video class="video-temna" controls preload="none" playsinline data-poster="{url}-temna.jpg" src="{url}-temna.mp4"></video>'
            f'</div><!-- /sklop-video -->')
    return m.group(0) + blok

html = re.sub(r'<section class="sklop[^"]*" id="(sklop-[\w-]+)">\s*<header class="sklop-header">.*?</header>', vstavi, html, flags=re.S)
open(html_path, 'w', encoding='utf-8').write(html)
print(f'{html_path}: {n} videov')
