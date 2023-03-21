const https = require("https");

const url = "https://codeforces.com/enter";

const options = {
  method: "POST",
  responseType: "arraybuffer",
};

const getCSRF = async () => {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (response) => {
      let data;
      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", async () => {
        const regex = /csrf='(.+?)'/g;
        const result = data.match(regex);
        const csrf = result.join().split("=")[1];
        resolve(csrf.substring(1, csrf.length - 1));
      });
    });

    req.on("error", (error) => {
      console.error(error);
    });

    req.end();
  });
};

module.exports = getCSRF;
