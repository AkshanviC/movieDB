const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');
const axios = require('axios');

router.get('/displayrating/:id', async (req, res) => {
    const details = await Rating.findOne({ userid: res.locals.user._id, movieid: req.params.id });
    console.log('displayrating triggered');
    if (details) {
        res.json(details);
        console.log(details);
    }
    else {
        res.json({});
        console.log('no details found');
        console.log(res.locals.user._id);
        console.log(req.body.movieid);
    }
});

router.post('/postrating', async (req, res) => {
    console.log('triggers post');
    await Rating.updateOne({
        userid: res.locals.user._id,
        movieid: req.body.movieid,
    }, {
        userid: res.locals.user._id,
        movieid: req.body.movieid,
        watchstatus: req.body.watchstatus,
        movierating: req.body.movierating
    }, { upsert: true });
    try {
        res.json({ success: true });
        console.log("updated successfully");
    }
    catch (error) {
        res.json({ msg: error });
    }
})

module.exports = router;