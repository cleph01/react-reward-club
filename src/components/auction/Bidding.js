import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import "../../styles/auction/bidding.scss";

function Bidding(props) {
    const [bid, setBid] = useState("");

    const handleChange = (event) => {
        setBid(event.target.value);
    };
    const placeBid = () => {
        let newBid = {
            bid: bid,
            time: new Date(),
            bidder: "Charlie",
        };

        setBid("");
    };
    const minBid =
        props.auction.bids && props.auction.bids.length > 0
            ? props.auction.bids[0].bid
            : props.auction.startingBid;

    const bidHistory = [
        {
            bid: 134,
            time: new Date("yesterday").toDateString(),
            bidderName: "Charlie",
        },
        {
            bid: 128,
            time: new Date("yesterday").toDateString(),
            bidderName: "Wilson",
        },
        {
            bid: 100,
            time: new Date("yesterday").toDateString(),
            bidderName: "Zuperberga",
        },
        {
            bid: 89,
            time: new Date("yesterday").toDateString(),
            bidderName: "Besos",
        },
    ];

    return (
        <div>
            {/* {!props.justEnded && new Date() < new Date(props.auction.bidEnd) && ( */}
            <div className="place-form">
                <TextField
                    id="bid"
                    label="Your Bid ($)"
                    value={bid}
                    onChange={handleChange}
                    type="number"
                    margin="normal"
                    helperText={`Enter $${Number(minBid) + 1} or more`}
                    className="margin-input"
                />
                <br />
                <div
                    className="bid-btn"
                    disabled={bid < minBid + 1}
                    onClick={placeBid}
                >
                    Place Bid
                </div>
                <br />
            </div>
            {/* )} */}
            <div className="bid-history" >
                <Typography variant="h6">All bids</Typography>
                <br />
                <div className="bid-history-container">
                    <div className="row">
                        <div className="col col-header">
                            <Typography variant="subtitle1">
                                Bid Amount
                            </Typography>
                        </div>
                        <div className="col col-header">
                            <Typography variant="subtitle1">
                                Bid Time
                            </Typography>
                        </div>
                        <div className="col col-header">
                            <Typography variant="subtitle1">Bidder</Typography>
                        </div>
                    </div>
                </div>
                {bidHistory.map((item, index) => {
                    return (
                        <div className="row">
                            <div className="col col1">
                                <Typography variant="body2">
                                    ${item.bid}
                                </Typography>
                            </div>
                            <div className="col col2">
                                <Typography variant="body2">
                                    {new Date(item.time).toLocaleString()}
                                </Typography>
                            </div>
                            <div className="col col1">
                                <Typography variant="body2">
                                    {item.bidderName}
                                </Typography>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Bidding;
