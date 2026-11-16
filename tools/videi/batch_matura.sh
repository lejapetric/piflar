#!/bin/bash
# bash batch_matura.sh <predmet> <matura json> <pola-id>
set -e
cd "$(dirname "$0")"
predmet=$1; json=$2; pola=$3
python3 extract_matura.py "$json" work/m_$pola.json $predmet "$pola" > /dev/null
for t in temna svetla; do
  node render.js work/m_$pola.json $t work/m_$pola/$t > /dev/null
  python3 compose.py work/m_$pola.json work/m_$pola/$t ../../public/videi/$predmet/matura/$pola $t > /dev/null
done
echo "KONEC $pola"
