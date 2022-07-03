
import boards from './boards';
import user from './user';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    boards,
    user
});

export default reducer;