const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

async function main() {
  const root = path.resolve(__dirname);
  const htmlPath = path.join(root, 'slides.html');
  const pngDir = path.join(root, 'rendered-pages');
  const pdfPath = path.join(root, 'new-taipei-school-lunch-presentation-nano.pdf');

  fs.mkdirSync(pngDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'load' });
    await page.waitForTimeout(1200);

    const slides = page.locator('.slide');
    const count = await slides.count();

    for (let i = 0; i < count; i += 1) {
      const slide = slides.nth(i);
      const pngPath = path.join(pngDir, `${String(i + 1).padStart(2, '0')}.png`);
      await slide.screenshot({ path: pngPath });
    }
  } finally {
    await browser.close();
  }

  const pythonScript = `
import fitz, os, glob
root = r"""${pngDir}"""
pdf = r"""${pdfPath}"""
files = sorted(glob.glob(os.path.join(root, "*.png")))
doc = fitz.open()
for file in files:
    img = fitz.open(file)
    rect = img[0].rect
    page = doc.new_page(width=rect.width, height=rect.height)
    page.insert_image(rect, filename=file)
doc.save(pdf)
print(pdf)
`;

  execFileSync('python', ['-',], { input: pythonScript, stdio: ['pipe', 'inherit', 'inherit'] });
  console.log(pdfPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
