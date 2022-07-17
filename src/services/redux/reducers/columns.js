import actionTags from '../actions/actionsTags';

const columns = (state = [], action) => {
    switch (action.type) {
        case actionTags.ADD_COLUMN:
            return [
                ...state,
                action.payload.column
            ];
        case actionTags.UPDATE_COLUMN:
            return getUpdatedList(
                state,
                action.payload.column.id,
                (column) => {
                    return {
                        id: column.id,
                        name: action.payload.column.name,
                        tasks: column.tasks
                    };
                }
            );
        case actionTags.DELETE_COLUMN:
            return state.filter(
                (column) => column.id !== action.payload.column.id,
            );
        case actionTags.RESET_COLUMNS:
            return [];
        case actionTags.ADD_TASK_TO_COLUMN:
            return addTaskToColumn(
                state,
                action.payload.column.id,
                action.payload.task
            );
        case actionTags.UPDATE_TASK:
            return updateTask(
                state,
                action.payload.column.id,
                action.payload.task
            );
        case actionTags.DELETE_TASK:
            return deleteTask(
                state,
                action.payload.column.id,
                action.payload.task.id
            );
        case actionTags.REORDER_TASK:
            let task = getTaskById(
                state,
                action.payload.column.from,
                action.payload.task.id
            );
            let columns = deleteTask(
                state,
                action.payload.column.from,
                action.payload.task.id
            );
            columns = addTaskToColumn(
                columns,
                action.payload.column.to,
                task,
                action.payload.order.after
            );
            return columns;
        default:
            return state;
    }
}

const getUpdatedList = (state, id, getUpdatedCb) => {
    let newState = [];
    state.forEach(item => {
        if (item.id === id) {
            let updatedItem = getUpdatedCb(item);
            if (updatedItem) {
                newState.push(updatedItem);
            }
        } else {
            newState.push(item);
        }
    });

    return newState;
}

const getTaskById = (columns, columnId, taskId) => {
    let column = columns.filter((column) => column.id === columnId)[0];
    let task = column.tasks.filter((task) => task.id === taskId)[0];

    return task;
}

const addTaskToColumn = (columns, columnId, newTask, afterTaskId) => {
    return getUpdatedList(
        columns,
        columnId,
        (column) => {
            let tasks = [...column.tasks];
            if (afterTaskId) {
                tasks.splice(
                    column.tasks.findIndex(task => task.id === afterTaskId) + 1,
                    0,
                    newTask
                );
            } else {
                tasks.push(newTask);
            }

            return {
                id: column.id,
                name: column.name,
                tasks: tasks
            };
        }
    );
}

const updateTask = (columns, columnId, updatedTask) => {
    return getUpdatedList(
        columns,
        columnId,
        (column) => {
            let tasks = getUpdatedList(
                column.tasks,
                updatedTask.id,
                (task) => {
                    return {
                        id: task.id,
                        name: updatedTask.name
                    };
                }
            );
            return {
                id: column.id,
                name: column.name,
                tasks: tasks
            };
        }
    );
}

const deleteTask = (columns, columnId, taskId) => {
    return getUpdatedList(
        columns,
        columnId,
        (column) => {
            let tasks = getUpdatedList(
                column.tasks,
                taskId,
                (task) => { return null }
            );
            return {
                id: column.id,
                name: column.name,
                tasks: tasks
            };
        }
    );
}

export default columns;   