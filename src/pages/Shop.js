import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import Products from "../components/products/Products";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 30,
    },
    card: {
        textAlign: "center",
        paddingBottom: theme.spacing(2),
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle,
        fontSize: "1.2em",
    },
    subheading: {
        marginTop: theme.spacing(1),
        color: theme.palette.openTitle,
    },
    bigAvatar: {
        width: 100,
        height: 100,
        margin: "auto",
    },
    productTitle: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
            1
        )}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        width: "100%",
        fontSize: "1.2em",
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
        <div className={classes.root}>
            <Grid container spacing={8}>
                <Grid item xs={4} sm={4}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography
                                type="headline"
                                component="h2"
                                className={classes.title}
                            >
                                {shop.name}
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
                                {shop.description}
                            </Typography>
                            <br />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8} sm={8}>
                    <Card>
                        <Typography
                            type="title"
                            component="h2"
                            className={classes.productTitle}
                        >
                            Products
                        </Typography>
                        <Products products={products} searched={false} />
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Shop;
