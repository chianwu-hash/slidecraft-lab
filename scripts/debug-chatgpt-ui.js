const { chromium } = require('C:/Users/user/projects/browser-automation-workflow/node_modules/playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
  const page = browser.contexts()[0].pages()[0];
  await page.bringToFront();

  const images = await page.evaluate(() => {
    const visible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    };
    return [...document.querySelectorAll('img')]
      .filter(visible)
      .map(img => ({
        src: (img.currentSrc || img.src || '').slice(0, 120),
        alt: img.getAttribute('alt') || '',
        width: Math.round(img.getBoundingClientRect().width),
        height: Math.round(img.getBoundingClientRect().height),
        hasImageContainer: Boolean(img.closest('[id^="image-"]')),
      }));
  });

  console.log('=== All visible images ===');
  images.forEach(i => console.log(JSON.stringify(i)));
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
