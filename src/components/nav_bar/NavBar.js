import React from "react";
import { Link, withRouter } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
// import auth from "./../auth/auth-helper";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

import logo from "../../assets/images/logos/logo_white_text.png";

import "../../styles/nav_bar.scss";

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#bef67a" };
    else return { color: "#ffffff" };
};
const isPartActive = (history, path) => {
    if (history.location.pathname.includes(path)) return { color: "#bef67a" };
    else return { color: "#ffffff" };
};

const NavBar = withRouter(({ history }) => (
    <AppBar
        className="navbar-container"
        position="fixed"
        style={{ backgroundColor: "#213b77" }}
    >
        <Toolbar>
            <div>
                <img className="logo" src={logo} loading="lazy" alt="logo" />

                <Link to="/">
                    <IconButton
                        aria-label="Home"
                        style={isActive(history, "/")}
                    >
                        <HomeIcon />
                    </IconButton>
                </Link>
                <Link to="/shops/all">
                    <Button style={isActive(history, "/shops/all")}>
                        Market Place
                    </Button>
                </Link>
                <Link to="/cart">
                    <Button style={isActive(history, "/cart")}>
                        Cart
                        <Badge
                            color="secondary"
                            invisible={false}
                            // badgeContent={cart.itemTotal()}
                            style={{ marginLeft: "7px" }}
                        >
                            <CartIcon />
                        </Badge>
                    </Button>
                </Link>
            </div>

            <div style={{ position: "absolute", right: "10px" }}>
                <span style={{ float: "right" }}>
                    {!true && (
                        <span>
                            <Link to="/signup">
                                <Button style={isActive(history, "/signup")}>
                                    Sign up
                                </Button>
                            </Link>
                            <Link to="/signin">
                                <Button style={isActive(history, "/signin")}>
                                    Sign In
                                </Button>
                            </Link>
                        </span>
                    )}
                    {true && (
                        <span>
                            {true && (
                                <Link to="/seller/shops">
                                    <Button
                                        style={isPartActive(
                                            history,
                                            "/seller/"
                                        )}
                                    >
                                        My Shops
                                    </Button>
                                </Link>
                            )}
                            <Link to={"/profile/002"}>
                                <Button style={isActive(history, "/user/u002")}>
                                    My Profile
                                </Button>
                            </Link>
                            <Button
                                color="inherit"
                                // onClick={() => {
                                //     auth.clearJWT(() => history.push("/"));
                                // }}
                            >
                                Sign out
                            </Button>
                        </span>
                    )}
                </span>
            </div>
        </Toolbar>
    </AppBar>
));

export default NavBar;
