#!/bin/bash
# bash batch.sh <predmet> <pot do razlaga.html> <ciljna mapa videov>
set -e
cd "$(dirname "$0")"
predmet=$1; html=$2; cilj=$3
slug=$(echo "$cilj" | tr '/' '_')
python3 extract.py "$html" work/$slug.json $predmet > /dev/null
for t in temna svetla; do
  node render.js work/$slug.json $t work/$slug/$t > /dev/null
  python3 compose.py work/$slug.json work/$slug/$t ../../public/videi/$cilj $t
done
echo "KONEC $cilj"
