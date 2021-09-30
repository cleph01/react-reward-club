import React from "react";
import Search from "../components/products/Search";

import "../styles/market-place.scss";

function Market() {
    return (
        <div className="root-container-grid">
            <div className="col col1">
                <Search />
            </div>
            <div className="col col2">Latest Products</div>
        </div>
    );
}

export default Market;
