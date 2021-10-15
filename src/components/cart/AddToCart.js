import React, { useState } from "react";
import { Redirect } from "react-router";

import { makeStyles } from "@mui/styles";

import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
// import cart from './cart-helper.js'

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    iconButton: {
        width: "28px",
        height: "28px",
    },
    disabledIconButton: {
        color: "#7f7563",
        width: "28px",
        height: "28px",
    },
}));

function AddToCart(props) {
    const classes = useStyles();
    const [redirect, setRedirect] = useState(false);

    // const addToCart = () => {
    //   cart.addItem(props.item, () => {
    //     setRedirect({redirect:true})
    //   })
    // }

    if (redirect) {
        return <Redirect to={"/cart"} />;
    }

    return (
        <span>
            {props.item.quantity >= 0 ? (
                <IconButton color="secondary" dense="dense">
                    <AddShoppingCartIcon
                        className={props.cartStyle || classes.iconButton}
                    />
                </IconButton>
            ) : (
                <IconButton disabled={true} color="secondary" dense="dense">
                    <RemoveShoppingCartIcon
                        className={
                            props.cartStyle || classes.disabledIconButton
                        }
                    />
                </IconButton>
            )}
        </span>
    );
}

export default AddToCart;
