"""
Founder cut-out, rebuilt from the full-resolution source.

u2net alone keeps the board he is holding but drags in strips of the sponsor
wall beneath it; the person-only models drop the board entirely. So compose the
mask instead:

    keep = person (u2net_human_seg)  ∪  board (colour-isolated, holes filled)

The board is separable from skin by colour — sampled from the photo, the board
sits at R-G ~94 with G-B ~0, while skin is R-G 32-50 with G-B 9-27. Anything
that is neither person nor board is sponsor wall, and is discarded.
"""
import os
from pathlib import Path

import numpy as np
from PIL import Image
from rembg import remove, new_session
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source-photos" / "nikhil.png"
DST = ROOT / "public" / "images" / "founder.png"

im = Image.open(str(SRC)).convert("RGBA")
rgb = np.array(im.convert("RGB")).astype(int)
print("source:", im.size)

def alpha_of(model, **kw):
    out = remove(im, session=new_session(model), **kw)
    return np.array(out)[:, :, 3]

a_all = alpha_of("u2net", alpha_matting=True, alpha_matting_foreground_threshold=250,
                 alpha_matting_background_threshold=15, alpha_matting_erode_size=8)
a_person = alpha_of("u2net_human_seg")
print("masks built")

r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
board = (r - g > 65) & (g - b < 8) & (r > 90) & (a_all > 128)

lab, n = ndimage.label(board)
if n:
    sizes = ndimage.sum(board, lab, range(1, n + 1))
    board = lab == (int(np.argmax(sizes)) + 1)          # the sign, not stray reds
    # The sign is a convex quadrilateral, so filling each row between its first
    # and last board pixel reconstructs it exactly — including the lettering and
    # the fist artwork, which `fill_holes` cannot close because the fist runs
    # off the board's edge rather than being fully enclosed by it.
    rows = np.where(board.any(axis=1))[0]
    for y in rows:
        xs = np.where(board[y])[0]
        board[y, xs.min():xs.max() + 1] = True
    board = ndimage.binary_dilation(board, iterations=2)
print("board px:", int(board.sum()), "| person px:", int((a_person > 128).sum()))

alpha = np.maximum(np.where(board, a_all, 0), a_person)

out = np.array(im)
out[:, :, 3] = alpha
img = Image.fromarray(out, "RGBA")
img = img.crop(img.split()[-1].getbbox())
img.thumbnail((1400, 1400), Image.LANCZOS)
img.save(str(DST), "PNG", optimize=True)
print("saved:", img.size, os.path.getsize(str(DST)) // 1024, "KB")
