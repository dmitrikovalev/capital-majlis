#!/usr/bin/env python3
"""Fix the green Ferrari SF90 scale in src/assets/hero-grid.jpg.

Measured against the real car dimensions (SF90 is ~6% longer but ~9% LOWER
than a 911 GT3), the Ferrari in the composite was pasted ~20% too large and
its ground line sat above the black Porsche's. This script:

  1. Reconstructs the smooth background gradient behind the Ferrari by
     horizontal interpolation between columns just outside its bounding box.
  2. Builds a soft alpha mask of the car as "pixels deviating from that
     reconstructed background".
  3. Re-pastes the car scaled down to SCALE, seated on the shared ground line.

Sources of the composite (cars only, background not in repo):
  src/assets/hero/rdm-988.JPEG  blue Porsche 992 GT3
  src/assets/hero/rdm-999.JPEG  black Porsche 997 GT3
  src/assets/hero/rdm-989.JPEG  green Ferrari SF90

Usage: python3 scripts/fix-hero-grid.py [output.jpg]
(defaults to overwriting src/assets/hero-grid.jpg; original is in git)
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src/assets/hero-grid.jpg"
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else SRC

# Ferrari bounding region in the 1920x1080 composite (with margin)
X0, X1 = 1140, 1700
Y0, Y1 = 500, 790

# Correction: SF90 height/length vs the two 911s implies the car was pasted
# ~1.2x too large. 0.82 brings its roof below the 911s' as in real life.
SCALE = 0.82
# Seat the car between the blue (738) and black (744) Porsche ground lines
TARGET_BOTTOM = 742
# Match the blue->black gap (68px): left edge at 1156 for the 398px-wide car
TARGET_CENTER_X = 1355


def main():
    img = Image.open(SRC).convert("RGB")
    a = np.asarray(img).astype(float)

    # 1. Reconstruct background: per-row linear blend between the column
    #    bands just left/right of the car region (gradient is smooth there;
    #    horizontal features like the horizon glow are preserved per-row).
    left = a[Y0:Y1, X0 - 12 : X0].mean(axis=1)   # (H, 3)
    right = a[Y0:Y1, X1 : X1 + 12].mean(axis=1)  # (H, 3)
    w = np.linspace(0.0, 1.0, X1 - X0)[None, :, None]
    bg = left[:, None, :] * (1 - w) + right[:, None, :] * w  # (H, W, 3)

    # 2. Soft alpha mask of the car = deviation from reconstructed background
    region = a[Y0:Y1, X0:X1]
    diff = np.abs(region - bg).sum(axis=2)
    mask = (diff > 40).astype(np.uint8) * 255
    m = Image.fromarray(mask)
    m = m.filter(ImageFilter.MaxFilter(9))   # close holes, grab soft edges
    m = m.filter(ImageFilter.MinFilter(5))   # pull back over-dilation
    m = m.filter(ImageFilter.GaussianBlur(2))  # feather

    car = Image.fromarray(region.astype(np.uint8)).convert("RGBA")
    car.putalpha(m)

    # 3. Erase the car: write reconstructed gradient back, lightly blurred
    #    only where the car was (keep original film grain elsewhere).
    out = a.copy()
    alpha = np.asarray(m).astype(float)[..., None] / 255.0
    out[Y0:Y1, X0:X1] = region * (1 - alpha) + bg * alpha
    result = Image.fromarray(out.astype(np.uint8))
    patch = result.crop((X0, Y0, X1, Y1)).filter(ImageFilter.GaussianBlur(1.5))
    pm = m.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(3))
    result.paste(patch, (X0, Y0), pm)

    # 3b. The car's soft ground shadow falls below the diff threshold, so
    #     flatten the whole old shadow band with the reconstructed gradient
    #     (feathered rect); the re-pasted car brings its own shadow along.
    shadow = Image.new("L", (X1 - X0, Y1 - Y0), 0)
    ImageDraw.Draw(shadow).rectangle(
        (1150 - X0, 688 - Y0, 1696 - X0, 766 - Y0), fill=255
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    result.paste(Image.fromarray(bg.astype(np.uint8)), (X0, Y0), shadow)

    # 4. Paste the car back, scaled and seated on the ground line.
    #    Measured car bbox inside the region (from the analysis pass):
    car_box = (1166 - X0, 537 - Y0, 1651 - X0, 745 - Y0)  # includes shadow
    car_crop = car.crop(car_box)
    nw = round(car_crop.width * SCALE)
    nh = round(car_crop.height * SCALE)
    car_small = car_crop.resize((nw, nh), Image.LANCZOS)
    px = round(TARGET_CENTER_X - nw / 2)
    py = TARGET_BOTTOM - nh
    result.paste(car_small, (px, py), car_small)

    result.save(OUT, quality=90)
    print(f"saved {OUT}  ferrari: {nw}x{nh} at ({px},{py}), bottom={py + nh}")


if __name__ == "__main__":
    main()
