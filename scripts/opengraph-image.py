# -*- coding: utf-8 -*-
"""Regenerate public/opengraph-image.png.

The share card is the one piece of the site that is a baked bitmap rather than
CSS, so it does not follow a palette change on its own. It was still cyan-on-
#0b0f14 a full repaint after the site went black-and-cream, and nothing in the
repo recorded how it had been made. Hence this file: run it after any change to
the palette tokens, the role line, or what he is seeking.

    python scripts/opengraph-image.py

Needs Pillow and fonttools (with brotli, for the woff2). Both are dev-time only
and are not npm dependencies; the site ships the PNG, not the generator.

The faces are the site's own, decompressed from woff2 to a temporary ttf
because FreeType cannot read woff2 directly. Archivo is variable, so the weight
is set through the wght axis rather than by picking a static file.
"""
import io, os, sys, tempfile

from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib.woff2 import decompress

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, "src", "fonts", "ofl")
OUT = os.path.join(ROOT, "public", "opengraph-image.png")

W, H = 1200, 630
PAD = 84

# Straight from :root in src/app/globals.css. Keep them in sync.
BG = "#0a0a09"
FG = "#f0eade"
FG_DIM = "#ada698"
FG_FAINT = "#8a8376"
ACCENT = "#e7d3a3"
LINE = "#292724"
ACCENT_DEEP = "#544c3c"

_tmp = []


def face(name, size, wght=None):
    """Load one of the site's woff2 faces at `size`, optionally at a weight."""
    ttf = os.path.join(tempfile.gettempdir(), "og-" + name.replace(".woff2", ".ttf"))
    if not os.path.exists(ttf):
        with open(os.path.join(FONTS, name), "rb") as fh:
            decompress(fh, ttf)
        _tmp.append(ttf)
    f = ImageFont.truetype(ttf, size)
    if wght is not None:
        try:
            f.set_variation_by_axes([wght])
        except Exception as exc:          # static build, or no FreeType varfont support
            print("  (weight axis unavailable: %s)" % exc)
    return f


def tracked(draw, xy, text, font, fill, track=0):
    """Draw `text` with `track` px of extra letter-spacing. Returns the width.

    Pillow has no letter-spacing, and the kicker is the one line on the card
    that needs it — it is the same `.kicker` treatment the site uses, which is
    0.18em of tracking on a 13px mono label.
    """
    x, y = xy
    for ch in text:
        if draw is not None:
            draw.text((x, y), ch, font=font, fill=fill)
        x += draw_len(font, ch) + track
    return x - track - xy[0]


def draw_len(font, ch):
    return font.getlength(ch)


def main():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # Two concentric arcs bleeding off the bottom-right corner. They are the
    # only ornament and they are drawn, not blurred: a share card gets resized
    # to a thumbnail in most feeds, so anything soft turns to mud.
    cx, cy = W - 30, H + 46
    for r, colour, wide in ((196, ACCENT_DEEP, 2), (262, LINE, 2)):
        d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=colour, width=wide)

    kicker = face("DMMono-Regular.woff2", 21)
    name = face("Archivo-Variable.woff2", 96, wght=800)
    role = face("DMMono-Regular.woff2", 38)
    meta = face("DMMono-Regular.woff2", 23)

    y = 128
    tracked(d, (PAD, y), "MISSISSAUGA, ON", kicker, FG_FAINT, track=3.6)

    y += 52
    d.text((PAD, y), "Abdllah Abbara", font=name, fill=FG)

    y += 132
    # The trailing underscore stands in for the typewriter caret on the site.
    d.text((PAD, y), "Cloud Computing _", font=role, fill=ACCENT)

    y += 78
    d.line((PAD, y, W - PAD, y), fill=LINE, width=1)

    y += 30
    d.text((PAD, y), "Full-stack  \u00b7  Python automation  \u00b7  Cloud infrastructure",
           font=meta, fill=FG_DIM)
    y += 40
    d.text((PAD, y), "Sheridan College  \u00b7  Seeking a 2027 winter/summer co-op",
           font=meta, fill=FG_FAINT)

    img.save(OUT, "PNG", optimize=True)
    print("wrote %s (%d bytes)" % (OUT, os.path.getsize(OUT)))


if __name__ == "__main__":
    main()
