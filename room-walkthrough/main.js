// Room 4×6.5 — a tilt-shift miniature walkthrough of Shiven's redesigned room
import * as THREE from 'three';
import { makePost } from './post.js';
import { clamp, seg, lerp, ss, eio, eo, mulberry, hash } from '/core/lib.js';
import { buildRoom, drawTitle, W, RW, RD } from './room.js';
import { DUR, T, BEAT, STEP, CAPS, LABELS, SHIVEN, FRIEND, actorAt, DOOR, EVENTS, clockAt, rateAt, worldT } from './story.js';

const QS = new URLSearchParams(location.search);
const SW = innerWidth || 1920, SH = innerHeight || 1080;
await document.fonts.load('800 120px Overpass'); await document.fonts.load('600 40px Overpass'); await document.fonts.load('600 40px "Overpass Mono"');

const renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(1); renderer.setSize(SW, SH);
renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('stage').appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, SW / SH, .05, 400);
const SS = QS.has('ss') ? +QS.get('ss') : 2;
const post = makePost(renderer, scene, camera, SW, SH, { ssaa: SS, ao: !QS.has('noao'), aoRadius: .35, aoThickness: .5, aoScale: 1.2, aoAmt: .7 });
post.bloom.strength = .35; post.bloom.threshold = .95; post.bloom.radius = .45;

const R = buildRoom(scene);

// ——— Light ———
const sun = new THREE.DirectionalLight('#fff1dc', 3); sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048); const sc = sun.shadow.camera; sc.left = -6; sc.right = 6; sc.top = 6; sc.bottom = -6; sc.near = 1; sc.far = 60; sun.shadow.bias = -.0004; sun.shadow.normalBias = .02;
sun.target.position.copy(W(2, 0, 3.25)); scene.add(sun, sun.target);
const hemi = new THREE.HemisphereLight('#bcd4ff', '#6b4a33', .8); scene.add(hemi);
const P = (col, pos, dist = 4, decay = 1.6) => { const l = new THREE.PointLight(col, 0, dist, decay); l.position.copy(pos); scene.add(l); return l; };
const AMB = '#ffa64d';
const coveL = [
  [P(AMB, W(.4, 2.2, 1.6), 5), P(AMB, W(.4, 2.2, 4.8), 5)],
  [P(AMB, W(1.2, 2.3, RD - .7), 5), P(AMB, W(2.8, 2.3, RD - .7), 5)],
  [P(AMB, W(RW - .7, 2.3, 1.6), 5), P(AMB, W(RW - .7, 2.3, 4.8), 5)],
  [P(AMB, W(1.4, 1.4, .5), 4), P(AMB, W(2.8, 1.4, .5), 4)],
];
const cabL = [0, 1, 2].map(c => P('#ffb35e', R.lights['cab' + c], c === 1 ? 1.4 : 1.8, 1.2));
const pcL = P('#3ad1ff', R.lights.pc, 1.8), tvL = P('#6fa8ff', R.lights.tv, 3.2), flagL = P('#ff9a40', R.lights.flag, 1.4), lampL = P('#ffc27a', W(.3, .9, 4.27), 2.4);
const fill = new THREE.PointLight('#ffd7a8', 0, 12, 1.2); fill.position.copy(W(2, 4.5, 3.2)); scene.add(fill);

// ——— Actors: model-railway figures, ~25 % larger than life so they read ———
function figure(shirt) {
  const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  const m = (geo, col, x, y, z) => { const o = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: col, roughness: .6, sheen: .6, sheenRoughness: .5 })); o.position.set(x, y, z); o.castShadow = true; body.add(o); return o; };
  const legs = [m(new THREE.CapsuleGeometry(.07, .5, 4, 10), '#23252b', -.08, .36, 0), m(new THREE.CapsuleGeometry(.07, .5, 4, 10), '#23252b', .08, .36, 0)];
  m(new THREE.CapsuleGeometry(.17, .42, 6, 14), shirt, 0, 1.0, 0);
  m(new THREE.SphereGeometry(.14, 18, 14), '#c99a72', 0, 1.47, .01);
  m(new THREE.SphereGeometry(.145, 18, 14), '#151515', 0, 1.53, -.03);
  g.scale.setScalar(1.18); scene.add(g); return { g, body, legs };
}
const shiven = figure('#2f8f4e'), friend = figure('#c8352b');
function pose(A, K, tw) {
  const s = actorAt(K, tw);
  A.g.position.copy(W(s.x, 0, s.d));
  A.g.rotation.y = Math.atan2(Math.sin(s.face), -Math.cos(s.face));
  const sit = Math.min(1, s.sit), lie = Math.max(0, s.sit - 1);
  A.body.position.y = -.42 * sit + .18 * lie + (s.moving ? Math.abs(Math.sin(s.phase)) * .03 : 0);
  A.body.rotation.x = -lie * Math.PI / 2; A.body.position.z = -lie * .6;
  A.legs[0].rotation.x = s.moving ? Math.sin(s.phase) * .5 : -sit * 1.3; A.legs[1].rotation.x = s.moving ? -Math.sin(s.phase) * .5 : -sit * 1.3;
  A.legs.forEach(l => { l.position.z = sit * .18; l.position.y = .36 + sit * .18; });
  A.g.visible = s.d > -1.2;
  return s;
}

// ——— Cameras ———
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const LV = (a, b, u) => a.clone().lerp(b, u);
const toW = (s, y = .9) => W(s.x, y, s.d);
function shot(t, tw) {
  const sv = actorAt(SHIVEN, tw);
  let pos, look, up = V(0, 1, 0), fov, tgt, bw = .06, mix = .65, amp = 26, aper = 30;
  if (t < T.walk) {
    const u = ss(t / T.walk); pos = LV(V(1.7, 8.3, 5.4), V(2.5, 8.1, 5.2), u); look = LV(V(2.0, 1.4, -4.6), V(2.0, .3, -3.5), eio(seg(t, 1.8, 4.2))); fov = 30;
    const fas = W(2.0, 2.62, RD - .4), door = W(.6, .7, 0);
    tgt = t < 1.9 ? fas : t < 2.5 ? LV(fas, door, eio(seg(t, 1.9, 2.5))) : LV(door, toW(sv), eio(seg(t, 2.5, 3.6)));
    amp = lerp(14, 26, seg(t, 1.6, 2.6)); bw = lerp(.12, .06, seg(t, 1.6, 2.6));
  } else if (t < T.desk) {
    const u = ss(seg(t, T.walk, T.desk)); pos = LV(V(3.6, 6.2, 2.8), V(3.1, 5.6, 1.2), u);
    look = LV(V(.7, .7, -1.7), V(.9, .7, -2.4), u); fov = 27; tgt = toW(sv); bw = .05;
  } else if (t < T.dusk) {
    const u = ss(seg(t, T.desk, T.dusk)); pos = LV(V(.3, 4.9, 1.6), V(.7, 4.7, -1.0), u);
    look = LV(V(3.4, .9, -.9), V(3.4, .9, -2.6), u); fov = 30;
    tgt = LV(W(3.7, 1.1, 1.3), W(3.9, 1.3, 2.9), ss(seg(t, 15.0, 16.6))); bw = .07;
  } else if (t < T.rampA) {
    const u = ss(seg(t, T.dusk, T.rampA)); pos = LV(V(2.6, 8.6, 4.4), V(1.6, 7.2, 2.6), u);
    look = LV(V(2.1, .4, -3.1), V(1.9, .4, -3.3), u); fov = 31;
    const desk = W(3.4, .9, 1.4), sofa = W(1.9, .7, 3.5);
    tgt = t < 20.2 ? desk : t < 22.8 ? LV(desk, sofa, eio(seg(t, 20.2, 20.9))) : LV(sofa, toW(sv), eio(seg(t, 22.8, 23.6)));
  } else if (t < T.release) {
    const a = shot(T.rampA - 1e-3, tw), u = eio(seg(t, T.rampA, 25.5));
    const cPos = LV(V(2.75, 2.1, -1.2), V(2.45, 1.98, -1.38), ss(seg(t, 25.5, T.release)));
    pos = LV(a.pos, cPos, u); look = LV(a.look, W(.22, 1.0, 2.22), u); fov = lerp(a.fov, 26, u);
    tgt = R.centre; bw = lerp(.06, .028, u); aper = lerp(30, 60, u); mix = lerp(.65, .5, u);
  } else {
    const c = shot(T.release - 1e-3, tw), u = eio(seg(t, T.release, T.plan + .2));
    const top = V(1.65, 10.6, -3.35);
    // rise along a curve: back out first, then up and over the room
    const mid = V(3.2, 5.0, -1.0);
    pos = u < .5 ? LV(c.pos, mid, eio(u * 2)) : LV(mid, top, eio(u * 2 - 1));
    look = LV(c.look, V(1.65, 0, -3.35), eio(u)); fov = lerp(c.fov, 32, u);
    up = V(0, 1, 0).lerp(V(-1, 0, 0), eo(seg(u, .25, 1))).normalize();
    tgt = V(2.25, 0, -3.35); bw = lerp(.028, .5, eio(seg(t, 30.0, T.plan + .6)));
    mix = lerp(.5, 0, eio(seg(t, 30.0, T.plan + .6))); amp = lerp(26, 0, eio(seg(t, 30.0, T.plan + .6))); aper = lerp(60, 0, eio(seg(t, 30, T.plan + .6)));
  }
  return { pos, look, up, fov, tgt, bw, mix, amp, aper };
}

// ——— Day → night ———
const C = (h) => new THREE.Color(h);
function lightAt(t, tw) {
  const h = clockAt(tw);
  const day = ss(seg(h, 6.4, 8.0)) * (1 - ss(seg(h, 17.4, 19.3)));
  const warm = 1 - ss(seg(h, 7.2, 9.5)) + ss(seg(h, 15.8, 18.6));
  const el = h < 12 ? lerp(6, 58, ss(seg(h, 6.4, 12))) : lerp(58, 3, ss(seg(h, 12, 18.8)));
  const az = lerp(.3, 1.25, ss(seg(h, 6.4, 18.8)));        // from behind (dawn) round to the right (sunset): always through the balcony glass
  const e = el * Math.PI / 180, dir = V(Math.sin(az) * Math.cos(e), Math.sin(e), -Math.cos(az) * Math.cos(e));
  sun.position.copy(sun.target.position).addScaledVector(dir, 25);
  sun.intensity = 4.2 * day; sun.color.copy(C('#fff3e0')).lerp(C('#ff9a55'), clamp(warm));
  hemi.intensity = lerp(.06, 1.25, Math.max(day, .35 * (1 - ss(seg(h, 17.4, 19.5))))); hemi.color.copy(C('#bcd4ff')).lerp(C('#ffc49a'), clamp(warm) * .6);
  const night = 1 - day;
  const sky = C('#0b1220').lerp(C('#9cc3ea'), day).lerp(C('#f2a46b'), clamp(warm) * day * .7);
  scene.background = sky; R.ground.material.color.copy(C('#15171a')).lerp(C('#8a8478'), day);
  // practicals switch on with the clicks
  const on = T.lights.map(tl => ss(seg(t, tl, tl + .08)));
  const plan = ss(seg(t, T.release + .8, T.plan));
  const bedtime = 1 - .55 * ss(seg(t, 31.4, 32.4));
  coveL.forEach((pair, i) => pair.forEach(l => l.intensity = 6.0 * on[i] * bedtime));
  R.mats.cove.color.copy(C('#3b3026')).lerp(C('#ffae55'), Math.max(...on) * .3 + on.reduce((a, b) => a + b) / 4 * .7);
  R.coves.forEach((m, i) => m.visible = true);
  const cab = Math.max(on[0], ss(seg(t, T.note - .05, T.note + .05)));
  cabL.forEach(l => l.intensity = 2.2 * cab);
  R.mats.shelf.color.copy(C('#4a3a2c')).lerp(C('#ffb768'), cab);
  flagL.intensity = 2.0 * on[1]; lampL.intensity = 1.6 * on[3] * (1 - ss(seg(t, 32.6, 33.0)) * .7);
  R.lamp.material.color.copy(C('#5a4a38')).lerp(C('#ffcf8f'), on[3]);
  const deskOn = ss(seg(t, 12.6, 12.8));
  pcL.intensity = 1.6 * deskOn * (.6 + .4 * night);
  R.fans.forEach((m, i) => m.color.setHSL(((tw * .12 + i * .1) % 1), .9, .55 * (.3 + .7 * deskOn)));
  R.mats.deskStrip.color.copy(C('#0c1a10')).lerp(C('#36e07a'), deskOn * (.4 + .6 * night));
  const scr = .25 + .75 * deskOn; R.mats.scrL.color.setScalar(scr); R.mats.scrP.color.setScalar(scr);
  const tvOn = (t > 21.9 && t < T.rampA) || (t > T.release && t < 30.1);
  const fl = tvOn ? .5 + .5 * hash(Math.floor(tw / STEP) * 1.7) : 0;
  tvL.intensity = 2.2 * fl; R.mats.tv.color.copy(C('#050608')).lerp(C('#6f9fe0'), fl * .8);
  fill.intensity = 5.0 * plan;
  return { h, night };
}

// ——— Overlay: time-lapse readout, signage captions, plan labels ———
const ov = document.getElementById('ov'); ov.width = SW; ov.height = SH; const g = ov.getContext('2d');
const toScreen = v => { const p = v.clone().project(camera); return { x: (p.x + 1) / 2 * SW, y: (1 - p.y) / 2 * SH, z: p.z }; };
function panel(text, cx, cy, size, alpha, o = {}) {
  g.save(); g.globalAlpha = alpha; g.font = `600 ${size}px Overpass`;
  const w = g.measureText(text).width + size * 1.3, h = size * 1.75, x = cx - w / 2, y = cy - h / 2;
  g.fillStyle = 'rgba(17,14,11,.88)'; g.beginPath(); g.roundRect(x, y, w, h, size * .22); g.fill();
  g.strokeStyle = '#b8894a'; g.lineWidth = 2; g.beginPath(); g.roundRect(x + 5, y + 5, w - 10, h - 10, size * .16); g.stroke();
  g.fillStyle = o.col || '#ffb35c'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, cx, cy + size * .06);
  g.restore(); return { x0: x, y0: y, x1: x + w, y1: y + h };
}
let TEXTS_NOW = [];
function overlay(t) {
  g.clearRect(0, 0, SW, SH); TEXTS_NOW = [];
  // readout
  const h = clockAt(t), hh = Math.floor(h), mm = Math.floor((h - hh) * 60), r = rateAt(t);
  const vis = 1 - ss(seg(t, T.plan - .4, T.plan + .4));
  if (vis > 0) {
    g.save(); g.globalAlpha = vis; g.fillStyle = 'rgba(12,10,8,.72)'; g.beginPath(); g.roundRect(48, 44, 330, 104, 12); g.fill();
    g.font = '600 52px "Overpass Mono"'; g.fillStyle = '#f4ead8'; g.textBaseline = 'alphabetic';
    g.fillText(`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`, 70, 104);
    g.font = '600 22px "Overpass Mono"'; g.fillStyle = r < 2 ? '#5fe08a' : '#ffb35c';
    g.fillText(r < 2 ? '×1 REAL TIME' : `×${r} TIME-LAPSE`, 72, 134); g.restore();
    TEXTS_NOW.push({ id: 'clock', text: 'clock', x0: 48, y0: 44, x1: 378, y1: 148, pass: true });
  }
  // captions
  for (const [i, c] of CAPS.entries()) {
    if (t < c.t0 - .2 || t > c.t1 + .2) continue;
    const a = Math.min(ss(seg(t, c.t0 - .2, c.t0)), 1 - ss(seg(t, c.t1, c.t1 + .2)));
    const b = panel(c.text, SW / 2, SH - 120, 40, a);
    if (t >= c.t0 && t <= c.t1) TEXTS_NOW.push({ id: 'cap' + i, text: c.text, ...b });
  }
  // plan: dimensions + labels, then the title plate
  if (t > T.plan - .3) {
    const a0 = ss(seg(t, T.plan - .3, T.plan + .2));
    const c00 = toScreen(W(0, 0, 0)), c10 = toScreen(W(RW, 0, 0)), c01 = toScreen(W(0, 0, RD)), c11 = toScreen(W(RW, 0, RD));
    g.save(); g.globalAlpha = a0; g.strokeStyle = 'rgba(255,190,110,.85)'; g.fillStyle = '#ffcf8f'; g.lineWidth = 2; g.font = '600 30px "Overpass Mono"';
    const dim = (p, q, off, label) => {
      const dx = q.x - p.x, dy = q.y - p.y, L = Math.hypot(dx, dy), nx = -dy / L * off, ny = dx / L * off;
      g.beginPath(); g.moveTo(p.x + nx, p.y + ny); g.lineTo(q.x + nx, q.y + ny); g.stroke();
      for (const s of [p, q]) { g.beginPath(); g.moveTo(s.x + nx * .6, s.y + ny * .6); g.lineTo(s.x + nx * 1.4, s.y + ny * 1.4); g.stroke(); }
      g.save(); g.translate((p.x + q.x) / 2 + nx * 1.9, (p.y + q.y) / 2 + ny * 1.9); let ang = Math.atan2(dy, dx); if (Math.abs(ang) > Math.PI / 2) ang += Math.PI; g.rotate(ang);
      g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(label, 0, 0); g.restore();
    };
    dim(c00, c01, -34, '≈ 6.5 m'); dim(c00, c10, 34, '≈ 4.0 m'); g.restore();
    TEXTS_NOW.push({ id: 'dims', text: '≈ 6.5 m ≈ 4.0 m', x0: 0, y0: 0, x1: 10, y1: 10, pass: true });
    for (const L of LABELS) {
      const t0 = T.plan + L.beat * BEAT; if (t < t0 - .15) continue;
      const a = ss(seg(t, t0 - .15, t0 + .1)), p = toScreen(W(L.x, .5, L.d));
      const b = panel(L.text, p.x, p.y, 34, a, { col: '#ffd9a0' });
      if (t >= t0) TEXTS_NOW.push({ id: 'lab' + L.beat, text: L.text, ...b });
    }
    const tt = T.plan + 7 * BEAT;
    if (t > tt - .2) {
      const a = ss(seg(t, tt - .2, tt + .2));
      const b = panel("SHIVEN'S ROOM · THE NEW LAYOUT", SW / 2, 78, 44, a, { col: '#ffe2b0' });
      if (t >= tt) TEXTS_NOW.push({ id: 'title2', text: "SHIVEN'S ROOM · THE NEW LAYOUT", ...b });
    }
  }
}

// ——— Frame ———
const TITLE = "SHIVEN'S ROOM";
window.DUR = DUR;
let LAST = null;
function setup(t) {
  const tw = worldT(t);
  pose(shiven, SHIVEN, tw); pose(friend, FRIEND, tw);
  R.door.rotation.y = DOOR(tw) * 1.45;
  R.chair.rotation.y = actorAt(SHIVEN, tw).sit > .5 && tw < 20 ? 0 : .5;
  drawTitle(R, TITLE, i => ss(seg(t, T.title0 + i * .15, T.title0 + i * .15 + .1)));
  const L = lightAt(t, tw);
  const s = shot(t, tw);
  camera.position.copy(s.pos); camera.up.copy(s.up); camera.fov = s.fov; camera.near = t > T.rampA && t < T.release + 1 ? .05 : .5; camera.updateProjectionMatrix(); camera.lookAt(s.look); camera.updateMatrixWorld();
  // band follows its target on screen; physical focus at the target's distance
  const p = s.tgt.clone().project(camera);
  const d = post.dof; d.band.y = clamp((p.y + 1) / 2, .1, .9); d.band.w = s.bw; d.band.amp = s.amp; d.band.mix = s.mix; d.band.pow = 1.25;
  d.focus = camera.position.distanceTo(s.tgt); d.aper = s.aper; d.maxCoc = QS.has('nodof') ? 0 : 28;
  const gr = post.grade.uniforms;
  gr.sat.value = lerp(1.4, 1.12, L.night); gr.contrast.value = .38; gr.warm.value = .25 + .35 * L.night; gr.amt.value = .32; gr.expo.value = lerp(1.0, 1.55, L.night);
}
window.render = (t) => { setup(t); post.composer.render(); overlay(t); };
window.TEXTS = (t) => { setup(t); overlay(t); return TEXTS_NOW; };

// sound events: story beats + footsteps + keyboard
const EV = [...EVENTS];
for (const [K, who] of [[SHIVEN, 'shiven'], [FRIEND, 'friend']]) for (let t = 0; t < DUR; t += STEP) { const tw = worldT(t); if (rateAt(t) > 1 && actorAt(K, tw).moving) EV.push({ t: +t.toFixed(3), type: 'step', who }); }
{ const r = mulberry(5); for (let t = 12.9; t < 19.1; t += STEP) if (r() < .55) EV.push({ t: +t.toFixed(3), type: 'key' }); }
window.EV = EV.sort((a, b) => a.t - b.t);
if (!QS.has('noready')) { window.render(0); window.READY = true; }
