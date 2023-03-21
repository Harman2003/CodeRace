const https = require("https");
const cheerio = require('cheerio');

const handleProblem = (req, res) => {
  const id = req.params.id;
  const [contestId, index]= id.split('_')
  const url = `https://codeforces.com/problemset/problem/${contestId}/${index}`; 
  console.log(url);

    const options = {
      method: "GET",
      responseType:'arraybuffer'
    }

    const request = https.request(url, options, (response) => {
        let data=''
        response.on('data', chunk => {
            data += chunk;
        })

      response.on('end', () => {
        const $ = cheerio.load(data);
            const question = $('.ttypography').clone();
            $('body').html('');
            $('body').append(question);
             res.send($.html());
        })
    });

    request.on("error", (error) => {
      console.error(error);
    });

    request.end();
}

module.exports= handleProblem
