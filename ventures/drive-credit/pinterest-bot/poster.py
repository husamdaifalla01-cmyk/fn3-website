"""Session-based Pinterest poster — posts pins using browser session cookies.

Uses ~/.pinterest_profiles/<profile>/session.json.
Routes each pin to the correct account and board based on strategy briefs.

To set up a session:
  1. Log into Pinterest in Chrome
  2. Open DevTools → Application → Cookies → pinterest.com
  3. Copy _pinterest_sess and csrftoken values
  4. Save to ~/.pinterest_profiles/<profile>/session.json:
     {"_pinterest_sess": "...", "csrftoken": "..."}
"""

import json
import logging
import mimetypes
import time
from pathlib import Path
from typing import Any

import httpx

from analytics import record_post, append_analytics

logger = logging.getLogger(__name__)

PINTEREST_BASE = "https://www.pinterest.com"
PROFILES_DIR = Path.home() / ".pinterest_profiles"


def _load_session(profile: str) -> dict | None:
    sess_path = PROFILES_DIR / profile / "session.json"
    if not sess_path.exists():
        logger.error(
            "No session for profile '%s'. Create: %s",
            profile, sess_path,
        )
        return None
    return json.loads(sess_path.read_text())


def _session_headers(session: dict) -> dict:
    cookie_parts = [
        f"_pinterest_sess={session['_pinterest_sess']}",
        f"csrftoken={session['csrftoken']}",
    ]
    for key in ("_auth", "_b", "cm_sub"):
        if session.get(key):
            cookie_parts.append(f"{key}={session[key]}")
    return {
        "Cookie": "; ".join(cookie_parts),
        "X-CSRFToken": session["csrftoken"],
        "X-Pinterest-AppState": "active",
        "Referer": "https://www.pinterest.com/",
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
        ),
    }


def _find_account_config(accounts: list[dict], profile: str) -> dict | None:
    for acc in accounts:
        if acc.get("pinterest_profile") == profile or acc.get("id") == profile:
            return acc
    return None


def post_briefs(
    briefs: list[dict],
    accounts: list[dict],
    delay_seconds: int = 5,
    max_posts: int = 20,
    dry_run: bool = False,
) -> list[dict[str, Any]]:
    """Post pins from strategy briefs to the correct account + board.

    Each brief must have: account, board, pin_title, pin_description,
    affiliate_url, and either nb_image_path (local file) or image_url.
    """
    results = []
    posted = 0

    for brief in briefs:
        if posted >= max_posts:
            logger.info("Reached max_posts limit (%d). Stopping.", max_posts)
            break

        profile = brief.get("account", "")
        board_name = brief.get("board", "")
        title = (brief.get("pin_title") or "")[:100]
        description = (brief.get("pin_description") or "")[:500]
        affiliate_url = brief.get("affiliate_url", "")
        nb_image_path = brief.get("nb_image_path")
        brief_id = brief.get("id", "unknown")

        if not profile:
            logger.warning("Brief missing account — skipping: %s", brief_id)
            results.append({"id": brief_id, "success": False, "error": "missing account"})
            continue

        acc_cfg = _find_account_config(accounts, profile)
        if not acc_cfg:
            logger.warning("No account config for profile '%s' — skipping", profile)
            results.append({"id": brief_id, "success": False, "error": f"no account config for {profile}"})
            continue

        board_ids = acc_cfg.get("board_ids", {})
        board_id = board_ids.get(board_name)
        if not board_id:
            board_id = next(iter(board_ids.values()), "")
            logger.warning("Board '%s' not found for %s — falling back to %s", board_name, profile, board_id)
        if not board_id:
            results.append({"id": brief_id, "success": False, "error": f"no board_id for '{board_name}'"})
            continue

        has_image = (nb_image_path and Path(nb_image_path).exists())
        if not has_image:
            logger.warning("No Nano Banana image for %s — skipping", brief_id)
            results.append({"id": brief_id, "success": False, "error": "no image generated"})
            continue

        if dry_run:
            logger.info("[DRY RUN] Would post: %s → %s / %s", brief_id, profile, board_name)
            results.append({"id": brief_id, "success": True, "dry_run": True, "profile": profile, "board": board_name})
            posted += 1
            continue

        session = _load_session(profile)
        if not session:
            results.append({"id": brief_id, "success": False, "error": f"no session for {profile}"})
            continue

        result = _post_pin(brief_id, board_id, nb_image_path, title, description, affiliate_url, session, profile, board_name)
        results.append(result)

        if result.get("success"):
            posted += 1
            pin_id = result.get("pin_id", "")
            logger.info("Posted %d/%d: %s → %s / %s | pin_id=%s",
                        posted, min(len(briefs), max_posts), brief_id, profile, board_name, pin_id)
            # Record in post history and analytics so the bot learns
            record_post(
                brief_id=brief_id,
                account_id=profile,
                pin_id=pin_id,
                niche=brief.get("niche", ""),
                hook_type=brief.get("hook_type", ""),
            )
            append_analytics(pin_id=pin_id, brief=brief)
        else:
            logger.warning("Failed: %s — %s", brief_id, result.get("error"))

        if posted < max_posts:
            time.sleep(delay_seconds)

    return results


def _upload_image(local_path: str, session: dict) -> str | None:
    """Upload image to catbox.moe and return a public URL Pinterest can fetch."""
    import requests as _requests
    try:
        img_bytes = Path(local_path).read_bytes()
        mime = mimetypes.guess_type(local_path)[0] or "image/png"
        filename = Path(local_path).name

        r = _requests.post(
            "https://catbox.moe/user/api.php",
            data={"reqtype": "fileupload"},
            files={"fileToUpload": (filename, img_bytes, mime)},
            timeout=60,
        )
        url = r.text.strip()
        if not url.startswith("https://"):
            logger.error("Image host upload failed: HTTP %d — %s", r.status_code, url[:200])
            return None

        logger.info("Image hosted: %s → %s", filename, url)
        return url
    except Exception as exc:
        logger.error("Image upload exception: %s", exc)
        return None


def _post_pin(
    brief_id: str,
    board_id: str,
    local_image_path: str,
    title: str,
    description: str,
    link: str,
    session: dict,
    profile: str,
    board_name: str,
) -> dict[str, Any]:
    headers = _session_headers(session)

    image_url = None
    if local_image_path and Path(local_image_path).exists():
        logger.info("Uploading image for %s: %s", brief_id, local_image_path)
        image_url = _upload_image(local_image_path, session)

    if not image_url:
        return {"id": brief_id, "success": False, "error": "image upload failed"}

    options: dict = {
        "board_id": board_id,
        "description": description,
        "title": title,
        "link": link,
        "image_url": image_url,
    }

    payload = {"options": options, "context": {}}

    try:
        r = httpx.post(
            f"{PINTEREST_BASE}/resource/PinResource/create/",
            data={"data": json.dumps(payload), "source_url": "/"},
            headers=headers,
            timeout=30,
            follow_redirects=True,
        )
        if r.status_code == 401:
            return {"id": brief_id, "success": False, "error": "session expired (401) — refresh cookies"}
        if r.status_code == 429:
            wait = int(r.headers.get("Retry-After", 10))
            logger.warning("Rate limited. Waiting %ds...", wait)
            time.sleep(wait)
            r = httpx.post(
                f"{PINTEREST_BASE}/resource/PinResource/create/",
                data={"data": json.dumps(payload), "source_url": "/"},
                headers=headers,
                timeout=30,
                follow_redirects=True,
            )
        if r.status_code not in (200, 201):
            return {"id": brief_id, "success": False, "error": f"HTTP {r.status_code}: {r.text[:200]}"}

        data = r.json().get("resource_response", {}).get("data", {})
        pin_id = data.get("id", "")
        return {
            "id": brief_id,
            "success": True,
            "pin_id": pin_id,
            "profile": profile,
            "board": board_name,
            "url": f"https://www.pinterest.com/pin/{pin_id}/",
        }
    except httpx.RequestError as exc:
        return {"id": brief_id, "success": False, "error": str(exc)}
