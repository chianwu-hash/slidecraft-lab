const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

function parseArgs(argv) {
  const opts = {
    imageDir: path.join(__dirname, "images"),
    output: path.join(__dirname, "final", "ai-admin-workbench-chatgpt-images.pdf"),
    glob: "*.png",
  };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--image-dir" && argv[i + 1]) opts.imageDir = path.resolve(argv[++i]);
    if (argv[i] === "--output" && argv[i + 1]) opts.output = path.resolve(argv[++i]);
    if (argv[i] === "--glob" && argv[i + 1]) opts.glob = argv[++i];
  }
  return opts;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  fs.mkdirSync(path.dirname(opts.output), { recursive: true });

  const pythonScript = `
import fitz, os, glob
image_dir = r"""${opts.imageDir}"""
pdf       = r"""${opts.output}"""
pattern   = r"""${opts.glob}"""
files = sorted(glob.glob(os.path.join(image_dir, pattern)))
if not files:
    raise SystemExit("No files matched: " + os.path.join(image_dir, pattern))
print(f"Assembling {len(files)} page(s) into PDF...")
for f in files:
    print("  " + os.path.basename(f))
doc = fitz.open()
for file in files:
    img = fitz.open(file)
    rect = img[0].rect
    page = doc.new_page(width=rect.width, height=rect.height)
    page.insert_image(rect, filename=file)
doc.save(pdf)
print("Output: " + pdf)
`;

  execFileSync("python", ["-"], { input: pythonScript, stdio: ["pipe", "inherit", "inherit"] });
  console.log("Done:", opts.output);
}

main();
