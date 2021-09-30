import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import ShopLogoUpload from "../../components/image_upload/ShopLogoUpload";

import "../../styles/shop/edit_shop_mod.scss";

const imgUrl =
    "https://firebasestorage.googleapis.com/v0/b/socialiite-instagram-clone.appspot.com/o/images%2FIMG_82B4B1E571E6-1.jpeg?alt=media&token=4db7c353-d0a5-47c9-bc8a-31cdbbdad1e9";

function EditShop() {
    const [values, setValues] = useState({
        name: "",
        handle: "",
        email: "",
        bio: "",
        open: false,
        error: "",
        redirectToProfile: false,
    });

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <div className="edit-shop-mod-container">
            <CardContent>
                <Typography className="edit-shop-mod-header" variant="h5">
                    Edit Shop
                </Typography>

                <ShopLogoUpload imgUrl={imgUrl} />
                <center>
                    <TextField
                        id="shopname"
                        label="Shop Name"
                        value={values.handle}
                        onChange={handleChange("handle")}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        id="description"
                        label="Description"
                        value={values.bio}
                        onChange={handleChange("bio")}
                        margin="normal"
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
            <center><h3>Owner: Super Mahn</h3></center>
            <div className="btn-wrapper">
                <div className="submit-btn">Update</div>
            </div>
        </div>
    );
}

export default EditShop;
