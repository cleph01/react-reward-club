import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import ProfileImageUpload from "../components/image_upload/ProfileImageUpload";
import Nav from "../components/nav_bar/Nav";

import "../styles/profile/profile_edit.scss";

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        marginTop: "10px",
        paddingBottom: "10px",
    },
    title: {
        margin: "50px",
        color: "#213b77",
    },
    error: {
        verticalAlign: "middle",
    },
    textField: {
        marginLeft: "10px",
        marginRight: "10px",
        width: 300,
    },
    submit: {
        margin: "auto",
        marginBottom: "10px",
    },
}));

function EditProfile() {
    const classes = useStyles();
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
        <div style={{ margin: "100px 0px" }}>
            <Nav />
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" className={classes.title}>
                        Edit Profile
                    </Typography>
                    <ProfileImageUpload imgUrl={imgUrl} />
                    <TextField
                        id="handle"
                        label="Handle"
                        className={classes.textField}
                        value={values.handle}
                        onChange={handleChange("handle")}
                        margin="normal"
                    />
                    <br />
                    <TextField
                        id="bio"
                        label="Bio"
                        className={classes.textField}
                        value={values.bio}
                        onChange={handleChange("bio")}
                        margin="normal"
                    />
                    <br />{" "}
                    {values.error && (
                        <Typography component="p" color="error">
                            <div className={classes.error}>error</div>
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

export default EditProfile;
