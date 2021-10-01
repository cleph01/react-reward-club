import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import LatestProductsList from "./LatestProductsList";
import "../../styles/product/latest_products.scss";

function LatestProducts() {
    return (
        <div style={{ margin: "0px 15px" }}>
            <Card
                className="card-container"
                style={{ backgroundColor: "#dcdcdc" }}
            >
                <Typography className="tabs-title">Latest Products</Typography>
                <LatestProductsList />
            </Card>
        </div>
    );
}

export default LatestProducts;
