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

import "../styles/product/product.scss";

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

function Product() {
    return (
        <div>
            <Nav />
            <div className="root-container-grid">
                <div className="col col1">
                    <Card className="card">
                        <CardHeader
                            title={product.name}
                            subheader={
                                product.quantity > 0
                                    ? "In Stock"
                                    : "Out of Stock"
                            }
                            action={
                                <span className="add-to-cart">
                                    <AddShoppingCartIcon />
                                </span>
                            }
                        />
                        <div style={{ display: "flex" }}>
                            <CardMedia
                                className="product-image"
                                image={product.imageUrl}
                                title={product.name}
                            />
                            <Typography
                                component="p"
                                variant="subtitle1"
                                className="description-subheading"
                            >
                                {product.description}
                                <br />
                                <span className="price">$ {product.price}</span>
                                <Link
                                    to={"/shops/" + product._id}
                                    className="link"
                                >
                                    <span>
                                        <ShoppingBasketIcon />{" "}
                                        {product.shopName}
                                    </span>
                                </Link>
                            </Typography>
                        </div>
                    </Card>
                </div>

                <div className="col col2">
                    <Card
                        className="related-products-container"
                        style={{ backgroundColor: "#dcdcdc" }}
                    >
                        <Typography className="list-title">
                            Related Products
                        </Typography>
                        <LatestProductsList />
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Product;
