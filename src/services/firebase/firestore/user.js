
import { firebase } from '../firebase';
import 'firebase/compat/firestore';
import collectionTags from './collectionTags';

const database = firebase.firestore();

const createUserIfNoExists = (id, email, name) => {
    return new Promise(
        async (resolve, reject) => {
            const snapshot = await database.collection(collectionTags.USER).doc(id).get();
            if (!snapshot.exists) {
                await database.collection(collectionTags.USER).doc(id).set(
                    {
                        'email': email,
                        'name': name
                    }
                );
            }
            return resolve();
        }
    );
}


export default {
    createUserIfNoExists
}