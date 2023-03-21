const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comments = new Schema({
    postId: {
        type: String,
        required: true
    },
    comments: [{username:String, data:String, createdAt: Date}]
})

module.exports = mongoose.model('Comment', Comments);