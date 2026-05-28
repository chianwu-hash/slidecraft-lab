const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

function parseArgs(argv) {
  const opts = {
    imageDir: path.join(__dirname, "formal-3-test-overlay-logo"),
    outputDir: path.join(__dirname, "formal-3-test-overlay-logo-mascots"),
    mascotDir: "G:\\我的雲端硬碟\\111頂溪\\01彩虹精靈\\榮譽制度版",
    glob: "*.png",
    mascotHeightRatio: 0.105,
    marginXRatio: 0.028,
    marginYRatio: 0.032,
    gapRatio: 0.012,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--image-dir" && argv[i + 1]) opts.imageDir = path.resolve(argv[++i]);
    else if (arg === "--output-dir" && argv[i + 1]) opts.outputDir = path.resolve(argv[++i]);
    else if (arg === "--mascot-dir" && argv[i + 1]) opts.mascotDir = path.resolve(argv[++i]);
    else if (arg === "--glob" && argv[i + 1]) opts.glob = argv[++i];
    else if (arg === "--mascot-height-ratio" && argv[i + 1]) opts.mascotHeightRatio = Number(argv[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return opts;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  fs.mkdirSync(opts.outputDir, { recursive: true });

  const pythonScript = `
from pathlib import Path
from PIL import Image, ImageFilter
import re

image_dir = Path(r"""${opts.imageDir}""")
output_dir = Path(r"""${opts.outputDir}""")
mascot_dir = Path(r"""${opts.mascotDir}""")
pattern = r"""${opts.glob}"""
mascot_h_ratio = float(${opts.mascotHeightRatio})
margin_x_ratio = float(${opts.marginXRatio})
margin_y_ratio = float(${opts.marginYRatio})
gap_ratio = float(${opts.gapRatio})

output_dir.mkdir(parents=True, exist_ok=True)
files = sorted(image_dir.glob(pattern))
mascot_files = [
    mascot_dir / "01光精靈.png",
    mascot_dir / "02火精靈.png",
    mascot_dir / "03海精靈.png",
    mascot_dir / "04樹精靈.png",
]
missing = [str(p) for p in mascot_files if not p.exists()]
if missing:
    raise SystemExit("Missing mascot files: " + ", ".join(missing))
if not files:
    raise SystemExit(f"No files matched: {image_dir / pattern}")

def shadowed(sprite):
    shadow = Image.new("RGBA", sprite.size, (0, 0, 0, 0))
    alpha = sprite.getchannel("A")
    shadow.putalpha(alpha.filter(ImageFilter.GaussianBlur(3)))
    base = Image.new("RGBA", sprite.size, (0, 0, 0, 0))
    base.alpha_composite(shadow, (3, 4))
    base.alpha_composite(sprite, (0, 0))
    return base

def resize_by_height(image, target_h):
    ratio = target_h / image.height
    return image.resize((round(image.width * ratio), target_h), Image.Resampling.LANCZOS)

sprites = [Image.open(p).convert("RGBA") for p in mascot_files]

for index, file in enumerate(files):
    with Image.open(file).convert("RGBA") as base:
        w, h = base.size
        target_h = max(64, round(h * mascot_h_ratio))
        gap = round(w * gap_ratio)
        margin_x = round(w * margin_x_ratio)
        margin_y = round(h * margin_y_ratio)
        resized = [shadowed(resize_by_height(sprite, target_h)) for sprite in sprites]
        total_w = sum(sprite.width for sprite in resized) + gap * (len(resized) - 1)

        # Keep the mascots a brand accent, not content. Position per slide to avoid the main objects.
        if index == 0:
            start_x = w - total_w - margin_x
            y = h - target_h - margin_y
        elif index == 1:
            start_x = w - total_w - margin_x
            y = h - target_h - margin_y
        else:
            start_x = margin_x
            y = h - target_h - margin_y

        x = start_x
        for sprite in resized:
            base.alpha_composite(sprite, (x, y))
            x += sprite.width + gap

        out = output_dir / file.name
        base.convert("RGB").save(out, "PNG", optimize=True)
        print(f"mascots {file.name} -> {out.name}")
`;

  execFileSync("python", ["-"], { input: pythonScript, stdio: ["pipe", "inherit", "inherit"] });
  console.log("Done:", opts.outputDir);
}

main();
