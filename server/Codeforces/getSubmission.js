const getID = require("./getSubmissionId");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const getSubmission = async (timeInSeconds, contestId, username) => {
  console.log("came");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const { problemName, submissionID, verdict } = await getID(timeInSeconds);
  console.log(submissionID);
  const url = `https://codeforces.com/contest/${contestId}/submission/${submissionID}`;
  await page.goto(url, { waitUntil: "networkidle0" });

  const testCaseRequest = page.waitForResponse(
    (res) => res.url() === "https://codeforces.com/data/submitSource"
  )
 
  await page.click(".click-to-view-tests");
  await testCaseRequest;
  const html = await page.content();
  await browser.close();

  $ = cheerio.load(html);
  const pageContent = $("#pageContent").clone();
  $("body").html("");
  $("body").append(pageContent);
  $(".second-level-menu").removeClass("second-level-menu").remove();
  $(".rated-user").text(username);
  $("body")
    .find("*")
    .each(function () {
      const $this = $(this);
      $this.html($this.html().replace(submissionID, "-"));
    });

  return {
    username: username,
    problemName: problemName,
    createdAt: timeInSeconds,
    verdict: verdict,
    code: $.html(),
  };
};

module.exports = getSubmission;
