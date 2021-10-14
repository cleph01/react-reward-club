import React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";

const classes = {
    position: "relative",
    width: "125px",
    height: "50px",
    borderRadius: "10px",
    background: "#2872a8",
    boxShadow: "0 4px 7px rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s ease-out",
};
function NewPromoButton() {
    return (
        <div style={classes}>
            <AddBoxIcon />
            New Promo
        </div>
    );
}

export default NewPromoButton;
