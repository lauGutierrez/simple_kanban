
const board = (state = { boards: [] }, action) => {
    switch (action.type) {
        case 'ADD_BOARD':
            return {
                ...state,
                boards: [
                    ...state.boards,
                    action.payload.board
                ]
            };
        case 'UPDATE_BOARD':
            return {
                ...state,
                boards: getUpdatedBoards(
                    state,
                    action.payload.board.id,
                    (board) => {
                        return {
                            id: board.id,
                            name: action.payload.board.name,
                            tasks: board.tasks
                        };
                    }
                )
            };
        case 'DELETE_BOARD':
            return {
                ...state,
                boards: state.boards.filter(
                    (board) => board.id !== action.payload.board.id,
                ),
            };
        case 'ADD_TASK':
            return {
                ...state,
                boards: getUpdatedBoards(
                    state,
                    action.payload.board.id,
                    (board) => {
                        return {
                            ...board,
                            tasks: [
                                ...board.tasks,
                                action.payload.task
                            ]
                        };
                    }
                )
            };
        case 'UPDATE_TASK':
            return {
                ...state,
                boards: getUpdatedBoards(
                    state,
                    action.payload.board.id,
                    (board) => {
                        return {
                            ...board,
                            tasks: getUpdatedTasks(
                                state,
                                action.payload.task.id,
                                (task) => action.payload.task
                            )
                        };
                    }
                )
            };
        case 'DELETE_TASK':
            return {
                ...state,
                boards: getUpdatedBoards(
                    state,
                    action.payload.board.id,
                    (board) => {
                        return {
                            ...board,
                            tasks: board.tasks.filter(
                                (task) => task.id !== action.payload.task.id
                            )
                        };
                    }
                )
            };
        default:
            return state;
    }
}

const getUpdatedBoards = (state, boardId, getUpdatedBoardCb) => {
    let boards = [];
    state.boards.forEach(board => {
        if (board.id === boardId) {
            boards.push(getUpdatedBoardCb(board));
        } else {
            boards.push(board);
        }
    });

    return boards;
}

const getUpdatedTasks = (board, taskId, getUpdatedTaskCb) => {
    let tasks = [];
    board.tasks.forEach(task => {
        if (task.id === taskId) {
            tasks.push(getUpdatedTaskCb(task));
        } else {
            tasks.push(task);
        }
    });

    return tasks;
}

export default board;   