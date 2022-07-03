
import actionTags from './actionsTags';

const setSelectedBoard = (id, name, description, created) => {
    return {
        type: actionTags.SET_SELECTED_BOARD,
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

const resetSelectedBoard = () => {
    return {
        type: actionTags.RESET_SELECTED_BOARD,
        payload: {}
    }
}

export default {
    setSelectedBoard,
    resetSelectedBoard
}