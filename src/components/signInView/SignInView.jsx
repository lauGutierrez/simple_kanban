import React, { useState, useEffect } from 'react';
import './SignInView.scss';

import { useTranslation } from 'react-i18next';
import { firebase } from '../../integrations/firebase';
import 'firebase/compat/auth';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';

const SignInView = (props) => {
    const { t } = useTranslation();
    const [signedIn, setSignedIn] = useState(false);

    const uiConfig = {
        signInFlow: 'popup',
        callbacks: {
            signInSuccess: (data) => { props.onSignInSuccess(data) }
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
            <Grid
                container
                spacing={1}
                align="center"
                justify="center"
                direction="column">
                <Grid item xs={12}>
                    <Typography variant="h1" component="h1">
                        {t('app-name')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </Grid>
            </Grid>
        );
    }
}
export default SignInView;