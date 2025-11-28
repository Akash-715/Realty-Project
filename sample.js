import puppeteer from 'puppeteer';
import fs from 'fs';

const city = 'chennai';
const localities = ['urapakkam', 'vandalur', 'perungalathur'];

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 300);
    });
  });
}

async function scrapeLocality(locality) {
  const url = `https://housing.com/in/buy/${city}/${locality}?page=1`;
  console.log(`🔍 Scraping: ${url}`);

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Scroll to load lazy-loaded cards
  await autoScroll(page);

  try {
    await page.waitForSelector('h2.title-style', { timeout: 15000 });
  } catch (err) {
    console.error(`❌ Error scraping ${locality}:`, err.message);
    await browser.close();
    return;
  }

  const results = await page.evaluate(() => {
    const cards = document.querySelectorAll('a[data-q="title"]');
    return Array.from(cards).map(a => {
      const title = a.querySelector('div.title-style')?.innerText.trim() || "N/A";
      const detail = a.querySelector('h2.subtitle-style')?.innerText.trim() || "N/A";
      const Sqft = a.querySelector('div.T_configurationStyle')?.innerText.trim() || "N/A";
      const Price = a.querySelector('div.T_blackText')?.innerText.trim() || "N/A";
      const ExtraSqft = a.querySelector('div.slide-element')?.innerText.trim() || "N/A";
      const href = a.getAttribute('href');
      const url = href ? "https://housing.com" + href : "N/A";

      // Fallback price selector – may vary
      const card = a.closest('[data-pos^="srp-"]') || a.closest('div');
      const priceEl = card?.querySelector('[data-testid="price"]') || card?.querySelector('.css-18rodr0');
      const price = priceEl?.innerText?.trim() || "N/A";

      return { title,detail, Price,Sqft,ExtraSqft,url,};
    });
  });

  await browser.close();

  fs.writeFileSync(`properties_${locality}.json`, JSON.stringify(results, null, 2));
  console.log(`✅ Saved ${results.length} properties for ${locality}`);
}

(async () => {
  for (const loc of localities) {
    await scrapeLocality(loc);
  }
})();
