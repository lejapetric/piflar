Ročno napisane dodatne naloge matematike: čisto osnovne (težavnost 1) in zelo težke
sestavljene naloge v več korakih (težavnost 4) za snovi, kjer jih je bilo malo.
Vsaka datoteka `<slug>.mjs` izvozi seznam nalog; `mapa.mjs` jih doda
za nalogami iz `matematika/<slug>.mjs`, zato se id-ji obstoječih nalog ne spremenijo.

Naloga: { t: težavnost, b: besedilo, rez: rezultat, post: postopek, raven?: "visja", namig? }
in bodisi v (število) + tol? + enota? (z enoto je privzeto dovoljeno 1 % odstopanja) bodisi p (pravilna možnost) + n (napačne možnosti).
Naloge doda `mapa.mjs` za vse predmete, ki imajo mapo `<predmet>-dodatne/`.
