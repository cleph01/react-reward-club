import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Nav from "../components/nav_bar/Nav";
import Picker from "emoji-picker-react";

import "../styles/product/edit_product.scss";

function EditProduct() {
    const [values, setValues] = useState({
        name: "",
        handle: "",
        email: "",
        bio: "",
        open: false,
        error: "",
        redirectToProfile: false,
    });

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [emoji, setEmoji] = useState("0x1f35f");

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const onEmojiClick = (event, emojiObject) => {
        const emojiHex = "0x" + emojiObject.unified;

        setEmoji(emojiHex);
        console.log("Emoji: ", emojiObject);
    };

    return (
        <div style={{ margin: "100px 0px" }}>
            <Nav />
            <Card className={"card"}>
                <CardContent>
                    <Typography variant="h5" className="title">
                        Edit Product
                    </Typography>
                    <div className="emoji-wrapper">
                        <div className="emoji-preview">
                            {String.fromCodePoint(emoji)}
                        </div>
                        <div
                            className="btn-wrapper"
                            style={{
                                display: !showEmojiPicker ? "block" : "none",
                            }}
                        >
                            <div
                                className="change-emoji-btn"
                                onClick={() => {
                                    setShowEmojiPicker(!showEmojiPicker);
                                }}
                            >
                                Change Emoji
                            </div>
                        </div>
                        <div
                            className="emoji-picker-wrapper"
                            style={{
                                display: showEmojiPicker ? "block" : "none",
                            }}
                        >
                            <Picker onEmojiClick={onEmojiClick} />
                            <div
                                className="btn-wrapper"
                                style={{
                                    display: showEmojiPicker ? "flex" : "none",
                                    textAlign: "center",
                                    marginTop: "30px",
                                }}
                            >
                                <div
                                    className="close-emoji-btn"
                                    onClick={() => {
                                        setShowEmojiPicker(!showEmojiPicker);
                                    }}
                                >
                                    Close Emoji Picker
                                </div>
                            </div>
                        </div>
                    </div>
                    <TextField
                        label="Prize (i.e. FREE Fries)"
                        className={"textField"}
                        value={values.description}
                        onChange={handleChange("handle")}
                        margin="normal"
                        multiline
                        rows={2}
                        maxRows={4}
                    />
                    
                    <br />{" "}
                    {values.error && (
                        <Typography component="p" color="error">
                            <div className="error">error</div>
                            {values.error}
                        </Typography>
                    )}
                </CardContent>
                <div className="btn-wrapper">
                    <div className="submit-btn">Submit</div>
                </div>
            </Card>
        </div>
    );
}

export default EditProduct;
