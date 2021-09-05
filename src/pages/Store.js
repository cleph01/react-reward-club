import React from "react";
import QRcodeGen from "../components/QRcodeGen";

function Store() {
    return <div>
        <div>Store Page</div>
        <QRcodeGen date={'today'} />
        </div>;
}

export default Store;
