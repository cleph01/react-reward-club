import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import "../styles/wallet-item.scss";

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
import PhoneIcon from "@mui/icons-material/Phone";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CheckIcon from "@mui/icons-material/Check";

import logo from "../../../assets/images/logos/chicken_shack_logo.png";

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
            <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>
                <CardHeader
                    className="header"
                    avatar={
                        <Avatar
                            src={logo}
                            sx={{
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
                            <PhoneIcon />
                        </IconButton>
                    }
                    title="Chick Shack"
                    subheader="36-19 Broadway, Astoria NY"
                />
                {/* <CardMedia
                    component="img"
                    height="194"
                    image={productPic}
                    alt="Paella dish"
                    loading="lazy"
                /> */}
                <div className="wallet-item-emoji">
                    {props.item_details.emoji}
                </div>
                <CardContent>
                    <Typography
                        className="description"
                        variant="h4"
                        color="text.secondary"
                    >
                        {props.item_details.itemDescription}
                    </Typography>
                    <br />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ textAlign: "center" }}
                    >
                        Shoutout, Trade, or Redeem below
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className="footer">
                    {/* <IconButton aria-label="fire">
                        <LocalFireDepartmentIcon />
                    </IconButton> */}
                    <IconButton
                        aria-label="share"
                        onClick={(e) => console.log(e.target.id)}
                    >
                        <ShareIcon id={props.itemId} className="icon" />
                    </IconButton>
                    <IconButton aria-label="trade">
                        <CompareArrowsIcon className="icon" />
                    </IconButton>
                    <IconButton aria-label="redeem" onClick={props.handleOpen}>
                        <CheckIcon className="icon" />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
};

export default Wallet_Item;
