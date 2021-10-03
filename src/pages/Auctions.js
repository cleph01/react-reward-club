import React from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import Nav from "../components/nav_bar/Nav.js";
import AuctionsList from "../components/auction/AuctionsList.js";

import FeaturedAuction from "../components/auction/FeaturedAuction";

import "../styles/auction/auctions.scss";

const product = {
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

function Auctions() {
    return (
        <div>
            <Nav />
            <div className="root-container-grid">
                <div className="card-wrapper">
                    <div className="headline">
                        <h3>Featured Trade</h3>
                    </div>
                    <Card className="card">
                        <FeaturedAuction />
                    </Card>
                </div>
                <div className="card-wrapper" style={{ marginTop: "0px" }}>
                    <div className="headline">
                        <h3>Live Trades</h3>
                    </div>
                    <Card className="card">
                        <AuctionsList />
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Auctions;
