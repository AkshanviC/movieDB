import React, { useState } from "react";
import { navigate } from "@reach/router";
import { Heading, Form, Input, Button, LoginDiv } from "../components/component";
import axios from "axios";



const Login = (props) => {
    const [user, setUser] = useState({ username: '', password: '' });
    const [err, setErr] = useState();
    const handlePost = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/index/login", user)
            .then(res => res.data)
            .then(res => {
                if (res) {
                    localStorage.setItem('token', res.token);
                    props.setError("");
                    setErr("");
                    navigate('/home');
                }
                else {
                    setErr('password is incorrect');
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <LoginDiv>
            <Heading>MovieDB</Heading>
            {(err) ? <p>{err}</p> : ""}
            <Form>
                {(props.error) ? <p>Please Log in to Continue</p> : ""}
                <Input type="text" placeholder="username" name="username" value={user.username} onChange={handlePost} ></Input>
                <Input type="password" placeholder="password" name="password" value={user.password} onChange={handlePost}></Input>
                <Button type="submit" onClick={handleLogin}>Log In</Button>
            </Form>
        </LoginDiv>
    )
}

export default Login;