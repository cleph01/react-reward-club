import React from "react";

import { useHistory } from "react-router-dom";

import "../styles/home.scss";

import logo from "../assets/images/logos/logo.png";
import logo_text from "../assets/images/logos/logo_white_text.png";

function Home() {
    const history = useHistory();

    return (
        <div className="container">
            <div className="header">
                <div className="menu-wrapper">
                    <ul className="menu">
                        <li>Why?</li>
                        <li>FAQ</li>
                        <li>Testimonials</li>
                    </ul>
                </div>
            </div>
            <div className="body-wrapper">
                <div className="image-wrapper">
                    <img src={logo} alt="logo" />
                </div>

                <h3>Win Prizes, Trade, and Get Paid</h3>
                <p>
                    Socialiite's mission is to re-define how we use social
                    media. User's get paid for creating content while also
                    promoting local businesses.
                </p>
                <div className="auth-buttons">
                    <div
                        className="buttons"
                        onClick={() => history.push("/login")}
                    >
                        Login
                    </div>
                    <div
                        className="buttons"
                        onClick={() => history.push("/signup")}
                    >
                        Signup
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
