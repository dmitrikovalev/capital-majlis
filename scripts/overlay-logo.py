#!/usr/bin/env python3
"""Overlay the ADM Society logo onto the principals photo, top-right corner.

Design goals (premium / editorial):
- Extract the white logo marks from their black background (luminance -> alpha).
- Add a soft dark corner vignette so the white mark reads cleanly against the
  bright hazy sky without hard edges or a visible "box".
- Apply a gentle drop shadow for depth, matching the dark/gold site language.
"""
from PIL import Image, ImageFilter, ImageOps
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTO = os.path.join(ROOT, "src/assets/principals.original.jpg")
LOGO = os.path.join(ROOT, "src/assets/ADM_Society_Logo_HD.png")
OUT = os.path.join(ROOT, "src/assets/principals.jpg")

photo = Image.open(PHOTO).convert("RGB")
W, H = photo.size

# --- 1. Build a transparent, white version of the logo --------------------
logo_src = Image.open(LOGO).convert("RGB")
# Luminance becomes the alpha channel: white marks -> opaque, black -> clear.
alpha = ImageOps.grayscale(logo_src)
# Crop to the actual logo content (trim surrounding black padding).
bbox = alpha.getbbox()
if bbox:
    # small breathing margin around content
    pad = 8
    l, t, r, b = bbox
    l = max(0, l - pad); t = max(0, t - pad)
    r = min(logo_src.width, r + pad); b = min(logo_src.height, b + pad)
    alpha = alpha.crop((l, t, r, b))

white = Image.new("RGB", alpha.size, (255, 255, 255))
logo = Image.new("RGBA", alpha.size)
logo.paste(white, (0, 0))
logo.putalpha(alpha)

# --- 2. Scale & position --------------------------------------------------
target_w = int(W * 0.30)              # ~30% of photo width
scale = target_w / logo.width
target_h = int(logo.height * scale)
logo = logo.resize((target_w, target_h), Image.LANCZOS)

margin_x = int(W * 0.045)
margin_y = int(W * 0.045)
pos_x = W - target_w - margin_x
pos_y = margin_y

# --- 3. Soft dark corner vignette for legibility --------------------------
# Radial-ish gradient anchored at the top-right corner.
vignette = Image.new("L", (W, H), 0)
vpx = vignette.load()
# radius of influence
rad = int(W * 0.62)
cx, cy = W, 0  # top-right corner
max_a = 120    # peak darkness (0-255); kept subtle
# Only compute within bounding region for speed.
x0 = max(0, W - rad)
y0 = 0
y1 = min(H, rad)
for y in range(y0, y1):
    dy = y - cy
    for x in range(x0, W):
        dx = x - cx
        d = (dx * dx + dy * dy) ** 0.5
        if d < rad:
            t = 1.0 - (d / rad)
            # ease (smoothstep) for a soft falloff
            t = t * t * (3 - 2 * t)
            vpx[x, y] = int(max_a * t)

scrim = Image.new("RGB", (W, H), (0, 0, 0))
photo = Image.composite(scrim, photo, vignette).convert("RGBA")

# --- 4. Drop shadow -------------------------------------------------------
shadow_alpha = logo.split()[3].point(lambda a: int(a * 0.55))
shadow = Image.new("RGBA", photo.size, (0, 0, 0, 0))
shadow_layer = Image.new("RGBA", logo.size, (0, 0, 0, 0))
shadow_layer.putalpha(shadow_alpha)
shadow.paste(shadow_layer, (pos_x + 3, pos_y + 5), shadow_layer)
shadow = shadow.filter(ImageFilter.GaussianBlur(6))
photo = Image.alpha_composite(photo, shadow)

# --- 5. Composite the logo ------------------------------------------------
photo.alpha_composite(logo, (pos_x, pos_y))

photo.convert("RGB").save(OUT, quality=92, optimize=True)
print(f"Saved {OUT}  ({W}x{H})  logo {target_w}x{target_h} at ({pos_x},{pos_y})")
