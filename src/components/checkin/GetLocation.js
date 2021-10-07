import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import "../../styles/checkin/get_location.scss";

function GetLocation({ handleGeoLocation, distanceStatus }) {
    return (
        <div className="geolocation-container">
            <h3 className="geolocation-header">
                Please Provide Your Location To Verify Proximity
            </h3>
            <div
                className="geolocation-button"
                style={{
                    padding: distanceStatus.fetchingDistance
                        ? "30px 0px"
                        : null,
                }}
                onClick={handleGeoLocation}
            >
                {distanceStatus.fetchingDistance ? (
                    // <LinearProgress color="success" />
                    <CircularProgress />
                ) : (
                    "Get Geolocation"
                )}
            </div>
        </div>
    );
}

export default GetLocation;
