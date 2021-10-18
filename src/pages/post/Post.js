import React, { useState, useEffect } from "react";
import "./styles/post.scss";
import Avatar from "@mui/material/Avatar";
import { db } from "../../firebase/firebase_config";

import firebase from "firebase";

function Post({ user, postId, username, caption, imageUrl, index }) {
    // function Post(props) {

    const [comment, setComment] = useState([]);
    const [comments, setComments] = useState([]);

    // const user = useContext(UserContext)

    useEffect(() => {
        let unsubscribe;

        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setComment("");
    };

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    // alt="CMoney"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>
            <img alt="Post_Image" className="post__image" src={imageUrl} />
            {/* image */}

            {/* Liked By  and counter */}

            <h4 className="post__text">
                <strong>{username} </strong>
                {caption}
            </h4>

            <div className="post__comments">
                {comments.map((comment, index) => (
                    <p key={index}>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

            {user && (
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
        </div>
    );
}

export default Post;
