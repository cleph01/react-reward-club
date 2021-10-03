import React, { useState } from "react";
import { Link } from "react-router-dom";

import CardHeader from "@mui/material/CardHeader";

import CardMedia from "@mui/material/CardMedia";

import VisibilityIcon from "@mui/icons-material/Visibility";

import Timer from "./Timer";

import BidHistory from "./BidHistory";

import "../../styles/auction/featured_auction.scss";

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

function FeaturedAuction() {
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
        <div className="content-wrapper">
            <div className="row">
                <div className="col ">
                    <CardHeader
                        title={auctionData.name}
                        subheader={
                            <>
                                <span>
                                    {currentDate <
                                        new Date(auctionData.bidStart) &&
                                        "Auction Not Started"}
                                    {currentDate >
                                        new Date(auctionData.bidStart) &&
                                        currentDate <
                                            new Date(auctionData.bidEnd) &&
                                        "Auction Live"}
                                    {currentDate >
                                        new Date(auctionData.bidEnd) &&
                                        "Auction Ended"}
                                </span>{" "}
                                <VisibilityIcon
                                    style={{ marginLeft: "10px" }}
                                />
                            </>
                        }
                    />
                </div>
                <div className="col">
                    <Timer endTime={auctionData.bidEnd} update={update} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="img-cell">
                        <CardMedia
                            className="product-image"
                            component="img"
                            image={auctionData.imageUrl}
                            alt="green iguana"
                        />
                    </div>
                </div>
                <div className="col">
                    <BidHistory
                        auction={auction}
                        justEnded={justEnded}
                        updateBids={updateBids}
                    />
                </div>
            </div>
        </div>
    );
}

export default FeaturedAuction;
