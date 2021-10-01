import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ImageListItem from "@mui/material/ImageListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import "../../styles/product/latest_products_list.scss";

const itemData = [
    {
        created: "Jan 1 2021",
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        name: "Breakfast",
        shopName: "@bkristastucchio",
    },
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        name: "Burger",
        shopName: "@rollelflex_graphy726",
        created: "Jan 1 2021",
    },
    {
        created: "Jan 1 2021",
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        name: "Camera",
        shopName: "@helloimnik",
    },
    {
        created: "Jan 1 2021",
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        name: "Coffee",
        shopName: "@nolanissac",
    },
    {
        created: "Jan 1 2021",
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        name: "Hats",
        shopName: "@hjrc33",
    },
    {
        created: "Jan 1 2021",
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        name: "Honey",
        shopName: "@arwinneil",
    },
    {
        created: "Jan 1 2021",
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        name: "Basketball",
        shopName: "@tjdragotta",
    },
    {
        created: "Jan 1 2021",
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
        name: "Fern",
        shopName: "@katie_wasserman",
    },
    {
        created: "Jan 1 2021",
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
        name: "Mushrooms",
        shopName: "@silverdalex",
    },
    {
        created: "Jan 1 2021",
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        name: "Tomato basil",
        shopName: "@shelleypauls",
    },
    {
        created: "Jan 1 2021",
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        name: "Sea star",
        shopName: "@peterlaster",
    },
    {
        created: "Jan 1 2021",
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        name: "Bike",
        shopName: "@southside_customs",
    },
];

function LatestProductsList() {
    return (
        <>
            {itemData.map((product, i) => (
                <span key={i}>
                    <Card
                        sx={{
                            display: "flex",
                            marginBottom: "3px",
                            maxHeight: "120px",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={`${product.img}?w=140  &fit=crop&auto=format`}
                            alt="Live from space album cover"
                        />
                        <CardContent sx={{ flex: "1 0 auto" }}>
                            <Link to={`/product/${product.productId}`}>
                                <Typography type="title" component="h3">
                                    {product.name}
                                </Typography>
                            </Link>
                            <Link to={`/shops/${product.Id}`}>
                                <Typography type="subheading">
                                    <ShoppingBasketIcon /> {product.shopName}
                                </Typography>
                            </Link>
                            <Typography component="p">
                                Added on{" "}
                                {new Date(product.created).toDateString()}
                            </Typography>

                            <div className="item-footer">
                                <Typography type="subheading" component="h3">
                                    ${product.price}
                                </Typography>
                                <div className="icons-wrapper">
                                    <Link to={`/product/${product.Id}`}>
                                        <VisibilityIcon />
                                    </Link>
                                    <AddShoppingCartIcon />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </span>
            ))}
        </>
    );
}

export default LatestProductsList;
