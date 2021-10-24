import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PhotoIcon from "@mui/icons-material/Photo";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { storage, db } from "../../firebase/firebase_config";

import YouTubeEmbed from "./components/YouTubeEmbed";

import "./styles/add_post.scss";

function AddPost({ userId, username, setOpenUpload }) {
    const { userState } = useContext(UserContext);

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");

    const [showYouTube, setShowYouTube] = useState(true);

    // https://youtu.be/lQggSxDGy4Q

    const [values, setValues] = useState({
        caption: "",
        youtubeId: "lQggSxDGy4Q",
        imageUrl: "",
    });

    const handleYouTube = (name) => (e) => {
        setValues({
            ...values,
            [name]: e.target.value,
        });
    };

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmitYouTube = () => {
        console.log("Submit values: ", values);
    };

    const handleUpload = () => {
        const uploadTask = storage
            .ref(`user/${userState.userId}/posts/${image.name}`)
            .put(image);

        uploadTask.on(
            "state-changed",
            (snapshot) => {
                // progress bar function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setProgress(progress);
            },
            (error) => {
                // Error function
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function...
                storage
                    .ref(`user/${userState.userId}/posts`)
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        // post image inside db
                        db.collection("user")
                            .doc(userState.userId)
                            .collection("posts")
                            .add({
                                timestamp: db.FieldValue.serverTimestamp(),
                                caption: values.caption,
                                imageUrl: url,
                                values: values.youtubeId,
                                businessId: values.businessId,
                            });

                        setProgress(0);
                        setValues({});
                        setImage(null);
                        setOpenUpload(false);
                    });
            }
        );
    };

    return (
        <div className="add-post-container">
            <center>
                <h1>Upload Post</h1>
            </center>

            {showYouTube ? (
                <Card
                    sx={{
                        minWidth: 350,
                        maxWidth: 350,
                    }}
                >
                    <center>
                        <div style={{ padding: "5px", color: "#637b97" }}>
                            Upload Preview
                        </div>
                    </center>
                    <Divider />
                    <CardHeader
                        avatar={
                            <Avatar
                                loading="lazy"
                                alt={userState.displayName}
                                src={userState.avatarUrl}
                            />
                        }
                        action={
                            <IconButton aria-label="add to favorites">
                                <LocalFireDepartmentIcon
                                    sx={{ color: "#bdbdbd" }}
                                />
                            </IconButton>
                        }
                        title={userState.displayName}
                        subheader="The Chicken Shack"
                    />
                    <CardContent className="youtube-wrapper">
                        {!!values.youtubeId ? (
                            <YouTubeEmbed youtubeId={values.youtubeId} />
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "1px solid #dcdcdc",
                                    padding: "15px 35px",
                                    borderRadius: "25px",
                                }}
                            >
                                <YouTubeIcon
                                    sx={{ color: "red", fontSize: "63px" }}
                                />
                                <h4>Paste YouTube Share Link Below</h4>
                                <span style={{ fontSize: "36px" }}>👇</span>
                            </div>
                        )}

                        <TextField
                            id="handle"
                            label="Paste YouTube Link Here"
                            className="textField"
                            value={values.youTubeLink}
                            onChange={handleYouTube("youTubeLink")}
                            margin="normal"
                        />

                        <TextField
                            id="handle"
                            label="Enter a Post Caption..."
                            className="textField"
                            value={values.caption}
                            onChange={handleYouTube("caption")}
                            margin="normal"
                        />

                        <div
                            className="submit-youtube-btn"
                            variant="contained"
                            onClick={handleSubmitYouTube}
                        >
                            Upload
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card
                    sx={{
                        minWidth: 350,
                        maxWidth: 350,
                    }}
                >
                    <CardContent className="imageupload-wrapper">
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "1px solid #dcdcdc",
                                padding: "15px 35px",
                                borderRadius: "25px",
                            }}
                        >
                            <PhotoIcon
                                sx={{ color: "red", fontSize: "63px" }}
                            />
                            <h4>Click Below to Upload Image</h4>
                            <span style={{ fontSize: "36px" }}>👇</span>
                        </div>
                        <progress
                            className="imageupload__progress"
                            value={progress}
                            max="100"
                        />
                        <TextField
                            id="handle"
                            label="Enter a Caption..."
                            className="textField"
                            value={values.caption}
                            onChange={handleYouTube("caption")}
                            margin="normal"
                        />

                        <input type="file" onChange={handleChange} />
                        <div
                            className="upload-image-btn"
                            onClick={handleUpload}
                        >
                            Upload
                        </div>
                    </CardContent>
                </Card>
            )}
            <center>
                <div
                    className="toggle-youtube-input-btn"
                    onClick={() => setShowYouTube(!showYouTube)}
                >
                    {showYouTube
                        ? "Switch To Upload Image"
                        : "Switch To Paste YouTube Link"}
                </div>
            </center>
        </div>
    );
}

export default AddPost;
