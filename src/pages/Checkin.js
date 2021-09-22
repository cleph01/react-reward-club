import React from "react";
import { useParams } from "react-router-dom";
// import Auth from "../components/Auth";
import "../styles/checkin.scss";
import logo from "../assets/images/logos/chicken_shack_logo.png";

// Date sample in milliseconds
// 1632343915372

function Checkin() {
    const { storeId, dateToday } = useParams();

    const todaysDate = Date.now();

    console.log("Millisecond Date: ", todaysDate);

    const deviceDate = new Date(todaysDate).toDateString();

    console.log("Store - Url: ", storeId, dateToday);

    const urlDate = new Date(Number(dateToday)).toDateString();

    console.log("Device Date - Url Date: ", deviceDate, urlDate);

    console.log(deviceDate === urlDate);

    return (
        <div className="container">
            <div className="header">
                <h1>Business Name</h1>
                <img className="logo" src={logo} alt="logo" />
                <h2>Check In By Logging in Below and Get</h2>
                <h2>20% OFF Your 4th Visit!</h2>
            </div>
            {/* <Auth /> */}
        </div>
    );
}

export default Checkin;
