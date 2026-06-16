#!/bin/bash
# SessionStart hook — Claude Code (web) oturumu başlarken bağımlılıkları kurar.
# Böylece build/lint/test çalışır (aksi halde "astro: not found" olur).
# ASYNC mod: kurulum arka planda çalışır; oturum hemen başlar (daha hızlı başlangıç).
# Dezavantaj: ilk anlarda kurulum henüz bitmemiş olabilir (yarış durumu) — komutlar
# kurulum tamamlanana kadar başarısız olabilir.
set -euo pipefail

# Yalnızca uzak ortamda (Claude Code web) çalış; yerelde geliştirici kendi kurar.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Async modu aç: bu satırdan sonrası arka planda çalışır (asyncTimeout: 5 dk).
echo '{"async": true, "asyncTimeout": 300000}'

# Depo köküne geç (hook cwd'si farklı olabilir).
cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Bağımlılıkları kur. Konteyner durumu hook sonrası cache'lendiğinden,
# tekrar çalıştırmada hızlı ve güvenli olan `npm install` tercih edilir (ci değil).
npm install
