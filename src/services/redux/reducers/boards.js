
const boards = (state = [], action) => {
    switch (action.type) {
        case 'ADD_BOARD':
            return [
                ...state,
                action.payload.board
            ];
        case 'UPDATE_BOARD':
            return getUpdatedBoards(
                state,
                action.payload.board.id,
                (board) => {
                    return {
                        id: board.id,
                        name: action.payload.board.name,
                        description: action.payload.board.description,
                        created: board.created
                    };
                }
            );
        case 'DELETE_BOARD':
            return state.filter(
                (board) => board.id !== action.payload.board.id,
            );
        case 'ADD_TASK':
            return getUpdatedBoards(
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
            );
        case 'UPDATE_TASK':
            return getUpdatedBoards(
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
            );
        case 'DELETE_TASK':
            return getUpdatedBoards(
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
            );
        default:
            return state;
    }
}

const getUpdatedBoards = (state, boardId, getUpdatedBoardCb) => {
    let boards = [];
    state.forEach(board => {
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

export default boards;   