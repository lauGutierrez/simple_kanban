
import actionTags from './actionsTags';

const setSelectedBoard = (id, name, description, created, columns) => {
    return {
        type: actionTags.SET_SELECTED_BOARD,
        payload: {
            board: {
                id: id,
                name: name,
                description: description,
                created: new Date(created.toDate()).toLocaleDateString(),
                columns: columns
            }
        }
    }
}

const resetSelectedBoard = () => {
    return {
        type: actionTags.RESET_SELECTED_BOARD,
        payload: {}
    }
}

const addColumnToBoard = (columnId) => {
    return {
        type: actionTags.ADD_COLUMN_TO_BOARD,
        payload: {
            column: {
                id: columnId
            }
        }
    }
}

const deleteColumnFromBoard = (columnId) => {
    return {
        type: actionTags.DELETE_COLUMN_FROM_BOARD,
        payload: {
            column: {
                id: columnId
            }
        }
    }
}

const reorderColumn = (afterId, columnId) => {
    return {
        type: actionTags.REORDER_COLUMN,
        payload: {
            column: {
                id: columnId
            },
            order:{
                after: afterId,
            }
        }
    }
}

export default {
    setSelectedBoard,
    resetSelectedBoard,
    addColumnToBoard,
    deleteColumnFromBoard,
    reorderColumn
}