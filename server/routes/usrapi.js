const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/emailcheck', async (req, res) => {
    const check = await User.findOne({ emailid: req.body.emailid });
    if (check) {
        res.json({ success: false, msg: 'email already exists' })
    } else {
        res.json({ success: true });
    }

})

router.post('/usernamecheck', async (req, res) => {
    const check = await User.findOne({ username: req.body.username });
    if (check) {
        res.json({ success: false, msg: 'username already taken' })
    }
    else {
        res.json({ success: true });
    }
})

router.post('/register', async (req, res) => {
    const user = new User({
        emailid: req.body.emailid,
        username: req.body.username,
        password: req.body.password,
    });
    try {
        const userDetails = await user.save();
        res.json({ success: true });
        console.log('success');
    }
    catch (err) {
        res.statusCode = 500;
        res.json({ message: err });
        console.log('failure');
    }
})

router.post('/login', async (req, res) => {
    const token = uuidv4();
    await User.updateOne({ username: req.body.username, password: req.body.password }, { $push: { tokens: token } });
    res.json({ token });
})

module.exports = router;