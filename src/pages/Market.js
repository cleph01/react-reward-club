import React from "react";
import Search from "../components/products/Search";
import CategoryView from "../components/products/CategoryView";
import LatestProducts from "../components/products/LatestProducts";
import Nav from "../components/nav_bar/Nav";

import "../styles/market-place.scss";

function Market() {
    return (
        <div>
            <Nav />
            <div className="root-container-grid">
                <div className="col col1">
                    <Search />
                    <br />
                    <CategoryView />
                </div>
                <br />
                <div className="col col2">
                    <LatestProducts />
                </div>
            </div>
        </div>
    );
}

export default Market;
