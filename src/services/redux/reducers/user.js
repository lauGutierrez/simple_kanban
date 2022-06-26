
const user = (state = {}, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                uid: action.payload.uid,
                email: action.payload.email,
            };
        case 'SIGN_OUT':
            return {};
        default:
            return state;
    }
}

export default user;   