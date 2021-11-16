import React, { useState, useEffect, useContext, forwardRef } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

import { InlineShareButtons } from "sharethis-reactjs";

import platform from "platform-detect/os.mjs";

import encodeurl from "encodeurl";

import { firebase, db } from "../../firebase/firebase_config";

import GetLocation from "./components/GetLocation";
import CheckinAuth from "./components/CheckInAuth";
import AvailablePrizes from "./components/AvailablePrizes";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ShareIcon from "@mui/icons-material/Share";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import ForumIcon from "@mui/icons-material/Forum";

import { getDistanceBetween } from "geolocation-distance-between";

import "./styles/checkin.scss";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function Checkin() {
    const { authUser, userDispatch, userState } = useContext(UserContext);

    const { shopId } = useParams();
    const [business, setBusiness] = useState();

    const [prizes, setPrizes] = useState();

    const [userBizRelationship, setUserBizRelationship] = useState(null);

    const [walletPrize, setwalletPrize] = useState();

    // State to control Add Prize to Wallet Modal
    const [openClaimModal, setOpenClaimModal] = useState(false);

    // State to control Share Modal
    const [openShareModal, setOpenShareModal] = useState(false);

    const [geoDistance, setGeoDistance] = useState();

    const [goStatus, setGoStatus] = useState({
        fetchingDistance: false,
        gotDistance: false,
        checkedIn: false,
    });

    const [alertMsg, setAlertMsg] = useState({
        message: "",
        severity: "success",
    });

    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleOpenClaimModal = (itemObj) => {
        if (goStatus.gotDistance && userState.userId) {
            setOpenClaimModal(true);
            setwalletPrize(itemObj);

            console.log("Wallet Prize: ", walletPrize);
        } else {
            setAlertMsg({
                message: "Please Provide Your Location and Be logged in",
                severity: "error",
            });

            setOpenSnackBar(true);
        }
    };
    const handleCloseClaimModal = () => setOpenClaimModal(false);

    const handleOpenShareModal = () => {
        if (userState.userId) {
            setOpenShareModal(true);
        } else {
            setAlertMsg({
                message: "Login First to Get Paid for Referrals",
                severity: "error",
            });

            setOpenSnackBar(true);
        }
    };

    const handleCloseShareModal = () => setOpenShareModal(false);

    const handleAddToWallet = () => {
        console.log("Add to wallet invoked: ", walletPrize);

        if (walletPrize.pointThreshold <= userBizRelationship.pointSum) {
            //Add Prize to Wallet and Update pointsSum in Biz Relationship
            db.collection("user")
                .doc(userState.userId)
                .collection("wallet")
                .add({
                    businessId: shopId,
                    businessName: business.businessName,
                    emoji: walletPrize.emoji,
                    itemDescription: walletPrize.itemDescription,
                    itemId: walletPrize.prizeId,
                    redeemed: false,
                    created: Date.now(),
                })
                .then((docRef) => {
                    console.log("Prize Added to Wallet with ID: ", docRef.id);

                    // Decrement Points Sum from BizRelationship
                    db.collection("user")
                        .doc(userState.userId)
                        .collection("bizRelationship")
                        .doc(userBizRelationship.realtionshipId)
                        .update({
                            pointSum: firebase.firestore.FieldValue.increment(
                                -walletPrize.pointThreshold
                            ),
                        })
                        .then(() => {
                            console.log("PointSum successfully updated!");
                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating PointSume: ", error);
                        });

                    setAlertMsg({
                        message: "Item Added to Wallet.",
                        severity: "success",
                    });
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        } else {
            setAlertMsg({
                message: "Not Enouguh Points.",
                severity: "error",
            });
        }

        setOpenClaimModal(false);
        setOpenSnackBar(true);
    };

    useEffect(() => {
        console.log("Ready to Go: ", goStatus);
    }, [goStatus]);

    const handleGeoLocation = () => {
        setGoStatus({ ...goStatus, fetchingDistance: true });

        if ("geolocation" in navigator) {
            console.log("Available");

            /**
             * Do distance calcs
             */
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);

                let coordinateOne = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                let coordinateTwo = {
                    latitude: business.lat,
                    longitude: business.lon,
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

            // Check if Relationship with business exists
            db.collection("users")
                .doc(userState.userId)
                .collection("bizRelationships")
                .doc(shopId)
                .get()
                .then((doc) => {
                    console.log("User Biz Relationship doc: ", doc);
                    if (doc.exists) {
                        setUserBizRelationship({
                            relationshipId: shopId,
                            ...doc.data(),
                        });
                    }
                })
                .catch((error) => {
                    console.log(
                        "Error Getting Business Relationship in Geolocation: ",
                        error
                    );
                });
        } else {
            console.log("Geolocation Not Available in Your Browser");
        }
    };

    useEffect(() => {
        if (authUser) {
            db.collection("users")
                .doc(authUser.uid)
                .get()
                .then((user) => {
                    // If User exists,
                    //Set User Context with Reducer
                    console.log("User in Check User: ", user);
                    if (user.exists) {
                        console.log("User Exists");
                        userDispatch({
                            type: "USER/SET_EXISTING_USER",
                            payload: { ...user.data(), userId: user.id },
                        });
                    } else {
                        // If doesn't Exist, Create New User and set State with Reducer
                        console.log("User Doesn't Exists");
                        const newUserData = {
                            displayName: authUser.email,
                            avatarUrl: authUser.photoURL,
                            seller: false,
                            email: authUser.email,
                            phoneNumber: authUser.phoneNumber,
                            timestamp: Date.now(),
                            aboutMe: "Tell Us Something About You!! 🙌",
                            socials: {},
                            followingFriends: [],
                            followersFriends: [],
                            followingBusinesses: [],
                            userId: authUser.uid,
                        };

                        db.collection("users")
                            .doc(authUser.uid)
                            .set(newUserData)
                            .then((docRef) => {
                                userDispatch({
                                    type: "USER/CREATE_NEW_USER",
                                    payload: newUserData,
                                });

                                console.log(
                                    "Created User with Id: ",
                                    authUser.uid
                                );
                            })
                            .catch((error) => {
                                console.log("Error Creating New User: ", error);
                            });
                    }
                })
                .catch((error) => {
                    console.log("Error Checking User Exists: ", error);
                });
        }
        // Get Business Info
        db.collection("shops")
            .doc(shopId)
            .get()
            .then((doc) => {
                setBusiness(doc.data());
            })
            .catch((err) => {
                console.log("Error getting Business Info: ", err);
            });

        db.collection("shops")
            .doc(shopId)
            .collection("prizes")
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
    console.log("Wallet Prize: ", walletPrize);
    console.log("Reducer User: ", userState);

    //every time a new post is added this code fires
    const handleCheckin = () => {
        // First Check if Proximity is confirmed and user is logged in
        const goodToGo =
            goStatus.gotDistance && !!userState.userId ? true : false;

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
        if (userBizRelationship !== null) {
            // Check if User already Checked in today
            const currTime = Date.now();

            let lastCheckin = userBizRelationship.visitLog.slice(-1)[0];

            const timeDiff = Math.abs(currTime - lastCheckin);

            const diffInMinutes = Math.ceil(timeDiff / (1000 * 60));

            console.log("Difference in Minutes: ", diffInMinutes);
            // Update Visits, etc
            // Update Counts and Log
            db.collection("users")
                .doc(userState.userId)
                .collection("bizRelationships")
                .doc(shopId)
                .update({
                    visitCount: firebase.firestore.FieldValue.increment(1),
                    pointSum: firebase.firestore.FieldValue.increment(1),
                    visitLog: firebase.firestore.FieldValue.arrayUnion(
                        Date.now()
                    ),
                })
                .then(() => {
                    console.log("BizRelationship Points Successfully Updated!");

                    setAlertMsg({
                        message: `Checkin Successful. New Points: ${
                            userBizRelationship.pointSum + 1
                        }`,
                        severity: "success",
                    });

                    setGoStatus({ ...goStatus, checkedIn: true });

                    setOpenSnackBar(true);
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error(
                        "Error updating BizRelationship Points: ",
                        error
                    );
                });
        } else {
            const relationshipData = {
                relationshipId: shopId,
                businessName: business.businessName,
                visitCount: 1,
                pointSum: 1,
                redeemCount: 0,
                redeemLog: [],
                visitLog: [Date.now()],
            };

            // Create New Biz Relationship
            db.collection("users")
                .doc(userState.userId)
                .collection("bizRelationships")
                .doc(shopId)
                .set(relationshipData)
                .then((docRef) => {
                    console.log("New Relationship Created with Id: ", shopId);
                    setUserBizRelationship(relationshipData);

                    setAlertMsg({
                        message: "Checkin Successful. New Points: 1",
                        severity: "success",
                    });

                    setGoStatus({ ...goStatus, checkedIn: true });

                    setOpenSnackBar(true);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
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

    const encodeMsg = encodeurl(
        `Wanted to share this with you. Check them out. ${
            business
                ? business.businessName +
                  ": http://localhost:3000/shops/" +
                  shopId
                : "undefined"
        }/${userState.userId}`
    );

    const smsMessage =
        platform.macos || platform.ios
            ? `sms:&body=${encodeMsg}`
            : `sms:?body=${encodeMsg}`;

    console.log("User State at Checkin: ", userState);
    console.log("User Business Relationship: ", userBizRelationship);

    if (!business) {
        return <div>...Loading Checkin</div>;
    }

    return (
        <>
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
                                <LocalFireDepartmentIcon
                                    sx={{ color: "#e93f33" }}
                                />
                            </IconButton>
                        }
                        title="Chick Shack"
                        subheader="36-19 Broadway, Astoria NY"
                    />
                    <Divider />

                    <CardContent>
                        <AvailablePrizes
                            prizes={prizes}
                            handleOpenClaimModal={handleOpenClaimModal}
                            shopId={shopId}
                            handleOpenShareModal={handleOpenShareModal}
                        />
                        <Typography variant="body1" color="text.secondary">
                            Login Each Time You Visit and Get a Chance to Win a
                            Prize!
                        </Typography>
                        <br />
                        <Typography variant="body2" color="text.secondary">
                            Share With a Friend and they AUTOMATICALLY win the
                            prize when they Login
                        </Typography>
                    </CardContent>
                </Card>
                {goStatus.gotDistance ? (
                    // Created this component to render a different view
                    // based on whether user is logged in already & thus
                    // update useEffect dependancy variable to trigger db update
                    <div className="checkin__wrapper">
                        <h3>
                            {goStatus.checkedIn
                                ? "Checkin Successful !!"
                                : "Location Confirmed"}
                        </h3>
                        <div style={{ fontSize: "36px", marginBottom: "10px" }}>
                            {goStatus.checkedIn ? "💥" : "🙌"}
                        </div>
                        {goStatus.checkedIn ? (
                            <>
                                <h4>
                                    Your New Points:{" "}
                                    {userBizRelationship.pointSum + 1}
                                </h4>
                                <h4>@ {business.businessName}</h4>
                            </>
                        ) : (
                            <div
                                className="checkin__btn"
                                onClick={handleCheckin}
                            >
                                {" "}
                                Check In{" "}
                            </div>
                        )}
                    </div>
                ) : (
                    <GetLocation
                        handleGeoLocation={handleGeoLocation}
                        goStatus={goStatus}
                    />
                )}
            </div>
            <Modal
                open={openClaimModal}
                onClose={handleCloseClaimModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ textAlign: "center", borderColor: "#f0f0f0" }}
                    >
                        Sure About Adding To Your Wallet?
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, textAlign: "center" }}
                    >
                        Your Points Will Be Adjusted and Can't be Reversed.
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginTop: "15px",
                        }}
                    >
                        <Button color="primary" onClick={handleAddToWallet}>
                            Add to Wallet
                        </Button>
                        <Button color="error" onClick={handleCloseClaimModal}>
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openShareModal}
                onClose={handleCloseShareModal}
                aria-labelledby="modal2-modal-title"
                aria-describedby="modal2-modal-description"
            >
                <Box sx={style}>
                    <h3>
                        <center>
                            Shout Out Your Favorite Shops <br /> and
                            <span style={{ fontSize: "28px" }}> Get Paid!</span>
                        </center>
                    </h3>
                    <h3>
                        <center>Click Below and Go Social !!</center>
                    </h3>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "15px",
                        }}
                    >
                        <InlineShareButtons
                            config={{
                                alignment: "center", // alignment of buttons (left, center, right)
                                color: "social", // set the color of buttons (social, white)
                                enabled: true, // show/hide buttons (true, false)
                                font_size: 16, // font size for the buttons
                                labels: "cta", // button labels (cta, counts, null)
                                language: "en", // which language to use (see LANGUAGES)
                                networks: [
                                    // which networks to include (see SHARING NETWORKS)
                                    "whatsapp",
                                    "linkedin",
                                    "messenger",
                                    "facebook",
                                    "twitter",
                                ],
                                padding: 12, // padding within buttons (INTEGER)
                                radius: 4, // the corner radius on each button (INTEGER)
                                show_total: true,
                                size: 40, // the size of each button (INTEGER)

                                // OPTIONAL PARAMETERS
                                // url: `https://smartseedtech.com/${shopId}`, // (defaults to current url)
                                url: "https://www.chickenshacknyc.com/",
                                description: `Business Name: ${business.businessName}`, // (defaults to og:description or twitter:description)
                                title: `Business Name: ${business.businessName}`, // (defaults to og:title or twitter:title)
                                message: `Business Name: ${business.businessName}`, // (only for email sharing)
                                subject: `Business Name: ${business.businessName}`, // (only for email sharing)
                            }}
                        />
                        <div>
                            <center>
                                <h3>or Send a Text! </h3>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "36px",
                                            marginRight: "20px",
                                        }}
                                    >
                                        {String.fromCodePoint(0x1f449)}
                                    </span>
                                    <a href={smsMessage}>
                                        <ForumIcon
                                            sx={{
                                                color: "#1c76d2",
                                                fontSize: "52px",
                                            }}
                                        />
                                    </a>
                                </div>
                            </center>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackBar}
                >
                    <Alert
                        onClose={handleCloseSnackBar}
                        severity={alertMsg.severity}
                        sx={{ width: "100%" }}
                    >
                        {alertMsg.message}
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    );
}

export default Checkin;
