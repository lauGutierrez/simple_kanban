import actionTags from '../actions/actionsTags';

const user = (state = {}, action) => {
    switch (action.type) {
        case actionTags.SIGN_IN:
            return {
                id: action.payload.id,
                email: action.payload.email,
                name: action.payload.name,
            };
        case actionTags.SIGN_OUT:
            return {};
        default:
            return state;
    }
}

export default user;   