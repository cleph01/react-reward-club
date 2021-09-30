import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import Products from "../components/products/ProductsGrid";

import Nav from "../components/nav_bar/Nav";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "100px",
        backgroundColor: "gainsboro",
    },
    card: {
        textAlign: "center",
        paddingBottom: "10px",
    },
    title: {
        margin: "10px",
        color: "#0e0e0e",
        fontSize: "1.2em",
    },
    subheading: {
        marginTop: "10px",
        color: "#0e0e0e",
    },
    bigAvatar: {
        width: 100,
        height: 100,
        margin: "auto",
    },
    productTitle: {
        padding: `25px 25px`,
        color: "#0e0e0e",
        width: "100%",
        fontSize: "3em",
    },
}));

// const logoUrl = shop._id
//           ? `/api/shops/logo/${shop._id}?${new Date().getTime()}`
//           : '/api/shops/defaultphoto'

function Shop() {
    const classes = useStyles();

    const [shop, setShop] = useState("");
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const logoUrl =
        "https://firebasestorage.googleapis.com/v0/b/socialiite-instagram-clone.appspot.com/o/images%2FIMG_82B4B1E571E6-1.jpeg?alt=media&token=4db7c353-d0a5-47c9-bc8a-31cdbbdad1e9";

    return (
        <div className={classes.root} style={{ height: "100vh" }}>
            <Nav />
            <Grid container spacing={8}>
                <Grid item xs={4} sm={4}>
                    <Card
                        className={classes.card}
                        style={{ marginLeft: "50px" }}
                    >
                        <CardContent>
                            <Typography
                                type="headline"
                                component="h2"
                                className={classes.title}
                            >
                                <h2>Shop</h2>
                                El Maestro Software Engineering
                            </Typography>
                            <br />
                            <Avatar
                                src={logoUrl}
                                className={classes.bigAvatar}
                            />
                            <br />
                            <Typography
                                type="subheading"
                                component="h2"
                                className={classes.subheading}
                            >
                                Code the way yo mama likes it
                            </Typography>

                            <br />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8} sm={8}>
                    <Card style={{ marginRight: "50px" }}>
                        <h3 style={{ marginLeft: "20px" }}>Products</h3>
                        <Products products={products} searched={false} />
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Shop;
