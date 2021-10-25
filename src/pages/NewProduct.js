import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import NewProductImageUpload from "./profile/components/NewProductImageUpload";
import Nav from "../components/nav_bar/Nav";

import "../styles/product/new_product.scss";

function NewProduct() {
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

    const imgUrl =
        "https://firebasestorage.googleapis.com/v0/b/socialiite-instagram-clone.appspot.com/o/images%2FIMG_82B4B1E571E6-1.jpeg?alt=media&token=4db7c353-d0a5-47c9-bc8a-31cdbbdad1e9";

    return (
        <div className="new-product-container">
            <Card className="card-wrapper">
                <CardContent>
                    <center>
                        <Typography variant="h5">New Product</Typography>
                        <NewProductImageUpload />
                        <TextField
                            id="handle"
                            label="Shop Name"
                            value={values.handle}
                            onChange={handleChange("handle")}
                            margin="normal"
                        />
                        <br />
                        {/* <TextareaAutosize
                            id="bio"
                            label="Description"
                            placeholder="Description"
                            value={values.bio}
                            onChange={handleChange("bio")}
                            margin="normal"
                        /> */}
                        <TextField
                            id="bio"
                            label="Description"
                            value={values.bio}
                            onChange={handleChange("bio")}
                            margin="normal"
                        />
                        <br />
                        <TextField
                            id="bio"
                            label="Category"
                            value={values.bio}
                            onChange={handleChange("bio")}
                            margin="normal"
                        />
                        <br />
                        <TextField
                            id="bio"
                            label="Quantity"
                            value={values.bio}
                            onChange={handleChange("bio")}
                            margin="normal"
                        />
                        <br />
                        <TextField
                            id="bio"
                            label="Price"
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
                <center>
                    <div className="btn-wrapper">
                        <div className="submit-btn">Submit</div>
                        <div className="cancel-btn">Cancel</div>
                    </div>
                </center>
            </Card>
        </div>
    );
}

export default NewProduct;
