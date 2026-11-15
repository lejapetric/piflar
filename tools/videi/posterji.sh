#!/bin/bash
# Za vsak video v public/videi naredi naslovno sličico (poster) .jpg, če je še ni.
find public/videi -name "*.mp4" | while read f; do
  j="${f%.mp4}.jpg"
  [ -f "$j" ] && [ "$j" -nt "$f" ] && continue
  ffmpeg -loglevel error -y -ss 2.8 -i "$f" -frames:v 1 -vf scale=640:-2 -q:v 5 "$j" < /dev/null
done
