const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    emailid: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: {
        type: [String],
        default: []
    },
});

module.exports = mongoose.model('users', userSchema);