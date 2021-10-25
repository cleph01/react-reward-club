import { useContext } from "react";

import { Redirect } from "react-router";

import { useParams } from "react-router-dom";

import Auth from "../../Auth";

import { UserContext } from "../../contexts/UserContext";

import "./styles/login.scss";

import logo from "../../assets/images/logos/logo.png";

function Login() {
    const { userState } = useContext(UserContext);

    const { referrerId } = useParams();

    if (userState.isAuthenticated) {
        return <Redirect to="/profile" />;
    }

    console.log("ReferrerId: ", referrerId);

    return (
        <div className="container">
            <div className="body-wrapper">
                <div className="image-wrapper">
                    <img className="logo" src={logo} alt="logo" />
                </div>

                <h3>Win Stuff, Trade Stuff, Share Stuff</h3>
                <h3>and Get Paid</h3>

                <Auth referrerId={referrerId} />
            </div>
        </div>
    );
}

export default Login;
