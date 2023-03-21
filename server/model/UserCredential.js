const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserCredential = new Schema({
    fullname: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
})

module.exports = mongoose.model('User Credential', UserCredential);