const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// puppeteer usage as normal
puppeteer.launch({ headless: false }).then(async (browser) => {
  console.log("Running tests..");
  const page = await browser.newPage();
  await page.goto(
    "https://codeforces.com/contest/1778/problem/C"
  );
    await page.waitForTimeout(5000);
    // console.log(await page.content())
  await browser.close();
  console.log(`All done, check the screenshot. ✨`);
});
