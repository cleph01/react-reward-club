import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function EditAvailablePrizeItem({ prize, shopId, handleOpenDeleteModal }) {
    return (
        <ListItem className="prize-list-item">
            <ListItemAvatar>
                <span className="emoji">{prize.prize.emoji}</span>
            </ListItemAvatar>
            <div>
                <ListItemText
                    primary={prize.prize.itemDescription}
                    secondary={`Points Needed: ${prize.prize.pointThreshold}`}
                />
            </div>
            <ListItemSecondaryAction className="list-icons-wrapper">
                <Link to={`/seller/${shopId}/${prize.prizeId}/edit-prize`}>
                    <EditIcon className="list-icons" />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <DeleteForeverIcon
                    className="list-icons"
                    id={prize.prizeId}
                    onClick={() =>
                        handleOpenDeleteModal({
                            prizeId: prize.prizeId,
                            prizeDetails: prize.prize,
                        })
                    }
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default EditAvailablePrizeItem;
