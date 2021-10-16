import { useState, useContext } from "react";

import { Redirect } from "react-router";

import { useLocation } from "react-router";

import Auth from "../../Auth";

import { UserContext } from "../../contexts/UserContext";

import "./styles/login.scss";

import logo from "../../assets/images/logos/logo.png";

function Login() {
    const { user } = useContext(UserContext);

    user
        ? console.log("Login User Id:", user.uid)
        : console.log("No User at Login");

    if (user) {
        return <Redirect to={`/dashboard/${user.uid}`} />;
    }

    return (
        <div className="container">
            <div className="body-wrapper">
                <div className="image-wrapper">
                    <img className="logo" src={logo} alt="logo" />
                </div>

                <h3>Win Stuff, Trade Stuff, Share Stuff</h3>
                <h3>and Get Paid</h3>

                <Auth />
            </div>
        </div>
    );
}

export default Login;
