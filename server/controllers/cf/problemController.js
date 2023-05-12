// const https = require("https");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const handleProblem = async (req, res) => {
  const id = req.params.id;
  const [contestId, index] = id.split("_");
  const url = `https://codeforces.com/problemset/problem/${contestId}/${index}`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  console.log('came');
  const data = await page.content();
  await browser.close();
  // const options = {
  //   method: "GET",
  //   responseType: "arraybuffer"
  // };

  // const request = https.request(url, options, (response) => {
  //     let data=''
  //     response.on('data', chunk => {
  //         data += chunk;
  //     })

  //   response.on('end', () => {
  const $ = cheerio.load(data);
  const question = $(".ttypography").clone();
  $("body").html("");
  $("body").append(question);
  // $(
  //   'script[src="https://cdn-mathjax.codeforces.com/MathJax.js?config=TeX-AMS_HTML-full"]'
  // ).remove();
  res.send($.html());
  //     })
  // });

  // request.on("error", (error) => {
  //   console.error(error);
  // });

  // request.end();
};

module.exports = handleProblem;
