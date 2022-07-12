
import { firebase } from '../firebase';
import 'firebase/compat/firestore';
import collectionTags from './collectionTags';

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

const createColumn = async (name) => {
    const doc = await database.collection(collectionTags.COLUMN).add(
        {
            'name': name,
            'tasks': []
        }
    );
    return doc.id;
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

const deleteColumn = (id) => {
    database.collection(collectionTags.COLUMN).doc(id).delete();
}

export default {
    getAllColumnsInBoard,
    getAllTasksInColumn,
    updateBoardColumns,
    getColumnById,
    createColumn,
    createTask,
    updateColumn,
    deleteColumn
}