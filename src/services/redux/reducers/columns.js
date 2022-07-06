import actionTags from '../actions/actionsTags';

const columns = (state = [], action) => {
    switch (action.type) {
        case actionTags.ADD_COLUMN:
            return [
                ...state,
                action.payload.column
            ];
        case actionTags.UPDATE_COLUMN:
            return getUpdatedColumns(
                state,
                action.payload.column.id,
                (column) => {
                    return {
                        id: column.id,
                        name: action.payload.column.name
                    };
                }
            );
        case actionTags.DELETE_COLUMN:
            return state.filter(
                (column) => column.id !== action.payload.column.id,
            );
        case actionTags.RESET_COLUMNS:
            return [];
        default:
            return state;
    }
}

const getUpdatedColumns = (state, columnId, getUpdatedColumnCb) => {
    let columns = [];
    state.forEach(column => {
        if (column.id === columnId) {
            columns.push(getUpdatedColumnCb(column));
        } else {
            columns.push(column);
        }
    });

    return columns;
}

export default columns;   