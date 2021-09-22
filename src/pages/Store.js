import React from "react";


import QRcodeGen from "../components/QRcodeGen";

import "../styles/store.scss";
import logo from "../assets/images/logos/chicken_shack_logo.png";

function Store() {
    

    const todaysDate = Date.now();

    

    return (
        <div className="container">
            <div className="header">
                <h1>Business Name</h1>
                <img className="logo" src={logo} alt="logo" />
                <h2>Get 20% OFF Your 4th Visit!</h2>
            </div>
            <QRcodeGen date={todaysDate} />
            <div className="footer">
                <div>Scan QR Code to Check In</div>
            </div>
        </div>
    );
}

export default Store;
