import React, { useContext } from "react";
import Auth from "../../Auth";
import { Redirect } from "react-router";

import { UserContext } from "../../contexts/UserContext";

import "./styles/home.scss";

import logo from "../../assets/images/logos/logo.png";

function Home() {
    const { userState } = useContext(UserContext);

    if (userState.isAuthenticated) {
        return <Redirect to={`/profile/${userState.userId}`} />;
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

export default Home;
