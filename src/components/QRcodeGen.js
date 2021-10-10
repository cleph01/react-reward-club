import React from "react";

import QRCode from "react-qr-code";

function QRcodeGen({ todaysDate }) {
    // const todaysDate = new Date(props.date);

    console.log("Today's date: ", todaysDate);
    return (
        <div className="container">
            <QRCode value={`https://google.com?k=${todaysDate}`} />
        </div>
    );
}

export default QRcodeGen;
