const data = require("./data/problemList.json");
const ProblemStatement = require("./model/ProblemStatement");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// 1764_B tak done hai

async function populate() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log(data[564]);
  for (let i = 565; i < data.length; i++) {
    let e = data[i];
    try {
      const url = `https://codeforces.com/problemset/problem/${e.contestId}/${e.index}`;
      console.log(url);
      await page.goto(url, { waitUntil: "networkidle2" });
      const data = await page.content();
      const $ = cheerio.load(data);
      $(
        'script[src="https://cdn-mathjax.codeforces.com/MathJax.js?config=TeX-AMS_HTML-full"]'
      ).remove();
      const question = $(".ttypography").clone();
      $("body").html("");
      $("body").append(question);

      const obj = {
        problemId: e.contestId + "_" + e.index,
        data: $.html(),
      };

      await ProblemStatement.create(obj);
      console.log(i + "--> done");
    } catch (err) {
      console.log(err);
    }
  }
  await browser.close();
}
module.exports = populate;
