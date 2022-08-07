import actionTags from './actionsTags';

const signIn = (user) => {
    return {
        type: actionTags.SIGN_IN,
        payload: {
            id: user.id,
            email: user.email,
            name: user.name
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