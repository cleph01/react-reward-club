import React from "react";

import QRCode from "react-qr-code";

function QRcodeGen(props) {
    const todaysDate = new Date(props.date);

    console.log("Today's date: ", todaysDate.toDateString());
    return (
        <div className="container">
            <QRCode value={`https://google.com?k=${props.date}`} />
        </div>
    );
}

export default QRcodeGen;
