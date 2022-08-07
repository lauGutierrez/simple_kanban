import actionTags from './actionsTags';

const addColumn = (id, name, tasks) => {
    return {
        type: actionTags.ADD_COLUMN,
        payload: {
            column: {
                id: id,
                name: name,
                tasks: tasks
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

const addTaskToColumn = (columnId, taskId, taskName) => {
    return {
        type: actionTags.ADD_TASK_TO_COLUMN,
        payload: {
            column: {
                id: columnId
            },
            task: {
                id: taskId,
                name: taskName
            }
        }
    }
}

const updateTask = (columnId, taskId, name) => {
    return {
        type: actionTags.UPDATE_TASK,
        payload: {
            column: {
                id: columnId
            },
            task: {
                id: taskId,
                name: name
            }
        }
    }
}

const deleteTask = (columnId, taskId) => {
    return {
        type: actionTags.DELETE_TASK,
        payload: {
            column: {
                id: columnId
            },
            task: {
                id: taskId
            }
        }
    }
}

const reorderTask = (fromColumnId, toColumnId, taskId, afterTaskId) => {
    return {
        type: actionTags.REORDER_TASK,
        payload: {
            column: {
                from: fromColumnId,
                to: toColumnId
            },
            task: {
                id: taskId
            },
            order: {
                after: afterTaskId
            }
        }
    }
}

const columnCrudActions = {
    addColumn,
    updateColumn,
    deleteColumn,
    resetColumns,
    addTaskToColumn,
    updateTask,
    deleteTask,
    reorderTask
};

export default columnCrudActions;