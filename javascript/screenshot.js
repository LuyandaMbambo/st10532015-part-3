const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const pages = [
    'index.html',
    'about.html',
    'contact.html',
    'get involved.html',
    'programs.html'
  ];

  const outDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    for (const p of pages) {
      const filePath = path.join(__dirname, '..', p);
      const fileUrl = encodeURI('file://' + filePath.replace(/\\/g, '/'));
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 900 });
      console.log('Opening', fileUrl);
      await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 0 });
      // wait a bit for JS-driven slideshows to initialize
      await new Promise(res => setTimeout(res, 900));
      const name = p.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const outPath = path.join(outDir, `${name}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log('Saved', outPath);
      await page.close();
    }
  } finally {
    await browser.close();
  }
  console.log('All screenshots saved to', outDir);
})();
