const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/register', async (req, res) => {
    const user = new User({
        emailid: req.body.emailid,
        username: req.body.username,
        password: req.body.password,
    });
    try {
        const userDetails = await user.save();
        res.json({ success: true });
    }
    catch (err) {
        res.statusCode = 500;
        res.json({ message: err });
    }
})

router.post('/login', async (req, res) => {
    const token = uuidv4();
    const user = User.findOneAndUpdate({ username=req.body.username, password=req.body.password }, { $post: { tokens: token } });
    res.json(token);
})