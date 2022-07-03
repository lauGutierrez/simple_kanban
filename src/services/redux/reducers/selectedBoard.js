import actionTags from '../actions/actionsTags';

const selectedBoard = (state = {}, action) => {
    switch (action.type) {
        case actionTags.SET_SELECTED_BOARD:
            return {
                id: action.payload.board.id,
                name: action.payload.board.name,
                description: action.payload.board.description,
                created: action.payload.board.created
            };
        case actionTags.RESET_SELECTED_BOARD:
            return {};
        default:
            return state;
    }
}

export default selectedBoard;   