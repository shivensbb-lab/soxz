"""Top-view floor plan of the new layout → layout.svg  (run: python3 layout.py)
Same numbers as the film (TREATMENT.md). Room size is assumed (≈ 4.0 × 6.5 m) until measured."""
S, ox, oy = 100, 170, 190          # px per metre, origin of the room's front-left corner
X = lambda x: ox + x * S
Y = lambda d: oy + d * S
out = []
def rect(x0, d0, w, dd, fill, stroke='#c9a25c', rx=4, sw=2, dash=None):
    da = f' stroke-dasharray="{dash}"' if dash else ''
    out.append(f'<rect x="{X(x0):.0f}" y="{Y(d0):.0f}" width="{w*S:.0f}" height="{dd*S:.0f}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{da}/>')
def text(x, d, s, size=16, w=700, col='#f4ead8', anchor='middle', rot=0):
    tr = f' transform="rotate({rot} {X(x):.0f} {Y(d):.0f})"' if rot else ''
    out.append(f'<text x="{X(x):.0f}" y="{Y(d):.0f}" text-anchor="{anchor}" font-size="{size}" font-weight="{w}" fill="{col}"{tr}>{s}</text>')

RW, RD = 4.0, 6.5
rect(0, RD, 5.8, 1.5, '#34322d', '#6b6455', rx=0); rect(RW, 4.2, 1.8, RD - 4.2, '#34322d', '#6b6455', rx=0)
text(2.9, RD + .85, 'BALCONY', 20); text(2.9, RD + 1.15, 'wraps round the back and right', 13, 400, '#d9c7a6')
rect(0, 0, RW, RD, '#3b2a1e', '#111', rx=0)
out.append(f'<path d="M{X(0)} {Y(RD)} L{X(0)} {Y(0)} L{X(.15)} {Y(0)} M{X(1.05)} {Y(0)} L{X(RW)} {Y(0)} L{X(RW)} {Y(4.2)}" stroke="#e8e0d0" stroke-width="10" fill="none"/>')
out.append(f'<path d="M{X(RW)} {Y(4.2)} L{X(RW)} {Y(RD)} L{X(0)} {Y(RD)}" stroke="#8fc3e0" stroke-width="6" fill="none" stroke-dasharray="14 6"/>')
out.append(f'<path d="M{X(.15)} {Y(0)} L{X(.15)} {Y(.9)} A{.9*S} {.9*S} 0 0 0 {X(1.05)} {Y(0)}" stroke="#c9a25c" stroke-width="2" fill="none" stroke-dasharray="5 4"/>')
text(.6, -.2, 'DOOR', 17, col='#ffcf8f')
# rug, sofa, table
rect(.9, 2.0, 2.1, 2.4, '#1d2a3c'); text(2.58, 4.3, 'sea-chart rug', 12, 400, '#c9a25c')
rect(1.25, 2.55, .9, 1.9, '#3d4236'); text(1.7, 3.45, 'SOFA', 18); text(1.7, 3.68, '190 × 90', 13, 400, '#d9c7a6')
out.append(f'<circle cx="{X(2.6)}" cy="{Y(3.5)}" r="{.25*S}" fill="#3a2618" stroke="#c9a25c" stroke-width="2"/>')
# collection wall: sideboard + framed cards, centrepiece
rect(.03, 1.1, .45, 2.2, '#33221a', '#ffb35c')
out.append(f'<rect x="{X(.12):.0f}" y="{Y(2.07):.0f}" width="{.26*S:.0f}" height="{.26*S:.0f}" fill="none" stroke="#9fd0e6" stroke-width="2"/>')
text(.255, 2.2, 'COLLECTION SIDEBOARD', 13, col='#ffcf8f', rot=-90)
# bed + nightstand
rect(.02, 4.06, .42, .42, '#3a2618'); rect(0, 4.55, 2.1, 1.6, '#2e3237')
text(1.05, 5.3, 'BED', 18); text(1.05, 5.53, '160 × 200 · headboard on wall', 13, 400, '#d9c7a6')
# desk, PC, chair, posters
rect(3.2, .5, .8, 1.77, '#141416'); text(3.6, 1.25, 'DESK', 17); text(3.6, 1.47, '177 × 80', 13, 400, '#d9c7a6')
rect(3.45, 1.97, .5, .25, '#0f0f11', '#3ad1ff'); text(3.7, 2.15, 'PC', 12, col='#9be6ff')
out.append(f'<circle cx="{X(2.85)}" cy="{Y(1.4)}" r="{.25*S}" fill="#1a1a1d" stroke="#888" stroke-width="2"/>')
text(2.85, 1.0, 'chair', 12, 400, '#bbb')
text(3.95, .36, 'wanted posters on the wall above the desk', 12, 400, '#d9c7a6', 'end')
# TV + console
rect(3.62, 2.8, .38, 1.4, '#111113'); out.append(f'<rect x="{X(3.94):.0f}" y="{Y(2.88):.0f}" width="7" height="{1.24*S:.0f}" fill="#6fa8ff"/>')
text(3.81, 3.5, 'TV 55"', 14, rot=-90)
# walkway
out.append(f'<path d="M{X(.6)} {Y(.25)} C{X(.9)} {Y(1.2)},{X(2.2)} {Y(1.6)},{X(2.95)} {Y(2.5)} C{X(3.2)} {Y(3.0)},{X(3.1)} {Y(4.2)},{X(3.05)} {Y(6.3)}" stroke="#5fe08a" stroke-width="3" fill="none" stroke-dasharray="2 8" stroke-linecap="round"/>')
text(3.15, 5.6, 'walkway', 13, 400, '#5fe08a', 'start')
# dimensions
out.append(f'<line x1="{X(0)}" y1="{Y(-.55)}" x2="{X(RW)}" y2="{Y(-.55)}" stroke="#ffcf8f" stroke-width="1.5"/>')
text(2, -.62, '≈ 4.0 m (assumed)', 15, 400, '#ffcf8f')
out.append(f'<line x1="{X(-.55)}" y1="{Y(0)}" x2="{X(-.55)}" y2="{Y(RD)}" stroke="#ffcf8f" stroke-width="1.5"/>')
text(-.65, 3.25, '≈ 6.5 m (assumed)', 15, 400, '#ffcf8f', rot=-90)

w, h = int(X(6.2)), int(Y(8.3))
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h + 40}" viewBox="0 0 {w} {h + 40}" font-family="Overpass, Helvetica, Arial, sans-serif">
<rect width="100%" height="100%" fill="#14110e"/>
<text x="40" y="52" font-size="26" font-weight="800" fill="#ffe2b0">SHIVEN'S ROOM · NEW LAYOUT</text>
<text x="40" y="80" font-size="14" fill="#a89a85">Top view · 1 m = 100 px · entrance at the top, balcony at the bottom</text>
{chr(10).join(out)}
<text x="40" y="{h - 4}" font-size="13" fill="#d9c7a6">No cabinets: sideboard 220 × 45, framed cards above, centrepiece under acrylic (blue square).</text>
<text x="40" y="{h + 18}" font-size="13" fill="#a89a85">Dashed blue = glass to the balcony. Room size is assumed: measure it and the plan can be corrected.</text>
</svg>'''
open(__file__.replace('layout.py', 'layout.svg'), 'w').write(svg)
print('layout.svg', w, h + 40)
