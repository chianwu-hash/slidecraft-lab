const fs = require('fs');
const crypto = require('crypto');
const { chromium } = require('C:/Users/user/projects/browser-automation-workflow/node_modules/playwright');

const OUTPUT_PATH = 'C:/Users/user/projects/slidecraft-lab/exports/school-property-inventory-115/brand-identity-generated/brand-slide-10.png';

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
  const page = browser.contexts()[0].pages()[0];
  await page.bringToFront();

  // Get all generated images (alt = 已產生圖像 or in image container)
  const images = await page.evaluate(() => {
    const visible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none';
    };
    const contentId = (src) => {
      try { return new URL(src).searchParams.get('id') || src; } catch { return src; }
    };
    return [...document.querySelectorAll('img')]
      .filter(visible)
      .filter(img => (img.currentSrc || img.src || '').includes('/backend-api/estuary/content'))
      .filter(img => (img.getAttribute('alt') || '') !== '已上傳的圖像')
      .filter(img => img.closest('[id^="image-"]'))
      .map(img => ({
        id: contentId(img.currentSrc || img.src),
        src: img.currentSrc || img.src,
        alt: img.getAttribute('alt') || '',
      }));
  });

  // Deduplicate by id
  const seen = new Set();
  const unique = images.filter(i => { if (seen.has(i.id)) return false; seen.add(i.id); return true; });

  console.log(`Found ${unique.length} generated image(s):`);
  unique.forEach((img, idx) => console.log(`  [${idx + 1}] ${img.id}`));

  if (unique.length === 0) {
    console.error('No generated images found.');
    await browser.close();
    process.exit(1);
  }

  // Take the LAST one (most recently generated)
  const target = unique[unique.length - 1];
  console.log(`\nDownloading latest: ${target.src.slice(0, 100)}`);

  const payload = await page.evaluate(async (url) => {
    const res = await fetch(url, { credentials: 'include' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contentType = res.headers.get('content-type') || 'image/png';
    const bytes = Array.from(new Uint8Array(await res.arrayBuffer()));
    return { contentType, bytes };
  }, target.src);

  const buffer = Buffer.from(payload.bytes);
  fs.writeFileSync(OUTPUT_PATH, buffer);
  console.log(`\nSaved to: ${OUTPUT_PATH}`);
  console.log(`Size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);

  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
