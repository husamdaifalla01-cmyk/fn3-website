# DriveCredit Pinterest Bot

Generates AI lifestyle pin images for mintbrooks.com content topics and
auto-posts them to Pinterest via browser session cookies.

## Pipeline

```
offers.py          → 10 content topics × 3 angles = 30 pin candidates
autostrategist.py  → Gemini generates hook titles, SEO descriptions, image scenes
nanobanana.py      → Gemini generates lifestyle images (1000×1500px)
poster.py          → Posts to Pinterest via browser session (no OAuth needed)
main.py            → Orchestrates all steps
```

## Quick Start

### 1. Install dependencies

```bash
cd pinterest-bot
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure credentials

```bash
cp .env.example .env
# Add your GEMINI_API_KEY
```

### 3. Set up Pinterest session

1. Log into Pinterest in Chrome
2. Open DevTools → Application → Cookies → pinterest.com
3. Copy `_pinterest_sess` and `csrftoken`
4. Save to `~/.pinterest_profiles/mintbrooks_main/session.json`:

```json
{
  "_pinterest_sess": "...",
  "csrftoken": "..."
}
```

### 4. Add your Pinterest board IDs to `accounts.json`

Get board IDs from the Pinterest URL when viewing a board:
`pinterest.com/username/board-name/` → use the board's numeric ID from the API.

### 5. Run

```bash
# Full run: generate images + post to Pinterest
python main.py

# Dry run: generate locally only
python main.py --dry-run

# Limit to first 5 topics
python main.py --topics 5 --dry-run
```

## Output Structure

```
output/
└── 2026-04-05_143022/
    ├── strategy_briefs.json    ← all generated briefs
    ├── pins/                   ← Nano Banana lifestyle images
    │   └── bad-credit-credit-card-v1_nb.png
    └── run_report.json         ← execution summary
```

## Content Topics → Landing Pages

| Topic | Landing Page | Offer | CPL |
|-------|-------------|-------|-----|
| bad_credit | /bad-credit-credit-card | Yendo | $112.50 |
| credit_500 | /credit-card-500-credit-score | Yendo | $112.50 |
| car_credit | /use-car-as-collateral | Yendo | $112.50 |
| no_credit | /no-credit-history-credit-card | Yendo | $112.50 |
| no_deposit | /credit-card-no-deposit | Yendo | $112.50 |
| emergency | /emergency-cash-between-paychecks | Slam Dunk | $9.00 |
| credit_builder | /how-to-build-credit-with-bad-credit | Yendo | $112.50 |
| yendo_review | /yendo-credit-card-review | Yendo | $112.50 |
| car_equity | /car-equity-credit-card-reviews | Yendo | $112.50 |
| comparison | /car-equity-vs-secured-cards | Yendo | $112.50 |
