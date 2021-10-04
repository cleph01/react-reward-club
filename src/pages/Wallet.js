import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import "../styles/wallet.scss";
import { db } from "../firebase/firebase_config";

import WalletItem from "../components/wallet/WalletItem";

import Nav from "../components/nav_bar/Nav";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

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

const Wallet = (props) => {
    // State to hold post data from Firebase call

    const [wallet, setWallet] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                <Nav />

                <div className="wallet-wrapper">
                    <div className="header">
                        <h3>&#x1F4B0; Digital Wallet &#x1F4B0;</h3>
                    </div>
                    {wallet.map((item, index) => (
                        <WalletItem
                            key={index}
                            itemId={item.walletItemId}
                            item_details={item.walletItem}
                            handleOpen={handleOpen}
                            handleClose={handleClose}
                        />
                    ))}
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
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
                        Please Show to Attendant
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, textAlign: "center" }}
                    >
                        Sure About Claiming Prize?
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginTop: "15px",
                        }}
                    >
                        <Button color="primary">Claim Prize</Button>
                        <Button color="error" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default Wallet;
