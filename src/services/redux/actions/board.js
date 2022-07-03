const addBoard = (id, name, description, created) => {
    return {
        type: "ADD_BOARD",
        payload: {
            board: {
                id: id,
                name: name,
                description: description,
                created: new Date(created.toDate()).toLocaleDateString()
            }
        }
    }
}

const updateBoard = (id, name, description) => {
    return {
        type: "UPDATE_BOARD",
        payload: {
            board: {
                id: id,
                name: name,
                description: description
            }
        }
    }
}

const deleteBoard = (id) => {
    return {
        type: "DELETE_BOARD",
        payload: {
            board: {
                id: id
            }
        }
    }
}

export default {
    addBoard,
    updateBoard,
    deleteBoard
}