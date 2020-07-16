
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Movies = require('../models/moviedb');
const path = require('path');
const html = String.raw;

const apiBase = `https://api.themoviedb.org/3`;

let configuration;

axios.get(`${apiBase}/configuration?api_key=f88f9063d5104e390414134ba5620dda&`)
    .then(res => configuration = res.data).catch(err => console.log(err));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../html/index.html"));
})
router.get('/search', (req, res) => {
    axios.get(`${apiBase}/search/movie?api_key=f88f9063d5104e390414134ba5620dda&query=${req.query.name}`).then(
        resp => {
            const resultant = resp.data.results.map(({ id, title }) => {

                return { id, title };
            })
            res.send(resultant);
        }
    ).catch(err => console.log(err))
        .finally(() => console.log('axios is working'))
});

router.get('/details/:id', async (req, res) => {
    const post = await Movies.findOne({ id: req.params.id });
    const base = configuration.images.secure_base_url;
    const size = configuration.images.poster_sizes[6];
    const imageUrl = base + size;
    if (!post) {
        axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=f88f9063d5104e390414134ba5620dda`).then(
            async movie => {
                console.log('from tmdb website');
                const movieDetails = movie.data;
                const movieObject = {
                    id: movieDetails.id,
                    title: movieDetails.title,
                    overview: movieDetails.overview,
                    image: imageUrl + movieDetails.poster_path,
                };
                await Movies.create({
                    id: req.params.id,
                    data: movie.data
                });
                return res.json(movieObject);

            }).catch(err => console.log(err))
    } else {
        const movieObject = {
            id: post.id,
            title: post.data.title,
            overview: post.data.overview,
            image: imageUrl + post.data.poster_path
        }
        return res.json(movieObject);
    }
})

router.get('/specific/:id', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../html/movie.html'));

    } catch (error) {
        console.log(error);
    }
});

router.get('/movieindb', async (req, res) => {
    try {
        const display = await Movies.find();
        res.json(display);
    } catch{
        res.json({ message: err });
    }
});

module.exports = router;