const axios = require("../api/axios"); 

const getID = async (timeInSeconds) => {
  const url = `https://codeforces.com/api/user.status?handle=Harman2003&from=1&count=1`;

  let element;
  let isFound = false;
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 8000)
  );
  while (!isFound) {
    const response = await axios.get(url);
     await new Promise((resolve) =>
       setTimeout(() => {
         resolve();
       }, 2000)
     )
    const list = response.data.result;
    console.log()
    element = list.find((e) => (timeInSeconds+3 >= e.creationTimeSeconds && timeInSeconds-3<=e.creationTimeSeconds))
    console.log(timeInSeconds)
    console.log(element?.verdict);
    if (element?.verdict && element.verdict !== "TESTING") isFound = true;
    else isFound = false;
  } 
  return {
    problemName: element?.problem.name,
    submissionID: element?.id,
    verdict: element?.verdict,
  };
};

module.exports = getID;
