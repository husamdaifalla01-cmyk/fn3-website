"""Configuration loader for DriveCredit Pinterest bot."""

import json
import os
from dataclasses import dataclass, field
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()


@dataclass
class Config:
    gemini_api_key: str
    mintbrooks_base_url: str
    output_dir: str
    max_pins_per_run: int
    post_delay_seconds: int
    enable_pinterest_post: bool
    nanobanana_model: str


def load_config() -> Config:
    missing = []

    gemini_key = os.getenv("GEMINI_API_KEY", "")
    if not gemini_key:
        missing.append("GEMINI_API_KEY (needed for image generation and strategy briefs)")

    if missing:
        print("Missing required environment variables:")
        for m in missing:
            print(f"  - {m}")
        print("\nCopy .env.example to .env and fill in your credentials.")
        raise SystemExit(1)

    return Config(
        gemini_api_key=gemini_key,
        mintbrooks_base_url=os.getenv("MINTBROOKS_BASE_URL", "https://mintbrooks.com"),
        output_dir=os.getenv("OUTPUT_DIR", "output"),
        max_pins_per_run=int(os.getenv("MAX_PINS_PER_RUN", "20")),
        post_delay_seconds=int(os.getenv("POST_DELAY_SECONDS", "5")),
        enable_pinterest_post=os.getenv("ENABLE_PINTEREST_POST", "true").lower() == "true",
        nanobanana_model=os.getenv("NANOBANANA_MODEL", "gemini-2.0-flash-preview-image-generation"),
    )


def load_accounts() -> list[dict]:
    accounts_path = Path(__file__).parent / "accounts.json"
    if not accounts_path.exists():
        return []
    with open(accounts_path, encoding="utf-8") as f:
        return json.load(f)
