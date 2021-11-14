import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

import { auth } from "../../firebase/firebase_config";
import logo from "../../assets/images/logos/logo_white_text.png";

import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";

import "./styles/nav_bar.scss";

function Nav({ authUser }) {
    const { userState } = useContext(UserContext);

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
                <div className="nav__btn">
                    <Link to="/shops/all">Shops</Link>
                </div>
                <div className="nav__btn">
                    <Link to="/wallet">Wallet</Link>
                </div>
                {authUser ? (
                    <>
                        <div
                            className="nav__btn"
                            onClick={handleSignOut}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSignOut();
                                }
                            }}
                        >
                            <LogoutIcon />
                        </div>
                        <div>
                            <Link to="/profile">
                                <Avatar
                                    src={userState.avatarUrl}
                                    loading="lazy"
                                />
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="nav__btn">
                        <Link to="/login">
                            <span>Login</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Nav;
