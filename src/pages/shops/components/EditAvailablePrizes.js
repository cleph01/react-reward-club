import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";

import EditAvailablePrizeItem from "./EditAvailablePrizeItem";

import Divider from "@mui/material/Divider";

import "../styles/available_prize_list.scss";

function EditAvailablePrizes({ prizes, shopId, handleOpenDeleteModal }) {
    if (!prizes) {
        return <div>...Loading Edit Available Prizes</div>;
    }

    return (
        <List className="prize-list-container">
            {prizes.map((prize, i) => (
                <div key={i}>
                    <EditAvailablePrizeItem
                        prize={prize}
                        handleOpenDeleteModal={handleOpenDeleteModal}
                        shopId={shopId}
                    />
                    <Divider />
                </div>
            ))}
        </List>
    );
}

export default EditAvailablePrizes;
