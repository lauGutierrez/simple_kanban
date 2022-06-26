const signIn = (user) => {
    return {
        type: "SIGN_IN",
        payload: {
            uid: user.uid,
            email: user.email
        }
    }
}

const signOut = () => {
    return {
        type: "SIGN_OUT",
        payload: {}
    }
}

export default {
    signIn,
    signOut
}