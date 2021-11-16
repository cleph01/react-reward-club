import { useContext } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";

import { UserContext } from "../../../contexts/UserContext";

function AvailablePrizeItem({
    prize,
    handleOpenClaimModal,
    shopId,
    handleOpenShareModal,
}) {
    const { userState } = useContext(UserContext);

    return (
        <ListItem className="prize-list-item">
            <ListItemAvatar>
                <span className="emoji">{prize.prize.emoji}</span>
            </ListItemAvatar>
            <div>
                <ListItemText
                    primary={prize.prize.description}
                    secondary={`Valued at ${prize.prize.pointCost} points`}
                />
            </div>
            <ListItemSecondaryAction className="list-icons-wrapper">
                {userState.userId ? (
                    <>
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
                    </>
                ) : (
                    <div
                        style={{
                            fontSize: "12px",
                            color: "#616161",
                            fontStyle: "italic",
                        }}
                    >
                        Login to Claim
                    </div>
                )}
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default AvailablePrizeItem;
