const https = require('https');
const querystring = require('querystring');
const tough = require("tough-cookie");
// const {MemoryCookieStore}
const getCSRF = require('./getCSRF');
const cookieJar = new tough.CookieJar();

const loginCookie = async () => {

  const url = "https://codeforces.com/enter";
  const csrf = await getCSRF();
  const data = querystring.stringify({
    csrf_token: csrf,
    action: "enter",
    ftaa: "exys0gcous9jfcjxk6",
    bfaa: "7037c6cc3d3c7e6cbeed4a017523190b",
    handleOrEmail: "Sample_Coderace",
    password: "sampleCoderace",
    remember: "on",
    _tta: "327",
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-encoding": "gzip, deflate, br",
    },
  };

  const req = https.request(url, options, (res) => {
    const setCookie = res.headers["set-cookie"];
    if (setCookie) {
      setCookie.forEach((element) => {
        const cookie = tough.Cookie.parse(element);
        cookieJar.setCookieSync(cookie, "https://codeforces.com");
      
      });
      // console.log(cookieJar.getCookieStringSync("https://codeforces.com"));
      return cookieJar;
    }
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

loginCookie()
module.exports = {cookieJar, loginCookie};

