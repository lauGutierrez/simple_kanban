
import { firebase } from '../firebase';
import 'firebase/compat/firestore';

const BOARD_COLLECTION = 'boards';
const database = firebase.firestore();

const getAllBoards = async (successCb) => {
    const snapshot = await database.collection(BOARD_COLLECTION).get();
    snapshot.forEach((doc) => {
        successCb(doc.id, doc.data());
    });
}

const getBoardById = async (id, successCb) => {
    const snapshot = await database.collection(BOARD_COLLECTION).doc(id).get();
    if (snapshot.exists) {
        successCb(snapshot.id, snapshot.data());
    }
}

const addBoard = async (name, description) => {
    const doc = await database.collection(BOARD_COLLECTION).add(
        {
            'name': name,
            'description': description,
            'created': firebase.firestore.FieldValue.serverTimestamp()
        }
    );
    return doc.id;
}

const updateBoard = async (id, name, description) => {
    await database.collection(BOARD_COLLECTION).doc(id).update(
        {
            'name': name,
            'description': description
        }
    );
}

const deleteBoard = async (id) => {
    await database.collection(BOARD_COLLECTION).doc(id).delete();
}

export default {
    getAllBoards,
    getBoardById,
    addBoard,
    updateBoard,
    deleteBoard
}