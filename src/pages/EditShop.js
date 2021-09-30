import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import Products from "../components/products/ProductsGrid";

import Nav from "../components/nav_bar/Nav";
import EditShopMod from "../components/shop/EditShopMod";
import ProductList from "../components/products/ProductList";
import NewProductBtn from "../components/products/NewProductBtn";

import "../styles/shop/edit_shop.scss";

function EditShop() {
    return (
        <div>
            <Nav />
            <div className="edit-shop-container">
                <Card className="edit-shop-wrapper">
                    <EditShopMod />
                </Card>
                <Card className="product-list-wrapper">
                    <div className="product-list-header">
                        <h3>Products</h3>
                        <NewProductBtn />
                     </div>
                     

                     <ProductList />
                         
                    
                </Card>
            </div>
        </div>
    );
}

export default EditShop;
