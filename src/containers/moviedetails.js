import React, { useState, useEffect } from "react";
import axios from "axios";
import { Description, Image } from "../components/component";

const MovieDetails = (props) => {
    const [details, setDetails] = useState({});

    const handleReturn = e => {
        window.location.href = "http://localhost:3000/home";
    };

    useEffect(() => {
        axios({
            method: "GET",
            headers: { Authentication: localStorage.getItem('token') },
            url: `http://localhost:5000/movie/details/${props.id}`
        })
            .then(res => res.data)
            .then(element => {
                setDetails(element);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Description>
            <button type="click" onClick={handleReturn}>
                back
              </button>
            <div id="title">
                <h1>{details.title}</h1>
            </div>
            <div id="overview">
                <h3>Overview:</h3>
                <p>{details.overview}</p>
            </div>
            <div id="id">
                <p>ID: {details.id}</p>
            </div>
            <div id="image">
                <Image src={details.image} />
            </div>
        </Description>
    );
};

export default MovieDetails;