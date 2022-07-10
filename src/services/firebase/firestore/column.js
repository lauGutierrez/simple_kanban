
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

const getAllColumnsInBoard = async (columnRefs, successCb) => {
    columnRefs.forEach((columnRef) => {
        getColumnById(columnRef, successCb);
    });
}

const updateBoardColumns = async (boardId, columnRefs) => {

    await database.collection(collectionTags.BOARD).doc(boardId).update(
        {
            'columns': columnRefs
        }
    );
}

const createColumn = async (name) => {
    const doc = await database.collection(collectionTags.COLUMN).add(
        {
            'name': name
        }
    );
    return doc.id;
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
    updateBoardColumns,
    getColumnById,
    createColumn,
    updateColumn,
    deleteColumn
}