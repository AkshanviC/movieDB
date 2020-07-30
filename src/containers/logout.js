import React from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { Back } from "../components/component"

const Logout = () => {
    const handleLogout = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            headers: { Authentication: localStorage.getItem('token') },
            url: `http://localhost:5000/index/logout`
        }).then(
            res => res.data
        ).then(
            res => {
                localStorage.removeItem('token');
                navigate('/login');
                console.log(res);
            }
        ).catch(err => console.log(err))
    }

    return (
        <div>
            <Back onClick={handleLogout}>Logout</Back>
        </div>
    )
}

export default Logout;