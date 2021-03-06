import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './SignIn.scss';

import { useTranslation } from 'react-i18next';
import { firebase } from '../../services/firebase/firebase';
import 'firebase/compat/auth';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';

import actions from '../../services/redux/actions/actions';

const SignIn = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const uiConfig = {
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: (data) => {
                setCurrentUser(
                    data.user.multiFactor.user.uid,
                    data.user.multiFactor.user.email
                );
            }
        },
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
    };

    const currentUser = useSelector(state => state.user);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(
                    user.multiFactor.user.uid,
                    user.multiFactor.user.email
                );
            }
        });
    }, []);

    const setCurrentUser = (uid, email) => {
        dispatch(actions.userActions.signIn({
            uid: uid,
            email: email
        }));
        navigate(props.redirectTo);
    }

    if (currentUser) {
        return null;
    } else {
        return (
            <div className="sign-in">
                <Grid
                    container
                    spacing={1}
                    align="center"
                    justify="center"
                    direction="row">
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1" className="app-name">
                            {t('app-name')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default SignIn;