// One timeline for picture, score, captions and checks. 100 BPM: beat 0.6 s, bar 2.4 s, 16th 0.15 s.
import { monotone } from '/core/lib.js';

export const BPM = 100, BEAT = 0.6, BAR = 2.4, STEP = 0.15;
export const DUR = 38.4;                       // 16 bars
export const T = {
  title0: 0.3, doorOpen: 2.4, walk: 7.2, desk: 12.0, sit: 12.6, dusk: 16.8,
  lights: [18.0, 18.6, 19.2, 19.8], door2: 19.8, friendSit: 22.2,
  rampA: 24.0, real: 24.6, note: 25.2, release: 28.8, plan: 31.2, end: 38.4,
};
export const SECS = [
  { id: 'dawn', t: 0.0, bars: 3 }, { id: 'walk', t: 7.2, bars: 2 }, { id: 'desk', t: 12.0, bars: 2 },
  { id: 'night', t: 16.8, bars: 3 }, { id: 'real', t: 24.0, bars: 2 }, { id: 'plan', t: 28.8, bars: 4 },
];

// Room clock (hours) against film time; the time-lapse rate is its slope
const CLK = [[0, 7.2], [7.2, 9.0], [12.0, 11.8], [16.8, 17.6], [20.4, 19.9], [24.0, 21.2],
  [24.6, 21.2 + 0.4 / 3600], [28.8, 21.2 + 4.6 / 3600], [31.2, 22.3], [38.4, 23.1]];
export function clockAt(t) {
  for (let i = 0; i < CLK.length - 1; i++) {
    const [a, ca] = CLK[i], [b, cb] = CLK[i + 1];
    if (t <= b) return ca + (cb - ca) * Math.max(0, t - a) / (b - a);
  }
  return CLK[CLK.length - 1][1];
}
export function rateAt(t) {
  if (t >= T.real && t < T.release) return 1;
  if (t >= T.rampA && t < T.real) { const u = (t - T.rampA) / (T.real - T.rampA); return Math.max(1, Math.round(1100 * Math.pow(1 - u, 3))); }
  if (t >= T.release && t < T.release + 0.6) return Math.max(1, Math.round(1600 * ((t - T.release) / 0.6) ** 3));
  const d = 0.05, r = (clockAt(t + d) - clockAt(t)) * 3600 / d;
  const nice = [60, 120, 240, 480, 600, 900, 1200, 1500, 1800, 2400];
  return nice.reduce((p, c) => Math.abs(c - r) < Math.abs(p - r) ? c : p, 60);
}
// World time used by actors and light: stepped on 16ths while time-lapse runs fast, smooth near real time
export function worldT(t) {
  const r = rateAt(t);
  if (r < 2) return t;
  const step = r > 6 ? STEP : STEP / 2;
  return Math.floor(t / step) * step;
}

// Captions: room signage panels, in the lower blur band
export const CAPS = [
  { t0: 2.7, t1: 6.9, text: 'ENTRANCE · FRONT LEFT' },
  { t0: 7.5, t1: 11.8, text: 'COLLECTION WALL · 3 GLASS CABINETS' },
  { t0: 12.3, t1: 16.6, text: 'DESK 177 × 80 · 1 LANDSCAPE + 1 PORTRAIT' },
  { t0: 20.7, t1: 23.8, text: 'SOFA FACES THE TV · 1.85 m' },
  { t0: 25.2, t1: 28.6, text: 'THE CENTREPIECE' },
];

// Plan labels (room coordinates: x from the left wall, d from the front wall)
export const LABELS = [
  { x: 0.55, d: -0.35, text: 'DOOR', beat: 0 },
  { x: 0.62, d: 2.2, text: 'DISPLAY ×3', beat: 1 },
  { x: 3.25, d: 1.38, text: 'DESK 177×80', beat: 2 },
  { x: 1.7, d: 3.5, text: 'SOFA 190', beat: 3 },
  { x: 3.5, d: 3.5, text: 'TV 55"', beat: 4 },
  { x: 1.05, d: 5.35, text: 'BED 160×200', beat: 5 },
  { x: 2.6, d: 7.2, text: 'BALCONY', beat: 6 },
];

// Actors: keyframes [t, x, d, sit(0 stand / 1 sit / 2 lie), face (radians, or null = face the walk)]
const L = -Math.PI / 2, R = Math.PI / 2;     // face −x (left wall) / +x (right wall)
export const SHIVEN = [
  [0, 0.6, -1.5, 0, null], [2.5, 0.6, -1.5, 0, null], [3.6, 0.7, 0.6, 0, null], [4.8, 0.85, 1.6, 0, null],
  [5.6, 0.85, 2.2, 0, L], [8.4, 0.85, 2.2, 0, L], [9.6, 1.9, 1.85, 0, null], [10.8, 2.7, 1.4, 0, R], [11.6, 2.7, 1.4, 0, R],
  [12.6, 2.85, 1.4, 1, R], [19.2, 2.85, 1.4, 1, R], [19.6, 2.7, 1.5, 0, null], [20.4, 2.4, 2.4, 0, null],
  [21.4, 1.8, 3.95, 0, R], [21.8, 1.75, 3.95, 1, R], [22.8, 1.75, 3.95, 1, R], [23.1, 2.35, 3.8, 0, null],
  [23.5, 2.35, 2.6, 0, null], [23.9, 1.15, 2.55, 0, null], [24.2, 0.84, 2.55, 0, L], [28.8, 0.84, 2.55, 0, L],
  [29.6, 1.0, 3.0, 0, null], [30.2, 2.4, 4.1, 0, null], [30.8, 2.3, 5.3, 0, L], [31.4, 1.2, 5.35, 2, L], [38.4, 1.2, 5.35, 2, L],
];
export const FRIEND = [
  [0, 0.6, -1.4, 0, null], [19.9, 0.6, -1.4, 0, null], [20.6, 0.7, 0.8, 0, null], [21.3, 2.35, 2.3, 0, null],
  [21.9, 1.8, 3.15, 0, R], [22.2, 1.75, 3.15, 1, R], [29.0, 1.75, 3.15, 1, R], [29.4, 2.35, 3.0, 0, null],
  [30.0, 2.3, 2.3, 0, null], [30.6, 0.7, 0.6, 0, null], [31.2, 0.6, -1.4, 0, null], [38.4, 0.6, -1.4, 0, null],
];
export function actorAt(K, t) {
  let i = 0; while (i < K.length - 2 && t > K[i + 1][0]) i++;
  const a = K[i], b = K[i + 1], u = Math.max(0, Math.min(1, (t - a[0]) / (b[0] - a[0] || 1)));
  const e = u * u * (3 - 2 * u);
  const x = a[1] + (b[1] - a[1]) * e, d = a[2] + (b[2] - a[2]) * e;
  const sit = a[3] + (b[3] - a[3]) * e;
  const moving = Math.hypot(b[1] - a[1], b[2] - a[2]) > 0.05 && u > 0 && u < 1;
  let face = b[4] ?? a[4];
  if (moving || face == null) face = Math.atan2(b[1] - a[1], b[2] - a[2]);
  return { x, d, sit, face, moving, phase: moving ? (t - a[0]) * 9 : 0 };
}

// Door swings (0 closed → 1 open)
export const DOOR = monotone([[0, 0], [2.3, 0], [2.7, 1], [4.4, 1], [5.0, 0], [19.7, 0], [20.1, 1], [21.0, 1], [21.6, 0], [30.4, 0], [30.8, 1], [31.5, 1], [32.0, 0]]);

export const EVENTS = [
  { t: 2.4, type: 'door' }, { t: 4.9, type: 'doorclose' }, { t: 19.8, type: 'door' }, { t: 21.5, type: 'doorclose' },
  { t: 30.6, type: 'door' }, { t: 31.9, type: 'doorclose' },
  ...T.lights.map((t, i) => ({ t, type: 'light', i })),
  { t: 12.6, type: 'sit' }, { t: 21.8, type: 'sit' }, { t: 22.2, type: 'sit' },
  { t: T.rampA, type: 'tapestop' }, { t: T.note, type: 'ledclick' }, { t: T.release, type: 'release' },
  ...LABELS.map(l => ({ t: T.plan + l.beat * BEAT, type: 'label', i: l.beat })),
];
