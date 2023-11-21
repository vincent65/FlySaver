const puppeteer = require("puppeteer-core");

const SBR_WS_ENDPOINT =
  "wss://YOUR_BROWSER_USERNAME:YOUR_BROWSER_PASS@brd.superproxy.io:9222";

async function main() {
  console.log("Connecting to Scraping Browser...");
  const browser = await puppeteer.connect({
    browserWSEndpoint: SBR_WS_ENDPOINT,
  });
  try {
    const page = await browser.newPage();
    console.log("Connected! Navigating to https://example.com...");


    const client = await page.target().createCDPSession();
    await openDevtools(page, client);

    
    await page.goto("https://example.com");
    console.log("Navigated! Scraping page content...");
    const html = await page.content();
    console.log(html);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err.stack || err);
  process.exit(1);
});
