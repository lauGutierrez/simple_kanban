import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './SignIn.scss';

import { useTranslation } from 'react-i18next';
import { firebase } from '../../integrations/firebase/firebase';
import 'firebase/compat/auth';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';

const SignIn = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [signedIn, setSignedIn] = useState(false);

    const uiConfig = {
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: (data) => {
                props.onSignInSuccess(
                    data.user.multiFactor.user.uid,
                    data.user.multiFactor.user.email
                );
                navigate(props.redirectTo);
            }
        },
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
    };

    useEffect(() => {
        return () => {
            firebase.auth().onAuthStateChanged(user => {
                setSignedIn(!!user);
            });
        };
    }, []);

    if (signedIn) {
        props.onSignInSuccess(firebase.auth().currentUser);
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