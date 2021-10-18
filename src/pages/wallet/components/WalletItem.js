import "../styles/wallet-item.scss";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ShareIcon from "@mui/icons-material/Share";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PhoneIcon from "@mui/icons-material/Phone";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CheckIcon from "@mui/icons-material/Check";

import logo from "../../../assets/images/logos/chicken_shack_logo.png";

const Wallet_Item = ({
    itemDetails,
    setShareBusiness,
    handleOpenClaimModal,
}) => {
    return (
        <>
            <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>
                <CardHeader
                    className="header"
                    avatar={
                        <Avatar
                            src={logo}
                            sx={{
                                width: 50,
                                height: 50,
                                margin: "auto",
                                padding: "10px",
                                border: "1px solid #f0f0f0",
                            }}
                        />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <PhoneIcon />
                        </IconButton>
                    }
                    title="Chick Shack"
                    subheader="36-19 Broadway, Astoria NY"
                />
                {/* <CardMedia
                    component="img"
                    height="194"
                    image={productPic}
                    alt="Paella dish"
                    loading="lazy"
                /> */}
                <div className="wallet-item-emoji">{itemDetails.emoji}</div>
                <CardContent>
                    <Typography
                        className="description"
                        variant="h4"
                        color="text.secondary"
                    >
                        {itemDetails.itemDescription}
                    </Typography>
                    <br />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ textAlign: "center" }}
                    >
                        Shoutout, Trade, or Redeem below
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className="footer">
                    {/* <IconButton aria-label="fire">
                        <LocalFireDepartmentIcon />
                    </IconButton> */}
                    <IconButton
                        aria-label="share"
                        onClick={setShareBusiness({
                            businessId: itemDetails.businessId,
                            businessName: itemDetails.businessName,
                        })}
                    >
                        <ShareIcon className="icon" />
                    </IconButton>
                    <IconButton aria-label="trade">
                        <CompareArrowsIcon className="icon" />
                    </IconButton>
                    <IconButton
                        aria-label="redeem"
                        onClick={handleOpenClaimModal}
                    >
                        <CheckIcon className="icon" />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
};

export default Wallet_Item;
