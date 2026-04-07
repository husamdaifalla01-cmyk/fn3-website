"""Auto-Strategist — generates Pinterest strategy briefs for DriveCredit.

Primary: Gemini 2.5 Flash (structured output).
Fallback: Template-based strategist (zero API dependency).

Takes content topics from offers.py and returns strategy briefs ready for
nanobanana image generation and the session-based poster.

Evolution loop:
  - Skips already-posted topic+angle combos (post_history.json)
  - When all topics exhausted, asks Gemini to invent NEW angles based on what performed
  - Passes analytics summary + journal notes so Gemini learns what works
"""

import json
import logging
import os
import random
from datetime import datetime, timezone

from analytics import load_post_history, load_analytics_history, load_journal, summarise_performance

logger = logging.getLogger(__name__)


# ── Niche scene templates (what Nano Banana renders) ─────────────────────────

NICHE_SCENES: dict[str, dict] = {
    "bad_credit": {
        "scene": "person looking relieved at their phone, soft home interior, warm afternoon light coming through a window",
        "mood": "relief, hope, turning a corner",
        "colors": "warm amber, cream, soft gold",
        "composition": "person slightly off-center, phone visible, open space around them",
    },
    "car_credit": {
        "scene": "modern car parked in a clean driveway, keys in hand, confident person standing nearby",
        "mood": "ownership, pride, possibility",
        "colors": "deep navy, silver, open sky blue",
        "composition": "car as hero, person in background, leading lines toward car",
    },
    "credit_builder": {
        "scene": "clean home desk with a laptop open, credit card nearby, person smiling at screen",
        "mood": "progress, empowerment, getting ahead",
        "colors": "white, sage green, warm wood tones",
        "composition": "desk setup, product/card in foreground, person softly in background",
    },
    "financial_freedom": {
        "scene": "open road at golden hour, steering wheel in foreground, highway stretching ahead",
        "mood": "freedom, movement, optimism",
        "colors": "warm gold, sky orange, open road tan",
        "composition": "driver's perspective, road centered, golden light flooding in",
    },
    "car_ownership": {
        "scene": "close-up of car keys on a clean surface next to a minimalist wallet and credit card",
        "mood": "smart, prepared, in control",
        "colors": "charcoal, silver, cream",
        "composition": "flat lay, keys and card as equal heroes, minimal props",
    },
    "emergency_cash": {
        "scene": "calm person sitting at home with a cup of coffee, phone in hand showing a loan approval notification",
        "mood": "relief, calm in the storm, problem solved",
        "colors": "warm neutrals, soft amber, muted teal",
        "composition": "person centered, phone visible, cozy home environment",
    },
    "no_deposit": {
        "scene": "person holding a new credit card, smiling at camera, bright modern kitchen",
        "mood": "triumph, fresh start, confidence",
        "colors": "clean white, warm yellow accent, natural light",
        "composition": "card prominent, person expressive, bright open framing",
    },
    "yendo_review": {
        "scene": "phone showing a credit card app dashboard next to a car key fob on a marble surface",
        "mood": "modern, trustworthy, transparent",
        "colors": "marble white, deep teal, gold",
        "composition": "phone and key fob as flat lay, clean negative space",
    },
    "comparison": {
        "scene": "side-by-side visual: one side shows a plain secured card on grey background, other side shows a vibrant card on warm background",
        "mood": "clarity, decision made, smart choice",
        "colors": "contrast — muted grey vs warm gold and cream",
        "composition": "split-screen symmetry, labels implied by environment not text",
    },
}

# ── Title hook templates ──────────────────────────────────────────────────────

TITLE_TEMPLATES = [
    "If You Own a Car + Have Bad Credit — Read This",
    "The Credit Card That Doesn't Check Your Score",
    "Your Car Is Worth More Than You Think 💳",
    "How I Got a Real Visa Card With {credit_score} Credit",
    "No Deposit. No Hard Pull. Real Credit Card.",
    "Car Owners With Bad Credit Found the Loophole",
    "Stop Paying $200 Deposits for Secured Cards",
    "What Most People With Bad Credit Don't Know",
    "{primary_keyword} — The Answer You've Been Looking For",
    "Real Credit Card for {primary_keyword} Owners",
]

HOOK_TYPES = ["pattern_interrupt", "curiosity_gap", "social_proof", "aspiration", "relief"]

NICHE_HASHTAGS: dict[str, list[str]] = {
    "bad_credit": ["badcredit", "creditrepair", "credittips", "badcreditloans", "credithelp"],
    "car_credit": ["carloans", "carequity", "yendo", "creditcard", "vehicleequity"],
    "credit_builder": ["buildcredit", "creditbuilder", "creditscore", "creditjourney", "financetips"],
    "financial_freedom": ["financialfreedom", "moneytips", "personalfinance", "debtfree", "moneygoals"],
    "car_ownership": ["carowner", "carequity", "carfinance", "autoloan", "vehiclevalue"],
    "emergency_cash": ["emergencyfund", "fastcash", "personalloans", "moneynow", "financialhelp"],
    "no_deposit": ["nodeposit", "creditcard", "badcredit", "nocollateral", "easycredit"],
    "yendo_review": ["yendo", "creditcardreview", "carequityloan", "visacard", "creditcardtips"],
    "comparison": ["creditcardcomparison", "securedcard", "creditcardtips", "badcredit", "bestcreditcard"],
}


# ── Public API ────────────────────────────────────────────────────────────────

def run_auto_strategist(
    gemini_api_key: str,
    topics: list[dict],
    output_path: str,
    accounts: list[dict] | None = None,
) -> list[dict]:
    """Generate strategy briefs — Gemini primary, template fallback.

    Evolution:
      1. Filters out already-posted topic+angle combos
      2. If fresh topics remain → generate briefs for those
      3. If all topics exhausted → ask Gemini to invent new angles from top performers
      4. Passes analytics summary + journal so Gemini learns over time
    """
    if not accounts:
        logger.warning("No accounts configured. Using template fallback with empty account IDs.")

    post_history = load_post_history()
    performance = summarise_performance()
    journal = load_journal()

    # Filter to fresh topics (not yet posted to any account)
    fresh_topics = [t for t in topics if t["id"] not in post_history]
    all_posted = len(fresh_topics) == 0

    if all_posted:
        logger.info("All %d topics previously posted — asking Gemini for new angles", len(topics))
    else:
        logger.info("%d fresh topics (of %d total)", len(fresh_topics), len(topics))

    topics_to_use = fresh_topics if not all_posted else topics

    briefs = []
    if gemini_api_key and topics_to_use:
        briefs = _gemini_strategist(
            gemini_api_key, topics_to_use, accounts or [],
            performance=performance,
            journal=journal,
            all_posted=all_posted,
        )

    if not briefs:
        logger.info("Using template fallback strategist")
        briefs = _template_strategist(topics_to_use, accounts or [])

    if briefs:
        os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(briefs, f, indent=2, ensure_ascii=False)
        logger.info("Auto-Strategist: %d briefs written to %s", len(briefs), output_path)

    return briefs


# ── Gemini path ───────────────────────────────────────────────────────────────

def _gemini_strategist(
    api_key: str,
    topics: list[dict],
    accounts: list[dict],
    performance: dict | None = None,
    journal: list | None = None,
    all_posted: bool = False,
) -> list[dict]:
    try:
        from google import genai
        from google.genai import types

        account_ids = [a["id"] for a in accounts] if accounts else ["__unconfigured__"]
        topics_json = json.dumps(topics[:15], indent=2)
        perf_json = json.dumps(performance or {}, indent=2)
        journal_notes = json.dumps((journal or [])[-10:], indent=2)

        evolution_instruction = ""
        if all_posted:
            evolution_instruction = """
ALL TOPICS HAVE BEEN POSTED BEFORE. Your job now is to INVENT NEW ANGLES.
Look at the top performing niches and hooks in RECENT PERFORMANCE.
Generate fresh pin titles and descriptions with different angles, different emotional hooks,
and updated image directions. Do NOT repeat angles that have already been posted.
The landing URLs stay the same — only the creative changes."""

        prompt = f"""You are a Pinterest content strategist for mintbrooks.com — an affiliate site helping Americans with bad credit or no credit who own a car get the Yendo car-secured Visa credit card ($112.50 CPL) or Slam Dunk emergency loans ($9 CPL).

Today: {datetime.now().strftime("%Y-%m-%d")}
Available Pinterest accounts: {account_ids}
{evolution_instruction}

# CONTENT TOPICS
{topics_json}

# RECENT PERFORMANCE (use this to double down on what works)
{perf_json}

# JOURNAL NOTES (last 10 — human observations on what's working)
{journal_notes}

# YOUR TASK
For each topic, return a strategy brief. Use performance data to:
- Weight toward niches with high saves
- Use hook types that have driven clicks
- Avoid repeating angles that already performed poorly

Each brief must have:
- id: the topic id (append -v2, -v3 etc. if generating new angles for already-posted topics)
- account: one of {account_ids}
- board: a board name matching the niche
- pin_title: scroll-stopping title (max 100 chars) — curiosity gap, pattern interrupt, or relief
- pin_description: SEO-rich description (max 500 chars) addressing the pain point directly, with hashtags
- hashtags: array of 8 hashtags (no # symbol)
- image_direction: object with scene, mood, colors, composition, negative_prompt
- affiliate_url: use the landing_url from the topic exactly
- hook_type: one of curiosity_gap, pattern_interrupt, social_proof, aspiration, relief
- niche: the niche key from the topic
- angle: one sentence describing the specific angle of this pin

Return ONLY a valid JSON array. No markdown, no explanation."""

        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[types.Content(parts=[types.Part.from_text(text=prompt)])],
            config=types.GenerateContentConfig(
                response_modalities=["TEXT"],
                temperature=0.8 if all_posted else 0.7,
            ),
        )

        if not response.candidates:
            return []

        raw = response.candidates[0].content.parts[0].text.strip()
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        raw = raw.strip()

        briefs = json.loads(raw)
        logger.info("Gemini strategist produced %d briefs", len(briefs))
        return briefs

    except Exception as exc:
        logger.error("Gemini strategist failed: %s", exc)
        return []


# ── Template fallback ─────────────────────────────────────────────────────────

def _template_strategist(topics: list[dict], accounts: list[dict]) -> list[dict]:
    account_ids = [a["id"] for a in accounts] if accounts else ["__unconfigured__"]
    account_boards: dict[str, dict] = {}
    for acc in accounts:
        account_boards[acc["id"]] = acc.get("boards", {})

    now = datetime.now(timezone.utc)
    briefs = []

    for topic in topics:
        niche = topic.get("niche", "bad_credit")
        keyword = topic.get("primary_keyword", "bad credit")
        angle = topic.get("angle", keyword)
        landing_url = topic.get("landing_url", "")

        acc_id = account_ids[0] if account_ids else "__unconfigured__"
        boards = account_boards.get(acc_id, {})
        board_name = boards.get(niche, "Credit Tips")

        # Build hook title
        template = random.choice(TITLE_TEMPLATES)
        pin_title = template.format(
            primary_keyword=keyword.title(),
            credit_score="500",
        )[:100]

        # Build description
        pin_description = (
            f"{angle}. "
            f"If you own a car and have bad credit, there's a credit card that uses your vehicle equity — "
            f"no hard credit pull, no deposit. "
            f"Click to see if you qualify."
        )[:500]

        scene_data = NICHE_SCENES.get(niche, NICHE_SCENES["bad_credit"])
        image_direction = {
            "style": "lifestyle_scene",
            "scene": scene_data["scene"],
            "mood": scene_data["mood"],
            "colors": scene_data["colors"],
            "composition": scene_data["composition"],
            "negative_prompt": "No text overlays, no watermarks, no logos, no human faces visible",
        }

        hashtags = NICHE_HASHTAGS.get(niche, ["creditcard", "badcredit"])
        hashtags = list(dict.fromkeys(hashtags + ["mintbrooks", "yendo"]))[:10]

        briefs.append({
            "id": topic.get("id", ""),
            "account": acc_id,
            "board": board_name,
            "pin_title": pin_title,
            "pin_description": pin_description + "\n\n" + " ".join(f"#{h}" for h in hashtags),
            "hashtags": hashtags,
            "image_direction": image_direction,
            "affiliate_url": landing_url,
            "hook_type": random.choice(HOOK_TYPES),
            "niche": niche,
            "primary_keyword": keyword,
            "angle": angle,
            "offer": topic.get("offer", "yendo"),
            "cpl": topic.get("cpl", 112.50),
            "post_timing": now.isoformat(),
        })

    return briefs
