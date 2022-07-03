const addTask = (columnId, id, name) => {
    return {
        type: "ADD_TASK",
        payload: {
            column: {
                id: columnId
            },
            task: {
                id: id,
                name: name
            }
        }
    }
}

const updateTask = (columnId, id, name) => {
    return {
        type: "UPDATE_TASK",
        payload: {
            column: {
                id: columnId
            },
            task: {
                id: id,
                name: name
            }
        }
    }
}

const deleteTask = (id) => {
    return {
        type: "DELETE_TASK",
        payload: {
            column: {
                id: columnId
            },
            task: {
                id: id
            }
        }
    }
}

export default {
    addTask,
    updateTask,
    deleteTask
}