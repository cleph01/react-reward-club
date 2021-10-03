import React, { useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Nav from "../nav_bar/Nav.js";
import LatestProductsList from "../products/LatestProductsList.js";

import Timer from "./Timer";

import Bidding from "./Bidding";

import "../../styles/auction/auction.scss";

const auctionData = {
    bidStart: new Date("10-02-2021"),
    bidEnd: new Date("10-03-2021"),
    itemName: "Five Star Breakfast",
    created: "Jan 1 2021",
    quantity: 20,
    price: 1.0,
    _id: "p001",
    imageUrl: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    name: "Breakfast",
    shopName: "@bkristastucchio",
    description:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
};

const bidHistory = [
    {
        bid: 134,
        time: new Date("yesterday").toDateString(),
        bidderName: "Charlie",
    },
    {
        bid: 128,
        time: new Date("yesterday").toDateString(),
        bidderName: "Wilson",
    },
    {
        bid: 100,
        time: new Date("yesterday").toDateString(),
        bidderName: "Zuperberga",
    },
    {
        bid: 89,
        time: new Date("yesterday").toDateString(),
        bidderName: "Besos",
    },
];

function Auction() {
    const currentDate = new Date();

    const [auction, setAuction] = useState({});
    const [error, setError] = useState("");
    const [justEnded, setJustEnded] = useState(false);

    const updateBids = (updatedAuction) => {
        setAuction(updatedAuction);
    };
    const update = () => {
        setJustEnded(true);
    };

    return (
        <div>
            <div className="root-container-grid">
                <Card className="card">
                    <CardHeader
                        title={auctionData.name}
                        subheader={
                            <span>
                                {currentDate < new Date(auctionData.bidStart) &&
                                    "Auction Not Started"}
                                {currentDate > new Date(auctionData.bidStart) &&
                                    currentDate <
                                        new Date(auctionData.bidEnd) &&
                                    "Auction Live"}
                                {currentDate > new Date(auctionData.bidEnd) &&
                                    "Auction Ended"}
                            </span>
                        }
                    />

                    <div className="content-wrapper">
                        <div className="col col1">
                            <CardMedia
                                className="product-image"
                                component="img"
                                image={auctionData.imageUrl}
                                alt="green iguana"
                            />

                            <Typography
                                component="p"
                                variant="subtitle1"
                                className="about-item-subheading"
                            >
                                About Item
                            </Typography>
                            <Typography
                                component="p"
                                className="item-description"
                            >
                                {auctionData.description}
                            </Typography>
                        </div>
                        <div className="col col2">
                            <Timer
                                endTime={auctionData.bidEnd}
                                update={update}
                            />

                            <Typography
                                component="p"
                                variant="subtitle1"
                                className="lastBid"
                            >
                                {` Last bid: $ ${bidHistory[0].bid}`}
                            </Typography>

                            <Bidding
                                auction={auction}
                                justEnded={justEnded}
                                updateBids={updateBids}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Auction;
