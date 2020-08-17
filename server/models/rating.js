const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    watchstatus: {
        type: String
    },
    movierating: {
        type: Number
    },
    userid: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    movieid: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ratingNew', ratingSchema);