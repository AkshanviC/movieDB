import React, { useState } from "react";
import { Router } from "@reach/router";
import "./App.css"
import Login from "./containers/login";
import Register from "./containers/register";
import MovieDetails from "./containers/moviedetails";
import Home from "./containers/home";



function App() {
  const [error, setError] = useState();
  return (
    <Router>
      <Register path="/" />
      <Login path="/login" error={error} setError={setError} />
      <MovieDetails path="/moviedetail/:id" />
      <Home path="/home" error={error} setError={setError} />
    </Router>
  );
}

export default App;
