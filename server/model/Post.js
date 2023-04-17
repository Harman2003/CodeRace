const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Posts = new Schema({
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    data: {
        type: Object,
        required:true
    },
    countComments: {
        type: Number,
        default:0
    },
    countLikes: {
        type: Number,
        default:0
    },
    countShare: {
        type: Number
    }
})

module.exports = mongoose.model('Post', Posts);