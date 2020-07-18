import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import { Div, Form, Heading, Input, Button } from "../components/component"

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

    return (
        <Div>
            <Heading>MovieDB</Heading>
            <Form>
                <Input
                    type="text"
                    placeholder="enter your movie"
                    name="name"
                    value={search}
                    onInput={handleSearch}
                />
                <Button type="submit" onClick={handleSubmit}>
                    Get Results
                  </Button>
            </Form>
            <div>
                <ul id="movie">
                    {list.map(movie => (
                        <li key={movie.id}>
                            <Link to={`/moviedetail/${movie.id}`}>{movie.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Div>
    );
};

export default Home;