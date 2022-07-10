import actionTags from '../actions/actionsTags';

const selectedBoard = (state = {}, action) => {
    switch (action.type) {
        case actionTags.SET_SELECTED_BOARD:
            return action.payload.board;
        case actionTags.ADD_COLUMN_TO_BOARD:
            return {
                ...state,
                columns: [
                    ...state.columns,
                    action.payload.column.id
                ]
            };
        case actionTags.DELETE_COLUMN_FROM_BOARD:
            return {
                ...state,
                columns: state.columns.filter(
                    (columnId) => columnId !== action.payload.column.id
                )
            };
        case actionTags.REORDER_COLUMN:
            let columns = state.columns.filter(
                (columnId) => columnId !== action.payload.column.id
            );
            columns.splice(
                columns.indexOf(action.payload.order.after) + 1,
                0,
                action.payload.column.id
            );
            return {
                ...state,
                columns: columns
            };
        case actionTags.RESET_SELECTED_BOARD:
            return {};
        default:
            return state;
    }
}

export default selectedBoard;