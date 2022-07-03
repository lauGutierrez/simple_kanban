
import boards from './boards';
import selectedBoard from './selectedBoard';
import user from './user';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    boards,
    user,
    selectedBoard
});

export default reducer;