import { useState, useContext, useEffect, forwardRef } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

import YouTubeIcon from "@mui/icons-material/YouTube";
import PhotoIcon from "@mui/icons-material/Photo";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { db, firebase } from "../../firebase/firebase_config";

import YouTubeEmbed from "./components/YouTubeEmbed";
import AddPostImageUpload from "./components/AddPostImageUpload";
import PostActionBar from "./components/PostActionBar";

import * as FUNCTIONS from "./functions/post_functions";

import "./styles/add_post.scss";

function AddPost({ setOpenUpload }) {
    const { userState } = useContext(UserContext);
    const history = useHistory();

    const [allBizRelationships, setAllBizRelationships] = useState();
    const [showYouTube, setShowYouTube] = useState(true);
    const [businessInfo, setBusinessInfo] = useState({});
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [alertMsg, setAlertMsg] = useState({
        message: "",
        severity: "",
    });

    const handleSelectBusiness = (event, child) => {
        setBusinessInfo({
            businessId: child.props.businessid,
            businessName: event.target.value,
        });
    };

    const businessPageRedirect = () =>
        history.push(
            `/shops/${businessInfo.businessId ? businessInfo.businessId : ""}`
        );

    // https://youtu.be/lQggSxDGy4Q

    const [values, setValues] = useState({
        caption: "",
        youtubeUrl: "",
        imageUrl: "",
    });

    const [youTubeEmbed, setYouTubeEmbed] = useState();
    // lQggSxDGy4Q
    const handleInputChange = (name) => (e) => {
        console.log("Nae: ", name, "value: ", e.target.value);
        setValues((prevState) => {
            if (name === "youtubeUrl") {
                setYouTubeEmbed(e.target.value.split("/").slice(-1)[0]);
            }

            return {
                ...values,
                [name]: e.target.value,
            };
        });
    };

    const handleSubmitYouTubePost = () => {
        if (
            !!!values.youtubeUrl ||
            !!!values.caption ||
            !!!businessInfo.businessName
        ) {
            setAlertMsg({
                message: "YouTube Link, Caption, and Shop Must Be Filled In",
                severity: "error",
            });

            setOpenSnackBar(true);
        } else {
            let postData = {
                youtubeId: youTubeEmbed,
                caption: values.caption,
                businessId: businessInfo.businessId,
                businessName: businessInfo.businessName,
                likes: [],
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            };

            FUNCTIONS.postShoutout(userState.userId, postData)
                .then((docRef) => {
                    setAlertMsg({
                        message: "Successfully Published Shoutout",
                        severity: "success",
                    });

                    setOpenSnackBar(true);

                    history.push(`/post/${userState.userId}/${docRef.id}`);
                })
                .catch((error) => {
                    setAlertMsg({
                        message: "Error Publishin Shoutout. Try Again",
                        severity: "error",
                    });

                    setOpenSnackBar(true);
                });
        }
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackBar(false);
    };

    useEffect(() => {
        db.collection("user")
            .doc(userState.userId)
            .collection("bizRelationship")
            .get()
            .then((querySnapshot) => {
                console.log("Snapshot in functions: ", querySnapshot);
                if (querySnapshot.docs.length > 0) {
                    setAllBizRelationships(
                        querySnapshot.docs.map((doc) => ({
                            businessId: doc.id,
                            businessInfo: doc.data(),
                        }))
                    );
                } else {
                    setAllBizRelationships([]);
                }
            })
            .catch((error) => {
                console.log("Error getting All Biz Relationships: ", error);
            });
    }, []);

    console.log("User State at ad post: ", userState);
    console.log("All Biz Relationships: ", allBizRelationships);
    console.log("Business Info: ", businessInfo);

    if (!allBizRelationships) {
        return <div>...Loading Add Post</div>;
    }

    // console.log("busines onChange: ", businessInfo);

    return (
        <>
            <div className="add-post-container">
                <center>
                    <h1>Shoutout Preview</h1>

                    <div
                        className="toggle-youtube-input-btn"
                        onClick={() => setShowYouTube(!showYouTube)}
                    >
                        {showYouTube
                            ? "Upload Image Instead"
                            : "Upload YouTube Video Instead"}
                    </div>
                </center>

                {showYouTube ? (
                    <Card
                        sx={{
                            minWidth: 350,
                            maxWidth: 350,
                        }}
                    >
                        <CardHeader
                            avatar={
                                <Avatar
                                    loading="lazy"
                                    alt={userState.displayName}
                                    src={userState.avatarUrl}
                                />
                            }
                            title={userState.displayName}
                            subheader={
                                businessInfo.businessName
                                    ? businessInfo.businessName
                                    : "Select Your Shoutout Business Below 👇"
                            }
                        />
                        <CardContent className="youtube-wrapper">
                            <Divider />
                            {!!values.youtubeUrl ? (
                                <YouTubeEmbed youtubeId={youTubeEmbed} />
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
                            <PostActionBar
                                userId={userState.userId}
                                businessId={businessInfo.businessId}
                                businessPageRedirect={businessPageRedirect}
                                displayName={userState.displayName}
                                caption={values.caption}
                            />

                            {allBizRelationships.length > 0 ? (
                                <>
                                    <h3>Fill in below to post a shoutout</h3>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                                Select Brand for Your Shoutout
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={
                                                    businessInfo.businessName
                                                        ? businessInfo.businessName
                                                        : ""
                                                }
                                                label="business"
                                                onChange={handleSelectBusiness}
                                                required
                                            >
                                                {allBizRelationships.map(
                                                    (business) => (
                                                        <MenuItem
                                                            key={
                                                                business.businessId
                                                            }
                                                            value={
                                                                business
                                                                    .businessInfo
                                                                    .businessName
                                                            }
                                                            businessid={
                                                                business.businessId
                                                            }
                                                        >
                                                            {
                                                                business
                                                                    .businessInfo
                                                                    .businessName
                                                            }
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <TextField
                                        id="handle"
                                        label="Paste YouTube Link Here"
                                        className="textField"
                                        value={values.youtubeUrl}
                                        onChange={handleInputChange(
                                            "youtubeUrl"
                                        )}
                                        margin="normal"
                                        error={
                                            values.youtubeUrl === ""
                                                ? true
                                                : false
                                        }
                                        required
                                    />

                                    <TextField
                                        id="handle"
                                        label="Enter a Post Caption..."
                                        className="textField"
                                        value={values.caption}
                                        onChange={handleInputChange("caption")}
                                        margin="normal"
                                        error={
                                            values.caption === "" ? true : false
                                        }
                                        multiline
                                        required
                                    />

                                    <div
                                        className="submit-youtube-btn"
                                        onClick={handleSubmitYouTubePost}
                                        style={{
                                            display:
                                                values.youtubeUrl === "" ||
                                                values.caption === "" ||
                                                !!!businessInfo.businessName
                                                    ? "none"
                                                    : "flex",
                                        }}
                                    >
                                        Post
                                    </div>
                                </>
                            ) : (
                                <div>Connect with a Business</div>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <Card
                        sx={{
                            minWidth: 350,
                            maxWidth: 350,
                        }}
                    >
                        <CardHeader
                            avatar={
                                <Avatar
                                    loading="lazy"
                                    alt={userState.displayName}
                                    src={userState.avatarUrl}
                                />
                            }
                            title={userState.displayName}
                            subheader={
                                businessInfo.businessName
                                    ? businessInfo.businessName
                                    : "Select Your Shoutout Business Below 👇"
                            }
                        />
                        <CardContent className="imageupload-wrapper">
                            <AddPostImageUpload
                                userId={userState.userId}
                                businessInfo={businessInfo}
                                businessPageRedirect={businessPageRedirect}
                                displayName={userState.displayName}
                                inputValues={values}
                                setAlertMsg={setAlertMsg}
                                setOpenSnackBar={setOpenSnackBar}
                            />

                            {allBizRelationships.length > 0 ? (
                                <>
                                    <h3>Fill in below to post a shoutout</h3>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                                Select Brand for Your Shoutout
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={
                                                    businessInfo.businessName
                                                        ? businessInfo.businessName
                                                        : ""
                                                }
                                                label="business"
                                                onChange={handleSelectBusiness}
                                                required
                                            >
                                                {allBizRelationships.map(
                                                    (business) => (
                                                        <MenuItem
                                                            key={
                                                                business.businessId
                                                            }
                                                            value={
                                                                business
                                                                    .businessInfo
                                                                    .businessName
                                                            }
                                                            businessid={
                                                                business.businessId
                                                            }
                                                        >
                                                            {
                                                                business
                                                                    .businessInfo
                                                                    .businessName
                                                            }
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Box>

                                    <TextField
                                        id="handle"
                                        label="Enter a Post Caption..."
                                        className="textField"
                                        value={values.caption}
                                        onChange={handleInputChange("caption")}
                                        margin="normal"
                                        error={
                                            values.caption === "" ? true : false
                                        }
                                        multiline
                                        required
                                    />
                                </>
                            ) : (
                                <div>Connect with a Business</div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>

            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackBar}
                >
                    <Alert
                        onClose={handleCloseSnackBar}
                        severity={alertMsg.severity}
                        sx={{ width: "100%" }}
                    >
                        {alertMsg.message}
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    );
}

export default AddPost;
