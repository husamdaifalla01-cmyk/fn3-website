"""Analytics persistence — post history, performance data, journal, schedule.

All data lives in pinterest-bot/data/ as JSON files.
This is the memory that makes the bot get smarter over time.
"""

import json
import os
from datetime import datetime, timezone

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")


def _ensure_data_dir():
    os.makedirs(DATA_DIR, exist_ok=True)


def _load_json(filename: str, default):
    _ensure_data_dir()
    path = os.path.join(DATA_DIR, filename)
    if not os.path.exists(path):
        return default
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def _save_json(filename: str, data) -> None:
    _ensure_data_dir()
    path = os.path.join(DATA_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ── Post history ──────────────────────────────────────────────────────────────

def load_post_history() -> dict:
    """Load record of what's been posted.

    Schema: {
      "bad-credit-credit-card-v1": {
        "accounts": ["mintbrooks_main"],
        "last_posted": "ISO datetime",
        "pin_id": "pinterest_pin_id",
        "niche": "bad_credit",
        "hook_type": "pattern_interrupt"
      }
    }
    """
    return _load_json("post_history.json", {})


def save_post_history(history: dict) -> None:
    _save_json("post_history.json", history)


def record_post(brief_id: str, account_id: str, pin_id: str = "", niche: str = "", hook_type: str = "") -> None:
    """Mark a brief as posted to an account."""
    history = load_post_history()
    entry = history.setdefault(brief_id, {"accounts": [], "last_posted": "", "pin_id": "", "niche": niche, "hook_type": hook_type})
    if account_id not in entry["accounts"]:
        entry["accounts"].append(account_id)
    entry["last_posted"] = datetime.now(timezone.utc).isoformat()
    if pin_id:
        entry["pin_id"] = pin_id
    save_post_history(history)


# ── Analytics history ─────────────────────────────────────────────────────────

def load_analytics_history() -> list:
    """Load historical pin performance data.

    Schema: [{
      "pin_id": "...",
      "brief_id": "bad-credit-credit-card-v1",
      "account": "mintbrooks_main",
      "niche": "bad_credit",
      "hook_type": "pattern_interrupt",
      "angle": "Credit card for bad credit that actually works",
      "impressions": 0,
      "saves": 0,
      "clicks": 0,
      "date": "ISO date"
    }]
    """
    return _load_json("analytics_history.json", [])


def save_analytics_history(history: list) -> None:
    _save_json("analytics_history.json", history)


def append_analytics(pin_id: str, brief: dict, impressions: int = 0, saves: int = 0, clicks: int = 0) -> None:
    """Append a new analytics entry after a post is made (starts at 0, updated later)."""
    history = load_analytics_history()
    history.append({
        "pin_id": pin_id,
        "brief_id": brief.get("id", ""),
        "account": brief.get("account", ""),
        "niche": brief.get("niche", ""),
        "hook_type": brief.get("hook_type", ""),
        "angle": brief.get("angle", ""),
        "pin_title": brief.get("pin_title", ""),
        "impressions": impressions,
        "saves": saves,
        "clicks": clicks,
        "date": datetime.now(timezone.utc).date().isoformat(),
    })
    save_analytics_history(history)


def update_analytics(pin_id: str, impressions: int, saves: int, clicks: int) -> None:
    """Update performance metrics for a pin (call this after pulling Pinterest analytics)."""
    history = load_analytics_history()
    for entry in history:
        if entry.get("pin_id") == pin_id:
            entry["impressions"] = impressions
            entry["saves"] = saves
            entry["clicks"] = clicks
            break
    save_analytics_history(history)


def summarise_performance() -> dict:
    """Summarise what's working — used by the strategist to make better briefs."""
    history = load_analytics_history()
    if not history:
        return {"note": "No analytics data yet — first run."}

    # Performance by niche
    by_niche: dict[str, dict] = {}
    for entry in history:
        niche = entry.get("niche", "unknown")
        agg = by_niche.setdefault(niche, {"saves": 0, "clicks": 0, "impressions": 0, "count": 0})
        agg["saves"] += entry.get("saves", 0)
        agg["clicks"] += entry.get("clicks", 0)
        agg["impressions"] += entry.get("impressions", 0)
        agg["count"] += 1

    # Performance by hook type
    by_hook: dict[str, dict] = {}
    for entry in history:
        hook = entry.get("hook_type", "unknown")
        agg = by_hook.setdefault(hook, {"saves": 0, "clicks": 0, "count": 0})
        agg["saves"] += entry.get("saves", 0)
        agg["clicks"] += entry.get("clicks", 0)
        agg["count"] += 1

    top_niches = sorted(by_niche.items(), key=lambda x: x[1]["saves"], reverse=True)
    top_hooks = sorted(by_hook.items(), key=lambda x: x[1]["saves"], reverse=True)

    # Top performing angles
    top_angles = sorted(
        [e for e in history if e.get("saves", 0) > 0],
        key=lambda x: x["saves"],
        reverse=True,
    )[:5]

    return {
        "top_niches_by_saves": [{"niche": k, **v} for k, v in top_niches[:5]],
        "top_hooks_by_saves": [{"hook_type": k, **v} for k, v in top_hooks],
        "top_angles": [{"angle": e["angle"], "saves": e["saves"], "clicks": e["clicks"]} for e in top_angles],
        "total_pins_posted": len(history),
        "total_saves": sum(e.get("saves", 0) for e in history),
        "total_clicks": sum(e.get("clicks", 0) for e in history),
    }


# ── Journal ───────────────────────────────────────────────────────────────────

def load_journal() -> list:
    """Load strategist journal — notes on what's working.

    Add entries manually or via append_journal() to teach the bot.
    Schema: [{"date": "ISO date", "note": "...", "niche": "..."}]
    """
    return _load_json("journal.json", [])


def append_journal(note: str, niche: str = "") -> None:
    journal = load_journal()
    journal.append({
        "date": datetime.now(timezone.utc).date().isoformat(),
        "note": note,
        "niche": niche,
    })
    _save_json("journal.json", journal)


# ── Schedule ──────────────────────────────────────────────────────────────────

def load_schedule() -> dict:
    """Load posting schedule.

    Schema: { "mintbrooks_main": { "posts_per_day": 5, "preferred_hours": [9, 12, 17, 20] } }
    """
    return _load_json("schedule.json", {
        "mintbrooks_main": {"posts_per_day": 5, "preferred_hours": [9, 12, 17, 20]}
    })
