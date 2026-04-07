"""DriveCredit offer definitions and content topic → landing page mapping.

Each content topic maps to:
  - A mintbrooks.com landing page
  - A primary offer (Yendo or Slam Dunk)
  - A CPL value
  - A set of Pinterest-ready content angles
"""

YENDO_BASE = "https://afflat3e3.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=27618&c=918277&a=769106&k=D083BC665DB0EC415E23BE307260F10E&l=36989"
SLAM_DUNK_BASE = "https://afflat3e3.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=11384&c=918277&a=769106&k=D6769605225263EA1944C850E28B6F38&l=11476"

OFFERS = {
    "yendo": {
        "name": "Yendo Credit Card",
        "cpl": 112.50,
        "url": YENDO_BASE,
        "cta": "Check If My Car Qualifies",
        "description": "Use your car equity to get a real Visa credit card — no hard credit pull to check eligibility.",
    },
    "slam_dunk": {
        "name": "Slam Dunk Loans",
        "cpl": 9.00,
        "url": SLAM_DUNK_BASE,
        "cta": "Get Emergency Cash Now",
        "description": "Personal loans up to $50,000 — fast decision, any credit welcome.",
    },
}


def build_pinterest_url(base_url: str, campaign: str) -> str:
    sep = "&" if "?" in base_url else "?"
    return f"{base_url}{sep}utm_source=pinterest&utm_medium=social&utm_campaign={campaign}"


def build_mintbrooks_url(base_url: str, path: str, campaign: str) -> str:
    return f"{base_url}{path}?utm_source=pinterest&utm_medium=social&utm_campaign={campaign}"


# Content topics — each becomes a batch of pins
CONTENT_TOPICS = [
    {
        "id": "bad-credit-credit-card",
        "niche": "bad_credit",
        "slug": "bad-credit-credit-card",
        "primary_keyword": "bad credit credit card",
        "offer": "yendo",
        "angles": [
            "Credit card for bad credit that actually works",
            "No credit score needed — use your car instead",
            "The credit card that skips the credit check",
        ],
    },
    {
        "id": "credit-card-500-credit-score",
        "niche": "credit_builder",
        "slug": "credit-card-500-credit-score",
        "primary_keyword": "credit card with 500 credit score",
        "offer": "yendo",
        "angles": [
            "Get a Visa card with a 500 credit score",
            "What to do when your credit score is 500",
            "500 credit score? Here's your credit card",
        ],
    },
    {
        "id": "use-car-as-collateral",
        "niche": "car_credit",
        "slug": "use-car-as-collateral",
        "primary_keyword": "use car as collateral for credit card",
        "offer": "yendo",
        "angles": [
            "Use your car to unlock a real credit card",
            "Your car equity = your credit limit",
            "How car-secured credit cards actually work",
        ],
    },
    {
        "id": "no-credit-history-credit-card",
        "niche": "car_credit",
        "slug": "no-credit-history-credit-card",
        "primary_keyword": "credit card no credit history",
        "offer": "yendo",
        "angles": [
            "First credit card ever? Your car qualifies you",
            "No credit history? No problem with car equity",
            "Skip the credit history requirement with this card",
        ],
    },
    {
        "id": "credit-card-no-deposit",
        "niche": "no_deposit",
        "slug": "credit-card-no-deposit",
        "primary_keyword": "credit card no deposit bad credit",
        "offer": "yendo",
        "angles": [
            "Real credit card — zero deposit required",
            "No security deposit needed to get this card",
            "Bad credit credit card without the $200 deposit",
        ],
    },
    {
        "id": "emergency-cash-between-paychecks",
        "niche": "emergency_cash",
        "slug": "emergency-cash-between-paychecks",
        "primary_keyword": "emergency cash between paychecks",
        "offer": "slam_dunk",
        "angles": [
            "Need cash before payday? Here's how",
            "Emergency loan approved in minutes",
            "Between paychecks and need cash fast",
        ],
    },
    {
        "id": "how-to-build-credit-with-bad-credit",
        "niche": "credit_builder",
        "slug": "how-to-build-credit-with-bad-credit",
        "primary_keyword": "how to build credit with bad credit",
        "offer": "yendo",
        "angles": [
            "The fastest way to rebuild bad credit",
            "Car owners: use this to build credit",
            "Step-by-step credit rebuild with your car",
        ],
    },
    {
        "id": "yendo-credit-card-review",
        "niche": "yendo_review",
        "slug": "yendo-credit-card-review",
        "primary_keyword": "yendo credit card review",
        "offer": "yendo",
        "angles": [
            "Honest Yendo card review — is it worth it?",
            "Yendo credit card pros, cons, and truth",
            "I tried Yendo — here's what happened",
        ],
    },
    {
        "id": "car-equity-credit-card-reviews",
        "niche": "car_ownership",
        "slug": "car-equity-credit-card-reviews",
        "primary_keyword": "car equity credit card",
        "offer": "yendo",
        "angles": [
            "Your car is worth more than you think",
            "Turn car equity into a credit card limit",
            "Car equity credit cards — how they work",
        ],
    },
    {
        "id": "car-equity-vs-secured-cards",
        "niche": "comparison",
        "slug": "car-equity-vs-secured-cards",
        "primary_keyword": "car equity vs secured credit card",
        "offer": "yendo",
        "angles": [
            "Secured card vs car equity card — which wins?",
            "Stop wasting $200 on a secured card deposit",
            "Car equity card beats secured card every time",
        ],
    },
]


def get_topics_with_urls(base_url: str) -> list[dict]:
    """Return all content topics enriched with mintbrooks landing page URLs."""
    enriched = []
    for topic in CONTENT_TOPICS:
        offer_data = OFFERS[topic["offer"]]
        items = []
        for i, angle in enumerate(topic["angles"]):
            campaign = f"{topic['id']}-v{i + 1}"
            landing_url = build_mintbrooks_url(base_url, f"/{topic['slug']}", campaign)
            items.append({
                "id": f"{topic['id']}-v{i + 1}",
                "niche": topic["niche"],
                "topic_id": topic["id"],
                "primary_keyword": topic["primary_keyword"],
                "angle": angle,
                "offer": topic["offer"],
                "offer_name": offer_data["name"],
                "cpl": offer_data["cpl"],
                "landing_url": landing_url,
                "cta": offer_data["cta"],
            })
        enriched.extend(items)
    return enriched
