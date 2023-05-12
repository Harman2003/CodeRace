const { Requester, Validator } = require("@chainlink/external-adapter");

// Define custom error scenarios for the API.
// Return true for the adapter to retry.
const customError = (data) => {
  if (data.Response === "Error") return true;
  return false;
};

// Define custom parameters to be used by the adapter.
// Extra parameters can be stated in the extra object,
// with a Boolean value indicating whether or not they
// should be required.
const customParams = {
  contestId: ["contest", "contestId"],
  handles: ["handles", "usernames"],
  uniqueId: ["uniqueId"],
  prizeDist: ["distribution", "prizeDist"],
  endpoint: false,
};

const createRequest = (input, callback) => {
  // The Validator helps you validate the Chainlink request data
  const validator = new Validator(callback, input, customParams);
  const jobRunID = validator.validated.id;
  const endpoint = validator.validated.data.endpoint || "contest.ratingChanges";
  const url = `https://codeforces.com/api/${endpoint}`;
  const contestId = validator.validated.data.contestId;
  const handles = validator.validated.data.handles;
  const handlesMap = new Map();
  handles.forEach((ele) => {
    handlesMap.set(ele, undefined);
  });
  const uniqueId = validator.validated.data.uniqueId;
  const prizeDist = validator.validated.data.prizeDist;

  const params = {
    contestId,
  };

  // This is where you would add method and headers
  // you can add method like GET or POST and add it to the config
  // The default is GET requests
  // method = 'get'
  // headers = 'headers.....'
  const config = {
    url,
    params,
  };

  // The Requester allows API calls be retry in case of timeout
  // or connection failure
  Requester.request(config, customError)
    .then((response) => {
      // It's common practice to store the desired value at the top-level
      // result key. This allows different adapters to be compatible with
      // one another.
      // response.data.result = Requester.success(response.data, ["result"])

      callback(
        response.status,
        Requester.success(jobRunID, handleResponse(response))
      );
    })
    .catch((err) => {
      callback(
        200,
        Requester.success(jobRunID, { data: { result: [uniqueId] } })
      );
    });

  function handleResponse(res) {
    const ranking = handleUsernames(res); //["john", "peter", "tony"]
    const prizeList = handlePrizeDist(ranking.length); //[1, 0.1 Eth, 1, 0.05 Eth, 8, 0.02 Eth, ...]

    // Didn't got accurate prizeList Distribution
    if (!prizeList || prizeList.length % 2 != 0) {
      return { ...res, data: { result: [uniqueId] } };
    }

    const winnerList = [];
    winnerList.push(uniqueId);

    let rankPointer = 0;
    for (let i = 0; i < prizeList.length; i += 2) {
      let count = prizeList[i];
      while (count > 0 && rankPointer < ranking.length) {
        winnerList.push(ranking[rankPointer]);
        winnerList.push(prizeList[i + 1]);
        rankPointer++;
        count--;
      }
    }

    const dataObject = { result: winnerList };
    return { ...res, data: dataObject };
  }

  function handleUsernames(res) {
    const result = res.data["result"];
    const ranking = result
      .filter((obj) => handlesMap.has(obj.handle))
      .map((obj) => obj.handle);
    return ranking;
  }

  function handlePrizeDist(count) {
    let list = [];
    try {
      const prizeJson = JSON.parse(prizeDist);
      const playerCountList = prizeJson["mapping"];

      let key = -1;
      for (const item in playerCountList) {
        if (count < playerCountList[item]) {
          key = playerCountList[item];
          break;
        }
      }
      list = key != -1 ? prizeJson[`${key}`] : prizeJson["default"];
    } catch (err) {
      return [];
    }
    return list;
  }

  // This is a wrapper to allow the function to work with
  // GCP Functions
  exports.gcpservice = (req, res) => {
    createRequest(req.body, (statusCode, data) => {
      res.status(statusCode).send(data);
    });
  };
};
// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data);
  });
};

// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    });
  });
};

// This allows the function to be exported for testing
// or for running in express
module.exports.createRequest = createRequest;
