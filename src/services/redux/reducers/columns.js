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
        case actionTags.ADD_TASK_TO_COLUMN:
            return getUpdatedList(
                state,
                action.payload.column.id,
                (column) => {
                    return {
                        id: column.id,
                        name: column.name,
                        tasks: [
                            ...column.tasks,
                            action.payload.task
                        ]
                    };
                }
            );
        case actionTags.UPDATE_TASK:
            return getUpdatedList(
                state,
                action.payload.column.id,
                (column) => {
                    let tasks = getUpdatedList(
                        column.tasks,
                        action.payload.task.id,
                        (task) => {
                            return {
                                id: task.id,
                                name: action.payload.task.name
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
        case actionTags.DELETE_TASK:
            return getUpdatedList(
                state,
                action.payload.column.id,
                (column) => {
                    let tasks = getUpdatedList(
                        column.tasks,
                        action.payload.task.id,
                        (task) => { return null }
                    );
                    return {
                        id: column.id,
                        name: column.name,
                        tasks: tasks
                    };
                }
            );
        case actionTags.REORDER_TASK:
            return [];
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

export default columns;   