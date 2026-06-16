#!/usr/bin/env bash
# Oturum kapanışı güvenlik ağı (SessionEnd hook).
# Amaç: /clear veya oturum sonunda commit edilmemiş değişiklik varsa hiçbir iş
# kaybolmasın diye otomatik bir "WIP" güvenlik commit'i atmak.
# NOT: Bu script anlamlı bir HANDOFF özeti YAZAMAZ (o Claude'un işi, CLAUDE.md #8);
# burası yalnızca veri kaybını önleyen sigortadır. Push YAPMAZ (sürpriz/ağ yok).
#
# stdin: SessionEnd JSON ({ "reason": "clear" | "logout" | "prompt_input_exit" | "other", ... })
# Çıktı: yalnızca commit atıldıysa kullanıcıya bir systemMessage (JSON).

set -uo pipefail

# Git deposu değilse sessizce çık.
repo_root="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0
cd "$repo_root" || exit 0

# Kapanış nedenini oku (jq varsa). Yalnızca gerçek oturum kapanışlarında devreye gir.
reason="other"
if command -v jq >/dev/null 2>&1; then
  reason="$(cat | jq -r '.reason // "other"' 2>/dev/null || echo other)"
fi
case "$reason" in
  clear | logout | prompt_input_exit) ;;
  *) exit 0 ;;
esac

# Commit edilmemiş değişiklik (izlenen + izlenmeyen) yoksa çık.
if [ -z "$(git status --porcelain 2>/dev/null)" ]; then
  exit 0
fi

# .gitignore zaten .env/secret/node_modules/dist'i dışlıyor; -A güvenli.
git add -A 2>/dev/null
ts="$(date '+%Y-%m-%d %H:%M')"
git commit -q -m "wip: oturum kapanışı otomatik güvenlik kaydı ($ts)

CLAUDE.md #8 güvenlik ağı: /clear öncesi kaybolmasın diye otomatik
commit edildi. HANDOFF özeti elle gözden geçirilmeli." 2>/dev/null || exit 0

# Kullanıcıya bilgi ver (Claude Code systemMessage olarak gösterir).
printf '{"systemMessage":"Güvenlik ağı: commit edilmemiş değişiklikler otomatik kaydedildi (wip commit). HANDOFF özetini gözden geçir."}\n'
exit 0
