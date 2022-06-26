
const user = (state = { user: {} }, action) => {
    switch (action.type) {
        case 'SIGN_UP':
            return {
                uid: action.payload.user.uid,
                email: action.payload.user.email,
            };
        case 'SIGN_OUT':
            return {};
        default:
            return state;
    }
}

export default user;   