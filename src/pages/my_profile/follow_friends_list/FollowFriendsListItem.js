import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ForwardIcon from "@mui/icons-material/Forward";

function FollowListItem({ friend }) {
    return (
        <ListItem className="prize-list-item">
            <ListItemAvatar>
                <Avatar
                    alt={friend.userInfo.displayName}
                    src={friend.userInfo.avatarUrl}
                />
            </ListItemAvatar>

            <ListItemText
                primary={friend.userInfo.displayName}
                secondary={`# of Followers: ${friend.userInfo.followersFriends.length}`}
            />
            <Link
                to={`/user/${friend.userId}`}
                style={{ textDecoration: "none" }}
            >
                <ListItemSecondaryAction className="list-icons-wrapper">
                    <ForwardIcon
                        className="list-icons"
                        sx={{ color: "#637b97", fontSize: "33px" }}
                    />
                </ListItemSecondaryAction>
            </Link>
        </ListItem>
    );
}

export default FollowListItem;
