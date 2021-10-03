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
import VisibilityIcon from "@mui/icons-material/Visibility";

const itemData = [
    {
        bids: [{ bid: 134 }, { bid: 128 }, { bid: 100 }],
        bidStart: new Date("10-01-2021"),
        bidEnd: new Date("10-02-2021"),
        quantity: 20,
        price: 1.0,
        _id: "p001",
        imgUrl: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        itemName: "Breakfast",
        shopName: "@bkristastucchio",
    },
    {
        bids: [{ bid: 134 }, { bid: 128 }, { bid: 100 }],
        bidStart: new Date("10-01-2021"),
        bidEnd: new Date("10-02-2021"),
        quantity: 20,
        price: 1.0,
        _id: "p001",
        imgUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        itemName: "Burger",
        shopName: "@rollelflex_graphy726",
    },
    {
        bids: [{ bid: 134 }, { bid: 128 }, { bid: 100 }],
        bidStart: new Date("10-01-2021"),
        bidEnd: new Date("10-02-2021"),
        quantity: 20,
        price: 1.0,
        _id: "p001",
        imgUrl: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        itemName: "Camera",
        shopName: "@helloimnik",
    },
    {
        bids: [{ bid: 134 }, { bid: 128 }, { bid: 100 }],
        bidStart: new Date("10-01-2021"),
        bidEnd: new Date("10-02-2021"),
        quantity: 20,
        price: 1.0,
        _id: "p001",
        imgUrl: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        itemName: "Coffee",
        shopName: "@nolanissac",
    },
    {
        bids: [{ bid: 134 }, { bid: 128 }, { bid: 100 }],
        bidStart: new Date("10-01-2021"),
        bidEnd: new Date("10-02-2021"),
        quantity: 20,
        price: 1.0,
        _id: "p001",
        imgUrl: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        itemName: "Hats",
        shopName: "@hjrc33",
    },
    {
        bids: [{ bid: 134 }, { bid: 128 }, { bid: 100 }],
        bidStart: new Date("10-01-2021"),
        bidEnd: new Date("10-02-2021"),
        quantity: 20,
        price: 1.0,
        _id: "p001",
        imgUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        itemName: "Honey",
        shopName: "@arwinneil",
    },
    {
        bids: [{ bid: 134 }, { bid: 128 }, { bid: 100 }],
        bidStart: new Date("10-01-2021"),
        bidEnd: new Date("10-02-2021"),
        quantity: 20,
        price: 1.0,
        _id: "p001",
        imgUrl: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        itemName: "Basketball",
        shopName: "@tjdragotta",
    },
    {
        bids: [{ bid: 134 }, { bid: 128 }, { bid: 100 }],
        bidStart: new Date("10-01-2021"),
        bidEnd: new Date("10-02-2021"),
        quantity: 20,
        price: 1.0,
        _id: "p001",
        imgUrl: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
        itemName: "Fern",
        shopName: "@katie_wasserman",
    },
    {
        bids: [{ bid: 134 }, { bid: 128 }, { bid: 100 }],
        bidStart: new Date("10-01-2021"),
        bidEnd: new Date("10-02-2021"),
        quantity: 20,
        price: 1.0,
        _id: "p001",
        imgUrl: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
        itemName: "Mushrooms",
        shopName: "@silverdalex",
    },
    {
        bids: [{ bid: 134 }, { bid: 128 }, { bid: 100 }],
        bidStart: new Date("10-01-2021"),
        bidEnd: new Date("10-02-2021"),
        quantity: 20,
        price: 1.0,
        _id: "p001",
        imgUrl: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        itemName: "Tomato basil",
        shopName: "@shelleypauls",
    },
    {
        bids: [{ bid: 134 }, { bid: 128 }, { bid: 100 }],
        bidStart: new Date("10-01-2021"),
        bidEnd: new Date("10-02-2021"),
        quantity: 20,
        price: 1.0,
        _id: "p001",
        imgUrl: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        itemName: "Sea star",
        shopName: "@peterlaster",
    },
    {
        bids: [{ bid: 134 }, { bid: 128 }, { bid: 100 }],
        bidStart: new Date("10-01-2021"),
        bidEnd: new Date("10-02-2021"),
        quantity: 20,
        price: 1.0,
        _id: "p001",
        imgUrl: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        itemName: "Bike",
        shopName: "@southside_customs",
    },
];

const calculateTimeLeft = (date) => {
    const difference = date - new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            timeEnd: false,
        };
    } else {
        timeLeft = { timeEnd: true };
    }
    return timeLeft;
};

function AuctionsList() {
    const currentDate = new Date();
    const showTimeLeft = (date) => {
        let timeLeft = calculateTimeLeft(date);
        return (
            !timeLeft.timeEnd && (
                <span>
                    {timeLeft.days !== 0 && `${timeLeft.days} d `}
                    {timeLeft.hours !== 0 && `${timeLeft.hours} h `}
                    {timeLeft.minutes !== 0 && `${timeLeft.minutes} m `}
                    {timeLeft.seconds !== 0 && `${timeLeft.seconds} s`} left
                </span>
            )
        );
    };

    const auctionState = (auction) => {
        // console.log("AuctionBids: ", auction.bids.length);

        return (
            <span>
                {currentDate < new Date(auction.bidStart) &&
                    `Auction Starts at ${new Date(
                        auction.bidStart
                    ).toLocaleString()}`}
                {currentDate > new Date(auction.bidStart) &&
                    currentDate < new Date(auction.bidEnd) && (
                        <>
                            {`Auction is live | ${auction.bids.length} bids |`}{" "}
                            {showTimeLeft(new Date(auction.bidEnd))}
                        </>
                    )}
                {currentDate > new Date(auction.bidEnd) &&
                    `Auction Ended | ${auction.bids.length} bids `}
                {currentDate > new Date(auction.bidStart) &&
                    auction.bids.length > 0 &&
                    ` | Last bid: $ ${auction.bids[0].bid}`}
            </span>
        );
    };

    return (
        <List className="product-list-container">
            {itemData.map((auction, i) => (
                <span key={i}>
                    <ListItem className="product-list-item">
                        <ListItemAvatar>
                            <Avatar
                                src={auction.imgUrl}
                                variant="square"
                                loading="lazy"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={auction.itemName}
                            secondary={auctionState(auction)}
                        />
                        <ListItemSecondaryAction>
                            <Link to={`/auction/${auction._id}`}>
                                <VisibilityIcon style={{ color: "#9b9b9b" }} />
                            </Link>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                </span>
            ))}
        </List>
    );
}

export default AuctionsList;
