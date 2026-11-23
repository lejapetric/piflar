"""Doda predvajalnike videov sklopom razlag poklicne mature, ki nimajo videa splošne mature.

Sklopi, prevzeti iz razlag splošne mature, že nosijo predvajalnik z videom splošne mature.
Za lastne sklope poklicne mature (public/videi/poklicna_<predmet>/<slug>/sklop-N-{svetla,temna}.mp4)
doda predvajalnik pod glavo sklopa; obstoječih ne spreminja.

python3 tools/poklicna/videi_pm.py <pot do razlaga.html> poklicna_kemija/<slug>
"""
import os
import re
import sys

KOREN = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")


def vstavi(html_path, pot):
    html = open(html_path, encoding="utf-8").read()
    n = 0

    def zamenjaj(m):
        nonlocal n
        if m.group(2):
            return m.group(0)
        sid = m.group(1)
        mapa = os.path.join(KOREN, "public", "videi", pot)
        if not all(os.path.exists(os.path.join(mapa, f"{sid}-{t}.mp4")) for t in ("svetla", "temna")):
            return m.group(0)
        n += 1
        url = f"/videi/{pot}/{sid}"
        return (m.group(0) + f'\n          <div class="sklop-video">'
                f'<span class="sklop-video-oznaka">Video razlaga</span>'
                f'<video class="video-svetla" controls preload="none" playsinline data-poster="{url}-svetla.jpg" src="{url}-svetla.mp4"></video>'
                f'<video class="video-temna" controls preload="none" playsinline data-poster="{url}-temna.jpg" src="{url}-temna.mp4"></video>'
                f'</div><!-- /sklop-video -->')

    html = re.sub(r'<section class="sklop[^"]*" id="(sklop-[\w-]+)">\s*<header class="sklop-header">.*?</header>(?=(\s*<div class="sklop-video">)?)',
                  zamenjaj, html, flags=re.S)
    open(html_path, "w", encoding="utf-8").write(html)
    return n


if __name__ == "__main__":
    print(f"{sys.argv[1]}: {vstavi(sys.argv[1], sys.argv[2])} videov")
