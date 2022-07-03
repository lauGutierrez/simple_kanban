import actionTags from '../actions/actionsTags';

const user = (state = {}, action) => {
    switch (action.type) {
        case actionTags.SIGN_IN:
            return {
                uid: action.payload.uid,
                email: action.payload.email,
            };
        case actionTags.SIGN_OUT:
            return {};
        default:
            return state;
    }
}

export default user;   