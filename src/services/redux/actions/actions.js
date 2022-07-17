import boardActions from './boardCrud';
import columnActions from './columnCrud';
import selectedBoardActions from './selectedBoard';
import dragDropActions from './dragDrop';
import userActions from './user';

const actions = {
    userActions,
    boardActions,
    dragDropActions,
    selectedBoardActions,
    columnActions
}

export default actions;