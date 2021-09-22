import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const emoji = require("emoji-dictionary");

const Wrapper = styled.div`
    margin-top: 15px;
    width: 100%;
    height: 250px;

    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 1px 6px -2px #000;
`;

const Header = styled.div`
    background-color: #203158;
    width: 100%;
    height: 50px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 25px;
`;

const Body = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
`;

const BodyCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;
`;

const Footer = styled.div`
    height: 50px;
`;

const RedeemBtn = styled.button`
    background-color: #15a9dc;
    font-family: "Quicksand";
    color: #ffffff;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    border: none;
    font-size: 20px;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    -webkit-animation: glowing 1500ms infinite;
    -moz-animation: glowing 1500ms infinite;
    -o-animation: glowing 1500ms infinite;
    animation: glowing 1500ms infinite;
    margin-top: 9px;
    @-webkit-keyframes glowing {
        0% {
            background-color: #15a9dc;
            -webkit-box-shadow: 0 0 3px #15a9dc;
        }
        50% {
            background-color: #15a9dc;
            -webkit-box-shadow: 0 0 40px #15a9dc;
        }
        100% {
            background-color: #15a9dc;
            -webkit-box-shadow: 0 0 3px #15a9dc;
        }
    }
    @-moz-keyframes glowing {
        0% {
            background-color: #15a9dc;
            -moz-box-shadow: 0 0 3px #15a9dc;
        }
        50% {
            background-color: #15a9dc;
            -moz-box-shadow: 0 0 40px #15a9dc;
        }
        100% {
            background-color: #15a9dc;
            -moz-box-shadow: 0 0 3px #15a9dc;
        }
    }
    @-o-keyframes glowing {
        0% {
            background-color: #15a9dc;
            box-shadow: 0 0 3px #15a9dc;
        }
        50% {
            background-color: #15a9dc;
            box-shadow: 0 0 40px #15a9dc;
        }
        100% {
            background-color: #15a9dc;
            box-shadow: 0 0 3px #15a9dc;
        }
    }
    @keyframes glowing {
        0% {
            background-color: #15a9dc;
            box-shadow: 0 0 3px #15a9dc;
        }
        50% {
            background-color: #15a9dc;
            box-shadow: 0 0 40px #15a9dc;
        }
        100% {
            background-color: #15a9dc;
            box-shadow: 0 0 3px #15a9dc;
        }
    }
`;

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
    const [wallet, setWallet] = useState([
        {
            walletId: 1,
            emoji: "ring",
            item: "10% OFF",
        },
        {
            walletId: 2,
            emoji: "ring",
            item: "10% OFF",
        },
    ]);

    console.log(props);

    return (
        <>
            <Wrapper>
                <Header>
                    <span>{props.key}</span>
                    <span>{props.item_details.walletId}</span>
                </Header>

                <Body>
                    <div>Phone</div>
                    <FontAwesomeIcon className="error-icon" icon="phone" />

                    <BodyCenter>
                        <div>{props.item_details.businessName}</div>
                        <div>{emoji.getUnicode(props.item_details.emoji)}</div>
                        <div>Emoji Here</div>
                        <div>{props.item_details.item}</div>
                    </BodyCenter>

                    <div>Shopping Cart</div>
                    <FontAwesomeIcon
                        className="error-icon"
                        icon="shopping-cart"
                    />
                </Body>

                <Footer>
                    <RedeemBtn>Redeem</RedeemBtn>
                </Footer>
            </Wrapper>
        </>
    );
};

export default Wallet_Item;
