const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    watchstatus: {
        type: String,
        enum: ["WATCHED", "PLANNED_TO_WATCH", "IN_PROGRESS"]
    },
    movierating: {
        type: String,
        enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
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

module.exports = mongoose.model('rating', ratingSchema);