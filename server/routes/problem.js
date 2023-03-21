const express = require("express");
const router = express.Router();
const handleProblem = require("../controllers/cf/problemController");

router.get("/:id", handleProblem);

module.exports = router;

