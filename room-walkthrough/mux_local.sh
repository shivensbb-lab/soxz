#!/bin/sh
# Fallback master + mux for machines whose system ffmpeg is older than 7 (mux.sh refuses those).
# Two-pass loudnorm to −14 LUFS / −1.5 dBTP, then mux with the picture (copied), light grain.
# usage: sh mux_local.sh video.mp4 mix.wav out.mp4 FFMPEG
set -e
V=$1; A=$2; O=$3; FF=${4:-ffmpeg}
J=$("$FF" -hide_banner -nostats -i "$A" -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g() { echo "$J" | sed -n "s/.*\"$1\" : \"\([^\"]*\)\".*/\1/p"; }
LN="loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true"
TMP="$O.tmp.mp4"
"$FF" -hide_banner -loglevel error -y -i "$V" -i "$A" -filter_complex "[0:v]noise=alls=2:allf=t,format=yuv420p[v];[1:a]$LN,aresample=48000,alimiter=limit=0.84:level=false[a]" \
  -map "[v]" -map "[a]" -c:v libx264 -crf 18 -preset slow -c:a aac -b:a 192k -shortest -movflags +faststart "$TMP"
mv "$TMP" "$O"
"$FF" -hide_banner -nostats -i "$O" -af ebur128=peak=true -f null - 2>&1 | sed -n '/Summary/,$p' | grep -E "I:|Peak:" | head -2
echo "$O"
