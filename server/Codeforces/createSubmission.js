const https = require("https");
const querystring = require("querystring");
const getCSRF = require("./getCSRF");
const { cookieJar, loginCookie } = require("./logincf");
const getSubmission = require("./getSubmission");

const createSubmission = async(problemID, code, username, lang) => {
  //   await loginCookie();
  // console.log(cookieJar.getCookieStringSync("https://codeforces.com"));
  const [contestId, index] = problemID.split("_");
  const csrf = await getCSRF();
  console.log(csrf)
  const url = `https://codeforces.com/contest/${contestId}/submit?csrf_token=${csrf}`;

  const data = querystring.stringify({
    csrf_token: csrf,
    action: "submitSolutionFormSubmitted",
    ftaa: "exys0gcous9jfcjxk6",
    bfaa: "c58784951a5a39c5e11d97c0b7fd8bcd",
    contestId: contestId,
    submittedProblemIndex: index,
    programTypeId: "60",
    source: code,
    tabSize: "4",
    sourceCodeConfirmed: "true",
    _tta: "26",
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-encoding": "gzip, deflate, br",
      Cookie:
        "JSESSIONID=610CF1BC7D58E72E2D7B48371682E38F-n1; 39ce7=CFSpA0Sr; X-User-Sha1=0e80578596bdbf2ecfc2dbe4ab6761b7c6adbf0b; X-User=74269c82721710f79038ee1fbf378e96c8d5e97b0373ab47b2e1496d906c9ccc169a823ea31cc1a2",
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, async (res) => { 
      if (res.statusCode != 302) return;
      const time = new Date(res.headers.date);
      const timeInSeconds = Math.floor(time.getTime() / 1000);
      const submissionObj = await getSubmission(timeInSeconds, contestId, username);
    
      resolve({...submissionObj, lang:lang, problemId:problemID});
    });
  
    req.on("error", (error) => {
      reject(error)
    });
   
    req.write(data);
    req.end();
  })
}

module.exports= createSubmission
