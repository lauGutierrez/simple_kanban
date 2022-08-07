import actionTags from './actionsTags';

const addBoard = (id, name, description, created) => {
    return {
        type: actionTags.ADD_BOARD,
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
        type: actionTags.UPDATE_BOARD,
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
        type: actionTags.DELETE_BOARD,
        payload: {
            board: {
                id: id
            }
        }
    }
}

const resetBoards = () => {
    return {
        type: actionTags.RESET_BOARDS,
        payload: {}
    }
}

const boardCrud = {
    addBoard,
    updateBoard,
    deleteBoard,
    resetBoards
};

export default boardCrud;