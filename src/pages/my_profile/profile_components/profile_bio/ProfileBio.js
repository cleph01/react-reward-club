import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import "../../styles/profile_bio.scss";

import { UserContext } from "../../../../contexts/UserContext";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LoginIcon from "@mui/icons-material/Login";

function ProfileBio({ user, handleFollow, handleUnFollow, otherUserId }) {
    const { userState } = useContext(UserContext);

    const history = useHistory();

    console.log("Other User at Bio: ", user);
    console.log("Path at Bio: ", history.location.pathname);

    const dateJoined = user.created.toDate().toDateString();

    const ownProfile = history.location.pathname === "/profile";

    console.log("User State at Bio: ", userState);

    return (
        <div className="profile__bio">
            <div className="profile__bio-textArea">
                <div className="aboutMe-header">
                    <h5>About Me</h5>
                    <div style={{ display: ownProfile ? "none" : "block" }}>
                        {userState.isAuthenticated ? (
                            !userState.followingFriends.includes(
                                otherUserId
                            ) ? (
                                <div
                                    style={{
                                        display:
                                            userState.userId !== otherUserId
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
                                            userState.userId !== otherUserId
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
            <div className="profile__bio-joined">Joined: {dateJoined}</div>
        </div>
    );
}

export default ProfileBio;
