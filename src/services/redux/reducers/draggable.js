import actionTags from '../actions/actionsTags';

const draggable = (state = true, action) => {
    switch (action.type) {
        case actionTags.ENABLE_DRAG_DROP:
            return true;
        case actionTags.DISABLE_DRAG_DROP:
            return false;
        default:
            return state;
    }
}

export default draggable;   