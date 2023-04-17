const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const nanoid= require('nanoid')

const Submission = new Schema({
//   _id: {
//     type: String,
//     default: () => nanoid()
//   },
  username: {
    type: String,
    required: true,
  },
  problemName: {
    type: String,
    required: true,
  },
  problemId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  verdict: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Submission", Submission);
