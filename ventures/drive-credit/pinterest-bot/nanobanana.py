"""Nano Banana — generates lifestyle pin images from strategy briefs.

Uses Google AI Studio (Gemini image generation).
Takes the image_direction from a strategy brief and returns a saved PNG path.
"""

import base64
import logging
import os
from pathlib import Path

logger = logging.getLogger(__name__)

DEFAULT_MODEL = os.getenv("NANOBANANA_MODEL", "gemini-2.0-flash-preview-image-generation")


def generate_pin_image(
    image_direction: dict,
    topic_title: str,
    output_path: str,
    api_key: str,
    model: str = DEFAULT_MODEL,
) -> str | None:
    """Generate a lifestyle pin image from an image_direction brief.

    Args:
        image_direction: Dict with scene, mood, colors, composition, negative_prompt.
        topic_title:     Pin topic/angle — anchors the image to the content.
        output_path:     Full path where the PNG should be saved.
        api_key:         Google AI Studio API key.
        model:           Nano Banana model ID.

    Returns:
        output_path on success, None on failure.
    """
    prompt = _build_prompt(image_direction, topic_title)

    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)

        logger.info("Generating image for: %s", topic_title[:60])

        response = client.models.generate_content(
            model=model,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            ),
        )

        image_bytes = None
        for part in response.candidates[0].content.parts:
            if hasattr(part, "inline_data") and part.inline_data:
                raw = part.inline_data.data
                image_bytes = raw if isinstance(raw, bytes) else base64.b64decode(raw)
                break

        if not image_bytes:
            logger.warning("Nano Banana returned no image for: %s", topic_title)
            return None

        os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(image_bytes)

        logger.info("Image saved: %s", output_path)
        return output_path

    except Exception as exc:
        logger.error("Nano Banana generation failed for '%s': %s", topic_title, exc)
        return None


def generate_pins_for_briefs(
    briefs: list[dict],
    run_dir: str,
    api_key: str,
    model: str = DEFAULT_MODEL,
) -> list[dict]:
    """Generate images for a list of strategy briefs. Returns briefs with image paths added.

    Saves images to: {run_dir}/pins/{brief_id}_nb.png
    Updates each brief with: nb_image_path (local path) and nb_image_generated (bool).
    """
    pins_dir = os.path.join(run_dir, "pins")
    os.makedirs(pins_dir, exist_ok=True)

    results = []
    total = len(briefs)

    for i, brief in enumerate(briefs, 1):
        brief_id = brief.get("id", f"pin_{i}")
        topic_title = brief.get("pin_title", brief_id)
        image_direction = brief.get("image_direction", {})

        output_path = os.path.join(pins_dir, f"{brief_id}_nb.png")

        logger.info("[%d/%d] Generating image: %s", i, total, brief_id)
        result_path = generate_pin_image(
            image_direction=image_direction,
            topic_title=topic_title,
            output_path=output_path,
            api_key=api_key,
            model=model,
        )

        brief = {**brief}
        brief["nb_image_path"] = result_path
        brief["nb_image_generated"] = result_path is not None
        results.append(brief)

    generated = sum(1 for b in results if b["nb_image_generated"])
    logger.info("Nano Banana: %d/%d images generated", generated, total)
    return results


# ── Prompt builder ────────────────────────────────────────────────────────────

def _build_prompt(direction: dict, topic_title: str) -> str:
    scene = direction.get("scene", "person looking relieved, warm home interior")
    mood = direction.get("mood", "hopeful and empowering")
    colors = direction.get("colors", "warm neutrals")
    composition = direction.get("composition", "subject centered")
    style = direction.get("style", "lifestyle_scene")

    return (
        f"Pinterest lifestyle photography for personal finance content. "
        f"Theme: {topic_title}. "
        f"Scene: {scene}. "
        f"Mood: {mood}. "
        f"Color palette: {colors}. "
        f"Composition: {composition}. "
        f"Style: high-quality {style.replace('_', ' ')}, soft natural lighting, "
        f"editorial quality, aspirational and relatable for everyday Americans. "
        f"Portrait orientation 2:3. "
        f"No text, no watermarks, no logos, no explicit credit card numbers or brand names visible."
    )
