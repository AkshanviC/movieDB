const mongoose = require('mongoose');

const moviedbSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: String,
    data: mongoose.SchemaTypes.Mixed,
});

module.exports = mongoose.model('moviedb', moviedbSchema);