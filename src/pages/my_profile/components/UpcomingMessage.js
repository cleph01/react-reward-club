import UpcomingIcon from "@mui/icons-material/Upcoming";

function UpcomingMessage() {
    return (
        <div
            className="upcoming-container"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#bdbdbd",
                fontSize: "27px",
            }}
        >
            <h3>Upcoming!!</h3>{" "}
            <UpcomingIcon sx={{ color: "#bdbdbd", fontSize: "73px" }} />
        </div>
    );
}

export default UpcomingMessage;
