const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserData = new Schema({
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  skills: [String],
  bio: {
    type: String,
    default: "",
  },
  email: {
    type: String,
  },
  showEmail: {
    type: Boolean,
    default: false,
  },
  institute: {
    type: String,
    default: "CodeRace Academy",
  },
  rating: {
    type: Number,
    default: 0,
  },
  postCount: {
    type: Number,
    default: 0,
  },
  problemSolved: {
    type: {
      easy: Number,
      medium: Number,
      hard: Number,
    },
    default: {
      easy: 0,
      medium: 0,
      hard:0
    }
  },
  follower: [String],
  following: [String],
  tokens: {
    type: Number,
    default: 0,
  },
  github: {
    type: String,
    default: "https://github.com",
  },
  linkedIn: {
    type: String,
    default: "https://linkedIn.com",
  },
  likedpost: [String],
  savedpost: [String],
});

module.exports = mongoose.model("UserData", UserData);
