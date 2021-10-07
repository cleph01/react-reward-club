import React from "react";
import Auth from "../../components/Auth";

const style = {
    position: "relative",
    width: "100px",
    height: "40px",
    borderRadius: "25px",
    background: "#1c76d2",
    boxShadow: "0 4px 7px rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f9f9f9",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s ease-out",
};
function CheckInAuth({ user, handleCheckin }) {
    let component;

    if (user) {
        component = (
            <div>
                <center>
                    <h3 style={{ color: "#f0f0f0" }}>You're Signed In</h3>
                    <div style={style} onClick={handleCheckin}>
                        {" "}
                        Check In{" "}
                    </div>
                </center>
            </div>
        );
    } else {
        component = (
            <div>
                <center>
                    <h3 style={{ color: "#f0f0f0" }}>Login Below to Checkin</h3>
                    <Auth />
                </center>
            </div>
        );
    }

    return <div>{component}</div>;
}

export default CheckInAuth;
