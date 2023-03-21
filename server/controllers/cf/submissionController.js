const createSubmission = require("../../Codeforces/createSubmission");
const SubmissionData= require('../../model/Submission')

const submissionController = async (req, res) => {
  const problemID = req.query.id;
  const username = req.query.username;
  const {code , lang} = req.body;

  if (!problemID || !username || !code) return res.sendStatus(404)
    const submissionObj = await createSubmission(problemID, code, username, lang);
  if (!submissionObj?.code) {
    res.sendStatus(409);
  }
  
  SubmissionData.create(submissionObj);
  res.status(201).send(submissionObj.code); 
}

module.exports = submissionController;
