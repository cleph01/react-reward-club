import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase_config";
import Nav from "../components/nav_bar/Nav";
import EditShopMod from "../components/shop/EditShopMod";
import ProductList from "../components/products/ProductList";
import NewProductBtn from "../components/products/NewProductBtn";

import Card from "@mui/material/Card";

import "../styles/shop/edit_shop.scss";

function EditShop() {
    const { shopId } = useParams();
    const [businessData, setBusinessData] = useState();

    useEffect(() => {
        db.collection("shops")
            .doc(shopId)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());

                    setBusinessData({
                        businessId: doc.id,
                        info: doc.data(),
                    });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });
    }, []);

    console.log("Store Id: ", shopId);
    console.log("Business Data: ", businessData);

    if (!businessData) {
        return <div>...Loading</div>;
    }
    return (
        <div>
            <Nav />
            <div className="edit-shop-container">
                <Card className="edit-shop-wrapper">
                    <EditShopMod businessData={businessData} />
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
