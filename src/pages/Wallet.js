import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import "../styles/wallet.scss";
import { db } from "../firebase/firebase_config";

import WalletItem from "../components/WalletItem";

import logo from "../assets/images/logos/logo_white_text.png";

const Wallet = (props) => {
    // State to hold post data from Firebase call
    const [wallet, setWallet] = useState([]);

    //every time a new post is added this code fires
    useEffect(() => {
        db.collection("user/u002/wallet").onSnapshot((snapshot) => {
            setWallet(
                snapshot.docs.map((doc) => ({
                    walletItemId: doc.id,
                    walletItem: doc.data(),
                }))
            );
        });
    }, []);

    console.log("Wallet: ", wallet);

    const history = useHistory();

    //Handle Login Click
    function handleLoginClick() {
        history.push("/login");
    }

    //Handle Checkin Click
    function handleCheckInClick() {
        history.push("/checkin");
    }

    //Hold
    // const [wallet, setWallet] = useState([
    //     {
    //         walletId: 1,
    //         businessName: "Papa's Gold City",
    //         emoji: "ring",
    //         item: "10% OFF",
    //     },
    //     {
    //         walletId: 2,
    //         businessName: "Hubba's",
    //         emoji: "hotdog",
    //         item: "FREE Hotdog",
    //     },
    // ]);

    return (
        <>
            <div className="container">
                <div className="nav">
                    <img className="logo" src={logo} alt="logo" />
                    <div>&#x1F4B0; Digital Wallet &#x1F4B0;</div>
                </div>

                <div className="wallet-wrapper">
                    {wallet.map((item, index) => (
                        <WalletItem
                            key={index}
                            itemId={item.walletItemId}
                            item_details={item.walletItem}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Wallet;
