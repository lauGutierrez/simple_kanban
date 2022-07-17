import boards from './boards';
import columns from './columns';
import draggable from './draggable';
import selectedBoard from './selectedBoard';
import user from './user';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    boards,
    user,
    selectedBoard,
    columns,
    draggable
});

export default reducer;