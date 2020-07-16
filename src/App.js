import React, { useState, useEffect } from "react";
import { Router, Link } from "@reach/router";
import "./App.css";
import styled from "styled-components";

const axios = require('axios');
const Div = styled.div`
  color: white;
  margin:5%;
  width: 90%;
`;
const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  padding: 1em;
  min-height:75px;
  padding: 1em;
  justify-content: space-between;
  align-items: center;
`;
const Input = styled.input`
  border: 1px solid red;
  width: 40%;
  min-height:20px;
  background: black;
  color:white;
`;
const Button = styled.button`
  border: none;
  color: white;
  background: blue;
  width: 20%;
  min-height:20px;
`;
const Heading = styled.h1`
  color: white;
  margin-left:45%;
`;
const Image = styled.img`
  max-widht:200px;
  max-height:400px;
`;
const Description = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content:space-between;
  align-items:center;
`;

const Home = () => {
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:5000/movie/search?name=${search}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(res => setList(res));
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

const MovieDetails = props => {
  const [details, setDetails] = useState({});

  const handleReturn = e => {
    window.location.href = "http://localhost:3000";
  };

  useEffect(() => {
    fetch(`http://localhost:5000/movie/details/${props.id}`, { method: "GET" })
      .then(res => res.json())
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

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const handlePost = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/index/login", user)
      .then(res => res.json())
      .then(res => localStorage.setItem('token', res.token))
      .catch(err => console.log(err))
  }
  return (
    <div>
      <form>
        <input type="text" placeholder="username" name="username" value={user.username} onChange={handlePost} ></input>
        <input type="password" placeholder="password" name="password" value={user.password} onChange={handlePost}></input>
        <button type="submit" onClick={handleLogin}>Log In</button>
      </form>
    </div>
  )
}

const Register = () => {
  const [newUser, setNewUser] = useState({ emailId: '', username: '', password: '' });

  const handleNewUser = (e) => {
    setNewUser({ ...name, [e.target.name]: e.target.value });
  }
  const handleRegister = (e) => {
    console.log(newUser);
    axios.post("https://locahhost:5000/index/register", newUser).then().catch()
  }
  return (
    <div>
      <form>
        <input type="text" placeholder="EmailId" value={newUser.emailId} name="emailId" onChange={handleNewUser} />
        <input type="text" placeholder="username" value={newUser.username}
          name="username" onChange={handleNewUser} />
        <inupt type="password" placeholder="Create your password" value={newUser.password} name="password" onChange={handleNewUser} />
        <button type="submit" onClick={handleRegister}>Register</button>
      </form>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Login path="/" />
      <MovieDetails path="/moviedetail/:id" />
      <Home path="/home" />
      <Register path="/register" />
    </Router>
  );
}

export default App;
