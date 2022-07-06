import boards from './boards';
import columns from './columns';
import selectedBoard from './selectedBoard';
import user from './user';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    boards,
    user,
    selectedBoard,
    columns
});

export default reducer;