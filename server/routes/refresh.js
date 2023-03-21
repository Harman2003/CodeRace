const express = require("express");
const router = express.Router();
const refreshJWT = require("../controllers/refreshController");

router.get("/", refreshJWT);

module.exports = router;
