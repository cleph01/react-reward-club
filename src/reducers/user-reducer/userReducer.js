const UserReducer = (state, action) => {
    switch (action.type) {
        case "USER/SET_NEW_USER":
            console.log("LOGIN Action");

            return {
                ...state,
                isAuthenticated: true,
                userId: action.payload.userId,
                displayName: action.payload.displayName,
                avatarUrl: action.payload.avatarUrl,
                seller: false,
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber,
                create: action.payload.created,
                aboutMe: action.payload.aboutMe,
                isLoading: false,
                followers: [],
                followingBusinesses: [],
                followingFriends: [],
            };

        case "AUTH/LOGOUT":
            return {
                isAuthenticated: false,
            };

        case "USER/SET_EXISTING_DETAILS":
            console.log("Setting Details: ", action.payload);
            return {
                ...state,
                userId: action.payload.userId,
                displayName: action.payload.displayName,
                avatarUrl: action.payload.avatarUrl,
                seller: action.payload.seller,
                aboutMe: action.payload.aboutMe,
                email: action.payload.email,
                created: action.payload.created,
                isLoading: false,
                isAuthenticated: true,
                socials: action.payload.socials,
                followers: action.payload.followers,
                followingBusinesses: action.payload.followingBusinesses,
                followingFriends: action.payload.followingFriends,
            };

        case "USER/SET_REFERRER":
            console.log("Setting Details: ", action.payload);
            return {
                ...state,
                referredBy: action.payload.referrerId,
            };

        default:
            return state;
    }
};

export default UserReducer;
