import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import WalletItem from "../components/WalletItem";

import logo from "../assets/images/logos/logo_white_text.png";

const Nav = styled.nav`
    width: 100%;
    height: 50px;
    color: #ffffff;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: #203158;
    position: fixed;
    top: 0;
    box-shadow: 0 1px 6px -2px #000;
`;

const Img = styled.img`
    width: 75px;
    height: auto;
`;

const Container = styled.div`
    width: 100%;
    margin-top: 100px;
`;

const Wallet = (props) => {
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
            businessName: "Papa's Gold City",
            emoji: "ring",
            item: "10% OFF",
        },
        {
            walletId: 2,
            businessName: "Hubba's",
            emoji: "hotdog",
            item: "FREE Hotdog",
        },
    ]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Nav>
                    <h3>La Billetera Papà</h3>
                    <Img src={logo} />
                </Nav>

                <Container>
                    {wallet.map((item, index) => (
                        <WalletItem key={index} item_details={item} />
                    ))}
                </Container>
            </div>
        </>
    );
};

export default Wallet;
