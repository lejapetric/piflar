"""Sestavi videe (en na sklop) iz izrisanih blokov.

python3 compose.py work/<slug>.json work/<slug>/<tema> <izhodna mapa> <tema> [id-sklopa ...]
"""
import json, math, os, subprocess, sys
from PIL import Image, ImageChops, ImageFilter

jsonPath, blkDir, outDir, tema = sys.argv[1:5]
samo = set(sys.argv[5:])
S = json.load(open(jsonPath, encoding='utf-8'))
sizes = json.load(open(os.path.join(blkDir, 'sizes.json')))
os.makedirs(outDir, exist_ok=True)

W, H, FPS = 1280, 720, 25
X0, Y0, YMAX, XMAX = 70, 96, 628, 1214
TEMNA = tema == 'temna'
BG = Image.open(os.path.join(blkDir, 'ozadje.png')).convert('RGB')

# kreda: rahel šum v prosojnosti (samo zelena tabla)
_noise = Image.effect_noise((W, H), 60).filter(ImageFilter.GaussianBlur(0.6))
_noise = _noise.point(lambda v: int(255 * min(1, max(0.66, 0.82 + (v - 128) / 560))))

_cache = {}
def img(bid, x=0, y=0, maxh=None, maxw=None):
    k = (bid, maxh, maxw)
    if k not in _cache:
        im = Image.open(os.path.join(blkDir, bid + '.png')).convert('RGBA')
        bb = im.getbbox()
        if bb:
            im = im.crop((0, 0, max(bb[2] + 2, 1), im.height))
        s = 1.0
        if maxh and im.height > maxh:
            s = maxh / im.height
        if maxw and im.width * s > maxw:
            s = maxw / im.width
        if s < 1:
            im = im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))), Image.LANCZOS)
        _cache[k] = im
    return _cache[k]

def chalk(im, x, y):
    if not TEMNA:
        return im
    n = _noise.crop((x, y, x + im.width, y + im.height))
    if n.size != im.size:
        n = n.resize(im.size)
    r, g, b, a = im.split()
    return Image.merge('RGBA', (r, g, b, ImageChops.multiply(a, n)))

def bands(im):
    """vodoravni pasovi (vrstice besedila) po prosojnosti"""
    a = im.getchannel('A').point(lambda v: 255 if v > 20 else 0)
    rows = [a.crop((0, y, a.width, y + 1)).getbbox() is not None for y in range(a.height)]
    out, start, gap = [], None, 0
    for y, r in enumerate(rows):
        if r:
            if start is None:
                start = y
            gap = 0
        elif start is not None:
            gap += 1
            if gap >= 4:
                out.append((start, y - gap + 1)); start = None; gap = 0
    if start is not None:
        out.append((start, a.height))
    # združi drobne pasove (indeksi, strešice) s sosednjimi
    merged = []
    for b in out:
        if merged and (b[1] - b[0] < 14 or merged[-1][1] - merged[-1][0] < 14):
            merged[-1] = (merged[-1][0], b[1])
        else:
            merged.append(b)
    return merged or [(0, im.height)]

class El:
    def __init__(self, im, x, y, kind, n=0, anim=True):
        self.im = chalk(im, x, y); self.x, self.y, self.kind = x, y, kind
        self.anim = anim
        if kind == 'slika':
            self.bands = [(0, im.height)]
            self.dur = 0.9
        else:
            self.bands = bands(im)
            self.dur = max(0.3, sum(max(0.18, im.width / 1500) for _ in self.bands))
        if not anim:
            self.dur = 0
        self.hold = {'slika': 0.9, 'korak': 1.0 + n * 0.03, 'naloga': 1.2 + n * 0.028, 'pazi': 1.0 + n * 0.028,
                     'naslov': 2.6, 'pod': 0.5}.get(kind, 0.6 + n * 0.026)
        self.hold = min(self.hold, 11)

    def frame(self, p):
        if p >= 1 or not self.anim:
            return self.im
        if self.kind == 'slika':
            w = int(self.im.width * p)
            m = Image.new('L', self.im.size, 0)
            m.paste(255, (0, 0, w, self.im.height))
        else:
            tot = len(self.bands); k = min(tot - 1, int(p * tot)); q = p * tot - k
            m = Image.new('L', self.im.size, 0)
            for i, (a, b) in enumerate(self.bands):
                y0 = a if i > 0 else 0
                y1 = self.bands[i + 1][0] if i + 1 < tot else self.im.height
                if i < k:
                    m.paste(255, (0, y0, self.im.width, y1))
                elif i == k:
                    m.paste(255, (0, y0, int(self.im.width * q), y1))
        out = self.im.copy()
        out.putalpha(ImageChops.multiply(self.im.getchannel('A'), m))
        return out

def pages_for(sk):
    """seznam strani; stran = (statični elementi, animirani elementi)"""
    pages = []
    # naslovna stran
    t = img(sk['id'] + '-naslov')
    pages.append(([], [El(t, 110, 200, 'naslov')]))
    ozn = img(sk['id'] + '-oznaka', maxw=860)
    for gi, g in enumerate(sk['skupine']):
        chip = img(f"{sk['id']}-g{gi}-chip")
        head = [El(ozn, X0, 38, 'h', anim=False), El(chip, XMAX - chip.width, 40, 'h', anim=False)]
        pod = img(f"{sk['id']}-g{gi}-pod") if g['naslov'] else None
        stalni_polni = [img(b['id'], maxh=YMAX - Y0 - 20) for b in g['stalni']]
        visoki = sum(im.height for im in stalni_polni) > 190
        stalni = [] if visoki else [img(b['id'], maxh=200) for b in g['stalni']]
        if visoki:
            # dolgo besedilo naloge: najprej samostojna stran z besedilom v polni velikosti
            st0 = list(head); an0 = []; y0 = Y0
            for b, im in zip(g['stalni'], stalni_polni):
                if y0 + im.height > YMAX:
                    s_ = (YMAX - y0) / im.height
                    im = im.resize((max(1, int(im.width * s_)), max(1, int(im.height * s_))), Image.LANCZOS)
                an0.append(El(im, X0, y0, b['kind'], b.get('n', 0))); y0 += im.height + 12
            pages.append((st0, an0))
        def nova_stran(prva):
            st = list(head); an = []
            y = Y0
            if pod is not None:
                e = El(pod, X0, y, 'pod', anim=prva)
                (an if prva else st).append(e); y += pod.height + 10
            for b, im in zip(g['stalni'] if stalni else [], stalni):
                e = El(im, X0, y, b['kind'], b.get('n', 0), anim=prva)
                (an if prva else st).append(e); y += im.height + 12
            return st, an, y
        st, an, y = nova_stran(True)
        prazna = True
        bl = g['bloki']; i = 0
        while i < len(bl):
            b = bl[i]
            if b['kind'] == 'slika':
                # vrsta zaporednih slik
                row = []
                while i < len(bl) and bl[i]['kind'] == 'slika':
                    row.append(bl[i]); i += 1
                ims = [img(r['id'], maxh=min(330, YMAX - Y0 - 60)) for r in row]
                # razdeli v vrstice, ki gredo v širino
                vrste, cur, cw = [], [], 0
                for r, im in zip(row, ims):
                    if cur and cw + im.width + 30 > XMAX - X0:
                        vrste.append(cur); cur, cw = [], 0
                    cur.append((r, im)); cw += im.width + 30
                if cur:
                    vrste.append(cur)
                for v in vrste:
                    h = max(im.height for _, im in v)
                    if y + h > YMAX and not prazna:
                        pages.append((st, an)); st, an, y = nova_stran(False); prazna = True
                    if y + h > YMAX:
                        s = (YMAX - y) / h
                        v = [(r, im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))), Image.LANCZOS)) for r, im in v]
                        h = YMAX - y
                    tw = sum(im.width for _, im in v) + 30 * (len(v) - 1)
                    x = X0 + max(0, (XMAX - X0 - tw) // 2)
                    for r, im in v:
                        an.append(El(im, x, y, 'slika')); x += im.width + 30
                    y += h + 14; prazna = False
                continue
            im = img(b['id'], maxh=YMAX - Y0 - 120)
            if y + im.height > YMAX and not prazna:
                pages.append((st, an)); st, an, y = nova_stran(False); prazna = True
            if y + im.height > YMAX:
                s = (YMAX - y) / im.height
                im = im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))), Image.LANCZOS)
            an.append(El(im, X0, y, b['kind'], b.get('n', 0)))
            y += im.height + (16 if b['kind'] in ('korak', 'pazi', 'naloga') else 10)
            prazna = False
            i += 1
        pages.append((st, an))
    return pages

def ease(p):
    return 0.5 - 0.5 * math.cos(math.pi * min(1, max(0, p)))

def render(sk, out):
    pages = pages_for(sk)
    ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                           '-c:v', 'libx264', '-preset', 'veryfast', '-tune', 'stillimage', '-crf', '28', '-g', '125',
                           '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
    FADE = 0.3
    total = 0.0
    for st, an in pages:
        base = BG.copy().convert('RGBA')
        for e in st:
            base.alpha_composite(e.im, (e.x, e.y))
        # časovnica strani
        t = 0.25; sched = []
        for e in an:
            sched.append((t, t + e.dur, e)); t += e.dur + e.hold
        dur = t + 0.4
        n_in = int(FADE * FPS)
        settled = base.copy()
        done = 0
        nfr = int(dur * FPS)
        last = None
        for f in range(nfr + int(FADE * FPS)):
            tt = f / FPS
            while done < len(sched) and tt >= sched[done][1]:
                e = sched[done][2]; settled.alpha_composite(e.frame(1), (e.x, e.y)); done += 1; last = None
            animating = done < len(sched) and tt >= sched[done][0]
            fade_out = tt >= dur
            if not animating and not fade_out and f >= n_in and last is not None:
                ff.stdin.write(last); continue
            fr = settled.copy()
            if animating:
                a, b, e = sched[done]
                fr.alpha_composite(e.frame(ease((tt - a) / max(1e-6, b - a))), (e.x, e.y))
            fr = fr.convert('RGB')
            if f < n_in:
                fr = Image.blend(BG, fr, f / n_in)
            if fade_out:
                fr = Image.blend(fr, BG, min(1, (tt - dur) / FADE))
            by = fr.tobytes()
            if not animating and not fade_out:
                last = by
            ff.stdin.write(by)
        total += dur + FADE
    ff.stdin.close(); ff.wait()
    return total

for sk in S['sklopi']:
    if samo and sk['id'] not in samo:
        continue
    out = os.path.join(outDir, f"{sk['id']}-{tema}.mp4")
    sec = render(sk, out)
    print(f"{out}: {sec:.0f} s, {os.path.getsize(out) / 1e6:.2f} MB", flush=True)
