const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProblemStatement = new Schema({
   problemId: {
    type: String,
    required: true,
    },
    data: {
        type: String,
        required: true
    }
  
});

module.exports = mongoose.model("ProblemStatement", ProblemStatement);
