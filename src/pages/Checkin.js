import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Auth from "../components/Auth";
import "../styles/checkin.scss";
import { db } from "../firebase/firebase_config";
import logo from "../assets/images/logos/chicken_shack_logo.png";

// Date sample in milliseconds
// 1632343915372

// Need to check if user-business relationship exists

function Checkin() {
    const { storeId, dateToday } = useParams();

    const todaysDate = Date.now();

    console.log("Millisecond Date: ", todaysDate);

    const deviceDate = new Date(todaysDate).toDateString();

    console.log("Store - Url: ", storeId, dateToday);

    const urlDate = new Date(Number(dateToday)).toDateString();

    console.log("Device Date - Url Date: ", deviceDate, urlDate);

    console.log(deviceDate === urlDate);

    //every time a new post is added this code fires
    useEffect(() => {
        let batch = db.batch();

        const userRef = db.collection("user").doc("u002");

        const userData = {
            userId: "u002",
            name: "Charlie",
            displayName: "cleph02",
            bio: "Something bout me.",
            seller: false,
            joined: Date.now(),
        };

        // Set UserRef
        batch.set(userRef, userData);

        // Set Relationship Ref
        const bizRelationshipRef = userRef.collection("bizRelationships").doc();

        const relationshipData = {
            businessId: "b001",
            businessName: "Chicken Shack",
            vists: [Date.now()],
            points: 1,
            lastVisit: Date.now(),
            matched: Date.now(),
        };

        batch.set(bizRelationshipRef, relationshipData);

        // Set Wallet Ref
        // This stuff will need to be pulled in from the
        // checkin UI if signing up from check
        // ElSE be left blank
        const walletRef = userRef.collection("wallet").doc();

        const walletData = {
            businessId: "b001",
            businessName: "Chicken Shack",
            itemId: "item001",
            itemDescription: "1/2 OFF",
            emojiHexCode: "0x1F357",
        };

        batch.set(walletRef, walletData);

        batch
            .commit()
            .then((res) => {
                //
                console.log("Record Created Successfully: ", res);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    }, []);

    return (
        <div className="container">
            <div className="header">
                <h1>Business Name</h1>
                <img className="logo" src={logo} alt="logo" />
                <h2>Check In By Logging in Below and Get</h2>
                <h2>20% OFF Your 4th Visit!</h2>
            </div>
            <Auth />
        </div>
    );
}

export default Checkin;
