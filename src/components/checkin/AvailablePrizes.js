import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";

import ShareIcon from "@mui/icons-material/Share";

import "../../styles/checkin/available_prize_list.scss";

function AvailablePrizes({ prizes }) {
    console.log("Available Prizes: ", prizes);

    if (!prizes) {
        return <div>...Loading</div>;
    }

    return (
        <List className="prize-list-container">
            {prizes.map((prize, i) => (
                <div key={i}>
                    <ListItem className="product-list-item">
                        <ListItemAvatar>
                            <span>
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
                            <ShareIcon
                                className="list-icons"
                                id={prize.prizeId}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    );
}

export default AvailablePrizes;
