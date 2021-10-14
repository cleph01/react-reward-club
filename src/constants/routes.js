const HOME = "/";
const USERS = "/users";

// My User
const PROFILE = "/profile/:userId";
const EDIT_PROFILE = "/profile/edit/:userId"; // Private Route

// Market
const MARKET = "/market";
const SHOPS = "/shops/all";
const SHOP = "/shops/:shopId/:userId?";
const CART = "/cart";
const PRODUCT = "/product/:productId";

// Auction
const AUCTIONS = "/auctions/all";
const AUCTION = "/auction/:auctionId";
const MY_AUCTION = "/myauctions";
const NEW_AUCTION = "/auction/new";
const EDIT_AUCTION = "/auction/edit/:auctionId";

// Stripe
const STRIPE_CONNECT = "/seller/stripe/connect";

// Order
const ORDER = "/order/:orderId";
const SHOP_ORDER = "/seller/orders/:shop/:shopId"; //private route

// My Shop
const MY_SHOPS = "/seller/shops"; // private route
const NEW_SHOP = "/seller/shop/new"; // private route"
const EDIT_SHOP = "/seller/shop/edit/:shopId"; // private route
const NEW_PRODUCT = "/seller/:shopId/products/new"; // private route
const EDIT_PRODUCT = "/seller/:shopId/:productId/edit"; // private route
const NEW_PRIZE = "/seller/:shopId/prizes/new"; // private route
const EDIT_PRIZE = "/seller/:shopId/:prizeId/edit-prize"; // private route

// Socialiite
const CHECKIN = "/checkin/:shopId";
const WALLET = "/wallet/:userId"; // private route
const STORE = "/store/:shopId";

// Stripe connect
const STRIPE = "/seller/stripe/connect";

export {
    HOME,
    USERS,
    PROFILE,
    EDIT_PROFILE,
    MARKET,
    SHOPS,
    SHOP,
    CART,
    PRODUCT,
    AUCTIONS,
    AUCTION,
    ORDER,
    SHOP_ORDER,
    NEW_SHOP,
    EDIT_SHOP,
    NEW_PRODUCT,
    EDIT_PRODUCT,
    NEW_PRIZE,
    EDIT_PRIZE,
    MY_SHOPS,
    CHECKIN,
    WALLET,
    STORE,
    STRIPE,
};
