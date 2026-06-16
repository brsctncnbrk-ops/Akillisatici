#!/bin/bash
# SessionStart hook — Claude Code (web) oturumu başlarken bağımlılıkları kurar.
# Böylece build/lint/test ilk komutta çalışır (aksi halde "astro: not found" olur).
set -euo pipefail

# Yalnızca uzak ortamda (Claude Code web) çalış; yerelde geliştirici kendi kurar.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Depo köküne geç (hook cwd'si farklı olabilir).
cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Bağımlılıkları kur. Konteyner durumu hook sonrası cache'lendiğinden,
# tekrar çalıştırmada hızlı ve güvenli olan `npm install` tercih edilir (ci değil).
npm install
