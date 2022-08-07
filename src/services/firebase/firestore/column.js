
import { firebase } from '../firebase';
import 'firebase/compat/firestore';
import collectionTags from './collectionTags';
import boardOperations from './board';

const database = firebase.firestore();

const getColumnById = async (id, successCb) => {
    const snapshot = await database.collection(collectionTags.COLUMN).doc(id).get();
    if (snapshot.exists) {
        successCb(snapshot.id, snapshot.data());
    }
}

const getTaskById = async (id, successCb) => {
    const snapshot = await database.collection(collectionTags.TASK).doc(id).get();
    if (snapshot.exists) {
        successCb(snapshot.id, snapshot.data());
    }
}

const getAllColumnsInBoard = async (columnRefs, successCb) => {
    columnRefs.forEach((columnRef) => {
        getColumnById(columnRef, successCb);
    });
}

const getAllTasksInColumn = async (taskRefs, successCb) => {
    taskRefs.forEach((taskRef) => {
        getTaskById(taskRef, successCb);
    });
}

const updateBoardColumns = async (boardId, columnRefs) => {

    await database.collection(collectionTags.BOARD).doc(boardId).update(
        {
            'columns': columnRefs
        }
    );
}

const updateColumnTasks = async (columnId, taskRefs) => {

    await database.collection(collectionTags.COLUMN).doc(columnId).update(
        {
            'tasks': taskRefs
        }
    );
}

const createColumn = async (boardId, name) => {
    const columnDoc = await database.collection(collectionTags.COLUMN).add(
        {
            'name': name,
            'tasks': []
        }
    );

    boardOperations.getBoardById(boardId, (id, data) => {
        let columns = [
            ...data.columns,
            columnDoc.id
        ];
        boardOperations.updateBoardColumns(boardId, columns);

    });
    return columnDoc.id;
}

const createTask = async (columnId, name) => {
    const taskDoc = await database.collection(collectionTags.TASK).add(
        {
            'name': name
        }
    );
    getColumnById(columnId, (id, data) => {
        let tasks = [
            ...data.tasks,
            taskDoc.id
        ];
        updateColumnTasks(columnId, tasks);

    });
    return taskDoc.id;
}

const updateColumn = (id, name) => {
    database.collection(collectionTags.COLUMN).doc(id).update(
        {
            'name': name
        }
    );
}

const updateTask = (id, name) => {
    database.collection(collectionTags.TASK).doc(id).update(
        {
            'name': name
        }
    );
}

const deleteColumn = (columnId) => {
    getColumnById(columnId, async (columnId, data) => {
        data.tasks.forEach(taskId => deleteTask(taskId));
        await database.collection(collectionTags.COLUMN).doc(columnId).delete();
    });
}

const deleteColumnFromBoard = (boardId, columnId) => {
    boardOperations.getBoardById(boardId, (id, data) => {
        updateBoardColumns(
            boardId,
            data.columns.filter((column) => column.id !== columnId)
        );
    });
}

const deleteTask = (taskId) => {
    database.collection(collectionTags.TASK).doc(taskId).delete();
}

const deleteTaskFromColumn = (columnId, taskId) => {
    getColumnById(columnId, (id, data) => {
        let taskIds = data.tasks.filter((taskRef) => taskRef !== taskId);
        updateColumnTasks(columnId, taskIds);
    });
}

const addTaskToColumn = (columnId, taskId, afterTaskId) => {
    getColumnById(columnId, (id, data) => {
        let taskIds = [...data.tasks];
        if (afterTaskId) {
            taskIds.splice(
                taskIds.findIndex(task => task.id === afterTaskId) + 1,
                0,
                taskId
            );
        } else {
            taskIds = [
                ...taskIds,
                taskId
            ];
        }
        updateColumnTasks(columnId, taskIds);
    });
}

const columnOperations = {
    getAllColumnsInBoard,
    getAllTasksInColumn,
    updateBoardColumns,
    getColumnById,
    createColumn,
    createTask,
    updateColumn,
    updateTask,
    deleteColumn,
    deleteColumnFromBoard,
    deleteTask,
    deleteTaskFromColumn,
    addTaskToColumn
}

export default columnOperations;