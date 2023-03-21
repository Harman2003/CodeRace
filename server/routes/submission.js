const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/cf/submissionController");
const getSubmissionList= require("../controllers/cf/getSubmissionList")
const getSubmittionCode= require("../controllers/cf/getSubmittedCode");
const verifyJWT = require("../middleware/verifyJWT");

router.get('/:id', getSubmittionCode);
router.use(verifyJWT);
router.post("/", submissionController);
router.get("/", getSubmissionList);

module.exports = router;
