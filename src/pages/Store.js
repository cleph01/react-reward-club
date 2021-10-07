import React from "react";

import QRcodeGen from "../components/QRcodeGen";

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

import "../styles/store.scss";
import logo from "../assets/images/logos/chicken_shack_logo.png";
import socialiite from "../assets/images/logos/logo_white_text.png";
import productPic from "../assets/images/chickenshack-product.jpg";

function Store() {
    const todaysDate = Date.now();

    return (
        <div className="container">
            <Card sx={{ maxWidth: 645 }}>
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
                    title="Chick Shack"
                    subheader="36-19 Broadway, Astoria NY"
                />
                <div className="body-wrapper">
                    <CardMedia
                        component="img"
                        height="194"
                        image={productPic}
                        alt="Paella dish"
                        loading="lazy"
                        sx={{ marginRight: "30px" }}
                    />
                    <QRcodeGen date={todaysDate} />
                </div>
                <CardContent>
                    <br />
                    <Typography
                        variant="h4"
                        color="text.secondary"
                        sx={{ textAlign: "center" }}
                    >
                        Scan and Win a Boatload of Prizes!
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className="footer">
                    <img
                        className="socialiite-logo"
                        src={socialiite}
                        alt="socialiite"
                    />
                </CardActions>
            </Card>
        </div>
    );
}

export default Store;
