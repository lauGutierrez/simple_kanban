import actionTags from './actionsTags';

const signIn = (user) => {
    return {
        type: actionTags.SIGN_IN,
        payload: {
            uid: user.uid,
            email: user.email
        }
    }
}

const signOut = () => {
    return {
        type: actionTags.SIGN_OUT,
        payload: {}
    }
}

export default {
    signIn,
    signOut
}