const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');
const axios = require('axios');
const { count } = require('../models/rating');

router.get('/displayrating/:id', async (req, res) => {
    const details = await Rating.findOne({ userid: res.locals.user._id, movieid: req.params.id });
    let countValue = {
        Planned: "",
        Watched: "",
        Inprogress: ""
    };
    const watchStatus = await Rating.aggregate([{
        $match: {
            movieid: req.params.id,
        }
    }, {
        $group: {
            _id: '$watchstatus',
            count: { $sum: 1 }
        }
    }
    ]);
    watchStatus.forEach(status => {
        switch (status._id) {
            case 'WATCHED':
                countValue.Planned = status.count;
                break;
            case 'PLANNED_TO_WATCH':
                countValue.Watched = status.count;
                break;
            case 'IN_PROGRESS':
                countValue.Inprogress = status.count;
        }
    });

    const avgrating = await Rating.aggregate([{
        $match: {
            movieid: req.params.id,
        }
    }, {
        $group: {
            _id: '$movieid',
            average: {
                $avg: '$movierating'
            }
        }
    }]);

    if (!watchStatus) {
        watchstatus = null;
    }
    if (details) {
        res.json({
            rating: details,
            status: countValue,
            avrg: avgrating[0] && avgrating[0].average
        });
    }
    else {
        res.json({ rating: { movierating: null, watchstatus: null }, status: null, avrg: null });
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

// router.get('/averagerating/:id', async (req, res) => {
//     const avgrating = await Rating.aggregate([{
//         $match: {
//             movieid: req.params.id,
//         }
//     }, {
//         $group: {
//             _id: '$movieid',
//             average: {
//                 $avg: '$movierating'
//             }
//         }
//     }]);
//     console.log(avgrating[0]);
//     res.json(avgrating[0]);
// });

module.exports = router;