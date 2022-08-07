
import { firebase } from '../firebase';
import 'firebase/compat/firestore';
import collectionTags from './collectionTags';
import columnOperations from './column';

const database = firebase.firestore();

const getAllBoards = async (userId, successCb) => {
    const snapshot = await database.collection(
        collectionTags.BOARD
    ).where(
        'user', '==', userId
    ).orderBy("created", "desc").get();
    snapshot.forEach((doc) => {
        successCb(doc.id, doc.data());
    });
}

const getBoardById = async (id, successCb) => {
    const snapshot = await database.collection(collectionTags.BOARD).doc(id).get();
    if (snapshot.exists) {
        successCb(snapshot.id, snapshot.data());
    }
}

const createBoard = async (userId, name, description) => {
    const doc = await database.collection(collectionTags.BOARD).add(
        {
            'user': userId,
            'name': name,
            'description': description,
            'created': firebase.firestore.FieldValue.serverTimestamp(),
            'columns': []
        }
    );
    return doc.id;
}

const updateBoard = async (id, name, description) => {
    await database.collection(collectionTags.BOARD).doc(id).update(
        {
            'name': name,
            'description': description
        }
    );
}

const deleteBoard = (id) => {
    getBoardById(id, async (boardId, data) => {
        data.columns.forEach(columnId => columnOperations.deleteColumn(columnId));
        await database.collection(collectionTags.BOARD).doc(boardId).delete();
    });
}

const reorderColumn = (boardId, afterColumnId, columnId) => {
    getBoardById(boardId, async (boardId, data) => {
        let columns = data.columns.filter(
            (columnId) => columnId !== columnId
        );
        columns.splice(
            columns.indexOf(afterColumnId) + 1,
            0,
            columnId
        );
        columnOperations.updateBoardColumns(boardId, columns);
    });
}

export default {
    getAllBoards,
    getBoardById,
    createBoard,
    updateBoard,
    deleteBoard,
    reorderColumn
}