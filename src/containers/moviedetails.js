import React, { useState, useEffect } from "react";
import axios from "axios";
import { Description, Image, Rating, Back, RatingForm, ButtonDiv, Select, StatusForm } from "../components/component";
import Logout from "./logout";

const MovieDetails = (props) => {
    const [details, setDetails] = useState({});
    const [ratingandStatus, setRatingandStatus] = useState({ movierating: '', watchstatus: "" });

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

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:5000/rating/displayrating/${props.id}`,
            headers: { Authentication: localStorage.getItem('token') }
        })
            .then(res => res.data)
            .then(element => {
                setRatingandStatus(element);
                console.log(props.id);
            })
            .catch(err => console.log(err))
    }, []);

    const handleChange = name => (e) => {
        const state = { ...ratingandStatus, [name]: e.target.value };
        setRatingandStatus(state);
        axios({
            method: "POST",
            url: "http://localhost:5000/rating/postrating",
            data: {
                movieid: details.id,
                movierating: state.movierating,
                watchstatus: state.watchstatus
            },
            headers: { Authentication: localStorage.getItem('token') }
        }).then(
            res => res.data)
            .then(
                res => console.log(res)
            ).catch(err => {
                console.log('error occured');
                console.log(err);
            })
    }

    return (
        <Description>
            <ButtonDiv>
                <Back type="click" onClick={handleReturn}>
                    back
                </Back>
                <Logout />
            </ButtonDiv>
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
            <Rating>
                <RatingForm>
                    <Select value={ratingandStatus.movierating} onChange={handleChange("movierating")}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </Select>
                    {(ratingandStatus.movierating) ? <p>Your rating for the movie: {ratingandStatus.movierating}</p> : ""}
                </RatingForm>
                <StatusForm>
                    <Select value={ratingandStatus.watchstatus} onChange={handleChange("watchstatus")}>
                        <option value="WATCHED">Watched</option>
                        <option value="PLANNED_TO_WATCH">planned to watch</option>
                        <option value="IN_PROGRESS">In progress</option>
                    </Select>
                    {(ratingandStatus.watchstatus) ? <p>Your Watch Satus: {ratingandStatus.watchstatus}</p> : ""}
                </StatusForm>
            </Rating>
            <div id="image">
                <Image src={details.image} />
            </div>
        </Description>
    );
};

export default MovieDetails;