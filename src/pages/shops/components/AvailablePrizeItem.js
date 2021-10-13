import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";



function AvailablePrizeItem({
    prize,
    handleOpenClaimModal,
    storeId,
    handleOpenShareModal,
}) {
   

    return (
        <ListItem className="prize-list-item">
            <ListItemAvatar>
                <span className="emoji">
                    {String.fromCodePoint(prize.prize.emojiHexCode)}
                </span>
            </ListItemAvatar>
            <div>
                <ListItemText
                    primary={prize.prize.itemDescription}
                    secondary={`Points Needed: ${prize.prize.pointThreshold}`}
                />
            </div>
            <ListItemSecondaryAction className="list-icons-wrapper">
                <AddIcon
                    className="list-icons"
                    id={prize.prizeId}
                    onClick={() =>
                        handleOpenClaimModal({
                            prizeId: prize.prizeId,
                            prizeDetails: prize.prize,
                        })
                    }
                />
                &nbsp;&nbsp;&nbsp;
                <ShareIcon
                    className="list-icons"
                    id={prize.prizeId}
                    onClick={handleOpenShareModal}
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default AvailablePrizeItem;
