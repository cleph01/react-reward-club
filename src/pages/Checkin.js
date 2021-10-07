import React, { useState, useEffect, useContext, forwardRef } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Auth from "../components/Auth";

import { firebase, db } from "../firebase/firebase_config";
import productPic from "../assets/images/chickenshack-product.jpg";
import GetLocation from "../components/checkin/GetLocation";
import CheckinAuth from "../components/checkin/CheckInAuth";
import AvailablePrizes from "../components/checkin/AvailablePrizes";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ShareIcon from "@mui/icons-material/Share";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { getDistanceBetween } from "geolocation-distance-between";

import "../styles/checkin/checkin.scss";
// Date sample in milliseconds
// 1632343915372

// Need to check if user-business relationship exists

function Checkin() {
    const { user } = useContext(UserContext);

    const { storeId } = useParams();
    const [business, setBusiness] = useState();

    const [prizes, setPrizes] = useState();

    // State to control GetLocation Modal
    const [openModal, setOpenModal] = useState();

    const [geoDistance, setGeoDistance] = useState();

    const [goStatus, setGoStatus] = useState({
        fetchingDistance: false,
        gotDistance: false,
    });

    const [alertMsg, setAlertMsg] = useState();

    const [openSnackBar, setOpenSnackBar] = useState(false);

    useEffect(() => {
        console.log("Ready to Go: ", goStatus);
    }, [goStatus]);

    const handleGeoLocation = () => {
        setGoStatus({ ...goStatus, fetchingDistance: true });

        if ("geolocation" in navigator) {
            console.log("Available");

            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);

                let coordinateOne = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                let coordinateTwo = {
                    latitude: 40.7599133,
                    longitude: -73.9228225,
                };

                let distanceBetween = getDistanceBetween(
                    coordinateOne,
                    coordinateTwo
                );

                console.log("Kilometers: ", distanceBetween);

                setGeoDistance(distanceBetween);
                setGoStatus({
                    ...goStatus,
                    gotDistance: true,
                    fetchingDistance: false,
                });
            });
        } else {
            console.log("Not Available");
        }
    };

    useEffect(() => {
        // Get Business Info
        db.collection("shops")
            .doc(storeId)
            .get()
            .then((doc) => {
                setBusiness(doc.data());
            })
            .catch((err) => {
                console.log("Error getting Business Info: ", err);
            });

        db.collection("shops")
            .doc(storeId)
            .collection("loyaltyPrizes")
            .get()
            .then((doc) => {
                console.log("docs: ", doc);
                setPrizes(
                    doc.docs.map((doc) => ({
                        prizeId: doc.id,
                        prize: doc.data(),
                    }))
                );
            })
            .catch((err) => {
                console.log("Error getting Prizes: ", err);
            });
    }, []);

    console.log("Business info: ", business);
    console.log("Prizes: ", prizes);
    console.log("User: ", user);

    //every time a new post is added this code fires
    const handleCheckin = () => {
        // First Check if Proximity is confirmed and user is logged in
        const goodToGo = goStatus.gotDistance && user ? true : false;

        if (!goodToGo) {
            setGoStatus({
                ...goStatus,
                error: "Provide Location & Ensure Login",
            });

            console.log("Check IN Button Go Status Not 100");
            return;
        }

        // console.log("Check In Button Working - goodToGo: ", goodToGo);

        // Check if Relationship with business exists
        const relationshipRef = db
            .collection("user")
            .doc(user.uid)
            .collection("bizRelationship")
            .doc(storeId);

        relationshipRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());

                    const timeStamp = new Date(Date.now());
                    // Update Counts and Log
                    db.collection("user")
                        .doc(user.uid)
                        .collection("bizRelationship")
                        .doc(storeId)
                        .update({
                            visitCount:
                                firebase.firestore.FieldValue.increment(1),
                            pointSum:
                                firebase.firestore.FieldValue.increment(1),
                            visitLog:
                                firebase.firestore.FieldValue.arrayUnion(
                                    timeStamp
                                ),
                        })
                        .then(() => {
                            console.log("Document successfully updated!");
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("Relationhip Doesn't Exist !");

                    const timeStamp = new Date(Date.now());
                    // Add New Relationship Doc Here
                    db.collection("user")
                        .doc(user.uid)
                        .collection("bizRelationship")
                        .doc(storeId)
                        .set({
                            visitCount: 1,
                            pointSum: 1,
                            redeemCount: 0,
                            redeemLog: [],
                            visitLog: [timeStamp],
                        })
                        .then(() => {
                            console.log("Document successfully written!");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                }
            })
            .catch((error) => {
                console.log("Error getting relationship document:", error);
            });
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackBar(false);
    };

    if (!business) {
        return <div>...Loading</div>;
    }

    return (
        <div className="container">
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar
                            loading="lazy"
                            alt={business.businessName}
                            src={business.logoUrl}
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
                        <IconButton aria-label="add to favorites">
                            <LocalFireDepartmentIcon />
                        </IconButton>
                    }
                    title="Chick Shack"
                    subheader="36-19 Broadway, Astoria NY"
                />
                <Divider />
                {/* <CardMedia
                    component="img"
                    height="194"
                    image={productPic}
                    alt="Paella dish"
                    loading="lazy"
                /> */}
                <CardContent>
                    <AvailablePrizes prizes={prizes} />
                    <Typography variant="body1" color="text.secondary">
                        Login Each Time You Visit and Get a Chance to Win a
                        Prize!
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        Share With a Friend and they AUTOMATICALLY win the prize
                        when they Login
                    </Typography>
                </CardContent>
            </Card>
            {goStatus.gotDistance ? (
                // Created this component to render a different view
                // based on whether user is logged in already & thus
                // update useEffect dependancy variable to trigger db update
                <CheckinAuth user={user} handleCheckin={handleCheckin} />
            ) : (
                <GetLocation
                    handleGeoLocation={handleGeoLocation}
                    goStatus={goStatus}
                />
            )}

            {/* 

            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackBar}
                >
                    <Alert
                        onClose={handleCloseSnackBar}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Congratulations! Enjoy Your Prize.
                    </Alert>
                </Snackbar>
            </Stack> */}
        </div>
    );
}

export default Checkin;
