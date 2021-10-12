import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import Avatar from "@mui/material/Avatar";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { makeStyles } from "@material-ui/core/styles";

import { firebase, db } from "../../../firebase/firebase_config";

import "./styles/follow_grid.scss";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        background: theme.palette.background.paper,
    },
    bigAvatar: {
        width: 100,
        height: 100,
        margin: "auto",
    },
    itemList: {
        width: 500,
        height: 220,
    },
    tileText: {
        textAlign: "center",
        marginTop: 10,
    },
    linkStyle: {
        textDecoration: "none",
        color: "#000000",
    },
}));

const itemData = [
    {
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        author: "@bkristastucchio",
    },
    {
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        title: "Burger",
        author: "@rollelflex_graphy726",
    },
    {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        title: "Camera",
        author: "@helloimnik",
    },
    {
        img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        title: "Coffee",
        author: "@nolanissac",
    },
    {
        img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        title: "Hats",
        author: "@hjrc33",
    },
    {
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        title: "Honey",
        author: "@arwinneil",
    },
    {
        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        title: "Basketball",
        author: "@tjdragotta",
    },
    {
        img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
        title: "Fern",
        author: "@katie_wasserman",
    },
    {
        img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
        title: "Mushrooms",
        author: "@silverdalex",
    },
    {
        img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        title: "Tomato basil",
        author: "@shelleypauls",
    },
    {
        img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        title: "Sea star",
        author: "@peterlaster",
    },
    {
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        title: "Bike",
        author: "@southside_customs",
    },
];

function FollowGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList rowHeight={160} className={classes.itemList} cols={4}>
                {itemData.map((person) => (
                    <ImageListItem style={{ height: 80 }} key={person.img}>
                        {/* <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        /> */}
                        <Link
                            to={"/user/" + person.id}
                            className={classes.linkStyle}
                        >
                            <Avatar
                                alt={person.author}
                                src={`${person.img}?w=248&fit=crop&auto=format`}
                                className={classes.bigAvatar}
                            />
                            <ImageListItemBar
                                title={person.name}
                                subtitle={person.author}
                                position="below"
                                className={classes.tileText}
                            />
                        </Link>
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

export default FollowGrid;
