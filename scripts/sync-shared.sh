#!/usr/bin/env bash
#
# Each site deploys as its own Vercel project with its own Root Directory, so
# every site needs its own physical copy of the shared stylesheet, script and
# brand images. shared/ is the source of truth; this copies it into each site.
#
# Edit shared/, run this, commit. Never edit sites/*/assets/site.css directly —
# the next sync overwrites it.
#
#   ./scripts/sync-shared.sh          copy shared/ into every site
#   ./scripts/sync-shared.sh --check  fail if any copy is stale (for CI)
set -euo pipefail

cd "$(dirname "$0")/.."

SITES=(fire-bowls fire-pits outdoor-kitchens pizza-ovens)
FILES=(site.css site.js brand/logo.webp brand/favicon-32.png brand/icon-512.png brand/apple-touch-icon.png)

check=0
[[ "${1:-}" == "--check" ]] && check=1

stale=0
for site in "${SITES[@]}"; do
  dest="sites/$site/assets"
  mkdir -p "$dest"
  for f in "${FILES[@]}"; do
    target="$dest/$(basename "$f")"
    if [[ $check -eq 1 ]]; then
      if ! cmp -s "shared/$f" "$target"; then
        echo "stale: $target"
        stale=1
      fi
    else
      cp "shared/$f" "$target"
    fi
  done
done

if [[ $check -eq 1 ]]; then
  if [[ $stale -eq 1 ]]; then
    echo "Run ./scripts/sync-shared.sh and commit the result." >&2
    exit 1
  fi
  echo "All sites are in sync with shared/."
else
  echo "Synced shared/ into: ${SITES[*]}"
fi
