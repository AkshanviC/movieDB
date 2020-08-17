import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { navigate, Link } from '@reach/router';

const UL = styled.ul`
    display: flex;
    margin-left: 0;
    padding-left: 0;
    
    li {
        list-style: none;
        padding: 1rem;
        background: white;
        border: 1px solid #87CEFA ;

        a {
            text-decoration: none;
            color:#0000CD;
        }
    }
`;

const MovieinDB = () => {
    const [post, setPost] = useState([]);
    const [totalMovies, setTotalMovies] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const pageNumbers = [];
    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/movie/movieindb/${1}`,
            headers: { Authentication: localStorage.getItem('token') }
        })
            .then(res => res.data)
            .then(res => {
                setPost(res.movies);
                setTotalMovies(res.value);
            })
            .catch(err => console.log(err));
    }, []);

    for (let i = 1; i <= Math.ceil(totalMovies / 10); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        axios({
            method: 'GET',
            url: `http://localhost:5000/movie/movieindb/${pageNumber}`,
            headers: { Authentication: localStorage.getItem('token') }
        }).then(res => res.data)
            .then(res => setPost(res.movies)
            ).catch(err => console.log(err));
    }

    return (
        <div>
            <ul>
                {post.map(post => (
                    <li key={post.id}><Link to={`/moviedetail/${post.id}`}>{post.data.title}</Link></li>
                ))}
            </ul>
            <UL>
                {pageNumbers.map(page => (
                    <li key={page} ><a onClick={() => paginate(page)} href="#">{page}</a></li>
                ))}
            </UL>
        </div>
    );

}

export default MovieinDB;