import actionTags from './actionsTags';

const addColumn = (id, name) => {
    return {
        type: actionTags.ADD_COLUMN,
        payload: {
            column: {
                id: id,
                name: name
            }
        }
    }
}

const updateColumn = (id, name) => {
    return {
        type: actionTags.UPDATE_COLUMN,
        payload: {
            column: {
                id: id,
                name: name
            }
        }
    }
}

const deleteColumn = (id) => {
    return {
        type: actionTags.DELETE_COLUMN,
        payload: {
            column: {
                id: id
            }
        }
    }
}

const resetColumns = () => {
    return {
        type: actionTags.RESET_COLUMNS,
        payload: {}
    }
}

export default {
    addColumn,
    updateColumn,
    deleteColumn,
    resetColumns
}