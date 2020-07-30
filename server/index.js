const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const modelRoute = require('./routes/movie');
const userRoute = require('./routes/usrapi');
const ratingRoute = require('./routes/ratingapi');
const cors = require('cors');
const User = require('./models/users');
app.use(cors());
app.use(bodyParser.json());


const verifyuser = async (req, res, next) => {
    // req.headers

    // User
    await User.findOne({ tokens: req.headers.authentication })
        .then(user => {
            if (user) {
                res.locals.user = user;

                next();
            } else {
                res.statusCode = 401;
                res.json({ success: false, msg: "unauthorised" });
            }
        }).catch(err => console.log(err));
};

app.use('/index', userRoute);
app.use('/movie', verifyuser, modelRoute);
app.use('/rating', verifyuser, ratingRoute);

mongoose.connect('mongodb+srv://iamakshan:thisisakshan@cluster0-r5l7k.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected to db')).catch(err => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send('we are on home');
})

app.listen(5000, () => { console.log(`server running on PORT: ${PORT}`) });