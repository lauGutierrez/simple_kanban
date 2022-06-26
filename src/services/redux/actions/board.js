const addBoard = () => {
    return {
        type: "ADD_BOARD"
    }
}

const updateBoard = () => {
    return {
        type: "UPDATE_BOARD"
    }
}

const deleteBoard = () => {
    return {
        type: "DELETE_BOARD"
    }
}

const addTask = () => {
    return {
        type: "ADD_TASK"
    }
}

const updateTask = () => {
    return {
        type: "UPDATE_TASK"
    }
}

const deleteTask = () => {
    return {
        type: "DELETE_TASK"
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