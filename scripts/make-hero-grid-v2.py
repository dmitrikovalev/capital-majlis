#!/usr/bin/env python3
"""Build a night hero composite from two source photos.

  Top:    src/assets/hero/cornice-from-water.jpg  (Abu Dhabi skyline, night)
  Bottom: src/assets/hero/three-cars.jpg          (supercars, DAYTIME -> graded to night)

The two halves are joined by a warm amber fog band, matching the look of the
original src/assets/hero-grid.jpg.

Usage: python3 scripts/make-hero-grid-v2.py [output.jpg]
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SKYLINE = ROOT / "images/hero/cornice-from-water.jpg"
CARS = ROOT / "images/hero/three-cars.jpg"
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "src/assets/hero-grid-v3.jpg"

W, H = 1920, 1080

# Vertical layout (canvas px)
HORIZON = 470          # where skyline waterline / fog centre sits
FOG_TOP = 360          # fog band starts fading in
FOG_BOT = 600          # fog band fully gone below this

# Amber brand glow colour for the fog
GLOW = np.array([226, 176, 112], dtype=float)
FOG_MAX = 0.88   # peak fog opacity (keeps skyline bases readable)


def night_grade_cars(arr):
    """Day-for-night grade of the daytime cars shot (float HxWx3, 0-255)."""
    x = arr / 255.0
    # Highlight roll-off + strong exposure cut: bright daylight -> dark night.
    x = np.power(x, 1.95) * 0.79
    # Cool the shadows, keep a touch of warmth in the upper mids (street light).
    lum = x.mean(axis=2, keepdims=True)
    cool = np.array([0.80, 0.92, 1.18])   # blue night cast
    warm = np.array([1.18, 1.02, 0.74])   # sodium-light warmth for brighter px
    tint = cool * (1 - lum) + warm * lum
    x = x * tint
    # Slight desaturation toward night.
    g = x.mean(axis=2, keepdims=True)
    x = g * 0.30 + x * 0.70
    return np.clip(x * 255, 0, 255)


def main():
    # ---- bottom: cars, scaled to width and seated on the canvas floor ----
    cars = Image.open(CARS).convert("RGB")
    scale = W / cars.width
    cars = cars.resize((W, round(cars.height * scale)), Image.LANCZOS)
    arr = np.asarray(cars).astype(float)
    cars_h = arr.shape[0]
    ca = night_grade_cars(arr)

    # Crush the daytime background (bright sky, sand, desert houses) toward
    # black. The ramp transition sits just above the car roofs so the roofs
    # of the 3 front cars stay readable instead of merging into the dark.
    rows = np.arange(cars_h)[:, None, None]
    bg_kill = np.clip((rows - 135) / 130.0, 0.06, 1.0)
    ca = ca * bg_kill

    canvas = np.zeros((H, W, 3), dtype=float)
    # place cars so their bottom hits the canvas floor
    cy0 = H - cars_h
    paste_top = max(cy0, 0)
    src_top = max(0, -cy0)
    canvas[paste_top:H] = ca[src_top:src_top + (H - paste_top)]

    # darken cars toward the top (into the fog) and bottom (ground vignette)
    yy = np.arange(H)[:, None, None]
    top_fade = np.clip((yy - HORIZON) / 220.0, 0, 1)   # 0 at horizon -> 1 lower
    bottom_fade = np.clip((H - yy) / 240.0, 0.45, 1)   # darken last 240px
    canvas *= top_fade * bottom_fade

    # ---- top: skyline ----
    sky = Image.open(SKYLINE).convert("RGB")
    s = W / sky.width
    sky = sky.resize((W, round(sky.height * s)), Image.LANCZOS)
    sa = np.asarray(sky).astype(float)
    # waterline in source ~ y=1820 of 2058 -> scaled
    waterline = round(1820 * s)
    # darken the skyline a touch and deepen its sky
    sa = np.power(sa / 255.0, 1.12) * 0.85 * 255
    # offset so the waterline lands on HORIZON
    off = HORIZON - waterline
    for y in range(H):
        sy = y - off
        if 0 <= sy < sa.shape[0]:
            canvas[y] = sa[sy]
        elif sy < 0:
            canvas[y] = sa[0] * 0.4   # extend dark night sky upward

    # blend the skyline out below the horizon into the cars layer via fog
    # (handled by the fog band below)

    # ---- fog band ----
    # gaussian-ish vertical falloff centred on HORIZON
    centre = (FOG_TOP + FOG_BOT) / 2
    sigma = (FOG_BOT - FOG_TOP) / 2.4
    fog_a = np.exp(-((yy - centre) ** 2) / (2 * sigma ** 2))  # 0..1 (H,1,1)
    # horizontal variation: brighter in the middle, softer at edges
    xx = np.linspace(-1, 1, W)[None, :, None]
    horiz = 0.75 + 0.25 * np.cos(xx * np.pi / 1.4)
    fog = fog_a * horiz * FOG_MAX
    canvas = canvas * (1 - fog) + GLOW[None, None, :] * fog

    out = Image.fromarray(np.clip(canvas, 0, 255).astype(np.uint8))
    # gentle overall blur on the fog seam is implicit; finish with light grain-safe save
    out.save(OUT, quality=90)
    print(f"saved {OUT}  cars_h={cars_h} waterline={waterline} off={off}")


if __name__ == "__main__":
    main()
