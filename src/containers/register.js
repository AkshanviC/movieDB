import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import { Form, Heading, Input, Button, RegisterDiv, Note } from "../components/component";


const Register = (props) => {
    const [emailid, setEmailid] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailId = (e) => {
        setEmailid(e.target.value);
        axios({
            method: 'POST',
            url: "http://localhost:5000/index/emailcheck",
            data: { emailid: e.target.value }
        }).then(res => res.data)
            .then(res => {
                if (!res.success) {
                    props.setError(res.msg);
                } else {
                    props.setError("");
                }
            }
            )
    }
    const handleUsername = (e) => {
        setUsername(e.target.value);
        axios({
            method: 'POST',
            url: "http://localhost:5000/index/usernamecheck",
            data: { username: e.target.value }
        }).then(res => res.data)
            .then(res => {
                if (!res.success) {
                    props.setError(res.msg);
                } else {
                    props.setError("");
                }
            })
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: "http://localhost:5000/index/register",
            data: { username: username, emailid: emailid, password: password }
        }).then(res => res.data)
            .then(res => {
                props.setError("");
                navigate('/login');
            }).catch(err => console.log(err));
    }
    return (
        <RegisterDiv>
            <Heading>MovieDB</Heading>
            <Form>
                <Input type="text" placeholder="EmailId" value={emailid} name="emailid" onChange={handleEmailId} />
                <Input type="text" placeholder="username" value={username}
                    name="username" onChange={handleUsername} />
                <Input type="password" placeholder="Create your password" value={password} name="password" onChange={handlePassword} />
            </Form>
            <Button type="submit" onClick={handleRegister}>Register</Button>
            <p>Already a new user? Click here to <Link to="/login">Login</Link></p>
            <Note>
                {(props.error) ? <p>{props.error}</p> : ""}
            </Note>
        </RegisterDiv>
    )
}

export default Register;