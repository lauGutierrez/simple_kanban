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

export default {
    enableDragDrop,
    disableDragDrop
}