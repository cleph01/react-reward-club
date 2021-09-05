import React from "react";

import QRCode from "react-qr-code";

function QRcodeGen(props) {
    return (
        <div>
            <QRCode value="https://google.com" />
            <div>{props.date}</div>
        </div>
    );
}

export default QRcodeGen;
