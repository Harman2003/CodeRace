const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemList = new Schema({
    contestId: {
        type: Number,
        required: true
    },
    index: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: undefined
    },
    tags:[String]
})

module.exports= mongoose.model('ProblemList', ProblemList)