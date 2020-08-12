import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import { HomeDiv, MovieForm, Heading, Input, Button, LogoutDiv } from "../components/component";
import Logout from "./logout";

const Home = (props) => {
    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);

    const handleSearch = e => {
        setSearch(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios({
            method: "GET",
            headers: { Authentication: localStorage.getItem('token') },
            url: `http://localhost:5000/movie/search?name=${search}`
        })
            .then(res => res.data)
            .then(res => {
                setList(res)
            }).catch(err => {
                console.log(err);
                props.setError(err);
                navigate('/login')
            });
    };

    const handleDb = (e) => {
        e.preventDefault();
        navigate('/movieindb');
    }

    return (
        <HomeDiv>
            <LogoutDiv>
                <Logout />
            </LogoutDiv>
            <Heading>MovieDB</Heading>
            <MovieForm>
                <Input
                    type="text"
                    placeholder="enter your movie"
                    name="name"
                    value={search}
                    onInput={handleSearch}
                />

            </MovieForm>
            <Button type="submit" onClick={handleSubmit}>
                Get Results
                  </Button>
            <Button type="submit" onClick={handleDb}>
                Movie in Db
            </Button>
            <div>
                <ul id="movie">
                    {list.map(movie => (
                        <li key={movie.id}>
                            <Link to={`/moviedetail/${movie.id}`}>{movie.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </HomeDiv>
    );
};

export default Home;