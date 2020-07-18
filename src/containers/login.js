import React, { useState } from "react";
import { navigate } from "@reach/router";
import { Heading, Form, Input } from "../components/component";
import axios from "axios";



const Login = (props) => {
    const [user, setUser] = useState({ username: '', password: '' });
    const handlePost = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/index/login", user)
            .then(res => res.data)
            .then(res => {
                localStorage.setItem('token', res.token);
                props.setError("");
                navigate('/home');
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <Heading>MovieDB</Heading>
            <Form>
                {(props.error) ? <p>Please Log in to Continue</p> : ""}
                <Input type="text" placeholder="username" name="username" value={user.username} onChange={handlePost} ></Input>
                <Input type="password" placeholder="password" name="password" value={user.password} onChange={handlePost}></Input>
                <button type="submit" onClick={handleLogin}>Log In</button>
            </Form>
        </div>
    )
}

export default Login;