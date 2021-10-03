import React from "react";

import Typography from "@mui/material/Typography";

import "../../styles/auction/bid_history.scss";

function BidHistory() {
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
    ];

    return (
        <div className="bid-history">
            <Typography variant="h6">All bids</Typography>
            <br />
            <div className="bid-history-container">
                <div className="row">
                    <div className="col col-header">
                        <Typography variant="subtitle1">Bid Amount</Typography>
                    </div>
                    <div className="col col-header">
                        <Typography variant="subtitle1">Bid Time</Typography>
                    </div>
                    <div className="col col-header">
                        <Typography variant="subtitle1">Bidder</Typography>
                    </div>
                </div>

                {bidHistory.map((item, index) => {
                    return (
                        <div className="row" key={index}>
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

export default BidHistory;
