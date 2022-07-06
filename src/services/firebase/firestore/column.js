
import { firebase } from '../firebase';
import 'firebase/compat/firestore';
import collectionTags from './collectionTags';

const database = firebase.firestore();

const getAllColumnsInBoard = async (boardId, successCb) => {
    const snapshot = await database.collection(collectionTags.COLUMN).where(
        "board", "==", getBoardReference(boardId)
    ).get();
    snapshot.forEach((doc) => {
        successCb(doc.id, doc.data());
    });
}

const getColumnById = async (id, successCb) => {
    const snapshot = await database.collection(collectionTags.COLUMN).doc(id).get();
    if (snapshot.exists) {
        successCb(snapshot.id, snapshot.data());
    }
}

const addColumnToBoard = async (boardId, name) => {
    const doc = await database.collection(collectionTags.COLUMN).add(
        {
            'name': name,
            'board': getBoardReference(boardId)
        }
    );
    return doc.id;
}

const updateColumn = async (id, name) => {
    await database.collection(collectionTags.COLUMN).doc(id).update(
        {
            'name': name
        }
    );
}

const deleteColumn = async (id) => {
    await database.collection(collectionTags.COLUMN).doc(id).delete();
}

const getBoardReference = (boardId) => {
    return `${collectionTags.BOARD}/${boardId}/`;
}

export default {
    getAllColumnsInBoard,
    getColumnById,
    addColumnToBoard,
    updateColumn,
    deleteColumn
}