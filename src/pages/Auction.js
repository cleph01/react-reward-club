import React from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Nav from "../components/nav_bar/Nav.js";
import LatestProductsList from "../components/products/LatestProductsList.js";

import "../styles/auction/auction.scss";

const auctionData = {
    bidStart: new Date("yesterday").toDateString(),
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

function Auction() {
    const currentDate = new Date();

    return (
        <div>
            <Nav />
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

                    <div style={{ display: "flex" }}>
                        <div className="col col1">
                            <CardMedia
                                className="product-image"
                                image={auctionData.imageUrl}
                                title={auctionData.itemName}
                            />
                            <Typography
                                component="p"
                                variant="subtitle1"
                                className="about-item-subheading"
                            >
                                {auctionData.description}
                            </Typography>
                        </div>
                        <div className="col col2">

                                {currentDate > new Date(auctionData.bidStart) 
                                    ? (<>
                                        <Timer endTime={auctionData.bidEnd} update={update}/> 
                                        { auctionData.bids.length > 0 &&  
                                            <Typography component="p" variant="subtitle1" className={classes.lastBid}>
                                                {` Last bid: $ ${auctionData.bids[0].bid}`}
                                            </Typography>
                                        }
                                        { !auth.isAuthenticated() && <Typography>Please, <Link to='/signin'>sign in</Link> to place your bid.</Typography> }
                                        { auth.isAuthenticated() && <Bidding auction={auction} justEnded={justEnded} updateBids={updateBids}/> }
                                    </>)
                                    : <Typography component="p" variant="h6">{`Auction Starts at ${new Date(auctionData.bidStart).toLocaleString()}`}</Typography>}
                  
                            </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Auction;
