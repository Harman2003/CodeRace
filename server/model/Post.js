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
        type: Number
    },
    countLikes: {
        type: Number
    },
    countShare: {
        type: Number
    },
    countSaved: {
        type:Number
    }
})

module.exports = mongoose.model('Post', Posts);