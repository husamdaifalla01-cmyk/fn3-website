#!/usr/bin/env bash
# deploy.sh — Build + deploy drive-credit-worker (Cloudflare Worker) with retry.
# mintbrooks.com is served by the Worker `drive-credit-worker` (wrangler.workers.toml),
# NOT the `drive-credit` Pages project. Do not switch this to `wrangler pages deploy`
# — that targets only the .pages.dev preview and never reaches production.
#
# Usage:
#   bash deploy.sh              # Build then deploy
#   bash deploy.sh --deploy-only  # Skip build, deploy existing .open-next/assets
#   bash deploy.sh --dry-run    # Build only, skip wrangler deploy
#
# Env vars:
#   CLOUDFLARE_API_TOKEN  — required for wrangler (or set via wrangler login)
#   MAX_RETRIES           — deploy attempts (default: 3)
#   RETRY_DELAY           — seconds between retries (default: 15)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MAX_RETRIES="${MAX_RETRIES:-3}"
RETRY_DELAY="${RETRY_DELAY:-15}"
ASSETS_DIR="$SCRIPT_DIR/.open-next/assets"
PROJECT_NAME="drive-credit"

DRY_RUN=false
DEPLOY_ONLY=false

for arg in "$@"; do
  case $arg in
    --dry-run)     DRY_RUN=true ;;
    --deploy-only) DEPLOY_ONLY=true ;;
  esac
done

log() { echo "[$(date +%H:%M:%S)] $*"; }
fail() { log "ERROR: $*" >&2; exit 1; }

# ── 1. Build ──────────────────────────────────────────────────────────────────
if [[ "$DEPLOY_ONLY" == false ]]; then
  log "Building for Cloudflare (opennextjs)..."
  cd "$SCRIPT_DIR"
  npm run build:cloudflare || fail "Build failed. Aborting deploy."
  log "Build complete → $ASSETS_DIR"
else
  log "Skipping build (--deploy-only)"
fi

# ── 2. Pre-flight ─────────────────────────────────────────────────────────────
[[ -d "$ASSETS_DIR" ]] || fail "Assets dir not found: $ASSETS_DIR — run without --deploy-only first."

ASSET_COUNT=$(find "$ASSETS_DIR" -type f | wc -l | tr -d ' ')
log "Pre-flight: $ASSET_COUNT files in assets dir"
[[ "$ASSET_COUNT" -gt 0 ]] || fail "Assets dir is empty — build may have failed silently."

if [[ "$DRY_RUN" == true ]]; then
  log "Dry-run: skipping wrangler deploy. Assets ready at $ASSETS_DIR"
  exit 0
fi

# ── 3. Deploy with retry ──────────────────────────────────────────────────────
attempt=1
while [[ $attempt -le $MAX_RETRIES ]]; do
  log "Deploy attempt $attempt/$MAX_RETRIES..."

  if npx wrangler deploy -c wrangler.workers.toml 2>&1; then
    log "Deploy succeeded on attempt $attempt."
    exit 0
  fi

  if [[ $attempt -lt $MAX_RETRIES ]]; then
    log "Attempt $attempt failed — retrying in ${RETRY_DELAY}s..."
    sleep "$RETRY_DELAY"
  fi

  attempt=$((attempt + 1))
done

fail "All $MAX_RETRIES deploy attempts failed. Check wrangler credentials and Cloudflare Pages status."
