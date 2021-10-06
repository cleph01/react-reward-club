import React, { useState } from "react";

import { firebase, db } from "../firebase/firebase_config";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Nav from "../components/nav_bar/Nav";
import Picker from "emoji-picker-react";

import "../styles/product/edit_loyalty_prize.scss";

function EditLoyaltyPrize() {
    const [values, setValues] = useState({
        emojiHexCode: "",
        description: "",
        open: false,
        error: "",
        redirectToProfile: false,
    });

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [emoji, setEmoji] = useState("0x1f35f");

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = () => {
        db.collection("posts")
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                description: values.description,
                emojiHexCode: emoji,
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    };

    const onEmojiClick = (event, emojiObject) => {
        const emojiHex = "0x" + emojiObject.unified;

        setEmoji(emojiHex);
        console.log("Emoji: ", emoji);
    };

    const inputProps = {
        maxLength: 17,
    };

    return (
        <div style={{ margin: "100px 0px" }}>
            <Nav />
            <Card className={"card"}>
                <CardContent>
                    <Typography variant="h5" className="title">
                        Edit Prize
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
                        label="Prize (i.e. FREE Fries) 17 Chars max"
                        className={"textField"}
                        value={values.description}
                        onChange={handleChange("handle")}
                        margin="normal"
                        multiline
                        inputProps={inputProps}
                        style={{ width: "100%" }}
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

export default EditLoyaltyPrize;
