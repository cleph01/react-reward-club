import { useState, useContext, useEffect, forwardRef } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LikeAction from "./components/LikeAction";
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

import { storage, db } from "../../firebase/firebase_config";

import YouTubeEmbed from "./components/YouTubeEmbed";
import AddPostImageUpload from "./components/AddPostImageUpload";

import * as FUNCTIONS from "./functions/post_functions";

import "./styles/add_post.scss";

function AddPost({ setOpenUpload }) {
    const { userState } = useContext(UserContext);
    const history = useHistory();

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");
    const [allBizRelationships, setAllBizRelationships] = useState();
    const [showYouTube, setShowYouTube] = useState(true);
    const [businessInfo, setBusinessInfo] = useState({});
    const [openSnackBar, setOpenSnackBar] = useState(false);

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
        let result = FUNCTIONS.getAllBizRelationships(
            userState.userId,
            setAllBizRelationships
        );

        console.log("Result: ", result);

        result.then((querySnapshot) => {
            console.log("Snapshot in functions: ", querySnapshot);
            if (querySnapshot.docs.length > 0) {
                setAllBizRelationships(
                    querySnapshot.docs.map((doc) => ({
                        businessId: doc.id,
                        businessInfo: doc.data(),
                    }))
                );
            }
        });
    }, []);

    console.log("All Biz Relationships: ", allBizRelationships);
    console.log("Business Info: ", businessInfo);

    if (!allBizRelationships) {
        return <div>...Loading</div>;
    }

    // console.log("busines onChange: ", businessInfo);

    return (
        <>
            <div className="add-post-container">
                <center>
                    <h1>Shoutout Preview</h1>
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
                            <div className="actions__bar">
                                <div className="actions__wrapper">
                                    <IconButton>
                                        <LocalFireDepartmentIcon
                                            style={{
                                                color: "#e93f33",
                                            }}
                                        />
                                    </IconButton>
                                    <ChatBubbleOutlineIcon className="chatBubble-btn" />
                                    <div className="likes-followers__wrapper">
                                        356 Likes
                                    </div>

                                    <div
                                        className={
                                            !!businessInfo.businessId
                                                ? "visit-user-btn"
                                                : "visit-user-btn disabled"
                                        }
                                        onClick={businessPageRedirect}
                                    >
                                        Business{"   "}
                                        <OpenInNewIcon className="newPage-icon" />
                                    </div>

                                    <Link to={`/user/${userState.userId}`}>
                                        <div className="visit-user-btn">
                                            Socialiite{"   "}
                                            <OpenInNewIcon className="newPage-icon" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <Divider />

                            <div className="post__text">
                                <strong>{userState.displayName}</strong>
                                &nbsp;{values.caption || "Test text"}
                            </div>

                            <Divider />

                            <Box sx={{ width: "100%", marginTop: "10px" }}>
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
                                    >
                                        {allBizRelationships.map((business) => (
                                            <MenuItem
                                                key={business.businessId}
                                                value={
                                                    business.businessInfo
                                                        .businessName
                                                }
                                                businessid={business.businessId}
                                            >
                                                {
                                                    business.businessInfo
                                                        .businessName
                                                }
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <TextField
                                id="handle"
                                label="Paste YouTube Link Here"
                                className="textField"
                                value={values.youTubeLink}
                                onChange={handleYouTube("youTubeLink")}
                                margin="normal"
                                error={false}
                                required
                            />

                            <TextField
                                id="handle"
                                label="Enter a Post Caption..."
                                className="textField"
                                value={values.caption}
                                onChange={handleYouTube("caption")}
                                margin="normal"
                                error={true}
                                required
                            />

                            <div
                                className="submit-youtube-btn"
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
                            <AddPostImageUpload />
                            <TextField
                                id="handle"
                                label="Enter a Caption..."
                                className="textField"
                                value={values.caption}
                                onChange={handleYouTube("caption")}
                                margin="normal"
                            />
                        </CardContent>
                    </Card>
                )}
                <center>
                    <div
                        className="toggle-youtube-input-btn"
                        onClick={() => setShowYouTube(!showYouTube)}
                    >
                        {showYouTube
                            ? "CLick to Upload Image Instead"
                            : "Switch To Upload Video Instead"}
                    </div>
                </center>
            </div>

            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackBar}
                >
                    <Alert
                        onClose={handleCloseSnackBar}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Congratulations! Enjoy Your Prize.
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    );
}

export default AddPost;
