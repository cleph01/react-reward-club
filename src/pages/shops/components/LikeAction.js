import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { firebase, db } from "../../../firebase/firebase_config";

function LikeAction({ userId, shopId, likedShop, totalLikes }) {
    console.log("Liked Shop: ", likedShop);

    const [toggleLiked, setToggleLiked] = useState(likedShop);
    const [likes, setLikes] = useState(totalLikes);

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

        await db
            .collection("shops")
            .doc(shopId)
            .update({
                likes: toggleLiked
                    ? firebase.firestore.FieldValue.arrayRemove(userId)
                    : firebase.firestore.FieldValue.arrayUnion(userId),
            });

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    };

    console.log("Toggle Liked: ", toggleLiked);
    return (
        <IconButton aria-label="add to favorites" onClick={handleToggleLiked}>
            <LocalFireDepartmentIcon
                style={{ color: toggleLiked ? "#e93f33" : "#bdbdbd" }}
            />
        </IconButton>
    );
}

export default LikeAction;
