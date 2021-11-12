import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

import { auth } from "../../firebase/firebase_config";
import logo from "../../assets/images/logos/logo_white_text.png";

import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";

import "./styles/nav_bar.scss";

function Nav({ isAuthenticated }) {
    const { user, userState, userDispatch } = useContext(UserContext);

    let history = useHistory();

    const handleSignOut = () => {
        auth.signOut();

        history.push("/login");
    };

    return (
        <div className="navbar-container">
            <div className="logo-wrapper">
                <img className="logo" src={logo} alt="logo" />
            </div>
            <div className="navbar__body">
                <Link to="/profile">
                    <div>
                        <HomeIcon />
                    </div>
                </Link>

                <Link to="/wallet">
                    <div>Wallet</div>
                </Link>
                {user ? (
                    <>
                        <span
                            onClick={handleSignOut}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSignOut();
                                }
                            }}
                        >
                            Sign Out
                        </span>
                        <Link to="/profile">
                            <Avatar
                                src="https://pbs.twimg.com/profile_images/1435252656835022851/jen_MSfS_normal.jpg"
                                loading="lazy"
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <span>Login</span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Nav;
