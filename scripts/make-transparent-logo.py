#!/usr/bin/env python3
"""Create a transparent, white version of the ADM Society logo for use on the
dark nav bar and footer. Black background -> alpha, marks stay white."""
from PIL import Image, ImageOps
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src/assets/ADM_Society_Logo_HD.png")
OUT = os.path.join(ROOT, "src/assets/adm-logo.png")

src = Image.open(SRC).convert("RGB")
alpha = ImageOps.grayscale(src)

bbox = alpha.getbbox()
if bbox:
    pad = 6
    l, t, r, b = bbox
    l = max(0, l - pad); t = max(0, t - pad)
    r = min(src.width, r + pad); b = min(src.height, b + pad)
    alpha = alpha.crop((l, t, r, b))

white = Image.new("RGB", alpha.size, (255, 255, 255))
out = Image.new("RGBA", alpha.size)
out.paste(white, (0, 0))
out.putalpha(alpha)

# keep it crisp but not huge
max_w = 720
if out.width > max_w:
    scale = max_w / out.width
    out = out.resize((max_w, int(out.height * scale)), Image.LANCZOS)

out.save(OUT)
print(f"Saved {OUT}  {out.size}  aspect {out.width/out.height:.2f}")
