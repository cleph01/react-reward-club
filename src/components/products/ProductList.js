import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "../../styles/product/product_list.scss";

const itemData = [
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        category: "Breakfast",
        shopName: "@bkristastucchio",
    },
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        category: "Burger",
        shopName: "@rollelflex_graphy726",
    },
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        category: "Camera",
        shopName: "@helloimnik",
    },
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        category: "Coffee",
        shopName: "@nolanissac",
    },
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        category: "Hats",
        shopName: "@hjrc33",
    },
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        category: "Honey",
        shopName: "@arwinneil",
    },
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        category: "Basketball",
        shopName: "@tjdragotta",
    },
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
        category: "Fern",
        shopName: "@katie_wasserman",
    },
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
        category: "Mushrooms",
        shopName: "@silverdalex",
    },
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        category: "Tomato basil",
        shopName: "@shelleypauls",
    },
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        category: "Sea star",
        shopName: "@peterlaster",
    },
    {
        quantity: 20,
        price: 1.0,
        _id: "p001",
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        category: "Bike",
        shopName: "@southside_customs",
    },
];

function ProductList() {
    return (
        <List className="product-list-container">
            {itemData.map((shop, i) => (
                <Link to={`/shops/${shop.shopId}`} key={i}>
                    <Divider />
                    <ListItem className="product-list-item">
                        <ListItemAvatar>
                            <Avatar src={shop.img} />
                        </ListItemAvatar>
                        <div className="bla">
                            <Typography type="headline" component="h2">
                                {shop.category}
                            </Typography>
                            <span>
                                <Typography type="subheading" component="text">
                                    Quantity: {shop.quantity} | Price:{" "}
                                    {shop.price}
                                </Typography>
                            </span>
                        </div>
                        <ListItemSecondaryAction className="list-icons-wrapper">
                            <EditIcon className="list-icons" />
                            <DeleteForeverIcon className="list-icons" />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                </Link>
            ))}
        </List>
    );
}

export default ProductList;
