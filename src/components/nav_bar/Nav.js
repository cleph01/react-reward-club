import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/logos/logo_white_text.png";
import "./styles/nav_bar.scss";
import HomeIcon from "@mui/icons-material/Home";

import { UserContext } from "../../contexts/UserContext";

import { auth } from "../../firebase/firebase_config";

function Nav({ isAuthenticated }) {
    const { userState, userDispatch } = useContext(UserContext);

    let history = useHistory();

    const handleSignOut = () => {
        auth.signOut();
        userDispatch({ type: "AUTH/LOGOUT" });
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
                {/* <Link to="/market">
                    <div>Market Place</div>
                </Link>
                <Link to="/cart">
                    <div style={{ paddingRight: "15px" }}>
                        Cart
                        <Badge
                            color="primary"
                            invisible={false}
                            // badgeContent={cart.itemTotal()}
                            badgeContent="3"
                            style={{ marginLeft: "7px" }}
                        >
                            <CartIcon />
                        </Badge>
                    </div>
                </Link>
                <Link to="/shop/:userId">
                    <div>My Shop</div>
                </Link> */}

                <Link to="/wallet">
                    <div>Wallet</div>
                </Link>
                {isAuthenticated ? (
                    <span onClick={handleSignOut}>Sign Out</span>
                ) : (
                    <Link to="/login">
                        <span>Login</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Nav;
