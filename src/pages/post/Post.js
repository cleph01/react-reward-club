import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useParams } from "react-router";
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

import YouTubeEmbed from "./components/YouTubeEmbed";

import { firebase, db } from "../../firebase/firebase_config";

import "./styles/post.scss";

function Post() {
    const { userState } = useContext(UserContext);

    const { userId, postId } = useParams();

    // function Post(props) {

    const [urlUser, setUrlUser] = useState();
    const [post, setPost] = useState();
    const [comment, setComment] = useState([]);
    const [comments, setComments] = useState([]);
    const [showYouTube, setShowYouTube] = useState(false);
    // Hold Form Values
    const [values, setValues] = useState({
        caption: "",
        youtubeId: "lQggSxDGy4Q",
        imageUrl: "",
    });

    useEffect(() => {
        db.collection("user")
            .doc(userId)
            .collection("posts")
            .doc(postId)
            .get()
            .then((doc) => {
                setPost(doc.data());
            })
            .catch((err) => {
                console.log("Error geting Post: ", err);
            });
    }, []);

    useEffect(() => {
        db.collection("user")
            .doc(userId)

            .get()
            .then((doc) => {
                setUrlUser(doc.data());
            })
            .catch((err) => {
                console.log("Error geting Url User: ", err);
            });
    }, []);

    useEffect(() => {
        let unsubscribe;

        unsubscribe = db
            .collection("user")
            .doc(userId)
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (post) {
            if (post.youtubeId) {
                setShowYouTube(true);
            }
        }
    }, [post]);

    const postComment = (event) => {
        event.preventDefault();

        db.collection("user")
            .doc(userState.userId)
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .add({
                text: comment,
                username: userState.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

        setComment("");
    };

    console.log("Post: ", post);
    console.log("Url User: ", urlUser);

    if (!post || !urlUser) {
        return <div>...Loading</div>;
    }

    return (
        <div className="post__container">
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
                            alt={urlUser.displayName}
                            src={urlUser.avatarUrl}
                        />
                    }
                    action={
                        <IconButton aria-label="add to favorites">
                            <LocalFireDepartmentIcon
                                sx={{ color: "#bdbdbd" }}
                            />
                            <sup>
                                <span>3</span>
                            </sup>
                        </IconButton>
                    }
                    title={urlUser.displayName}
                    subheader={post.businessName}
                />
                <CardContent>
                    {showYouTube ? (
                        <YouTubeEmbed youtubeId={post.youtubeId} />
                    ) : (
                        <div>
                            <img alt="post" src={post.imageUrl} />
                        </div>
                    )}

                    <div className="action-btn-wrapper">
                        <Link to={`/shops/${post.businessId}`}>
                            <div className="visit-business-btn">
                                Business Page
                            </div>
                        </Link>
                        <Link to={`/user/${userId}`}>
                            <div className="visit-user-btn">
                                Socialiite User
                            </div>
                        </Link>
                    </div>
                    <div className="post__text">
                        <p>
                            <strong>{urlUser.displayName} </strong>
                            {post.caption}
                        </p>
                    </div>

                    <Divider />

                    <div className="post__comments">
                        <small>Latest Reviews:</small>
                        {comments.map((comment, index) => (
                            <p key={index}>
                                <strong>{comment.username}</strong>{" "}
                                {comment.text}
                            </p>
                        ))}
                    </div>

                    {userState.isAuthenticated && (
                        <form className="post__commentBox">
                            <input
                                className="post__input"
                                type="text"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />

                            <button
                                disabled={!comment}
                                className="post__button"
                                type="submit"
                                onClick={postComment}
                            >
                                Post
                            </button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default Post;
