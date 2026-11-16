"""Nalogam v api/data/matura*.json doda polje "video" (pot brez končnice), če v
public/videi/<predmet>/matura/<pola>/ obstajata <naloga>-svetla.mp4 in <naloga>-temna.mp4.

python3 tools/videi/vstavi_matura.py api/data/matura.json
"""
import json, os, sys

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
pot = sys.argv[1]
pole = json.load(open(pot, encoding='utf-8'))
n = 0
for p in pole:
    for x in p['naloge']:
        rel = f"videi/{p['predmet']}/matura/{p['id']}/{x['id']}"
        if all(os.path.exists(os.path.join(ROOT, 'public', f'{rel}-{t}.mp4')) for t in ('svetla', 'temna')):
            x['video'] = '/' + rel; n += 1
        else:
            x.pop('video', None)
open(pot, 'w', encoding='utf-8').write(json.dumps(pole, ensure_ascii=False, indent=2) + '\n')
print(f'{pot}: {n} nalog z videom')
