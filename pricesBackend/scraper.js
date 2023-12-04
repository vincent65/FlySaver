const puppeteer = require("puppeteer-core");

const SBR_WS_ENDPOINT =
  "wss://YOUR_BROWSER_USERNAME:YOUR_BROWSER_PASS@brd.superproxy.io:9222";

  async function parseRoute(div) {
  let airlineSpan = await div.$('[class^="LogoImage_container"] span');
  let airline = await airlineSpan?.evaluate((el) => el.textContent.trim());

  if (!airline) {
    let airlineImg = await div.$('[class^="LogoImage_container"] img');
    airline = await airlineImg?.evaluate((el) => el.alt.trim());
  }

  const departAt = await div.$eval(
    '[class^="LegInfo_routePartialDepart"] span',
    (el) => el.textContent.trim()
  );
  const arriveAt = await div.$eval(
    '[class^="LegInfo_routePartialArrive"] span',
    (el) => el.textContent.trim()
  );
  const duration = await div.$eval(
    '[class^="LegInfo_stopsContainer"] span',
    (el) => el.textContent.trim()
  );

  return {
    airline,
    departAt,
    arriveAt,
    duration,
  };
}

    //returns the prices
  async function parseFlight(flight) {
    //trim gets rid of unnecessary whitespaces
    const price = await flight.$eval(
      '[class^="Price_mainPriceContainer"]',
      (el) => el.textContent.trim()
    );
    //find all the children of the upperticketbody_legs container to get flight data
    const [toDiv, fromDiv] = await flight.$$(
      '[class^="UpperTicketBody_legsContainer"] > div'
    );

    const to = await parseRoute(toDiv);
    const from = await parseRoute(fromDiv);
  return {
    price,
  };
}

async function scrapeFlights(from, to, departDate, returnDate) {
  console.log("Connecting to Scraping Browser...");

  const url = `https://www.skyscanner.net/transport/flights/${from}/${to}/${departDate}/${returnDate}/`;

  const browser = await puppeteer.connect({
    browserWSEndpoint: SBR_WS_ENDPOINT,
  });

  try {
    const page = await browser.newPage();
    console.log("Connected! Navigating to https://example.com...");

    //open the devtools
    const client = await page.target().createCDPSession();
    await openDevtools(page, client);


    await page.goto(url);

    //close privacy banner
    await page.locator("#cookieBannerContent button").click();

    //search for the flights; the ^= means starts with
    const flights = await page.$$('a[class^="FlightsTicket_link"]');
    //map makes new array with result of parseFlight function on the flights data
    const data = await Promise.all(flights.map(parseFlight));
    return data;
    
  } finally {
    await browser.close();
  }
}

module.exports = {
    scrapeFlights,
};
