const submissionData = require("../../model/Submission");

const getSubmissionCode = async (req, res) => {
  const submissionId = req.params.id;
  if (!submissionId) return res.sendStatus(404);

  const obj = await submissionData.findOne({_id: submissionId});
    res.status(201).send(obj.code);
};

module.exports = getSubmissionCode;
