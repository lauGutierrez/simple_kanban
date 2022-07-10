
import { firebase } from '../firebase';
import 'firebase/compat/firestore';
import collectionTags from './collectionTags';


const database = firebase.firestore();

const getAllBoards = async (successCb) => {
    const snapshot = await database.collection(collectionTags.BOARD).orderBy("created", "desc").get();
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

const createBoard = async (name, description) => {
    const doc = await database.collection(collectionTags.BOARD).add(
        {
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

const deleteBoard = async (id) => {
    await database.collection(collectionTags.BOARD).doc(id).delete();
}

export default {
    getAllBoards,
    getBoardById,
    createBoard,
    updateBoard,
    deleteBoard
}