import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import "../styles/profile_bio.scss";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LoginIcon from "@mui/icons-material/Login";

import Skeleton from "react-loading-skeleton";

function ProfileBio({
    user,
    authUser,
    handleFollow,
    handleUnFollow,
    otherUserId,
}) {
    const history = useHistory();

    console.log("User at Bio: ", user);

    const ownProfile = history.location.pathname === "/profile";

    if (!user.userId) {
        return <Skeleton count={1} height={61} />;
    }

    return (
        <div className="profile__bio">
            <div className="profile__bio-textArea">
                <div className="aboutMe-header">
                    <h5>About Me</h5>
                    <div style={{ display: ownProfile ? "none" : "block" }}>
                        {authUser ? (
                            !user.followingFriends.includes(otherUserId) ? (
                                <div
                                    style={{
                                        display:
                                            user.userId !== otherUserId
                                                ? "flex"
                                                : "none",
                                    }}
                                    className="follow-btn"
                                    onClick={handleFollow}
                                >
                                    <AddIcon /> Follow
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display:
                                            user.userId !== otherUserId
                                                ? "flex"
                                                : "none",
                                    }}
                                    className="follow-btn"
                                    onClick={handleUnFollow}
                                >
                                    <RemoveIcon /> UnFollow
                                </div>
                            )
                        ) : (
                            <Link
                                to="/login"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="follow-btn">
                                    <LoginIcon />
                                    &nbsp;&nbsp;Login
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
                <p>{user.aboutMe || "Tell Us Something About You"}</p>
            </div>
            <div className="profile__bio-joined">
                Joined: {new Date(user.timestamp).toDateString()}
            </div>
        </div>
    );
}

export default ProfileBio;
