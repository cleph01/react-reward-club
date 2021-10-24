import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import ShopLogoUpload from "./ShopLogoUpload";

import "../styles/edit_shop_mod.scss";

const imgUrl =
    "https://firebasestorage.googleapis.com/v0/b/socialiite-instagram-clone.appspot.com/o/images%2FIMG_82B4B1E571E6-1.jpeg?alt=media&token=4db7c353-d0a5-47c9-bc8a-31cdbbdad1e9";

function EditShopMod(props) {
    const [values, setValues] = useState({
        businessName: props.businessData.info.businessName,

        aboutUs: props.businessData.info.description,
    });

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleReset = () => {
        setValues({
            businessName: props.businessData.info.businessName,
            aboutUs: props.businessData.info.description,
        });
    };

    return (
        <div className="edit-shop-mod-container">
            <CardContent>
                <Typography className="edit-shop-mod-header" variant="h5">
                    Edit Shop
                </Typography>

                <ShopLogoUpload
                    imgUrl={props.businessData.info.logoUrl || imgUrl}
                    businessId={props.businessData.businessId}
                />
                <center>
                    <TextField
                        id="shopname"
                        name="businessName"
                        label="Shop Name"
                        value={values.businessName}
                        onChange={handleChange("businessName")}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        id="about-us"
                        name="aboutUs"
                        label="About Us"
                        value={values.aboutUs}
                        onChange={handleChange("aboutUs")}
                        margin="normal"
                        multiline
                    />
                    <br />{" "}
                    {values.error && (
                        <Typography component="p" color="error">
                            <div>error</div>
                            {values.error}
                        </Typography>
                    )}
                </center>
            </CardContent>

            <div className="btn-wrapper">
                <div className="submit-btn">Update</div>
                <div className="cancel-btn" onClick={handleReset}>
                    Cancel
                </div>
            </div>
        </div>
    );
}

export default EditShopMod;
