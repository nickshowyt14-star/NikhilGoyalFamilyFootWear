#!/usr/bin/env python3
"""
Prepare the two store-supplied photographs for the site.

  python scripts/prepare-images.py --storefront path/to/shop.jpg \
                                   --founder    path/to/nikhil.jpg

What it does
------------
storefront  resized/compressed  ->  public/images/storefront.jpg
founder     background removed  ->  public/images/founder.png  (transparent)

The founder image is cut out so the figure can overlap the section artwork the
way the layout expects. Background removal needs `rembg`:

    pip install rembg onnxruntime pillow scipy

The first run downloads the u2net model (~176 MB) and is slow; later runs are
quick. Either argument may be omitted to process just one image.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required:  pip install pillow")

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images"

STOREFRONT_MAX_W = 1800
FOUNDER_MAX = 1600


def prepare_storefront(src: Path) -> None:
    im = Image.open(src)
    # Honour EXIF orientation so phone photos are not sideways.
    try:
        from PIL import ImageOps

        im = ImageOps.exif_transpose(im)
    except Exception:
        pass
    im = im.convert("RGB")

    if im.width > STOREFRONT_MAX_W:
        h = round(im.height * STOREFRONT_MAX_W / im.width)
        im = im.resize((STOREFRONT_MAX_W, h), Image.LANCZOS)

    dst = OUT / "storefront.jpg"
    im.save(dst, "JPEG", quality=86, optimize=True, progressive=True)
    print(f"  storefront -> {dst.relative_to(ROOT)}  {im.size}  "
          f"{dst.stat().st_size // 1024} KB")


def prepare_founder(src: Path) -> None:
    try:
        from rembg import new_session, remove
    except ImportError:
        sys.exit(
            "rembg is required to cut out the founder photo:\n"
            "    pip install rembg onnxruntime pillow scipy"
        )

    im = Image.open(src)
    try:
        from PIL import ImageOps

        im = ImageOps.exif_transpose(im)
    except Exception:
        pass
    im = im.convert("RGBA")

    print("  removing background (first run downloads the model, please wait)...")
    cut = remove(
        im,
        session=new_session("u2net"),
        alpha_matting=True,
        alpha_matting_foreground_threshold=250,
        alpha_matting_background_threshold=15,
        alpha_matting_erode_size=8,
    )

    cut = _drop_stray_fragments(cut)
    cut = _trim_to_subject(cut)
    cut.thumbnail((FOUNDER_MAX, FOUNDER_MAX), Image.LANCZOS)

    dst = OUT / "founder.png"
    cut.save(dst, "PNG", optimize=True)
    print(f"  founder    -> {dst.relative_to(ROOT)}  {cut.size}  "
          f"{dst.stat().st_size // 1024} KB")


def _drop_stray_fragments(im: Image.Image, keep_ratio: float = 0.06):
    """Remove islands of leftover background far from the main subject."""
    try:
        import numpy as np
        from scipy import ndimage
    except ImportError:
        print("  (scipy/numpy not installed — skipping stray-fragment cleanup)")
        return im

    arr = np.array(im)
    alpha = arr[:, :, 3]
    solid = alpha > 128
    labels, count = ndimage.label(solid)
    if count == 0:
        return im

    sizes = ndimage.sum(solid, labels, range(1, count + 1))
    keep = [i + 1 for i, s in enumerate(sizes) if s >= sizes.max() * keep_ratio]
    mask = ndimage.binary_dilation(np.isin(labels, keep), iterations=3)
    arr[:, :, 3] = (alpha * mask).astype("uint8")
    return Image.fromarray(arr, "RGBA")


def _trim_to_subject(im: Image.Image, pad: int = 10):
    box = im.split()[-1].getbbox()
    if not box:
        return im
    l, t, r, b = box
    return im.crop((max(0, l - pad), max(0, t - pad),
                    min(im.width, r + pad), min(im.height, b + pad)))


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--storefront", type=Path, help="photo of the shopfront")
    ap.add_argument("--founder", type=Path, help="photo of Nikhil Goyal")
    args = ap.parse_args()

    if not args.storefront and not args.founder:
        ap.error("give --storefront and/or --founder")

    OUT.mkdir(parents=True, exist_ok=True)
    print("Preparing images...")

    for label, path, fn in (
        ("storefront", args.storefront, prepare_storefront),
        ("founder", args.founder, prepare_founder),
    ):
        if not path:
            continue
        if not path.exists():
            sys.exit(f"{label}: file not found -> {path}")
        fn(path)

    print("Done. Restart `npm run dev` if it is already running.")


if __name__ == "__main__":
    main()
