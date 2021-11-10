import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import "../styles/post_action_bar.scss";

function PostActionBar({
    userId,
    businessId,
    businessPageRedirect,
    displayName,
    caption,
}) {
    return (
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
                <div className="likes-followers__wrapper">356 Likes</div>

                <div
                    className={
                        !!businessId
                            ? "visit-user-btn"
                            : "visit-user-btn disabled"
                    }
                    onClick={businessPageRedirect}
                >
                    Business{"   "}
                    <OpenInNewIcon className="newPage-icon" />
                </div>

                <Link to={`/user/${userId}`}>
                    <div className="visit-user-btn">
                        Socialiite{"   "}
                        <OpenInNewIcon className="newPage-icon" />
                    </div>
                </Link>
            </div>
            <div className="post__text">
                <strong>{displayName}</strong>
                &nbsp;
                {caption || "...Fill In Caption Field Below"}
            </div>
        </div>
    );
}

export default PostActionBar;
