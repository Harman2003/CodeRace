const express = require("express");
const getMembersController = require("../controllers/members/getMembersController");
const FriendController = require("../controllers/members/FriendController");
const router = express.Router();

router.get("/", getMembersController);
router.post("/friends", FriendController);

module.exports= router