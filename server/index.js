const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const modelRoute = require('./routes/movie');
const userRoute = require('./routes/usrapi');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use('/index', userRoute);
app.use('/movie', modelRoute);

mongoose.connect('mongodb+srv://iamakshan:thisisakshan@cluster0-r5l7k.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected to db')).catch(err => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send('we are on home');
})

app.listen(5000, () => { console.log(`server running on PORT: ${PORT}`) });