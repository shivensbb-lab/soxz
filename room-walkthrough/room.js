// The room, built to scale in metres. Room coordinates: x from the left wall (0..4), d from the front wall (0..6.5).
// World: x = x, z = −d, y up. The ceiling is lifted off (dollhouse cutaway); the front wall is cut down to 1.05 m.
import * as THREE from 'three';
import { mulberry } from '/core/lib.js';

export const RW = 4.0, RD = 6.5, RH = 2.8;
export const W = (x, y, d) => new THREE.Vector3(x, y, -d);

function tex(w, h, draw, repeat) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); }
  return t;
}
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: .8, metalness: 0, ...o });

// ——— Textures ———
const floorTex = tex(1024, 1024, (g, w, h) => {
  const r = mulberry(4); g.fillStyle = '#2b1f17'; g.fillRect(0, 0, w, h);
  const pw = w / 5;                                    // 5 planks of 0.2 m across a 1 m tile
  for (let i = 0; i < 5; i++) {
    let y = -r() * h;
    while (y < h) {
      const len = h * (0.55 + r() * 0.7), base = 30 + r() * 16;
      g.fillStyle = `rgb(${base + 14},${base * .72 + 6},${base * .5})`; g.fillRect(i * pw + 1, y + 1, pw - 2, len - 2);
      for (let k = 0; k < 26; k++) {                     // grain
        g.strokeStyle = `rgba(${r() < .5 ? '20,12,8' : '90,66,44'},${.08 + r() * .12})`; g.lineWidth = 1 + r() * 2;
        const xx = i * pw + 4 + r() * (pw - 8); g.beginPath(); g.moveTo(xx, y); g.bezierCurveTo(xx + r() * 8 - 4, y + len * .3, xx + r() * 8 - 4, y + len * .7, xx + r() * 6 - 3, y + len); g.stroke();
      }
      g.fillStyle = 'rgba(0,0,0,.55)'; g.fillRect(i * pw, y, pw, 2); y += len;
    }
    g.fillStyle = 'rgba(0,0,0,.6)'; g.fillRect(i * pw, 0, 2, h);
  }
}, [RW, RD]);

const rugTex = tex(1024, 1170, (g, w, h) => {                // a fictional sea chart: navy, cream lines, gold compass
  g.fillStyle = '#1d2a3c'; g.fillRect(0, 0, w, h);
  const r = mulberry(9);
  g.strokeStyle = 'rgba(232,214,170,.18)'; g.lineWidth = 2;
  for (let x = 0; x <= w; x += w / 8) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
  for (let y = 0; y <= h; y += h / 9) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
  g.fillStyle = 'rgba(214,190,140,.55)';
  for (let k = 0; k < 7; k++) {                          // islands
    const cx = r() * w, cy = r() * h, s = 30 + r() * 70; g.beginPath();
    for (let a = 0; a <= 24; a++) { const th = a / 24 * 6.283, rr = s * (0.6 + 0.5 * Math.sin(th * 3 + k) * r() + .3); g.lineTo(cx + Math.cos(th) * rr, cy + Math.sin(th) * rr * .8); }
    g.fill();
  }
  g.strokeStyle = 'rgba(214,170,90,.75)'; g.lineWidth = 3; g.setLineDash([14, 10]);   // a voyage line
  g.beginPath(); g.moveTo(60, h - 80); g.bezierCurveTo(w * .3, h * .5, w * .6, h * .9, w - 70, 90); g.stroke(); g.setLineDash([]);
  const cx = w * .5, cy = h * .45;                     // compass rose
  g.strokeStyle = 'rgba(214,170,90,.9)'; g.lineWidth = 4; g.beginPath(); g.arc(cx, cy, 150, 0, 6.283); g.stroke();
  g.beginPath(); g.arc(cx, cy, 120, 0, 6.283); g.stroke();
  g.fillStyle = 'rgba(214,170,90,.9)';
  for (let a = 0; a < 8; a++) { const th = a * Math.PI / 4, L = a % 2 ? 110 : 190; g.beginPath(); g.moveTo(cx + Math.cos(th) * L, cy + Math.sin(th) * L); g.lineTo(cx + Math.cos(th + .35) * 26, cy + Math.sin(th + .35) * 26); g.lineTo(cx + Math.cos(th - .35) * 26, cy + Math.sin(th - .35) * 26); g.fill(); }
  g.strokeStyle = '#c9a25c'; g.lineWidth = 18; g.strokeRect(9, 9, w - 18, h - 18);
});

const flagTex = tex(512, 340, (g, w, h) => {               // a generic pirate flag: skull and crossed bones
  g.fillStyle = '#0d0d0e'; g.fillRect(0, 0, w, h);
  g.strokeStyle = '#ece6da'; g.lineCap = 'round'; g.lineWidth = 26;
  g.beginPath(); g.moveTo(w * .3, h * .78); g.lineTo(w * .7, h * .42); g.moveTo(w * .7, h * .78); g.lineTo(w * .3, h * .42); g.stroke();
  g.fillStyle = '#ece6da'; g.beginPath(); g.arc(w / 2, h * .42, 74, 0, 6.283); g.fill(); g.fillRect(w / 2 - 44, h * .5, 88, 60);
  g.fillStyle = '#0d0d0e'; g.beginPath(); g.arc(w / 2 - 28, h * .42, 20, 0, 6.283); g.arc(w / 2 + 28, h * .42, 20, 0, 6.283); g.fill();
  g.fillStyle = '#d9b44a'; g.beginPath(); g.ellipse(w / 2, h * .29, 118, 22, 0, 0, 6.283); g.fill();   // a straw hat brim
  g.beginPath(); g.ellipse(w / 2, h * .23, 70, 46, 0, Math.PI, 0); g.fill(); g.fillStyle = '#b32020'; g.fillRect(w / 2 - 70, h * .25, 140, 12);
});

function posterTex(seed, tone) {
  return tex(256, 360, (g, w, h) => {
    const r = mulberry(seed);
    g.fillStyle = '#d8c7a2'; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(120,90,50,.25)'; for (let i = 0; i < 40; i++) g.fillRect(r() * w, r() * h, 2 + r() * 20, 1 + r() * 3);
    g.fillStyle = '#3b2a1a'; g.font = '900 48px Overpass'; g.textAlign = 'center'; g.fillText('WANTED', w / 2, 58);
    g.fillStyle = '#efe5cc'; g.fillRect(28, 76, w - 56, 180);
    g.fillStyle = tone; g.beginPath(); g.arc(w / 2, 150, 42, 0, 6.283); g.fill(); g.fillRect(w / 2 - 62, 196, 124, 60);
    g.fillStyle = '#3b2a1a'; g.font = '800 26px Overpass'; g.fillText('DEAD OR ALIVE', w / 2, 290);
    g.font = '700 30px Overpass'; g.fillText('฿ ' + (1 + Math.floor(r() * 9)) + ',000,000', w / 2, 330);
  });
}
const shipTex = tex(512, 288, (g, w, h) => {               // landscape wallpaper: a ship at sunset
  const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#2b3d6b'); gr.addColorStop(.55, '#f08a4b'); gr.addColorStop(.56, '#1d4b6e'); gr.addColorStop(1, '#0e2236');
  g.fillStyle = gr; g.fillRect(0, 0, w, h); g.fillStyle = '#ffd38a'; g.beginPath(); g.arc(w * .7, h * .5, 30, 0, 6.283); g.fill();
  g.fillStyle = '#6b3d1e'; g.beginPath(); g.moveTo(150, 190); g.lineTo(360, 190); g.lineTo(330, 222); g.lineTo(175, 222); g.fill();
  g.fillStyle = '#f2ead8'; g.beginPath(); g.moveTo(250, 70); g.lineTo(250, 182); g.lineTo(320, 182); g.fill(); g.beginPath(); g.moveTo(240, 90); g.lineTo(240, 182); g.lineTo(180, 182); g.fill();
});
const swordTex = tex(288, 512, (g, w, h) => {              // portrait wallpaper: a green-clad swordsman silhouette
  const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#0c1f16'); gr.addColorStop(1, '#1f5a38');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
  g.fillStyle = '#081009'; g.beginPath(); g.arc(w / 2, 150, 46, 0, 6.283); g.fill(); g.fillRect(w / 2 - 70, 196, 140, 260);
  g.strokeStyle = '#d7e7da'; g.lineWidth = 6; g.beginPath(); g.moveTo(50, 430); g.lineTo(150, 230); g.moveTo(238, 430); g.lineTo(138, 230); g.moveTo(144, 240); g.lineTo(144, 60); g.stroke();
});
const titleTex = tex(2048, 160, (g, w, h) => { g.clearRect(0, 0, w, h); });   // drawn per frame (letters light up)

// ——— Builder ———
export function buildRoom(scene) {
  const R = { glow: {}, lights: {}, mats: {} };
  const add = (geo, mat, x, y, d, o = {}) => {
    const m = new THREE.Mesh(geo, mat); m.position.copy(W(x, y, d));
    if (o.ry) m.rotation.y = o.ry; if (o.rx) m.rotation.x = o.rx; if (o.rz) m.rotation.z = o.rz;
    m.castShadow = o.cast ?? true; m.receiveShadow = o.recv ?? true; (o.parent || scene).add(m); return m;
  };
  const box = (w, h, dd, mat, x0, y0, d0, o) => add(new THREE.BoxGeometry(w, h, dd), mat, x0 + w / 2, y0 + h / 2, d0 + dd / 2, o);

  const wall = std('#2c2c30', { roughness: .92 }), wallOut = std('#d8d2c6', { roughness: .9 });
  const black = std('#151517', { roughness: .45, metalness: .3 }), walnut = std('#3a2618', { roughness: .55 });
  const glass = new THREE.MeshStandardMaterial({ color: '#9fb3bf', roughness: .05, metalness: .2, transparent: true, opacity: .14, depthWrite: false });
  R.mats.glass = glass;

  // floor (dark smoked oak) and the slab under the model
  floorTex.repeat.set(RW, RD);
  box(RW, .02, RD, std('#ffffff', { map: floorTex, roughness: .42 }), 0, -.02, 0, { cast: false });
  box(RW + 2.2, .25, RD + 1.9, wallOut, -.2, -.27, -.2, { cast: false });
  // balcony (back and right, wraps around) and the terrace far below
  box(RW + 1.8, .02, 1.6, std('#8c8478', { roughness: .85 }), 0, -.02, RD, { cast: false });
  box(1.6, .02, RD - 4.2, std('#8c8478', { roughness: .85 }), RW + .2, -.02, 4.2, { cast: false });
  const rail = std('#1d1d1f', { roughness: .4, metalness: .6 });
  box(RW + 1.8, .04, .05, rail, 0, 1.05, RD + 1.55); box(.05, .04, RD + 1.6 - 4.2, rail, RW + 1.75, 1.05, 4.2);
  box(RW + 1.8, 1.05, .02, glass, 0, 0, RD + 1.56, { cast: false }); box(.02, 1.05, RD + 1.6 - 4.2, glass, RW + 1.76, 0, 4.2, { cast: false });
  const leaf = std('#3f6e3a', { roughness: .7 }), pot = std('#2a2622', { roughness: .8 });
  for (const [x, d] of [[RW + .9, 4.9], [RW + 1.2, RD + .9], [.6, RD + 1.1]]) { box(.36, .4, .36, pot, x - .18, 0, d - .18); add(new THREE.SphereGeometry(.32, 16, 12), leaf, x, .72, d); }
  const ground = add(new THREE.PlaneGeometry(200, 200), std('#5f6b52', { roughness: 1 }), 2, -9, 3, { rx: -Math.PI / 2, cast: false });
  R.ground = ground;

  // walls (inner faces charcoal), the bulkhead ledge along the back and right, glass where the windows are
  box(.12, RH, RD + .12, wall, -.12, 0, -.12);                                      // left
  // front wall, cut down to 1.05 m, with the door gap at x 0.15–1.05
  box(.27, 1.05, .12, wall, -.12, 0, -.12); box(RW + .12 - 1.05, 1.05, .12, wall, 1.05, 0, -.12);
  box(.12, RH, 4.2, wall, RW, 0, 0);                                                // right, solid part
  box(.12, .32, RD - 4.2, wall, RW, RH - .32, 4.2);                                 // right, header over the glass
  box(RW + .12, .32, .12, wall, -.12, RH - .32, RD);                                // back header
  box(.06, RH - .32, RD - 4.2, glass, RW + .03, 0, 4.2, { cast: false });           // right glass
  box(RW, RH - .32, .06, glass, 0, 0, RD + .03, { cast: false });                    // back glass
  const mull = std('#202022', { metalness: .5, roughness: .4 });
  for (const x of [1.0, 2.0, 3.0]) box(.05, RH - .32, .07, mull, x, 0, RD + .02, { cast: false });
  box(.07, RH - .32, .05, mull, RW + .02, 0, 5.35, { cast: false });
  // bulkhead ledge (lowered ceiling) along back and right with the amber cove line under its lip
  box(RW, .3, .4, wall, 0, RH - .3, RD - .4); box(.4, .3, RD, wall, RW - .4, RH - .3, 0);
  // charcoal curtains, opened and bunched at the ends of the glass
  const cur = std('#3a3a3e', { roughness: 1 });
  const curtain = (w, x0, d0, along) => { const n = 7; for (let i = 0; i < n; i++) { const g = new THREE.CylinderGeometry(.055, .055, RH - .36, 10); along === 'x' ? add(g, cur, x0 + (i + .5) * w / n, (RH - .36) / 2, d0) : add(g, cur, x0, (RH - .36) / 2, d0 + (i + .5) * w / n); } };
  curtain(.5, .05, RD - .12, 'x'); curtain(.45, RW - .5, RD - .12, 'x'); curtain(.5, RW - .12, 4.25, 'd');

  // door (pivots on its left jamb)
  const doorG = new THREE.Group(); doorG.position.copy(W(.15, 0, 0)); scene.add(doorG);
  const leafM = add(new THREE.BoxGeometry(.9, 1.0, .04), walnut, .45, .5, 0, { parent: doorG }); leafM.position.set(.45, .5, 0);
  R.door = doorG;

  // cove strips (glow) along the bulkhead and the top of the other walls
  const amber = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffae55') });
  R.mats.cove = amber;
  const coves = [
    add(new THREE.BoxGeometry(.03, .03, RD), amber, .03, 2.3, RD / 2, { cast: false, recv: false }),          // left
    add(new THREE.BoxGeometry(RW, .03, .03), amber, RW / 2, RH - .32, RD - .42, { cast: false, recv: false }),  // back
    add(new THREE.BoxGeometry(.03, .03, RD), amber, RW - .42, RH - .32, RD / 2, { cast: false, recv: false }), // right
    add(new THREE.BoxGeometry(RW, .03, .03), amber, RW / 2, 1.03, .06, { cast: false, recv: false }),           // front
  ];
  R.coves = coves;
  // title letters on the back bulkhead fascia, facing the room
  const tm = new THREE.MeshBasicMaterial({ map: titleTex, transparent: true, depthWrite: false });
  add(new THREE.PlaneGeometry(3.6, .28), tm, RW / 2 - .2, RH - .15, RD - .405, { cast: false, recv: false });
  R.titleTex = titleTex;

  // ——— Collection wall (left wall, d 0.9–3.5): no cabinets. A slatted walnut panel washed in amber, a floating
  // sideboard (manga hidden inside), a few hero pieces on top, and the cards in individual floating frames ———
  const shelfGlow = new THREE.MeshBasicMaterial({ color: '#ffb768' }); R.mats.shelf = shelfGlow;
  const slat = std('#4a3020', { roughness: .6 });
  for (let dd = .92; dd < 3.48; dd += .06) box(.025, 2.3, .03, slat, 0, 0, dd, { cast: false });
  box(.02, .015, 2.6, shelfGlow, .03, 2.31, .9, { cast: false, recv: false });            // wall-wash strip over the panel
  const side = std('#33221a', { roughness: .5 });
  box(.45, .5, 2.2, side, .03, .25, 1.1);                                                  // floating sideboard
  for (const dd of [1.65, 2.2, 2.75]) box(.004, .44, .005, std('#1c130d'), .48, .28, dd, { cast: false });   // door seams
  box(.43, .012, 2.16, shelfGlow, .04, .236, 1.12, { cast: false, recv: false });         // under-glow onto the floor
  const top = .75;
  // centrepiece: a swordsman figure on a black plinth under a clear acrylic cover, spotlit
  {
    const dc = 2.2;
    box(.18, .12, .18, black, .16, top, dc - .09);
    const body = std('#2c7a45', { roughness: .45 }), y = top + .12;
    add(new THREE.CylinderGeometry(.055, .075, .28, 16), body, .25, y + .14, dc);
    add(new THREE.SphereGeometry(.05, 18, 14), std('#e3bd95', { roughness: .55 }), .25, y + .33, dc);
    add(new THREE.SphereGeometry(.04, 14, 12), std('#4fae5c', { roughness: .6 }), .25, y + .36, dc);
    const steel = std('#e6ecef', { metalness: .9, roughness: .15 });
    add(new THREE.BoxGeometry(.008, .34, .016), steel, .29, y + .24, dc - .09, { rx: .5 });
    add(new THREE.BoxGeometry(.008, .34, .016), steel, .29, y + .24, dc + .09, { rx: -.5 });
    box(.26, .44, .26, glass, .12, y, dc - .13, { cast: false });                          // acrylic cover
    R.centre = W(.25, y + .2, dc);
  }
  // two fruit replicas on small stands, a ship model, the straw hat
  for (const [dd, col] of [[1.4, '#6b3fa0'], [1.62, '#e0612b']]) {
    add(new THREE.CylinderGeometry(.03, .04, .05, 14), black, .25, top + .025, dd);
    add(new THREE.SphereGeometry(.05, 18, 14), std(col, { roughness: .35 }), .25, top + .1, dd);
  }
  {
    const dd = 2.85, hull = std('#6b3d1e', { roughness: .5 }), sail = std('#f2ead8', { roughness: .9, side: THREE.DoubleSide });
    box(.09, .07, .36, hull, .2, top, dd - .18);
    add(new THREE.PlaneGeometry(.2, .2), sail, .245, top + .2, dd - .06, { ry: Math.PI / 2, cast: false });
    add(new THREE.PlaneGeometry(.16, .16), sail, .245, top + .17, dd + .1, { ry: Math.PI / 2, cast: false });
  }
  add(new THREE.CylinderGeometry(.11, .12, .012, 28), std('#d9b44a', { roughness: .85 }), .26, top + .006, 3.17);
  add(new THREE.CylinderGeometry(.065, .07, .07, 24), std('#d9b44a', { roughness: .85 }), .26, top + .045, 3.17);
  add(new THREE.CylinderGeometry(.071, .071, .02, 24), std('#b32020', { roughness: .7 }), .26, top + .03, 3.17);
  // the cards: each in its own floating frame, one neat row above the sideboard
  const cardCols = ['#c8352b', '#2f8f4e', '#e3c043', '#3b6fb4', '#7a4fa8'];
  cardCols.forEach((col, i) => {
    const dd = 1.5 + i * .3;
    if (Math.abs(dd - 2.1) < .01) return;                                                 // leave the space above the centrepiece clear
    box(.025, .22, .17, black, .03, 1.38, dd - .085);
    box(.004, .2, .15, std('#efe7d6', { roughness: .9 }), .056, 1.39, dd - .075, { cast: false });
    box(.004, .088, .063, std(col, { emissive: col, emissiveIntensity: .08, roughness: .3 }), .06, 1.446, dd - .0315, { cast: false });
  });
  // a larger framed card above the centrepiece
  box(.025, .32, .24, black, .03, 1.5, 2.08); box(.004, .3, .22, std('#efe7d6', { roughness: .9 }), .056, 1.51, 2.09, { cast: false });
  box(.004, .132, .095, std('#2f8f4e', { emissive: '#2f8f4e', emissiveIntensity: .08, roughness: .3 }), .06, 1.594, 2.152, { cast: false });
  R.lights.cab0 = W(.6, 1.9, 1.5); R.lights.cab1 = W(.55, 1.75, 2.2); R.lights.cab2 = W(.6, 1.9, 2.9);

  // ——— Bed: headboard on the left wall, d 4.55–6.15 ———
  box(2.0, .28, 1.6, walnut, .1, 0, 4.55); box(.1, 1.0, 1.7, std('#2a2420', { roughness: .9 }), 0, 0, 4.5);
  box(1.95, .2, 1.56, std('#d9d4ca', { roughness: .95 }), .12, .28, 4.57);
  box(1.35, .08, 1.6, std('#2e3237', { roughness: 1 }), .72, .44, 4.55);
  box(.4, .06, 1.62, std('#2f5a3e', { roughness: 1 }), 1.62, .5, 4.54);
  for (const dd of [4.9, 5.75]) add(new THREE.BoxGeometry(.22, .14, .55), std('#3a3d42', { roughness: 1 }), .3, .55, dd);
  const flag = add(new THREE.PlaneGeometry(1.1, .73), new THREE.MeshStandardMaterial({ map: flagTex, roughness: .9 }), .015, 1.55, 5.35, { ry: Math.PI / 2, cast: false });
  R.flag = flag; R.lights.flag = W(.15, 1.55, 5.35);
  // nightstand + lamp
  box(.42, .5, .42, walnut, .02, 0, 4.06); add(new THREE.CylinderGeometry(.08, .1, .18, 18), new THREE.MeshBasicMaterial({ color: '#ffcf8f' }), .22, .62, 4.27, { cast: false });
  R.lamp = scene.children[scene.children.length - 1];

  // ——— Desk on the right wall (d 0.5–2.27), PC on the desk, 1 landscape + 1 portrait monitor ———
  const dx0 = RW - .8;
  box(.8, .035, 1.77, std('#141416', { roughness: .4 }), dx0, .72, .5);
  for (const dd of [.62, 2.15]) { box(.07, .72, .07, black, dx0 + .55, 0, dd - .035); box(.6, .03, .07, black, dx0 + .15, 0, dd - .035); }
  box(.62, .01, 1.0, std('#1d2026', { roughness: .9 }), dx0 + .08, .755, .62);       // desk mat
  box(.15, .02, .44, std('#e8e6e0', { roughness: .5 }), dx0 + .2, .765, .82);       // keyboard
  add(new THREE.BoxGeometry(.1, .03, .06), std('#e8e6e0', { roughness: .5 }), dx0 + .25, .77, 1.42);
  const scrL = new THREE.MeshBasicMaterial({ map: shipTex }), scrP = new THREE.MeshBasicMaterial({ map: swordTex });
  R.mats.scrL = scrL; R.mats.scrP = scrP;
  box(.03, .38, .63, black, RW - .18, 1.02, .66); add(new THREE.PlaneGeometry(.6, .34), scrL, RW - .195, 1.21, .975, { ry: -Math.PI / 2, cast: false });
  box(.03, .63, .38, black, RW - .18, .9, 1.36); add(new THREE.PlaneGeometry(.34, .6), scrP, RW - .195, 1.215, 1.55, { ry: -Math.PI / 2, cast: false });
  box(.04, .2, .04, black, RW - .12, .75, .95); box(.04, .1, .04, black, RW - .12, .75, 1.53);
  // PC tower on the desk's back end, glass side facing the room, three RGB fans
  box(.5, .5, .25, std('#0f0f11', { roughness: .3, metalness: .4 }), dx0 + .25, .755, 1.95);
  box(.01, .46, .21, glass, dx0 + .24, .775, 1.97, { cast: false });
  R.fans = [];
  for (let i = 0; i < 3; i++) { const m = new THREE.MeshBasicMaterial({ color: '#3ad1ff' }); R.fans.push(m); add(new THREE.TorusGeometry(.055, .012, 8, 24), m, dx0 + .245, .87 + i * .13, 2.075, { ry: Math.PI / 2, cast: false, recv: false }); }
  R.lights.pc = W(dx0 + .1, 1.0, 2.07);
  const deskStrip = new THREE.MeshBasicMaterial({ color: '#36e07a' }); R.mats.deskStrip = deskStrip;
  box(.01, .01, 1.7, deskStrip, dx0 + .02, .69, .54, { cast: false, recv: false });
  // gaming chair
  const chair = new THREE.Group(); chair.position.copy(W(2.85, 0, 1.4)); scene.add(chair);
  const cm = std('#1a1a1d', { roughness: .6 });
  for (const [g, x, y, z] of [[new THREE.BoxGeometry(.5, .1, .5), 0, .48, 0], [new THREE.BoxGeometry(.1, .8, .52), -.25, .92, 0], [new THREE.CylinderGeometry(.03, .03, .4, 8), 0, .25, 0], [new THREE.CylinderGeometry(.3, .3, .04, 5), 0, .05, 0]]) {
    const m = new THREE.Mesh(g, cm); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; chair.add(m);
  }
  R.chair = chair;
  // wanted posters ×4 on the solid right wall above the desk
  ['#2f8f4e', '#c8352b', '#e3c043', '#e68a2e'].forEach((tone, i) => {
    const dd = .72 + i * .42;
    box(.025, .45, .33, std('#1a120c', { roughness: .6 }), RW - .025, 1.6, dd - .165);
    add(new THREE.PlaneGeometry(.29, .41), new THREE.MeshStandardMaterial({ map: posterTex(30 + i, tone), roughness: .9 }), RW - .028, 1.825, dd, { ry: -Math.PI / 2, cast: false });
  });

  // ——— TV + floating console on the right wall (centre d 3.5) ———
  box(.05, .72, 1.25, black, RW - .05, 1.0, 2.875);
  const tvM = new THREE.MeshBasicMaterial({ color: '#050608' }); R.mats.tv = tvM;
  add(new THREE.PlaneGeometry(1.2, .68), tvM, RW - .052, 1.36, 3.5, { ry: -Math.PI / 2, cast: false });
  box(.38, .2, 1.4, std('#111113', { roughness: .5 }), RW - .38, .32, 2.8);
  box(.01, .01, 1.36, deskStrip, RW - .37, .31, 2.82, { cast: false, recv: false });
  R.lights.tv = W(RW - .4, 1.3, 3.5);

  // ——— Rug, sofa (faces the TV), coffee table ———
  box(2.1, .012, 2.4, std('#ffffff', { map: rugTex, roughness: 1 }), .9, 0, 2.0, { cast: false });
  const sofa = std('#3d4236', { roughness: .95 }), sofaD = std('#30342b', { roughness: .95 });
  box(.9, .3, 1.9, sofaD, 1.25, .08, 2.55); box(.2, .45, 1.9, sofa, 1.25, .38, 2.55);
  box(.9, .22, .14, sofaD, 1.25, .38, 2.55); box(.9, .22, .14, sofaD, 1.25, .38, 4.31);
  for (const dd of [2.69, 3.5]) box(.68, .12, .8, sofa, 1.45, .38, dd + .02);
  box(.12, .3, .3, std('#2f5a3e', { roughness: 1 }), 1.47, .5, 2.75); box(.12, .3, .3, std('#7a2b25', { roughness: 1 }), 1.47, .5, 4.0);
  add(new THREE.CylinderGeometry(.25, .25, .04, 32), walnut, 2.6, .4, 3.5); add(new THREE.CylinderGeometry(.04, .06, .38, 12), black, 2.6, .19, 3.5);

  return R;
}

// Title letters on the fascia: letter i is lit when lit[i] > 0
export function drawTitle(R, text, litAt) {
  const c = R.titleTex.image, g = c.getContext('2d'); g.clearRect(0, 0, c.width, c.height);
  g.font = '800 120px Overpass'; g.textBaseline = 'middle';
  const total = g.measureText(text).width; let x = (c.width - total) / 2;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i], w = g.measureText(ch).width, k = litAt(i);
    g.fillStyle = `rgba(255,${170 + 40 * k},${90 + 40 * k},${.12 + .88 * k})`;
    g.shadowColor = 'rgba(255,170,80,.9)'; g.shadowBlur = 30 * k; g.fillText(ch, x, c.height / 2 + 6); x += w;
  }
  R.titleTex.needsUpdate = true;
}
