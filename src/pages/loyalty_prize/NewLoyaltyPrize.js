import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firebase, db } from "../../firebase/firebase_config";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Nav from "../../components/nav_bar/Nav";
import Picker from "emoji-picker-react";

import "./styles/new_loyalty_prize.scss";

function NewLoyaltyPrize() {
    const { shopId, prizeId } = useParams();

    const [prize, setPrize] = useState();

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [chosenEmoji, setChosenEmoji] = useState("0x1f35f");

    const [values, setValues] = useState({
        emoji: "",
        description: "",
    });

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleReset = () => {
        setValues({
            emoji: "",
            description: "",
            pointThreshold: "",
        });
    };

    const handleSubmit = () => {
        db.collection("posts")
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                description: values.description,
                emoji: chosenEmoji.emoji,
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    };

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);

        setValues({ ...values, emoji: emojiObject.emoji });
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
                        Create New Prize
                    </Typography>
                    <div className="emoji-wrapper">
                        <div className="emoji-preview">
                            {values.emoji || ""}
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
                                Choose Emoji
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
                        label="Prize Description (17 Chars max)"
                        className="textField"
                        value={values.description}
                        onChange={handleChange("description")}
                        margin="normal"
                        multiline
                        inputProps={inputProps}
                        style={{ width: "100%" }}
                    />
                    <TextField
                        label="Point Threshold"
                        className="textField"
                        type="number"
                        value={values.pointThreshold}
                        onChange={handleChange("pointThreshold")}
                        margin="normal"
                        multiline
                        inputProps={inputProps}
                        style={{ width: "100%" }}
                    />
                    <br />{" "}
                </CardContent>
                <div className="btn-wrapper">
                    <div className="submit-btn">Submit</div>
                    <div className="reset-btn" onClick={handleReset}>
                        Cancel
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default NewLoyaltyPrize;
