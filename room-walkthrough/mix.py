"""Room 4×6.5 — score, foley and ambience → out/mix.wav
Score: 100 BPM, 16th = 0.15 s, A major with a Lydian lift (D#) at night. Tuned percussion only.
- Marimba A plays a 12-step skeleton over 16-step bars (a built-in 3:4 drift); a cell sounds when a footstep lands
  within ±60 ms of it, or by the section's base fill rate, so the phrase fills as the figures move.
- Glockenspiel joins on the walk, vibraphone (gated by key presses) at the desk, hand chimes voice each light click as a chord.
- Tape-stop into silence at 24.0; real time = room tone, AC hum and one glockenspiel note; the plan = a music-box theme.
Run with the library venv: "$LIB/.venv/bin/python" mix.py  (LIB = the Lemo-Opuscar library)
"""
import os, sys, json
import numpy as np, soundfile as sf
LIB = os.environ.get('LIB', '/root/lemo-opuscar'); sys.path.insert(0, LIB)
from core.audio import sampler as S, pluck as P
from core.audio import sfx as X
from core.audio.sfx import SR, add, limit

HERE = os.path.dirname(os.path.abspath(__file__))
EV = json.load(open(os.path.join(HERE, 'events.json')))['ev']
DUR = 38.4; STEP = .15; BEAT = .6; BAR = 2.4
S.seed(1207); rng = np.random.default_rng(3)
N = int((DUR + 1) * SR)
music = np.zeros((N, 2), np.float32); late = np.zeros((N, 2), np.float32)
fol = np.zeros((N, 2), np.float32); amb = np.zeros((N, 2), np.float32)
used = set(); _c = {}

def note(inst, p, dur, vel):
    k = (inst, p, round(dur, 3), round(vel, 2))
    if k not in _c: _c[k] = S.note(inst, p, dur, vel)
    used.add(inst); return _c[k]
def put(buf, inst, p, t, dur=.5, vel=.7, pan=0., gain=1.):
    if 0 <= t < DUR: add(buf, note(inst, p, dur, vel), t, gain, pan)
def evs(ty): return np.array(sorted(e['t'] for e in EV if e['type'] == ty))
def near(ts, t, w=.06): return len(ts) and np.min(np.abs(ts - t)) <= w

steps, keys = evs('step'), evs('key')
lights = evs('light'); labels = evs('label')

# ——— harmony, two bars per chord ———
CH = [('A2', ['A4', 'C#5', 'E5', 'B4']), ('F#2', ['F#4', 'A4', 'C#5', 'E5']), ('D3', ['D4', 'F#4', 'A4', 'C#5']), ('E2', ['E4', 'G#4', 'B4', 'D5'])]
CHN = [('D3', ['D4', 'F#4', 'A4', 'E5']), ('B2', ['D4', 'F#4', 'B4', 'C#5']), ('A2', ['A4', 'C#5', 'E5', 'D#5'])]   # night: Lydian lift
SKEL = ['A4', 'E5', 'C#5', None, 'B4', 'E5', 'A5', None, 'F#5', 'E5', 'C#5', 'B4']
def chord_at(t): return (CHN[int((t - 16.8) // (2 * BAR)) % 3] if t >= 16.8 else CH[int(t // (2 * BAR)) % 4])

# ——— 0 → 24.0: the time-lapse ensemble ———
FILL = [(0, .45), (7.2, .55), (12.0, .6), (16.8, .7)]
def fill_at(t): return [f for a, f in FILL if t >= a][-1]
i = 0; t = 0.0
while t < 24.0 - 1e-6:
    k = i % 12; p = SKEL[k]
    if p and (near(steps, t) or rng.random() < fill_at(t)):
        put(music, 'marimba', p, t, .4, .55 + .15 * (i % 4 == 0), pan=-.25)
    if i % 4 == 0:                                       # bass on beats
        root = chord_at(t)[0]; root = root[:-1] + str(int(root[-1]) + 1); put(music, 'marimba', root, t, .5, .5, pan=0, gain=.7)
    if t >= 7.2 and i % 8 == 6:                          # glockenspiel answers on the walk
        put(music, 'glockenspiel', chord_at(t)[1][(i // 8) % 4].replace('4', '6').replace('5', '6'), t, 1.2, .35, pan=.35, gain=.55)
    if 12.0 <= t < 19.2 and near(keys, t):               # vibraphone gated by the keyboard
        put(music, 'vibraphone', chord_at(t)[1][i % 4], t, .5, .4, pan=.4, gain=.6)
    if t >= 16.8 and i % 2 == 1 and rng.random() < .5:   # night: marimba B, a 16th late (phasing)
        q = SKEL[(i + 5) % 12]
        if q: put(music, 'marimba', q, t + STEP, .35, .42, pan=.3, gain=.75)
    i += 1; t = round(i * STEP, 6)
for j, tl in enumerate(lights):                          # each light click = a hand-chime chord
    for n_, p in enumerate(chord_at(tl)[1][:3 + (j > 1)]):
        put(music, 'hand_chimes', p, tl + n_ * .012, 1.6, .6, pan=-.3 + .2 * n_, gain=.7)
put(music, 'woodblock', 'a', 2.4, .3, .7, pan=-.3)       # the door on the downbeat

# tape-stop over 23.4 → 24.6: varispeed 1 → 0.2, then silence
a0, a1 = int(23.4 * SR), int(24.6 * SR)
seg = music[a0:a1 + int(SR * 1.5)].copy(); L = a1 - a0
rate = np.linspace(1, .2, L) ** 1.6; pos = np.cumsum(rate); pos = pos[pos < len(seg) - 1]
for c in range(2): music[a0:a0 + len(pos), c] = np.interp(pos, np.arange(len(seg)), seg[:, c]) * np.linspace(1, 0, len(pos)) ** .7
music[a0 + len(pos):int(28.8 * SR)] = 0

# ——— real time: one glockenspiel note when the cabinet light settles ———
put(late, 'glockenspiel', 'A6', 25.2, 3.0, .45, pan=-.1, gain=.8)

# ——— 28.8 →: music-box theme over the plan, labels on the beat ———
THEME = ['E5', 'A5', 'C#6', 'B5', 'A5', 'E5', 'F#5', 'A5', 'B5', 'C#6', 'E6', 'A5']
for k, p in enumerate(THEME):
    tt = 28.8 + k * BEAT
    if tt < DUR - .3: add(late, P.pluck('music_box', p, 1.6, .6), tt, .55, (-.2 if k % 2 else .2))
for k, tl in enumerate(labels):
    put(late, 'glockenspiel', ['A6', 'C#7', 'E7', 'A6', 'B6', 'C#7', 'E7'][k % 7], tl, 1.0, .3, pan=.3, gain=.45)
for p in ['A3', 'E4', 'A4', 'C#5']: put(late, 'vibraphone', p, 33.6, 4.5, .35, pan=0, gain=.5)   # final chord
put(late, 'marimba', 'A3', 33.6, 2.0, .5, gain=.6)

# ——— foley ———
for e in EV:
    t, ty = e['t'], e['type']
    if ty == 'step' and t < 24: add(fol, X.step(.25), t, .35, -.2 if e.get('who') == 'shiven' else .2)
    elif ty == 'step': add(fol, X.step(.2), t, .3, 0)
    elif ty == 'key': add(fol, X.click(1.6 + rng.random() * .4, .25), t, .25, .45)
    elif ty == 'door': add(fol, X.clack(.8, .6), t, .5, -.45); add(fol, X.creak(.4), t + .05, .3, -.45)
    elif ty == 'doorclose': add(fol, X.thump(.5, 90), t, .45, -.45)
    elif ty == 'light': add(fol, X.click(1.0, .6), t, .55, (-.5, .3, .5, 0)[e['i'] % 4])
    elif ty == 'sit': add(fol, X.thump(.25, 60), t, .35, .2)
    elif ty == 'ledclick': add(fol, X.click(2.2, .35), t - .05, .3, -.2)
    elif ty == 'label': add(fol, X.lp(X.noise(.18) * X.env_exp(.18, .05), 3000) * .3, t, .25, .2)
    elif ty == 'release': add(fol, X.whoosh(1.2, .5), t, .4, 0)

# ——— ambience: sped-up hiss in time-lapse; real room tone + AC hum at ×1 ———
tt = np.arange(N) / SR
hiss = X.hp(X.noise(N / SR), 2500) * .012
rt = (tt >= 24.6) & (tt < 28.8)
fade = np.clip(np.minimum((tt - 24.4) / .3, (29.0 - tt) / .3), 0, 1) * rt
hum = (np.sin(2 * np.pi * 100 * tt) * .006 + X.lp(X.noise(N / SR), 400) * .02) * np.clip(np.minimum((tt - 24.4) / .3, (29.2 - tt) / .4), 0, 1)
tl_ = np.clip(1 - fade, 0, 1) * (tt < 30)
amb[:, 0] = hiss[:N] * tl_ + hum[:N]; amb[:, 1] = np.roll(hiss[:N], 300) * tl_ + hum[:N]
birds = (tt > .2) & (tt < 6)
for b in np.arange(.4, 6, .45):                          # chopped sped-up dawn birds
    f0 = 3200 + rng.random() * 1500; d = .06; ch = np.sin(2 * np.pi * (f0 + 900 * X.t_(d) / d) * X.t_(d)) * X.env_exp(d, .02) * .05
    add(amb, ch, b, .6, rng.random() * 1.2 - .6)

# ——— mix ———
mus = S.room(music + late, size=.45, mix=.2)
mus = mus - np.stack([X.lp(mus[:, c], 110) for c in range(2)], 1) * .45   # trim the low end
mix = mus * .9 + fol * 1.0 + amb * 1.0
mix = limit(mix[:int(DUR * SR)], .95)
os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
sf.write(os.path.join(HERE, 'out', 'mix.wav'), mix, SR)
open(os.path.join(HERE, 'out', 'instruments.txt'), 'w').write('\n'.join(sorted(used)))
print('mix.wav', mix.shape[0] / SR, 's; instruments:', sorted(used))
