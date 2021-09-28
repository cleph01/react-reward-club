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

import "../../styles/shop/shop_list.scss";

const shopData = [
    {
        shopId: "b001",
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        category: "Breakfast",
        shopName: "@bkristastucchio",
    },
    {
        shopId: "b002",
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        category: "Burger",
        shopName: "@rollelflex_graphy726",
    },
    {
        shopId: "b003",
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        category: "Camera",
        shopName: "@helloimnik",
    },
    {
        shopId: "b004",
        img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        category: "Coffee",
        shopName: "@nolanissac",
    },
];

function Shop() {
    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
            {shopData.map((shop, i) => (
                <Link to={`/shops/${shop.shopId}`} key={i}>
                    <Divider />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src={shop.img} />
                        </ListItemAvatar>
                        <div className="bla">
                            <Typography
                                type="headline"
                                component="h2"
                                color="primary"
                            >
                                Shop Name: {shop.shopName}
                            </Typography>
                            <Typography type="subheading" component="h4">
                                Category: {shop.category}
                            </Typography>
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

export default Shop;
