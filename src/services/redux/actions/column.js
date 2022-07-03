const addColumn = (boardId, id, name) => {
    return {
        type: "ADD_COLUMN",
        payload: {
            board: {
                id: boardId
            },
            column: {
                id: id,
                name: name
            }
        }
    }
}

const updateColumn = (boardId, id, name) => {
    return {
        type: "UPDATE_COLUMN",
        payload: {
            board: {
                id: boardId
            },
            column: {
                id: id,
                name: name
            }
        }
    }
}

const deleteColumn = (boardId, id) => {
    return {
        type: "DELETE_COLUMN",
        payload: {
            board: {
                id: boardId
            },
            column: {
                id: id
            }
        }
    }
}

export default {
    addColumn,
    updateColumn,
    deleteColumn
}