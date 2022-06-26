
import boardReducer from './board.js';
import userReducer from './user.js';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    boardReducer,
    userReducer
})

export default reducer