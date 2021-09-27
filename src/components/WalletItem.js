import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import "../styles/wallet-item.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wallet_Item = (props) => {
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
    //         emoji: "ring",
    //         item: "10% OFF",
    //     },
    //     {
    //         walletId: 2,
    //         emoji: "ring",
    //         item: "10% OFF",
    //     },
    // ]);

    console.log("Props at Wallet Item: ", props);

    return (
        <>
            <div className="wallet-item-container">
                <div className="item-header">
                    <span>{props.itemId}</span>
                    <span>{props.item_details.walletItemId}</span>
                </div>

                <div className="body-wrapper">
                    <FontAwesomeIcon className="phone" icon="phone" />

                    <div className="body-center">
                        <div>{props.item_details.businessName}</div>
                        {/* <div>{emoji.getUnicode(emojiName)};</div> */}
                        <div>
                            {String.fromCodePoint(
                                props.item_details.emojiHexCode
                            )}
                        </div>
                        <div>{props.item_details.itemDescription}</div>
                    </div>

                    <FontAwesomeIcon
                        className="shopping-cart"
                        icon="shopping-cart"
                    />
                </div>

                <div className="footer">
                    <div className="redeem-btn">Redeem</div>
                </div>
            </div>
        </>
    );
};

export default Wallet_Item;
