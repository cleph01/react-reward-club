import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";

function FollowListItem({ business, handleOpenShareModal, numPrizes }) {
    return (
        <ListItem className="prize-list-item">
            <Link to={`/shops/${business.businessId}`}>
                <ListItemAvatar>
                    <Avatar
                        alt={business.businessInfo.businessName}
                        src={business.businessInfo.logoUrl}
                    />
                </ListItemAvatar>
            </Link>

            <ListItemText
                primary={business.businessInfo.businessName}
                secondary={`# of Prizes: ${numPrizes}`}
            />

            <ListItemSecondaryAction className="list-icons-wrapper">
                <ShareIcon
                    className="list-icons"
                    sx={{ color: "#637b97" }}
                    onClick={() =>
                        handleOpenShareModal({
                            businessId: business.businessId,
                            businessName: business.businessInfo.businessName,
                        })
                    }
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default FollowListItem;
