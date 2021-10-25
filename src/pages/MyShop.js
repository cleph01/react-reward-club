import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
import Nav from "../components/nav_bar/Nav";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Avatar from "@mui/material/Avatar";

import "../styles/shop/my_shop.scss";

const Shops = lazy(() => import("../components/shop/MyShops"));

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        marginTop: "100px",
        paddingBottom: "10px",
    },
}));

function Shop() {
    const classes = useStyles();

    const imageSrc =
        "https://firebasestorage.googleapis.com/v0/b/socialiite-instagram-clone.appspot.com/o/images%2FIMG_82B4B1E571E6-1.jpeg?alt=media&token=4db7c353-d0a5-47c9-bc8a-31cdbbdad1e9";

    return (
        <div className="shop-container">
            <Card className={classes.card}>
                <CardContent>
                    <div className="shop-header">
                        <div className="header-avatar-wrapper">
                            <Avatar alt="Charlie" src={imageSrc} />
                            <h3>Your Shops</h3>
                        </div>
                        <Link to="/seller/shop/new">
                            <div className="add-shop-btn">
                                <AddBoxIcon />
                                New Shop
                            </div>
                        </Link>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Shops />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}

export default Shop;
