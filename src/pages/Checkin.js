import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Auth from "../components/Auth";
import "../styles/checkin.scss";
import { db } from "../firebase/firebase_config";
import logo from "../assets/images/logos/chicken_shack_logo.png";
import socialiite from "../assets/images/logos/logo.png";
import productPic from "../assets/images/chickenshack-product.jpg";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ShareIcon from "@mui/icons-material/Share";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { getDistanceBetween } from "geolocation-distance-between";

// Date sample in milliseconds
// 1632343915372

// Need to check if user-business relationship exists

function Checkin() {
    const { storeId, dateToday } = useParams();
    const [business, setBusiness] = useState();

    const [geoDistance, setGeoDistance] = useState();

    useEffect(() => {
        db.collection("shops")
            .doc(storeId)
            .get()
            .then((doc) => {
                setBusiness(doc.data());
            });
    }, []);

    console.log("Business info: ", business);
    // useEffect(() => {
    //     if ("geolocation" in navigator) {
    //         console.log("Available");

    //         navigator.geolocation.getCurrentPosition(function (position) {
    //             console.log("Latitude is :", position.coords.latitude);
    //             console.log("Longitude is :", position.coords.longitude);

    //             let coordinateOne = {
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //             };
    //             let coordinateTwo = {
    //                 latitude: 40.7599133,
    //                 longitude: -73.9228225,
    //             };

    //             let distanceBetween = getDistanceBetween(
    //                 coordinateOne,
    //                 coordinateTwo
    //             );

    //             console.log("Kilometers: ", distanceBetween);

    //             setGeoDistance(distanceBetween);
    //         });
    //     } else {
    //         console.log("Not Available");
    //     }
    // }, []);

    //every time a new post is added this code fires
    // useEffect(() => {
    //     let batch = db.batch();

    //     const userRef = db.collection("user").doc("u002");

    //     const userData = {
    //         userId: "u002",
    //         name: "Charlie",
    //         displayName: "cleph02",
    //         bio: "Something bout me.",
    //         seller: false,
    //         joined: Date.now(),
    //     };

    //     // Set UserRef
    //     batch.set(userRef, userData);

    //     // Set Relationship Ref
    //     const bizRelationshipRef = userRef.collection("bizRelationships").doc();

    //     const relationshipData = {
    //         businessId: "b001",
    //         businessName: "Chicken Shack",
    //         vists: [Date.now()],
    //         points: 1,
    //         lastVisit: Date.now(),
    //         matched: Date.now(),
    //     };

    //     batch.set(bizRelationshipRef, relationshipData);

    //     // Set Wallet Ref
    //     // This stuff will need to be pulled in from the
    //     // checkin UI if signing up from check
    //     // ElSE be left blank
    //     const walletRef = userRef.collection("wallet").doc();

    //     const walletData = {
    //         businessId: "b001",
    //         businessName: "Chicken Shack",
    //         itemId: "item001",
    //         itemDescription: "1/2 OFF",
    //         emojiHexCode: "0x1F357",
    //     };

    //     batch.set(walletRef, walletData);

    //     batch
    //         .commit()
    //         .then((res) => {
    //             //
    //             console.log("Record Created Successfully: ", res);
    //         })
    //         .catch((error) => {
    //             console.log("Error: ", error);
    //         });
    // }, []);

    // if (geoDistance && geoDistance * 1000 > 100) {
    //     return <div>Fuhgetabout it</div>;
    // }

    return (
        <div className="container">
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar
                            src={logo}
                            sx={{
                                /* bgcolor: red[500],*/
                                width: 50,
                                height: 50,
                                margin: "auto",
                                padding: "10px",
                                border: "1px solid #f0f0f0",
                            }}
                        />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <ShareIcon />
                        </IconButton>
                    }
                    title="Chick Shack"
                    subheader="36-19 Broadway, Astoria NY"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={productPic}
                    alt="Paella dish"
                    loading="lazy"
                />
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        Login Each Time You Visit and Get 20% OFF Your 4th
                        Visit!
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        Share With a Friend and Win a FREE Bucket of Chicken
                        when they Login
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <LocalFireDepartmentIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Auth />
        </div>
    );
}

export default Checkin;
