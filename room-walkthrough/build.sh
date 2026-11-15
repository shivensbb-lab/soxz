#!/bin/sh
# One command rebuilds the film: events → picture → score/foley mix → master + mux → poster.
set -e
LIB=${LIB:-/root/lemo-opuscar}
export LIB
HERE=$(cd "$(dirname "$0")" && pwd)
[ -f "$LIB/core/render/video.mjs" ] || { echo "set LIB to the Lemo-Opuscar library folder"; exit 1; }
cd "$LIB"
export LEMO_ANGLE=${LEMO_ANGLE:-swiftshader}      # cloud VMs without a GPU; on a Mac use LEMO_ANGLE=metal
SS=${SS:-1}                                       # 2 = supersampled (sharper, ~4× slower)
"$LIB/.venv/bin/python" core/audio/sampler.py --need "$HERE/mix.py"
node core/render/events.mjs "$HERE"
node core/render/video.mjs "$HERE" --fps 24 --workers 3 --q "ss=$SS" --out "$HERE/out/video.mp4"
"$LIB/.venv/bin/python" "$HERE/mix.py"
"$LIB/.venv/bin/python" core/render/srt.py "$HERE/cues.json" "$HERE/room-walkthrough.srt"
FFV=$(ffmpeg -version 2>/dev/null | sed -n '1s/^ffmpeg version n\{0,1\}\([0-9][0-9]*\)\..*/\1/p')
if [ -n "$FFV" ] && [ "$FFV" -ge 7 ]; then
  sh core/render/mux.sh "$HERE/out/video.mp4" "$HERE/out/mix.wav" "$HERE/room-walkthrough.mp4" 24 2
else   # older system ffmpeg: master with the project's bundled ffmpeg (pip install imageio-ffmpeg into .tools)
  FF=$("$HERE/.tools/bin/python" -c "import imageio_ffmpeg as i; print(i.get_ffmpeg_exe())")
  sh "$HERE/mux_local.sh" "$HERE/out/video.mp4" "$HERE/out/mix.wav" "$HERE/room-walkthrough.mp4" "$FF"
fi
node core/render/still.mjs "$HERE" 37.6 --q "ss=2" --out "$HERE/out"
cp "$HERE/out/t_37.6.jpg" "$HERE/poster.jpg"
