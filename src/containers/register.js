import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import { Form, Heading, Input, P } from "../components/component";


const Register = (props) => {
    const [newUser, setNewUser] = useState({ emailid: '', username: '', password: '' });

    const handleNewUser = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
    const handleRegister = (e) => {
        console.log(newUser);
        e.preventDefault();
        axios.post("http://localhost:5000/index/register", newUser).then(
            res => {
                console.log(res);
                navigate('/login')
            }
        ).catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <Heading>MovieDB</Heading>
            <Form>
                <Input type="text" placeholder="EmailId" value={newUser.emailid} name="emailid" onChange={handleNewUser} />
                <Input type="text" placeholder="username" value={newUser.username}
                    name="username" onChange={handleNewUser} />
                <Input type="password" placeholder="Create your password" value={newUser.password} name="password" onChange={handleNewUser} />
                <button type="submit" onClick={handleRegister}>Register</button>
            </Form>
            <P>Already a new user? Click here to <Link to="/login">Login</Link></P>
        </div>
    )
}

export default Register;