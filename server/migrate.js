const mongoose = require('mongoose');
const express = require('express');
const axios = require('axios');
const app = express();
const Rating = require('./models/rating.js');
const RatingNew = require('./models/ratingNew.js');
const router = express.Router()
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://iamakshan:thisisakshan@cluster0-r5l7k.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected to db')).catch(err => {
    console.log(err);
});


app.get('/', async (req, res) => {
    const ratingdb = await Rating.find();
    const newrating = ratingdb.map(rating => {
        rating.movierating = Number(rating.movierating);
        return rating;
    });
    console.log(newrating);
    try {
        const promise = await RatingNew.insertMany(newrating);
        res.json(promise);
    }
    catch (error) {
        console.log(error);
    }
})

app.listen(5000, () => { console.log(`server running on PORT: ${PORT}`) });
