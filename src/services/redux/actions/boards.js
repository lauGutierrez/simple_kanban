const addBoard = (id, name) => {
    return {
        type: "ADD_BOARD",
        payload: {
            board: {
                id: id,
                name: name,
                tasks: []
            }
        }
    }
}

const updateBoard = (id, name) => {
    return {
        type: "UPDATE_BOARD",
        payload: {
            board: {
                id: id,
                name: name
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

const addTask = (boardId, id, name) => {
    return {
        type: "ADD_TASK",
        payload: {
            board: {
                id: boardId
            },
            task: {
                id: id,
                name: name
            }
        }
    }
}

const updateTask = (boardId, id, name) => {
    return {
        type: "UPDATE_TASK",
        payload: {
            board: {
                id: boardId
            },
            task: {
                id: id,
                name: name
            }
        }
    }
}

const deleteTask = (boardId, id) => {
    return {
        type: "DELETE_TASK",
        payload: {
            board: {
                id: boardId
            },
            task: {
                id: id
            }
        }
    }
}

export default {
    addBoard,
    updateBoard,
    deleteBoard,
    addTask,
    updateTask,
    deleteTask
}