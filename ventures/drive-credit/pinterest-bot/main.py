#!/usr/bin/env python3
"""DriveCredit Pinterest Bot — Main Orchestrator.

Generates lifestyle pin images for mintbrooks.com content topics and
auto-posts them to Pinterest via browser session cookies.

Usage:
    python main.py              # Full run (generate + post)
    python main.py --dry-run    # Generate locally, no posting
    python main.py --topics 5   # Limit to first N topics
    python main.py --help       # Show this help
"""

import json
import logging
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from config import load_config, load_accounts
from offers import get_topics_with_urls
from autostrategist import run_auto_strategist
from nanobanana import generate_pins_for_briefs
from poster import post_briefs
from analytics import load_post_history, summarise_performance

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger("drivecredit-bot")


def main() -> None:
    start_time = time.monotonic()
    logger.info("=" * 60)
    logger.info("DriveCredit Pinterest Bot — Starting")
    logger.info("=" * 60)

    if "--help" in sys.argv or "-h" in sys.argv:
        print(__doc__)
        sys.exit(0)

    dry_run = "--dry-run" in sys.argv

    # Parse --topics N flag
    topic_limit = None
    if "--topics" in sys.argv:
        idx = sys.argv.index("--topics")
        if idx + 1 < len(sys.argv):
            topic_limit = int(sys.argv[idx + 1])

    # ── Step 1: Load config ──
    logger.info("[1/5] Loading configuration...")
    config = load_config()
    if dry_run:
        config.enable_pinterest_post = False
        logger.info("  → Dry-run mode: Pinterest posting disabled")

    accounts = load_accounts()
    if not accounts:
        logger.warning("  → No accounts configured in accounts.json — posting will be skipped")
    else:
        logger.info("  → Accounts: %s", [a["id"] for a in accounts])

    # ── Step 2: Create run directory ──
    logger.info("[2/5] Creating run directory...")
    timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    run_dir = os.path.join(config.output_dir, timestamp)
    os.makedirs(run_dir, exist_ok=True)
    logger.info("  → Run dir: %s", run_dir)

    # ── Step 3: Generate strategy briefs ──
    logger.info("[3/5] Generating content topics + strategy briefs...")
    topics = get_topics_with_urls(config.mintbrooks_base_url)
    if topic_limit:
        topics = topics[:topic_limit]
    logger.info("  → %d content items from %d topic types", len(topics), len(set(t["topic_id"] for t in topics)))

    # Show evolution state
    post_history = load_post_history()
    fresh_count = sum(1 for t in topics if t["id"] not in post_history)
    total_posted = len(post_history)
    logger.info("  → Evolution state: %d total pins posted, %d fresh topics remaining", total_posted, fresh_count)
    if fresh_count == 0:
        logger.info("  → All topics exhausted — Gemini will generate new angles from performance data")

    briefs_path = os.path.join(run_dir, "strategy_briefs.json")
    briefs = run_auto_strategist(
        gemini_api_key=config.gemini_api_key,
        topics=topics,
        output_path=briefs_path,
        accounts=accounts,
    )
    logger.info("  → %d strategy briefs generated", len(briefs))

    if not briefs:
        logger.error("No strategy briefs generated. Check Gemini API key.")
        _write_report(run_dir, start_time, 0, 0, 0, [])
        sys.exit(1)

    # ── Step 4: Generate Nano Banana images ──
    logger.info("[4/5] Generating Nano Banana lifestyle images...")
    briefs = generate_pins_for_briefs(
        briefs=briefs,
        run_dir=run_dir,
        api_key=config.gemini_api_key,
        model=config.nanobanana_model,
    )
    nb_count = sum(1 for b in briefs if b.get("nb_image_generated"))
    logger.info("  → %d/%d images generated", nb_count, len(briefs))

    # ── Step 5: Post to Pinterest ──
    post_results: list[dict[str, Any]] = []
    if config.enable_pinterest_post and accounts:
        logger.info("[5/5] Posting to Pinterest via browser session...")
        post_results = post_briefs(
            briefs=briefs,
            accounts=accounts,
            delay_seconds=config.post_delay_seconds,
            max_posts=config.max_pins_per_run,
            dry_run=dry_run,
        )
    else:
        reason = "posting disabled" if not config.enable_pinterest_post else "no accounts configured"
        logger.info("[5/5] Skipping Pinterest posting — %s", reason)

    # ── Write report ──
    posted_count = sum(1 for r in post_results if r.get("success"))
    performance = summarise_performance()
    _write_report(run_dir, start_time, len(briefs), nb_count, posted_count, post_results, performance)

    elapsed = time.monotonic() - start_time
    logger.info("=" * 60)
    logger.info("COMPLETE in %.1fs", elapsed)
    logger.info("  Strategy briefs:  %d", len(briefs))
    logger.info("  Images generated: %d", nb_count)
    logger.info("  Pins posted:      %d", posted_count)
    logger.info("  Output:           %s", run_dir)
    logger.info("=" * 60)


def _write_report(
    run_dir: str,
    start_time: float,
    briefs_count: int,
    images_count: int,
    posted_count: int,
    post_results: list[dict],
    performance: dict | None = None,
) -> None:
    elapsed = time.monotonic() - start_time
    report = {
        "run_timestamp": datetime.now(timezone.utc).isoformat(),
        "elapsed_seconds": round(elapsed, 1),
        "briefs_generated": briefs_count,
        "images_generated": images_count,
        "pins_posted": posted_count,
        "pins_failed": briefs_count - posted_count,
        "post_results": post_results,
        "cumulative_performance": performance or {},
    }
    filepath = os.path.join(run_dir, "run_report.json")
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        logger.info("Run report saved: %s", filepath)
    except OSError as exc:
        logger.error("Failed to write run report: %s", exc)
        print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
