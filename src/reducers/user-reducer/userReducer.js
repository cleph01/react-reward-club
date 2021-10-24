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
                created: action.payload.created.toDate(),
                isLoading: false,
                isAuthenticated: true,
            };
        default:
            return state;
    }
};

export default UserReducer;
