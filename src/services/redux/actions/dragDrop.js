import actionTags from './actionsTags';

const enableDragDrop = () => {
    return {
        type: actionTags.ENABLE_DRAG_DROP,
        payload: {}
    }
}

const disableDragDrop = () => {
    return {
        type: actionTags.DISABLE_DRAG_DROP,
        payload: {}
    }
}

const dragDropActions = {
    enableDragDrop,
    disableDragDrop
};

export default dragDropActions;