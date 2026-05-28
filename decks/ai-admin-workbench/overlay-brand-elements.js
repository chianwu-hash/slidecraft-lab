const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

function parseArgs(argv) {
  const opts = {
    imageDir: path.join(__dirname, "images-brand-raw"),
    outputDir: path.join(__dirname, "images-brand-overlay"),
    logo: "",
    total: 15,
    glob: "*.png",
    badgeXRatio: 0.018,
    badgeYRatio: 0.026,
    badgeWRatio: 0.072,
    badgeHRatio: 0.048,
    logoHeightRatio: 0.065,
    logoMarginXRatio: 0.026,
    logoMarginYRatio: 0.028,
    safeHeaderRatio: 0,
    safeContentMarginRatio: 0.012,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--image-dir" && argv[i + 1]) opts.imageDir = path.resolve(argv[++i]);
    else if (arg === "--output-dir" && argv[i + 1]) opts.outputDir = path.resolve(argv[++i]);
    else if (arg === "--logo" && argv[i + 1]) opts.logo = path.resolve(argv[++i]);
    else if (arg === "--total" && argv[i + 1]) opts.total = Number(argv[++i]);
    else if (arg === "--glob" && argv[i + 1]) opts.glob = argv[++i];
    else if (arg === "--badge-x-ratio" && argv[i + 1]) opts.badgeXRatio = Number(argv[++i]);
    else if (arg === "--badge-y-ratio" && argv[i + 1]) opts.badgeYRatio = Number(argv[++i]);
    else if (arg === "--badge-w-ratio" && argv[i + 1]) opts.badgeWRatio = Number(argv[++i]);
    else if (arg === "--badge-h-ratio" && argv[i + 1]) opts.badgeHRatio = Number(argv[++i]);
    else if (arg === "--logo-height-ratio" && argv[i + 1]) opts.logoHeightRatio = Number(argv[++i]);
    else if (arg === "--logo-margin-x-ratio" && argv[i + 1]) opts.logoMarginXRatio = Number(argv[++i]);
    else if (arg === "--logo-margin-y-ratio" && argv[i + 1]) opts.logoMarginYRatio = Number(argv[++i]);
    else if (arg === "--safe-header-ratio" && argv[i + 1]) opts.safeHeaderRatio = Number(argv[++i]);
    else if (arg === "--safe-content-margin-ratio" && argv[i + 1]) opts.safeContentMarginRatio = Number(argv[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!Number.isFinite(opts.total) || opts.total <= 0) {
    throw new Error("--total must be a positive number");
  }

  return opts;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  fs.mkdirSync(opts.outputDir, { recursive: true });

  const pythonScript = `
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import glob, math, os, re

image_dir = Path(r"""${opts.imageDir}""")
output_dir = Path(r"""${opts.outputDir}""")
logo_path = Path(r"""${opts.logo}""") if r"""${opts.logo}""" else None
pattern = r"""${opts.glob}"""
total = int(${opts.total})
badge_x_ratio = float(${opts.badgeXRatio})
badge_y_ratio = float(${opts.badgeYRatio})
badge_w_ratio = float(${opts.badgeWRatio})
badge_h_ratio = float(${opts.badgeHRatio})
logo_h_ratio = float(${opts.logoHeightRatio})
logo_margin_x_ratio = float(${opts.logoMarginXRatio})
logo_margin_y_ratio = float(${opts.logoMarginYRatio})
safe_header_ratio = float(${opts.safeHeaderRatio})
safe_content_margin_ratio = float(${opts.safeContentMarginRatio})

output_dir.mkdir(parents=True, exist_ok=True)
files = sorted(image_dir.glob(pattern))
if not files:
    raise SystemExit(f"No files matched: {image_dir / pattern}")

def find_font(size):
    candidates = [
        r"C:\\\\Windows\\\\Fonts\\\\arialbd.ttf",
        r"C:\\\\Windows\\\\Fonts\\\\arial.ttf",
        r"C:\\\\Windows\\\\Fonts\\\\calibrib.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()

def slide_number(file, index):
    match = re.search(r"(?:^|[-_])(\\d{2})(?:[-_]|\\.)", file.name)
    return int(match.group(1)) if match else index + 1

logo = None
if logo_path and logo_path.exists():
    logo = Image.open(logo_path).convert("RGBA")
elif logo_path:
    print(f"[warn] logo not found: {logo_path}; continuing without logo")

for index, file in enumerate(files):
    with Image.open(file).convert("RGBA") as base:
        w, h = base.size
        if safe_header_ratio > 0:
            header_h = round(h * safe_header_ratio)
            margin_x = round(w * safe_content_margin_ratio)
            margin_bottom = round(h * safe_content_margin_ratio)
            max_w = max(1, w - margin_x * 2)
            max_h = max(1, h - header_h - margin_bottom)
            scale = min(max_w / w, max_h / h)
            resized = base.resize((round(w * scale), round(h * scale)), Image.Resampling.LANCZOS)
            canvas = Image.new("RGBA", (w, h), (250, 247, 238, 255))
            paste_x = round((w - resized.width) / 2)
            paste_y = header_h + round((h - header_h - resized.height) / 2)
            canvas.alpha_composite(resized, (paste_x, paste_y))
            base = canvas
        draw = ImageDraw.Draw(base, "RGBA")
        badge_w = max(68, round(w * badge_w_ratio))
        badge_h = max(28, round(h * badge_h_ratio))
        x = round(w * badge_x_ratio)
        y = round(h * badge_y_ratio)
        radius = round(badge_h * 0.28)
        draw.rounded_rectangle(
            [x, y, x + badge_w, y + badge_h],
            radius=radius,
            fill=(20, 82, 49, 238),
        )
        draw.rounded_rectangle(
            [x, y, x + badge_w, y + badge_h],
            radius=radius,
            outline=(244, 239, 225, 180),
            width=max(1, round(h * 0.002)),
        )
        number = slide_number(file, index)
        label = f"{number:02d}/{total:02d}"
        font_size = max(16, round(badge_h * 0.55))
        font = find_font(font_size)
        bbox = draw.textbbox((0, 0), label, font=font)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]
        draw.text(
            (x + (badge_w - text_w) / 2, y + (badge_h - text_h) / 2 - round(badge_h * 0.04)),
            label,
            font=font,
            fill=(255, 255, 255, 255),
        )

        if logo is not None:
            target_h = max(42, round(h * logo_h_ratio))
            ratio = target_h / logo.height
            target_w = round(logo.width * ratio)
            mark = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
            lx = w - target_w - round(w * logo_margin_x_ratio)
            ly = round(h * logo_margin_y_ratio)
            base.alpha_composite(mark, (lx, ly))

        out = output_dir / file.name
        base.convert("RGB").save(out, "PNG", optimize=True)
        print(f"overlay {file.name} -> {out.name}")
`;

  execFileSync("python", ["-"], { input: pythonScript, stdio: ["pipe", "inherit", "inherit"] });
  console.log("Done:", opts.outputDir);
}

main();
