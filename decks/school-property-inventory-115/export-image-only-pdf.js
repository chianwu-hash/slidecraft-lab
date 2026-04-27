const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

function main() {
  const root = path.resolve(__dirname);
  const imageDir = path.join(root, "images");
  const finalDir = path.join(root, "final");
  const pdfPath = path.join(finalDir, "school-property-inventory-115-full-page-generation.pdf");

  fs.mkdirSync(finalDir, { recursive: true });

  const pythonScript = `
import fitz, os, glob
image_dir = r"""${imageDir}"""
pdf = r"""${pdfPath}"""
files = sorted(glob.glob(os.path.join(image_dir, "*.png")))
if not files:
    raise SystemExit("No PNG files found")
doc = fitz.open()
for file in files:
    img = fitz.open(file)
    rect = img[0].rect
    page = doc.new_page(width=rect.width, height=rect.height)
    page.insert_image(rect, filename=file)
doc.save(pdf)
print(pdf)
`;

  execFileSync("python", ["-"], { input: pythonScript, stdio: ["pipe", "inherit", "inherit"] });
  console.log(pdfPath);
}

main();
