const submissionData = require("../../model/Submission");

const getSubmissionController = async (req, res) => {
  const problemId = req.query.id;
  const username = req.query.username;
  if (!username) return res.sendStatus(404);

  const findObj = problemId
    ? { username: username, problemId: problemId }
        : { username: username };
  
  const list = await submissionData.find(findObj);
  const finalList = list.map((e) => {
    return {
      id: e._id,
      verdict: e.verdict,
      createdAt: e.createdAt,
      lang: e.lang,
    };
  });

  res.status(201).json({ result: finalList });
};

module.exports = getSubmissionController;
