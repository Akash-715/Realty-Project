import puppeteer from "puppeteer";
import fs from "fs";

const localities = ['Vandalur', 'Perungalathur', 'urapakkam'];

const constructURL = (locality) => 
  `https://www.magicbricks.com/property-for-sale/residential-real-estate?bedroom=2,3&proptype=Multistorey-Apartment,Builder-Floor-Apartment,Penthouse,Studio-Apartment,Residential-House,Villa&Locality=${locality}&cityName=Chennai`;

const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight - 1000) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
};

const scrapeMagicBricks = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (const locality of localities) {
    const url = constructURL(locality);
    console.log(`🔍 Scraping: ${url}`);

    await page.goto(url, { waitUntil: "networkidle2" });
    await autoScroll(page);

    const data = await page.evaluate(() => {
      const cards = document.querySelectorAll('[data-label="srp-card"]');
      const results = [];

      cards.forEach(card => {
        const title = card.querySelector('.mb-srp__card--title')?.innerText || "N/A";
        const price = card.querySelector('.mb-srp__card__price--amount')?.innerText || "N/A";
        const bhk = card.querySelector('.mb-srp__card--title')?.innerText.match(/\d+ ?BHK/i)?.[0] || "N/A";
        const area = card.querySelector('.mb-srp__card__summary__list')?.innerText.match(/\d+ ?sq/i)?.[0] || "N/A";
        const location = card.querySelector('.mb-srp__card__ad--location')?.innerText || "N/A";
        const link = card.querySelector('a')?.href || "N/A";

        results.push({ title, price, bhk, area, location, link });
      });

      return results;
    });

    fs.writeFileSync(`magicbricks_${locality}.json`, JSON.stringify(data, null, 2));
    console.log(`✅ Saved ${data.length} properties for ${locality}`);
  }

  await browser.close();
};

scrapeMagicBricks();
